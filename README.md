## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Usage: Custom React Hooks

### useAsync (deprecated)
```jsx
import { useAsync } from '../hooks';
```
2 ways to use useAsync
```jsx
let App = () => {
  let [asyncState, execAsyncFunc] = useAsync(async () => {});
  // execAsyncFunc function identity is stable and won’t change on re-renders.
  let { result, pending, error, callCount } = asyncState;
  let handleOnClick = e => execAsyncFunc();
  if (callCount === 0) return <p>Click the button to get started</p>;
  if (pending) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <button onClick={handleOnClick}>{result || 'click me'}</button>
  );
};
````
```jsx
let App = () => {
  let [, execAsyncFunc] = useAsync(async () => {});
  // execAsyncFunc function identity is stable and won’t change on re-renders.
  let handleOnClick = async e => {
    try {
      let res = await execAsyncFunc();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button onClick={handleOnClick}>click me</button>
  );
};
```

### usePromise
```jsx
import { usePromise } from '../hooks';
```
2 ways to use usePromise
```jsx
let App = () => {
  let [promiseState, execPromise] = usePromise(async () => {
    await new Promise(res => setTimeout(res, 1000));
    return 'Hello';
  });
  // execPromise function identity is stable and won’t change on re-renders.
  let { value, loading, error, callCount } = promiseState;
  let handleOnClick = e => execPromise();
  if (callCount === 0) return <p>Click the button to get started</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <button onClick={handleOnClick}>{value || 'click me'}</button>
  );
};
````
```jsx
let App = () => {
  let [, execPromise] = usePromise(async () => {
    await new Promise(res => setTimeout(res, 1000));
    return 'Hello';
  });
  // execPromise function identity is stable and won’t change on re-renders.
  let handleOnClick = async e => {
    let [value, error] = await execPromise(); // like golang syntax
    // alternative:
    // let { value, error } = await execPromise(); // this is OK too
    if (error) {
      return console.warn(error);
    }
    alert(value);
  };
  return (
    <button onClick={handleOnClick}>click me</button>
  );
};
```

### useIsMobile
```jsx
import { useIsMobile } from '../hooks';

let App = () => {
  let isMobile = useIsMobile();
  if (isMobile) return <h3>Mobile</h3>;
  return <h1>Desktop</h1>;
};
````

### useAssignedRef
```jsx
import { useAssignedRef } from '../hooks';

let App = () => {
  let valA = Date.now();
  let myObj = useAssignedRef({ valA });
  // myObj identity will never change
  // only myObj.valA will change over time
  return <div></div>;
};
````

### useDidMount
```jsx
import { useDidMount } from '../hooks';

/*
same as React.useEffect() except
useDidMount only run once on first render
*/

let App = () => {
  useDidMount(() => {
    console.log('componentDidMount');
    let onClick = e => console.log(e);
    document.addEventListener('click', onClick);
    return () => {
      console.log('componentWillUnmount');
      document.removeEventListener('click', onClick);
    };
  });
  return <div></div>;
};
````

### useDidUpdate
```jsx
import { useDidUpdate } from '../hooks';

/*
same as React.useEffect() except
useDidUpdate won't run on first render (first mount)
*/
````

### useMemoObject
```jsx
/*
useMemoObject memoizes an object/array based on its entries (using Object.values(objOrArray))
React.useMemo(
  () => objOrArr,
  Object.values(objOrArr),
);
*/

import { useMemoObject } from '../hooks';

let Component = ({ prop1, prop2, prop3 }) => {
  let memoizedObject = useMemoObject({ prop1, prop2 });

  // this is equivalent to:
  /*
    let memoizedObject = React.useMemo(
      () => ({ prop1, prop2 }),
      [prop1, prop2],
    );
  */

  return (
    <React.Fragment>
      <Child {...memoizedObject} />
      <AnotherChild prop3={prop3} />
    </React.Fragment>
  );
};
````

### useCallbackRef
```jsx
/*
useCallbackRef keeps a function identity unchanged over time while keeping its content up-to-date
*/

import { useCallbackRef } from '../hooks';

let Component = ({ prop1, prop2, prop3 }) => {
  let [currentValue, setCurrentValue] = React.useState('');
  let onChange = useCallbackRef(e => {
    console.log(currentValue);
    setCurrentValue(e.target.value);
  });

  React.useEffect(() => {
    // onChange() identity will never change
    // so this effect will run only once on mount
    console.log('onChange() identity changed');
  }, [onChange]);

  return (
    <input
      value={currentValue}
      onChange={onChange}
    />
  );
};
````

# Usage: ContextProviders

### ContextProviders
```jsx
import ContextProviders from '../ContextProviders';
import { useMemoObject } from '../hooks';
import [ SomeProvider ] from './context';

let Context1 = React.createContext();
let App = () => {
  let [someValue, setSomeValue] = React.useState(123);
  return (
    <ContextProviders providers={[
      <SomeProvider />,
      <Context1.Provider value={someValue} />,
    ]}>
      <MyComponent />
    </ContextProviders>
  );
};

let Context2 = React.createContext();
let Context3 = React.createContext();
let Context4 = React.createContext();
let App2 = () => {
  let [val1, setVal1] = React.useState();
  let [val2, setVal2] = React.useState();
  let [val3, setVal3] = React.useState();
  return (
    <ContextProviders providers={[
      { context: Context2, value: val1 },
      { context: Context3, memoValues: { val2, val3 } }, // these 2 lines are essentially the same
      <Context4.Provider value={useMemoObject({ val2, val3 })} />, // these 2 lines are essentially the same
    ]}>
      <MyComponent />
    </ContextProviders>
  );
};
````
