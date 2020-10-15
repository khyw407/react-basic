import React from 'react';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { ReactComponent as CogSvg } from '../../media/cog.svg';
import { PRIMARY_COLOR } from '../constants';
import SquareBtnGroup, { ToggleBtnLink } from './SquareBtnGroup';

let Toolbar = ({ paths, title, ...props }) => {
  let location = useLocation();
  return (
    <div css={`
      display: flex;
      align-items: center;
      flex-shrink: 0;
    `} {...props}>
      <div css="display: flex; align-items: center;">
        <CogSvg css={`
          color: ${PRIMARY_COLOR};
          margin-right: 16px;
        `} />
        <Typography css="font-size: 20px; font-weight: bold;">{title}</Typography>
      </div>
      <div css="flex: 1" />
      <SquareBtnGroup value={location.pathname}>
        {paths.map(path => (
          <ToggleBtnLink value={path.href} key={path.href}>
            <div css="display: flex">
              {path.icon}
              <Typography css="margin-left: 12px">
                {[].concat(path.name).join(' ')}
              </Typography>
            </div>
          </ToggleBtnLink>
        ))}
      </SquareBtnGroup>
    </div>
  );
};

export default Toolbar;
