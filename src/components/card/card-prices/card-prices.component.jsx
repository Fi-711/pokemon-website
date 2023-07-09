import { Grid, Text, Heading, VStack, HStack, Spacer } from '@chakra-ui/react';

import './card-prices.styles.scss';

/*
  Renders card price detail using same colors as TCG Guru
*/
const CardPrices = ({ price }) => {
  const { price_low, price_mid, price_high } = price;

  return (
    <Grid className='card-prices'>
      <Grid className='title'>
        <Heading fontSize={{ md: 'xl', lg: '2xl' }} mt={4}>
          Prices
        </Heading>
      </Grid>
      <Grid>
        <HStack my={2}>
          <VStack className='heading' align='flex-start'>
            <Heading fontSize={{ md: 'sm', lg: 'md' }} className='header'>
              Market Low
            </Heading>
            <Text
              fontSize={{ md: 'md', lg: 'lg' }}
              className='amount'
              id='market-low'
            >
              £{price_low.toFixed(2)}
            </Text>
          </VStack>
          <Spacer />
          <VStack className='heading' align='flex-start'>
            <Heading fontSize={{ md: 'sm', lg: 'md' }} className='header'>
              Market Mid
            </Heading>
            <Text
              fontSize={{ md: 'md', lg: 'lg' }}
              className='amount'
              id='market-mid'
            >
              £{price_mid.toFixed(2)}
            </Text>
          </VStack>
          <Spacer />
          <VStack className='heading' align='flex-start'>
            <Heading fontSize={{ md: 'sm', lg: 'md' }} className='header'>
              Market High
            </Heading>
            <Text
              fontSize={{ md: 'md', lg: 'lg' }}
              className='amount'
              id='market-high'
            >
              £{price_high.toFixed(2)}
            </Text>
          </VStack>
        </HStack>
      </Grid>
    </Grid>
  );
};

export default CardPrices;
