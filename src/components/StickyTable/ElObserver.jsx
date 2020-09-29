import { useMeasure } from 'react-use';
import { useCallbackRef } from '../../hooks';
import React from 'react';

let useWHMeasure = () => {
  let [ref, { width: _width, height: _height }] = useMeasure();
  let [width, setWidth] = React.useState(_width);
  let [height, setHeight] = React.useState(_height);

  React.useEffect(() => {
    setWidth(_width);
    setHeight(_height);
  }, [_width, _height]);

  return { ref, width, height };
};

let ElObserver = ({ onResize = () => 0, children: element }) => {
  let { ref, width, height } = useWHMeasure();
  let resizeCallback = useCallbackRef(onResize);

  React.useEffect(() => {
    resizeCallback({ width, height });
  }, [height, width, resizeCallback]);

  return React.cloneElement(element, { ref });
};

export default ElObserver;
