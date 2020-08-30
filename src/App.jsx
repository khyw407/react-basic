import React from 'react';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import RootContainer from './components/RootContainer';
import { RootProvider } from './components/RootContainer/context';
import GlobalStyle from './GlobalStyle';
import '@openfonts/noto-sans-kr_korean';
import moment from 'moment';
import 'moment/locale/ko';
import { PRIMARY_COLOR, TEXT_PRIMARY_COLOR, TEXT_SECONDARY_COLOR, SECONDARY_COLOR } from './constants';

moment.locale('ko');

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'inherit',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    text: {
      primary: TEXT_PRIMARY_COLOR,
      secondary: TEXT_SECONDARY_COLOR,
    },
  },
});

let ContextProviders = ({ providers = [], children }) => {
  return providers.reverse().reduce((_children, provider) => {
    let [Provider, value] = [].concat(provider);
    return (
      <Provider value={value}>
        {_children}
      </Provider>
    );
  }, children);
};

export default (props) => {
  return (
    <ContextProviders providers={[
      RootProvider,
    ]}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <CssBaseline />
          <React.StrictMode>
            <BrowserRouter>
              <Route component={RootContainer} />
            </BrowserRouter>
          </React.StrictMode>
        </ThemeProvider>
      </StylesProvider>
    </ContextProviders>
  );
};
