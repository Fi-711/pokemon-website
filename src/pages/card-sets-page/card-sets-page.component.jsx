import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Directory from '../../components/directory/directory.component';
import PokeballLoader from '../../components/pokeball-loader/pokeball-loader.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded,
} from '../../redux/shop/shop.selectors';

import { Grid } from '@chakra-ui/react';

/*
  Displays all the card sets logos - clicking on them will loaded all the cards for that set.
  Uses connect to send sets data to redux store so not fetched again
*/
const CardSetsPage = ({
  fetchCollectionsStartAsync,
  isCollectionLoaded,
  isCollectionFetching,
}) => {
  useEffect(() => {
    if (!isCollectionLoaded) {
      fetchCollectionsStartAsync();
    }
  }, [isCollectionLoaded, fetchCollectionsStartAsync]);

  return isCollectionFetching ? (
    <PokeballLoader />
  ) : (
    <Grid
      className='card-sets-page'
      w={['100%', '100%', '90%', '85%']}
      mx='auto'
      justify='center'
      align='center'
      mt='3%'
    >
      <Directory />
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSetsPage);
