import debounce from 'lodash.debounce';
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ElObserver from './ElObserver';

let RawTableHead = React.memo(({ columns, headers, colInRowMapper, ...props }) => {
  let [, rerender] = React.useState(Date.now());
  let rowHeights = React.useRef([]);
  let debouncedRerender = React.useMemo(() => {
    return debounce(() => rerender(Date.now()), 100);
  }, []);

  React.useEffect(() => {
    return () => debouncedRerender.cancel();
  }, [debouncedRerender]);

  return (
    <TableHead {...props}>
      {headers.map((row, rowIndex, surroundingRows) => {
        let topOffset = 0;
        if (rowIndex > 0) {
          for (let i = 0; i < rowIndex; i += 1) {
            topOffset += rowHeights.current[i] || 0;
          }
        }
        return (
          <ElObserver key={rowIndex} onResize={({ height }) => {
            rowHeights.current[rowIndex] = height;
            debouncedRerender();
          }}>
            <TableRow>
              {columns.map(colInRowMapper({ row, rowIndex, surroundingRows, topOffset }))}
            </TableRow>
          </ElObserver>
        );
      })}
    </TableHead>
  );
});

export default RawTableHead;
