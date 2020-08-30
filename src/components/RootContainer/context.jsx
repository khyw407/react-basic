import React from 'react';
import ContextProviders from '../../ContextProviders';

export let RootContext = React.createContext();

export let RootProvider = ({ children }) => {
  return (
    <ContextProviders children={children} providers={[
      { context: RootContext, },
    ]} />
  );
};
