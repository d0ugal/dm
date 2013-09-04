./build.sh;

mv .gitignore .gitignore.bk;
heroku push;
mv .gitignore.bk .gitignore;
