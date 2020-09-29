import React from 'react';
import debounce from 'lodash.debounce';

let useScrollSync = () => {
  let scrollables = React.useRef({});
  let scrollingEl = React.useRef();
  let clearScrollingEl = React.useMemo(
    () => debounce(() => scrollingEl.current = null, 100),
    []
  );
  let userScrolling = React.useCallback(
    el => {
      if (!scrollingEl.current || scrollingEl.current === el) {
        scrollingEl.current = el;
        clearScrollingEl();
        return true;
      }
      return false;
    },
    [clearScrollingEl]
  );
  let createScrollableRef = React.useCallback(
    refId => newRef => {
      if (!newRef || Object.values(scrollables.current).includes(newRef)) return;
      scrollables.current[refId] = newRef;
      newRef.addEventListener('scroll', e => {
        if (!userScrolling(newRef)) return;
        Object.values(scrollables.current).forEach(scrollEl => scrollEl.scrollTop = newRef.scrollTop);
      });
    },
    [userScrolling]
  );

  return { createScrollableRef };
};

export default useScrollSync;
