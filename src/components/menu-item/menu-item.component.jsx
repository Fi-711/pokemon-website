import React from 'react';
import { withRouter } from 'react-router-dom';

import { Center, Box, Image, Heading } from '@chakra-ui/react';

/*
    Displays an image of the a card set along with it's release date - animation is on it's parent otherwise
    the image will also move when all I want to move is the box. Also, image has a huge box shadow same color as
    border to hide artifacts when the box zooms out.
 */
const MenuItem = ({ id, name, logo, release_date, history, match }) => (
  <Box className='menu-item' onClick={() => history.push(`${match.url}/${id}`)}>
    <Center
      className='image-holder'
      height={['200px', '200px', '250px', '300px']}
    >
      <Image className='background-image' src={logo} alt={name} />
    </Center>
    <Center className='content'>
      <Heading size='sm'>Released: {release_date}</Heading>
    </Center>
  </Box>
);

export default withRouter(MenuItem);
