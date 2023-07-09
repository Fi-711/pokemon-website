import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCardSetsStartAsync } from '../../redux/directory/directory.actions';
import {
  selectDirectorySections,
  selectIsCardSetsFetching,
  selectIsCardSetsLoaded,
} from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';
import PokeballLoader from '../pokeball-loader/pokeball-loader.component';

import { Grid, Flex, Center, useColorMode } from '@chakra-ui/react';

import './directory.styles.scss';

/*
  Loads the 30 card sets and their associated images - isCardSetsLoaded uses a double bang to check if directory "sections" data is empty
*/
const Directory = ({ fetchCardSetsStartAsync, isCardSetsLoaded, sections }) => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!isCardSetsLoaded) {
      fetchCardSetsStartAsync();
    }
  }, [fetchCardSetsStartAsync, isCardSetsLoaded]);

  return isCardSetsLoaded ? (
    <Grid
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
      ]}
      mx='auto'
      gap={8}
      className='directory'
      mt={4}
    >
      {sections.map(({ id, ...otherSectionProps }) => (
        <Flex
          key={id}
          w={['250px', '250px', '300px', '350px']}
          h={['250px', '250px', '300px', '350px']}
          align='center'
          justify='center'
          mx='auto'
          border='2px'
          borderColor={colorMode === 'dark' ? 'gray.300' : 'brand.100'}
          boxShadow={
            colorMode === 'dark' ? '5px 5px #141214' : '5px 5px #ebe3e3'
          }
          className='directory-menu'
        >
          <Center
            w='90%'
            h='90%'
            justify='center'
            align='center'
            className='menu-item'
          >
            <MenuItem id={id} {...otherSectionProps} />
          </Center>
        </Flex>
      ))}
    </Grid>
  ) : (
    <PokeballLoader />
  );
};

const mapStateToProps = createStructuredSelector({
  isCardSetsFetching: selectIsCardSetsFetching,
  isCardSetsLoaded: selectIsCardSetsLoaded,
  sections: selectDirectorySections,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCardSetsStartAsync: () => dispatch(fetchCardSetsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
