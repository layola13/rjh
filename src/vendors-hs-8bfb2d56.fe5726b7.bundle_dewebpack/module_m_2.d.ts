/**
 * Sets the system error number (errno) for the current thread.
 * 
 * This function is typically used in WebAssembly/Emscripten contexts to update
 * the errno value in shared memory when an error occurs.
 * 
 * @param errorCode - The error code to set
 * @returns The error code that was set
 * 
 * @remarks
 * - Accesses the errno location via `___errno_location()` function
 * - Writes the error code to shared memory (Int32Array view)
 * - The bitwise right shift by 2 converts byte offset to Int32 index
 * 
 * @example
 *