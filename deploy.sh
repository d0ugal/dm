#!/bin/sh -xe

./build.sh;

ghp-import output;
git push origin ghp-import;
