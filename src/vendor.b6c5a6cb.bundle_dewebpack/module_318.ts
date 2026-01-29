interface Word {
  high: number;
  low: number;
  create(high: number, low: number): Word;
}

interface WordArray {
  words: Word[];
  sigBytes: number;
  init(words: Word[]): WordArray;
  toX32(): WordArray;
}

interface Hasher {
  _hash: WordArray;
  _data: { words: number[]; sigBytes: number };
  _nDataBytes: number;
  _process(): void;
  clone(): Hasher;
  extend(config: HasherConfig): typeof SHA512Hasher;
  _createHelper(hasher: typeof SHA512Hasher): (message: unknown, key?: unknown) => WordArray;
  _createHmacHelper(hasher: typeof SHA512Hasher): (message: unknown, key: unknown) => WordArray;
}

interface HasherConfig {
  _doReset(): void;
  _doProcessBlock(words: number[], offset: number): void;
  _doFinalize(): WordArray;
  clone(): SHA512Hasher;
  blockSize: number;
}

interface CryptoLib {
  lib: {
    Hasher: Hasher;
  };
  x64: {
    Word: Word;
    WordArray: WordArray;
  };
  algo: Record<string, unknown>;
  SHA512?: (message: unknown, key?: unknown) => WordArray;
  HmacSHA512?: (message: unknown, key: unknown) => WordArray;
}

const BLOCK_SIZE = 32;
const FINALIZE_PADDING_SHIFT = 24;
const FINALIZE_INDEX_OFFSET_1 = 30;
const FINALIZE_INDEX_OFFSET_2 = 31;
const FINALIZE_BIT_SHIFT = 128;
const FINALIZE_BLOCK_SHIFT = 10;
const FINALIZE_BLOCK_SIZE = 5;
const WORD_SIZE_DIVISOR = 4294967296;
const ROUNDS = 80;
const ROUND_16_THRESHOLD = 16;
const WORD_ARRAY_SIZE = 4;

const SHA512_CONSTANTS: Array<[number, number]> = [
  [1116352408, 3609767458], [1899447441, 602891725], [3049323471, 3964484399],
  [3921009573, 2173295548], [961987163, 4081628472], [1508970993, 3053834265],
  [2453635748, 2937671579], [2870763221, 3664609560], [3624381080, 2734883394],
  [310598401, 1164996542], [607225278, 1323610764], [1426881987, 3590304994],
  [1925078388, 4068182383], [2162078206, 991336113], [2614888103, 633803317],
  [3248222580, 3479774868], [3835390401, 2666613458], [4022224774, 944711139],
  [264347078, 2341262773], [604807628, 2007800933], [770255983, 1495990901],
  [1249150122, 1856431235], [1555081692, 3175218132], [1996064986, 2198950837],
  [2554220882, 3999719339], [2821834349, 766784016], [2952996808, 2566594879],
  [3210313671, 3203337956], [3336571891, 1034457026], [3584528711, 2466948901],
  [113926993, 3758326383], [338241895, 168717936], [666307205, 1188179964],
  [773529912, 1546045734], [1294757372, 1522805485], [1396182291, 2643833823],
  [1695183700, 2343527390], [1986661051, 1014477480], [2177026350, 1206759142],
  [2456956037, 344077627], [2730485921, 1290863460], [2820302411, 3158454273],
  [3259730800, 3505952657], [3345764771, 106217008], [3516065817, 3606008344],
  [3600352804, 1432725776], [4094571909, 1467031594], [275423344, 851169720],
  [430227734, 3100823752], [506948616, 1363258195], [659060556, 3750685593],
  [883997877, 3785050280], [958139571, 3318307427], [1322822218, 3812723403],
  [1537002063, 2003034995], [1747873779, 3602036899], [1955562222, 1575990012],
  [2024104815, 1125592928], [2227730452, 2716904306], [2361852424, 442776044],
  [2428436474, 593698344], [2756734187, 3733110249], [3204031479, 2999351573],
  [3329325298, 3815920427], [3391569614, 3928383900], [3515267271, 566280711],
  [3940187606, 3454069534], [4118630271, 4000239992], [116418474, 1914138554],
  [174292421, 2731055270], [289380356, 3203993006], [460393269, 320620315],
  [685471733, 587496836], [852142971, 1086792851], [1017036298, 365543100],
  [1126000580, 2618297676], [1288033470, 3409855158], [1501505948, 4234509866],
  [1607167915, 987167468], [1816402316, 1246189591]
];

class SHA512Hasher implements Hasher {
  _hash!: WordArray;
  _data!: { words: number[]; sigBytes: number };
  _nDataBytes!: number;

  static blockSize = BLOCK_SIZE;

