import React from 'react';

export let RootContext = React.createContext();

export let RootProvider = ({ children }) => {
  let [item, setItem] = React.useState('RootProvider123');

  let context = {
    item,
    setItem,
  };

  return (
    <RootContext.Provider value={context}>
      {children}
    </RootContext.Provider>
  );
};
