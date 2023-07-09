import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  selectAccessToken,
  selectCurrentUser,
} from '../../redux/user/user.selectors';

import ReviewContent from './review-content.component';
import ReviewForm from './review-form.component';

import { CircularProgress, Grid, Typography } from '@material-ui/core';

import { Button } from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';

import './review.styles.scss';

/*
Main logic for review - review content displays reviews while review form is for writing reviews. Some poor logic choice
here as review-content also needs a form to allow edits so double drill propping going on where duplicate data is passed
to both review-form and review-content's review-form. Should probably move the form out of here and only keep the one in
review-content.
 */
const Review = ({ currentUser, accessToken, card }) => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reloadReviews, setReloadReviews] = useState(false);

  const hasWrittenReview =
    reviews.length > 0 &&
    reviews.filter((review) => review.user_email === currentUser).length > 0;

  const handleClick = () => setShowForm(!showForm);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        let { data } = await axios.get('/api/get-reviews', {
          params: { param: card.card_id },
        });
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [card.card_id, showForm, reloadReviews]);

  return loading ? (
    <Grid
      container
      item
      xs={12}
      justify='center'
      alignContent='center'
      alignItems='center'
      style={{ height: '400px' }}
    >
      <CircularProgress className='review-loader' />
    </Grid>
  ) : (
    <Grid container className='review'>
      <Grid container item xs={12} alignContent='flex-start'>
        <Typography id='review-title'>Reviews</Typography>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <ReviewContent
              key={uuidv4()}
              title={review.title}
              user={review.user}
              content={review.content}
              rating={review.rating}
              date={review.date}
              card_name={review.card_name}
              card_set={review.card_set}
              card_id={review.card_id}
              email={review.user_email}
              isAccountPage={false}
              setReloadReviews={setReloadReviews}
              reloadReviews={reloadReviews}
            />
          ))}
      </Grid>

      <Grid item xs={12}>
        {!showForm && currentUser && !hasWrittenReview && (
          <Button
            variant='outline'
            colorScheme='orange'
            leftIcon={<EditIcon />}
            my={2}
            onClick={handleClick}
          >
            Write Review
          </Button>
        )}

        {showForm && (
          <>
            <Button
              variant='ghost'
              leftIcon={<CloseIcon />}
              onClick={handleClick}
              display='inline'
              ml={['90%', '90%', '92%', '95%']}
            />

            <ReviewForm
              currentUser={currentUser}
              card_id={card.card_id}
              accessToken={accessToken}
              setShowForm={setShowForm}
              card_set={card.card_sets[0].set_id}
              card_name={card.card_name}
              setReloadReviews={setReloadReviews}
              reloadReviews={reloadReviews}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  accessToken: selectAccessToken,
});

export default connect(mapStateToProps)(Review);
