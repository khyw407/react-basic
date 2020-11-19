import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { TextField } from '@material-ui/core';
import { BORDER_COLOR, TEXT_COLOR, SUBTEXT2_COLOR } from '../../constants';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import RemoveIcon from '@material-ui/icons/Remove';

let Separator = () => (
  <div css={`
    display: flex;
    justify-content: center;
  `}>
    <RemoveIcon css={`color: ${SUBTEXT2_COLOR};`} />
  </div>
);

let CustomDateInputField = ({ ...props }) => (
  <TextField
    variant="outlined"
    margin="dense"
    css={`
      background: white;
      .MuiOutlinedInput-notchedOutline {
        border-color: ${BORDER_COLOR};
      }
      .MuiInputBase-input {
        text-align: center;
        font-weight: 500;
        color: ${TEXT_COLOR};
        font-size: 12px;
        padding-top: 0px;
      }
    `}
    {...props}
  />
);

let HourPicker = ({ ...props }) => (
  <KeyboardTimePicker
    TextFieldComponent={CustomDateInputField}
    variant="inline"
    autoOk
    ampm={false}
    views={['hours', 'minutes']}
    format={"HH:mm"}
    {...props}
  />
);

let HourRangePicker = ({ value: period, onChange, fixedPeriod }) => {
  let onHourChange = (newVal, which) => {
    newVal = moment(newVal);
    let [startHour, endHour] = period;
    if (which === 'START') {
      startHour = newVal.clone();
      if (typeof fixedPeriod === 'number') {
        endHour = newVal.clone().add(fixedPeriod, 'hours');
      }
    }
    if (which === 'END') {
      endHour = newVal.clone();
      if (typeof fixedPeriod === 'number') {
        startHour = newVal.clone().subtract(fixedPeriod, 'hours');
      } else {
        if(endHour.diff(startHour) <= 0) {
          startHour = newVal.clone().subtract(fixedPeriod, 'hours');
        }
      }
    }
    onChange([startHour, endHour]);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div css={`
        align-items: center;
      `}>
        <HourPicker
          value={period[0]}
          onChange={val => onHourChange(val, 'START')}
        />
        <Separator />
        <HourPicker
          value={period[1]}
          onChange={val => onHourChange(val, 'END')}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default HourRangePicker;
