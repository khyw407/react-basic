import React from 'react';
import { Button } from '@material-ui/core';
import { BORDER_COLOR, PRIMARY_COLOR } from '../constants';

let PillBtn = ({ isActive, ...props }) => (
  <Button
    variant="outlined"
    css={`
      font-size: 15px;
      font-weight: 500;
      background: white;
      border-radius: 18px;
      padding-top: 2px;
      padding-bottom: 2px;
      border-color: ${BORDER_COLOR};
      ${isActive ? `
        && {
          background: ${PRIMARY_COLOR};
          color: white;
          border-color: transparent;
        }
      ` : ''}
    `}
    {...props}
  />
);

export default PillBtn;
