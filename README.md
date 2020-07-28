# url-shortener
This repo contains the url-shortener application necessary for the task submission for ITILITE. Major things that are taken care of are caching of URL clicks, stale record removal and has the provision for dynamic length short URL scheme. I am planning to add URL validation to it.

Go to *YOUR_PREFERRED_DIRECTORY* and clone the repo using `git clone https://github.com/preetamnahak007/url-shortener`.

---
1. PROJECT SETUP (FOR REST)
* Install python and mongoDB in your system. Preferably python version >= 3.0
* Install pipenv using `pip install -g pipenv`
* Go to rest directory, i.e. `cd [YOUR_PREFERRED_DIRECTORY/url-shortener/rest]` and run `pipenv shell`
* Run `pipenv install`
* Set **environment variables** properly and make sure mongoDB is up and running.
* Env vars(3) : `DB_URL : [mongo_db_url], HOST : "0.0.0.0", PORT : "3001"`
* Run `python main.py`

---
2. PROJECT SETUP (FOR UI)
* Install latest version node.js in your system
* Go to ui directory, i.e. `cd [YOUR_PREFERRED_DIRECTORY/url-shortener/ui]` and run `npm i -S`
* Run `npm start`
* Go to [http://localhost:3000](http://localhost:3000) and enjoy :)

