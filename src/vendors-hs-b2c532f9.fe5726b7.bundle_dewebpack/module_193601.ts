/**
 * Generates a UUID v4-like identifier
 * @returns A unique identifier string in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
export function generateUUID(): string {
  return `${generateHexSegment()}${generateHexSegment()}-${generateHexSegment()}-${generateHexSegment()}-${generateHexSegment()}-${generateHexSegment()}${generateHexSegment()}${generateHexSegment()}`;
}

/**
 * Generates a single 4-character hexadecimal segment
 * @returns A 4-character hexadecimal string
 */
function generateHexSegment(): string {
  const RANGE_MULTIPLIER = 65536;
  const BASE_OFFSET = 1;
  const HEX_BASE = 16;
  const SUBSTRING_START = 1;
  
  return Math.floor(RANGE_MULTIPLIER * (BASE_OFFSET + Math.random()))
    .toString(HEX_BASE)
    .substring(SUBSTRING_START);
}