import React from 'react';
import { RootContext } from '../RootContainer/context';

let HomeContainer = () => {
  let { item } = React.useContext(RootContext);
  return (
    <div>
      <h1>HomeContainer</h1>
      <h3>{item}</h3>
    </div>
  );
};

export default HomeContainer;
