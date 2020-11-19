import React from 'react';
import ChipInput from 'material-ui-chip-input';
import { useCallbackRef } from '../../hooks';

let InputChipEC = ({ value, onAdd: _onAdd, onDelete: _onDelete }) => {
  let onAdd = useCallbackRef((newVal) => {
    _onAdd(newVal);
    value.push(newVal);
  });

  let onDelete = useCallbackRef((deletedVal) => {
    _onDelete(deletedVal);
    value.reduce((acc, cur) => {
      if(cur !== deletedVal) acc.push(cur);
      return acc;
    }, []);
  });

  return (
    <ChipInput
      newChipKeys={[' ']}
      disableUnderline={true}
      value={value}
      onAdd={onAdd}
      onDelete={onDelete}
    />
  );
};

export default InputChipEC;
