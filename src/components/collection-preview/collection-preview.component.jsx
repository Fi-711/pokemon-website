import React from 'react';
import { Link } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import { Grid, GridItem, Center, Image } from '@chakra-ui/react';

/*
    Used to display upto 5 cards for a given set - used by shop page. Items are sorted alphabetically for shop page.
 */
const CollectionPreview = ({ id, logo, name, cards }) => (
  <Grid
    className='collection-preview'
    templateColumns='repeat(1, 1fr)'
    templateRows='rows(1, 1fr)'
    flexDir='col'
    mx='auto'
  >
    <GridItem className='set-title' rowSpan={1} colSpan={1} my={8}>
      <Center
        mx='auto'
        w={['80%', '70%', '70%', '60%', '50%']}
        h={[110, 150, 180, 200, 220]}
      >
        <Link to={`/card-sets/${id}`}>
          <Image
            src={logo}
            alt={name}
            h={[110, 150, 180, 200, 220]}
            mx='auto'
          />
        </Link>
      </Center>
    </GridItem>

    <GridItem
      rowSpan={1}
      colSpan={1}
      mx='auto'
      w={['100%', '100%', '100%', '100%', '90%']}
    >
      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
          'repeat(5, 1fr)',
        ]}
        // gap={4}
        mx='auto'
        justify='center'
        px={8}
        mb={12}
      >
        {cards
          .sort((a, b) =>
            a.card_name > b.card_name ? 1 : b.card_name > a.card_name ? -1 : 0
          )
          .filter((_, idx) => idx < 5)
          .map((card) => (
            <Center key={card.card_id}>
              <CollectionItem card={card} id={id} w='300px' />
            </Center>
          ))}
      </Grid>
    </GridItem>
  </Grid>
);

export default CollectionPreview;
