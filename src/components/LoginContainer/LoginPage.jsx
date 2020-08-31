import React from 'react';
import { Paper } from '@material-ui/core';
import LoginForm from './LoginForm';

let Copyright = () => (
  <div css={`
    color: #999999;
    font-size: 14px;
    text-align: center;
    padding: 16px;
  `}> </div>
);

let LoginPage = () => {
  return (
    <div css={`
      width: 100vw;
      height: 100vh;
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      overflow: auto;
      background: #f7f7f7;
    `}>
      {(() => {
        return (
          <React.Fragment>
            <Paper
              css={`
                flex: none;
                margin: auto;
                width: 450px;
                min-height: 350px;
              `}
            >
              <LoginForm />
              <div css={`
                position: relative;
              `}>
                <div css={`
                  position: absolute;
                  width: 100%;
                `}>
                  <Copyright />
                </div>
              </div>
            </Paper>
          </React.Fragment>
        );
      })()}
    </div>
  );
};

export default LoginPage;
