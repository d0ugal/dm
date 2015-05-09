Testing Your First Django App
#############################

:category: python
:tags: testing, unittest, tdd, django
:date: 2010-01-20 19:25
:title: Testing your first Django app
:author: Dougal Matthews
:permalink: /articles/2010/jan/20/testing-your-first-django-app/

This is my **unofficial** part five for the `Django tutorial`_. I've attempted
to write this in a similar style to the Django documentation and hopefully
this will be useful for those looking for the next step after the tutorial or
trying out testing with django for the first time. Testing is something I
think we can all do better, I certainly know I could do better testing my code
sometimes.

.. _Django tutorial: http://docs.djangoproject.com/en/1.1/intro/tutorial01/#intro-tutorial01

If you don't have the polls app from the end of `part four`_ and don't want to
do it again you can grab it from `my github`_. The code added in this tutorial
is also available in the `master branch`_ of the repository.

.. _part four: http://docs.djangoproject.com/en/1.1/intro/tutorial04/#intro-tutorial04
.. _my github: https://github.com/d0ugal/django_tutorial/commits/P4
.. _master branch: https://github.com/d0ugal/django_tutorial/commits/master

---------------------------------------

This tutorial begins where Tutorial 4 left off. We're continuing the
Web-poll application and will focus on testing our application and
proving that it works as expected.

The testing environment
~~~~~~~~~~~~~~~~~~~~~~~

Let's first look at how you run the tests, make sure you are in the
mysite directory and run the command `python manage.py test`. You will
see output similar to this:

.. code-block:: text

	Creating test database...
	Creating table auth_permission
	Creating table auth_group
	Creating table auth_user
	Creating table auth_message
	Creating table django_admin_log
	Creating table django_content_type
	Creating table django_session
	Creating table django_site
	Creating table polls_poll
	Creating table polls_choice
	Installing index for auth.Permission model
	Installing index for auth.Message model
	Installing index for admin.LogEntry model
	Installing index for polls.Choice model
	...................................
	------------------------------------------------------------------
	Ran 35 tests in 0.565s

	OK
	Destroying test database...

You have successfully ran the test suite for the project. If your output
doesn't look like this and it appears some of the tests have failed you
may want to take a moment and go back to make sure your project matches
the end of part 4.

When you run the test suite Django creates a new test database,
synchronises your applications and loads any fixtures into the database.
Each test is then executed in turn wrapped inside a database transaction
so it can be rolled back after each test is completed. At the end of the
tests Django destroys the test database for you.

What did we just test? `manage.py test` runs all the tests for each of
the applications in your INSTALLED_APPS setting. All of the
django.contrib applications ship with tests, as should all of yours.
This is great as we can use this to test that the contrib applications
are all configured correctly.

Run the same command again but include the verbose flag so we can see
more information about what actually just happened. To do this run the
command `python manage.py test -v 2`. There will be more output this
time showing each of the tests that were carried out with the test
outcome.

What is a test?
~~~~~~~~~~~~~~~

With Django (and Python in general) there are two main ways to write tests for
your projects test suite; doctests and unit tests. In Django both of these use
the standard python modules `doctest`_ and `unittest`_. Doctests are written
in Python docstrings and unit test are defined with classes. Good generic
examples and explanations can be found on both of these in the Django
documentation `here`_ and `here also`_. If your unsure which to use, `read
this`_.

.. _doctest: http://docs.python.org/library/doctest.html
.. _unittest: http://docs.python.org/library/unittest.html
.. _here: http://docs.djangoproject.com/en/1.1/topics/testing/#writing-doctests
.. _here also: http://docs.djangoproject.com/en/1.1/topics/testing/#writing-unit-tests
.. _read this: http://docs.djangoproject.com/en/dev/topics/testing/#which-should-i-use

For the sake of being succinct we  will focus on unit tests in this
tutorial.

Writing a test
~~~~~~~~~~~~~~

In part one it was noted in passing that when you created your polls
application the file `tests.py` was created. The more adventurous of you
will have taken a look and seen a simple (but redundant) example
unit test and doctest. Django's test runner by default runs any tests
that you create in `tests.py` in the application package. This is
similar to the auto detection of admin configurations in the `admin.py`
files.

To run only the tests for a specific application run the following
command `python manage.py test polls`. This will run the two
default tests that are present in the polls application we created
earlier in the tutorial.

Delete the contents of the tests.py file and add the following test
case.

.. code-block:: python

	from datetime import datetime

	from django.test import TestCase

	from mysite.polls.models import Poll

	class PollTest(TestCase):

	    def setUp(self):
	        question="What is your favourite colour?"
	        now = datetime.now()
	        self.poll = Poll.objects.create(question=question, pub_date=now)
	        self.poll.choice_set.create(choice="Red", votes=0)
	        self.poll.choice_set.create(choice="Bue", votes=0)
	        self.poll.choice_set.create(choice="Green", votes=0)

	    def test_models(self):
	        self.assertEqual(self.poll.choice_set.all().count(), 3)

In this test case the `setUp` method creates a new poll and adds three
choices to the poll. Remember since the test runner creates its own
database there is no data yet. `setUp` is called at the start of each
test defined within your test case class. The test verifies that the
number of choices in the created poll is equal to 3. A test is a method
that starts with `test_` and is a property of a class extending
TestCase.

