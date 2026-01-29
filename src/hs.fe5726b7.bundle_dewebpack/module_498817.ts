import BaseClass from './715061';
import ConfigValidator from './648320';

/**
 * Factory class for creating instances with validation
 */
export default class ModuleFactory extends BaseClass {
  constructor(config: unknown, options: unknown) {
    super(config, options, ConfigValidator);
  }

  static create(config: unknown, options: unknown): ModuleFactory {
    return new ModuleFactory(config, options);
  }
}