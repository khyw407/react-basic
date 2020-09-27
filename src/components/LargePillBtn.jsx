import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { BORDER_COLOR } from '../constants';

let LargePillBtn = ({ disabled, loading, startIcon, ...props }) => (
  <Button
    variant="outlined"
    disabled={disabled || loading}
    startIcon={loading ? <CircularProgress size={20} /> : startIcon}
    css={`
      background: white;
      color: #485465;
      border-radius: 18px;
      height: 40px;
      border-color: ${BORDER_COLOR};
    `}
    {...props}
  />
);

export default LargePillBtn;
