import validate from './validate';

export default function parse(uuid: string): Uint8Array {
  if (!validate(uuid)) {
    throw new TypeError('Invalid UUID');
  }

  const bytes = new Uint8Array(16);
  let value: number;

  // Parse first segment (8 characters)
  value = parseInt(uuid.slice(0, 8), 16);
  bytes[0] = value >>> 24;
  bytes[1] = (value >>> 16) & 0xff;
  bytes[2] = (value >>> 8) & 0xff;
  bytes[3] = value & 0xff;

  // Parse second segment (4 characters)
  value = parseInt(uuid.slice(9, 13), 16);
  bytes[4] = value >>> 8;
  bytes[5] = value & 0xff;

  // Parse third segment (4 characters)
  value = parseInt(uuid.slice(14, 18), 16);
  bytes[6] = value >>> 8;
  bytes[7] = value & 0xff;

  // Parse fourth segment (4 characters)
  value = parseInt(uuid.slice(19, 23), 16);
  bytes[8] = value >>> 8;
  bytes[9] = value & 0xff;

  // Parse fifth segment (12 characters)
  value = parseInt(uuid.slice(24, 36), 16);
  bytes[10] = (value / 0x10000000000) & 0xff;
  bytes[11] = (value / 0x100000000) & 0xff;
  bytes[12] = (value >>> 24) & 0xff;
  bytes[13] = (value >>> 16) & 0xff;
  bytes[14] = (value >>> 8) & 0xff;
  bytes[15] = value & 0xff;

  return bytes;
}