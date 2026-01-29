import { adler32 } from './adler32';
import { crc32 } from './crc32';
import { inffast } from './inffast';
import { inftrees } from './inftrees';
import {
  Z_FINISH,
  Z_BLOCK,
  Z_TREES,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR,
  Z_BUF_ERROR,
  Z_DEFLATED
} from './constants';

const MODE_HEAD = 16180;
const MODE_DICT = 16190;
const MODE_TYPE = 16191;
const MODE_TYPEDO = 16192;
const MODE_STORED = 16194;
const MODE_LEN = 16199;
const MODE_LENEXT = 16200;
const MODE_DIST = 16206;
const MODE_BAD = 16209;
const MODE_MEM = 16210;

interface ZStream {
  input: Uint8Array | null;
  next_in: number;
  avail_in: number;
  total_in: number;
  output: Uint8Array | null;
  next_out: number;
  avail_out: number;
  total_out: number;
  msg: string;
  state: InflateState | null;
  adler: number;
  data_type: number;
}

interface GZHeader {
  text?: number;
  time?: number;
  xflags?: number;
  os?: number;
  extra?: Uint8Array | null;
  extra_len?: number;
  name?: string;
  comment?: string;
  hcrc?: number;
  done?: boolean;
}

interface TreeBits {
  bits: number;
}

const swapEndian32 = (value: number): number =>
  (value >>> 24 & 255) +
  (value >>> 8 & 65280) +
  ((65280 & value) << 8) +
  ((255 & value) << 24);

class InflateState {
  strm: ZStream | null = null;
  mode: number = 0;
  last: boolean = false;
  wrap: number = 0;
  havedict: boolean = false;
  flags: number = 0;
  dmax: number = 0;
  check: number = 0;
  total: number = 0;
  head: GZHeader | null = null;
  wbits: number = 0;
  wsize: number = 0;
  whave: number = 0;
  wnext: number = 0;
  window: Uint8Array | null = null;
  hold: number = 0;
  bits: number = 0;
  length: number = 0;
  offset: number = 0;
  extra: number = 0;
  lencode: Int32Array | null = null;
  distcode: Int32Array | null = null;
  lenbits: number = 0;
  distbits: number = 0;
  ncode: number = 0;
  nlen: number = 0;
  ndist: number = 0;
  have: number = 0;
  next: Int32Array | null = null;
  lens: Uint16Array = new Uint16Array(320);
  work: Uint16Array = new Uint16Array(288);
  lendyn: Int32Array | null = null;
  distdyn: Int32Array | null = null;
  sane: number = 0;
  back: number = 0;
  was: number = 0;
}

const isInvalidStream = (strm: ZStream): boolean => {
  if (!strm) return true;
  const state = strm.state;
  return !state || state.strm !== strm || state.mode < MODE_HEAD || state.mode > 16211;
};

const inflateResetKeep = (strm: ZStream): number => {
  if (isInvalidStream(strm)) return Z_STREAM_ERROR;
  const state = strm.state!;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) strm.adler = 1 & state.wrap;
  state.mode = MODE_HEAD;
  state.last = false;
  state.havedict = false;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(852);
  state.distcode = state.distdyn = new Int32Array(592);
  state.sane = 1;
  state.back = -1;
  return Z_OK;
};

const inflateReset = (strm: ZStream): number => {
  if (isInvalidStream(strm)) return Z_STREAM_ERROR;
  const state = strm.state!;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};

const inflateReset2 = (strm: ZStream, windowBits: number): number => {
  let wrap: number;
  if (isInvalidStream(strm)) return Z_STREAM_ERROR;
  const state = strm.state!;
  
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = 5 + (windowBits >> 4);
    if (windowBits < 48) windowBits &= 15;
  }
  
  if (windowBits && (windowBits < 8 || windowBits > 15)) return Z_STREAM_ERROR;
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};

const inflateInit2 = (strm: ZStream, windowBits: number): number => {
  if (!strm) return Z_STREAM_ERROR;
  const state = new InflateState();
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = MODE_HEAD;
  const result = inflateReset2(strm, windowBits);
  if (result !== Z_OK) strm.state = null;
  return result;
};

