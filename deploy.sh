#!/bin/sh -xe

./build.sh;

git push origin master;
mv .gitignore .gitignore.bk;
mv .gitignore_deploy .gitignore;
curl -I http://www.dougalmatthews.com;
heroku push --app dm-com;
mv .gitignore .gitignore_deploy;
mv .gitignore.bk .gitignore;
heroku logs -n 5;
curl -I http://www.dougalmatthews.com;
heroku logs -n 5;
