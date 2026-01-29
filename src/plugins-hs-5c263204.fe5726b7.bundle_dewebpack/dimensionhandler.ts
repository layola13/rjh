interface DimensionConfig {
  amendDimensionInput?: (value: number) => number;
}

export class DimensionHandler {
  private _config: DimensionConfig;

  constructor(config: DimensionConfig) {
    this._config = config;
  }

  correctValue(value: number): number {
    return this._config?.amendDimensionInput?.(value) ?? value;
  }
}