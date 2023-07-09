import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import { createStructuredSelector } from 'reselect';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { clearItemFromCart } from '../../redux/cart/cart.actions';
import CheckoutForm from './checkout-form.component';
// import PokeballLoader from '../../components/pokeball-loader/pokeball-loader.component';
import logo from '../../assets/pokeball.svg';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  useColorMode,
  Text,
} from '@chakra-ui/react';

import './stripe-button.styles.scss';

// declare global variable stripePromise - constant set it outside for now as issues with cubic bezier causing glitches
const stripePromise = loadStripe(
  'pk_test_51Ibu5QBEKnCejUuZEG91XQlpbTb617h46x7kKhgATZAfZGTg8levf1fwqLnnjoFRcD9Lmu2atXjAcJWFdXEj9pDe00nJe1QLRO'
);

/*
  Use charge tokens to send to backend before sending to Stripe for processing. A public key is stored at backend and sent
  to front end - so no keys stored on frontend.
 */
const StripeCheckoutButton = ({
  price,
  email,
  clearItemFromCart,
  cartItems,
  history,
}) => {
  // Alert Dialog
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const { colorMode } = useColorMode();

  // Stripe needs price in pence - must round or may get floating point errors which will cause stripe to reject the payment!
  const priceForStripe = Math.round(price * 100);

  // Close payment response alert, if success redirect to shop
  const onClose = () => setIsOpen(false);
  const onCloseSuccess = () => {
    onClose();
    history.push('/shop');
  };

  // // Get the stripe public key from the backend
  // useEffect(() => {
  //   const getPublicKey = async () => {
  //     setLoading(true);

  //     try {
  //       let { data } = await axios.get('/api/stripe-key');
  //       // only set key once otherwise re renders will cause issue with stripe elements
  //       if (data && !stripePromise) {
  //         stripePromise = loadStripe(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getPublicKey();
  // }, []);

  const handleShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  // Alert response depending if transaction was successful or not
  const paymentResponse = (res) => {
    if (res.status === 200) {
      // Clear cart items and success alert
      setSuccess(true);
      cartItems.map((item) => clearItemFromCart(item));
    } else {
      setSuccess(false);
    }
    setIsOpen(true);
  };

  /* Test card payment details: 
    card number: 4242 4242 4242 4242 (Visa) - success
    exp: Any Future Date
    cvv: Any 3 digits
  */

  return (
    <Grid className='stripe-button'>
      <Flex className={shake ? 'shake' : ''}>
        <Box
          w='430px'
          h='680px'
          p={3}
          boxShadow='sm'
          rounded='md'
          bg={colorMode === 'dark' ? 'gray.800' : 'gray.800'}
          mx='auto'
          mt={10}
        >
          <Image src={logo} alt='logo' width='70px' mx='auto' my={2} />
          <Heading
            fontSize='4xl'
            color='brand.300'
            textAlign='center'
            textShadow='2px 2px #2a75bb'
            opacity='0.9'
            mb={4}
          >
            Pokemon Cards Shop
          </Heading>
          <Tabs variant='enclosed-colored' isFitted mg={4}>
            <TabList>
              <Tab style={{ cursor: 'default' }}>
                <Text fontSize='xl'>{`Your total is £${price}`}</Text>
              </Tab>
            </TabList>
            <TabPanels mt={3}>
              <TabPanel>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    userEmail={email}
                    amount={priceForStripe}
                    handleShake={handleShake}
                    paymentResponse={paymentResponse}
                  />
                </Elements>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          {success ? (
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Payment Successful
              </AlertDialogHeader>
              <AlertDialogBody>
                Payment has successfully been taken. Your order is now being
                processed.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  colorScheme='green'
                  variant='outline'
                  onClick={onCloseSuccess}
                  ml={3}
                >
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          ) : (
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Payment Unsuccessful
              </AlertDialogHeader>
              <AlertDialogBody>
                There was an issue with your payment. Please ensure you use the
                provided credit card.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  colorScheme='red'
                  variant='outline'
                  onClick={onClose}
                  ml={3}
                >
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialogOverlay>
      </AlertDialog>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  email: selectCurrentUser,
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StripeCheckoutButton));
