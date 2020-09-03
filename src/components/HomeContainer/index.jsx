import React from 'react';
import StickyTable from '../StickyTable';
import CustomPanel from '../CustomPanel';
import { AddBtn, SaveBtn, DeleteBtn, UndoBtn } from '../ActionButtons';
import { PRIMARY_COLOR } from '../../constants';

let HomeContainer = () => {
  let columns = React.useMemo(() => [
    { title: '선택', field: 'checkbox', minWidth: 50, colCss: `width: 50px` },
    { title: 'column1', field: 'value', minWidth: 60, colCss: 'text-align: left' },
    { title: 'column2', field: 'name', minWidth: 70, colCss: 'text-align: left' },
    { title: 'column3', field: 'test', minWidth: 80, colCss: 'text-align: left' },
  ], []);

  return (
    <div>
      <h1>HomeContainer</h1>
      <h3>Hello!</h3>
      <CustomPanel
        accentColor={PRIMARY_COLOR}
        title="test"
        titleEnd={
          <AddBtn
            disabled={false}
          />
        }
        footer={
          <React.Fragment>
            <DeleteBtn
              disabled={false}
            />
            <UndoBtn
              disabled={false}
            />
            <SaveBtn
              disabled={false}
            />
          </React.Fragment>
        }
      >
        <StickyTable
          columns={columns}
          rows={[]}
        />
      </CustomPanel>
    </div>
  );
};

export default HomeContainer;
