/**
 * Adler-32 checksum algorithm implementation
 * 
 * Computes a checksum for data integrity verification.
 * Adler-32 is a checksum algorithm which was invented by Mark Adler.
 * It is almost as reliable as a 32-bit cyclic redundancy check for protecting
 * against accidental modification of data.
 * 
 * @param checksum - Initial checksum value (typically 1 for new calculation)
 * @param buffer - Input data buffer to compute checksum from
 * @param length - Number of bytes to process from the buffer
 * @param offset - Starting position in the buffer
 * @returns The computed 32-bit Adler-32 checksum
 * 
 * @example
 *