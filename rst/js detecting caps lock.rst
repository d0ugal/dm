JavaScript Detecting Caps lock
##############################

:category: javascript
:tags: vagrant, chef, python, django, ruby, osx
:date: 2008-07-02 19:25
:title: JavaScript - Detecting Caps lock
:author: Dougal Matthews
:permalink: /articles/2008/jul/2/javascript-detecting-caps-lock/

I wanted to see if you could detect caps lock in JavaScript. Why? As a small
usability touch, basically alerting users that caps lock is enabled when they
are entering passwords for example. I’ve wrapped up the logic in a simple
function that can help you detect caps lock on a key press.

Sorry. Demo no longer exists, just copy the code and it should work straight off ;)

.. code-block:: js

    function isCapslock(e){

        e = (e) ? e : window.event;

        var charCode = false;
        if (e.which) {
            charCode = e.which;
        } else if (e.keyCode) {
            charCode = e.keyCode;
        }

        var shifton = false;
        if (e.shiftKey) {
            shifton = e.shiftKey;
        } else if (e.modifiers) {
            shifton = !!(e.modifiers & 4);
        }

        if (charCode >= 97 && charCode <= 122 && shifton) {
            return true;
        }

        if (charCode >= 65 && charCode <= 90 && !shifton) {
            return true;
        }

        return false;

    }


