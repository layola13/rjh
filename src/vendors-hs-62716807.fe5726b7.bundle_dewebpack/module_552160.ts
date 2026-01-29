import React, { createContext, ReactNode } from 'react';

export interface SizeContextValue {
  size?: string | number;
}

export interface SizeContextProviderProps {
  children: ReactNode;
  size?: string | number;
}

const SizeContext = createContext<string | number | undefined>(undefined);

export const SizeContextProvider: React.FC<SizeContextProviderProps> = ({ children, size }) => {
  return (
    <SizeContext.Consumer>
      {(contextValue) => (
        <SizeContext.Provider value={size ?? contextValue}>
          {children}
        </SizeContext.Provider>
      )}
    </SizeContext.Consumer>
  );
};

export default SizeContext;