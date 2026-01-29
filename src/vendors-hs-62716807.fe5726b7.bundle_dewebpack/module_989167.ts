import { createSelectorHook, createDispatchHook } from './module_948579';

interface Context {
  [key: string]: unknown;
}

interface PluginConfig {
  context: Context;
}

interface StoreHooks {
  useSelector: ReturnType<typeof createSelectorHook>;
  useDispatch: ReturnType<typeof createDispatchHook>;
}

interface PluginResult {
  onStoreCreated: () => StoreHooks;
}

export default function createStorePlugin(config: PluginConfig): PluginResult {
  const { context } = config;
  const useSelector = createSelectorHook(context);
  const useDispatch = createDispatchHook(context);

  return {
    onStoreCreated: (): StoreHooks => {
      return {
        useSelector,
        useDispatch
      };
    }
  };
}