import moment from 'moment';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useMeasure } from 'react-use';
import TimelineItem from './TimelineItem';

let PgmTimeline = React.memo(({
  isHeader,
  sinceMidnightMinimum,
  sinceMidnightMaximum,
  pgmList,
  height,
  itemMargin,
  getPgmStyle = pgm => ({}),
  getPgmLabel = pgm => `${pgm._mmStart.format('HH:mm')} ${pgm.pgm_nm}`,
  getPgmTooltip = pgm => (
    <Typography>
      {pgm._mmStart.format('HH:mm')} ~ {pgm._mmEnd.format('HH:mm')}
      <br />
      {pgm.pgm_nm}
      {pgm.item_nm_list.map((program, i) => {
        return (
          <React.Fragment key={i}>
            <br />
            {program.item_nm}
          </React.Fragment>
        )
      })}
    </Typography>
  ),
  
  // if returns a function then that TimelineItem will be clickable (pgm => e => console.log(e))
  // if returns a falsy value (null, undefined) then TimelineItem will not be clickable
  getPgmClickHandler = pgm => null,
}) => {
  let [measureRef, { width: timelineWidth }] = useMeasure();
  if (sinceMidnightMinimum > 0) sinceMidnightMinimum = 0;
  let midnight = moment().startOf('day');
  let totalSec = sinceMidnightMaximum - sinceMidnightMinimum;
  return (
    <div ref={measureRef} style={{ height }} css={`
      width: 100%;
      position: relative;
      overflow: hidden;
    `}>
      {(() => {
        if (isHeader) {
          let renderItem = (hour, i) => {
            let hhmm = midnight.clone().add(hour, 'hour').format('HH:mm');
            let itemLeft = (hour*60*60 - sinceMidnightMinimum) * timelineWidth / totalSec;
            let itemWidth = 1 * 60 * 60 * timelineWidth / totalSec;
            // let itemWidth = 0;
            return (
              <div
                key={i}
                style={{ // use style object for frequently changed styles
                  height,
                  width: itemWidth,
                  left: itemLeft,
                }}
                css={`
                  position: absolute;
                  top: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <div css="position: absolute">
                  {hhmm}
                </div>
              </div>
            );
          };
          let numHoursBeforeMidnight = sinceMidnightMinimum < 0
            ? Math.floor(-sinceMidnightMinimum / (60 * 60))
            : 0;
          let numHoursAfterMidnight = sinceMidnightMaximum > 0
            ? Math.floor(sinceMidnightMaximum / (60 * 60))
            : 0;
          let beforeMidnight = Array(numHoursBeforeMidnight).fill().map((x, i) => -i);
          let afterMidnight = Array(numHoursAfterMidnight).fill().map((x, i) => i);

          return [].concat(beforeMidnight.slice().reverse(), afterMidnight).map(renderItem);
        }
        return pgmList.map((pgm, i) => {
          let pgmWidth = (pgm._endSinceMidnight - pgm._startSinceMidnight) * timelineWidth / totalSec;
          let sinceStart = pgm._startSinceMidnight - sinceMidnightMinimum;
          let pgmLeft = sinceStart * timelineWidth / totalSec;
          return (
            <TimelineItem
              key={i}
              style={getPgmStyle(pgm)}
              height={height}
              width={pgmWidth}
              left={pgmLeft}
              margin={itemMargin}
              label={getPgmLabel(pgm)}
              tooltip={getPgmTooltip(pgm)}
              onClick={getPgmClickHandler(pgm)}
            />
          );
        });
      })()}
    </div>
  );
});

export default PgmTimeline;
