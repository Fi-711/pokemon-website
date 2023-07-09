import CardAbilities from './card-abilities/card-abilities.component';
import CardDetails from './card-details/card-details.component';
import CardHeader from './card-header/card-header.component';
import CardLegal from './card-legal/card-legal.component';
import CardPrices from './card-prices/card-prices.component';
import CardText from './card-text/card-text.component';
import CollectionItem from '../collection-item/collection-item.component';
import Review from '../review/review.component';

import { Grid, GridItem, Divider } from '@chakra-ui/react';

/*
  Combines all helper JSX components to construct the card - main image uses CollectionItem component so linked in to redux store when adding items to basket
  Review component at bottom allows logged in user to leave 1 review per item - can edit review
*/
const Card = ({ card }) => {
  const {
    card_name,
    flavour_text,
    abilities,
    attacks,
    weaknesses,
    resistances,
    retreat_cost,
  } = card[0];
  const price = card[0].inventory[0];
  const artist = card[0].artist[0];
  const { supertype } = card[0].card_types[0];
  const card_rarity = card[0].card_rarity[0];
  const card_sets = card[0].card_sets[0];
  const pokemon_types = card[0].pokemon_types[0];
  const card_status = card[0].card_status[0];

  return (
    <Grid
      className='card'
      templateColumns={[
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
      ]}
      flexDir='column'
      gap={4}
      mx='auto'
      mt={[0, 0, 4, 8, 8]}
    >
      <GridItem
        className='card-item'
        colSpan={[2, 2, 2, 2, 1]}
        my={8}
        mx='auto'
        w={['250px', '300px', '350px', '400px', '400px']}
        justify='center'
        align='center'
      >
        <CollectionItem
          card={card[0]}
          solo={{ solo: true }}
          price={price}
          width='100%'
          mx='auto'
        />
      </GridItem>

      <GridItem className='card-info' colSpan={[2, 2, 2, 2, 1]} my={8} w='100%'>
        <CardHeader
          card_name={card_name}
          pokemon_types={pokemon_types}
          supertype={supertype}
        />
        <Divider />
        <CardPrices price={price} />
        <Divider />
        <CardAbilities abilities={abilities} attacks={attacks} />

        <br />
        <CardDetails
          artist={artist}
          card_rarity={card_rarity}
          card_sets={card_sets}
          weaknesses={weaknesses}
          retreat_cost={retreat_cost}
          resistances={resistances}
        />
        <CardText flavour_text={flavour_text} />
        <Divider />
        <CardLegal card_sets={card_sets} card_status={card_status} />
      </GridItem>

      <GridItem colSpan={[2, 2, 2, 2, 2]}>
        <Divider />
        <Grid className='card-review' mt={10}>
          <Review card={card[0]} />
        </Grid>
        <Grid />
      </GridItem>
    </Grid>
  );
};

export default Card;
