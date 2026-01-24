/**
 * Deflate compression module
 * Provides deflate, gzip, and raw deflate compression functionality
 */

import * as deflateImpl from './deflate-impl';
import * as utils from './utils';
import * as stringUtils from './string-utils';
import * as messages from './messages';
import { ZStream } from './zstream';
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

/**
 * Options for configuring deflate compression
 */
export interface DeflateOptions {
  /** Compression level (0-9, default: Z_DEFAULT_COMPRESSION) */
  level?: number;
  /** Compression method (default: Z_DEFLATED) */
  method?: number;
  /** Size of compression chunks in bytes (default: 16384) */
  chunkSize?: number;
  /** Window size for compression (default: 15) */
  windowBits?: number;
  /** Memory level for internal compression state (default: 8) */
  memLevel?: number;
  /** Compression strategy (default: Z_DEFAULT_STRATEGY) */
  strategy?: number;
  /** Enable raw deflate mode (no zlib wrapper) */
  raw?: boolean;
  /** Enable gzip mode */
  gzip?: boolean;
  /** Custom gzip/zlib header */
  header?: unknown;
  /** Preset dictionary for compression */
  dictionary?: string | ArrayBuffer | Uint8Array;
}

/**
 * Input data types supported by deflate
 */
export type DeflateInput = string | ArrayBuffer | Uint8Array;

/**
 * Main deflate compression class
 * Handles streaming compression of data using the deflate algorithm
 */
export class Deflate {
  /** Compression options */
  options: Required<Omit<DeflateOptions, 'raw' | 'gzip' | 'header' | 'dictionary'>> & DeflateOptions;
  
  /** Error code from compression operations */
  err: number;
  
  /** Error message from compression operations */
  msg: string;
  
  /** Whether compression has finished */
  ended: boolean;
  
  /** Array of compressed data chunks */
  chunks: Uint8Array[];
  
  /** Internal zlib stream state */
  strm: ZStream;
  
  /** Whether a dictionary has been set */
  private _dict_set: boolean;

  /**
   * Creates a new Deflate instance
   * @param options - Compression configuration options
   * @throws {Error} If deflate initialization fails
   */
  constructor(options?: DeflateOptions);

  /**
   * Push data through the compression stream
   * @param data - Input data to compress
   * @param flush - Flush mode (true for Z_FINISH, false for Z_NO_FLUSH, or specific flush constant)
   * @returns true if successful, false if already ended
   */
  push(data: DeflateInput, flush?: boolean | number): boolean;

  /**
   * Called when compressed data is available
   * @param chunk - Compressed data chunk
   */
  onData(chunk: Uint8Array): void;

  /**
   * Called when compression stream ends
   * @param status - Final status code
   */
  onEnd(status: number): void;

  /** Final compressed result (available after successful completion) */
  result?: Uint8Array;
}

/**
 * Compress data using deflate algorithm
 * @param input - Data to compress
 * @param options - Compression options
 * @returns Compressed data
 * @throws {Error} If compression fails
 */
export function deflate(input: DeflateInput, options?: DeflateOptions): Uint8Array;

/**
 * Compress data using raw deflate (no zlib wrapper)
 * @param input - Data to compress
 * @param options - Compression options
 * @returns Compressed data
 * @throws {Error} If compression fails
 */
export function deflateRaw(input: DeflateInput, options?: DeflateOptions): Uint8Array;

/**
 * Compress data using gzip format
 * @param input - Data to compress
 * @param options - Compression options
 * @returns Compressed data in gzip format
 * @throws {Error} If compression fails
 */
export function gzip(input: DeflateInput, options?: DeflateOptions): Uint8Array;

/**
 * Compression-related constants
 */
export * as constants from './constants';