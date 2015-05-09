#!/bin/sh -xe

./build.sh;

git push origin master;
ghp-import output;
git push origin ghp-import;
