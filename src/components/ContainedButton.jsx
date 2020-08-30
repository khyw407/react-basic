import React from 'react';
import { Button } from '@material-ui/core';
import { darken } from 'polished';
import PropTypes from 'prop-types';

let ContainedButton = ({ backgroundColor, hoverBackgroundColor, textColor, ...props }) => {
  if (backgroundColor && !hoverBackgroundColor) hoverBackgroundColor = darken(0.05, backgroundColor);
  return (
    <Button
      css={`
        padding: 6px 32px;
        border-radius: 8px;
        box-shadow: unset;
        flex-shrink: 0;
        color: ${textColor};
        background-color: ${backgroundColor};
        &:hover {
          background-color: ${hoverBackgroundColor};
        }
      `}
      color="primary"
      variant="contained"
      {...props}
    />
  );
};

ContainedButton.propTypes = {
  backgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default ContainedButton;
