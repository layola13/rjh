export { LogTriggerType } from './985785';

import * as context from './191476';

let logConfigurations: any[] = [];

context.keys().forEach((key: string) => {
  const module = context(key);
  const defaultExport = module.default;
  
  if (defaultExport) {
    logConfigurations = logConfigurations.concat(defaultExport);
  }
});

export default logConfigurations;