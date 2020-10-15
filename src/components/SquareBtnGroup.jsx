import { Link } from 'react-router-dom';
import React from 'react';
import { ToggleButton, ToggleButtonGroup}  from '@material-ui/lab';
import { BORDER_COLOR, PRIMARY_COLOR, LIGHT_PRIMARY_COLOR } from '../constants';

let SquareBtnGroup = ({ ...props }) => (
  <ToggleButtonGroup
    exclusive
    css={`
      background: transparent;
      .MuiToggleButtonGroup-grouped {
        background: white;
        height: auto;
        color: #485465;
        padding: 10px;
        border-color: ${BORDER_COLOR};
        border-radius: 0;
        svg {
          color: #a4a4a4;
        }
        &:hover, &:active, &.Mui-selected {
          border-color: ${PRIMARY_COLOR};
          background: ${LIGHT_PRIMARY_COLOR};
          color: ${PRIMARY_COLOR};
          svg {
            color: ${PRIMARY_COLOR};
          }
        }
      }
      .MuiToggleButtonGroup-grouped.Mui-disabled {
        opacity: .5;
      }
      & > *:not(:first-child) {
        margin-left: 16px;
      }
    `}
    {...props}
  />
);

export default SquareBtnGroup;

export let ToggleBtnLink = ({ ...props }) => {
  let { value, disabled } = props;
  if (disabled) return <ToggleButton {...props} />;
  return (
    <Link to={value}>
      <ToggleButton {...props} />
    </Link>
  );
};
