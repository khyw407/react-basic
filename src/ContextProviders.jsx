import React from 'react';
import { isArray, isPlainObject } from 'is-what';
import memoizeOne from 'memoize-one';

let isShallowEqual = (objOrArr1, objOrArr2) => {
  let [keys1, vals1] = [Object.keys(objOrArr1), Object.values(objOrArr1)];
  let [keys2, vals2] = [Object.keys(objOrArr2), Object.values(objOrArr2)];
  let arrEq = (arr1, arr2) => arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
  return arrEq(keys1, keys2) && arrEq(vals1, vals2);
};

let ContextProviders = ({ providers = [], children }) => {
  let reversedProviders = providers.slice().reverse();
  
  let objMemoizers = React.useMemo(() => {
    return reversedProviders.map(() => {
      let memoized = memoizeOne(
        objOrArr => objOrArr,
        ([now], [prev]) => isShallowEqual(now, prev)
      );
      return memoized;
    });
  }, []); // eslint-disable-line

  return reversedProviders.reduce((_children, provider, i) => {
    if (React.isValidElement(provider)) {
      return React.cloneElement(provider, { children: _children });
    }
    if (isPlainObject(provider)) {
      let { provider: Provider, context: Context, value, memoValues } = provider;
      if (!provider && !Context) {
        throw Error('must specify either "provider" or "context"');
      }
      Provider = Provider || Context.Provider;
      let provValue = value;
      if (memoValues) {
        if (!isPlainObject(memoValues) && !isArray(memoValues)) {
          throw Error('"memoValues" must be fixed length plain object or array');
        }
        let memObject = objMemoizers[i];
        provValue = memObject(memoValues);
      }
      return <Provider value={provValue} children={_children} />;
    }
    
    let [Provider, value] = [].concat(provider);
    return (
      <Provider value={value}>
        {_children}
      </Provider>
    );
  }, children);
};

export default ContextProviders;
