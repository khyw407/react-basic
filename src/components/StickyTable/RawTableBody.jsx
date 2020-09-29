import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

let RawTableBody = React.memo(({ columns, rows, colInRowMapper, ...props }) => {
  return (
    <TableBody {...props}>
      {rows.map((row, rowIndex, surroundingRows) => {
        return (
          <TableRow key={rowIndex}>
            {columns.map(colInRowMapper({ row, rowIndex, surroundingRows }))}
          </TableRow>
        );
      })}
    </TableBody>
  );
});

export default RawTableBody;
