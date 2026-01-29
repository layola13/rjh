import React from 'react';

export interface ReactReduxContextValue {
  store: any;
  subscription: any;
}

export const ReactReduxContext = React.createContext<ReactReduxContextValue | null>(null);

export default ReactReduxContext;