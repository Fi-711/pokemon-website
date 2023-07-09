import { useState } from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


import { Input, Text, Button, Textarea } from '@chakra-ui/react';

export default function ReviewForm({
  currentUser,
  card_id,
  accessToken,
  setShowForm,
  card_set,
  card_name,
  setReloadReviews,
  reloadReviews,
}) {
  const [value, setValue] = useState(3);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = await axios.post(
        '/api/add-review',
        {
          data: {
            rating: value,
            title: title,
            content: content,
            email: currentUser,
            card_id: card_id,
            card_name: card_name,
            card_set: card_set,
          },
        },
        { headers: { Authorization: `Bearer${accessToken}` } }
      );
      if (data.status === 200) {
        setShowForm();
        setReloadReviews(!reloadReviews);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='review-form' onSubmit={handleSubmit}>
      <Box component='fieldset' mb={3} borderColor='transparent'>
        <Text fontSize='xl' my={2}>
          Rating
        </Text>
        <Rating
          name='simple-controlled'
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <fieldset>
        <div className='text-input'>
          <label htmlFor='title' />
          <Input
            type='text'
            id='title'
            name='title'
            value={title}
            isRequired
            placeholder='Review Title'
            autoComplete='off'
            onChange={(event) => setTitle(event.target.value)}
            variant='filled'
          />
          <label htmlFor='contents' />
          <Textarea
            id='contents'
            name='contents'
            placeholder='Write something..'
            isRequired
            value={content}
            onChange={(event) => setContent(event.target.value)}
            variant='filled'
            my={4}
          />
        </div>
        <div>
          <Button colorScheme='orange' variant='outline' type='submit' mb={4}>
            Submit
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
