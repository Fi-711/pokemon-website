import { withRouter } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

/*
Back button with Pokemon blue colors
 */
const BackButton = ({ history }) => (
  <Button
    bgColor='brand.400'
    color='brand.200'
    onClick={() => history.goBack()}
  >
    Back
  </Button>
);

export default withRouter(BackButton);
