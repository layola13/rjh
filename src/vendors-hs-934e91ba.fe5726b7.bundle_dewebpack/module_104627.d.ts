/**
 * Utility function that wraps a formatting operation with a "pre" mode.
 * This module re-exports a specialized version of the core formatting function.
 * 
 * @module FormattingPreWrapper
 */

import { formatWithMode } from './core-formatter';

/**
 * Applies formatting to the input data with "pre" mode enabled.
 * 
 * The "pre" mode typically preserves whitespace and formatting,
 * similar to HTML <pre> tag behavior.
 * 
 * @template T - The type of input data to format
 * @template R - The type of the formatted result
 * 
 * @param data - The data to be formatted
 * @param options - Configuration options for the formatting operation
 * @returns The formatted result with "pre" mode applied
 * 
 * @example
 *