import rngModule from './170957';
import { unsafeStringify } from './549629';

interface V1Options {
  node?: number[];
  clockseq?: number;
  msecs?: number;
  nsecs?: number;
  random?: number[];
  rng?: () => number[];
  _v6?: boolean;
}

let cachedNode: number[] | undefined;
let cachedClockseq: number | undefined;
let lastMsecs: number = 0;
let lastNsecs: number = 0;

const CLOCKSEQ_MASK = 0x3fff;
const MAX_NSECS = 10000;
const TIME_OFFSET_MS = 12219292800000;
const MAX_UINT32 = 0xffffffff;
const TIME_MASK = 0x0fffffff;

export default function uuidV1(
  options?: V1Options,
  buffer?: number[],
  offset?: number
): string | number[] {
  const bufferOffset = buffer && offset || 0;
  const resultBuffer = buffer || new Array(16);
  const opts = options || {};

  let node = opts.node;
  let clockseq = opts.clockseq;

  if (opts._v6 || (node || (node = cachedNode), clockseq == null && (clockseq = cachedClockseq)), node == null || clockseq == null) {
    const randomBytes = opts.random || (opts.rng || rngModule.default)();
    
    if (node == null) {
      node = [randomBytes[0], randomBytes[1], randomBytes[2], randomBytes[3], randomBytes[4], randomBytes[5]];
      if (!cachedNode && !opts._v6) {
        node[0] |= 0x01;
        cachedNode = node;
      }
    }
    
    if (clockseq == null) {
      clockseq = CLOCKSEQ_MASK & (randomBytes[6] << 8 | randomBytes[7]);
      if (cachedClockseq === undefined && !opts._v6) {
        cachedClockseq = clockseq;
      }
    }
  }

  const msecs = opts.msecs !== undefined ? opts.msecs : Date.now();
  const nsecs = opts.nsecs !== undefined ? opts.nsecs : lastNsecs + 1;
  const delta = msecs - lastMsecs + (nsecs - lastNsecs) / MAX_NSECS;

  if (delta < 0 && opts.clockseq === undefined) {
    clockseq = (clockseq + 1) & CLOCKSEQ_MASK;
  }

  if ((delta < 0 || msecs > lastMsecs) && opts.nsecs === undefined) {
    nsecs = 0;
  }

  if (nsecs >= MAX_NSECS) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  lastMsecs = msecs;
  lastNsecs = nsecs;
  cachedClockseq = clockseq;

  const timestamp = msecs + TIME_OFFSET_MS;
  const timeLow = ((TIME_MASK & timestamp) * MAX_NSECS + nsecs) % MAX_UINT32;

  resultBuffer[bufferOffset] = (timeLow >>> 24) & 0xff;
  resultBuffer[bufferOffset + 1] = (timeLow >>> 16) & 0xff;
  resultBuffer[bufferOffset + 2] = (timeLow >>> 8) & 0xff;
  resultBuffer[bufferOffset + 3] = timeLow & 0xff;

  const timeMid = ((timestamp / MAX_UINT32) * MAX_NSECS) & TIME_MASK;

  resultBuffer[bufferOffset + 4] = (timeMid >>> 8) & 0xff;
  resultBuffer[bufferOffset + 5] = timeMid & 0xff;
  resultBuffer[bufferOffset + 6] = ((timeMid >>> 24) & 0x0f) | 0x10;
  resultBuffer[bufferOffset + 7] = (timeMid >>> 16) & 0xff;
  resultBuffer[bufferOffset + 8] = (clockseq >>> 8) | 0x80;
  resultBuffer[bufferOffset + 9] = clockseq & 0xff;

  for (let i = 0; i < 6; ++i) {
    resultBuffer[bufferOffset + 10 + i] = node[i];
  }

  return buffer || unsafeStringify(resultBuffer);
}