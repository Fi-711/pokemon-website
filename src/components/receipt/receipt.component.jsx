import { Text, Grid, Button, GridItem } from '@chakra-ui/react';

/*
    Links to a stripe receipt url
 */
const Receipt = ({ amount, receipt, created }) => {
  //Convert Unix time stamp to date using built in function but first multiply timestamp by 1000 as javascript
  //uses milliseconds for Date objects
  let date = new Date(created * 1000).toLocaleDateString('en-GB');

  return (
    <Grid templateColumns='repeat(3, 1fr)' width='100%'>
      <GridItem colSpan={1}>
        <Text fontSize={['sm', 'sm', 'lg']}>{date}</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Text fontSize={['sm', 'sm', 'lg']}>£{(amount / 100).toFixed(2)}</Text>
      </GridItem>
      <GridItem colSpan={1}>
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

export default Receipt;
