import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ContainedButton from '../ContainedButton';
import Avatar from '@material-ui/core/Avatar';
import { BORDER_COLOR, TEXT_PRIMARY_COLOR } from '../../constants';
//import { LoginCtx, LogoutCtx } from '../LoginWrapper/context';

let LoginInfo = () => {
  //let { userInfo } = React.useContext(LoginCtx);
  //let { execLogout } = React.useContext(LogoutCtx);

  //if (!userInfo) return <pre>Not logged in</pre>;

  return (
    <div css={`
      display: flex;
      align-items: center;
      & > *:not(:last-child) {
        margin-right: 16px;
      }
    `}>
      <Avatar css={`
        width: 32px;
        height: 32px;
      `} />
      <Typography variant="h6" color="textPrimary" css="font-size: 16px">
        {`User1`}
      </Typography>
      <ContainedButton
        textColor="#485465"
        backgroundColor="#f6f7fb"
        hoverBackgroundColor="#f6f7fb"
        onClick={e => alert("logout")}
        css={`
          border-radius: 4px;
          font-size: 13px;
          padding: 4px 16px;
        `}
      >
        로그아웃
      </ContainedButton>
    </div>
  );
};

let Header = () => {
  return (
    <AppBar elevation={0} position="sticky" css={`
      background: white;
      border-bottom: 1px solid ${BORDER_COLOR};
      color: ${TEXT_PRIMARY_COLOR};
    `}>
      <Toolbar variant="dense" css="height: 56px">
        <div css="flex: 1" />
        <LoginInfo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
