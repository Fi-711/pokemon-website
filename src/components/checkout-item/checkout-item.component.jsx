import React from 'react';
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

import { Grid, GridItem, Text, Box, HStack, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { card_name, card_img_small, price, quantity } = cartItem;

  // toast
  const toast = useToast();

  return (
    <GridItem colSpan={8} my={4}>
      <Grid
        className='checkout-item'
        width='100%'
        templateColumns='repeat(8, 1fr)'
      >
        <GridItem colSpan={[3, 3, 3, 3]}>
          <div className='image-container'>
            <img src={card_img_small} alt={card_name} />
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
          <HStack className='quantity'>
            <div className='arrow' onClick={() => removeItem(cartItem)}>
              &#10094;
            </div>
            <Text fontSize={{ sm: 'md', md: 'xl' }}>
              <span className='value'>{quantity}</span>
            </Text>
            <div className='arrow' onClick={() => addItem(cartItem)}>
              &#10095;
            </div>
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
              clearItem(cartItem);
              toast({
                title: 'Removed from Basket',
                description: `Removed ${card_name} from your Basket`,
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
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
