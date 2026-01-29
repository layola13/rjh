interface IOContext {
  outputBuffers: Map<number, number[]>;
}

const ioContext: IOContext = {
  outputBuffers: new Map<number, number[]>()
};

function processIOVectors(
  fileDescriptor: number,
  iovecPtr: number,
  iovecCount: number,
  bytesWrittenPtr: number,
  heap32: Int32Array,
  heap8: Uint8Array
): number {
  let totalBytesWritten = 0;

  for (let vecIndex = 0; vecIndex < iovecCount; vecIndex++) {
    const bufferPtr = heap32[iovecPtr >> 2];
    const bufferLength = heap32[(iovecPtr + 4) >> 2];
    iovecPtr += 8;

    for (let byteIndex = 0; byteIndex < bufferLength; byteIndex++) {
      const byte = heap8[bufferPtr + byteIndex];
      let buffer = ioContext.outputBuffers.get(fileDescriptor);

      if (!buffer) {
        buffer = [];
        ioContext.outputBuffers.set(fileDescriptor, buffer);
      }

      const NULL_BYTE = 0;
      const NEWLINE_BYTE = 10;

      if (byte === NULL_BYTE || byte === NEWLINE_BYTE) {
        const outputFn = fileDescriptor === 1 ? console.log : console.error;
        const text = decodeUTF8(buffer, 0);
        outputFn(text);
        buffer.length = 0;
      } else {
        buffer.push(byte);
      }
    }

    totalBytesWritten += bufferLength;
  }

  heap32[bytesWrittenPtr >> 2] = totalBytesWritten;
  return 0;
}

function decodeUTF8(bytes: number[], offset: number): string {
  return new TextDecoder().decode(new Uint8Array(bytes.slice(offset)));
}