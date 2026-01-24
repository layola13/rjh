/**
 * Checks if the current runtime environment is Deno.
 * 
 * Detects Deno by verifying:
 * - The global `Deno` object exists and is an object type
 * - The `Deno.version` property exists and is an object type
 * 
 * @returns {boolean} `true` if running in Deno environment, `false` otherwise
 * 
 * @example
 *