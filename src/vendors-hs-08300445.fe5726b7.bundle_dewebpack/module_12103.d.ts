/**
 * React context for shared state management.
 * This context provides a nullable value that can be consumed by child components.
 * 
 * @module SharedContext
 */

import { Context, createContext } from 'react';

/**
 * A React Context instance initialized with null as the default value.
 * Components can use this context to share state across the component tree
 * without explicitly passing props through every level.
 * 
 * @type {Context<null>}
 * @default null
 */
declare const context: Context<null>;

export default context;