const CRC_TABLE = new Uint32Array((() => {
  const table: number[] = [];
  
  for (let i = 0; i < 256; i++) {
    let crc = i;
    
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1) ? (0xEDB88320 ^ (crc >>> 1)) : (crc >>> 1);
    }
    
    table[i] = crc;
  }
  
  return table;
})());

/**
 * Calculate CRC32 checksum for a buffer slice
 * @param initialCrc - Initial CRC value
 * @param buffer - Input buffer
 * @param length - Number of bytes to process
 * @param offset - Starting offset in buffer
 * @returns Computed CRC32 checksum
 */
export function calculateCRC32(
  initialCrc: number,
  buffer: Uint8Array,
  length: number,
  offset: number
): number {
  const lookupTable = CRC_TABLE;
  const endPosition = offset + length;
  let crc = initialCrc ^ -1;
  
  for (let position = offset; position < endPosition; position++) {
    crc = (crc >>> 8) ^ lookupTable[(crc ^ buffer[position]) & 0xFF];
  }
  
  return crc ^ -1;
}