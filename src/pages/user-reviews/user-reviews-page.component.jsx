import { v4 as uuidv4 } from 'uuid';

import ReviewContent from '../../components/review/review-content.component';

import { Grid, GridItem } from '@chakra-ui/react';

const UserReviewsPage = ({ data, setReloadReviews, reloadReviews }) => {
  return (
    <Grid
      templateColumns={{ md: 'repeat(3, 1fr)' }}
      mx='auto'
      width={['100%', '100%', '80vw', '80vw', '50vw']}
    >
      <GridItem my={4} colSpan={1}>
        {data &&
          data.review.map((r) => (
            <ReviewContent
              title={r.title}
              date={r.date}
              rating={r.rating}
              user={data.first_name}
              content={r.content}
              card_name={r.card_name}
              card_set={r.card_set}
              card_id={r.card_id}
              email={data.email}
              key={uuidv4()}
              isAccountPage={true}
              setReloadReviews={setReloadReviews}
              reloadReviews={reloadReviews}
            />
          ))}
      </GridItem>
    </Grid>
  );
};

export default UserReviewsPage;
