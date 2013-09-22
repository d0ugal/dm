./build.sh;

mv .gitignore .gitignore.bk;
mv .gitignore_deploy .gitignore;
heroku push --app dm-com;
mv .gitignore .gitignore_deploy;
mv .gitignore.bk .gitignore;
heroku ps:scale web=0 && heroku ps:scale web=1;
