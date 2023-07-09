import { withRouter } from 'react-router-dom';
import { Text, Grid, Button, GridItem } from '@chakra-ui/react';

/*
    Invoice component - makes a row of 5 items: Email, Date, Amount, Shipping Label and Receipt
    Used by admin page to display customer transactions
 */
const Invoice = ({
  email,
  amount,
  receipt,
  created,
  history,
  match,
  shipping,
}) => {
  const handleClick = () => {
    history.push({
      pathname: `${match.url}/shipping`,
      state: { shipping },
    });
  };

  let date = new Date(created * 1000).toLocaleDateString('en-GB');

  return (
    <Grid templateColumns='repeat(8, 1fr)' width='100%'>
      <GridItem colSpan={3}>
        <Text fontSize={['sm', 'sm', 'lg']} isTruncated>
          {email}
        </Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Text fontSize={['sm', 'sm', 'lg']}>{date}</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Text fontSize={['sm', 'sm', 'lg']}>£{(amount / 100).toFixed(2)}</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Button
          variant='outline'
          colorScheme='orange'
          fontSize={['xs', 'sm', 'lg']}
          my={2}
          mx='auto'
          p={[2, 2, 4]}
          onClick={handleClick}
        >
          Label
        </Button>
      </GridItem>
      <GridItem colSpan={2}>
        <a href={receipt}>
          <Button
            variant='outline'
            colorScheme='orange'
            fontSize={['xs', 'sm', 'lg']}
            my={2}
            mx='auto'
            p={[2, 2, 4]}
          >
            Receipt
          </Button>
        </a>
      </GridItem>
    </Grid>
  );
};

export default withRouter(Invoice);
