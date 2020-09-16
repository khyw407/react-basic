import React from 'react';
import { Typography } from '@material-ui/core';

let ChartTitle = props => (
  <Typography
    variant="h5"
    color="textSecondary"
    css="padding-left: 24px; padding-bottom: 16px;"
    {...props}
  />
);

export default ChartTitle;
