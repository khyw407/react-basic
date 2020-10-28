import React from 'react';
import { Typography, Tooltip } from '@material-ui/core';
import { BORDER_COLOR, TEXT_PRIMARY_COLOR } from '../../constants';

let TimelineItem = ({
  margin = 0,
  height,
  width,
  left,
  label,
  tooltip,
  style = {},
  onClick,
  children,
}) => {
  let render = (
    <div
      // use style object for frequently changed styles
      style={{
        height,
        width: width - margin,
        left: left - margin/2,
        backgroundColor: '#f4faff',
        color: TEXT_PRIMARY_COLOR,
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
      onClick={onClick ? onClick : undefined}
      css={`
        overflow: hidden;
        text-overflow: ellipsis;
        position: absolute;
        top: 0;
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid ${BORDER_COLOR};
        border-right: 1px solid ${BORDER_COLOR};
      `}
    >
      {children ? children : (
        <Typography noWrap css="font-size: 12px; font-weight: 500;">
          {label}
        </Typography>
      )}
    </div>
  );
  if (tooltip) return (
    <Tooltip arrow title={tooltip}>
      {render}
    </Tooltip>
  );
  return render;
};

export default TimelineItem;
