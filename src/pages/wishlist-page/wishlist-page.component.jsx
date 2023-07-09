import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';

import { selectWishlistItems } from '../../redux/user/user.selectors';

import { Grid, GridItem, Text, Divider, Box } from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';
import { IoPricetagOutline } from 'react-icons/io5';
import { FaShoppingBasket } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';

import WishlistItem from '../../components/wishlist-item/wishlist-item.component';

const WishlistPage = ({ wishlistItems }) => {
  return (
    <Grid
      className='wishlist-page'
      templateColumns={{ md: 'repeat(8, 1fr)' }}
      mx='auto'
      width={['100%', '100%', '80vw', '80vw', '50vw']}
      my={[4, 4, 8, 10, 12]}
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
          <span>Basket</span>
        </Text>
        <Box display={['flex', 'flex', 'flex', 'none']}>
          <FaShoppingBasket />
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
        <Divider my={6} />
      </GridItem>
      <GridItem colSpan={8} my='auto'>
        {wishlistItems.map((card) => (
          <WishlistItem key={uuidv4()} card={card} className='wishlist-card' />
        ))}
      </GridItem>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  wishlistItems: selectWishlistItems,
});

export default connect(mapStateToProps)(WishlistPage);
