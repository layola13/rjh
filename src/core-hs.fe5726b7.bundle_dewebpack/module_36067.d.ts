/**
 * Error cause installer utility
 * 
 * Conditionally adds a 'cause' property to an error object if the options object
 * contains a 'cause' property. This is used to support the Error Cause proposal
 * (TC39) for chaining errors with causal information.
 * 
 * @module error-cause-installer
 * 
 * @example
 *