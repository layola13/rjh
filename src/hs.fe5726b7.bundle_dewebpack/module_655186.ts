import { general } from './module_778434';
import { design } from './module_673306';
import { catalog } from './module_31806';
import { searchCriteriaEnum } from './module_198788';

interface ModuleConfig {
  general: ReturnType<typeof general>;
  catalog: ReturnType<typeof catalog>;
  design: ReturnType<typeof design>;
  searchCriteriaEnum: typeof searchCriteriaEnum;
}

export function createModuleConfig<T>(config: T): ModuleConfig {
  return {
    general: general(config),
    catalog: catalog(config),
    design: design(config),
    searchCriteriaEnum: searchCriteriaEnum
  };
}

export default createModuleConfig;