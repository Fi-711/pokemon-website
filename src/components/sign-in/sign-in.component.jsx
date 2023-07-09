import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from '../../redux/user/user.actions';
import { loadItem } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import {
  Input,
  Stack,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Tooltip,
  Button,
  useToast,
} from '@chakra-ui/react';
import { LockIcon, EmailIcon } from '@chakra-ui/icons';

const SignIn = ({ setCurrentUser, loadItemToCart, handleShake }) => {
  // Sign in credentials
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  // Toast for user feedback
  const toast = useToast();

  // Handle user credentials logic
  const { email, password } = userCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  // async method
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in logic - uses await as async function
      const { data } = await axios.post('/api/login', userCredentials);
      if (data) {
        setCurrentUser(data);

        // add items to cart
        if (data.cart.length > 0) {
          data.cart.map((item) => loadItemToCart(item));
        }

        toast({
          title: 'Login Successful',
          description: '',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        // Reset form
        setUserCredentials({ email: '', password: '' });
      }
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        console.log(error.response.data.message);
      }
      // Shake if error
      handleShake();
      toast({
        title: 'Incorrect Login Details',
        description: '',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <div className='sign-in'>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl>
            <InputGroup>
              <InputLeftAddon
                children={
                  <Tooltip label='The email address you registered with'>
                    <EmailIcon />
                  </Tooltip>
                }
              />
              <Input
                type='email'
                name='email'
                value={email}
                aria-label='email'
                placeholder='Email'
                required
                onChange={handleChange}
                color='brand.200'
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftAddon
                children={
                  <Tooltip label='The password associated with your account'>
                    <LockIcon />
                  </Tooltip>
                }
              />
              <Input
                type='password'
                name='password'
                value={password}
                aria-label='password'
                placeholder='Password'
                required
                onChange={handleChange}
                color='brand.200'
              />
            </InputGroup>
          </FormControl>
          <Button colorScheme='cyan' type='submit'>
            Sign In
          </Button>
        </Stack>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  loadItemToCart: (item) => dispatch(loadItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
