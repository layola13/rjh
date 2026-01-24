import { createContext, Context, Provider, Consumer } from 'react';

/**
 * Context value type for Mentions functionality
 * @remarks
 * This context is used to provide mentions-related data and functionality
 * throughout the component tree.
 */
export type MentionsContextValue = unknown | null;

/**
 * React Context for managing mentions state and functionality
 * @public
 */
declare const MentionsContext: Context<MentionsContextValue>;

/**
 * Provider component for the Mentions context
 * @remarks
 * Wraps components that need access to mentions functionality.
 * Provides mentions-related data and handlers to child components.
 * 
 * @example
 *