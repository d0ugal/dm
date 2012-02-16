#!/bin/bash

rm -r output;
pelican rst -s config.py;

cd serve && gunicorn dm:app -b 0.0.0.0:8000