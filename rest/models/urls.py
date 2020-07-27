import mongoengine

class Urls(mongoengine.Document):
	"""
		Model for 'Urls' collection
	"""
	
	short_url = mongoengine.StringField(db_field="short_url", default="", required=True, unique=True)
	long_url = mongoengine.StringField(db_field="long_url", default="", required=True, unique=True)
	created_at = mongoengine.StringField(db_field="created_at", default="", required=True, unique=False)
	meta = {'collection' : 'url_store'}