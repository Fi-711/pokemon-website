import { Grid, Text, Heading, Image, Flex, Spacer } from '@chakra-ui/react';

import ELEMENTS from '../../../assets/element.images';

/*
  Renders the top section of a card page - name, hp, type etc
*/
const CardHeader = ({ card_name, pokemon_types, supertype }) => {
  const { hp, type } = pokemon_types;

  return (
    <Grid className='card-header'>
      <Flex className='header'>
        <Heading fontSize={{ md: '2xl', lg: '4xl' }} className='name'>
          {card_name}
        </Heading>
        <Spacer />
        {type ? (
          <Heading
            fontSize={{ md: 'xl', lg: '2xl' }}
            className='stats'
            my='auto'
          >
            <span>HP {hp}</span>
            <Image
              src={ELEMENTS[type]}
              alt={type}
              w='25px'
              display='inline'
              ml={4}
            />
          </Heading>
        ) : null}
      </Flex>
      <Grid className='header-bottom' my={2}>
        <Text fontSize={{ md: 'lg', lg: 'xl' }} className='type'>
          {supertype}
        </Text>
      </Grid>
    </Grid>
  );
};

export default CardHeader;
