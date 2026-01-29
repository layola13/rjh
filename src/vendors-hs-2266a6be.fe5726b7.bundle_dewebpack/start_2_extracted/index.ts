// UUID v1 - Timestamp-based UUID
interface V1Options {
  node?: number[];
  clockseq?: number;
  msecs?: number;
  nsecs?: number;
  random?: number[];
  rng?: () => number[];
}

let nodeId: number[] | undefined;
let clockseq: number | undefined;
let lastMSecs = 0;
let lastNSecs = 0;

function v1(options?: V1Options, buffer?: number[], offset = 0): string | number[] {
  let i = buffer && offset || 0;
  const b = buffer || new Array(16);

  options = options || {};

  let node = options.node || nodeId;
  let clkseq = options.clockseq !== undefined ? options.clockseq : clockseq;

  if (node == null || clkseq == null) {
    const seedBytes = options.random || options.rng?.() || crypto.getRandomValues(new Uint8Array(16));
    if (node == null) {
      node = nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clkseq == null) {
      clkseq = clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  let msecs = options.msecs !== undefined ? options.msecs : Date.now();
  let nsecs = options.nsecs !== undefined ? options.nsecs : lastNSecs + 1;

  const dt = (msecs - lastMSecs) + (nsecs - lastNSecs) / 10000;

  if (dt < 0 && options.clockseq === undefined) {
    clkseq = clkseq + 1 & 0x3fff;
  }

  if ((dt === 0 || msecs < lastMSecs) && options.nsecs === undefined) {
    nsecs = nsecs + 1;
    if (nsecs >= 10000) {
      nsecs = 0;
      msecs = msecs + 1;
    }
  }

  lastMSecs = msecs;
  lastNSecs = nsecs;
  clockseq = clkseq;

  msecs += 12219292800000;

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  const tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  b[i++] = tmh >>> 24 & 0xf | 0x10;
  b[i++] = tmh >>> 16 & 0xff;

  b[i++] = clkseq >>> 8 | 0x80;
  b[i++] = clkseq & 0xff;

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node![n];
  }

  return buffer || unsignedBytesToUuid(b);
}

// UUID v3 - MD5-based UUID
function v3(name: string | number[], namespace: string | number[]): string {
  return generateUuidFromHash(name, namespace, md5, 0x30);
}

v3.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
v3.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

// UUID v4 - Random UUID
interface V4Options {
  random?: number[];
  rng?: () => number[];
}

function v4(options?: V4Options, buffer?: number[], offset = 0): string | number[] {
  const rnds = options?.random || options?.rng?.() || crypto.getRandomValues(new Uint8Array(16));

  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  if (buffer) {
    for (let i = 0; i < 16; ++i) {
      buffer[offset + i] = rnds[i];
    }
    return buffer;
  }

  return unsignedBytesToUuid(rnds);
}

// UUID v5 - SHA1-based UUID
function v5(name: string | number[], namespace: string | number[]): string {
  return generateUuidFromHash(name, namespace, sha1, 0x50);
}

v5.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
v5.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

// NIL UUID
export const NIL = '00000000-0000-0000-0000-000000000000';

// Parse UUID string to byte array
function parse(uuid: string): number[] {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  const bytes: number[] = new Array(16);
  let index = 0;

  uuid.replace(/[0-9a-f]{2}/gi, (hex) => {
    if (index < 16) {
      bytes[index++] = parseInt(hex, 16);
    }
    return '';
  });

  return bytes;
}

// Stringify byte array to UUID string
const byteToHex: string[] = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr: number[], offset = 0): string {
  const uuid = (
    byteToHex[arr[offset + 0]] +
    byteToHex[arr[offset + 1]] +
    byteToHex[arr[offset + 2]] +
    byteToHex[arr[offset + 3]] +
    '-' +
    byteToHex[arr[offset + 4]] +
    byteToHex[arr[offset + 5]] +
    '-' +
    byteToHex[arr[offset + 6]] +
    byteToHex[arr[offset + 7]] +
    '-' +
    byteToHex[arr[offset + 8]] +
    byteToHex[arr[offset + 9]] +
    '-' +
    byteToHex[arr[offset + 10]] +
    byteToHex[arr[offset + 11]] +
    byteToHex[arr[offset + 12]] +
    byteToHex[arr[offset + 13]] +
    byteToHex[arr[offset + 14]] +
    byteToHex[arr[offset + 15]]
  ).toLowerCase();

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

// Validate UUID string
const UUID_REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid: string): boolean {
  return typeof uuid === 'string' && UUID_REGEX.test(uuid);
}

