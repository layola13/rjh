import { createContext, createElement, ReactNode, Consumer, Provider } from 'react';

type Size = string | number | undefined;

interface SizeContextProviderProps {
  children: ReactNode;
  size?: Size;
}

const SizeContext = createContext<Size>(undefined);

export const SizeContextProvider = ({ children, size }: SizeContextProviderProps) => {
  return createElement(SizeContext.Consumer, null, (parentSize: Size) => {
    return createElement(SizeContext.Provider, {
      value: size ?? parentSize
    }, children);
  });
};

export default SizeContext;