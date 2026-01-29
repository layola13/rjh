function writeOutput(
  streamId: number,
  iovPtr: number,
  iovCount: number,
  bytesWrittenPtr: number
): number {
  try {
    let totalBytesWritten = 0;

    for (let i = 0; i < iovCount; i++) {
      const bufferPtr = O[iovPtr + 8 * i >> 2];
      const bufferLength = O[iovPtr + (8 * i + 4) >> 2];

      for (let j = 0; j < bufferLength; j++) {
        $.printChar(streamId, P[bufferPtr + j]);
      }

      totalBytesWritten += bufferLength;
    }

    O[bytesWrittenPtr >> 2] = totalBytesWritten;
    return 0;
  } catch (error: unknown) {
    const isFileSystemError =
      typeof FS !== "undefined" &&
      error instanceof FS.ErrnoError;

    if (!isFileSystemError) {
      wt(error);
    }

    return -(error as { errno: number }).errno;
  }
}