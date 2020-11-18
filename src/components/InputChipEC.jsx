import React from 'react';
import ChipInput from 'material-ui-chip-input';

let InputChipEC = ({ value=[] }) => {
  return (
    <ChipInput
      newChipKeys={[' ']}
      value={value}
      onAdd={(chip) => value.push(chip)}
      onDelete={( index ) => 
                    value.reduce((acc, cur, idx) => { 
                      if(index !== idx) return acc.push(cur);
                      return acc;
                    }
                )}
    />
  );
};

export default InputChipEC;
