from datetime import datetime
from api import db
from sqlalchemy import func

"""
Modify following tables in MySQL DB with following commands BEFORE pushing to db so it accepts utf-8 characters

ALTER TABLE cards MODIFY card_name TEXT CHARSET utf8mb4;
ALTER TABLE cards MODIFY flavour_text TEXT CHARSET utf8mb4;
ALTER TABLE attacks MODIFY attack_text TEXT CHARSET utf8mb4;
ALTER TABLE abilities MODIFY ability_text TEXT CHARSET utf8mb4;
"""


# Modified model from flask praetorian quick start docs: https://pythonhosted.org/flask-praetorian/quickstart.html
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    email_validated = db.Column(db.Boolean, nullable=False, default=False)
    is_active = db.Column(db.Boolean, default=True)
    review = db.relationship('Review', back_populates='user', lazy=True)
    purchase = db.relationship('Purchases', back_populates='user', lazy=True)
    cart = db.relationship('Cart', back_populates='user', lazy=True)
    wishlist = db.relationship('Wishlist', back_populates='user', lazy=True)

    def __repr__(self):
        return self.first_name

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except:
            return []

    @classmethod
    def lookup(cls, email):
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, server_default=func.now())
    card_name = db.Column(db.String(100), nullable=False)
    card_set = db.Column(db.String(100), nullable=False)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False, default=3)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    user_email = db.Column(db.String(120), db.ForeignKey('user.email'), nullable=False)
    user = db.relationship('User', back_populates='review', lazy=True)
    cards = db.relationship('Cards', back_populates='review', lazy=True)

    def __repr__(self):
        return f"Review '{self.date}', '{self.title}', '{self.content}'"


class Purchases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    item_name = db.Column(db.String(100), nullable=False)
    item_price = db.Column(db.Numeric(10, 2), nullable=False)
    item_quantity = db.Column(db.Integer, nullable=False)
    user_email = db.Column(db.String(120), db.ForeignKey('user.email'), nullable=False)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    cards = db.relationship('Cards', back_populates='purchase', lazy=True)
    user = db.relationship('User', back_populates='purchase', lazy=True)


class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_quantity = db.Column(db.Integer, nullable=False)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    user_email = db.Column(db.String(120), db.ForeignKey('user.email'), nullable=False)
    cards = db.relationship('Cards', back_populates='cart', lazy=True)
    user = db.relationship('User', back_populates='cart', lazy=True)


class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # item_quantity = db.Column(db.Integer, nullable=False)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    user_email = db.Column(db.String(120), db.ForeignKey('user.email'), nullable=False)
    cards = db.relationship('Cards', back_populates='wishlist', lazy=True)
    user = db.relationship('User', back_populates='wishlist', lazy=True)


class Cards(db.Model):
    card_id = db.Column(db.String(50), primary_key=True)
    card_img_small = db.Column(db.String(255), nullable=False)
    card_img_large = db.Column(db.String(250), nullable=False)
    card_name = db.Column(db.String(100), nullable=False)
    flavour_text = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    set_id = db.Column(db.String(50), db.ForeignKey('set_preview.id'), nullable=False)
    inventory = db.relationship('Inventory', back_populates='cards', lazy=True)
    card_sets = db.relationship('CardSets', back_populates='cards', lazy=True)
    card_status = db.relationship('CardStatus', back_populates='cards', lazy=True)
    card_rarity = db.relationship('CardRarity', back_populates='cards', lazy=True)
    artist = db.relationship('Artist', back_populates='cards', lazy=True)
    retreat_cost = db.relationship('RetreatCost', back_populates='cards', lazy=True)
    card_types = db.relationship('CardTypes', back_populates='cards', lazy=True)
    pokemon_types = db.relationship('PokemonTypes', back_populates='cards', lazy=True)
    abilities = db.relationship('Abilities', back_populates='cards', lazy=True)
    attacks = db.relationship('Attacks', back_populates='cards', lazy=True)
    weaknesses = db.relationship('Weaknesses', back_populates='cards', lazy=True)
    resistances = db.relationship('Resistances', back_populates='cards', lazy=True)
    sets = db.relationship('SetPreview', back_populates='cards', lazy=True)
    purchase = db.relationship('Purchases', back_populates='cards', lazy=True)
    cart = db.relationship('Cart', back_populates='cards', lazy=True)
    wishlist = db.relationship('Wishlist', back_populates='cards', lazy=True)
    review = db.relationship('Review', back_populates='cards', lazy=True)

    def __repr__(self):
        return f"Card '{self.card_name}', '{self.flavour_text}''"


