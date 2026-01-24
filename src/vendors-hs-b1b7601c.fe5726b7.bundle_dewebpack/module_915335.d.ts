/**
 * UUID validation regular expression pattern.
 * 
 * Matches valid UUID strings in the following formats:
 * - Standard UUID v1-v8: 8-4-4-4-12 hexadecimal digits with specific version and variant bits
 * - Nil UUID: 00000000-0000-0000-0000-000000000000
 * - Max UUID: ffffffff-ffff-ffff-ffff-ffffffffffff
 * 
 * Pattern breakdown:
 * - Version field (3rd group): 1-8
 * - Variant field (4th group): 8, 9, a, or b (RFC 4122 compliant)
 * - Case-insensitive matching
 * 
 * @example
 *