  _doReset(): void {
    const Word = (globalThis as any).CryptoJS.x64.Word;
    const WordArray = (globalThis as any).CryptoJS.x64.WordArray;
    
    this._hash = new WordArray.init([
      new Word.init(1779033703, 4089235720),
      new Word.init(3144134277, 2227873595),
      new Word.init(1013904242, 4271175723),
      new Word.init(2773480762, 1595750129),
      new Word.init(1359893119, 2917565137),
      new Word.init(2600822924, 725511199),
      new Word.init(528734635, 4215389547),
      new Word.init(1541459225, 327033209)
    ]);
  }

  _doProcessBlock(words: number[], offset: number): void {
    const hashWords = this._hash.words;
    const Word = (globalThis as any).CryptoJS.x64.Word;
    
    const scheduleWords: Word[] = [];
    for (let i = 0; i < ROUNDS; i++) {
      scheduleWords[i] = Word.create(0, 0);
    }

    const roundConstants: Word[] = SHA512_CONSTANTS.map(([high, low]) => 
      Word.create(high, low)
    );

    let [h0, h1, h2, h3, h4, h5, h6, h7] = hashWords;
    let [aHigh, aLow] = [h0.high, h0.low];
    let [bHigh, bLow] = [h1.high, h1.low];
    let [cHigh, cLow] = [h2.high, h2.low];
    let [dHigh, dLow] = [h3.high, h3.low];
    let [eHigh, eLow] = [h4.high, h4.low];
    let [fHigh, fLow] = [h5.high, h5.low];
    let [gHigh, gLow] = [h6.high, h6.low];
    let [hHigh, hLow] = [h7.high, h7.low];

    for (let round = 0; round < ROUNDS; round++) {
      const scheduleWord = scheduleWords[round];
      let wHigh: number;
      let wLow: number;

      if (round < ROUND_16_THRESHOLD) {
        wHigh = scheduleWord.high = words[offset + 2 * round] | 0;
        wLow = scheduleWord.low = words[offset + 2 * round + 1] | 0;
      } else {
        const w15 = scheduleWords[round - 15];
        const w15High = w15.high;
        const w15Low = w15.low;
        const sigma0High = ((w15High >>> 1) | (w15Low << 31)) ^ ((w15High >>> 8) | (w15Low << 24)) ^ (w15High >>> 7);
        const sigma0Low = ((w15Low >>> 1) | (w15High << 31)) ^ ((w15Low >>> 8) | (w15High << 24)) ^ ((w15Low >>> 7) | (w15High << 25));

        const w2 = scheduleWords[round - 2];
        const w2High = w2.high;
        const w2Low = w2.low;
        const sigma1High = ((w2High >>> 19) | (w2Low << 13)) ^ ((w2High << 3) | (w2Low >>> 29)) ^ (w2High >>> 6);
        const sigma1Low = ((w2Low >>> 19) | (w2High << 13)) ^ ((w2Low << 3) | (w2High >>> 29)) ^ ((w2Low >>> 6) | (w2High << 26));

        const w7 = scheduleWords[round - 7];
        const w7High = w7.high;
        const w7Low = w7.low;

        const w16 = scheduleWords[round - 16];
        const w16High = w16.high;
        const w16Low = w16.low;

        wLow = sigma0Low + w7Low;
        wHigh = sigma0High + w7High + (wLow >>> 0 < sigma0Low >>> 0 ? 1 : 0);
        wLow += sigma1Low;
        wHigh = wHigh + sigma1High + (wLow >>> 0 < sigma1Low >>> 0 ? 1 : 0);
        wLow += w16Low;
        wHigh = wHigh + w16High + (wLow >>> 0 < w16Low >>> 0 ? 1 : 0);

        scheduleWord.high = wHigh;
        scheduleWord.low = wLow;
      }

      const chHigh = (eHigh & fHigh) ^ (~eHigh & gHigh);
      const chLow = (eLow & fLow) ^ (~eLow & gLow);
      const majHigh = (aHigh & bHigh) ^ (aHigh & cHigh) ^ (bHigh & cHigh);
      const majLow = (aLow & bLow) ^ (aLow & cLow) ^ (bLow & cLow);

      const sigma0High = ((aHigh >>> 28) | (aLow << 4)) ^ ((aHigh << 30) | (aLow >>> 2)) ^ ((aHigh << 25) | (aLow >>> 7));
      const sigma0Low = ((aLow >>> 28) | (aHigh << 4)) ^ ((aLow << 30) | (aHigh >>> 2)) ^ ((aLow << 25) | (aHigh >>> 7));
      const sigma1High = ((eHigh >>> 14) | (eLow << 18)) ^ ((eHigh >>> 18) | (eLow << 14)) ^ ((eHigh << 23) | (eLow >>> 9));
      const sigma1Low = ((eLow >>> 14) | (eHigh << 18)) ^ ((eLow >>> 18) | (eHigh << 14)) ^ ((eLow << 23) | (eHigh >>> 9));

      const k = roundConstants[round];
      const kHigh = k.high;
      const kLow = k.low;

      let t1Low = hLow + sigma1Low;
      let t1High = hHigh + sigma1High + (t1Low >>> 0 < hLow >>> 0 ? 1 : 0);
      t1Low += chLow;
      t1High = t1High + chHigh + (t1Low >>> 0 < chLow >>> 0 ? 1 : 0);
      t1Low += kLow;
      t1High = t1High + kHigh + (t1Low >>> 0 < kLow >>> 0 ? 1 : 0);
      t1Low += wLow;
      t1High = t1High + wHigh + (t1Low >>> 0 < wLow >>> 0 ? 1 : 0);

      const t2Low = sigma0Low + majLow;
      const t2High = sigma0High + majHigh + (t2Low >>> 0 < sigma0Low >>> 0 ? 1 : 0);

      hHigh = gHigh;
      hLow = gLow;
      gHigh = fHigh;
      gLow = fLow;
      fHigh = eHigh;
      fLow = eLow;
      eLow = (dLow + t1Low) | 0;
      eHigh = (dHigh + t1High + (eLow >>> 0 < dLow >>> 0 ? 1 : 0)) | 0;
      dHigh = cHigh;
      dLow = cLow;
      cHigh = bHigh;
      cLow = bLow;
      bHigh = aHigh;
      bLow = aLow;
      aLow = (t1Low + t2Low) | 0;
      aHigh = (t1High + t2High + (aLow >>> 0 < t1Low >>> 0 ? 1 : 0)) | 0;
    }

    h0.low = h0.low + aLow;
    h0.high = h0.high + aHigh + (h0.low >>> 0 < aLow >>> 0 ? 1 : 0);
    h1.low = h1.low + bLow;
    h1.high = h1.high + bHigh + (h1.low >>> 0 < bLow >>> 0 ? 1 : 0);
    h2.low = h2.low + cLow;
    h2.high = h2.high + cHigh + (h2.low >>> 0 < cLow >>> 0 ? 1 : 0);
    h3.low = h3.low + dLow;
    h3.high = h3.high + dHigh + (h3.low >>> 0 < dLow >>> 0 ? 1 : 0);
    h4.low = h4.low + eLow;
    h4.high = h4.high + eHigh + (h4.low >>> 0 < eLow >>> 0 ? 1 : 0);
    h5.low = h5.low + fLow;
    h5.high = h5.high + fHigh + (h5.low >>> 0 < fLow >>> 0 ? 1 : 0);
    h6.low = h6.low + gLow;
    h6.high = h6.high + gHigh + (h6.low >>> 0 < gLow >>> 0 ? 1 : 0);
    h7.low = h7.low + hLow;
    h7.high = h7.high + hHigh + (h7.low >>> 0 < hLow >>> 0 ? 1 : 0);
  }

