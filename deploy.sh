./build.sh;
git push origin master;
mv .gitignore .gitignore.bk;
mv .gitignore_deploy .gitignore;
heroku push --app dm-com && heroku ps:scale web=0 && heroku ps:scale web=1;
mv .gitignore .gitignore_deploy;
mv .gitignore.bk .gitignore;
curl -I http://dougalmatthews.com;