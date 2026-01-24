/**
 * Type definitions for webpack bundled modules
 * This file provides TypeScript type declarations for the bundled JavaScript modules
 */

// ============================================================================
// Core Module Exports
// ============================================================================

/**
 * MultiDrag module - likely provides drag-and-drop functionality for multiple items
 * Re-exported from './multidrag'
 */
export * from './multidrag';

/**
 * Core module C exports
 * Re-exported from './c'
 */
export * from './c';

// ============================================================================
// Module Type Declarations
// ============================================================================

/**
 * Module registry containing all bundled modules
 * Each key represents a module ID, and the value is the module's exported content
 */
declare global {
  interface WebpackModuleRegistry {
    'f6fd': unknown;
    '1': unknown;
    '35e1': unknown;
    '0': unknown;
    'b76a': unknown; // c.js
    '626a': unknown;
    '84f2': unknown;
    '9b43': unknown;
    'ac6a': unknown;
    'c8ba': unknown;
    'd53b': unknown;
    'fa5b': unknown;
    '0d58': unknown;
    '6a99': unknown;
    '214f': unknown;
    'fn': unknown;
    '5ca1': unknown;
    '4588': unknown;
    'fb15': unknown;
    '6821': unknown;
    'c649': unknown; // c.js
    '7987': unknown;
    '32e9': unknown;
    'a352': unknown;
    'c921': unknown;
    '697e': unknown;
    '6762': unknown;
    '2b4c': unknown;
    '5537': unknown;
    '2aba': unknown;
    '26f94': unknown;
    '5307': unknown;
    'c366': unknown;
    'ce10': unknown;
    '9e1e': unknown;
    '7333': unknown;
    '2fdb': unknown;
    'cb7c': unknown;
    'fab2': unknown;
    '31a5': unknown;
    '613b': unknown;
    '230e': unknown;
    '7f20': unknown;
    'aae3': unknown;
    'a481': unknown;
    '1a4f': unknown;
    'f751': unknown;
    '4bf8': unknown;
    '5f1b': unknown;
    '9def': unknown;
    '2aeb': unknown;
    'c69a': unknown;
    'ca5a': unknown;
    'cadf': unknown;
    'ed29': unknown;
    '01f9': unknown;
    '9c6c': unknown;
    'b0c5': unknown;
    '0390': unknown;
    '5147': unknown;
    '4630': unknown;
    '6fd1': unknown;
    '5eda': unknown;
    '2621': unknown;
    '02f4': unknown;
    '1495': unknown;
    '86cc': unknown;
    '2d00': unknown;
    '8378': unknown;
    '9d99': unknown;
    '38fd': unknown;
    '0bfb': unknown;
    '7726': unknown;
    'd3f4': unknown;
    'd8e8': unknown;
    'f559': unknown;
    'get': unknown;
    '52a7': unknown;
    '69a8': unknown;
    '23c6': unknown;
    '2d95': unknown;
    'd2c8': unknown;
    'b4c0': unknown;
    '520a': unknown;
    'aa47': unknown; // multidrag.js
    '77f1': unknown;
    '79e5': unknown;
    'be13': unknown;
    'e11e': unknown;
    'a19f': unknown;
    '456d': unknown;
    '41a0': unknown;
  }
}

export {};