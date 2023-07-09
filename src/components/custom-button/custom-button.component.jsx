import React from 'react';

import './custom-button.styles.scss';

/*
  Old button - replaced with Chakra's inbuilt buttons
 */
const CustomButton = ({ children, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? 'inverted' : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
