import React from 'react';
import { Button } from '@material-ui/core';
import { darken } from 'polished';
import clsx from 'clsx';
import { SECONDARY_COLOR } from '../constants';

let ToggleBtn = ({ active, onChange, btnColor = SECONDARY_COLOR, ...props }) => {
  let onClick = e => onChange(!active);

  return (
    <Button
      className={clsx(
        'ToggleBtn-root',
        active && 'ToggleBtn-active',
      )}
      variant={active ? 'contained' : 'outlined'}
      color="secondary"
      disableElevation
      onClick={onClick}
      css={`
        min-height: 34px;
        margin-right: 12px;
        color: ${btnColor};
        border-color: ${btnColor};
        &:hover {
          border-color: ${btnColor};
        }

        &.ToggleBtn-active {
          color: white;
          background-color: ${btnColor};
          &:hover {
            background-color: ${darken(0.05, btnColor)};
          }
        }
      `}
      {...props}
    />
  );
};

export default ToggleBtn;
