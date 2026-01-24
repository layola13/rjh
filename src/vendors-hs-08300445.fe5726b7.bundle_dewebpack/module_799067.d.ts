/**
 * Custom hook that calculates cumulative left and right offsets for a series of widths.
 * Supports both LTR (left-to-right) and RTL (right-to-left) layouts.
 * 
 * @param widths - Array of width values for each column/item
 * @param count - Total number of items to process
 * @param direction - Layout direction, either "ltr" or "rtl"
 * @returns Object containing arrays of left and right cumulative offsets
 * 
 * @example
 *