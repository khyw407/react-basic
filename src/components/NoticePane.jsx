import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { SECONDARY_COLOR } from '../constants';

let NoticePane = ({ children, ...props }) => (
  <Card {...props} css={`
    border-left: 5px solid ${SECONDARY_COLOR};
  `}>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

export default NoticePane;
