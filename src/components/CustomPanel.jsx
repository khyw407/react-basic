import React from 'react';
import { CircularProgress } from '@material-ui/core';
import CustomPaper from './CustomPaper';
import { PRIMARY_COLOR } from '../constants';

let FlexCenter = ({ ...props }) => (
    <div css={`
        display: flex;
        min-height: 300px;
        align-items: center;
        justify-content: center;
    `} {...props} />
);

let AccentBar = ({ accentColor }) => (
  <div css={`
    width: 100%;
    height: 8px;
    background: ${accentColor};
    position: absolute;
    top: 0;
    left: 0;
  `} />
);

let Placeholder = ({ ...props }) => <FlexCenter css="min-height: 100px; flex: 1; height: 100%;" {...props} />;

let CustomPanel = ({
  accentColor = PRIMARY_COLOR,
  loading,
  loadingMsg = <CircularProgress color="primary" />,
  noData,
  noDataMsg = <pre>No data</pre>,
  error,
  errorMsg = <pre>An error occurred</pre>,
  children,
  ...props
}) => (
  <CustomPaper
    css={`
      position: relative;
      border-radius: 0;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      min-height: 0;
      .CustomPaper-body {
        flex: 1;
        min-height: 0;
      }
    `}
    {...props}
  >
    <AccentBar accentColor={accentColor} />
    {loading ? (
      <Placeholder className="Panel-Placeholder">
        {loadingMsg}
      </Placeholder>
    ) : error ? (
      <Placeholder className="Panel-Placeholder">
        {errorMsg}
      </Placeholder>
    ) : noData ? (
      <Placeholder className="Panel-Placeholder">
        {noDataMsg}
      </Placeholder>
    ) : (
      <React.Fragment>
        {children}
      </React.Fragment>
    )}
  </CustomPaper>
);

export default CustomPanel;
