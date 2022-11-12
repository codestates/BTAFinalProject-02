import { createContext, useState } from 'react';

const TOAST_TIME = 100000;
const initialState = {
  text: '',
};

const ToastContext = createContext({
  ...initialState,
  setToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [text, setText] = useState('');

  const setToast = (text) => {
    setText(text);

    setTimeout(() => {
      setText('');
    }, TOAST_TIME);
  };

  return (
    <ToastContext.Provider
      value={{
        text,
        setToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
