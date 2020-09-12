import React from 'react';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../constants';

let rangeColor = '#deecff';

export default React.forwardRef(function StyledWrapper({ ...props }, ref) {
  return (
    <div className="MuiPaper-elevation4" {...props} ref={ref} css={`
      && {
        position: absolute;
        .CalendarMonth {
          border-left: 1px solid transparent;
        }
        .CalendarMonth_table {
          border-collapse: separate;
        }
        .CalendarDay {
          z-index: 1;
          border: 0;
          position: relative;
        }
        .CalendarDay:not(.CalendarDay__highlighted_calendar):not(.CalendarDay__blocked_out_of_range) {
          background: none;
          color: ${TEXT_COLOR};
          &::before {
            border-radius: 50%;
            z-index: -1;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: block;
            padding: 1px;
            background-clip: content-box;
          }
          &:hover {
            color: ${PRIMARY_COLOR};
            &::before {
              content: '';
              background-color: ${rangeColor};
            }
          }
          &.CalendarDay__selected,
          &.CalendarDay__selected:active,
          &.CalendarDay__selected:hover {
            &::before {
              content: '';
              background-color: ${PRIMARY_COLOR};
            }
            color: white;
          }
          &.CalendarDay__selected_start,
          &.CalendarDay__selected_end {
            border-radius: 0;
          }
          &.CalendarDay__selected_start:not(.CalendarDay__selected_end) {
            background: linear-gradient(to right, white 50%, ${rangeColor} 50%);
          }
          &.CalendarDay__selected_end:not(.CalendarDay__selected_start) {
            background: linear-gradient(to left, white 50%, ${rangeColor} 50%);
          }
          &.CalendarDay__selected_span,
          &.CalendarDay__hovered_span,
          &.CalendarDay__hovered_offset {
            border-radius: 0;
            background: ${rangeColor};
          }
          &.CalendarDay__hovered_span:hover {
            background: linear-gradient(to left, white 50%, ${rangeColor} 50%); 
          }
        }
        .DayPickerKeyboardShortcuts_buttonReset {
          display: none;
        }
      }
    `} />
  );
});
