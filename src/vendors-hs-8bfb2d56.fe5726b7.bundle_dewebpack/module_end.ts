function validateEnd(currentPosition: number, dataLength: number): void {
  if (currentPosition !== dataLength) {
    throw new Error("extra data found");
  }
}