const inflateInit = (strm: ZStream): number => inflateInit2(strm, 15);

let fixedLengthCode: Int32Array;
let fixedDistanceCode: Int32Array;
let isFixedTableBuilt = false;

const buildFixedTables = (state: InflateState): void => {
  if (isFixedTableBuilt) {
    fixedLengthCode = new Int32Array(512);
    fixedDistanceCode = new Int32Array(32);
    let index = 0;
    while (index < 144) state.lens[index++] = 8;
    while (index < 256) state.lens[index++] = 9;
    while (index < 280) state.lens[index++] = 7;
    while (index < 288) state.lens[index++] = 8;
    inftrees(1, state.lens, 0, 288, fixedLengthCode, 0, state.work, { bits: 9 });
    index = 0;
    while (index < 32) state.lens[index++] = 5;
    inftrees(2, state.lens, 0, 32, fixedDistanceCode, 0, state.work, { bits: 5 });
    isFixedTableBuilt = false;
  }
  state.lencode = fixedLengthCode;
  state.lenbits = 9;
  state.distcode = fixedDistanceCode;
  state.distbits = 5;
};

const updateWindow = (
  strm: ZStream,
  src: Uint8Array,
  end: number,
  copy: number
): number => {
  let dist: number;
  const state = strm.state!;
  
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) dist = copy;
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) state.wnext = 0;
      if (state.whave < state.wsize) state.whave += dist;
    }
  }
  return 0;
};

