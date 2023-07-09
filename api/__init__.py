from os import getenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_praetorian import Praetorian
from flask_cors import CORS
from flask_mail import Mail
import stripe

# app configurations
app = Flask(__name__, static_folder="../build", static_url_path='/')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('SQLALCHEMY_DATABASE_URI')
app.config['JWT_ACCESS_LIFESPAN'] = {'minutes': 60}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 7}

app.config['MAIL_SERVER']='smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False


# Stripe Keys
stripe_public_key = getenv("STRIPE_PUBLIC_KEY")
stripe.api_key = getenv('STRIPE_PRIVATE_KEY')

# Database/ Schemas
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Security/ Login
guard = Praetorian()
cors = CORS()

# Flask mail
mail = Mail(app)

from api.models import User
from api import routes

# Initialize the flask-praetorian instance for the app
guard.init_app(app, User)
# Initializes CORS
cors.init_app(app)