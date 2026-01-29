export enum IDGeneratorType {
  Entity = "entity",
  ExSketch = "exsketch",
  State = "state",
  Constraint = "constraint",
  Association = "association",
  Material = "material",
  Pave = "pave",
  Request = "request",
  Temp = "temp"
}

Object.freeze(IDGeneratorType);

const MAX_ID_DIFF_THRESHOLD = 10000000;

type GeneratorKey = object | string;

export class IDGenerator {
  private static readonly _defaultKey: object = {};
  private static readonly _generators = new WeakMap<GeneratorKey, (initialId?: number) => IDGenerator>();

  private _nextId: number;

  constructor(initialId: number = 1) {
    this._nextId = initialId || 1;
  }

  /**
   * Logs a warning when the ID difference exceeds the threshold
   */
  private logOverlengthId(functionName: string, nextId: number, prevId: number): void {
    if (nextId - prevId > MAX_ID_DIFF_THRESHOLD) {
      const message = `${functionName} entityId overlength`;
      const errorData = {
        errorStack: new Error(message),
        description: message,
        errorInfo: {
          nextId,
          prevId,
          function: functionName
        }
      };
      log.error(message, "HSCore.Util.IDGenerator", true, errorData);
    }
  }

  /**
   * Generate next ID, optionally syncing with a provided ID
   */
  public generate(existingId?: string): string {
    let resultId = existingId;

    if (resultId) {
      const numericId = Number(resultId) + 1;
      assert(
        !Number.isNaN(numericId),
        "Entity Id should be a valid number",
        "HSCore.Util"
      );
      this.logOverlengthId("generate", numericId, this._nextId);

      if (numericId > this._nextId) {
        this._nextId = numericId;
      }
    } else {
      resultId = String(this._nextId++);
    }

    return resultId;
  }

  /**
   * Get the next ID without incrementing
   */
  public getNextId(): number {
    return this._nextId;
  }

  /**
   * Sync the internal ID counter with an external ID
   */
  public syncId(externalId: string | number): void {
    const numericId = Number(externalId);
    this.logOverlengthId("syncId", numericId, this._nextId);

    if (numericId > this._nextId) {
      this._nextId = numericId;
    }
  }

  /**
   * Reset the ID counter to a specific value
   */
  public resetId(newId: string | number): void {
    const numericId = Number(newId);
    if (!Number.isNaN(numericId)) {
      this._nextId = numericId;
    }
  }

  /**
   * Register a generator factory for a specific key
   */
  public static register(
    key: GeneratorKey | undefined,
    factory: (initialId?: number) => IDGenerator
  ): void {
    const registrationKey = key ?? IDGenerator._defaultKey;
    IDGenerator._generators.set(registrationKey, factory);
  }

  /**
   * Get a generator instance for a specific key
   */
  public static getGenerator(
    initialId?: number,
    key?: GeneratorKey
  ): IDGenerator {
    const lookupKey = key ?? IDGenerator._defaultKey;
    const factory = IDGenerator._generators.get(lookupKey);
    return factory!(initialId);
  }

  /**
   * Generate an ID using a registered generator
   */
  public static generate(
    existingId?: string,
    initialId?: number,
    key?: GeneratorKey
  ): string {
    const generator = IDGenerator.getGenerator(initialId, key);
    assert(generator, "ID generator not found!", "HSCore.Util");
    return generator.generate(existingId);
  }
}