class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    price_low = db.Column(db.Numeric(10, 2), nullable=False)
    price_mid = db.Column(db.Numeric(10, 2), nullable=False)
    price_high = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)
    cards = db.relationship('Cards', back_populates='inventory')


class CardSets(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    set_id = db.Column(db.String(50), nullable=False)
    card_set = db.Column(db.String(50), nullable=False)
    set_number = db.Column(db.String(50))
    set_total = db.Column(db.Integer, nullable=False)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    cards = db.relationship("Cards", back_populates="card_sets")


class CardStatus(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    legal_standard = db.Column(db.String(30))
    legal_expanded = db.Column(db.String(30))
    legal_unlimited = db.Column(db.String(30))
    cards = db.relationship('Cards', back_populates='card_status')


class CardRarity(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    card_rarity = db.Column(db.String(50))
    cards = db.relationship('Cards', back_populates='card_rarity')


class Artist(db.Model):
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    artist_id = db.Column(db.Integer, primary_key=True)
    artist_name = db.Column(db.String(50))
    cards = db.relationship('Cards', back_populates='artist')


class RetreatCost(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    retreat_cost = db.Column(db.String(50))
    cards = db.relationship('Cards', back_populates='retreat_cost')


class CardTypes(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    supertype = db.Column(db.String(50), nullable=False)
    cards = db.relationship('Cards', back_populates='card_types')


class PokemonTypes(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    type = db.Column(db.String(50))
    hp = db.Column(db.String(50))
    cards = db.relationship('Cards', back_populates='pokemon_types')


class Abilities(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    ability_name = db.Column(db.String(50))
    ability_text = db.Column(db.Text)
    cards = db.relationship('Cards', back_populates='abilities')


class Attacks(db.Model):
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    attack_id = db.Column(db.Integer, nullable=False, primary_key=True)
    attack_name = db.Column(db.String(100))
    attack_damage = db.Column(db.String(10))
    attack_text = db.Column(db.Text)
    cards = db.relationship('Cards', back_populates='attacks')
    attack_cost = db.relationship('AttackCost', back_populates='attacks')


class AttackCost(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    attack_cost = db.Column(db.String(100))
    attack_id = db.Column(db.Integer, db.ForeignKey('attacks.attack_id'), nullable=False)
    attacks = db.relationship('Attacks', back_populates='attack_cost')


class Weaknesses(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    weakness_type = db.Column(db.String(50))
    weakness_value = db.Column(db.String(50))
    cards = db.relationship('Cards', back_populates='weaknesses')


class Resistances(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    card_id = db.Column(db.String(50), db.ForeignKey('cards.card_id'), nullable=False)
    resistance_type = db.Column(db.String(50))
    resistance_value = db.Column(db.String(50))
    cards = db.relationship('Cards', back_populates='resistances')


class SetPreview(db.Model):
    id = db.Column(db.String(50), nullable=False, primary_key=True)
    logo = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    release_date = db.Column(db.String(50))
    series = db.Column(db.String(50))
    cards = db.relationship('Cards', back_populates='sets', lazy=True)

    def __repr__(self):
        return f"{self.id} {self.name} {self.release_date} {self.series} {self.logo}"
