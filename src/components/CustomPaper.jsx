import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

let CustomPaper = React.forwardRef(({ title, titleEnd, children, className, header, footer, ...props }, ref) => (
  <Paper
    ref={ref}
    className={clsx('CustomPaper-root', className)}
    css={`
      width: 100%;
      margin: 30px 0;
      box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.12);
      border-radius: 12px;
      padding: 16px;
    `}
    {...props}
  >
    {header || title || titleEnd ? (
      <div className="CustomPaper-header" css={`
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      `}>
        {header ? (
          <React.Fragment>
            {header}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {!!title && (
              <Typography className="CustomPaper-title" css={`
                font-size: 16px;
                font-weight: 500;
                line-height: 1;
              `}>{title}</Typography>
            )}
            <div css="flex: 1" />
            {!!titleEnd && (
              <div className="CustomPaper-titleEnd" css="display: flex">
                {titleEnd}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    ) : null}
    <div className="CustomPaper-body">
      {children}
    </div>
    {!!footer && (
      <div className="CustomPaper-footer" css="margin-top: 16px">
        {footer}
      </div>
    )}
  </Paper>
));

export default CustomPaper;
