export const numeric = {
  version: "1.2.6",
  precision: 4,
  largeArray: 50,
  epsilon: 2.220446049250313e-16,

  bench(func: () => void, timeLimit: number = 15): number {
    let iterations: number;
    let elapsed: number;
    let count: number;

    iterations = 0.5;
    const startTime = new Date().getTime();

    while (true) {
      iterations *= 2;
      count = iterations;

      while (count > 3) {
        func();
        func();
        func();
        func();
        count -= 4;
      }

      while (count > 0) {
        func();
        count--;
      }

      if (new Date().getTime() - startTime > timeLimit) break;
    }

    count = iterations;
    while (count > 3) {
      func();
      func();
      func();
      func();
      count -= 4;
    }

    while (count > 0) {
      func();
      count--;
    }

    elapsed = new Date().getTime() - startTime;
    return (1000 * (3 * iterations - 1)) / elapsed;
  },

  _myIndexOf<T>(this: T[], element: T): number {
    const length = this.length;
    for (let index = 0; index < length; ++index) {
      if (this[index] === element) return index;
    }
    return -1;
  },

  myIndexOf:
    Array.prototype.indexOf || numeric._myIndexOf,

  Function: Function,

  prettyPrint(value: unknown): string {
    const buffer: string[] = [];

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
        const scientific = formatNumber(item);
        const precision = item.toPrecision(numeric.precision);
        const standard = parseFloat(item.toString()).toString();
        const candidates = [
          scientific,
          precision,
          standard,
          parseFloat(precision).toString(),
          parseFloat(standard).toString(),
        ];

        let shortest = scientific;
        for (let i = 1; i < candidates.length; i++) {
          if (candidates[i].length < shortest.length) {
            shortest = candidates[i];
          }
        }

        buffer.push(
          Array(numeric.precision + 8 - shortest.length).join(" ") + shortest
        );
        return false;
      }

      if (item === null) {
        buffer.push("null");
        return false;
      }

      if (typeof item === "function") {
        buffer.push(item.toString());
        let hasProperties = false;
        for (const key in item as object) {
          if ((item as object).hasOwnProperty(key)) {
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
      for (const key in item as object) {
        if ((item as object).hasOwnProperty(key)) {
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

    process(value);
    return buffer.join("");
  },
};