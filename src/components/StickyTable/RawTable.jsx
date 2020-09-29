import mergeRefs from 'react-merge-refs';
import styled from 'styled-components';
import memoizee from 'memoizee';
import kindOf from 'kind-of';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import RawTableHead from './RawTableHead';
import RawTableBody from './RawTableBody';
import cssJoin from './cssJoin';
import { CellRefsCtx, ColorsCtx } from './context';
import { useCallbackRef } from '../../hooks';
import clsx from 'clsx';

let RawTable = React.memo(({ headerRows, columns, rows, autoLayout, className, ...props }) => {
  let colors = React.useContext(ColorsCtx);
  let headers = React.useMemo(() => {
    if (headerRows?.length > 0) return headerRows;

    let row = {};
    columns.forEach(col => {
      row[col.field] = col.title === undefined ? col.field : col.title;
    });
    return [row];
  }, [headerRows, columns]);
  let { getCellRef } = React.useContext(CellRefsCtx);
  let styleComp = React.useMemo(
    () => memoizee(
      (Comp, css) => styled(Comp)`${css || ''}`
    ),
    [],
  );

  React.useEffect(() => {
    return () => styleComp.clear();
  }, [styleComp]);

  let calcRowColSpan = useCallbackRef((currentRow, field, surroundingRows) => {
    let val = currentRow[field];
    if (kindOf(val) !== 'function' && !React.isValidElement(val) && kindOf(val) !== 'object') return 1;
    
    let currentRowIndex = surroundingRows.findIndex(row => row === currentRow);
    let verticalOccurrences = []; // indexes of nearby cells in same column with same identity (vertical)
    surroundingRows.forEach((row, rowIndex) => {
      if (row[field] !== val) return;
      if (verticalOccurrences.length === 0) return verticalOccurrences.push(rowIndex);
      let lastOccurrenceIndex = verticalOccurrences.slice().pop();
      if (rowIndex - 1 === lastOccurrenceIndex) verticalOccurrences.push(rowIndex);
    });
    let rowSpan = verticalOccurrences.indexOf(currentRowIndex) === 0 ? verticalOccurrences.length : 0;

    let currentColIndex = columns.findIndex(col => col.field === field);
    let horizontalOccurrences = []; // indexes of nearby cells in same row with same identity (horizontal)
    columns.forEach((col, colIndex) => {
      if (currentRow[col.field] !== val) return;
      if (horizontalOccurrences.length === 0) return horizontalOccurrences.push(colIndex);
      let lastOccurrenceIndex = horizontalOccurrences.slice().pop();
      if (colIndex - 1 === lastOccurrenceIndex) horizontalOccurrences.push(colIndex);
    });
    let colSpan = horizontalOccurrences.indexOf(currentColIndex) === 0 ? horizontalOccurrences.length : 0;

    return { rowSpan, colSpan };
  });

  let colInRowMapper = useCallbackRef(({ row, rowIndex, surroundingRows, topOffset }) => (col, colIndex) => {
    let { rowSpan, colSpan } = calcRowColSpan(row, col.field, surroundingRows);
    if (rowSpan === 0 || colSpan === 0) return null;
    let _cellRef = getCellRef({ colIndex, rowIndex, colSpan, rowSpan });
    let cellVal = row[col.field];
    let commonProps = {
      key: colIndex,
      rowSpan,
      colSpan,
    };
    let commonCss = cssJoin(
      widthCss(col.minWidth),
      `top: ${topOffset || 0}px`,
      // isHeader && rowIndex > 0 && `top: ${38 * rowIndex}px`,
      col.colCss,
      row._rowCss,
    );
    if (kindOf(cellVal) === 'function') {
      // deprecated due to poor performance (create new components on new update -> unnecessary re-mounts)
      let ColCell = ({ cellRef, ...props }) => <TableCell
        {...commonProps}
        css={commonCss}
        ref={mergeRefs([_cellRef, cellRef])}
        {...props}
      />;
      return (
        <React.Fragment key={colIndex}>
          {cellVal(ColCell)}
        </React.Fragment>
      );
    }
    // if cellVal is plain JS object
    if (kindOf(cellVal) === 'object' && !React.isValidElement(cellVal)) {
      let { props, ref, value, component: Cell = TableCell } = cellVal;
      let StyledCell = styleComp(Cell, commonCss);
      return <StyledCell
        {...commonProps}
        ref={mergeRefs([_cellRef, ref])}
        children={value}
        {...props}
      />;
    }
    return (
      <TableCell
        {...commonProps}
        ref={mergeRefs([_cellRef])}
        css={commonCss}
        children={cellVal}
      />
    );
  });

  let widthCss = useCallbackRef(num => `
    ${autoLayout ? '' : `
      width: ${num}px;
    `}
    min-width: ${num}px;
  `);

  return (
    <Table
      className={clsx('StickyTable-table', className)}
      stickyHeader
      css={`
        table-layout: ${autoLayout ? 'auto' : 'fixed'};
        .MuiTableCell-stickyHeader {
          left: auto;
        }
        .MuiTableCell-root {
          text-align: center;
          padding: 8px 4px;
          word-wrap: break-word;
        }
        .MuiTableCell-head {
          background: white;
          border-bottom-color: white;
          color: rgba(29, 33, 41, 0.6);
          color: ${colors.headerText};
          font-size: 12px;
          font-weight: 500;
        }
        .MuiTableCell-body {
          font-weight: 500;
          font-size: 12px;
          color: ${colors.bodyText};
        }
        thead .MuiTableCell-head[rowspan],
        thead tr:last-child .MuiTableCell-head {
          border-bottom-color: ${colors.border};
        }
      `}
      {...props}
    >
      <RawTableHead
        className={clsx('StickyTable-thead', className)}
        headers={headers}
        columns={columns}
        colInRowMapper={colInRowMapper}
      />
      <RawTableBody
        className={clsx('StickyTable-tbody', className)}
        rows={rows}
        columns={columns}
        colInRowMapper={colInRowMapper}
      />
    </Table>
  );
});

export default RawTable;
