/**
 * Performs bitwise operations based on SHA-1 round function
 */
function bitwiseOperation(round: number, b: number, c: number, d: number): number {
    switch (round) {
        case 0:
            return (b & c) ^ (~b & d);
        case 1:
        case 3:
            return b ^ c ^ d;
        case 2:
            return (b & c) ^ (b & d) ^ (c & d);
        default:
            return 0;
    }
}

/**
 * Performs left rotation on a 32-bit value
 */
function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
}

/**
 * SHA-1 hash function implementation
 * @param input - String or array-like input to hash
 * @returns Array of 20 bytes representing the SHA-1 hash
 */
export default function sha1(input: string | number[] | ArrayLike<number>): number[] {
    const K_CONSTANTS = [1518500249, 1859775393, 2400959708, 3395469782];
    const INITIAL_HASH = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    
    let bytes: number[];

    if (typeof input === "string") {
        const encoded = unescape(encodeURIComponent(input));
        bytes = [];
        for (let i = 0; i < encoded.length; ++i) {
            bytes.push(encoded.charCodeAt(i));
        }
    } else if (Array.isArray(input)) {
        bytes = input;
    } else {
        bytes = Array.prototype.slice.call(input);
    }

    bytes.push(128);

    const messageLength = bytes.length / 4 + 2;
    const blockCount = Math.ceil(messageLength / 16);
    const blocks = new Array<Uint32Array>(blockCount);

    for (let blockIndex = 0; blockIndex < blockCount; ++blockIndex) {
        const block = new Uint32Array(16);
        for (let wordIndex = 0; wordIndex < 16; ++wordIndex) {
            block[wordIndex] = 
                (bytes[64 * blockIndex + 4 * wordIndex] << 24) |
                (bytes[64 * blockIndex + 4 * wordIndex + 1] << 16) |
                (bytes[64 * blockIndex + 4 * wordIndex + 2] << 8) |
                bytes[64 * blockIndex + 4 * wordIndex + 3];
        }
        blocks[blockIndex] = block;
    }

    blocks[blockCount - 1][14] = Math.floor((8 * (bytes.length - 1)) / Math.pow(2, 32));
    blocks[blockCount - 1][15] = (8 * (bytes.length - 1)) & 4294967295;

    for (let blockIndex = 0; blockIndex < blockCount; ++blockIndex) {
        const words = new Uint32Array(80);

        for (let i = 0; i < 16; ++i) {
            words[i] = blocks[blockIndex][i];
        }

        for (let i = 16; i < 80; ++i) {
            words[i] = rotateLeft(
                words[i - 3] ^ words[i - 8] ^ words[i - 14] ^ words[i - 16],
                1
            );
        }

        let a = INITIAL_HASH[0];
        let b = INITIAL_HASH[1];
        let c = INITIAL_HASH[2];
        let d = INITIAL_HASH[3];
        let e = INITIAL_HASH[4];

        for (let i = 0; i < 80; ++i) {
            const roundIndex = Math.floor(i / 20);
            const temp = (rotateLeft(a, 5) + bitwiseOperation(roundIndex, b, c, d) + e + K_CONSTANTS[roundIndex] + words[i]) >>> 0;
            
            e = d;
            d = c;
            c = rotateLeft(b, 30) >>> 0;
            b = a;
            a = temp;
        }

        INITIAL_HASH[0] = (INITIAL_HASH[0] + a) >>> 0;
        INITIAL_HASH[1] = (INITIAL_HASH[1] + b) >>> 0;
        INITIAL_HASH[2] = (INITIAL_HASH[2] + c) >>> 0;
        INITIAL_HASH[3] = (INITIAL_HASH[3] + d) >>> 0;
        INITIAL_HASH[4] = (INITIAL_HASH[4] + e) >>> 0;
    }

    return [
        (INITIAL_HASH[0] >> 24) & 255,
        (INITIAL_HASH[0] >> 16) & 255,
        (INITIAL_HASH[0] >> 8) & 255,
        INITIAL_HASH[0] & 255,
        (INITIAL_HASH[1] >> 24) & 255,
        (INITIAL_HASH[1] >> 16) & 255,
        (INITIAL_HASH[1] >> 8) & 255,
        INITIAL_HASH[1] & 255,
        (INITIAL_HASH[2] >> 24) & 255,
        (INITIAL_HASH[2] >> 16) & 255,
        (INITIAL_HASH[2] >> 8) & 255,
        INITIAL_HASH[2] & 255,
        (INITIAL_HASH[3] >> 24) & 255,
        (INITIAL_HASH[3] >> 16) & 255,
        (INITIAL_HASH[3] >> 8) & 255,
        INITIAL_HASH[3] & 255,
        (INITIAL_HASH[4] >> 24) & 255,
        (INITIAL_HASH[4] >> 16) & 255,
        (INITIAL_HASH[4] >> 8) & 255,
        INITIAL_HASH[4] & 255
    ];
}