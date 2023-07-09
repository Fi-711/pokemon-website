// react components
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// redux
import { store, persistor } from './redux/store';

// components
import App from './App';
import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';

// Chakra UI
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

// css files
import './index.css';

// Modified the default Chakra theme settings
import theme from './Themes/theme.chakra';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <ScrollToTop />
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root')
);
