import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import PokeballLoader from '../../components/pokeball-loader/pokeball-loader.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import { Flex, Heading, Text, Divider, Box } from '@chakra-ui/react';

const Validation = ({ location, history, setCurrentUser }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Regex expression to pull token off url if present
  const header = location.search.match(/([=])(.*)/);

  const redirect = () => {
    setTimeout(() => history.push('/shop'), 5000);
  };

  useEffect(() => {
    try {
      setLoading(true);

      const token = header ? header[2] : null;

      const validate = async () => {
        let { data } = await axios.get('/api/validate-email', {
          headers: { Authorization: `Bearer${token}` },
        });

        if (data) {
          console.log(data);
          setCurrentUser(data);
          setResponse(200);
        }
      };

      token && validate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [header]);

  return loading ? (
    <PokeballLoader />
  ) : (
    <Flex mx='auto' mt={'30vh'} height='50vh'>
      {response ? (
        <Box width='90%' mx='auto'>
          <Heading fontSize='2xl' textAlign='center' color='green.500'>
            Successfully validated email! You can now login. Happy shopping!
          </Heading>
          <Divider my={10} />
          <Text fontSize='xl' textAlign='center'>
            You'll be automatically redirected in the next few seconds.
          </Text>
        </Box>
      ) : (
        <Box width='90%' mx='auto'>
          <Heading fontSize='2xl' textAlign='center' color='red.500'>
            Something went wrong. Email not validated :(.
          </Heading>
          <Divider my={10} />
          <Text fontSize='xl' textAlign='center'>
            You'll be redirected to the shop. Buying some cards will make you
            feel better :)
          </Text>
        </Box>
      )}
      {redirect()}
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Validation);
