import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addItem } from '../../redux/cart/cart.actions';
import { removeFromWishlist } from '../../redux/user/user.actions';

import {
  Grid,
  GridItem,
  Text,
  Box,
  HStack,
  Button,
  useToast,
  Center,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';
import { IoCartOutline } from 'react-icons/io5';

import './wishlist-item.styles.scss';

/*
  Wishlist item that appear in the user's account
 */
const WishlistItem = ({ card, addItem, removeFromWishlist, history }) => {
  const { card_name, card_img_small, price, card_id } = card;
  const toast = useToast();

  // link to card - no access to card-set but can use wishlist as placeholder to get to card image
  const handleClick = () => {
    history.push({
      pathname: `/card-sets/wishlist/${card_id}`,
      state: { id: card_id },
    });
  };

  return (
    <GridItem colSpan={8} my={6}>
      <Grid
        className='wishlist-item'
        width='100%'
        templateColumns='repeat(8, 1fr)'
      >
        <GridItem colSpan={[3, 3, 3, 3]}>
          <div className='image-container'>
            <img src={card_img_small} alt={card_name} onClick={handleClick} />
          </div>
        </GridItem>
        <GridItem
          colSpan={[0, 0, 0, 2]}
          display={['none', 'none', 'none', 'flex']}
          m='auto'
        >
          <Box>
            <Text fontSize={{ sm: 'lg', md: 'xl' }}>
              <span className='name'>{card_name}</span>
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={[2, 2, 2, 1]} m='auto'>
          <HStack className='card_id'>
            <Center display={['none', 'none', 'none', 'flex']} maxW='95%'>
              <Button
                onClick={() => {
                  addItem(card);
                  toast({
                    title: 'Item Added to Card',
                    description: `You've successfully added a ${card_name} card to your cart`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                  });
                }}
                mx='auto'
                mt={4}
                variant='solid'
                leftIcon={<IoCartOutline />}
                style={{
                  color: '#1a1a1a',
                  backgroundColor: '#ffcb05',
                  border: '2px solid black',
                }}
              >
                Add to cart
              </Button>
            </Center>
            <Center display={['flex', 'flex', 'flex', 'none']}>
              <Button
                onClick={() => {
                  addItem(card);
                  toast({
                    title: 'Item Added to Card',
                    description: `You've successfully added a ${card_name} card to your cart`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                  });
                }}
                mx='auto'
                mt={4}
                variant='solid'
                leftIcon={<IoCartOutline />}
                style={{
                  color: '#1a1a1a',
                  backgroundColor: '#ffcb05',
                  border: '2px solid black',
                }}
              />
            </Center>
          </HStack>
        </GridItem>
        <GridItem colSpan={[2, 2, 2, 1]} m='auto'>
          <Text fontSize={{ sm: 'md', md: 'xl' }}>
            <span className='price'>£{price.toFixed(2)}</span>
          </Text>
        </GridItem>
        <GridItem colSpan={1} m='auto'>
          <DeleteIcon
            className='remove-button'
            onClick={() => {
              removeFromWishlist(card);
              toast({
                title: 'Removed from Wishlist',
                description: `Removed ${card.card_name} from your Wishlist`,
                status: 'info',
                duration: 3000,
                isClosable: true,
                position: 'top',
              });
            }}
          />
        </GridItem>
      </Grid>
    </GridItem>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeFromWishlist: (item) => dispatch(removeFromWishlist(item)),
});

export default connect(null, mapDispatchToProps)(withRouter(WishlistItem));
