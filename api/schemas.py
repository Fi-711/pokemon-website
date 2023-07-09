from api import ma
from api.models import Cards, Inventory, CardSets, CardStatus, CardRarity, Artist, RetreatCost, CardTypes, \
    PokemonTypes, Abilities, Attacks, AttackCost, Weaknesses, Resistances, SetPreview, Review, Wishlist, User, Purchases
from marshmallow import fields  # need to check if ma has fields property - not showing in autocomplete
"""
SQLAlchemySchema = manually add fields to include
SQLAlchemyAutoSchema = fields are added automatically
"""


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
    #
    # first_name = ma.auto_field()
    # last_name = ma.auto_field()
    # email = ma.auto_field()


class SetPreviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SetPreview


# issues with jsonifying decimals
class InventorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Inventory

    # convert decimal to float field so can jsonified
    stock = ma.auto_field()
    price = fields.Float()
    price_low = fields.Float()
    price_mid = fields.Float()
    price_high = fields.Float()


class CardSetsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CardSets


class CardStatusSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CardStatus


class CardRaritySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CardRarity


class ArtistSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Artist


class RetreatCostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RetreatCost


class CardTypesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CardTypes


class PokemonTypesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PokemonTypes


class AbilitiesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Abilities


class WeaknessesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Weaknesses


class ResistancesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Resistances


class AttackCostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AttackCost


# Need fk=true as want the foreign key card_id
class ReviewSmallSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        include_fk = True


class PurchasesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Purchases


class WishlistSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Wishlist

# Must have child schemas above parents for nesting to work
class AttacksSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Attacks

    attack_cost = ma.Nested(AttackCostSchema, many=True)


class CardSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Cards

    card_id = ma.auto_field()
    card_name = ma.auto_field()
    card_img_small = ma.auto_field()
    card_img_large = ma.auto_field()
    price = fields.Float()
    flavour_text = ma.auto_field()
    card_sets = ma.Nested(CardSetsSchema, many=True)
    inventory = ma.Nested(InventorySchema, many=True)
    card_status = ma.Nested(CardStatusSchema, many=True)
    card_rarity = ma.Nested(CardRaritySchema, many=True)
    artist = ma.Nested(ArtistSchema, many=True)
    retreat_cost = ma.Nested(RetreatCostSchema, many=True)
    card_types = ma.Nested(CardTypesSchema, many=True)
    pokemon_types = ma.Nested(PokemonTypesSchema, many=True)
    abilities = ma.Nested(AbilitiesSchema, many=True)
    attacks = ma.Nested(AttacksSchema, many=True)
    weaknesses = ma.Nested(WeaknessesSchema, many=True)
    resistances = ma.Nested(ResistancesSchema, many=True)


class CardPreviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = SetPreview

    id = ma.auto_field()
    logo = ma.auto_field()
    name = ma.auto_field()
    release_date = ma.auto_field()
    cards = ma.Nested(CardSchema(only=("card_id", "card_name", "card_img_small", "price", "flavour_text")), many=True)


# Only one User so NOT many to one so leave blank i.e. false
class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review

    date = ma.auto_field()
    title = ma.auto_field()
    content = ma.auto_field()
    rating = ma.auto_field()
    card_id = ma.auto_field()
    user_email = ma.auto_field()
    card_name = ma.auto_field()
    card_set = ma.auto_field()
    user = ma.Nested(UserSchema(only=("first_name",)))


# User Account Data
class UserAccountSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    email_validated = ma.auto_field()
    review = ma.Nested(ReviewSmallSchema(), many=True)
    purchase = ma.Nested(PurchasesSchema(), many=True) 
    wishlist = ma.Nested(WishlistSchema(), many=True)