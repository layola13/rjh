/**
 * Module Reference Utilities
 * Provides reference management functionality
 */
declare module 'module_ref' {
  export function ref<T>(value: T): Ref<T>;
  export interface Ref<T> {
    readonly value: T;
  }
}

/**
 * Server-Side Utilities
 * Provides server-side specific functionality
 */
declare module 'module_ss' {
  export function ss(key: string, value?: unknown): unknown;
}

/**
 * Getter Utilities
 * Provides data retrieval functionality
 */
declare module 'module_get' {
  export function get<T = unknown>(path: string, defaultValue?: T): T;
  export function get<T = unknown>(obj: Record<string, unknown>, path: string, defaultValue?: T): T;
}

/**
 * Main Bundle Export
 * Re-exports all utilities from sub-modules
 */
declare module 'bundle' {
  export * from 'module_ref';
  export * from 'module_ss';
  export * from 'module_get';
}