/**
 * Z-library error/status message mappings
 * Maps zlib status codes to their corresponding human-readable messages
 */
declare module 'module_759399' {
  /**
   * Zlib status code to message mapping interface
   */
  interface ZlibMessages {
    /** Need dictionary - indicates a preset dictionary is required */
    '2': 'need dictionary';
    
    /** Stream end - indicates the end of the compression/decompression stream */
    '1': 'stream end';
    
    /** Success/OK - no error occurred */
    '0': '';
    
    /** File error - error reading or writing file */
    '-1': 'file error';
    
    /** Stream error - invalid compression level or stream state inconsistency */
    '-2': 'stream error';
    
    /** Data error - input data was corrupted or incomplete */
    '-3': 'data error';
    
    /** Insufficient memory - not enough memory to complete operation */
    '-4': 'insufficient memory';
    
    /** Buffer error - output buffer too small or input buffer too large */
    '-5': 'buffer error';
    
    /** Incompatible version - zlib library version mismatch */
    '-6': 'incompatible version';
  }

  /**
   * Zlib status messages constant
   * @constant
   */
  const zlibMessages: ZlibMessages;

  export = zlibMessages;
}