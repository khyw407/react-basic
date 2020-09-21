This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Usage: Custom React Hooks

### useAsync (deprecated)
```jsx
import { useAsync } from '@51tf/react-common/hooks';
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
import { usePromise } from '@51tf/react-common/hooks';
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
import { useIsMobile } from '@51tf/react-common/hooks';

let App = () => {
  let isMobile = useIsMobile();
  if (isMobile) return <h3>Mobile</h3>;
  return <h1>Desktop</h1>;
};
````

### useAssignedRef
```jsx
import { useAssignedRef } from '@51tf/react-common/hooks';

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
import { useDidMount } from '@51tf/react-common/hooks';

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
import { useDidUpdate } from '@51tf/react-common/hooks';

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

import { useMemoObject } from '@51tf/react-common/hooks';

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

import { useCallbackRef } from '@51tf/react-common/hooks';

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
import { ContextProviders } from '@51tf/react-common/components';
import { useMemoObject } from '@51tf/react-common/hooks';
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
