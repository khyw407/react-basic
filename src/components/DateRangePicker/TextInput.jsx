import React from 'react';
import { TextField } from '@material-ui/core';
import { BORDER_COLOR, TEXT_COLOR } from '../../constants';

let TextInput = ({ ...props }) => (
  <TextField
    variant="outlined"
    margin="dense"
    css={`
      background: white;
      .MuiOutlinedInput-notchedOutline {
        border-color: ${BORDER_COLOR};
      }
      .MuiInputBase-input {
        text-align: center;
        font-weight: 500;
        padding: 8px;
        color: ${TEXT_COLOR};
      }
    `}
    {...props}
  />
);

export default TextInput;
