/**
 * React context for shared state management.
 * This context provides a centralized way to share data across components
 * without prop drilling.
 */

import { createContext, Context } from 'react';

/**
 * The shape of the context value.
 * Currently an empty object, but can be extended to include specific properties.
 * 
 * @example
 * interface AppContextValue {
 *   user?: User;
 *   theme?: Theme;
 *   settings?: Settings;
 * }
 */
export interface AppContextValue {
  [key: string]: unknown;
}

/**
 * Default context instance created with an empty object as initial value.
 * Components can use this context to access and update shared state.
 * 
 * @example
 * import AppContext from './context';
 * 
 * function MyComponent() {
 *   const contextValue = useContext(AppContext);
 *   // Use context value
 * }
 */
declare const AppContext: Context<AppContextValue>;

export default AppContext;