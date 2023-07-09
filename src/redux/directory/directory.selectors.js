import { createSelector } from 'reselect';

const selectDirectory = (state) => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);

export const selectIsCardSetsFetching = createSelector(
  [selectDirectory],
  (directory) => directory.isFetching
);

export const selectIsCardSetsLoaded = createSelector(
  [selectDirectory],
  (directory) => !!directory.sections
);
