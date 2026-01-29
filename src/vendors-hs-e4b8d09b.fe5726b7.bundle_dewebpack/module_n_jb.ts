const numeric = {
  version: "1.2.6",

  bench(fn: () => void, timeMs: number = 15): number {
    let iterations: number;
    let currentIterations: number;
    let halfTime = 0.5;
    const startTime = new Date().getTime();

    while (true) {
      currentIterations = halfTime *= 2;
      while (currentIterations > 3) {
        fn();
        fn();
        fn();
        fn();
        currentIterations -= 4;
      }
      while (currentIterations > 0) {
        fn();
        currentIterations--;
      }
      if (new Date().getTime() - startTime > timeMs) break;
    }

    currentIterations = halfTime;
    while (currentIterations > 3) {
      fn();
      fn();
      fn();
      fn();
      currentIterations -= 4;
    }
    while (currentIterations > 0) {
      fn();
      currentIterations--;
    }

    return (1000 * (3 * halfTime - 1)) / (new Date().getTime() - startTime);
  },

  _myIndexOf(this: unknown[], element: unknown): number {
    const length = this.length;
    for (let i = 0; i < length; ++i) {
      if (this[i] === element) return i;
    }
    return -1;
  },

  myIndexOf: Array.prototype.indexOf || numeric._myIndexOf,

  Function: Function,
  precision: 4,
  largeArray: 50,

  prettyPrint(value: unknown): string {
    function formatNumber(num: number): string {
      if (num === 0) return "0";
      if (isNaN(num)) return "NaN";
      if (num < 0) return "-" + formatNumber(-num);
      if (isFinite(num)) {
        let exponent = Math.floor(Math.log(num) / Math.log(10));
        let mantissa = num / Math.pow(10, exponent);
        let formatted = mantissa.toPrecision(numeric.precision);
        if (parseFloat(formatted) === 10) {
          exponent++;
          mantissa = 1;
          formatted = mantissa.toPrecision(numeric.precision);
        }
        return parseFloat(formatted).toString() + "e" + exponent.toString();
      }
      return "Infinity";
    }

    const output: string[] = [];

    function printValue(val: unknown): boolean {
      if (val === undefined) {
        output.push(Array(numeric.precision + 8).join(" "));
        return false;
      }
      if (typeof val === "string") {
        output.push('"' + val + '"');
        return false;
      }
      if (typeof val === "boolean") {
        output.push(val.toString());
        return false;
      }
      if (typeof val === "number") {
        const exponential = formatNumber(val);
        const precisionStr = val.toPrecision(numeric.precision);
        const plainStr = parseFloat(val.toString()).toString();
        const candidates = [
          exponential,
          precisionStr,
          plainStr,
          parseFloat(precisionStr).toString(),
          parseFloat(plainStr).toString()
        ];
        let shortest = exponential;
        for (let i = 1; i < candidates.length; i++) {
          if (candidates[i].length < shortest.length) {
            shortest = candidates[i];
          }
        }
        output.push(
          Array(numeric.precision + 8 - shortest.length).join(" ") + shortest
        );
        return false;
      }
      if (val === null) {
        output.push("null");
        return false;
      }
      if (typeof val === "function") {
        output.push(val.toString());
        let hasProps = false;
        for (const key in val as object) {
          if ((val as object).hasOwnProperty(key)) {
            if (hasProps) {
              output.push(",\n");
            } else {
              output.push("\n{\n");
            }
            hasProps = true;
            output.push(key);
            output.push(": ");
            printValue((val as Record<string, unknown>)[key]);
          }
        }
        if (hasProps) output.push("}\n");
        return true;
      }
      if (val instanceof Array) {
        if (val.length > numeric.largeArray) {
          output.push("...Large Array...");
          return true;
        }
        let multiline = false;
        output.push("[");
        for (let i = 0; i < val.length; i++) {
          if (i > 0) {
            output.push(", ");
            if (multiline) output.push("\n ");
          }
          multiline = printValue(val[i]);
        }
        output.push("]");
        return true;
      }
      output.push("{\n");
      let first = false;
      for (const key in val as object) {
        if ((val as object).hasOwnProperty(key)) {
          if (first) output.push(",\n");
          first = true;
          output.push(key);
          output.push(": ");
          printValue((val as Record<string, unknown>)[key]);
        }
      }
      output.push("}");
      return true;
    }

    printValue(value);
    return output.join("");
  },

  parseDate(input: string | string[]): number | number[] {
    function parse(val: string | string[]): number | number[] {
      if (typeof val === "string") {
        return Date.parse(val.replace(/-/g, "/"));
      }
      if (!(val instanceof Array)) {
        throw new Error("parseDate: parameter must be arrays of strings");
      }
      const result: number[] = [];
      for (let i = 0; i < val.length; i++) {
        result[i] = parse(val[i]) as number;
      }
      return result;
    }
    return parse(input);
  },

  parseFloat(input: string | string[]): number | number[] {
    function parse(val: string | string[]): number | number[] {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      if (!(val instanceof Array)) {
        throw new Error("parseFloat: parameter must be arrays of strings");
      }
      const result: number[] = [];
      for (let i = 0; i < val.length; i++) {
        result[i] = parse(val[i]) as number;
      }
      return result;
    }
    return parse(input);
  },

  parseCSV(text: string): (number | string)[][] {
    const lines = text.split("\n");
    const result: (number | string)[][] = [];
    const lineRegex = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
    const numberRegex = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
    
    const trimComma = (str: string) => str.substr(0, str.length - 1);
    
    let rowIndex = 0;
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const matches = (lines[lineNum] + ",").match(lineRegex);
      if (matches && matches.length > 0) {
        result[rowIndex] = [];
        for (let col = 0; col < matches.length; col++) {
          const value = trimComma(matches[col]);
          if (numberRegex.test(value)) {
            result[rowIndex][col] = parseFloat(value);
          } else {
            result[rowIndex][col] = value;
          }
        }
        rowIndex++;
      }
    }
    return result;
  },

  toCSV(matrix: unknown[][]): string {
    const dimensions = numeric.dim(matrix);
    const rows = dimensions[0];
    const output: string[] = [];
    
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < rows; j++) {
        row[j] = matrix[i][j].toString();
      }
      output[i] = row.join(", ");
    }
    return output.join("\n") + "\n";
  },

  getURL(url: string): XMLHttpRequest {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    return xhr;
  },

  imageURL(channels: number[][][]): string {
    function crc32(data: number[], start: number = 0, end: number = data.length): number {
      const crcTable = [
        0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035,
        249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049,
        // ... (full CRC table - truncated for brevity)
      ];
      let crc = -1;
      for (let i = start; i < end; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 255];
      }
      return crc ^ -1;
    }

    const width = channels[0][0].length;
    const height = channels[0].length;
    const pngData = [
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
      (width >> 24) & 255, (width >> 16) & 255, (width >> 8) & 255, width & 255,
      (height >> 24) & 255, (height >> 16) & 255, (height >> 8) & 255, height & 255,
      8, 2, 0, 0, 0, -1, -2, -3, -4, -5, -6, -7, -8,
      73, 68, 65, 84, 8, 29
    ];

    let headerCrc = crc32(pngData, 12, 29);
    pngData[29] = (headerCrc >> 24) & 255;
    pngData[30] = (headerCrc >> 16) & 255;
    pngData[31] = (headerCrc >> 8) & 255;
    pngData[32] = headerCrc & 255;

    let adler32a = 1;
    let adler32b = 0;

    for (let row = 0; row < height; row++) {
      if (row < height - 1) {
        pngData.push(0);
      } else {
        pngData.push(1);
      }
      
      const blockSize = 3 * width + 1 + (row === 0 ? 1 : 0);
      const low = blockSize & 255;
      const high = (blockSize >> 8) & 255;
      
      pngData.push(low);
      pngData.push(high);
      pngData.push(~low & 255);
      pngData.push(~high & 255);
      
      if (row === 0) pngData.push(0);
      
      for (let col = 0; col < width; col++) {
        for (let channel = 0; channel < 3; channel++) {
          let pixelValue = channels[channel][row][col];
          pixelValue = pixelValue > 255 ? 255 : pixelValue < 0 ? 0 : Math.round(pixelValue);
          adler32b = (adler32b + (adler32a = (adler32a + pixelValue) % 65521)) % 65521;
          pngData.push(pixelValue);
        }
      }
      pngData.push(0);
    }

    const adler32 = (adler32b << 16) + adler32a;
    pngData.push((adler32 >> 24) & 255);
    pngData.push((adler32 >> 16) & 255);
    pngData.push((adler32 >> 8) & 255);
    pngData.push(adler32 & 255);

    const dataLength = pngData.length - 41;
    pngData[33] = (dataLength >> 24) & 255;
    pngData[34] = (dataLength >> 16) & 255;
    pngData[35] = (dataLength >> 8) & 255;
    pngData[36] = dataLength & 255;

    const dataCrc = crc32(pngData, 37);
    pngData.push((dataCrc >> 24) & 255);
    pngData.push((dataCrc >> 16) & 255);
    pngData.push((dataCrc >> 8) & 255);
    pngData.push(dataCrc & 255);
    pngData.push(0, 0, 0, 0);
    pngData.push(73, 69, 78, 68);
    pngData.push(174, 66, 96, 130);

    function base64Encode(bytes: number[]): string {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let result = "";
      const length = bytes.length;
      
      for (let i = 0; i < length; i += 3) {
        const byte1 = bytes[i];
        const byte2 = bytes[i + 1];
        const byte3 = bytes[i + 2];
        
        const enc1 = byte1 >> 2;
        const enc2 = ((byte1 & 3) << 4) + (byte2 >> 4);
        let enc3 = ((byte2 & 15) << 2) + (byte3 >> 6);
        let enc4 = byte3 & 63;
        
        if (i + 1 >= length) {
          enc3 = enc4 = 64;
        } else if (i + 2 >= length) {
          enc4 = 64;
        }
        
        result += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
      }
      return result;
    }

    return "data:image/png;base64," + base64Encode(pngData);
  },

  _dim(array: unknown): number[] {
    const dimensions: number[] = [];
    let current: unknown = array;
    while (typeof current === "object" && current !== null) {
      dimensions.push((current as unknown[]).length);
      current = (current as unknown[])[0];
    }
    return dimensions;
  },

  dim(array: unknown): number[] {
    if (typeof array !== "object") return [];
    const firstElem = (array as unknown[])[0];
    if (typeof firstElem === "object" && firstElem !== null) {
      const secondElem = (firstElem as unknown[])[0];
      if (typeof secondElem === "object" && secondElem !== null) {
        return numeric._dim(array);
      }
      return [(array as unknown[]).length, (firstElem as unknown[]).length];
    }
    return [(array as unknown[]).length];
  }
};

export default numeric;