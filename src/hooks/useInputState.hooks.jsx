import { useState } from 'react';

/*
  Tracks value changes based on user input
*/
export const useInputState = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [value, handleChange, reset];
};
