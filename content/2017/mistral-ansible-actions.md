title: Calling Ansible from Mistral Workflows
category: openstack
tags: openstack, tripleo, ansible, python, mistral
date: 2017-01-12 14:20:18
author: Dougal Matthews

I have spoken with a few people that were interested in calling [Ansible] from
[Mistral] Workflows.

I finally got around to trying to make this happen. All that was needed was a
very small and simple [custom action] that I put together, uploaded [to github]
and also published to [pypi].

Here is an example of a simple Mistral Workflow that makes use of these new
actions.

```
---
version: 2.0

run_ansible_playbook:
  type: direct
  tasks:
    run_playbook:
      action: ansible-playbook
      input:
        playbook: path/to/playbook.yaml
```

Installing and getting started with this action is fairly simple. This is how
I done it in my [TripleO] undercloud.

```
sudo pip install mistral-ansible-actions;
sudo mistral-db-manage populate;
sudo systemctrl restart openstack-mistral*;
```

There is one **gotcha** that might be confusing. The Mistral Workflow runs as
the mistral user, this means that the user needs permission to access the 
Ansible playbook files.

After you have installed the custom actions, you can test it with the Mistral
CLI. The first command should work without anything extra setup, the second
requires you to create a playbook somewhere and provide access.

```
mistral run-action ansible '{"hosts": "localhost", "module": "setup"}'
mistral run-action ansible-playbook '{"playbook": "path/to/playbook.yaml"}'
```

The action supports a few other input parameters, they are all listed for now
in the README in the [git repo][to github]. This is a very young project, but I 
am curious to know if people find it useful and what other features it would 
need.

If you want to write custom actions, check out the [Mistral
documentation][writing custom actions].

[writing custom actions]: http://docs.openstack.org/developer/mistral/developer/creating_custom_action.html
[custom action]: https://github.com/d0ugal/mistral-ansible-actions/blob/master/mistral_ansible_actions.py
[Ansible]: https://www.ansible.com/
[Mistral]: http://docs.openstack.org/developer/mistral/index.html
[to github]: https://github.com/d0ugal/mistral-ansible-actions
[pypi]: https://pypi.python.org/pypi/mistral-ansible-actions
[TripleO]: http://docs.openstack.org/developer/tripleo-docs/
