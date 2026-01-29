import validateUUID from './validate';

/**
 * Converts a UUID string to a Uint8Array of bytes
 * @param uuid - The UUID string to parse (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
 * @returns A Uint8Array containing the 16 bytes of the UUID
 * @throws TypeError if the UUID is invalid
 */
export default function parseUUID(uuid: string): Uint8Array {
  if (!validateUUID(uuid)) {
    throw new TypeError("Invalid UUID");
  }

  const bytes = new Uint8Array(16);
  let parsedValue: number;

  // Parse first segment (8 hex chars)
  parsedValue = parseInt(uuid.slice(0, 8), 16);
  bytes[0] = parsedValue >>> 24;
  bytes[1] = (parsedValue >>> 16) & 255;
  bytes[2] = (parsedValue >>> 8) & 255;
  bytes[3] = parsedValue & 255;

  // Parse second segment (4 hex chars)
  parsedValue = parseInt(uuid.slice(9, 13), 16);
  bytes[4] = parsedValue >>> 8;
  bytes[5] = parsedValue & 255;

  // Parse third segment (4 hex chars)
  parsedValue = parseInt(uuid.slice(14, 18), 16);
  bytes[6] = parsedValue >>> 8;
  bytes[7] = parsedValue & 255;

  // Parse fourth segment (4 hex chars)
  parsedValue = parseInt(uuid.slice(19, 23), 16);
  bytes[8] = parsedValue >>> 8;
  bytes[9] = parsedValue & 255;

  // Parse fifth segment (12 hex chars)
  parsedValue = parseInt(uuid.slice(24, 36), 16);
  bytes[10] = (parsedValue / 1099511627776) & 255;
  bytes[11] = (parsedValue / 4294967296) & 255;
  bytes[12] = (parsedValue >>> 24) & 255;
  bytes[13] = (parsedValue >>> 16) & 255;
  bytes[14] = (parsedValue >>> 8) & 255;
  bytes[15] = parsedValue & 255;

  return bytes;
}