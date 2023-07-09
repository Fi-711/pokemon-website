from flask import request, jsonify
from api import app, db, guard, mail, stripe_public_key
from flask_praetorian import auth_required, current_user, roles_accepted
from datetime import datetime, timedelta
from api.models import Cards, SetPreview, User, Review, Cart, Wishlist
from api.schemas import CardSchema, CardPreviewSchema, SetPreviewSchema, ReviewSchema, UserAccountSchema
import simplejson as json
import re
import stripe


@app.errorhandler(404)
def not_found(e):
    """
    Send user to home page 404 error occurs

    """

    return app.send_static_file('index.html')


@app.route('/', methods=["GET"])
def index():
    """
    Default route - sends user to homepage

    """
    return app.send_static_file('index.html')


@app.route('/api/sign-up', methods=['POST'])
def sign_up():
    """
    Registers a new user by parsing a POST request containing new user info and
    dispatching an email with a registration token

    """
    req = request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)

    match = re.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$", password)

    # Recheck password of right format as may have been sent with Postman - 418 = I'm a Teapot Error!
    if not match:
        return jsonify(message={"message": "Error, wrong password format"}), 418

    query = db.session.query(User).filter(User.email == email).all()

    # 409 error for server conflicts when email already exists
    if query:
        return "User already registered", 409

    first_name = req.get('firstName', None)
    last_name = req.get('lastName', None)
    new_user = User(
        email=email,
        password=guard.hash_password(password),
        first_name=first_name,
        last_name=last_name,
        roles='user'
    )
    db.session.add(new_user)
    db.session.commit()

    guard.send_registration_email(email=email, user=new_user, confirmation_sender="Pokemon Cards Shop",
                                  confirmation_uri='http://pokemon-cards-shop.apps.cs.cf.ac.uk/validation',
                                  subject="Confirm Registration",
                                  override_access_lifespan=timedelta(hours=24))
    
    ret = {'message': f'successfully sent registration email to {email}'}
    
    return jsonify(message=ret), 201


@app.route('/api/validate-email', methods=["GET"])
def validate_email():
    """
    Finalizes a user registration with the token that they were issued in their
    registration email

    """
    registration_token = guard.read_token_from_header()
    user = guard.get_user_from_registration_token(registration_token)
    
    user.email_validated = True
    db.session.add(user)
    db.session.commit()

    ret = {'user': user.email, 'accessToken': guard.encode_jwt_token(user), 'name': user.first_name.title(),  'cart': [], 'wishlist': [], 'isAdmin': False}

    return ret, 200


@app.route('/api/login', methods=['POST'])
def login():
    """
    Validate user login by checking credentials with db and then issue a JW Token.
    Send cart data and wishlist from db so can repopulate saved cart.

    """
    req = request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)

    query = db.session.query(User).filter_by(email=email).first()
    name = query.first_name if query is not None else ''
    is_admin = query.roles == "admin"

    user = guard.authenticate(email, password)

    # Check if user had any items in their cart
    query = db.session.query(Cart).filter_by(user_email=email).all()
    items = []

    # Package card items into an object (axios will jsonify so no need) and then send it as a response
    for item in query:
        card = db.session.query(Cards).filter_by(card_id=item.card_id).first()
        items.append({'card_id': card.card_id, 'card_img_small': card.card_img_small, 'price': card.price,
                      'card_name': card.card_name, 'quantity': item.item_quantity})

    db.session.commit()

    # Check if they have any items wishlisted
    query_two = db.session.query(Wishlist).filter_by(user_email=email).all()
    wishlist= []

    for item in query_two:
        card = db.session.query(Cards).filter_by(card_id=item.card_id).first()
        wishlist.append({'card_id': card.card_id, 'card_img_small': card.card_img_small, 'price': card.price,
                      'card_name': card.card_name})

    db.session.commit()

    ret = {'user': email, 'accessToken': guard.encode_jwt_token(user), 'name': name.title(), 'cart': items, 'wishlist': wishlist, 'isAdmin': is_admin}

    return ret


@app.route('/api/refresh', methods=['POST'])
def refresh():
    """
    Refresh access token - current tokens last 60 minutes with lifespan of 30 days. Called every time user visits the
    home page.

    """
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200



@app.route('/api/get-reviews', methods=["GET"])
def get_reviews():
    """
    Return all the reviews available for that specific card

    """
    req = request.args.get('param')

    review_schema = ReviewSchema(many=True)
    query = db.session.query(Review).filter(Review.card_id == req).all()

    res = review_schema.dumps(query)

    return res, 200


@app.route('/api/card-sets', methods=['GET'])
def card_sets():
    """
    Queries the database for the card set logos and card set details - 30 in db

    """
    set_preview_schema = SetPreviewSchema(many=True)
    query = db.session.query(SetPreview).all()
    return set_preview_schema.dumps(query), 200


