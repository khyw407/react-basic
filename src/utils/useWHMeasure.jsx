import React from 'react';
import { useMeasure } from 'react-use';

let useWHMeasure = () => {
  let [measureRef, { height: _height, width: _width }] = useMeasure();
  let [height, setHeight] = React.useState(_height);
  let [width, setWidth] = React.useState(_width);

  React.useEffect(() => {
    setHeight(_height);
  }, [_height]);
  React.useEffect(() => {
    setWidth(_width);
  }, [_width]);

  return { measureRef, height, width };
};

export default useWHMeasure;
