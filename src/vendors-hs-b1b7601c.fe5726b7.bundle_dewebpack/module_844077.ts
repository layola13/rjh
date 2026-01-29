import rngModule from './module_170957';
import { unsafeStringify } from './module_549629';

interface UUIDv7Options {
  random?: Uint8Array;
  rng?: () => Uint8Array;
  msecs?: number;
  seq?: number;
}

const MAX_SEQUENCE = 524287;
const MAX_COUNTER_A = 4095;
const MAX_SEQ_INPUT = 2147483647;
const TIMESTAMP_OFFSET_MS = 10000;

let cachedClockSequence: number | null = null;
let cachedCounterA: number | null = null;
let lastTimestamp = 0;

export default function uuidv7(
  options?: UUIDv7Options,
  buffer?: Uint8Array,
  offset?: number
): string | Uint8Array {
  options = options || {};

  const bufferOffset = buffer && offset || 0;
  const resultBuffer = buffer || new Uint8Array(16);

  const randomBytes = options.random || (options.rng || rngModule.default)();
  const timestamp = options.msecs !== undefined ? options.msecs : Date.now();
  const sequenceInput = options.seq !== undefined ? options.seq : null;

  let counterA = cachedCounterA;
  let clockSequence = cachedClockSequence;

  if (timestamp > lastTimestamp && options.msecs === undefined) {
    lastTimestamp = timestamp;
    if (sequenceInput !== null) {
      counterA = null;
      clockSequence = null;
    }
  }

  if (sequenceInput !== null) {
    let normalizedSeq = sequenceInput;
    if (normalizedSeq > MAX_SEQ_INPUT) {
      normalizedSeq = MAX_SEQ_INPUT;
    }
    counterA = (normalizedSeq >>> 19) & MAX_COUNTER_A;
    clockSequence = normalizedSeq & MAX_SEQUENCE;
  }

  if (counterA === null || clockSequence === null) {
    counterA = ((randomBytes[6] & 0x7f) << 8) | randomBytes[7];
    clockSequence = (((randomBytes[8] & 0x3f) << 8 | randomBytes[9]) << 5) | (randomBytes[10] >>> 3);
  }

  if (timestamp + TIMESTAMP_OFFSET_MS > lastTimestamp && sequenceInput === null) {
    clockSequence++;
    if (clockSequence > MAX_SEQUENCE) {
      clockSequence = 0;
      counterA++;
      if (counterA > MAX_COUNTER_A) {
        counterA = 0;
        lastTimestamp++;
      }
    }
  } else {
    lastTimestamp = timestamp;
  }

  cachedCounterA = counterA;
  cachedClockSequence = clockSequence;

  let index = bufferOffset;
  const timestampValue = lastTimestamp;

  resultBuffer[index++] = (timestampValue / 0x10000000000) & 0xff;
  resultBuffer[index++] = (timestampValue / 0x100000000) & 0xff;
  resultBuffer[index++] = (timestampValue / 0x1000000) & 0xff;
  resultBuffer[index++] = (timestampValue / 0x10000) & 0xff;
  resultBuffer[index++] = (timestampValue / 0x100) & 0xff;
  resultBuffer[index++] = timestampValue & 0xff;
  resultBuffer[index++] = ((counterA >>> 4) & 0x0f) | 0x70;
  resultBuffer[index++] = counterA & 0xff;
  resultBuffer[index++] = ((clockSequence >>> 13) & 0x3f) | 0x80;
  resultBuffer[index++] = (clockSequence >>> 5) & 0xff;
  resultBuffer[index++] = ((clockSequence << 3) & 0xff) | (randomBytes[10] & 0x07);
  resultBuffer[index++] = randomBytes[11];
  resultBuffer[index++] = randomBytes[12];
  resultBuffer[index++] = randomBytes[13];
  resultBuffer[index++] = randomBytes[14];
  resultBuffer[index++] = randomBytes[15];

  return buffer || unsafeStringify(resultBuffer);
}