const inflate = (strm: ZStream, flush: number): number => {
  let state: InflateState;
  let input: Uint8Array;
  let output: Uint8Array;
  let nextIn: number;
  let nextOut: number;
  let availIn: number;
  let availOut: number;
  let hold: number;
  let bits: number;
  let inputLength: number;
  let outputLength: number;
  let copy: number;
  let from: number;
  let fromSource: Uint8Array;
  let here: number;
  let hereOp: number;
  let hereVal: number;
  let hereBits: number;
  let last: number;
  let lastOp: number;
  let lastVal: number;
  let lastBits: number;
  let len: number;
  let ret = Z_OK;
  const hbuf = new Uint8Array(4);
  let opts: TreeBits;
  const codeOrder = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  
  if (isInvalidStream(strm) || !strm.output || (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }
  
  state = strm.state!;
  if (state.mode === MODE_TYPE) state.mode = MODE_TYPEDO;
  
  nextOut = strm.next_out;
  output = strm.output!;
  availOut = strm.avail_out;
  nextIn = strm.next_in;
  input = strm.input!;
  availIn = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  inputLength = availIn;
  outputLength = availOut;
  ret = Z_OK;
  
  mainLoop: for (;;) {
    switch (state.mode) {
      case MODE_HEAD:
        if (state.wrap === 0) {
          state.mode = MODE_TYPEDO;
          break;
        }
        while (bits < 16) {
          if (availIn === 0) break mainLoop;
          availIn--;
          hold += input[nextIn++] << bits;
          bits += 8;
        }
        if ((state.wrap & 2) && hold === 35615) {
          if (state.wbits === 0) state.wbits = 15;
          state.check = 0;
          hbuf[0] = 255 & hold;
          hbuf[1] = (hold >>> 8) & 255;
          state.check = crc32(state.check, hbuf, 2, 0);
          hold = 0;
          bits = 0;
          state.mode = 16181;
          break;
        }
        if (state.head) state.head.done = false;
        if (!(state.wrap & 1) || (((255 & hold) << 8) + (hold >> 8)) % 31) {
          strm.msg = "incorrect header check";
          state.mode = MODE_BAD;
          break;
        }
        if ((hold & 15) !== Z_DEFLATED) {
          strm.msg = "unknown compression method";
          state.mode = MODE_BAD;
          break;
        }
        hold >>>= 4;
        bits -= 4;
        len = 8 + (hold & 15);
        if (state.wbits === 0) state.wbits = len;
        if (len > 15 || len > state.wbits) {
          strm.msg = "invalid window size";
          state.mode = MODE_BAD;
          break;
        }
        state.dmax = 1 << state.wbits;
        state.flags = 0;
        strm.adler = state.check = 1;
        state.mode = (hold & 512) ? 16189 : MODE_TYPE;
        hold = 0;
        bits = 0;
        break;
      case 16181:
      case 16182:
      case 16183:
      case 16184:
      case 16185:
      case 16186:
      case 16187:
      case 16188:
      case 16189:
      case MODE_DICT:
      case MODE_TYPE:
      case MODE_TYPEDO:
      case 16193:
      case MODE_STORED:
      case 16195:
      case 16196:
      case 16197:
      case 16198:
      case MODE_LEN:
      case MODE_LENEXT:
      case 16201:
      case 16202:
      case 16203:
      case 16204:
      case 16205:
      case MODE_DIST:
      case 16207:
      case 16208:
        break mainLoop;
      case MODE_BAD:
        ret = Z_DATA_ERROR;
        break mainLoop;
      case MODE_MEM:
        return Z_MEM_ERROR;
      default:
        return Z_STREAM_ERROR;
    }
  }
  
  strm.next_out = nextOut;
  strm.avail_out = availOut;
  strm.next_in = nextIn;
  strm.avail_in = availIn;
  state.hold = hold;
  state.bits = bits;
  
  if ((state.wsize || (outputLength !== strm.avail_out && state.mode < MODE_BAD && 
      (state.mode < MODE_DIST || flush !== Z_FINISH))) &&
      updateWindow(strm, strm.output!, strm.next_out, outputLength - strm.avail_out)) {
    state.mode = MODE_MEM;
    return Z_MEM_ERROR;
  }
  
  inputLength -= strm.avail_in;
  outputLength -= strm.avail_out;
  strm.total_in += inputLength;
  strm.total_out += outputLength;
  state.total += outputLength;
  
  if ((state.wrap & 4) && outputLength) {
    strm.adler = state.check = state.flags
      ? crc32(state.check, output, outputLength, strm.next_out - outputLength)
      : adler32(state.check, output, outputLength, strm.next_out - outputLength);
  }
  
  strm.data_type = state.bits + (state.last ? 64 : 0) + 
    (state.mode === MODE_TYPE ? 128 : 0) + 
    (state.mode === MODE_LEN || state.mode === MODE_STORED ? 256 : 0);
  
  if (((inputLength === 0 && outputLength === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  
  return ret;
};

const inflateEnd = (strm: ZStream): number => {
  if (isInvalidStream(strm)) return Z_STREAM_ERROR;
  let state = strm.state;
  if (state && state.window) state.window = null;
  strm.state = null;
  return Z_OK;
};

const inflateGetHeader = (strm: ZStream, head: GZHeader): number => {
  if (isInvalidStream(strm)) return Z_STREAM_ERROR;
  const state = strm.state!;
  if ((state.wrap & 2) === 0) return Z_STREAM_ERROR;
  state.head = head;
  head.done = false;
  return Z_OK;
};

const inflateSetDictionary = (strm: ZStream, dictionary: Uint8Array): number => {
  const length = dictionary.length;
  let dictId: number;
  let result: number;
  
  if (isInvalidStream(strm)) return Z_STREAM_ERROR;
  const state = strm.state!;
  
  if (state.wrap !== 0 && state.mode !== MODE_DICT) return Z_STREAM_ERROR;
  
  if (state.mode === MODE_DICT) {
    dictId = 1;
    dictId = adler32(dictId, dictionary, length, 0);
    if (dictId !== state.check) return Z_DATA_ERROR;
  }
  
  result = updateWindow(strm, dictionary, length, length);
  if (result) {
    state.mode = MODE_MEM;
    return Z_MEM_ERROR;
  }
  
  state.havedict = true;
  return Z_OK;
};

export {
  inflateReset,
  inflateReset2,
  inflateResetKeep,
  inflateInit,
  inflateInit2,
  inflate,
  inflateEnd,
  inflateGetHeader,
  inflateSetDictionary
};

export const inflateInfo = "pako inflate (from Nodeca project)";