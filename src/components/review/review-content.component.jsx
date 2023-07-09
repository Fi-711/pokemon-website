import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { createStructuredSelector } from 'reselect';

import {
  selectAccessToken,
  selectCurrentUser,
} from '../../redux/user/user.selectors';

import ReviewForm from './review-form.component';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@chakra-ui/react';

import { AiOutlineEdit } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import './review-content.styles.scss';

/*
  Using material UI for built in star rating system
 */
const ReviewContent = ({
  title,
  date,
  rating,
  user,
  content,
  card_name,
  card_set,
  history,
  card_id,
  isAccountPage,
  email,
  currentUser,
  accessToken,
  setReloadReviews,
  reloadReviews,
}) => {
  const [showForm, setShowForm] = useState(false);

  // Regex to pull off the date
  date = date.match(/([^T]*)([T]\d+)/)[1];

  // link to card
  const handleClick = () => {
    history.push({
      pathname: `/card-sets/${card_set}/${card_id}`,
      state: { id: card_id },
    });
  };

  return (
    <Grid container className='review-content'>
      <Grid item xs={12} container justify='flex-start'>
        <Box component='fieldset' mb={3} borderColor='transparent'>
          {isAccountPage && <Typography variant='h6'>{card_name}</Typography>}
          <Rating name='read-only' value={rating} readOnly />
          <Typography variant='subtitle1'>
            <strong>{title}</strong>
          </Typography>
          <Typography variant='overline'>
            <span id='name'>{user.first_name}</span> - Reviewed {date}
          </Typography>
          <Typography variant='body1' id='content'>
            {content}
          </Typography>
          <ButtonGroup my={2}>
            {!showForm && email === currentUser && (
              <Button
                variant='outline'
                colorScheme='orange'
                leftIcon={<AiOutlineEdit style={{ display: 'inline' }} />}
                onClick={() => setShowForm(!showForm)}
              >
                Edit
              </Button>
            )}
            {isAccountPage && (
              <Button
                variant='outline'
                colorScheme='orange'
                onClick={handleClick}
              >
                View Card
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Grid>

      <Grid item xs={12}>
        {showForm && (
          <>
            <Button
              variant='ghost'
              leftIcon={<CloseIcon />}
              onClick={() => setShowForm(!showForm)}
              display='inline'
              ml={['90%', '90%', '92%', '95%']}
            />
            <ReviewForm
              currentUser={currentUser}
              card_id={card_id}
              accessToken={accessToken}
              setShowForm={setShowForm}
              card_set={card_set}
              card_name={card_name}
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

export default connect(mapStateToProps)(withRouter(ReviewContent));
