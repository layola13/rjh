/**
 * Apollo Link module providing composable GraphQL request handling chain
 * Original exports: ApolloLink, Observable utilities, request execution
 */

import { Observable } from './observable';
import { InvariantError } from './errors';
import { getOperationName } from './graphql-utils';

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * GraphQL operation context - mutable bag of properties passed through link chain
 */
export interface GraphQLContext {
  [key: string]: unknown;
}

/**
 * GraphQL request operation
 */
export interface GraphQLRequest {
  /** The GraphQL query document */
  query: string | DocumentNode;
  /** Variable values for the operation */
  variables?: Record<string, unknown>;
  /** Optional operation name when document contains multiple operations */
  operationName?: string;
  /** Protocol extensions (e.g. persisted queries) */
  extensions?: Record<string, unknown>;
  /** Contextual metadata for the request chain */
  context?: GraphQLContext;
}

/**
 * Enhanced operation with context management methods
 */
export interface Operation extends GraphQLRequest {
  /** Merge new context into existing context */
  setContext(context: GraphQLContext | ((prevContext: GraphQLContext) => GraphQLContext)): void;
  /** Retrieve immutable copy of current context */
  getContext(): GraphQLContext;
  /** Generate unique cache key for this operation */
  toKey(): string;
}

/**
 * Result of a GraphQL operation execution
 */
export interface GraphQLResponse {
  data?: unknown;
  errors?: ReadonlyArray<GraphQLError>;
  extensions?: Record<string, unknown>;
}

/**
 * GraphQL error object
 */
export interface GraphQLError {
  message: string;
  locations?: ReadonlyArray<{ line: number; column: number }>;
  path?: ReadonlyArray<string | number>;
  extensions?: Record<string, unknown>;
}

/**
 * Document node (parsed GraphQL query)
 */
export interface DocumentNode {
  kind: 'Document';
  definitions: ReadonlyArray<DefinitionNode>;
}

export interface DefinitionNode {
  kind: string;
  [key: string]: unknown;
}

/**
 * Next link handler - receives operation and forwards to next link
 */
export type NextLink = (operation: Operation) => Observable<GraphQLResponse>;

/**
 * Request handler signature - processes operation and optionally forwards
 */
export type RequestHandler = (
  operation: Operation,
  forward?: NextLink
) => Observable<GraphQLResponse> | null;

// ============================================================================
// Error Classes
// ============================================================================

/**
 * Error thrown when Apollo Link encounters invalid configuration or operation
 */
export declare class ApolloLinkError extends Error {
  /**
   * @param message - Error description
   * @param link - The link instance where error occurred
   */
  constructor(message: string, link?: ApolloLink);
  
  /** The link that produced this error */
  readonly link?: ApolloLink;
}

// ============================================================================
// Core Apollo Link Class
// ============================================================================

/**
 * Composable middleware for GraphQL request/response handling.
 * Links form a chain where each can transform, route, or terminate requests.
 * 
 * @example
 *