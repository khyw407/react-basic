import React from 'react';
import { LinearProgress } from '@material-ui/core';
import Sidebar from './Sidebar';
import Header from './Header';
import { BACKGROUND_COLOR } from '../../constants';

let HeaderAndSidebar = ({ children }) => {
  return (
    <div css="display: flex; height: 100%;">
      <Sidebar />
      <div css={`
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
      `}>
        <Header />
        <main css={`
          flex: 1;
          background: ${BACKGROUND_COLOR};
          overflow: auto;
          width: 100%;
          position: relative;
          min-height: 0;
        `}>
          <React.Suspense fallback={
            <LinearProgress color="primary" css={`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 3px;
            `} />
          }>
            {children}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default HeaderAndSidebar;
