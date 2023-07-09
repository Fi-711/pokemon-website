import { v4 as uuidv4 } from 'uuid';

import { Text, Grid, GridItem } from '@chakra-ui/react';

import Receipt from '../../components/receipt/receipt.component';

const ReceiptsPage = ({ receipts }) => (
  <Grid
    templateColumns={{ md: 'repeat(3, 1fr)' }}
    width={['100%', '100%', '80vw', '80vw', '50vw']}
    mx='auto'
  >
    <GridItem colSpan={1}>
      <Text fontSize={['sm', 'sm', 'lg']}>Date</Text>
    </GridItem>
    <GridItem colSpan={1}>
      <Text fontSize={['sm', 'sm', 'lg']}>Amount</Text>
    </GridItem>
    <GridItem colSpan={1}>
      <Text fontSize={['sm', 'sm', 'lg']}>Receipt</Text>
    </GridItem>
    <GridItem colSpan={3}>
      {receipts &&
        receipts.map((receipt) => (
          <Receipt
            key={uuidv4()}
            amount={receipt.amount}
            receipt={receipt.receipt_url}
            created={receipt.created}
          />
        ))}
    </GridItem>
  </Grid>
);

export default ReceiptsPage;
