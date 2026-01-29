export class IDGenerate {
  private _old2new: Map<string, number>;
  private _new2old: Map<number, Array<number | string>>;
  private _idcount: number;

  constructor() {
    this._old2new = new Map();
    this._new2old = new Map();
    this._idcount = 2;
  }

  /**
   * Generates and returns a new unique ID
   */
  applyId(): number {
    return this._idcount++;
  }

  /**
   * Gets or creates an ID for the given array of values
   * @param values - Array of numbers or strings to generate ID for
   * @returns The ID associated with the sorted values
   */
  getid(values: Array<number | string>): number {
    if (values.length === 0) {
      return 1;
    }

    values.sort((a, b) => {
      const aIsInteger = Number.isInteger(a);
      const bIsInteger = Number.isInteger(b);

      if (aIsInteger) {
        if (bIsInteger) {
          return a < b ? -1 : a === b ? 0 : 1;
        }
        return -1;
      }

      if (bIsInteger) {
        return 1;
      }

      return a < b ? -1 : a === b ? 0 : 1;
    });

    const key = JSON.stringify(values);

    if (this._old2new.has(key)) {
      return this._old2new.get(key)!;
    }

    this._old2new.set(key, this._idcount);
    this._new2old.set(this._idcount, values);
    return this._idcount++;
  }

  /**
   * Retrieves the original array of values associated with an ID
   * @param id - The ID to look up
   * @returns The original array of values, or empty array if not found
   */
  getold(id?: number): Array<number | string> {
    return id ? this._new2old.get(id) ?? [] : [];
  }
}