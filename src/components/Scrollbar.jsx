import React from 'react';
import SimpleBar from 'simplebar-react';
import { PRIMARY_COLOR } from '../constants';

let Scrollbar = ({ hideScrollX, hideScrollY, disableScrollX, scrollableNodeRef, simpleBarRef, ...props }) => {
  return (
    <SimpleBar
      ref={simpleBarRef}
      scrollableNodeProps={{ ref: scrollableNodeRef }}
      autoHide={false}
      css={`
        max-height: 100%;
        & .simplebar-scrollbar:before {
          background: ${PRIMARY_COLOR};
          transition: opacity .2s ease-out;
        }
        & .simplebar-track {
          border-radius: 8px;
          transition: background .2s ease-out;
          pointer-events: auto;
        }
        & .simplebar-track.simplebar-hover,
        &.simplebar-dragging .simplebar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        & .simplebar-track.simplebar-hover .simplebar-scrollbar:before,
        &.simplebar-dragging .simplebar-track .simplebar-scrollbar:before {
          opacity: 1;
        }
        ${disableScrollX ? `
          overflow-x: hidden;
        ` : ''}
        ${hideScrollX ? `
          & .simplebar-track.simplebar-horizontal {
            display: none;
          }
        ` : ''}
        ${hideScrollY ? `
          & .simplebar-track.simplebar-vertical {
            display: none;
          }
        ` : ''}
      `}
      {...props}
    />
  );
};

export default Scrollbar;
