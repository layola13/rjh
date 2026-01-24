/**
 * Webpack Bundle Index - TypeScript Declarations
 * 
 * This bundle contains multiple modules for DOM manipulation, 
 * WebGL rendering, cryptography, and user interaction handling.
 */

// ============================================================================
// Core Module Re-exports
// ============================================================================

/** Polygon/geometry utilities */
export * from './poly';

/** User interaction and event handling */
export * from './interaction';

/** Legacy WebGL rendering utilities */
export * from './webgl_legacy';

/** Encryption/decryption utilities */
export * from './encryptor';

// ============================================================================
// Module Stubs (requires actual implementation to generate proper types)
// ============================================================================

/**
 * Note: The following modules are referenced but require actual code
 * to generate accurate type declarations:
 * 
 * - DOM Utilities: queryChildren, appendTo, closest, find, filter, matches
 * - Data Management: cache, access, hasData, set, get, val
 * - Events: on, off, one, run
 * - Math/Matrix: matrixAppendRotationInv, rotate180, inv, compute
 * - Crypto: encrypt, decrypt, pad, unpad
 * - Animation/Easing: In, Out, InOut, byDirection
 * - Utilities: init, update, clear, dispose, remove, add, has, is, not
 * - WebGL: getWireframeAttribute
 */