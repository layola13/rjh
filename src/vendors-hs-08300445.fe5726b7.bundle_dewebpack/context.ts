import React, { createContext, ReactNode } from 'react';

interface ContextValue {
  [key: string]: unknown;
}

interface ContextProviderProps extends ContextValue {
  children: ReactNode;
}

export const Context = createContext<ContextValue>({});

export default function ContextProvider({ children, ...rest }: ContextProviderProps): React.ReactElement {
  return (
    <Context.Provider value={rest}>
      {children}
    </Context.Provider>
  );
}