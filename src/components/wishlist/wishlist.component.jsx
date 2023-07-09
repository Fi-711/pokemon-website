import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectWishlistItems,
} from '../../redux/user/user.selectors';

import { Text, useToast } from '@chakra-ui/react';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import './wishlist.styles.scss';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/user/user.actions';

/*
Not to be confused with wishlist item or page - this wishlist is the heart icon on a collection item. It is connected
to redux and moves items into user's wishlist cart as needed.
 */
const Wishlist = ({
  cardName,
  currentUser,
  card_id,
  wishlistItems,
  addToWishlist,
  removeFromWishlist,
  card,
}) => {
  const [wishlist, setWishlist] = useState(false);
  const toast = useToast();

  useEffect(() => {
    //Check if card is wishlisted
    const isWishlisted = () => {
      return wishlistItems.length > 0
        ? wishlistItems.filter((card) => card.card_id === card_id).length > 0
        : false;
    };

    wishlistItems && setWishlist(isWishlisted());
  }, []);

  // Add or remove from wishlist in db
  const updateWishlist = () => {
    if (wishlist) {
      removeFromWishlist(card);
      toast({
        title: 'Removed from Wishlist',
        description: `Removed ${cardName} from your Wishlist`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else {
      addToWishlist(card);
      toast({
        title: 'Added to Wishlist',
        description: `Added ${cardName} to your Wishlist`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleClick = () => {
    setWishlist(!wishlist);
    updateWishlist();
  };

  return currentUser ? (
    <div className='wishlist' onClick={handleClick}>
      <Text variant='pokemonName' fontSize='2xl' display='inline' mr={2}>
        Wishlist
      </Text>
      {wishlist ? (
        <FavoriteIcon className='wishlist-icon' />
      ) : (
        <FavoriteBorderIcon className='wishlist-icon' />
      )}
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  wishlistItems: selectWishlistItems,
});

const mapDispatchToProps = (dispatch) => ({
  addToWishlist: (item) => dispatch(addToWishlist(item)),
  removeFromWishlist: (item) => dispatch(removeFromWishlist(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
