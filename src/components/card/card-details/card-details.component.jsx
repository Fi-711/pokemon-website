import { v4 as uuidv4 } from 'uuid';

import {
  Grid,
  Text,
  Heading,
  Image,
  HStack,
  GridItem,
  VStack,
  Box,
} from '@chakra-ui/react';

import ELEMENTS from '../../../assets/element.images';

/*
  Renders card details section of card solo page - a lot to deconstruct and many nested arrays to extract data from
*/
const CardDetails = ({
  artist,
  card_rarity,
  card_sets,
  weaknesses,
  retreat_cost,
  resistances,
}) => {
  const { artist_name } = artist;
  const rarity = card_rarity.card_rarity;
  const { card_set } = card_sets;
  const { weakness_type, weakness_value } = weaknesses[0];
  const { resistance_type, resistance_value } = resistances[0];

  return (
    <Grid
      className='card-details'
      templateColumns='repeat(6, 1fr)'
      templateRows='repeat(2, 1fr)'
      height={{ sm: '180px', md: '150px' }}
      rowGap={4}
    >
      <GridItem w='100%' colSpan={[3, 3, 2]}>
        <VStack justify='left' align='flex-start'>
          <Heading fontSize={{ md: 'md', lg: 'xl' }}>Weakness</Heading>
          <HStack>
            {weakness_type ? (
              <span>
                <Image
                  w='25px'
                  src={ELEMENTS[weakness_type]}
                  alt={weakness_type}
                  ml={2}
                  display='inline'
                />
                <Text ml={2} display='inline' fontSize='lg'>
                  {weakness_value}
                </Text>
              </span>
            ) : (
              <span>
                <Text>N/A</Text>
              </span>
            )}
          </HStack>
        </VStack>
      </GridItem>

      <GridItem w='100%' colSpan={[3, 3, 2]}>
        <VStack justify='left' align='flex-start'>
          <Heading fontSize={{ md: 'md', lg: 'xl' }}>Resistance</Heading>
          <Box
            w='100%'
            colSpan={[3, 3, 2]}
            justifyContent='left'
            textAlign='left'
          >
            {resistance_type ? (
              <span>
                <Image
                  w='25px'
                  src={ELEMENTS[resistance_type]}
                  alt={resistance_type}
                  display='inline'
                />
                <Text fontSize={{ md: 'md', lg: 'lg' }} display='inline' ml={2}>
                  {resistance_value}
                </Text>
              </span>
            ) : (
              <Text fontSize={{ md: 'md', lg: 'lg' }}>
                <span>N/A</span>
              </Text>
            )}
          </Box>
        </VStack>
      </GridItem>

      <GridItem w='100%' colSpan={[3, 3, 2]}>
        <VStack justify='left' align='flex-start'>
          <Heading fontSize={{ md: 'md', lg: 'xl' }}>Retreat Cost</Heading>
          <HStack>
            {retreat_cost[0].retreat_cost ? (
              retreat_cost.map((item) => (
                <Image
                  w='25px'
                  key={uuidv4()}
                  src={ELEMENTS[item.retreat_cost]}
                  alt={item.retreat_cost}
                />
              ))
            ) : (
              <Text fontSize={{ md: 'md', lg: 'lg' }}>
                <span>N/A</span>
              </Text>
            )}
            Item
          </HStack>
        </VStack>
      </GridItem>

      <GridItem colSpan={[3, 3, 2]} w='100%' mt={[0, 0, 4]}>
        <VStack justify='left' align='flex-start'>
          <Heading fontSize={{ md: 'md', lg: 'xl' }}>Artist</Heading>
          <Text fontSize={{ md: 'sm', lg: 'lg' }}>
            {artist_name ? artist_name : 'N/A'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem colSpan={[3, 3, 2]} w='100%' mt={[0, 0, 4]}>
        <VStack justify='left' align='flex-start'>
          <Heading fontSize={{ md: 'md', lg: 'xl' }}>Rarity</Heading>
          <Text fontSize={{ md: 'sm', lg: 'lg' }}>
            {rarity ? rarity : 'N/A'}
          </Text>
        </VStack>
      </GridItem>

      <GridItem colSpan={[3, 3, 2]} w='100%' mt={[0, 0, 4]}>
        <VStack justify='left' align='flex-start'>
          <Heading fontSize={{ md: 'md', lg: 'xl' }}>Set</Heading>
          <Text fontSize={{ md: 'sm', lg: 'lg' }}>
            {card_set ? card_set : 'N/A'}
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default CardDetails;
