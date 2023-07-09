import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import { createStructuredSelector } from 'reselect';
import { selectAccessToken } from '../../redux/user/user.selectors';
import {
  logoutCurrentUser,
  refreshAccessToken,
} from '../../redux/user/user.actions';

// Chakra UI
import { Flex, Image, Center, useColorMode, Button } from '@chakra-ui/react';

// css files
import './homepage.styles.scss';
import './glow.css';

// Assets
import haunter from '../../assets/haunter.png';
import logo from '../../assets/tcg-logo.svg';

// JS Files
import glitch from './glitch.js';

const HomePage = ({ accessToken, refreshAccessToken, logoutUser }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  // Refresh access token every time user visits the home page
  useEffect(() => {
    const refreshToken = async () => {
      try {
        if (accessToken) {
          const { data } = await axios.post('/api/refresh', accessToken);
          refreshAccessToken(data.access_token);
          console.log('Access token refreshed.');
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log('Your session has expired. Please log in again.');
          logoutUser();
        }
      }
    };
    refreshToken();
  }, [accessToken, refreshAccessToken, logoutUser]);

  useEffect(() => {
    glitch();
  }, []);

  return (
    <Flex className='homepage' mx='auto' maxHeight='1200px' mt={10}>
      <Link className='glow glow-orange' to='/shop'>
        <Center>
          <Image
            id='logo'
            src={logo}
            alt='logo'
            w={['200px', '200px', '250px', '300px', '300px']}
          />
        </Center>
      </Link>

      <Link to='/shop'>
        <Center>
          <Button
            className='shop'
            zIndex={100}
            size='lg'
            mx='auto'
            mt={4}
            _hover={
              colorMode === 'light'
                ? { boxShadow: '0 0 0px 2px #000000' }
                : { boxShadow: '0 0 0px 2px #dddddd' }
            }
          >
            Shop Now
          </Button>
        </Center>
      </Link>

      <Center className='grid' id='grid'>
        <Image
          className={colorMode === 'light' ? 'ghost-back' : null}
          src={haunter}
          alt='haunter'
          m='auto'
          style={{
            position: 'absolute',
            display: 'inline',
            top: 50,
            bottom: 0,
            left: 0,
            right: 0,
            cursor: 'pointer',
          }}
          w={['280px', '320px', '400px', '500px', '600px']}
        />
      </Center>
      <Center id='grid-copy' zIndex={1}>
        <Image
          className={colorMode === 'light' ? 'ghost-front' : null}
          src={haunter}
          alt='haunter'
          m='auto'
          style={{
            position: 'absolute',
            display: 'inline',
            top: 50,
            bottom: 0,
            left: 0,
            right: 0,
            cursor: 'pointer',
          }}
          w={['280px', '320px', '400px', '500px', '600px']}
          onClick={toggleColorMode}
        />
      </Center>
    </Flex>
  );
};

const mapStateToProps = createStructuredSelector({
  accessToken: selectAccessToken,
});

const mapDispatchToProps = (dispatch) => ({
  refreshAccessToken: (token) => dispatch(refreshAccessToken(token)),
  logoutUser: () => dispatch(logoutCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
