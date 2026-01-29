import * as moduleConfig from './138357';

export default function updateConfig(config?: Partial<typeof moduleConfig>): void {
  if (config) {
    Object.assign(moduleConfig, config);
  }
}