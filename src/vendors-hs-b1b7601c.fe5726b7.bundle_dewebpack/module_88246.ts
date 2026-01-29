const BYTE_TO_HEX: string[] = [];

for (let i = 0; i < 256; ++i) {
  BYTE_TO_HEX.push((i + 256).toString(16).substr(1));
}

function isValidUUID(uuid: string): boolean {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(uuid);
}

/**
 * Converts a byte array to a UUID string
 * @param byteArray - Array of bytes representing the UUID
 * @param offset - Starting offset in the byte array (default: 0)
 * @returns UUID string in standard format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
 * @throws TypeError if the resulting UUID string is invalid
 */
export default function bytesToUUID(byteArray: Uint8Array | number[], offset: number = 0): string {
  const uuid = (
    BYTE_TO_HEX[byteArray[offset + 0]] +
    BYTE_TO_HEX[byteArray[offset + 1]] +
    BYTE_TO_HEX[byteArray[offset + 2]] +
    BYTE_TO_HEX[byteArray[offset + 3]] +
    "-" +
    BYTE_TO_HEX[byteArray[offset + 4]] +
    BYTE_TO_HEX[byteArray[offset + 5]] +
    "-" +
    BYTE_TO_HEX[byteArray[offset + 6]] +
    BYTE_TO_HEX[byteArray[offset + 7]] +
    "-" +
    BYTE_TO_HEX[byteArray[offset + 8]] +
    BYTE_TO_HEX[byteArray[offset + 9]] +
    "-" +
    BYTE_TO_HEX[byteArray[offset + 10]] +
    BYTE_TO_HEX[byteArray[offset + 11]] +
    BYTE_TO_HEX[byteArray[offset + 12]] +
    BYTE_TO_HEX[byteArray[offset + 13]] +
    BYTE_TO_HEX[byteArray[offset + 14]] +
    BYTE_TO_HEX[byteArray[offset + 15]]
  ).toLowerCase();

  if (!isValidUUID(uuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }

  return uuid;
}