// Get UUID version
function version(uuid: string): number {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

// Helper functions
function unsignedBytesToUuid(bytes: number[] | Uint8Array): string {
  return stringify(Array.from(bytes));
}

function generateUuidFromHash(
  name: string | number[],
  namespace: string | number[],
  hashFunc: (data: number[]) => number[],
  version: number
): string {
  const namespaceBytes = typeof namespace === 'string' ? parse(namespace) : namespace;
  const nameBytes = typeof name === 'string' ? stringToBytes(name) : name;

  const hash = hashFunc([...namespaceBytes, ...nameBytes]);

  hash[6] = (hash[6] & 0x0f) | version;
  hash[8] = (hash[8] & 0x3f) | 0x80;

  return stringify(hash);
}

function stringToBytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; ++i) {
    const code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0x10000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      );
    }
  }
  return bytes;
}

// MD5 implementation
function md5(data: number[]): number[] {
  const K = new Uint32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ]);

  const padded = padMessage(data, 64);
  const state = new Uint32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);

  for (let offset = 0; offset < padded.length; offset += 64) {
    const block = new Uint32Array(16);
    for (let i = 0; i < 16; i++) {
      block[i] = padded[offset + i * 4] | (padded[offset + i * 4 + 1] << 8) | 
                 (padded[offset + i * 4 + 2] << 16) | (padded[offset + i * 4 + 3] << 24);
    }

    let [a, b, c, d] = state;

    for (let i = 0; i < 64; i++) {
      let f: number, g: number;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }

      const temp = d;
      d = c;
      c = b;
      b = (b + rotateLeft((a + f + K[i] + block[g]) >>> 0, [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][Math.floor(i / 16) * 4 + (i % 4)])) >>> 0;
      a = temp;
    }

    state[0] = (state[0] + a) >>> 0;
    state[1] = (state[1] + b) >>> 0;
    state[2] = (state[2] + c) >>> 0;
    state[3] = (state[3] + d) >>> 0;
  }

  const result: number[] = [];
  for (let i = 0; i < 4; i++) {
    result.push(state[i] & 0xff, (state[i] >> 8) & 0xff, (state[i] >> 16) & 0xff, (state[i] >> 24) & 0xff);
  }
  return result;
}

// SHA1 implementation
function sha1(data: number[]): number[] {
  const padded = padMessage(data, 64);
  const state = new Uint32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);

  for (let offset = 0; offset < padded.length; offset += 64) {
    const w = new Uint32Array(80);
    for (let i = 0; i < 16; i++) {
      w[i] = (padded[offset + i * 4] << 24) | (padded[offset + i * 4 + 1] << 16) |
             (padded[offset + i * 4 + 2] << 8) | padded[offset + i * 4 + 3];
    }

    for (let i = 16; i < 80; i++) {
      w[i] = rotateLeft(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }

    let [a, b, c, d, e] = state;

    for (let i = 0; i < 80; i++) {
      let f: number, k: number;
      if (i < 20) {
        f = (b & c) | (~b & d);
        k = 0x5a827999;
      } else if (i < 40) {
        f = b ^ c ^ d;
        k = 0x6ed9eba1;
      } else if (i < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = 0x8f1bbcdc;
      } else {
        f = b ^ c ^ d;
        k = 0xca62c1d6;
      }

      const temp = (rotateLeft(a, 5) + f + e + k + w[i]) >>> 0;
      e = d;
      d = c;
      c = rotateLeft(b, 30);
      b = a;
      a = temp;
    }

    state[0] = (state[0] + a) >>> 0;
    state[1] = (state[1] + b) >>> 0;
    state[2] = (state[2] + c) >>> 0;
    state[3] = (state[3] + d) >>> 0;
    state[4] = (state[4] + e) >>> 0;
  }

  const result: number[] = [];
  for (let i = 0; i < 5; i++) {
    result.push((state[i] >> 24) & 0xff, (state[i] >> 16) & 0xff, (state[i] >> 8) & 0xff, state[i] & 0xff);
  }
  return result.slice(0, 16);
}

function padMessage(data: number[], blockSize: number): Uint8Array {
  const bitLength = data.length * 8;
  const padLength = blockSize - ((data.length + 8) % blockSize);
  const totalLength = data.length + 1 + padLength + 8;
  const padded = new Uint8Array(totalLength);

  padded.set(data);
  padded[data.length] = 0x80;

  for (let i = 0; i < 8; i++) {
    padded[totalLength - 8 + i] = (bitLength >>> ((7 - i) * 8)) & 0xff;
  }

  return padded;
}

function rotateLeft(value: number, shift: number): number {
  return ((value << shift) | (value >>> (32 - shift))) >>> 0;
}

export { v1, v3, v4, v5, NIL, parse, stringify, validate, version };