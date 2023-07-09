import { Grid, HStack, GridItem, Text, Heading, Image } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import Move from './card-move.component';
import ability from '../../../assets/ability.png';

/*
  Render Abilities section on card page
*/
const CardAbilities = ({ abilities, attacks }) => {
  return (
    // If ability section is not null add it - assumes only one ability on a card. For attacks, cycle through the array and add them all.
    <Grid className='card-abilities' templateColumns='repeat(1, 1fr)' m='auto'>
      {abilities[0].ability_name ? (
        <GridItem colSpan={1}>
          <HStack className='title' my={4}>
            <Image src={ability} alt={abilities[0].ability_name} />
            <Heading fontSize={{ md: 'lg', lg: '2xl' }}>
              {abilities[0].ability_name}
            </Heading>
          </HStack>
          <Grid>
            <Text fontSize={{ md: 'md', lg: 'lg' }} textAlign='justify'>
              {abilities[0].ability_text}
            </Text>
          </Grid>
        </GridItem>
      ) : null}

      {attacks[0].attack_name ? (
        <GridItem
          className='title'
          colSpan={1}
          mt={[0, 4, 4, 4, 4]}
          mb={(-12, -12, -10, -6, -6)}
        >
          <Heading fontSize={{ md: 'lg', lg: 'xl' }} my={4}>
            Attacks
          </Heading>
        </GridItem>
      ) : null}
      <GridItem colSpan={1} my={[2, 2, 2, 4, 4]}>
        {attacks[0].attack_name
          ? attacks.map((atk) => (
              <div key={uuidv4()}>
                <Move
                  className='move'
                  name={atk.attack_name}
                  damage={atk.attack_damage}
                  text={atk.attack_text}
                  cost={atk.attack_cost}
                />
              </div>
            ))
          : null}
      </GridItem>
    </Grid>
  );
};

export default CardAbilities;
