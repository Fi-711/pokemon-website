import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded,
} from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import PokeballLoader from '../../components/pokeball-loader/pokeball-loader.component';

import { Grid } from '@chakra-ui/react';

/*
  Loads shop page using data fetched from db
*/
const ShopPage = ({
  fetchCollectionsStartAsync,
  isCollectionLoaded,
  isCollectionFetching,
}) => {
  useEffect(() => {
    if (!isCollectionLoaded) {
      fetchCollectionsStartAsync();
    }
  }, [isCollectionLoaded, fetchCollectionsStartAsync]);

  return !isCollectionFetching ? (
    <Grid className='shop-page' mx='auto'>
      <CollectionsOverview />
    </Grid>
  ) : (
    <PokeballLoader />
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
