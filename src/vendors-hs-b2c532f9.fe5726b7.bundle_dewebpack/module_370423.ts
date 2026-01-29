const MAX_BITS = 15;

const LENGTH_BASE = new Uint16Array([
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
]);

const LENGTH_EXTRA = new Uint8Array([
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
]);

const DISTANCE_BASE = new Uint16Array([
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0
]);

const DISTANCE_EXTRA = new Uint8Array([
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
]);

interface InflateState {
  bits: number;
}

/**
 * Build Huffman decoding table
 * @param tableType - Type of table (0=literals, 1=lengths, 2=distances)
 * @param codeLengths - Array of code lengths
 * @param codeLengthsOffset - Offset into codeLengths array
 * @param numCodes - Number of codes
 * @param table - Output table
 * @param tableOffset - Offset into output table
 * @param work - Work area
 * @param state - Inflate state object
 * @returns 0 on success, 1 on error, -1 on oversubscribed
 */
export default function buildHuffmanTable(
  tableType: number,
  codeLengths: Uint16Array,
  codeLengthsOffset: number,
  numCodes: number,
  table: Uint32Array,
  tableOffset: number,
  work: Uint16Array,
  state: InflateState
): number {
  const requestedBits = state.bits;

  let tableEntry: number;
  let tableIncrement: number;
  let currentCode: number;
  let minCodeLength: number;
  let tableIndex: number;
  let baseValue: number;
  let bitIndex = 0;
  let codeIndex = 0;
  let firstUnusedCode = 0;
  let maxCodeLength = 0;
  let workingBits = 0;
  let currentBits = 0;
  let drop = 0;
  let left = 0;
  let totalCodes = 0;
  let nextCode = 0;
  let base: Uint16Array | null = null;

  const codeLengthCounts = new Uint16Array(16);
  const nextCodeOffsets = new Uint16Array(16);

  let operationCode: number;
  let extraBits: number;
  let value: number;
  let extra: Uint8Array | null = null;

  for (bitIndex = 0; bitIndex <= MAX_BITS; bitIndex++) {
    codeLengthCounts[bitIndex] = 0;
  }

  for (codeIndex = 0; codeIndex < numCodes; codeIndex++) {
    codeLengthCounts[codeLengths[codeLengthsOffset + codeIndex]]++;
  }

  workingBits = requestedBits;
  for (maxCodeLength = MAX_BITS; maxCodeLength >= 1 && codeLengthCounts[maxCodeLength] === 0; maxCodeLength--);

  if (workingBits > maxCodeLength) {
    workingBits = maxCodeLength;
  }

  if (maxCodeLength === 0) {
    table[tableOffset++] = 20971520;
    table[tableOffset++] = 20971520;
    state.bits = 1;
    return 0;
  }

  for (firstUnusedCode = 1; firstUnusedCode < maxCodeLength && codeLengthCounts[firstUnusedCode] === 0; firstUnusedCode++);

  if (workingBits < firstUnusedCode) {
    workingBits = firstUnusedCode;
  }

  left = 1;
  for (bitIndex = 1; bitIndex <= MAX_BITS; bitIndex++) {
    left <<= 1;
    left -= codeLengthCounts[bitIndex];
    if (left < 0) {
      return -1;
    }
  }

  if (left > 0 && (tableType === 0 || maxCodeLength !== 1)) {
    return -1;
  }

  nextCodeOffsets[1] = 0;
  for (bitIndex = 1; bitIndex < MAX_BITS; bitIndex++) {
    nextCodeOffsets[bitIndex + 1] = nextCodeOffsets[bitIndex] + codeLengthCounts[bitIndex];
  }

  for (codeIndex = 0; codeIndex < numCodes; codeIndex++) {
    if (codeLengths[codeLengthsOffset + codeIndex] !== 0) {
      work[nextCodeOffsets[codeLengths[codeLengthsOffset + codeIndex]]++] = codeIndex;
    }
  }

  if (tableType === 0) {
    base = extra = work;
    baseValue = 20;
  } else if (tableType === 1) {
    base = LENGTH_BASE;
    extra = LENGTH_EXTRA;
    baseValue = 257;
  } else {
    base = DISTANCE_BASE;
    extra = DISTANCE_EXTRA;
    baseValue = 0;
  }

  nextCode = 0;
  codeIndex = 0;
  bitIndex = firstUnusedCode;
  tableIndex = tableOffset;
  currentBits = workingBits;
  drop = 0;
  currentCode = -1;
  totalCodes = 1 << workingBits;
  minCodeLength = totalCodes - 1;

  if (tableType === 1 && totalCodes > 852 || tableType === 2 && totalCodes > 592) {
    return 1;
  }

  for (;;) {
    operationCode = bitIndex - drop;

    if (work[codeIndex] + 1 < baseValue) {
      extraBits = 0;
      value = work[codeIndex];
    } else if (work[codeIndex] >= baseValue) {
      extraBits = extra![work[codeIndex] - baseValue];
      value = base![work[codeIndex] - baseValue];
    } else {
      extraBits = 96;
      value = 0;
    }

    tableEntry = 1 << (bitIndex - drop);
    tableIncrement = 1 << currentBits;
    firstUnusedCode = tableIncrement;

    do {
      tableIncrement -= tableEntry;
      table[tableIndex + (nextCode >> drop) + tableIncrement] = (operationCode << 24) | (extraBits << 16) | value | 0;
    } while (tableIncrement !== 0);

    tableEntry = 1 << (bitIndex - 1);
    while (nextCode & tableEntry) {
      tableEntry >>= 1;
    }

    if (tableEntry !== 0) {
      nextCode &= tableEntry - 1;
      nextCode += tableEntry;
    } else {
      nextCode = 0;
    }

    codeIndex++;
    if (--codeLengthCounts[bitIndex] === 0) {
      if (bitIndex === maxCodeLength) {
        break;
      }
      bitIndex = codeLengths[codeLengthsOffset + work[codeIndex]];
    }

    if (bitIndex > workingBits && (nextCode & minCodeLength) !== currentCode) {
      if (drop === 0) {
        drop = workingBits;
      }

      tableIndex += firstUnusedCode;
      currentBits = bitIndex - drop;
      left = 1 << currentBits;

      while (currentBits + drop < maxCodeLength) {
        left -= codeLengthCounts[currentBits + drop];
        if (left <= 0) {
          break;
        }
        currentBits++;
        left <<= 1;
      }

      totalCodes += 1 << currentBits;

      if (tableType === 1 && totalCodes > 852 || tableType === 2 && totalCodes > 592) {
        return 1;
      }

      currentCode = nextCode & minCodeLength;
      table[currentCode] = (workingBits << 24) | (currentBits << 16) | (tableIndex - tableOffset) | 0;
    }
  }

  if (nextCode !== 0) {
    table[tableIndex + nextCode] = ((bitIndex - drop) << 24) | (64 << 16) | 0;
  }

  state.bits = workingBits;
  return 0;
}