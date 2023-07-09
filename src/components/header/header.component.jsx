import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Chakra-UI
import {
  Grid,
  Flex,
  Button,
  IconButton,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { RiAdminLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import DarkModeSwitch from '../dark-mode-switch/dark-mode-switch.component';

import {
  selectCartHidden,
  selectCartItems,
} from '../../redux/cart/cart.selectors';

import {
  selectAccessToken,
  selectCurrentUser,
  selectIsAdmin,
  selectName,
  selectWishlistItems,
} from '../../redux/user/user.selectors';

import {
  logoutCurrentUser,
  removeFromWishlist,
} from '../../redux/user/user.actions';
import { clearItemFromCart } from '../../redux/cart/cart.actions';

import logo from '../../assets/tcg-logo.svg';

import './header.styles.scss';

/*
  Bespoke header which is mobile responsive - collapse to hamburger
 */
const Header = ({
  currentUser,
  currentUserName,
  hidden,
  logoutUser,
  accessToken,
  cartItems,
  clearItemFromCart,
  isAdmin,
  wishlistItems,
  removeFromWishlist,
}) => {
  const saveCart = async () => {
    try {
      await axios.post(
        '/api/savecart',
        { cartItems: cartItems },
        { headers: { Authorization: `Bearer${accessToken}` } }
      );
      cartItems.map((item) => clearItemFromCart(item));
    } catch (error) {
      console.error(error);
    }
  };

  // Add or remove from wishlist in db
  const saveWishlist = async () => {
    try {
      await axios.post(
        '/api/wishlist',
        { data: { user: currentUser, wishlist: wishlistItems } },
        { headers: { Authorization: `Bearer${accessToken}` } }
      );
      wishlistItems.map((item) => removeFromWishlist(item));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = (e) => {
    try {
      saveCart();
      saveWishlist();
    } catch (error) {
      console.error(error);
    } finally {
      logoutUser();
    }
  };

  const [display, changeDisplay] = useState('none');
  const { colorMode } = useColorMode();

  return (
    <Grid>
      <Grid
        position='fixed'
        top={0}
        bgColor={colorMode === 'dark' ? 'brand.100' : 'gray.800'}
        height='20px'
        zIndex={80}
      />
      <Flex
        zIndex={100}
        bgColor={colorMode === 'dark' ? 'brand.100' : 'gray.800'}
        boxShadow='2px 2px #1a1a1a'
        height='74px'
        pos='fixed'
        width='100%'
      >
        <Flex
          pos='fixed'
          top='2rem'
          left='1rem'
          align='center'
          height='1.5em'
          maxWidth='80%'
        >
          <Link to='/'>
            <Image alt='tcg logo' src={logo} height='50px' mr={2} />
          </Link>
          {currentUserName ? (
            <>
              <Flex display={['none', 'none', 'flex', 'flex']}>
                <Text
                  fontSize='2xl'
                  id='username'
                  ml={5}
                  mr={3}
                  fontFamily='Architects Daughter'
                  color='brand.200'
                >
                  Hello, <span>{currentUserName}</span>
                </Text>
              </Flex>

              {isAdmin ? (
                <>
                  <Link to={`/account-admin/${currentUserName}`}>
                    <RiAdminLine
                      style={{
                        color: '#cc0000',
                        opacity: 0.8,
                        marginRight: '10px',
                        fontSize: '1.7em',
                      }}
                    />
                  </Link>
                  <Link to={`/account-user/${currentUserName}`}>
                    <AiOutlineUser
                      style={{
                        color: '#2a75bb',
                        opacity: 0.8,
                        fontSize: '1.8em',
                      }}
                    />
                  </Link>
                </>
              ) : (
                <Link to={`/account-user/${currentUserName}`}>
                  <AiOutlineUser
                    style={{
                      color: '#2a75bb',
                      opacity: 0.8,
                      fontSize: '1.8em',
                    }}
                  />
                </Link>
              )}
            </>
          ) : null}
        </Flex>
        <Flex pos='fixed' top='1rem' right='1rem' align='center' height='3em'>
          <Flex display={['none', 'none', 'flex', 'flex']}>
            <Link to='/shop'>
              <Button
                variant='ghost'
                aria-label='Shop'
                my={5}
                w='100%'
                fontSize='2xl'
                color='brand.300'
                textShadow='1px 1px #2a75bb;'
                opacity='0.8'
              >
                SHOP
              </Button>
            </Link>
            <Link to='/card-sets'>
              <Button
                variant='ghost'
                aria-label='Card SETS'
                my={5}
                w='100%'
                fontSize='2xl'
                color='brand.300'
                textShadow='1px 1px #2a75bb;'
                opacity='0.8'
              >
                CARD SETS
              </Button>
            </Link>
            {currentUser ? (
              <Button
                variant='ghost'
                aria-label='Sign Out'
                my={5}
                w='100%'
                onClick={handleLogout}
                fontSize='2xl'
                color='brand.300'
                textShadow='1px 1px #2a75bb;'
                opacity='0.8'
              >
                SIGN OUT
              </Button>
            ) : (
              <Link to='/sign-in' className='option'>
                <Button
                  variant='ghost'
                  aria-label='Sign In'
                  my={5}
                  w='100%'
                  fontSize='2xl'
                  color='brand.300'
                  textShadow='1px 1px #2a75bb;'
                  opacity='0.8'
                >
                  SIGN IN
                </Button>
              </Link>
            )}
          </Flex>
          <IconButton
            aria-label='open-menu'
            size='lg'
            mr={2}
            icon={<HamburgerIcon />}
            display={['flex', 'flex', 'none', 'none']}
            variant='ghost'
            color='brand.200'
            onClick={() => changeDisplay('flex')}
          />
          <CartIcon className='cart-icon' />
          {hidden ? null : <CartDropdown />}
          <DarkModeSwitch />

          <Flex
            w='100vw'
            bgColor={colorMode === 'dark' ? 'brand.100' : 'gray.800'}
            zIndex={20}
            height='100vh'
            pos='fixed'
            top='0'
            left='0'
            overflow='auto'
            flexDir='column'
            display={display}
          >
            <Flex justify='flex-end'>
              <IconButton
                mt={2}
                mr={2}
                aria-label='Close Menu'
                size='lg'
                icon={<CloseIcon color='white' />}
                variant='ghost'
                onClick={() => changeDisplay('none')}
              />
            </Flex>
            <Flex direction='column' align='center' className='options'>
              <Link to='/shop' className='option'>
                <Button
                  variant='ghost'
                  aria-label='Shop'
                  my={5}
                  w='100%'
                  fontSize='2xl'
                  color='brand.300'
                  textShadow='1px 1px #2a75bb;'
                  opacity='0.8'
                  onClick={() => changeDisplay('none')}
                >
                  SHOP
                </Button>
              </Link>
              <Link to='/card-sets' className='option'>
                <Button
                  variant='ghost'
                  aria-label='Card SETS'
                  my={5}
                  w='100%'
                  fontSize='2xl'
                  color='brand.300'
                  textShadow='1px 1px #2a75bb;'
                  opacity='0.8'
                  onClick={() => changeDisplay('none')}
                >
                  CARD SETS
                </Button>
              </Link>
              {currentUser ? (
                <Button
                  variant='ghost'
                  aria-label='Sign Out'
                  my={5}
                  w='100%'
                  onClick={handleLogout}
                  fontSize='2xl'
                  color='brand.300'
                  textShadow='1px 1px #2a75bb;'
                  opacity='0.8'
                >
                  SIGN OUT
                </Button>
              ) : (
                <Link to='/sign-in' className='option'>
                  <Button
                    variant='ghost'
                    aria-label='Sign In'
                    my={5}
                    w='100%'
                    fontSize='2xl'
                    color='brand.300'
                    textShadow='1px 1px #2a75bb;'
                    opacity='0.8'
                    onClick={() => changeDisplay('none')}
                  >
                    SIGN IN
                  </Button>
                </Link>
              )}
            </Flex>
            {hidden ? null : <CartDropdown />}
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentUserName: selectName,
  hidden: selectCartHidden,
  accessToken: selectAccessToken,
  cartItems: selectCartItems,
  isAdmin: selectIsAdmin,
  wishlistItems: selectWishlistItems,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutCurrentUser()),
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  removeFromWishlist: (item) => dispatch(removeFromWishlist(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
