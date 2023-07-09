import React from 'react';
import { withRouter } from 'react-router-dom';

import ShippingLabel from '../../components/shipping-label/shipping-label.component';
import BackButton from '../../components/back-button/back-button.component';

import { Grid, Center } from '@chakra-ui/react';

const ShippingPage = ({ location }) => {
  const { shipping } = location.state;

  const { city, country, line1, postal_code } = shipping.address;
  const name = shipping.name;

  return (
    <Grid
      className='shipping-page'
      width='60%'
      mt={12}
      mx='auto'
      templateColumns='repeat(1,1fr)'
    >
      <Center mt={4}>
        <BackButton />
      </Center>
      <ShippingLabel
        name={name}
        address={line1}
        city={city}
        country={country}
        postcode={postal_code}
      />
    </Grid>
  );
};

export default withRouter(ShippingPage);
