#!/bin/sh -xe

cp ~/Dropbox/CV/dougalmatthews.pdf ./dm/static;
rm -rf output/*;
pelican content -s config.py -vv -D;
