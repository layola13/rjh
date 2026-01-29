interface Strategy {
  [key: string]: unknown;
}

interface Strategies {
  [key: string]: Strategy;
}

class DataBuilder {
  private static _instance: DataBuilder | undefined = undefined;
  private strategies: Strategies;

  constructor() {
    this.strategies = strategies;
  }

  public getStrategies(): Strategies {
    return this.strategies;
  }

  public static getInstance(): DataBuilder {
    if (!this._instance) {
      this._instance = new DataBuilder();
    }
    return this._instance;
  }
}

export { DataBuilder };