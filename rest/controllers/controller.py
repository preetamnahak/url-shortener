from flask import Flask, request
from services.url import shortener

app = Flask(__name__)



@app.route('/fetch-short-url', methods=["POST"])
def fetchShortUrl():
	long_url = request.form['long_url']
	return shortener.fetchShortUrl(long_url)


@app.route('/fetch-long-url', methods=["POST"])
def fetchLongUrl():
	short_url = request.form['short_url']
	return shortener.fetchLongUrl(short_url)
	
