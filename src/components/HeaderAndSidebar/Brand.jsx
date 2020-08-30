import React from 'react';
import { Typography } from '@material-ui/core';
import { ReactComponent as HamburgerMenuSvg } from '../../media/hamburger-menu.svg';
import { PRIMARY_COLOR } from '../../constants';

let Brand = () => {
  return (
    <div>
      <div css={`
        height: 56px;
        padding: 16px;
        display: flex;
        align-items: center;
      `}>
        <HamburgerMenuSvg css={`
          color: ${PRIMARY_COLOR};
        `} />
        <div css="width: 8px" />
        <Typography css="font-size: 16px; font-weight: 500;">
          Admin Page
        </Typography>
      </div>
    </div>
  );
};

export default Brand;
