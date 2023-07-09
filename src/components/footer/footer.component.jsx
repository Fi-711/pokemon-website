import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import './footer.styles.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <Typography variant='subtitle2' className='footer-bottom'>
        Copyright 2021&copy;
      </Typography>
    </div>
  );
};
export default withRouter(Footer);
