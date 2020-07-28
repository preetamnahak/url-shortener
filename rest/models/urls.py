import mongoengine
import time

class Urls(mongoengine.Document):
	"""
		Model for 'Urls' collection
	"""
	
	short_url = mongoengine.StringField(db_field="short_url", default="", required=True, unique=True)
	long_url = mongoengine.StringField(db_field="long_url", default="", required=True, unique=True)
	created_at = mongoengine.FloatField(db_field="created_at", default=time.time(), required=True, unique=False)
	last_clicked_on = mongoengine.FloatField(db_field="last_clicked_on", default=time.time(), required=False, unique=False)
	meta = {'collection' : 'url_store'}