  _doFinalize(): WordArray {
    const data = this._data;
    const dataWords = data.words;
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;

    dataWords[nBitsLeft >>> 5] |= 0x80 << (FINALIZE_PADDING_SHIFT - (nBitsLeft % BLOCK_SIZE));
    dataWords[FINALIZE_INDEX_OFFSET_1 + (((nBitsLeft + FINALIZE_BIT_SHIFT) >>> FINALIZE_BLOCK_SHIFT) << FINALIZE_BLOCK_SIZE)] = 
      Math.floor(nBitsTotal / WORD_SIZE_DIVISOR);
    dataWords[FINALIZE_INDEX_OFFSET_2 + (((nBitsLeft + FINALIZE_BIT_SHIFT) >>> FINALIZE_BLOCK_SHIFT) << FINALIZE_BLOCK_SIZE)] = 
      nBitsTotal;
    data.sigBytes = dataWords.length * WORD_ARRAY_SIZE;

    this._process();

    return this._hash.toX32();
  }

  clone(): SHA512Hasher {
    const clone = Object.create(Object.getPrototypeOf(this)) as SHA512Hasher;
    Object.assign(clone, this);
    clone._hash = Object.create(Object.getPrototypeOf(this._hash));
    Object.assign(clone._hash, this._hash);
    return clone;
  }

  _process(): void {
    throw new Error("Method not implemented.");
  }

  blockSize = BLOCK_SIZE;
}

export function initSHA512(cryptoLib: CryptoLib): typeof SHA512Hasher {
  const hasherBase = cryptoLib.lib.Hasher;
  const SHA512 = hasherBase.extend({
    _doReset: SHA512Hasher.prototype._doReset,
    _doProcessBlock: SHA512Hasher.prototype._doProcessBlock,
    _doFinalize: SHA512Hasher.prototype._doFinalize,
    clone: SHA512Hasher.prototype.clone,
    blockSize: BLOCK_SIZE
  });

  cryptoLib.SHA512 = hasherBase._createHelper(SHA512);
  cryptoLib.HmacSHA512 = hasherBase._createHmacHelper(SHA512);

  return SHA512;
}