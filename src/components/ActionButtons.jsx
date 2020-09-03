import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import { ReactComponent as AddBtnSvg } from '../media/add-btn.svg';
import { ReactComponent as DeleteBtnSvg } from '../media/delete-btn.svg';
import { ReactComponent as SaveBtnSvg } from '../media/save-btn.svg';

let Btn = ({ ...props }) => (
  <Button
    css={`
      margin: 0 4px;
      .MuiButton-startIcon {
        margin-right: 4px;
        & > svg:not(.MuiSvgIcon-root) {
          margin: -5px;
          path {
            fill: currentColor;
          }
        }
      }
    `}
    {...props}
  />
);

export let DeleteBtn = ({ ...props }) => (
  <Btn
    children="삭제"
    startIcon={<DeleteBtnSvg />}
    {...props}
  />
);

export let AddBtn = ({ ...props }) => (
  <Btn
    children="추가"
    startIcon={<AddBtnSvg />}
    {...props}
  />
);

export let SaveBtn = ({ saving, ...props }) => (
  <Btn
    children="저장"
    startIcon={saving ? <CircularProgress size={16} /> : <SaveBtnSvg />}
    {...props}
  />
);

export let UndoBtn = ({ ...props }) => (
  <Btn
    children="취소"
    startIcon={<UndoIcon />}
    {...props}
  />
);
