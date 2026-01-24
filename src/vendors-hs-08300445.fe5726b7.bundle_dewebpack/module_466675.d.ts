/**
 * Tree module re-exports
 * 
 * This module serves as the main entry point for tree-related functionality,
 * re-exporting TreeNode and a default export from internal modules.
 * 
 * @module Tree
 */

/**
 * TreeNode class for representing nodes in a tree structure
 * 
 * @remarks
 * This is a named export that provides access to the TreeNode implementation.
 * TreeNode typically contains data and references to child/parent nodes.
 */
export { default as TreeNode } from './TreeNode';

/**
 * Default tree implementation
 * 
 * @remarks
 * This is the primary tree data structure or utility exported by this module.
 * The exact implementation depends on the source module (ID: 836191).
 */
export { default } from './Tree';

/**
 * Type definitions for TreeNode
 * 
 * @remarks
 * Import this type when you need to reference TreeNode in type annotations
 * without importing the actual implementation.
 */
export type { default as TreeNode } from './TreeNode';