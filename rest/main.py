import os
import logging
from controllers.controller import app

os.environ["HOST"] = "0.0.0.0"
os.environ["PORT"] = "3001"
os.environ["DB_URL"] = "localhost"

if __name__ == '__main__' :
	logging.info("[main] - dev server running on %s:%s", os.environ["HOST"], os.environ["PORT"])
	app.run(debug=True, host=os.environ["HOST"], port=int(os.environ["PORT"]))
