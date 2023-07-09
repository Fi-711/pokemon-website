import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';

import {
  Grid,
  GridItem,
  Text,
  Heading,
  Flex,
  Divider,
  Box,
  Spacer,
} from '@chakra-ui/react';

import { GiMoneyStack } from 'react-icons/gi';
import { MdLocalShipping } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { FaReceipt } from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';

import {
  selectAccessToken,
  selectCurrentUser,
  selectName,
} from '../../redux/user/user.selectors';

import PokeballLoader from '../../components/pokeball-loader/pokeball-loader.component';
import Invoice from '../../components/invoice/invoice.component';
import SearchBarAdmin from '../../components/searchbar-admin/searchbar-admin.component';
import BackButton from '../../components/back-button/back-button.component';


const AccountAdminPage = ({ accessToken, currentUser, name }) => {
  // use ref hook so data persists - need separate data and results because search bar will wipe out old data every setData call
  let results = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState('false');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let { data } = await axios.post(
          '/api/account-admin',
          { data: { currentUser } },
          {
            headers: { Authorization: `Bearer${accessToken}` },
          }
        );
        data && setData(data.charges);
        results.current = data.charges;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return loading ? (
    <PokeballLoader />
  ) : currentUser ? (
    <Flex width={['99vw', '95vw', 750, 900, 1200, 1400]} mx='auto' my={12}>
      <Grid
        className='account-admin-page'
        templateColumns='repeat(1, 1fr)'
        width='100%'
      >
        <GridItem colSpan={1}>
          <Flex>
            <Heading
              fontSize='4xl'
              display='inline'
            >{`${name}'s Account - Admin`}</Heading>
            <Spacer />
            <Box display='inline'>
              <BackButton />
            </Box>
          </Flex>

          <Divider my={4} />
        </GridItem>

        <GridItem colSpan={1}>
          <Heading fontSize='3xl'>Invoices</Heading>
        </GridItem>
        <SearchBarAdmin
          data={data}
          setData={setData}
          results={results.current}
        />
        <GridItem colSpan={1} mt={2} width='100%'>
          <Grid templateColumns='repeat(8, 1fr)' gap={2} mb={4}>
            <GridItem colSpan={3} display={['none', 'none', 'none', 'flex']}>
              <Text fontSize={['lg', 'lg', 'xl']}>Email</Text>
            </GridItem>
            <GridItem colSpan={3} display={['flex', 'flex', 'flex', 'none']}>
              <HiOutlineMail />
            </GridItem>
            <GridItem colSpan={1} display={['none', 'none', 'none', 'flex']}>
              <Text fontSize={['lg', 'lg', 'xl']}>Date</Text>
            </GridItem>
            <GridItem colSpan={1} display={['flex', 'flex', 'flex', 'none']}>
              <FcCalendar />
            </GridItem>

            <GridItem colSpan={1} display={['none', 'none', 'none', 'flex']}>
              <Text fontSize={['lg', 'lg', 'xl']}>Amount</Text>
            </GridItem>
            <GridItem colSpan={1} display={['flex', 'flex', 'flex', 'none']}>
              <GiMoneyStack />
            </GridItem>

            <GridItem colSpan={1} display={['none', 'none', 'none', 'flex']}>
              <Text fontSize={['lg', 'lg', 'xl']}>Shipping</Text>
            </GridItem>
            <GridItem colSpan={1} display={['flex', 'flex', 'flex', 'none']}>
              <MdLocalShipping />
            </GridItem>

            <GridItem colSpan={2} display={['none', 'none', 'none', 'flex']}>
              <Text
                fontSize={['lg', 'lg', 'xl']}
                display={['none', 'none', 'none', 'flex']}
              >
                Receipt
              </Text>
            </GridItem>
            <GridItem colSpan={2} display={['flex', 'flex', 'flex', 'none']}>
              <FaReceipt />
            </GridItem>
          </Grid>
          {data &&
            data.map((charge) => (
              <Invoice
                key={uuidv4()}
                email={charge.receipt_email}
                receipt={charge.receipt_url}
                amount={charge.amount}
                created={charge.created}
                shipping={charge.billing_details}
              />
            ))}
          <Divider my={4} />
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

export default connect(mapStateToProps)(AccountAdminPage);
