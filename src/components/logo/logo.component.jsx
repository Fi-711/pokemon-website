import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import logo from '../../assets/tcg-logo.svg';

export default function Logo() {
  return (
    <Box>
      <Image alt='tcg logo' src={logo} />
    </Box>
  );
}
