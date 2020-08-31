import React from 'react';
import LoginPage from './LoginPage';

let LoginConatiner = ({ location, history, match }) => {
  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <LoginPage />
  );
};

export default LoginConatiner;
