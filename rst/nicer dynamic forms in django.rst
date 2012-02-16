Nicer Dynamic Forms in Django
#############################

:category: python, django
:tags: forms, type
:date: 2009/12/16 19:25
:title: Nicer dynamic forms in django
:author: Dougal Matthews
:permalink: /articles/2009/dec/16/nicer-dynamic-forms-django/

I used to make dynamic forms for Django in very bad way, I'm happy to admit
that now as I've improved my process.

Basically the solution is to use `type()` as I'm sure many of you know. If your
doing that already there isn't much for you here. If your messing around with
'`self.fields["name"]`' in your forms then read on.

Lets take a simple use case; a quiz system. You can think of it like who
wants to be a millionaire. We will have a Question with four possible
answers. So two models...

.. code-block:: python

    from django.db import models

    class Question(models.Model):
        test = models.CharField(max_length=128)

    class Answer(models.Model):
        question = models.ForeignKey(Question)
        test = models.CharField(max_length=20)
        is_correct = models.BooleanField(default=False)

Basically we want a form that stores both the question and the
answers and checks the answer is a valid choice. You could do it this way.

.. code-block:: python

    from django import forms

    class QuizForm(forms.Form):

        def __init__(self,question, *args, **kwargs):
            super(QuizForm, self).__init__(*args, **kwargs)

            self.fields['question'] = forms.IntegerField(widget= \
                forms.HiddenInput, initial=question.id)
            self.fields['answers'] = forms.ModelChoiceField(queryset= \
                question.answers_set)

Now in this example that's actually not too bad. It's still a bit hacky
as we tap into the fields dict after calling the parents constructor. I
have a variant of this where I moved the field generation out of the
`__init__` but that doesn't really change much - just gives you the
option of calling it later. Remember this is a very simple example,
what if you need to generate a class based on 20 parameters?

So how can we solve this with `type()`? Well lets step back a minute and
quickly refresh ourselves with the builtin function `type()`. There are
two ways to use this function the first is by calling `type(object)`
and the type of that object is returned. The second is to create
classes at runtime by using `type()` as a class constructor.

First lets look at an example that has exactly with the same result
as the previous example.

.. code-block:: python

    def quiz_form_factory(question):

        properties = {
            'question' : forms.IntegerField(widget=forms.HiddenInput, \
                initial=question.id),
            'answers' : forms.ModelChoiceField(queryset= \
                question.answers_set)
        }

        return type('QuizForm', (forms.Form,), properties)

And there we go, it's as simple as that. When using `type()` to
construct classes it takes three parameters
`type(class_name, base_classes_tuple, properties_dict)`; the name
of the class, the base classes it inherits from and the properties the
created class will have.

Besides the above implementation the usage is slightly different.

.. code-block:: python

    # start with a random question
    question = Question.objects.all().order_by('?')[0]

    # method A
    quiz_form = QuizForm(question)
    # or with POST data
    quiz_form = QuizForm(question, request.POST)

    # method B
    QuizForm = quiz_form_factory(question)
    quiz_form = QuizForm()
    # or with POST data
    quiz_form = QuizForm(request.POST)

Again, perhaps I should have chosen a more complex example as the
the first method may not look to bad and  requires less code but its
not *nice*. Using this approach basically class initialisation with the
preparation and modification of said class. The second is  much
clearer as you explicitly generate a class then create an instance of it.

The main advantage for me is the clarify this gives you and the code
used to make it dynamic is clear and better structured. It's also
worth mentioning that with a `type()` constructed form it behaves
exactly like a regular form after creation where with method A the
developer needs to pass in the question instance each time and be aware
of this requirement and how it varies from a typical Django style form.

