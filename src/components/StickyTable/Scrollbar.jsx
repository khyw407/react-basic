import simplebarCss from 'simplebar-react/dist/simplebar.min.css';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import SimpleBar from 'simplebar-react';
import { ColorsCtx } from './context';

let SimpleBarStyle = createGlobalStyle`${simplebarCss}`;

let Scrollbar = ({ hideScrollX, hideScrollY, disableScrollX, scrollableNodeRef, simpleBarRef, maxHeight, ...props }) => {
  let colors = React.useContext(ColorsCtx);
  let maxHeightStyle = typeof maxHeight === 'number' ? `max-height: ${maxHeight}px;`
    : typeof maxHeight === 'string' ? `max-height: ${maxHeight};`
    : 'max-height: 100%;';

  return (
    <React.Fragment>
      <SimpleBarStyle />
      <SimpleBar
        ref={simpleBarRef}
        scrollableNodeProps={{ ref: scrollableNodeRef }}
        autoHide={false}
        css={`
          min-width: 0; /* set initial width 0 for when parent's display is flex */
          & .simplebar-scrollbar:before {
            background: ${colors.scrollbar};
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
          ${maxHeightStyle}
        `}
        {...props}
      />
    </React.Fragment>
  );
};

export default Scrollbar;
