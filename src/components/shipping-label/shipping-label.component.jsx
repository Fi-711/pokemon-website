import React, { createRef } from 'react';
import Pdf from 'react-to-pdf';
import {
  Center,
  Text,
  Heading,
  Grid,
  GridItem,
  Button,
  Box,
  Divider,
  Image,
} from '@chakra-ui/react';

import barcode from '../../assets/barcode.bmp';
import qrcode from '../../assets/qrcode.png';

const ref = createRef();

/*
Using react-to-pdf to take screen shot of screen and then make a pdf. Works best with light mode - dark mode will cause
grey instead of black. Also must be a full screen - cropping will crop the receipt.
 */
const ShippingLabel = ({ name, address, city, country, postcode }) => {
  let today = new Date();
  // Get today's date and add it to the label
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  return (
    <Grid className='Shipping Label' mx='auto' templateColumns='repeat(1, 1fr)'>
      <GridItem colSpan={1}>
        <div
          ref={ref}
          style={{
            width: '700px',
            paddingTop: '50px',
            paddingLeft: '100px',
          }}
        >
          <Grid
            templateColumns='repeat(3, 1fr)'
            mx='auto'
            mt={10}
            p={5}
            gap={4}
            width='100%'
            style={{ border: '4px dashed black' }}
          >
            <GridItem
              colSpan={1}
              mx='auto'
              border='5px solid black'
              width='100%'
              height='180px'
            >
              <Center>
                <Heading fontSize='120px'>P</Heading>
              </Center>
            </GridItem>
            <GridItem colSpan={1} width='100%'>
              <Heading fontSize='lg'>UK Postage Fees Paid</Heading>
              <Heading fontSize='lg' my={2}>
                PRIORITY MAIL
              </Heading>
              <Text mt={4}>{today}</Text>
              <Text>Mailed from Postcode LX23 6DY</Text>
            </GridItem>
            <GridItem colSpan={1} width='100%'>
              <Image src={qrcode} alt='qr code' />
              <Text textAlign='center' mt={2}>
                071SO1023002
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Divider
                my={2}
                style={{ backgroundColor: 'black', height: '2px' }}
              />
              <Heading textAlign='center'>PRIORITY MAIL 2-DAY</Heading>
              <Divider
                my={2}
                style={{ backgroundColor: 'black', height: '2px' }}
              />
            </GridItem>
            <GridItem colSpan={2} rowSpan={1}>
              <Text fontSize='sm'>Warehouse 2</Text>
              <Text fontSize='sm'>20 Madeup Road</Text>
              <Text fontSize='sm'>London</Text>
            </GridItem>
            <GridItem colSpan={3} rowSpan={1} ml={14}>
              <Text fontSize='2xl' fontFamily='courier new' lineHeight={1.2}>
                {name && name.toUpperCase()}
              </Text>
              <Text fontSize='2xl' fontFamily='courier new' lineHeight={1.2}>
                {address && address.toUpperCase()}
              </Text>
              <Text fontSize='2xl' fontFamily='courier new' lineHeight={1.2}>
                {city && city.toUpperCase()}
              </Text>
              <Text fontSize='2xl' fontFamily='courier new' lineHeight={1.2}>
                {country && country.toUpperCase()}
              </Text>
              <Text fontSize='2xl' fontFamily='courier new' lineHeight={1.2}>
                {postcode && postcode.toUpperCase()}
              </Text>
            </GridItem>
            <GridItem colSpan={3} rowSpan={1}>
              <Divider
                my={2}
                style={{ backgroundColor: 'black', height: '5px' }}
              />
              <Heading fontSize='3xl' textAlign='center'>
                TRACKING #
              </Heading>
              <Image src={barcode} alt='barcode' width='70%' mx='auto' />
              <Divider
                my={2}
                style={{ backgroundColor: 'black', height: '5px' }}
              />
            </GridItem>
          </Grid>
        </div>
      </GridItem>
      <Box colSpan={1} mt={4} mx='auto' pl='100px'>
        <Pdf targetRef={ref} filename='code-example.pdf'>
          {({ toPdf }) => (
            <Button
              mx='auto'
              variant='outline'
              colorScheme='orange'
              onClick={toPdf}
            >
              Generate Pdf
            </Button>
          )}
        </Pdf>
      </Box>
    </Grid>
  );
};

export default ShippingLabel;
