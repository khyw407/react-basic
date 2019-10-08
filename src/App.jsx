import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import RootContainer from './components/RootContainer';
import { RootProvider } from './components/RootContainer/context';
import './App.css';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'inherit',
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
          <CssBaseline />
          <BrowserRouter>
            <Route component={RootContainer} />
          </BrowserRouter>
        </ThemeProvider>
      </StylesProvider>
    </ContextProviders>
  );
};
