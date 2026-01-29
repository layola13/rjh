interface Config {
  [key: string]: unknown;
}

interface ConfigMap {
  homestyler: {
    base: Config;
    dev: Config;
    pre: Config;
    prod: Config;
  };
  shejijia: {
    base: Config;
    dev: Config;
    pre: Config;
    prod: Config;
  };
}

type BizCode = 'homestyler' | 'shejijia';
type Environment = 'dev' | 'pre' | 'prod';

import { config as homestylerBaseConfig } from './homestyler/base';
import { config as homestylerDevConfig } from './homestyler/dev';
import { config as homestylerPreConfig } from './homestyler/pre';
import { config as homestylerProdConfig } from './homestyler/prod';
import { config as shejijiaBaseConfig } from './shejijia/base';
import { config as shejijiaDevConfig } from './shejijia/dev';
import { config as shejijiaPreConfig } from './shejijia/pre';
import { config as shejijiaProdConfig } from './shejijia/prod';

export let bizCode: BizCode = 'homestyler';
export let env: Environment = 'prod';

const configMap: ConfigMap = {
  homestyler: {
    base: homestylerBaseConfig,
    dev: homestylerDevConfig,
    pre: homestylerPreConfig,
    prod: homestylerProdConfig
  },
  shejijia: {
    base: shejijiaBaseConfig,
    dev: shejijiaDevConfig,
    pre: shejijiaPreConfig,
    prod: shejijiaProdConfig
  }
};

const hostname = window.location.host;

if (hostname.includes('shejijia.com')) {
  bizCode = 'shejijia';
}

if (hostname.includes('homestyler.com')) {
  bizCode = 'homestyler';
}

const isDevEnvironment =
  hostname.includes('waptest.') ||
  hostname.includes('dev.') ||
  /dev[0-9]*\./.test(hostname) ||
  hostname.includes('taobao.net') ||
  hostname.includes('shejijia.test') ||
  hostname.includes('localhost') ||
  /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/g.test(hostname);

if (isDevEnvironment) {
  env = 'dev';
}

const isPreEnvironment = hostname.includes('wapa.') || hostname.includes('pre-');

if (isPreEnvironment) {
  env = 'pre';
}

const mergedConfig: Config = {
  ...configMap[bizCode].base,
  ...configMap[bizCode][env]
};

export default mergedConfig;