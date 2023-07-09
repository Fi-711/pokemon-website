import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

import {
  Center,
  Grid,
  GridItem,
  Divider,
  Text,
  Spacer,
  Flex,
  Box,
  Button,
  useColorMode,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';
import { IoPricetagOutline } from 'react-icons/io5';
import { AiOutlineNumber } from 'react-icons/ai';
import { RiProductHuntLine } from 'react-icons/ri';

const CheckoutPage = ({ cartItems, total }) => {
  const { colorMode } = useColorMode();
  const [showForm, toggleShowForm] = useState(false);

  return showForm ? (
    <>
      <Button
        mx='auto'
        mt={12}
        w='150px'
        onClick={() => toggleShowForm(!showForm)}
        bgColor='blue.400'
        color='white'
        border='none'
        _hover={{ bg: '#2a75bb' }}
      >
        Back
      </Button>
      <StripeCheckoutButton
        price={total.toFixed(2)}
        style={{ margin: 'auto' }}
      />
      <Center
        colSpan={8}
        className='test-warning'
        color='red'
        textAlign='center'
        border={colorMode === 'dark' ? '2px solid white' : '2px solid #1a1a1a'}
        width={{ sm: '80%', md: '60%' }}
        mx='auto'
        my={4}
      >
        <Text fontSize={{ sm: 'lg', md: 'xl' }}>
          *Test Card Details*
          <br />
          Card No: 4242 4242 4242 4242 - Exp: 07/21 - CVV: 123
        </Text>
      </Center>
    </>
  ) : (
    <Flex width={[300, 450, 750, 900, 1200, 1400]} mx='auto'>
      <Grid
        className='checkout-page'
        templateColumns={{ md: 'repeat(8, 1fr)' }}
        mx='auto'
        width='100%'
        my='50px'
        p={2}
      >
        <GridItem colSpan={[3, 3, 3, 3]} className='header-block' mx='auto'>
          <Text
            fontSize={{ sm: 'md', md: 'xl' }}
            display={['none', 'none', 'none', 'flex']}
          >
            <span>Product</span>
          </Text>
          <Box display={['flex', 'flex', 'flex', 'none']}>
            <RiProductHuntLine />
          </Box>
        </GridItem>

        <GridItem
          colSpan={[0, 0, 0, 2]}
          display={['none', 'none', 'none', 'flex']}
          className='header-block'
          id='description'
          mx='auto'
        >
          <Text fontSize={{ sm: 'md', md: 'xl' }}>
            <span>Description</span>
          </Text>
        </GridItem>

        <GridItem colSpan={[2, 2, 2, 1]} className='header-block' mx='auto'>
          <Text
            fontSize={{ sm: 'md', md: 'xl' }}
            display={['none', 'none', 'none', 'flex']}
          >
            <span>Quantity</span>
          </Text>
          <Box display={['flex', 'flex', 'flex', 'none']}>
            <AiOutlineNumber />
          </Box>
        </GridItem>

        <GridItem colSpan={[2, 2, 2, 1]} className='header-block' mx='auto'>
          <Text
            fontSize={{ sm: 'md', md: 'xl' }}
            display={['none', 'none', 'none', 'flex']}
          >
            <span>Price</span>
          </Text>
          <Box display={['flex', 'flex', 'flex', 'none']}>
            <IoPricetagOutline />
          </Box>
        </GridItem>

        <GridItem colSpan={[1, 1, 1, 1]} className='header-block' mx='auto'>
          <Text
            fontSize={{ sm: 'md', md: 'xl' }}
            display={['none', 'none', 'none', 'flex']}
          >
            <span>Remove</span>
          </Text>
          <Box display={['flex', 'flex', 'flex', 'none']}>
            <DeleteIcon />
          </Box>
        </GridItem>

        <GridItem colSpan={8}>
          <Divider my={3} />
        </GridItem>
        <GridItem colSpan={8}>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={uuidv4()} cartItem={cartItem} />
          ))}
        </GridItem>

        <GridItem colSpan={8} className='total'>
          <Text textAlign='right' fontSize={{ sm: 'xl', md: '4xl' }}>
            <span>TOTAL: £{total.toFixed(2)}</span>
          </Text>
        </GridItem>
        {/* <GridItem
          colSpan={8}
          className='test-warning'
          color='red'
          textAlign='center'
          border={
            colorMode === 'dark' ? '2px solid white' : '2px solid #1a1a1a'
          }
          width={{ sm: '80%', md: '60%' }}
          mx='auto'
          my={4}
        >
          <Text fontSize={{ sm: 'lg', md: 'xl' }}>
            *Test Card Details*
            <br />
            Card No: 4242 4242 4242 4242 - Exp: 07/21 - CVV: 123
          </Text>
        </GridItem> */}
        <GridItem colSpan={8}>
          <Flex>
            <div />
            <Spacer />
            <Button
              onClick={() => toggleShowForm(!showForm)}
              bgColor='blue.400'
              color='white'
              border='none'
              _hover={{ bg: '#2a75bb' }}
            >
              Pay Now
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
