import { useState, useEffect } from 'react';
import { Grid, HStack, Box, useColorMode } from '@chakra-ui/react';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';

import { Search2Icon } from '@chakra-ui/icons';

import './searchbar.styles.scss';

/*
  Search bar used on card-sets pages. Admin search bar uses similar logic - should consider refactoring the overlapping logic
  out of both. This search can search and sort by name and price. 500ms throttle put on the search.
 */
const SearchBar = ({ cardSet, setCardSet, collection }) => {
  const { colorMode } = useColorMode();
  const [sortByName, setSortByName] = useState(true);
  const [sortByPrice, setSortByPrice] = useState(true);
  const [cardName, setCardName] = useState('');

  const sortByNameAsc = () => {
    let c = cardSet
      .map((card) => card)
      .sort((a, b) =>
        a.card_name > b.card_name ? 1 : b.card_name > a.card_name ? -1 : 0
      );
    setSortByName(!sortByName);
    setCardSet(c);
  };

  const sortByNameDesc = () => {
    let c = cardSet
      .map((card) => card)
      .sort((a, b) =>
        a.card_name > b.card_name ? -1 : b.card_name > a.card_name ? 1 : 0
      );
    setSortByName(!sortByName);
    setCardSet(c);
  };

  const sortByPriceAsc = () => {
    let c = cardSet
      .map((card) => card)
      .sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0));
    setSortByPrice(!sortByPrice);
    setCardSet(c);
  };

  const sortByPriceDesc = () => {
    let c = cardSet
      .map((card) => card)
      .sort((a, b) => (a.price > b.price ? -1 : b.price > a.price ? 1 : 0));
    setSortByPrice(!sortByPrice);
    setCardSet(c);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cardName) {
        setCardSet(
          collection[0].cards.filter((card) =>
            card.card_name.toLowerCase().includes(cardName.toLowerCase())
          )
        );
      } else {
        setCardSet([...collection[0].cards]);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cardName]);

  const handleTyping = (event) => {
    setCardName(event.target.value);
    return cardName;
  };

  const toggleSortByName = () =>
    sortByName ? sortByNameDesc() : sortByNameAsc();

  const toggleSortPrice = () =>
    sortByPrice ? sortByPriceDesc() : sortByPriceAsc();

  return (
    <Grid className='search-bar' templateColumns={['repeat()']}>
      <HStack>
        <Box>
          <Search2Icon mr={2} mb={1} display={['none', 'none', 'inline']} />
          <label htmlFor='search' />
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search...'
            autoComplete='off'
            onChange={handleTyping}
            style={{
              backgroundColor: colorMode === 'dark' ? '#141214' : '#ebe3e3',
              width: '90%',
            }}
          />
        </Box>
        <Box>
          {sortByName ? (
            <button onClick={toggleSortByName}>
              Name <ArrowDropUpSharpIcon style={{ color: 'green' }} />
            </button>
          ) : (
            <button onClick={toggleSortByName}>
              Name <ArrowDropDownSharpIcon style={{ color: 'red' }} />
            </button>
          )}
        </Box>
        <Box>
          {sortByPrice ? (
            <button onClick={toggleSortPrice}>
              Price <ArrowDropUpSharpIcon style={{ color: 'green' }} />
            </button>
          ) : (
            <button onClick={toggleSortPrice}>
              Price <ArrowDropDownSharpIcon style={{ color: 'red' }} />
            </button>
          )}
        </Box>
      </HStack>
    </Grid>
  );
};

export default SearchBar;
