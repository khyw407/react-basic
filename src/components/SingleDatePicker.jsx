import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

let CustomDateInputField = ({ InputProps = {}, ...props }) => (
  <TextField
    {...props}
    variant="outlined"
    InputProps={{
      ...InputProps,
      startAdornment: <InputAdornment position="start">일</InputAdornment>,
    }}
    margin="none"
    size="small"
    css={`
      width: 200px;
      .MuiInputBase-root {
        padding-right: 0;
        background: white;
      }
    `}
  />
);

let SingleDatePicker = ({ ...props }) => {
  return (
    <KeyboardDatePicker
      TextFieldComponent={CustomDateInputField}
      format="YYYY-MM-DD"
      variant="inline"
      {...props}
    />
  );
};

export default SingleDatePicker;
