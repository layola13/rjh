function cloneArrayBuffer(arrayBuffer: ArrayBuffer): ArrayBuffer {
  const cloned = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(cloned).set(new Uint8Array(arrayBuffer));
  return cloned;
}

export default cloneArrayBuffer;