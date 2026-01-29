interface Config {
  key: string;
  [key: string]: unknown;
}

/**
 * BaseHelper class for managing configuration objects
 */
export class BaseHelper {
  private _configs: Config[] = [];

  constructor() {
    this.addConfig = this.addConfig.bind(this);
    this.removeConfig = this.removeConfig.bind(this);
    this.getConfigs = this.getConfigs.bind(this);
    this.getConfig = this.getConfig.bind(this);
  }

  /**
   * Add a configuration object. If a config with the same key exists, it will be removed first.
   * @param config - Configuration object to add
   */
  addConfig = (config: Config): void => {
    if (config.key) {
      if (this.getConfig(config.key)) {
        this.removeConfig(config.key);
      }
      this._configs.push(config);
    }
  };

  /**
   * Remove a configuration by key
   * @param key - The key of the configuration to remove
   */
  removeConfig = (key: string): void => {
    this._configs = this._configs.filter((config) => config.key !== key);
  };

  /**
   * Get a copy of all configurations
   * @returns Array of all configuration objects
   */
  getConfigs = (): Config[] => {
    return this._configs.slice();
  };

  /**
   * Find a configuration by key
   * @param key - The key to search for
   * @returns The configuration object if found, undefined otherwise
   */
  getConfig = (key: string): Config | undefined => {
    return this._configs.find((config) => config.key === key);
  };
}