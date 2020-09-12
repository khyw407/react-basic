import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { IconButton } from '@material-ui/core';

export default function NextPrevIcon({ next, prev, ...props }) {
  let icon = next ? <ChevronRightIcon /> :
    prev ? <ChevronLeftIcon /> :
    null;
  return (
    <IconButton size="small" {...props} css={`
      position: absolute;
      top: 17px;
      ${next ? 'right: 22px;' : ''}
      ${prev ? 'left: 22px;' : ''}
      .MuiSvgIcon-root {
        font-size: 30px;
      }
    `}>{icon}</IconButton>
  );
};
