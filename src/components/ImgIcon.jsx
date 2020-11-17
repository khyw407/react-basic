import React from 'react';

let ImgIcon = props => (
  <img
    alt=""
    css={`
      flex-shrink: 0;
      object-fit: contain;
      user-select: none;
      .Mui-disabled & {
        opacity: .5;
      }
    `}
    {...props}
  />
);

export default ImgIcon;
