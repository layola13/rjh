import React, { createContext, createElement, ReactNode } from 'react';

type Size = 'small' | 'medium' | 'large' | 'default';

interface SizeContextProviderProps {
  children: ReactNode;
  size?: Size;
}

const SizeContext = createContext<Size>('default');

export const SizeContextProvider: React.FC<SizeContextProviderProps> = ({ children, size }) => {
  return createElement(SizeContext.Consumer, null, (contextSize: Size) => {
    return createElement(SizeContext.Provider, {
      value: size ?? contextSize
    }, children);
  });
};

export default SizeContext;