import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import cssJoin from './cssJoin';

let RawTableHead = React.memo(({ columns, widthCss, ...props }) => {
    let headerRowHeight = 38;
  
    let [headerTopCells, headerMiddleCells, headerBottomCells] = React.useMemo(() => {
      let topCells = [];
      let middleCells = [];
      let bottomCells = [];
      let prevUpperGroupCell, prevGroupCell;
      let headerColRender = val => {
        if (typeof val === 'function') {
          return val();
        }
        return val;
      };
      columns.forEach((col, i) => {
        /**
         * |         upperGroupCell        |
         * |     groupCell     | groupCell |
         * | colCell | colCell |  colCell  |
         */
        let upperGroupCell, groupCell, colCell;
  
        if (col.upperGroupTitle) {
          if (prevUpperGroupCell && prevUpperGroupCell.col.upperGroupTitle === col.upperGroupTitle) {
            prevUpperGroupCell.props.colSpan += 1;
            prevUpperGroupCell.aggrWidth += col.minWidth;
          } else {
            upperGroupCell = { col, props: { colSpan: 1, children: headerColRender(col.upperGroupTitle) }, aggrWidth: col.minWidth };
          }
        }
  
        if (col.groupTitle) {
          if (prevGroupCell && prevGroupCell.col.groupTitle === col.groupTitle) {
            prevGroupCell.props.colSpan += 1;
            prevGroupCell.aggrWidth += col.minWidth;
          } else {
            groupCell = { col, props: { colSpan: 1, children: headerColRender(col.groupTitle) }, aggrWidth: col.minWidth };
          }
        }
  
        colCell = { col, props: { rowSpan: 1, children: headerColRender(col.title) } };
  
        if (col.groupTitle && col.upperGroupTitle) {
          upperGroupCell && topCells.push(upperGroupCell);
          groupCell && middleCells.push(groupCell);
          bottomCells.push(colCell);
        } else if (col.groupTitle && !col.upperGroupTitle) {
          groupCell && topCells.push(groupCell);
          colCell.props.rowSpan = 2;
          middleCells.push(colCell);
        } else {
          colCell.props.rowSpan = 3;
          topCells.push(colCell);
        }
  
        upperGroupCell && (prevUpperGroupCell = upperGroupCell);
        groupCell && (prevGroupCell = groupCell);
      });
      return [topCells, middleCells, bottomCells];
    }, [columns]);
  
    return (
      <TableHead>
        <TableRow>
          {headerTopCells.map((cell, i) => cell && (
            <TableCell
              key={i}
              css={cssJoin(
                widthCss(cell.aggrWidth || cell.col.minWidth),
                cell.col.colCss,
              )}
              {...cell.props}
            />
          ))}
        </TableRow>
        <TableRow>
          {headerMiddleCells.map((cell, i) => cell && (
            <TableCell
              key={i}
              css={cssJoin(
                widthCss(cell.aggrWidth || cell.col.minWidth),
                `top: ${headerRowHeight}px`,
                cell.col.colCss,
              )}
              {...cell.props}
            />
          ))}
        </TableRow>
        <TableRow>
          {headerBottomCells.map((cell, i) => cell && (
            <TableCell
              key={i}
              css={cssJoin(
                widthCss(cell.col.minWidth),
                `top: ${headerRowHeight * 2}px`,
                cell.col.colCss,
              )}
              {...cell.props}
            />
          ))}
        </TableRow>
      </TableHead>
    );
  });
  
  export default RawTableHead;