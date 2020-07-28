from flask import Flask, request
from services.url import shortener
from flask_caching import Cache 

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


@app.route('/fetch-short-url', methods=["POST"])
def fetchShortUrl():
	long_url = request.form['long_url']
	return shortener.fetchShortUrl(long_url)


@app.route('/fetch-long-url/<short_url>', methods=["GET"])
@cache.cached(timeout=300) #timeout 5 Minutes
def fetchLongUrl(short_url):
	return shortener.fetchLongUrl(short_url)
	
