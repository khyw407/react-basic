import React from 'react';
import axios from 'axios';
import qs from 'query-string';
import { useAsync } from '../../hooks';
import LoginFormPure from './LoginFormPure';

let sleep = ms => new Promise(res => setTimeout(res, ms));

let signInAndRedirect = async ({
  email,
  password,
  service_name,
  client_id,
}) => {
  let { data: { redirect_uri } } = await axios({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: '',
    data: qs.stringify({
      email,
      password,
      service_name,
      client_id,
    }),
    timeout: 2*60*1000,
  });
  if (false) throw Error('WRONG_CREDENTIALS');
  if (!redirect_uri) throw Error('empty redirect_uri');
  window.location.replace(redirect_uri);
  await sleep(10*1000); // emulate fake loading
};

let LoginForm = () => {
  let passwordInputRef = React.useRef();
  let [state, setState] = React.useState({
    id: '',
    pw: '',
    errors: {},
  });
  let [{
    pending: isSigningIn,
  }, execSignInAndRedirect] = useAsync(signInAndRedirect);
  let updateState = newState => setState(state => ({ ...state, ...newState }));
  let validateForm = () => {
    let errors = {};
    if (!state.id) errors.id = `Please enter your email.`;
    if (!state.pw) errors.pw = `Please enter your password.`;
    updateState({ errors });
    if (Object.keys(errors).length) return false;
    return true;
  };
  let handleSubmit = async e => {
    e.preventDefault();
    if (isSigningIn) return;

    updateState({ errors: {} });
    if (validateForm()) {
      let { id, pw } = state;
      try {
        await execSignInAndRedirect({
          email: id,
          password: pw,
        });
      } catch (err) {
        console.warn(err);
        let signInError;
        if (err.message === 'WRONG_CREDENTIALS') {
          signInError = 'Incorrect email or password.';
        } else {
          signInError = 'Sign in failed due to an unexpected error';
        }
        updateState({
          pw: '',
          errors: { signInError },
        });
        passwordInputRef.current && passwordInputRef.current.focus();
      }
    }
  };

  return (
    <LoginFormPure
      isSigningIn={isSigningIn}
      onSubmit={handleSubmit}
      email={state.id}
      password={state.pw}
      emailOnChange={e => updateState({ id: e.target.value })}
      passwordOnChange={e => updateState({ pw: e.target.value })}
      emailError={state.errors.id}
      passwordError={state.errors.pw}
      signInError={state.errors.signInError}
      passwordInputRef={passwordInputRef}
    />
  )
};

export default LoginForm;
