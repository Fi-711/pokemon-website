import React from 'react';
import { useFetchParam } from '../../hooks/useFetchParam.hook';

import Card from '../../components/card/card.component';
import PokeballLoader from '../../components/pokeball-loader/pokeball-loader.component';
import Page404 from '../page404/page404.component';

import { Grid, GridItem } from '@chakra-ui/react';

/*
  Use custom fetch hook to fetch card data from db
*/
const CardPage = ({ location }) => {
  // Data queried is based on the card data provided - if no data provided e.g. manually entered in address in address bar, then 404 page is loaded
  const path = location.state ? location.state.id : null;
  const { loading, data } = useFetchParam('/api/card', path);

  return loading ? (
    <PokeballLoader />
  ) : path ? (
    <Grid className='card-page' mx='auto' templateColumns='repeat(1,1fr)'>
      <GridItem
        width={['300px', '85%', '600px', '800px', '1200px', '1400px']}
        colSpan={1}
        mx='auto'
      >
        <Card card={data} />
      </GridItem>
    </Grid>
  ) : (
    <Page404 />
  );
};

export default CardPage;
