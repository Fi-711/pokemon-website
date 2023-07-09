import { useState, useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

import { Search2Icon } from '@chakra-ui/icons';

/*
    Admin search bar for searching invoices - no sort feature yet
 */
const SearchBarAdmin = ({ data, setData, results }) => {
  const { colorMode } = useColorMode();
  const [receiptName, setReceiptName] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (receiptName) {
        let res = results.filter((receipt) =>
          receipt.receipt_email
            .toLowerCase()
            .includes(receiptName.toLowerCase())
        );
        setData(res);
      } else {
        setData(results);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [receiptName]);

  const handleTyping = (event) => {
    setReceiptName(event.target.value);
    return receiptName;
  };

  return (
    <Box my={4}>
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
  );
};

export default SearchBarAdmin;
