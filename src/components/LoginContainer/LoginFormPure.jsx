import React from 'react';
import clsx from 'clsx';
import { Typography, TextField, ButtonBase, Divider, CircularProgress } from '@material-ui/core';
import logo from '../../media/logo192.png';

let Field = (props) => (
  <TextField
    onChange={e => 0}
    color="primary"
    margin="dense"
    variant="outlined"
    type="text"
    {...props}
  />
);

let Label = props => (
  <Typography
    css="font-size: 13px; color: rgba(0, 0, 0, 0.6);"
    {...props}
  />
);

let useConfig = () => {
  return {
    icon: logo,
    btnColor: '#ee1f60',
  };
};

let LoginFormPure = ({
  isSigningIn,
  onSubmit = e => e.preventDefault(),
  email,
  password,
  emailOnChange,
  passwordOnChange,
  emailError,
  passwordError,
  signInError,
  passwordInputRef,
}) => {
  let { icon, btnColor } = useConfig();

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      css={`
        position: relative;
      `}
    >
      <div css={`
        padding: 30px 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}>
        <Typography
          css={`
            color: #1b2334;
            font-weight: bold;
            letter-spacing: -.44px;
          `}
          variant="h5"
        >로그인을 해주세요.</Typography>
        {icon && <img css="height: 48px;" src={icon} alt="" />}
      </div>
      <Divider color="#dbdee8" />
      <div css={`
        padding: 28px 25px;
        display: flex;
        flex-direction: column;
      `}>
        <Label>E-mail</Label>
        <Field
          autoFocus
          autoComplete="email"
          name="email"
          value={email}
          disabled={isSigningIn}
          error={Boolean(emailError || signInError)}
          helperText={emailError || signInError}
          onChange={emailOnChange}
        />
        <div css="height: 20px" />
        <Label>비밀번호</Label>
        <Field
          autoComplete="current-password"
          name="password"
          type="password"
          inputRef={passwordInputRef}
          value={password}
          disabled={isSigningIn}
          error={Boolean(passwordError || signInError)}
          helperText={passwordError}
          onChange={passwordOnChange}
        />
        <div css="height: 50px" />
        <ButtonBase
          css={`
            border-radius: 4px;
            background: ${btnColor};
            color: white;
            font-size: 17px;
            letter-spacing: -.4px;
            height: 48px;
            &.isSigningIn {
              opacity: .7;
            }
            &.Mui-disabled:not(.isSigningIn) {
              background: #f6f7fb;
              color: #999999;
            }
          `}
          size="large"
          type="submit"
          className={clsx(isSigningIn && 'isSigningIn')}
          disabled={isSigningIn || !email || !password}
        >
          {!isSigningIn ? (
            <span>로그인</span>
          ) : (
            <CircularProgress
              size={18}
              thickness={5}
              css="color: white"
              color="inherit"
            />
          )}
        </ButtonBase>
      </div>
    </form>
  )
};

export default LoginFormPure;
