import BaseClass from './BaseClass';
import ConfigType from './ConfigType';

class ModuleClass extends BaseClass {
  constructor(config: ConfigType, options: unknown) {
    super(config, options, ConfigType);
  }

  static create(config: ConfigType, options: unknown): ModuleClass {
    return new ModuleClass(config, options);
  }
}

export default ModuleClass;