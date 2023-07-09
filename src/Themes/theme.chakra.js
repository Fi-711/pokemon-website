import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#141214',
    100: '#1a1a1a',
    200: '#ebe3e3',
    300: '#ffcb05',
    400: '#2a75bb',
    500: '#927748',
  },
};

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'gray.300')(props),
      bg: mode('#ebe3e3', '#141214')(props),
    },
  }),
};

const components = {
  // Button
  Button: {
    // 1. We can update the base styles
    baseStyle: (props) => ({
      fontWeight: 'bold', // Normally, it is "semibold"
      color: '#141214',
      _hover: mode(
        {
          boxShadow: '0 0 0px 2px #000000',
        },
        { boxShadow: '0 0 0px 2px #dddddd' }
      )(props),
    }),
    // 2. We can add a new button size or extend existing
    sizes: {
      xl: {
        h: '56px',
        fontSize: 'lg',
        px: '32px',
      },
    },
    // 3. We can add a new visual variant
    variants: {
      // 4. We can override existing variants
      solid: (props) => ({
        bg: mode('brand.300', 'brand.300')(props),
        border: '2px solid #1f1f1f',
      }),
    },
  },
  // Text
  Text: {
    variants: {
      pokemonName: {
        fontFamily: 'Architects Daughter',
        fontWeight: 'bold',
      },
      price: {
        fontFamily: 'Lexend',
      },
    },
  },
  // Divider
  Divider: {
    variants: {
      solid: (props) => ({
        bg: mode('brand.50', 'brand.200')(props),
      }),
    },
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components,
  styles,
  colors,
});

export default theme;
