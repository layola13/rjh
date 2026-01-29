interface V1Options {
  node?: number[];
  clockseq?: number;
  msecs?: number;
  nsecs?: number;
  random?: number[];
  rng?: () => number[];
}

type OutputBuffer = number[];

let cachedNodeId: number[] | undefined;
let cachedClockSeq: number | undefined;
let lastTimestamp = 0;
let lastNanoseconds = 0;

const GREGORIAN_OFFSET = 12219292800000;
const MAX_CLOCK_SEQ = 16383;
const MAX_NANOSECONDS = 10000;
const TIME_MASK = 0x0fffffff;
const MAX_UINT32 = 4294967296;

function uuidV1(
  options?: V1Options,
  buffer?: OutputBuffer,
  offset?: number
): OutputBuffer | string {
  const bufferOffset = buffer && offset !== undefined ? offset : 0;
  const outputBuffer = buffer || new Array<number>(16);
  const opts = options || {};

  let nodeId = opts.node || cachedNodeId;
  let clockSeq = opts.clockseq !== undefined ? opts.clockseq : cachedClockSeq;

  if (nodeId === null || nodeId === undefined || clockSeq === null || clockSeq === undefined) {
    const randomBytes = opts.random || (opts.rng ? opts.rng() : getRandomBytes());

    if (nodeId === null || nodeId === undefined) {
      nodeId = cachedNodeId = [
        randomBytes[0] | 0x01,
        randomBytes[1],
        randomBytes[2],
        randomBytes[3],
        randomBytes[4],
        randomBytes[5]
      ];
    }

    if (clockSeq === null || clockSeq === undefined) {
      clockSeq = cachedClockSeq = MAX_CLOCK_SEQ & ((randomBytes[6] << 8) | randomBytes[7]);
    }
  }

  const msecs = opts.msecs !== undefined ? opts.msecs : Date.now();
  let nsecs = opts.nsecs !== undefined ? opts.nsecs : lastNanoseconds + 1;

  const timeDelta = msecs - lastTimestamp + (nsecs - lastNanoseconds) / MAX_NANOSECONDS;

  if (timeDelta < 0 && opts.clockseq === undefined) {
    clockSeq = (clockSeq + 1) & MAX_CLOCK_SEQ;
  }

  if ((timeDelta < 0 || msecs > lastTimestamp) && opts.nsecs === undefined) {
    nsecs = 0;
  }

  if (nsecs >= MAX_NANOSECONDS) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  lastTimestamp = msecs;
  lastNanoseconds = nsecs;
  cachedClockSeq = clockSeq;

  const adjustedTimestamp = msecs + GREGORIAN_OFFSET;
  const timeLow = ((TIME_MASK & adjustedTimestamp) * MAX_NANOSECONDS + nsecs) % MAX_UINT32;

  let writeOffset = bufferOffset;
  outputBuffer[writeOffset++] = (timeLow >>> 24) & 0xff;
  outputBuffer[writeOffset++] = (timeLow >>> 16) & 0xff;
  outputBuffer[writeOffset++] = (timeLow >>> 8) & 0xff;
  outputBuffer[writeOffset++] = timeLow & 0xff;

  const timeMid = ((adjustedTimestamp / MAX_UINT32) * MAX_NANOSECONDS) & TIME_MASK;
  outputBuffer[writeOffset++] = (timeMid >>> 8) & 0xff;
  outputBuffer[writeOffset++] = timeMid & 0xff;
  outputBuffer[writeOffset++] = ((timeMid >>> 24) & 0x0f) | 0x10;
  outputBuffer[writeOffset++] = (timeMid >>> 16) & 0xff;

  outputBuffer[writeOffset++] = (clockSeq >>> 8) | 0x80;
  outputBuffer[writeOffset++] = clockSeq & 0xff;

  for (let i = 0; i < 6; i++) {
    outputBuffer[writeOffset + i] = nodeId[i];
  }

  return buffer || bytesToUuid(outputBuffer);
}

function getRandomBytes(): number[] {
  const bytes = new Array<number>(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

function bytesToUuid(bytes: number[]): string {
  const hexDigits = '0123456789abcdef';
  const uuid: string[] = [];
  
  for (let i = 0; i < 16; i++) {
    uuid.push(hexDigits[(bytes[i] >>> 4) & 0x0f]);
    uuid.push(hexDigits[bytes[i] & 0x0f]);
  }
  
  return [
    uuid.slice(0, 8).join(''),
    uuid.slice(8, 12).join(''),
    uuid.slice(12, 16).join(''),
    uuid.slice(16, 20).join(''),
    uuid.slice(20, 32).join('')
  ].join('-');
}

export default uuidV1;