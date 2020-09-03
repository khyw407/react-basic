import { useMeasure } from 'react-use';
import React from 'react';
import clsx from 'clsx';
import Scrollbar from '../Scrollbar';
import { BORDER_COLOR } from '../../constants';
import RawTable from './RawTable';
import useScrollSync from './useScrollSync';
import { StickyTableProvider } from './context';

export default React.memo(function StickyTable({
  columns: _columns,
  rows,
  colLayout, // [{ type: 'static', cols: [] }, { type: 'scrollable', cols: [] }]
  className,
  ...props
 }) {
  let columns = React.useMemo(() => {
    // if `colLayout` prop is specified then ignore `columns` prop;
    let cols = colLayout ? colLayout.flatMap(layout => layout.cols) : _columns;
    cols = cols.map(col => ({
      ...col,
      minWidth: col.minWidth ?? 100,
      colCss: col.colCss ?? col._colCss,
    }));
    return cols;
  }, [colLayout, _columns]);
  let calcWidth = React.useCallback(
    cols => cols.reduce((sum, col) => sum + col.minWidth, 0),
    [],
  );
  let allColsWidth = React.useMemo(
    () => calcWidth(columns),
    [columns, calcWidth],
  );
  let [measureRef, { width: tableContainerWidth }] = useMeasure();
  let { createScrollableRef } = useScrollSync();

  return (
    <StickyTableProvider>
      <div className={clsx('StickyTable-root', className)} css="min-height: 0" {...props}>
        <div className="StickyTable-measureDiv" ref={measureRef} />
        <div className="StickyTable-container" css={`
          flex: 1;
          height: 100%;
          width: 100%;
          display: flex;
          min-height: 150px;
          position: relative;
          border: 1px solid ${BORDER_COLOR};
        `}>
          {(() => {
            if (!colLayout || allColsWidth <= tableContainerWidth) return (
              <Scrollbar css="flex: 1">
                <RawTable columns={columns} rows={rows} autoLayout />
              </Scrollbar>
            );

            return colLayout.map((colGroup, colGroupIndex) => {
              let colGroupWidth = calcWidth(colGroup.cols);
              let concatCols = (_cols, _colGroup) => _cols.concat(_colGroup.cols);
              let prevCols = colLayout.slice(0, colGroupIndex).reduce(concatCols, []);
              let nextCols = colLayout.slice(colGroupIndex + 1).reduce(concatCols, []);
              let prevColsWidth = calcWidth(prevCols);
              let nextColsWidth = calcWidth(nextCols);
              // move prevCols and nextCols to the left side to hide using negative margin-left (showing only colGroup.cols);
              let adjustedCols = [...prevCols, ...nextCols, ...colGroup.cols];
              // -1px margin left to hide left border
              let negativeMarginLeft = - prevColsWidth - nextColsWidth - (colGroupIndex > 0 ? 1 : 0);
              let hideScrollY = colGroupIndex < colLayout.length - 1;
              let commonProps = {
                key: colGroupIndex,
                scrollableNodeRef: createScrollableRef(colGroupIndex),
                hideScrollY,
                children: (
                  <RawTable columns={adjustedCols} rows={rows} css={`
                    margin-left: ${negativeMarginLeft}px;
                  `} />
                ),
              };
              let commonCss = `
                ${clsx(colGroupIndex > 0 && `
                  box-shadow: -1px 0 0 0 ${BORDER_COLOR};
                `)}
              `;
              
              if (colGroup.type === 'scrollable') return (
                <Scrollbar
                  {...commonProps}
                  css={`
                    ${commonCss}
                    flex: 1;
                    max-width: ${colGroupWidth}px;
                  `}
                />
              );

              return ( // type === 'static'
                <Scrollbar
                  {...commonProps}
                  css={`
                    ${commonCss}
                    flex-shrink: 0;
                    width: ${colGroupWidth}px;
                  `}
                />
              );
            });
          })()}
        </div>
      </div>
    </StickyTableProvider>
  );
});
