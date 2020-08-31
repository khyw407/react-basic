import React from 'react';
import { useCallbackRef } from '../../hooks';
import clsx from 'clsx';
import { Snackbar } from '@material-ui/core';
import { Error as ErrorIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import classes from './styles.module.css';

export const NotificationContext = React.createContext();

const SnackbarIcon = ({ variant }) => {
  switch (variant) {
    case 'SUCCESS': return <CheckCircleIcon className={classes.snackbarMessageIcon} />;
    case 'ERROR': return <ErrorIcon className={classes.snackbarMessageIcon} />;
    default: return null;
  }
};

const getSnackbarVariant = variant => {
  switch (variant) {
    case 'SUCCESS': return classes.snackbarSuccess;
    case 'ERROR': return classes.snackbarError;
    default: return;
  }
};

const Notification = ({ children }) => {
  const queueRef = React.useRef([]);
  const [state, setState] = React.useState({
    open: false,
    messageInfo: {},
  });

  const showMessage = useCallbackRef((message, { variant, duration = 6000 } = {}) => {
    queueRef.current.push({
      message,
      variant,
      duration,
      key: Date.now(),
    });

    if (state.open) {
      setState(state => ({ ...state, open: false }));
    } else {
      processQueue();
    }
  });

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setState(state => ({
        ...state,
        messageInfo: queueRef.current.shift(),
        open: true,
      }));
    }
  };

  const handleClose = (event, reason) => {
    setState(state => ({ ...state, open: false }));
  };

  const handleExited = () => processQueue();

  const context = {
    state,
    queueRef,
    showMessage,
    showNotification: showMessage,
    processQueue,
    handleClose,
    handleExited,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
      <Snackbar
        key={state.messageInfo.key}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        ContentProps={{
          classes: {
            root: clsx(getSnackbarVariant(state.messageInfo.variant)),
          }
        }}
        open={state.open}
        autoHideDuration={state.messageInfo.duration}
        onClose={handleClose}
        onExited={handleExited}
        message={(
          <span className={classes.snackbarMessage}>
            <SnackbarIcon variant={state.messageInfo.variant} />
            {state.messageInfo.message}
          </span>
        )}
        action={[]}
      />
    </NotificationContext.Provider>
  );
};

export default Notification;
