/**
 * Interop helper for importing CommonJS modules into ES modules.
 * Ensures consistent access pattern for both CommonJS and ES modules.
 * 
 * @remarks
 * This utility handles the interoperability between CommonJS and ES module systems.
 * When importing a CommonJS module into an ES module context, this ensures that
 * the default export is properly wrapped if not already an ES module.
 * 
 * @example
 *