rm -r output/*;
pelican rst -s config.py;
mv .gitignore .gitignore.bk;
heroku push;
mv .gitignore.bk .gitignore;
heroku ps:scale web=0 && heroku ps:scale web=1;