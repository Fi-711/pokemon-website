import { Grid, GridItem, Text } from '@chakra-ui/react';

/*
  Renders the flavour text component of a card
 */
const CardText = ({ flavour_text }) => (
  <Grid
    templateColumns='repeat(1, 1fr)'
    className='card-text'
    m={[8, 8, 8, 8, 8]}
  >
    <GridItem colSpan={1}>
      <Text
        fontSize={{ md: 'sm', lg: 'lg' }}
        fontStyle='italic'
        className='text'
        textAlign='center'
      >
        {flavour_text}
      </Text>
    </GridItem>
  </Grid>
);

export default CardText;
