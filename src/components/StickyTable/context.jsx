import React from 'react';
import ContextProviders from '../../ContextProviders';
import { useCallbackRef } from '../../hooks';

export let CellRefsCtx = React.createContext();
export let ColorsCtx = React.createContext();

export let StickyTableProvider = ({ children, colors = {} }) => {
  let cells = React.useRef([]);

  let getCellRef = useCallbackRef(({ colIndex, rowIndex, colSpan, rowSpan }) => {
    let cell = cells.current.find(it => (
      it.colIndex === colIndex &&
      it.rowIndex === rowIndex &&
      it.colSpan === colSpan &&
      it.rowSpan === rowSpan
    ));
    if (!cell) {
      cell = {
        colIndex,
        rowIndex,
        colSpan,
        rowSpan,
        ref: React.createRef(),
      };
      cells.current.push(cell);
    }
    return cell.ref;
  });

  let getAdjacentCellRef = useCallbackRef((cellRef, pos) => {
    let cell = cells.current.find(it => it.ref.current === cellRef?.current);
    if (!cell) return;
    if (pos === 'BELOW') {
      let belowCell = cells.current.find(it => (
        it.colIndex === cell.colIndex &&
        it.rowIndex === cell.rowIndex + cell.rowSpan
      ));
      return belowCell?.ref;
    }
  });

  return <ContextProviders children={children} providers={[
    { context: CellRefsCtx, memoValues: { getCellRef, getAdjacentCellRef } },
    { context: ColorsCtx, value: colors },
  ]} />
};
