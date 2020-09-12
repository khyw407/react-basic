import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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

export default (props) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <React.StrictMode>
          <BrowserRouter>
            <RootProvider>
              <RootContainer />
            </RootProvider>
          </BrowserRouter>
        </React.StrictMode>
      </ThemeProvider>
    </StylesProvider>
  );
};
