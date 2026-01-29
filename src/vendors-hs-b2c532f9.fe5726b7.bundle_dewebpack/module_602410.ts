import * as deflateLib from './deflate-lib';
import * as utils from './utils';
import * as stringUtils from './string-utils';
import * as errorMessages from './error-messages';
import ZStream from './zstream';

const objectToString = Object.prototype.toString;

import {
  Z_NO_FLUSH,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED
} from './constants';

interface DeflateOptions {
  level?: number;
  method?: number;
  chunkSize?: number;
  windowBits?: number;
  memLevel?: number;
  strategy?: number;
  raw?: boolean;
  gzip?: boolean;
  header?: unknown;
  dictionary?: string | ArrayBuffer | Uint8Array;
}

class Deflate {
  options: Required<Omit<DeflateOptions, 'raw' | 'gzip' | 'header' | 'dictionary'>> & Pick<DeflateOptions, 'raw' | 'gzip' | 'header' | 'dictionary'>;
  err: number;
  msg: string;
  ended: boolean;
  chunks: Uint8Array[];
  strm: ZStream;
  _dict_set?: boolean;

  constructor(options?: DeflateOptions) {
    this.options = utils.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY
    }, options || {});

    const opts = this.options;

    if (opts.raw && opts.windowBits > 0) {
      opts.windowBits = -opts.windowBits;
    } else if (opts.gzip && opts.windowBits > 0 && opts.windowBits < 16) {
      opts.windowBits += 16;
    }

    this.err = 0;
    this.msg = '';
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream();
    this.strm.avail_out = 0;

    let status = deflateLib.deflateInit2(
      this.strm,
      opts.level,
      opts.method,
      opts.windowBits,
      opts.memLevel,
      opts.strategy
    );

    if (status !== Z_OK) {
      throw new Error(errorMessages[status]);
    }

    if (opts.header) {
      deflateLib.deflateSetHeader(this.strm, opts.header);
    }

    if (opts.dictionary) {
      let dict: Uint8Array;

      if (typeof opts.dictionary === 'string') {
        dict = stringUtils.string2buf(opts.dictionary);
      } else if (objectToString.call(opts.dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(opts.dictionary);
      } else {
        dict = opts.dictionary as Uint8Array;
      }

      status = deflateLib.deflateSetDictionary(this.strm, dict);

      if (status !== Z_OK) {
        throw new Error(errorMessages[status]);
      }

      this._dict_set = true;
    }
  }

  push(data: string | ArrayBuffer | Uint8Array, isFinalChunk?: boolean | number): boolean {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    let status: number;
    let flushMode: number;

    if (this.ended) {
      return false;
    }

    if (isFinalChunk === ~~isFinalChunk) {
      flushMode = isFinalChunk;
    } else {
      flushMode = isFinalChunk === true ? Z_FINISH : Z_NO_FLUSH;
    }

    if (typeof data === 'string') {
      strm.input = stringUtils.string2buf(data);
    } else if (objectToString.call(data) === '[object ArrayBuffer]') {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data as Uint8Array;
    }

    strm.next_in = 0;
    strm.avail_in = strm.input.length;

    while (true) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }

      if ((flushMode === Z_SYNC_FLUSH || flushMode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }

      status = deflateLib.deflate(strm, flushMode);

      if (status === Z_STREAM_END) {
        if (strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
        }

        status = deflateLib.deflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;

        return status === Z_OK;
      }

      if (strm.avail_out !== 0) {
        if (flushMode > 0 && strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
        } else if (strm.avail_in === 0) {
          break;
        }
      } else {
        this.onData(strm.output);
      }
    }

    return true;
  }

  onData(chunk: Uint8Array): void {
    this.chunks.push(chunk);
  }

  onEnd(status: number): void {
    if (status === Z_OK) {
      this.result = utils.flattenChunks(this.chunks);
    }

    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  }

  result?: Uint8Array;
}

function deflate(data: string | ArrayBuffer | Uint8Array, options?: DeflateOptions): Uint8Array {
  const deflator = new Deflate(options);

  deflator.push(data, true);

  if (deflator.err) {
    throw deflator.msg || errorMessages[deflator.err];
  }

  return deflator.result!;
}

function deflateRaw(data: string | ArrayBuffer | Uint8Array, options?: DeflateOptions): Uint8Array {
  const opts = options || {};
  opts.raw = true;
  return deflate(data, opts);
}

function gzip(data: string | ArrayBuffer | Uint8Array, options?: DeflateOptions): Uint8Array {
  const opts = options || {};
  opts.gzip = true;
  return deflate(data, opts);
}

export { Deflate, deflate, deflateRaw, gzip };
export * as constants from './constants';