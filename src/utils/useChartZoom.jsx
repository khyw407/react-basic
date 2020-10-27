import React from 'react';
import { ReferenceArea, ReferenceLine } from 'recharts';
import { useCallbackRef } from '../hooks';

let useChartZoom = ({ chartData, xAxisCompareKey, xAxisDataKey, isComposedChart }) => {
  let [refLeft, setRefLeft] = React.useState();
  let [refRight, setRefRight] = React.useState();
  let [currRefLeft, setCurrRefLeft] = React.useState();
  let [currRefRight, setCurrRefRight] = React.useState();
  let isZoomedIn = !!currRefLeft && !!currRefRight;

  let onMouseDown = useCallbackRef(e => setRefLeft(e?.activePayload?.[0]?.payload));
  let onMouseMove = useCallbackRef(e => setRefRight(e?.activePayload?.[0]?.payload));
  let zoomIn = useCallbackRef(() => {
    zoomOut();
    if (refLeft && refRight && refLeft !== refRight) {
      if (refLeft[xAxisCompareKey] > refRight[xAxisCompareKey]) {
        ([refLeft, refRight] = [refRight, refLeft]);
      }
      setCurrRefLeft(refLeft);
      setCurrRefRight(refRight);
    }
  });
  let zoomOut = useCallbackRef(() => {
    setRefLeft();
    setRefRight();
    setCurrRefLeft();
    setCurrRefRight();
  });

  let data = React.useMemo(() => {
    if (!isZoomedIn) return chartData;
    return chartData.filter(item => {
      return item[xAxisCompareKey] >= currRefLeft[xAxisCompareKey]
        && item[xAxisCompareKey] <= currRefRight[xAxisCompareKey];
    });
  }, [currRefLeft, currRefRight, chartData, isZoomedIn, xAxisCompareKey]);

  let chartRender = useCallbackRef(element => {
    let children = element.props.children;
    if (refLeft && refRight) {
      children = children.concat(isComposedChart ? [
        // use ReferenceLine to workaround this bug in recharts ComposedChart
        // https://github.com/recharts/recharts/issues/1505
        <ReferenceLine
          x={refLeft[xAxisDataKey]}
          stroke="#82d305"
          isFront
          strokeWidth={3}
        />,
        <ReferenceLine
          x={refRight[xAxisDataKey]}
          stroke="#82d305"
          isFront
          strokeWidth={3}
        />
      ] : (
        <ReferenceArea
          x1={refLeft[xAxisDataKey]}
          x2={refRight[xAxisDataKey]}
          strokeOpacity={0.3}
        />
      ));
    }
    return React.cloneElement(element, {
      data,
      onMouseDown,
      onMouseMove,
      onMouseUp: zoomIn,
      children,
    });
  });

  return { chartRender, zoomOut, isZoomedIn };
};

export default useChartZoom;
