import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import {
  selectAccessToken,
  selectCurrentUser,
  selectName,
} from '../../redux/user/user.selectors';

import PokeballLoader from '../../components/pokeball-loader/pokeball-loader.component';
import BackButton from '../../components/back-button/back-button.component';
import WishlistPage from '../wishlist-page/wishlist-page.component';
import UserReviewsPage from '../user-reviews/user-reviews-page.component';
import ReceiptsPage from '../receipts-page/receipts-page.component';

import {
  Grid,
  GridItem,
  Flex,
  Heading,
  Divider,
  Box,
  Spacer,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
} from '@chakra-ui/react';

import './account-user.styles.scss';

const AccountUserPage = ({ accessToken, currentUser, name }) => {
  const [data, setData] = useState(null);
  const [receipts, setReceipts] = useState(null);
  const [loading, setLoading] = useState('false');
  const [reloadReviews, setReloadReviews] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let { data } = await axios.post(
          '/api/receipts',
          { data: { currentUser } },
          {
            headers: { Authorization: `Bearer${accessToken}` },
          }
        );
        setReceipts(data.charges);
      } catch (error) {
        console.error(error);
      }

      try {
        let { data } = await axios.post(
          '/api/account-user',
          { data: { currentUser } },
          {
            headers: { Authorization: `Bearer${accessToken}` },
          }
        );
        data && setData(data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reloadReviews]);

  return loading ? (
    <PokeballLoader />
  ) : currentUser ? (
    <Flex width={[300, 450, 750, 900, 1200, 1400]} mx='auto' my={12}>
      <Grid
        templateColumns='repeat(1,1fr)'
        className='account-user-page'
        mx='auto'
      >
        <GridItem colSpan={1} width='100%'>
          <Flex>
            <Heading fontSize='4xl'>{`${name}'s Account`}</Heading>
            <Spacer />
            <Box display='inline'>
              <BackButton />
            </Box>
          </Flex>
          <Divider my={4} />
        </GridItem>
        <GridItem colSpan={1} width='100%'>
          <Tabs>
            <TabList>
              <Tab>My Wishlist</Tab>
              <Tab>My Reviews</Tab>
              <Tab>My Receipts</Tab>
            </TabList>
            <TabPanels width={['100%', '100%', '80vw', '80vw', '50vw']}>
              <TabPanel p={0}>
                <WishlistPage />
              </TabPanel>
              <TabPanel>
                <UserReviewsPage
                  data={data}
                  setReloadReviews={setReloadReviews}
                  reloadReviews={reloadReviews}
                />
              </TabPanel>
              <TabPanel>
                <ReceiptsPage receipts={receipts} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Flex>
  ) : (
    <Redirect to='/shop' />
  );
};

const mapStateToProps = createStructuredSelector({
  accessToken: selectAccessToken,
  currentUser: selectCurrentUser,
  name: selectName,
});

export default connect(mapStateToProps)(AccountUserPage);
