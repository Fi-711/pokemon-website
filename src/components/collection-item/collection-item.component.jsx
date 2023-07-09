import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { addItem } from '../../redux/cart/cart.actions';

import Wishlist from '../wishlist/wishlist.component';
import cardBack from '../../assets/card-back.jpg';

import {
  Text,
  Grid,
  Flex,
  Spacer,
  Button,
  Center,
  useToast,
} from '@chakra-ui/react';
import { IoCartOutline } from 'react-icons/io5';

import './collection-item.styles.scss';
import './glow.css';

/*
  Renders an item with the name, price and image displayed with the ability to add item to cart. 
  Used in all instances where it is possible to add item to cart. Solo is used to see if card is on a page by itself => 
  clicking image should not navigate you anywhere 
*/
const CollectionItem = ({
  id,
  card,
  addItem,
  history,
  match,
  solo,
  currentUser,
}) => {
  // toast
  const toast = useToast();

  // Only allow logged in users to add to basket
  const addToCart = () => {
    if (currentUser) {
      addItem(card);
      toast({
        title: 'Item Added to Card',
        description: `You've successfully added a ${card_name} card to your cart`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      history.push('/sign-in');
    }
  };

  // Deconstruct salient parts off card
  const {
    card_name,
    card_id,
    card_img_small,
    card_img_large,
    price,
    flavour_text,
  } = card;

  return (
    <Grid className='collection-item' mt={8} align='center'>
      <div
        className='image-link'
        onClick={() =>
          // If on shop page, clicking image redirects you to solo page of image
          match.url === '/shop'
            ? history.push({
                pathname: `/card-sets/${id}/${card_id}`,
                search: '',
                state: { id: card_id },
              })
            : solo
            ? // If on solo page go nowhere otherwise must be on set page so slightly different push parameters needed from shop page
              null
            : history.push({
                pathname: `${match.url}/${card_id}`,
                search: '',
                state: { id: card_id },
              })
        }
      >
        {solo ? (
          <img
            alt={card_name}
            // If solo page then choose large image and make it have a style with no pointer
            src={card_img_large}
            style={{ cursor: 'default' }}
          />
        ) : (
          <div className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <img
                  alt={card_name}
                  // If solo page then choose large image and make it have a style with no pointer
                  src={card_img_small}
                  style={{ cursor: 'pointer', width: '240px', height: '330px' }}
                />
              </div>
              <div className='flip-card-back'>
                <img src={cardBack} alt='card-back' />
                <div className='card-contents glow-orange'>
                  <h1 id='glow-title'>{card_name}</h1>
                  <p id='flavour-text'>
                    <em>{flavour_text}</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='collection-footer'>
        {solo ? (
          <Flex w={[250, 300, 350, 400, 400]} pt={2} mb={4}>
            <Wishlist cardName={card_name} card_id={card_id} card={card} />
            <Spacer />
            <Text fontSize='2xl' variant='price'>
              <span className='price'>£{price ? price.toFixed(2) : 2}</span>
            </Text>
          </Flex>
        ) : (
          <Flex w='240px' pt={2} mb={4}>
            <Text
              fontSize='2xl'
              isTruncated={true}
              mr={6}
              variant='pokemonName'
            >
              <span className='name'>{card_name}</span>
            </Text>
            <Spacer />
            <Text fontSize='2xl' variant='price'>
              <span className='price'>£{price ? price.toFixed(2) : 2}</span>
            </Text>
          </Flex>
        )}
      </div>
      <Center width='60%' mx='auto'>
        <Button
          onClick={addToCart}
          isFullWidth={true}
          mx='auto'
          mt={4}
          variant='solid'
          leftIcon={<IoCartOutline />}
          style={{
            color: '#1a1a1a',
            backgroundColor: '#ffcb05',
            border: '2px solid black',
          }}
          p={2}
        >
          Add to cart
        </Button>
      </Center>
    </Grid>
  );
};

// Get user details to see if can add to basket
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// Dispatch to redux store when item added to cart so it can keep track, no props to monitor so props section of connect function is null
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CollectionItem));
