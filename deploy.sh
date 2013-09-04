./build.sh;

mv .gitignore .gitignore.bk;
heroku push --app dm-com;
mv .gitignore.bk .gitignore;
