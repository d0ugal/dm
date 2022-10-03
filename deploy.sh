#!/bin/sh -xe

touch ./output/tmp;
rm -r ./output/*;
./build.sh;

git push origin master;
REV=$(git rev-parse --short HEAD);
MSG="Deployed $REV";
ghp-import output -m "$MSG";
git push origin gh-pages;
echo $MSG
