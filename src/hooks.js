import React from 'react';

export let useAsync = (asyncFunc, initialResult) => {
    let initalState = {
        pending: false,
        error: null,
        result: initialResult,
    };
    let [state, setState] = React.useState(initalState);
    let callCountRef = React.useRef(0);
    let callbackRef = React.useRef((err, res) => 0);
    let promiseRef = React.useRef();
    let _ref = React.useRef({});
    Object.assign(_ref.current, { initialResult, asyncFunc });

    let execAsyncFunc = React.useCallback((...args) => new Promise((resolve, reject) => {
        callCountRef.current += 1;
        callbackRef.current = (err, res) => err !== undefined ? reject(err) : resolve(res);
        setState(state => ({
            ...state,
            pending: true,
        }));
        let promise = (async () => {
            let error;
            let result = _ref.current.initialResult;
            try {
                result = await _ref.current.asyncFunc(...args);
            } catch (err) {
                console.warn('react-common/useAsync call error:', err);
                error = err;
            }
            if (promise === promiseRef.current) {
                setState({
                    pending: false,
                    error,
                    result,
                });
                callbackRef.current(error, result);
            }
        })();
        promiseRef.current = promise;
    }), []);

    React.useEffect(() => () => {
        promiseRef.current = null;
    }, []);

    React.useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.warn('useAsync is deprecated, please use usePromise instead!');
        }
    }, []);

    return [{ ...state, callCount: callCountRef.current }, execAsyncFunc];
};

export let useCallbackRef = func => {
    let funcRef = React.useRef();
    funcRef.current = func;

    return React.useCallback(
        (...args) => funcRef.current(...args),
        [],
    );
};

export let useDidMount = func => {
    let cleanupRef = React.useRef();
    React.useEffect(() => {
        cleanupRef.current = func();
        return () => {
            let cleanupFunc = cleanupRef.current;
            if (typeof cleanupFunc === 'function') cleanupFunc();
        };
    }, []); // eslint-disable-line
};

export let useDidUpdate = (func, deps) => {
    let didMountRef = React.useRef(false);
    let cleanupRef = React.useRef();

    React.useEffect(() => {
        if (didMountRef.current) {
            cleanupRef.current = func();
        }
        didMountRef.current = true;
        return () => {
            let cleanupFunc = cleanupRef.current;
            if (typeof cleanupFunc === 'function') cleanupFunc();
        };
    }, deps); // eslint-disable-line
};

export let usePromise = (
    asyncFunc,
    initialState = {},
) => {
    let unmounted = React.useRef(false);
    let [state, _dispatch] = React.useReducer((state, [action, payload]) => {
        switch (action) {
            case 'START_CALL': return {
                ...state,
                loading: true,
                callCount: state.callCount + 1,
            };
            case 'CALL_ERROR': return {
                ...state,
                loading: false,
                error: payload,
            };
            case 'CALL_SUCCESS': return {
                ...state,
                loading: false,
                error: null,
                value: payload,
            };
            default: throw new Error();
        }
    }, {
        value: null,
        loading: false,
        error: null,
        callCount: 0,
        ...initialState
    });
    let dispatch = React.useCallback((...args) => {
        if (unmounted.current) return;
        _dispatch(...args);
    }, []);
    let promiseRef = React.useRef();
    let asyncFuncRef = React.useRef();
    asyncFuncRef.current = asyncFunc;

    let execAsyncFunc = React.useCallback((...args) => new Promise(resolve => {
        dispatch(['START_CALL']);
        let promise = (async () => {
            let error;
            let value;
            try {
                value = await asyncFuncRef.current(...args);
            } catch (err) {
                error = err;
            }

            let isLatestCall = promise === promiseRef.current;
            if (error !== undefined) {
                isLatestCall && dispatch(['CALL_ERROR', error]);
                console.warn('react-common/usePromise call error:', error);

                let res = [undefined, error];
                res.error = error;
                resolve(res);
            } else {
                isLatestCall && dispatch(['CALL_SUCCESS', value]);

                let res = [value, undefined];
                res.value = value;
                resolve(res);
            }
        })();
        promiseRef.current = promise;
    }), [dispatch]);

    React.useEffect(
        () => () => unmounted.current = true,
        []
    );

    return [state, execAsyncFunc];
};

