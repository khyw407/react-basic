import ClearIcon from '@material-ui/icons/Clear';
import ReactSelect, { components } from 'react-select';
import React from 'react';
import { transparentize } from 'polished';
import { BORDER_COLOR, PRIMARY_COLOR, LIGHT_PRIMARY_COLOR, TEXT_COLOR,
  SUBTEXT_COLOR, SUBTEXT2_COLOR } from '../constants';
import { ReactComponent as CaretDownSvg } from '../media/caret-down.svg';

let ClearIndicator = props => (
  <components.ClearIndicator {...props}>
    <ClearIcon css={`
      font-size: 16px;
    `} />
  </components.ClearIndicator>
);

let DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <CaretDownSvg css={`
      color: #848998;
      transition: transform .3s ease-out;
      .resel__control--menu-is-open & {
        transform: rotate3d(1, 0, 0, 180deg);
      }
    `} />
  </components.DropdownIndicator>
);

let menuZIndex = 10;

let Menu = props => <components.Menu {...props} css={`
  && {
    z-index: ${menuZIndex};
  }
  .resel__option {
    color: ${SUBTEXT_COLOR};
    padding: 6px 12px;
  }
  .resel__option:active {
    background: ${transparentize(.8, PRIMARY_COLOR)};
  }
  .resel__option--is-selected {
    background: transparent;
    color: ${PRIMARY_COLOR};
  }
  .resel__option--is-focused {
    background: ${LIGHT_PRIMARY_COLOR};
  }
`} />;

// https://react-select.com/props
let CustomSelect = ({ isMulti, components, ...props }) => {
  return (
    <ReactSelect
      placeholder=""
      classNamePrefix="resel"
      isSearchable={false}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: PRIMARY_COLOR,
        },
      })}
      isMulti={isMulti}
      components={{
        DropdownIndicator,
        ClearIndicator,
        Menu,
        ...(components || {})
      }}
      css={`
        color: ${TEXT_COLOR};
        font-size: 14px;
        .resel__value-container {
          font-weight: 500;
        }
        .resel__control {
          min-height: 32px;
          border-color: ${BORDER_COLOR};
        }
        /* targets select menu when menuPosition === "fixed" */
        .resel__control.resel__control--menu-is-open + div {
          z-index: ${menuZIndex};
        }
        .resel__indicator-separator {
          display: none;
        }
        .resel__indicator {
          padding: 5px;
        }
        .resel__clear-indicator {
          margin-right: -5px;
          cursor: pointer;
        }
        .resel__placeholder {
          font-weight: normal;
          color: ${SUBTEXT2_COLOR};
        }
        .resel__multi-value {
          background: ${transparentize(.92, PRIMARY_COLOR)};
        }
        ${!isMulti ? `
          .resel__single-value,
          .resel__placeholder {
            position: static;
            transform: none;
            top: auto;
            max-width: none;
          }
          .resel__value-container {
            flex-wrap: nowrap;
          }
        ` : ''}
      `}
      {...props}
    />
  );
};

export default CustomSelect;
