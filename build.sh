cp ~/Dropbox/CV/dougalmatthews.pdf ./dm/static;
rm -r output/*;
pelican rst -s config.py;
