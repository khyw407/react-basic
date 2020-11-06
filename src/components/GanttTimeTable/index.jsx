import React from 'react';
import StickyTable from '../StickyTable';
import PgmTimeline from './PgmTimeline';
import { BORDER_COLOR } from '../../constants';

let GanttTimeTable = React.memo(({
  pgmData,
  itemMargin = 0,
  zoomedIn = false,
  zoomedInWidth = 5000,
  headerHeight = 38,
  rowHeight = 38,
  hideFirstCol,
}) => {
  let noData = !pgmData.length;
  let sinceMidnightMinimum = Math.min(
    ...pgmData.flatMap(
      ({ pgmList }) => pgmList.map(it => it._startSinceMidnight)
    )
  );
  let sinceMidnightMaximum = Math.max(
    ...pgmData.flatMap(
      ({ pgmList }) => pgmList.map(it => it._endSinceMidnight)
    )
  );
  return (
    <StickyTable
      css={`
        .StickyTable-container {
          min-height: auto;
        }
      `}
      colLayout={[
        !hideFirstCol && {
          type: 'static',
          cols: [{ field: 'firstCol', minWidth: 70, colCss: `border-right: 1px solid ${BORDER_COLOR}` }],
        },
        {
          type: 'scrollable',
          cols: [{ field: 'timelineCol', minWidth: zoomedIn ? zoomedInWidth : 100, colCss: `padding: 0` }],
        },
      ].filter(Boolean)}
      headerRows={[{
        firstCol: '구분',
        timelineCol: noData ? null : (
          <PgmTimeline
            isHeader
            sinceMidnightMinimum={sinceMidnightMinimum}
            sinceMidnightMaximum={sinceMidnightMaximum}
            itemMargin={itemMargin}
            height={headerHeight}
          />
        )
      }]}
      rows={pgmData.map(({ period, pgmList, getPgmStyle, getPgmLabel, getPgmTooltip, getPgmClickHandler }) => ({
        firstCol: period,
        timelineCol: (
          <PgmTimeline
            sinceMidnightMinimum={sinceMidnightMinimum}
            sinceMidnightMaximum={sinceMidnightMaximum}
            pgmList={pgmList}
            itemMargin={itemMargin}
            height={rowHeight}
            getPgmStyle={getPgmStyle}
            getPgmLabel={getPgmLabel}
            getPgmTooltip={getPgmTooltip}
            getPgmClickHandler={getPgmClickHandler}
          />
        ),
      }))}
    />
  );
});

export default GanttTimeTable;
