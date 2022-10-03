#!/bin/sh -xe

cp ~/Dropbox/File/CV/dougalmatthews.pdf ./dm/static;
pelican content -s config.py -vv -D;
