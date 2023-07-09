import os
# Load environment variables first, so app can be configured correctly
# from dotenv import load_dotenv
# load_dotenv()

from api import app


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
