import pymongo
import time

client = pymongo.MongoClient("localhost") #os.environ["DB_URL"]
db = client["url_db"]
collection = "url_store"

one_year = 365*24*60*60 #1 year
curr_time = time.time() #in elapsed sec
threshold = curr_time - one_year #in seconds

#Delete all the records which have not been clicked since 1 year
r1 = db[collection].delete_many({"last_clicked_on" : {"$lte" : threshold}})