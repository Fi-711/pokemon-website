import { Grid, Text, Heading, GridItem, Image, HStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import ELEMENTS from '../../../assets/element.images';

/*
  Helper JSX for render attack move in attack section of a solo page card
*/
const Move = ({ name, damage, text, cost }) => (
  <Grid
    templateRows='repeat(2, 1fr)'
    templateColumns='repeat(9, 1fr)'
    gap={1}
    mt={[0, 4, 4, 4, 4]}
  >
    <GridItem colSpan={[4, 4, 3]} my='auto'>
      <HStack my='auto'>
        {cost.map((item) => (
          <Image
            src={ELEMENTS[item.attack_cost]}
            alt={item.attack_cost}
            key={uuidv4()}
            w='25px'
            my={3}
          />
        ))}
      </HStack>
    </GridItem>
    <GridItem colSpan={[4, 4, 4]} className='move-name text' my='auto' ml={2}>
      <Heading fontSize={{ md: 'xl', lg: '3xl' }}>{name}</Heading>
    </GridItem>

    <GridItem
      colSpan={[1, 1, 2]}
      className='damage text'
      textAlign='right'
      my='auto'
    >
      <Text fontSize={{ md: 'xl', lg: '3xl' }}>{damage}</Text>
    </GridItem>

    <GridItem colSpan={9}>
      <Text
        fontSize={{ md: 'sm', lg: 'lg' }}
        className='move-info'
        textAlign='justify'
        mt='0'
      >
        {text}
      </Text>
    </GridItem>
  </Grid>
);

export default Move;
