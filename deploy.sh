#!/bin/sh -xe

./build.sh;

git push origin master;
mv .gitignore .gitignore.bk;
mv .gitignore_deploy .gitignore;
heroku push --app dm-com;
mv .gitignore .gitignore_deploy;
mv .gitignore.bk .gitignore;

sleep 1;
heroku logs -n 5;
curl -I http://dougalmatthews.com;
heroku logs -n 5;
