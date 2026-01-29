import * as inflate from './inflate';
import * as utils from './utils';
import * as strings from './strings';
import * as messages from './messages';
import * as ZStream from './zstream';
import * as GZheader from './gzheader';
import {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} from './constants';

const objectToString = Object.prototype.toString;

interface InflateOptions {
  chunkSize?: number;
  windowBits?: number;
  to?: string;
  raw?: boolean;
  dictionary?: string | Uint8Array;
}

class Inflate {
  options: Required<InflateOptions>;
  err: number;
  msg: string;
  ended: boolean;
  chunks: Array<string | Uint8Array>;
  strm: typeof ZStream;
  header: typeof GZheader;
  result?: string | Uint8Array;

  constructor(options?: InflateOptions) {
    this.options = utils.assign(
      {
        chunkSize: 65536,
        windowBits: 15,
        to: '',
        raw: false,
        dictionary: undefined
      },
      options || {}
    );

    const opts = this.options;

    if (opts.raw && opts.windowBits >= 0 && opts.windowBits < 16) {
      opts.windowBits = -opts.windowBits;
      if (opts.windowBits === 0) {
        opts.windowBits = -15;
      }
    }

    if (
      !(opts.windowBits >= 0 && opts.windowBits < 16) ||
      (options && options.windowBits)
    ) {
      opts.windowBits += 32;
    }

    if (
      opts.windowBits > 15 &&
      opts.windowBits < 48 &&
      (opts.windowBits & 15) === 0
    ) {
      opts.windowBits |= 15;
    }

    this.err = 0;
    this.msg = '';
    this.ended = false;
    this.chunks = [];
    this.strm = new ZStream();
    this.strm.avail_out = 0;

    let status = inflate.inflateInit2(this.strm, opts.windowBits);

    if (status !== Z_OK) {
      throw new Error(messages[status]);
    }

    this.header = new GZheader();
    inflate.inflateGetHeader(this.strm, this.header);

    if (opts.dictionary) {
      if (typeof opts.dictionary === 'string') {
        opts.dictionary = strings.string2buf(opts.dictionary);
      } else if (objectToString.call(opts.dictionary) === '[object ArrayBuffer]') {
        opts.dictionary = new Uint8Array(opts.dictionary);
      }

      if (opts.raw) {
        status = inflate.inflateSetDictionary(this.strm, opts.dictionary);
        if (status !== Z_OK) {
          throw new Error(messages[status]);
        }
      }
    }
  }

  push(data: ArrayBuffer | Uint8Array, flushMode?: number | boolean): boolean {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    const dictionary = this.options.dictionary;
    let status: number;
    let flush: number;
    let availOut: number;

    if (this.ended) {
      return false;
    }

    if (flushMode === ~~flushMode) {
      flush = flushMode;
    } else if (flushMode === true) {
      flush = Z_FINISH;
    } else {
      flush = Z_NO_FLUSH;
    }

    if (objectToString.call(data) === '[object ArrayBuffer]') {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data as Uint8Array;
    }

    strm.next_in = 0;
    strm.avail_in = strm.input.length;

    for (;;) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }

      status = inflate.inflate(strm, flush);

      if (status === Z_NEED_DICT && dictionary) {
        status = inflate.inflateSetDictionary(strm, dictionary);

        if (status === Z_OK) {
          status = inflate.inflate(strm, flush);
        } else if (status === Z_DATA_ERROR) {
          status = Z_NEED_DICT;
        }
      }

      while (
        strm.avail_in > 0 &&
        status === Z_STREAM_END &&
        strm.state.wrap > 0 &&
        data[strm.next_in] !== 0
      ) {
        inflate.inflateReset(strm);
        status = inflate.inflate(strm, flush);
      }

      switch (status) {
        case Z_STREAM_ERROR:
        case Z_DATA_ERROR:
        case Z_NEED_DICT:
        case Z_MEM_ERROR:
          this.onEnd(status);
          this.ended = true;
          return false;
      }

      availOut = strm.avail_out;

      if (strm.next_out && (strm.avail_out === 0 || status === Z_STREAM_END)) {
        if (this.options.to === 'string') {
          const nextOutUtf8 = strings.utf8border(strm.output, strm.next_out);
          const tail = strm.next_out - nextOutUtf8;
          const utf8str = strings.buf2string(strm.output, nextOutUtf8);

          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;

          if (tail) {
            strm.output.set(strm.output.subarray(nextOutUtf8, nextOutUtf8 + tail), 0);
          }

          this.onData(utf8str);
        } else {
          this.onData(
            strm.output.length === strm.next_out
              ? strm.output
              : strm.output.subarray(0, strm.next_out)
          );
        }
      }

      if (status === Z_OK && availOut === 0) {
        continue;
      }

      if (status === Z_STREAM_END) {
        status = inflate.inflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return true;
      }

      if (strm.avail_in === 0) {
        break;
      }
    }

    return true;
  }

  onData(chunk: string | Uint8Array): void {
    this.chunks.push(chunk);
  }

  onEnd(status: number): void {
    if (status === Z_OK) {
      if (this.options.to === 'string') {
        this.result = this.chunks.join('');
      } else {
        this.result = utils.flattenChunks(this.chunks as Uint8Array[]);
      }
    }

    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  }
}

function inflateImpl(data: ArrayBuffer | Uint8Array, options?: InflateOptions): string | Uint8Array {
  const inflator = new Inflate(options);
  inflator.push(data);

  if (inflator.err) {
    throw inflator.msg || messages[inflator.err];
  }

  return inflator.result!;
}

function inflateRaw(data: ArrayBuffer | Uint8Array, options?: InflateOptions): string | Uint8Array {
  const opts = options || {};
  opts.raw = true;
  return inflateImpl(data, opts);
}

export { Inflate, inflateImpl as inflate, inflateRaw, inflateImpl as ungzip };
export { Z_NO_FLUSH, Z_FINISH, Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR } as constants;