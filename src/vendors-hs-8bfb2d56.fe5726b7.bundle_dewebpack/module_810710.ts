import { default as bizConfig } from './440521';
import { config as homestylerConfig } from './463930';
import { config as defaultConfig } from './635805';

export const mtopConfig = bizConfig.bizCode === 'homestyler' ? homestylerConfig : defaultConfig;