Try playing with this and making the test fail by changing the number or
adding/removing choices. The test can also end with an error result if
there is an uncaught exception, this can be done by adding
`Poll.objects.get(pk=2)` as there isn't a poll with that id. It's
worth familiarising yourself with the different possible test results.

When running your the tests by running `python manage.py test polls`
the output displays a single `.` for each test that passes. If a test
fails a `F` will be displated and if there is an error `E` will be
displayed. A failure is when one of the assertions fails and an error
happens when there is an uncaught exception while running the test.

Let's add another test case that does something more useful.

.. code-block:: python

	# ...
	from django.test import Client

	from mysite.polls.models import Poll, Choice

	class PollTest(TestCase):

	    # ...

	    def test_voting(self):
	        c = Client()
	        # Perform a vote on the poll by mocking a POST request.
	        response = c.post('/polls/1/vote/', {'choice': '1',})
	        # In the vote view we redirect the user, so check the
	        # response status code is 302.
	        self.assertEqual(response.status_code, 302)
	        # Get the choice and check there is now one vote.
	        choice = Choice.objects.get(pk=1)
	        self.assertEqual(choice.votes, 1)

In this example we make use of the Django test client. Using the client
we are able to simulate requests without the need for a server, rather
the request object is mocked and the view is invoked with the mock
request. In this test we create a POST request that mocks a vote on the
poll and then checks both the status_code of the response (to check we
have been redirected) and verifies the number of votes has increased.

Test driven development
~~~~~~~~~~~~~~~~~~~~~~~

Test driven development is the practice of writing tests that fail and
show what the system should do and then write or change the code to
make the test(s) pass.

Next we want to add some Ajax to our application, to do this we want to
be able to call the vote with an Ajax request and recieve some simple
information we can work with rather than the full html response. First
we will write the test for how we want this to work. We want the system
to return `'1'` on a valid vote and `'0'` on an invalid vote in the http
response.

.. code-block:: python

	class PollTest(TestCase):

	    # ...

	    def test_ajax_vote(self):

	        c = Client()

	        # Extra parameters to make this a Ajax style request.
	        kwargs = {'HTTP_X_REQUESTED_WITH':'XMLHttpRequest'}

	        # A valid vote
	        response = c.post('/polls/1/vote/', {'choice': '1',}, **kwargs)
	        self.assertEqual(response.status_code, 200)
	        self.assertEqual(response.content, '1')

	        # A invalid vote - choice doesn't exist
	        response = c.post('/polls/1/vote/', {'choice': '10',}, **kwargs)
	        self.assertEqual(response.status_code, 200)
	        self.assertEqual(response.content, '0')

	        # An invalid vote - poll doesn't exist
	        response = c.post('/polls/2/vote/', {'choice': '1',}, **kwargs)
	        self.assertEqual(response.status_code, 404)

Add this to your tests and then run the test suite. You should get
output similar to this;

.. code-block:: text

	F..
	===================================================================
	FAIL: test_ajax_vote (mysite.polls.tests.PollTest)
	-------------------------------------------------------------------
	Traceback (most recent call last):
	  File "/mysite/polls/tests.py", line 41, in test_ajax_vote
	    self.assertEqual(response.status_code, 200)
	AssertionError: 302 != 200

	-------------------------------------------------------------------

We have not updated our view, so rather than returning something useful
for the Ajax request the server has returned a redirect to the results
page. This then means the test fails at the first hurdle when we check
the response code.

Now all we need to do is update the code in the vote view to make the
tests pass. Change your view so it matches the following.

.. code-block:: python

	def vote(request, poll_id):
	    p = get_object_or_404(Poll, pk=poll_id)
	    try:
	        selected_choice = p.choice_set.get(pk=request.POST['choice'])
	    except (KeyError, Choice.DoesNotExist):
	    	# bad vote, return '0'
	        if request.is_ajax():
	            return HttpResponse("0")
	        # Redisplay the poll voting form.
	        return render_to_response('polls/poll_detail.html', {
	            'object': p,
	            'error_message': "You didn't select a choice.",
	        })
	    else:
	        selected_choice.votes += 1
	        selected_choice.save()
	        # vote saved, return '1'
	        if request.is_ajax():
	            return HttpResponse("1")
	        # Always return an HttpResponseRedirect after successfully dealing
	        # with POST data. This prevents data from being posted twice if a
	        # user hits the Back button.
	        return HttpResponseRedirect(reverse('poll_results', args=(p.id,)))

Re-run the test suite and it should now pass. You have successfully
written your first tests for the polls app and even done a little bit of
test driven development.

What next and further reading
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now you should have a good understanding of testing basics and hopefully
a better idea of how to test your applications. Testing is really quite
straight forward much of the time, you simply write a bit more code to
make sure the code you have actually works - it's invaluable when you
get into the routine and have a comprehensive test suite.

Here are a few resources that you should look at for taking the next
step.

* Python `unittest documentation`_
* Python `doctest documentation`_
* The Django `testing documentation`_
* Eric Holscher's awesome `DjangoCon talk about testing`_

.. _unittest documentation: http://docs.python.org/library/unittest.html
.. _doctest documentation: http://docs.python.org/library/doctest.html
.. _testing documentation: http://docs.djangoproject.com/en/dev/topics/testing/
.. _DjangoCon talk about testing: http://djangocon.blip.tv/file/3039829/


---------------------------------------

Finally, leaving you with this message:

	"Code without tests is broken as designed"
	- Jacob Kaplan-Moss
