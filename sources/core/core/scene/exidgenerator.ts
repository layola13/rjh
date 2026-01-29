class ExIdGenerator {
  private static _instance: ExIdGenerator;
  private readonly _idGenerators: Record<string, HSCore.Util.IDGenerator>;

  constructor() {
    this._idGenerators = {};
    this._idGenerators[HSCore.Util.IDGeneratorType.ExSketch] = new HSCore.Util.IDGenerator();
    HSCore.Util.IDGenerator.register(
      this,
      (generatorType: string) => this._idGenerators[generatorType]
    );
  }

  /**
   * Generates a unique ID for the given element
   * @param element - The element to generate an ID for
   * @returns The generated ID string
   */
  generateId(element: unknown): string {
    return HSCore.Util.IDGenerator.generate(
      element,
      HSCore.Util.IDGeneratorType.ExSketch,
      this
    );
  }

  /**
   * Returns the singleton instance of ExIdGenerator
   * @returns The ExIdGenerator instance
   */
  static getInstance(): ExIdGenerator {
    if (!this._instance) {
      this._instance = new ExIdGenerator();
    }
    return this._instance;
  }
}

export { ExIdGenerator };