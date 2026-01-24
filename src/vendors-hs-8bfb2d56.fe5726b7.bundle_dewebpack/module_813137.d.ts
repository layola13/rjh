/**
 * WASM Asset Path Declaration
 * 
 * This module exports the path to the T3dNative WebAssembly binary file.
 * The WASM file is typically used for high-performance 3D rendering or native computations.
 */

/**
 * The file path to the T3dNative WebAssembly module.
 * 
 * This path is resolved relative to the application's public path and points to
 * the compiled WASM binary with its content hash for cache busting.
 * 
 * @remarks
 * The actual file path will be determined at build time based on the webpack
 * public path configuration. The hash (30d6d650) ensures proper cache invalidation
 * when the WASM file content changes.
 * 
 * @example
 *