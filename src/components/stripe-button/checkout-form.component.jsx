import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

import CardSection from './card-section.component';

import {
  Input,
  Stack,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Button,
  Divider,
  useToast,
  Select,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';

import { EmailIcon, InfoIcon } from '@chakra-ui/icons';

/*
  Payment form with full validation (regex), auto insert email for logged in users and toasts, shakes and red box onfocus for wrong inputs.
  Final result fed back to parent (via paymentResponse function) so an alert can pop up to state result of the transaction. 
*/
export default function CheckoutForm({
  userEmail,
  amount,
  handleShake,
  paymentResponse,
}) {
  // Toast for feedback, color mode for some options
  const toast = useToast();
  const { colorMode } = useColorMode();

  // Stripe specific elements - elements is for the "Card" which has Stripe's card logic - elements cannot be directly changed only styled and turn off a few options e.g zipcode
  const stripe = useStripe();
  const elements = useElements();

  // Store user credentials
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: userEmail ? userEmail : '',
    street: '',
    city: '',
    postcode: '',
    country: 'Select a Country',
  });
  const { name, email, street, city, postcode, country } = userCredentials;

  // Used to decide if to display onfocus error boxes
  const [validCredentials, setValidCredentials] = useState({
    validName: true,
    validCity: true,
    validPostcode: true,
    validCountry: true,
  });
  const {
    validName,
    validCity,
    validPostcode,
    validCountry,
  } = validCredentials;

  // Handle all value changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // reset valid credentials so onfocus red error box reset
    setValidCredentials({
      validName: true,
      validCity: true,
      validPostcode: true,
      validCountry: true,
    });

    // Validate a country has been selected but also to prevent them selecting a country and then re-choosing 'select country option'
    if (name === 'country' && value === 'Select a Country') {
      setUserCredentials({ ...userCredentials, [name]: undefined });
    } else {
      setUserCredentials({ ...userCredentials, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded. Disable form submission until Stripe.js has loaded.
      return;
    }

    // Valid Name and city - at least 2 characters and containing known characters
    /*
    Characters supported:
      abcdefghijklmnopqrstwxyz
      ABCDEFGHIJKLMNOPQRSTUVWXYZ
      áéíóúäëïöüÄ'
      陳大文
      łŁőŐűŰZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųū
      ÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁ
      ŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ.-
      ñÑâê都道府県Федерации
      আবাসযোগ্য জমির걸쳐 있는
    */
    const namePattern = new RegExp(
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/
    );

    // valid uk postcode
    const postcodePattern = new RegExp(
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
    );

    // testing if entered name, city and postcode have valid regex patterns
    let nameFormat = namePattern.test(name);
    let cityFormat = namePattern.test(city);
    let postcodeFormat = postcodePattern.test(postcode);

    // Handle form filled in correctly with regex and toasts
    if (!nameFormat) {
      handleShake();
      setValidCredentials({ ...validCredentials, validName: false });
      toast({
        title:
          'Names must be at least 2 characters long and contain only valid characters.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else if (!cityFormat) {
      handleShake();
      setValidCredentials({ ...validCredentials, validCity: false });
      toast({
        title:
          'Cities must be at least 2 characters long and contain only valid characters.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else if (country === 'United Kingdom' && !postcodeFormat) {
      handleShake();
      setValidCredentials({ ...validCredentials, validPostcode: false });
      toast({
        title: 'Please choose a valid UK postcode.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else if (country === 'Select a Country') {
      handleShake();
      setValidCredentials({ ...validCredentials, validCountry: false });
      toast({
        title: 'Please choose a country.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else {
      // Try and create token
      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card, {
        address_city: city,
        address_line2: street,
        address_country: country,
        address_zip: postcode,
        name: name,
        currency: 'GBP',
      });

      // Card errors
      if (result.error) {
        // Show card error to customer.
        handleShake();
        toast({
          title: result.error.message,
          description: '',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      } else {
        stripeTokenHandler(result.token, email, amount, paymentResponse);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '380px' }}>
      <Stack spacing={3}>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Your full name. This will be the name on your receipt.'>
                  <InfoIcon />
                </Tooltip>
              }
            />
            <Input
              type='text'
              name='name'
              value={name}
              aria-label='Name'
              placeholder='Name'
              required
              onChange={handleChange}
              color='brand.200'
              isInvalid={!validName}
            />
          </InputGroup>
        </FormControl>
        <FormControl hidden={userEmail}>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Must be a valid email as a confirmation email will be sent'>
                  <EmailIcon />
                </Tooltip>
              }
            />
            <Input
              type='email'
              name='email'
              value={email}
              aria-label='email'
              placeholder='Email'
              required
              onChange={handleChange}
              color='brand.200'
            />
          </InputGroup>
        </FormControl>
        <Divider />
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='The address you want the item delivered to.'>
                  <InfoIcon />
                </Tooltip>
              }
            />
            <Input
              type='text'
              name='street'
              value={street}
              aria-label='Street'
              placeholder='Street'
              required
              onChange={handleChange}
              color='brand.200'
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='The city you want the item delivered to.'>
                  <InfoIcon />
                </Tooltip>
              }
            />
            <Input
              type='text'
              name='city'
              value={city}
              aria-label='City'
              placeholder='City'
              required
              onChange={handleChange}
              color='brand.200'
              isInvalid={!validCity}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='The postcode of where you want the item delivered to.'>
                  <InfoIcon />
                </Tooltip>
              }
            />
            <Input
              type='text'
              name='postcode'
              value={postcode}
              aria-label='Postcode'
              placeholder='Postcode'
              required
              onChange={handleChange}
              color='brand.200'
              isInvalid={!validPostcode}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Select your Country'>
                  <InfoIcon />
                </Tooltip>
              }
            />
            <Select
              name='country'
              aria-label='country'
              required
              value={country}
              onChange={handleChange}
              isInvalid={!validCountry}
              color={colorMode === 'dark' ? 'brand.200' : 'gray.500'}
            >
              <option value={undefined}>Select a Country</option>
              <option data-power-region='USA' value='American Samoa'>
                American Samoa
              </option>
              <option data-power-region='AUS' value='Argentina'>
                Argentina
              </option>
              <option data-power-region='AUS' value='Australia'>
                Australia
              </option>
              <option data-power-region='Europe' value='Austria'>
                Austria
              </option>
              <option data-power-region='USA' value='Bangladesh'>
                Bangladesh
              </option>
              <option data-power-region='Europe' value='Belgium'>
                Belgium
              </option>
              <option data-power-region='USA' value='Brazil'>
                Brazil
              </option>
              <option data-power-region='USA' value='British Virgin Islands'>
                British Virgin Islands
              </option>
              <option data-power-region='USA' value='Cambodia'>
                Cambodia
              </option>
              <option data-power-region='USA' value='Canada'>
                Canada
              </option>
              <option data-power-region='AUS' value='China'>
                China
              </option>
              <option data-power-region='AUS' value='Christmas Island'>
                Christmas Island
              </option>
              <option data-power-region='Europe' value='Denmark'>
                Denmark
              </option>
              <option data-power-region='Europe' value='Egypt'>
                Egypt
              </option>
              <option data-power-region='AUS' value='Fiji'>
                Fiji
              </option>
              <option data-power-region='Europe' value='Finland'>
                Finland
              </option>
              <option data-power-region='Europe' value='France'>
                France
              </option>
              <option data-power-region='Europe' value='French Polynesia'>
                French Polynesia
              </option>
              <option data-power-region='Europe' value='Germany'>
                Germany
              </option>
              <option data-power-region='Europe' value='Greece'>
                Greece
              </option>
              <option data-power-region='UK' value='Guernsey'>
                Guernsey
              </option>
              <option data-power-region='UK' value='Hong Kong'>
                Hong Kong
              </option>
              <option data-power-region='Europe' value='Hungary'>
                Hungary
              </option>
              <option data-power-region='Europe' value='Iceland'>
                Iceland
              </option>
              <option data-power-region='Europe' value='India'>
                India
              </option>
              <option data-power-region='Europe' value='Indonesia'>
                Indonesia
              </option>
              <option data-power-region='UK' value='Ireland'>
                Ireland
              </option>
              <option data-power-region='UK' value='Isle of Man'>
                Isle of Man
              </option>
              <option data-power-region='Europe' value='Israel'>
                Israel
              </option>
              <option data-power-region='Europe' value='Italy'>
                Italy
              </option>
              <option data-power-region='USA' value='Japan'>
                Japan
              </option>
              <option data-power-region='UK' value='Jersey'>
                Jersey
              </option>
              <option data-power-region='Europe' value='Liechtenstein'>
                Liechtenstein
              </option>
              <option data-power-region='Europe' value='Luxembourg'>
                Luxembourg
              </option>
              <option data-power-region='UK' value='Macau'>
                Macau
              </option>
              <option data-power-region='UK' value='Malaysia'>
                Malaysia
              </option>
              <option data-power-region='UK' value='Malta'>
                Malta
              </option>
              <option data-power-region='USA' value='Mexico'>
                Mexico
              </option>
              <option data-power-region='USA' value='Micronesia'>
                Micronesia
              </option>
              <option data-power-region='Europe' value='Monaco'>
                Monaco
              </option>
              <option data-power-region='Europe' value='Mongolia'>
                Mongolia
              </option>
              <option data-power-region='AUS' value='Nauru'>
                Nauru
              </option>
              <option data-power-region='Europe' value='Nepal'>
                Nepal
              </option>
              <option data-power-region='Europe' value='Netherlands'>
                Netherlands
              </option>
              <option data-power-region='Europe' value='Netherlands Antilles'>
                Netherlands Antilles
              </option>
              <option data-power-region='Europe' value='New Caledonia'>
                New Caledonia
              </option>
              <option data-power-region='AUS' value='New Zealand'>
                New Zealand
              </option>
              <option data-power-region='AUS' value='Norfolk Island'>
                Norfolk Island
              </option>
              <option data-power-region='Europe' value='Norway'>
                Norway
              </option>
              <option data-power-region='Europe' value='Pakistan'>
                Pakistan
              </option>
              <option data-power-region='AUS' value='Papua New Guinea'>
                Papua New Guinea
              </option>
              <option data-power-region='USA' value='Philippines'>
                Philippines
              </option>
              <option data-power-region='Europe' value='Poland'>
                Poland
              </option>
              <option data-power-region='Europe' value='Portugal'>
                Portugal
              </option>
              <option data-power-region='UK' value='Qatar'>
                Qatar
              </option>
              <option data-power-region='UK' value='Singapore'>
                Singapore
              </option>
              <option data-power-region='AUS' value='Solomon Islands'>
                Solomon Islands
              </option>
              <option data-power-region='Europe' value='South Africa'>
                South Africa
              </option>
              <option data-power-region='Europe' value='South Korea'>
                South Korea
              </option>
              <option data-power-region='Europe' value='Spain'>
                Spain
              </option>
              <option data-power-region='Europe' value='Sweden'>
                Sweden
              </option>
              <option data-power-region='Europe' value='Switzerland'>
                Switzerland
              </option>
              <option data-power-region='USA' value='Taiwan'>
                Taiwan
              </option>
              <option data-power-region='USA' value='Thailand'>
                Thailand
              </option>
              <option data-power-region='Europe' value='Turkey'>
                Turkey
              </option>
              <option data-power-region='UK' value='United Kingdom'>
                United Kingdom
              </option>
              <option data-power-region='USA' value='United States'>
                United States
              </option>
              <option data-power-region='AUS' value='Vanuatu'>
                Vanuatu
              </option>
              <option data-power-region='Europe' value='Vatican City'>
                Vatican City
              </option>
              <option data-power-region='Europe' value='Vietnam'>
                Vietnam
              </option>
            </Select>
          </InputGroup>
        </FormControl>
        <Divider />
        <FormControl bgColor='white'>
          <CardSection />
        </FormControl>
        <Button type='submit' colorScheme='cyan' disabled={!stripe}>
          Confirm Order
        </Button>
      </Stack>
    </form>
  );
}

// external function so not re-rendered - stripe advice
const stripeTokenHandler = async (token, email, amount, paymentResponse) => {
  const paymentData = { token: token.id, email: email, amount: amount };

  // Return and display the result of the charge with an alert pop up.
  try {
    let response = await axios.post('/api/payment', {
      data: { paymentData },
    });
    paymentResponse(response);
  } catch (error) {
    console.error(error);
    paymentResponse(error);
  }
};
