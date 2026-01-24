/**
 * Module: module_w
 * Original ID: w
 * 
 * Low-level I/O write operation handler for file system operations.
 * Processes multiple buffer chunks and writes character data to a stream.
 */

/**
 * Writes character data from memory buffers to an output stream.
 * 
 * @param fileDescriptor - File descriptor or stream identifier to write to
 * @param bufferPointer - Pointer to the start of buffer metadata in heap memory
 * @param chunkCount - Number of buffer chunks to process
 * @param bytesWrittenPointer - Pointer to store the total bytes written
 * @returns 0 on success, negative errno value on error
 * 
 * @remarks
 * This function iterates through buffer chunks, reading metadata at 8-byte intervals:
 * - Offset +0: Pointer to character data
 * - Offset +4: Length of character data
 * 
 * On success, stores total bytes written at `bytesWrittenPointer`.
 * On error, returns negated errno if the error is an FS.ErrnoError.
 */
declare function module_w(
  fileDescriptor: number,
  bufferPointer: number,
  chunkCount: number,
  bytesWrittenPointer: number
): number;

export default module_w;