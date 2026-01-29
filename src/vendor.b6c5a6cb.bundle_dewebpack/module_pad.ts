function padData(data: { sigBytes: number; concat: (padding: any) => void }, blockSize: number): void {
    const blockSizeInBytes = 4 * blockSize;
    const paddingLength = blockSizeInBytes - data.sigBytes % blockSizeInBytes;
    const paddingByte = paddingLength << 24 | paddingLength << 16 | paddingLength << 8 | paddingLength;
    const paddingWords: number[] = [];
    
    for (let offset = 0; offset < paddingLength; offset += 4) {
        paddingWords.push(paddingByte);
    }
    
    const paddingWordArray = i.create(paddingWords, paddingLength);
    data.concat(paddingWordArray);
}