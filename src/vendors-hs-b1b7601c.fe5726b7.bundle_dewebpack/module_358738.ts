type InputData = string | number[] | Uint8Array | ArrayLike<number>;

const SHA1_CONSTANTS: readonly number[] = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];

const INITIAL_HASH_VALUES: number[] = [
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
];

const BLOCK_SIZE = 64;
const CHUNK_SIZE = 16;
const EXTENDED_CHUNK_SIZE = 80;
const ROUNDS_PER_STAGE = 20;
const BITS_PER_BYTE = 8;
const BITS_IN_32BIT = 32;
const MAX_UINT32 = 4294967295;
const BYTE_MASK = 255;

/**
 * SHA-1 logical function for different rounds
 */
function sha1LogicalFunction(stage: number, b: number, c: number, d: number): number {
  switch (stage) {
    case 0:
      return (b & c) ^ (~b & d);
    case 1:
    case 3:
      return b ^ c ^ d;
    case 2:
      return (b & c) ^ (b & d) ^ (c & d);
    default:
      return 0;
  }
}

/**
 * Left rotate a 32-bit integer
 */
function rotateLeft(value: number, bits: number): number {
  return (value << bits) | (value >>> (BITS_IN_32BIT - bits));
}

/**
 * SHA-1 hash implementation
 * @param input - String, array of numbers, or array-like object to hash
 * @returns Array of 20 bytes representing the SHA-1 hash
 */
export default function sha1(input: InputData): number[] {
  const constants = [...SHA1_CONSTANTS];
  const hashValues = [...INITIAL_HASH_VALUES];

  let data: number[];

  if (typeof input === "string") {
    const encoded = unescape(encodeURIComponent(input));
    data = [];
    for (let i = 0; i < encoded.length; ++i) {
      data.push(encoded.charCodeAt(i));
    }
  } else if (Array.isArray(input)) {
    data = [...input];
  } else {
    data = Array.prototype.slice.call(input);
  }

  data.push(128);

  const totalLength = data.length / 4 + 2;
  const blockCount = Math.ceil(totalLength / CHUNK_SIZE);
  const blocks: Uint32Array[] = new Array(blockCount);

  for (let blockIndex = 0; blockIndex < blockCount; ++blockIndex) {
    const block = new Uint32Array(CHUNK_SIZE);
    for (let chunkIndex = 0; chunkIndex < CHUNK_SIZE; ++chunkIndex) {
      const offset = BLOCK_SIZE * blockIndex + 4 * chunkIndex;
      block[chunkIndex] =
        (data[offset] << 24) |
        (data[offset + 1] << 16) |
        (data[offset + 2] << 8) |
        data[offset + 3];
    }
    blocks[blockIndex] = block;
  }

  const originalLength = data.length - 1;
  blocks[blockCount - 1][14] = Math.floor((BITS_PER_BYTE * originalLength) / Math.pow(2, BITS_IN_32BIT));
  blocks[blockCount - 1][15] = (BITS_PER_BYTE * originalLength) & MAX_UINT32;

  for (let blockIndex = 0; blockIndex < blockCount; ++blockIndex) {
    const words = new Uint32Array(EXTENDED_CHUNK_SIZE);

    for (let i = 0; i < CHUNK_SIZE; ++i) {
      words[i] = blocks[blockIndex][i];
    }

    for (let i = CHUNK_SIZE; i < EXTENDED_CHUNK_SIZE; ++i) {
      words[i] = rotateLeft(words[i - 3] ^ words[i - 8] ^ words[i - 14] ^ words[i - 16], 1);
    }

    let a = hashValues[0];
    let b = hashValues[1];
    let c = hashValues[2];
    let d = hashValues[3];
    let e = hashValues[4];

    for (let round = 0; round < EXTENDED_CHUNK_SIZE; ++round) {
      const stage = Math.floor(round / ROUNDS_PER_STAGE);
      const temp = (rotateLeft(a, 5) + sha1LogicalFunction(stage, b, c, d) + e + constants[stage] + words[round]) >>> 0;
      e = d;
      d = c;
      c = rotateLeft(b, 30) >>> 0;
      b = a;
      a = temp;
    }

    hashValues[0] = (hashValues[0] + a) >>> 0;
    hashValues[1] = (hashValues[1] + b) >>> 0;
    hashValues[2] = (hashValues[2] + c) >>> 0;
    hashValues[3] = (hashValues[3] + d) >>> 0;
    hashValues[4] = (hashValues[4] + e) >>> 0;
  }

  return [
    (hashValues[0] >> 24) & BYTE_MASK,
    (hashValues[0] >> 16) & BYTE_MASK,
    (hashValues[0] >> 8) & BYTE_MASK,
    hashValues[0] & BYTE_MASK,
    (hashValues[1] >> 24) & BYTE_MASK,
    (hashValues[1] >> 16) & BYTE_MASK,
    (hashValues[1] >> 8) & BYTE_MASK,
    hashValues[1] & BYTE_MASK,
    (hashValues[2] >> 24) & BYTE_MASK,
    (hashValues[2] >> 16) & BYTE_MASK,
    (hashValues[2] >> 8) & BYTE_MASK,
    hashValues[2] & BYTE_MASK,
    (hashValues[3] >> 24) & BYTE_MASK,
    (hashValues[3] >> 16) & BYTE_MASK,
    (hashValues[3] >> 8) & BYTE_MASK,
    hashValues[3] & BYTE_MASK,
    (hashValues[4] >> 24) & BYTE_MASK,
    (hashValues[4] >> 16) & BYTE_MASK,
    (hashValues[4] >> 8) & BYTE_MASK,
    hashValues[4] & BYTE_MASK
  ];
}