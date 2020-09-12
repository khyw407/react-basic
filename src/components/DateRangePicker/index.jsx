import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import { Fade, Popper, Typography } from '@material-ui/core';
import TextInput from './TextInput';
import StyledWrapper from './StyledWrapper';
import NextPrevIcon from './NextPrevIcon';

let DateRangePicker = ({
  dateRange = [null, null],
  onChange = ([startDate, endDate]) => 0,
  disabled,
  minDate='2020-01-01', // YYYY-MM-DD
  maxDate=moment().subtract(1, 'days').format('YYYY-MM-DD'), // YYYY-MM-DD
  numberOfMonths = 2,
  startDateOffset,
  endDateOffset,
  ...props
}) => {
  let [showPicker, setShowPicker] = React.useState(false);
  let [focusedInput, setFocusedInput] = React.useState(null);
  let anchorEl = React.useRef();

  let [startDate, endDate] = dateRange;

  let onFocusChange = val => {
    if (!val) setShowPicker(false);
    setFocusedInput(val);
  };

  let onDatesChange = ({ startDate, endDate }) => {
    onChange([startDate, endDate]);
  };

  let openPicker = (focused = START_DATE) => {
    setFocusedInput(focused);
    setShowPicker(true);
  };

  let closePicker = () => {
    setShowPicker(false);
    setFocusedInput(null);
    let [startDate, endDate] = dateRange;
    if (startDate && !endDate) {
      onChange([startDate, startDate]);
    }
  };

  let isOutsideRange = React.useMemo(() => {
    let mMinDate = moment(minDate, 'YYYY-MM-DD');
    let mMaxDate = moment(maxDate, 'YYYY-MM-DD');
    if (mMinDate.isValid() && mMaxDate.isValid()) {
      return date => date.isBefore(mMinDate, 'day') || date.isAfter(mMaxDate, 'day');
    }
    if (mMinDate.isValid()) {
      return date => date.isBefore(mMinDate, 'day');
    }
    if (mMaxDate.isValid()) {
      return date => date.isAfter(mMaxDate, 'day');
    }
    return;
  }, [minDate, maxDate]);

  let Text = React.useCallback(
    ({ muiFocused, ...props }) => (
      <TextInput
        margin="none"
        InputProps={{
          readOnly: true,
          className: clsx(muiFocused && 'Mui-focused'),
        }}
        disabled={disabled}
        css="width: 100px"
        {...props}
      />
    ),
    [disabled]
  );

  return (
    <div {...props}>
      <div ref={anchorEl} css="display: flex; align-items: center;">
        <Text
          muiFocused={focusedInput === START_DATE}
          onFocus={e => openPicker(START_DATE)}
          onClick={e => openPicker(START_DATE)}
          value={startDate ? startDate.format('YYYY-MM-DD') : ''}
        />
        <Typography css="padding: 0 6px 4px" color="textSecondary"><b>‒</b></Typography>
        <Text
          muiFocused={focusedInput === END_DATE}
          onFocus={e => openPicker(END_DATE)}
          onClick={e => openPicker(END_DATE)}
          value={endDate ? endDate.format('YYYY-MM-DD') : ''}
        />
      </div>
      <Popper
        css="z-index: 1300"
        open={showPicker}
        anchorEl={anchorEl.current}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <StyledWrapper>
              <DayPickerRangeController
                onOutsideClick={closePicker}
                minimumNights={0}
                startDate={startDate}
                endDate={endDate}
                onDatesChange={onDatesChange}
                navNext={<NextPrevIcon next />}
                navPrev={<NextPrevIcon prev />}
                focusedInput={focusedInput}
                onFocusChange={onFocusChange}
                numberOfMonths={numberOfMonths}
                monthFormat="YYYY년 M월"
                isOutsideRange={isOutsideRange}
                startDateOffset={startDateOffset}
                endDateOffset={endDateOffset}
              />
            </StyledWrapper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default DateRangePicker;