@app.route('/api/shop', methods=['GET'])
def shop():
    """
    Queries the database for all the cards in the db and returns them by set but only card_name, img and price

    """
    card_preview_schema = CardPreviewSchema(many=True)
    query = db.session.query(SetPreview).all()
    res = card_preview_schema.dumps(query)

    return res, 200


@app.route('/api/card', methods=['GET'])
def get_card():
    """
    Queries the database for any cards with the matching card_id param and returns any found card - should be one as
    card_id's are unique.

    """
    req = request.args.get('param')

    card_schema = CardSchema(many=True)
    q = db.session.query(Cards).filter(Cards.card_id == req).all()
    res = card_schema.dumps(q)

    return res, 200

"""
Stripe Payment Routes

"""
@app.route('/api/stripe-key', methods=["GET"])
def get_stripe_token():
    """
    Send back the stripe public key

    """
    return stripe_public_key, 200


@app.route('/api/payment', methods=["POST"])
def payment():
    """
    Process payment and send for validation to Stripe - not authenticated so anonymous users can buy too!

    """
    req = request.get_json()['data']['paymentData']

    source = req['token']
    amount = req['amount']
    currency = 'gbp'
    email=req['email']

    stripe.Charge.create(amount=amount, currency=currency, source=source, receipt_email=email)

    return "success", 200


"""
Authenticated Routes

"""
@app.route('/api/add-review', methods=["POST"])
@auth_required
def add_review():
    """
    Authorised route - only those logged in can access. Adds valid reviews to the database.

    """
    res = request.get_json()['data']

    rating, title, content, email, card_id, card_name, card_set = res['rating'], res['title'], res['content'], res['email'], res['card_id'], res['card_name'], res['card_set']

    query = db.session.query(Review).filter(Review.user_email == email, Review.card_id == card_id).first()

    # if review already exists - modify it
    if query:
        query.rating = rating
        query.title = title
        query.content = content

    # otherwise add new review
    else:
        new_review = Review(title=title, content=content, rating=rating, card_id=card_id, user_email=email, card_name=card_name, card_set=card_set)
        db.session.add(new_review)
    
    db.session.commit()

    return jsonify({'message': 'successfully posted a review!'}), 200


@app.route('/api/savecart', methods=["POST"])
@auth_required
def save_cart_to_db():
    """
    Saves cart items to db upon logout

    """
    req = request.get_json()
    cart = req.get('cartItems')

    # Check if user had any items in their cart
    query = db.session.query(Cart).filter_by(user_email=current_user().email).all()

    # empty database of card items before adding new cart
    for item in query:
        db.session.query(Cart).filter(Cart.card_id==item.card_id, Cart.user_email==current_user().email).delete()
    db.session.commit()

    if len(cart) > 0:
        for item in cart:
            db.session.add(Cart(item_quantity=item['quantity'], card_id=item['card_id'], user_email=current_user().email))
            db.session.commit()
        return {'message': 'Successfully saved items from cart'}, 200
    return {'message': 'No items to save to cart!'}, 200


@app.route('/api/wishlist', methods=["POST"])
@auth_required
def update_wishlist():
    """
    Save item to wishlist table in db

    """
    req = request.get_json().get('data')
    
    user = req['user']
    wishlist = req['wishlist']

    # Check if they have any items wishlisted
    query = db.session.query(Wishlist).filter_by(user_email=current_user().email).all()
    
    # empty database of card items before adding new wishlist
    for item in query:
        db.session.query(Wishlist).filter(Wishlist.card_id==item.card_id, Wishlist.user_email==current_user().email).delete()
    db.session.commit()

    # add items to wishlist on logout
    for item in wishlist:
        db.session.add(Wishlist(card_id=item['card_id'], user_email=user))

    db.session.commit()
   
    return "success", 200


@app.route('/api/account-user', methods=["POST"])
@auth_required
def get_account_info():
    """
    Registered users can gain their account info details.
    
    """
    req = request.get_json()
    email = req['data']['currentUser']

    user_schema = UserAccountSchema(many=True)
    query = db.session.query(User).filter(User.email == email).all()
    result = user_schema.dumps(query)

    return result, 200


@app.route('/api/receipts', methods=["POST"])
@auth_required
def get_receipts():
    """
    Return a list of receipts for a specific email

    """
    req = request.get_json()['data']
    email = req['currentUser']
    # print(email)
    res = stripe.Charge.list(limit=100)['data']
    items = [item for item in res if item['receipt_email'] == email]
    
    ret = {"charges": items}

    return ret, 200


"""
Admin Routes

"""
@app.route('/api/account-admin', methods=["POST"])
@auth_required
@roles_accepted('admin')
def get_admin_info():
    """
    Return admin related data from the db

    """
    # last 100 receipts from stripe
    res = stripe.Charge.list(limit=100)['data']
    items = [item for item in res]
    
    ret = {"charges": items}

    return ret, 200
