import React from 'react';
import { Typography } from '@material-ui/core';

let SearchBlock = ({ label, children, ...props }) => (
  <div {...props} css={`
    position: relative;
    display: inline-block;
    padding: 8px 0 4px;
    &:not(:last-child) {
      margin-right: 28px;
    }
  `}>
    {!!label && (
      <Typography css={`
        font-weight: 500;
        font-size: 15px;
        position: absolute;
        top: -20px;
        left: 0;
        color: #485465;
      `}>{label}</Typography>
    )}
    {children}
  </div>
);

export default SearchBlock;
