SublimeText
###########
:date: 2013-08-04 21:56
:author: Dougal Matthews
:category: sublime
:url: /notes/sublimetext/
:save_as: notes/sublimetext/index.html
:short_summary: Plugins, settings and a few other tricks.

Version
~~~~~~~

Use SublimeText 3. It's much faster. Some plugins wont work, others you
will need to manually install Python 3 branches and some are already
working great. I've found alternatives or working versions of everything
I wanted. The pain is worth it.

Below are the general configuration and plugins I'm currently using.

Plugins
~~~~~~~

The plugins I use, in no particular order.

- `Modific`_ - Show your current uncommitted changes in the gutter.
- `Package Control`_ - Manage Sublime packages.
- `SublimeGit`_ - Advanced Git plugin (this one is commercial).
- `SublimePythonIDE`_ - Linting and completion. Very nicely focused to Python development.
- `Theme - Soda`_ - A better default theme. This makes the project bar match the main window!
- `Wrap Plus`_ - Auto wrap comment bocks to 80 chars.

.. _Modific: https://github.com/gornostal/Modific
.. _Package Control: http://wbond.net/sublime_packages/package_control
.. _SublimeGit: https://sublimegit.net/
.. _SublimePythonIDE: https://github.com/JulianEberius/SublimePythonIDE
.. _Theme - Soda: https://github.com/buymeasoda/soda-theme/
.. _Wrap Plus: https://github.com/ehuss/Sublime-Wrap-Plus


Settings
~~~~~~~~

.. code-block:: json

    {
        "bold_folder_labels": true,
        "caret_style": "phase",
        "create_window_at_startup": false,
        "dictionary": "Packages/Language - English/en_GB.dic",
        "draw_white_space": "selection",
        "ensure_newline_at_eof_on_save": true,
        "fade_fold_buttons": false,
        "fold_buttons": true,
        "folder_exclude_patterns":
        [
            ".svn",
            ".git",
            ".hg",
            "CVS",
            ".tox",
            "*.egg",
            "*.egg-info",
            "__pycache__",
            ".vagrant",
            ".venv",
            ".testrepository"
        ],
        "font_size": 9,
        "highlight_line": true,
        "highlight_modified_tabs": true,
        "ignored_packages":
        [
        ],
        "indent_guide_options":
        [
            "draw_normal",
            "draw_active"
        ],
        "open_files_in_new_window": false,
        "pep8": true,
        "pep8_ignore":
        [
        ],
        "pep8_max_line_length": 79,
        "pyflakes_ignore":
        [
        ],
        "rulers":
        [
            79,
            99
        ],
        "scroll_past_end": true,
        "show_minimap": false,
        "spell_check": true,
        "tab_size": 4,
        "theme": "Soda Dark.sublime-theme",
        "translate_tabs_to_spaces": true,
        "tree_animation_enabled": false,
        "trim_trailing_white_space_on_save": true,
        "vintage_start_in_command_mode": true,
        "word_wrap": false
    }


Key Bindings
~~~~~~~~~~~~

The below key bindings, in order are to

1. super+b, toggle the visibility of the sidebar.
2. ctrl+alt+up, start multi-line editing with the line above.
3. ctrl+alt+down, start multi-line editing with the line below.

.. code-block:: json

    [
        {
            "keys": ["super+b"],
            "command": "toggle_side_bar"
        },
        {
            "keys": ["ctrl+alt+up"],
            "command": "select_lines",
            "args": {"forward": false}
        },
        {
            "keys": ["ctrl+alt+down"],
            "command": "select_lines",
            "args": {"forward": true}
        }
    ]
