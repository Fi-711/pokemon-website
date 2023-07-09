import { useState } from 'react';

/*
  Toggle hook, toggles the supplied state
*/
export const useToggleState = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setState(!state);
  };

  toggle();

  return [state, setState];
};
