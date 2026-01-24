/**
 * Context module for managing shared state across the application.
 * 
 * This module creates and exports a React context with an empty default value.
 * The context can be used to share data between components without prop drilling.
 * 
 * @module ContextProvider
 */

import { createContext, Context } from 'react';

/**
 * Type definition for the context value.
 * Currently defined as an empty object, but should be extended with specific properties
 * based on application requirements.
 * 
 * @example
 * interface AppContextValue {
 *   user?: User;
 *   theme?: Theme;
 *   settings?: Settings;
 * }
 */
interface ContextValue {
  // Extend this interface with actual context properties as needed
}

/**
 * React context instance with an empty default value.
 * 
 * This context provides a way to pass data through the component tree
 * without having to pass props down manually at every level.
 * 
 * @default {}
 * 
 * @example
 * // Provider usage
 * <AppContext.Provider value={{ user, theme }}>
 *   <App />
 * </AppContext.Provider>
 * 
 * @example
 * // Consumer usage
 * const contextValue = useContext(AppContext);
 */
declare const AppContext: Context<ContextValue>;

export default AppContext;