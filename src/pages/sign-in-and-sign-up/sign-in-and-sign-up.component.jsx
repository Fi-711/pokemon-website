import { useState } from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import logo from '../../assets/pokeball.svg';

import {
  Box,
  Flex,
  Image,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  useColorMode,
} from '@chakra-ui/react';

import './sign-in-and-sign-up.styles.scss';

/*
  Contains sign in and sign up forms nested in tabs. Shakes on incorrect input. Toasts for responsive feedback.
*/
const SignInAndSignUpPage = () => {
  const { colorMode } = useColorMode();
  const [shake, setShake] = useState(false);

  const handleShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  return (
    <Flex
      justify='center'
      my={['30%', '30%', '20%', '10%']}
      className='sign-in-and-sign-up'
      width={['90%']}
      mx='auto'
    >
      <Flex className={shake ? 'shake' : ''}>
        <Box
          w='350px'
          p={3}
          boxShadow='sm'
          rounded='md'
          bg={colorMode === 'dark' ? 'gray.800' : 'gray.800'}
        >
          <Image src={logo} alt='logo' width='70px' mx='auto' my={6} />
          <Tabs variant='enclosed-colored' isFitted mg={4}>
            <TabList>
              <Tab>Log In</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels mt={3}>
              <TabPanel>
                <SignIn handleShake={handleShake} />
              </TabPanel>
              <TabPanel>
                <SignUp handleShake={handleShake} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignInAndSignUpPage;
