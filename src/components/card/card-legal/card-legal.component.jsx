import { Grid, Text, GridItem, Heading, VStack } from '@chakra-ui/react';

import './card-legal.styles.scss';

/*
  Renders card status - uses css and unicode tick/ cross to style the legal status. For card numbers, they should be strings and have no issues but if they do, they are defaulted to 7.
*/
const CardLegal = ({ card_sets, card_status }) => {
  const { set_total, set_number } = card_sets;
  const { legal_expanded, legal_unlimited, legal_standard } = card_status;

  return (
    <Grid
      className='card-legal'
      templateColumns='repeat(7, 1fr)'
      mt={[4, 4, 8]}
    >
      <GridItem colSpan={[7, 7, 7, 1]} mb={[4, 4, 4, 0]}>
        <VStack>
          <Heading fontSize={{ md: 'sm', lg: 'lg' }}>Number</Heading>
          <Text fontSize='lg'>
            {set_number ? set_number : 7}/{set_total ? set_total : 107}
          </Text>
        </VStack>
      </GridItem>

      <GridItem
        colSpan={[7, 7, 7, 6]}
        className='card-legal-group'
        justifyContent={{ sm: 'center', lg: 'flex-end' }}
      >
        <Grid templateColumns='repeat(3, 1fr)' my='auto'>
          <GridItem className='item' colSpan={1}>
            <span className='format'>Standard</span>
            <span className='legal'>
              {legal_standard ? <span>&#10004;</span> : <span>&#10006;</span>}
            </span>
          </GridItem>
          <GridItem className='item' colSpan={1}>
            <span className='format'>Expanded</span>
            <span className='legal'>
              {legal_expanded ? <span>&#10004;</span> : <span>&#10006;</span>}
            </span>
          </GridItem>
          <GridItem className='item' colSpan={1}>
            <span className='format'>Unlimited</span>
            <span className='legal'>
              {legal_unlimited ? <span>&#10004;</span> : <span>&#10006;</span>}
            </span>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default CardLegal;
