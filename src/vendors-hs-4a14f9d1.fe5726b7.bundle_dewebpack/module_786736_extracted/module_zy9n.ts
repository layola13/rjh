export const numeric = {
  version: "1.2.6",
  precision: 4,
  largeArray: 50,

  bench(fn: () => void, maxTime: number = 15): number {
    let iterations: number;
    let startTime: number;
    let currentIterations: number;

    iterations = 0.5;
    startTime = new Date().getTime();

    while (true) {
      iterations *= 2;
      currentIterations = iterations;
      
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
      
      if (new Date().getTime() - startTime > maxTime) break;
    }

    currentIterations = iterations;
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

    return (1000 * (3 * iterations - 1)) / (new Date().getTime() - startTime);
  },

  _myIndexOf<T>(this: T[], value: T): number {
    const length = this.length;
    for (let i = 0; i < length; ++i) {
      if (this[i] === value) return i;
    }
    return -1;
  },

  myIndexOf: Array.prototype.indexOf || numeric._myIndexOf,

  Function: Function,

  prettyPrint(obj: unknown): string {
    const buffer: string[] = [];

    function formatNumber(value: number): string {
      if (value === 0) return "0";
      if (isNaN(value)) return "NaN";
      if (value < 0) return "-" + formatNumber(-value);
      
      if (isFinite(value)) {
        let exponent = Math.floor(Math.log(value) / Math.log(10));
        let mantissa = value / Math.pow(10, exponent);
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

    function process(item: unknown): boolean {
      if (item === undefined) {
        buffer.push(Array(numeric.precision + 8).join(" "));
        return false;
      }
      
      if (typeof item === "string") {
        buffer.push('"' + item + '"');
        return false;
      }
      
      if (typeof item === "boolean") {
        buffer.push(item.toString());
        return false;
      }
      
      if (typeof item === "number") {
        const exponential = formatNumber(item);
        const precision = item.toPrecision(numeric.precision);
        const standard = parseFloat(item.toString()).toString();
        const candidates = [
          exponential,
          precision,
          standard,
          parseFloat(precision).toString(),
          parseFloat(standard).toString()
        ];
        
        let shortest = exponential;
        for (let i = 1; i < candidates.length; i++) {
          if (candidates[i].length < shortest.length) {
            shortest = candidates[i];
          }
        }
        
        buffer.push(Array(numeric.precision + 8 - shortest.length).join(" ") + shortest);
        return false;
      }
      
      if (item === null) {
        buffer.push("null");
        return false;
      }
      
      if (typeof item === "function") {
        buffer.push(item.toString());
        let hasProperties = false;
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            if (hasProperties) {
              buffer.push(",\n");
            } else {
              buffer.push("\n{\n");
            }
            hasProperties = true;
            buffer.push(key);
            buffer.push(": \n");
            process((item as Record<string, unknown>)[key]);
          }
        }
        if (hasProperties) buffer.push("\n}\n");
        return true;
      }
      
      if (item instanceof Array) {
        if (item.length > numeric.largeArray) {
          buffer.push("...Large Array...");
          return true;
        }
        
        let multiline = false;
        buffer.push("[");
        for (let i = 0; i < item.length; i++) {
          if (i > 0) {
            buffer.push(", ");
            if (multiline) buffer.push("\n ");
          }
          multiline = process(item[i]);
        }
        buffer.push("]");
        return true;
      }
      
      buffer.push("{\n");
      let hasProperties = false;
      for (const key in item) {
        if ((item as Record<string, unknown>).hasOwnProperty(key)) {
          if (hasProperties) buffer.push(",\n");
          hasProperties = true;
          buffer.push(key);
          buffer.push(": \n");
          process((item as Record<string, unknown>)[key]);
        }
      }
      buffer.push("\n}");
      return true;
    }

    process(obj);
    return buffer.join("");
  }
};

export default numeric;