import os
import time
import logging
import random
from faker import Faker
from mongoengine import connect, disconnect
# from urllib.parse import urlparse
from models.urls import Urls

fake = Faker()
Faker.seed(0)

class shortener:

	@staticmethod
	def fetchShortUrl(long_url):
		
		alias_name = "_CREATE_"+str(random.randint(100000000,999999999))
		try:
			db_name = "url_db"
			connect(db=db_name, alias="default", host=os.environ["DB_URL"])
			connect(db=db_name, alias=alias_name, host=os.environ["DB_URL"])

			if long_url == "":
				raise Exception("Long url cannot be empty")

			#Regex to validate the url format (Can be done in client side)
			# r0 = urlparse(long_url)
			# print(r0)
			# if not r0.scheme or not r0.netloc:
			# 	raise Exception("Invalid URL passed")

			#Check if any short_url corresponding to the longurl already exists
			try:
				object_fetched = Urls.objects.get(long_url=long_url)
				object_fetched = object_fetched.to_mongo().to_dict()
				del object_fetched['_id']
				return {"status" : "success", "message" : object_fetched["short_url"]}
			except:
				pass


			#Else try to create one
			flag = True
			retry = 3
			while(retry > 0 and flag):
				short_url = fake.bothify(text='?????#####')
				try:
					url_doc = Urls()
					url_doc.short_url = short_url
					url_doc.long_url = long_url
					url_doc.created_at = str(int(time.time()))
					url_doc.save()

					flag = False
				except:
					retry = retry - 1

			if not flag:
				#successful insertion
				return {"status" : "success", "message" : short_url}

			return {"status" : "failure", "message" : "Something went wrong. Please try again"}

			disconnect(alias=alias_name)
			disconnect(alias="default")
		except Exception as e:
			logging.warning("[services.url.shortener] - %s", e)
			return {"status" : "failure", "message" : str(e)}

	@staticmethod
	def fetchLongUrl(short_url):
		pass

