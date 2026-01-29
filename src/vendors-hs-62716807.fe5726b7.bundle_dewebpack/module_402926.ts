interface PluginConfig {
  onStoreCreated?: () => void;
  onModel?: () => void;
  middleware?: () => void;
  onInit?: () => void;
  exposed?: Record<string, unknown>;
}

interface PluginContext {
  [key: string]: unknown;
}

interface Plugin {
  config: PluginConfig;
  validate: (validations: Array<[boolean, string]>) => void;
  create(this: PluginContext, config: PluginConfig): PluginResult;
}

interface PluginResult {
  onModel?: () => void;
  middleware?: () => void;
  onStoreCreated?: () => void;
}

type ValidateFunction = (validations: Array<[boolean, string]>) => void;

export default function createPlugin(config: PluginConfig): Plugin {
  return {
    config,
    validate: validateFunction,
    create(this: PluginContext, pluginConfig: PluginConfig): PluginResult {
      validateFunction([
        [
          pluginConfig.onStoreCreated !== undefined && typeof pluginConfig.onStoreCreated !== "function",
          "Plugin onStoreCreated must be a function"
        ],
        [
          pluginConfig.onModel !== undefined && typeof pluginConfig.onModel !== "function",
          "Plugin onModel must be a function"
        ],
        [
          pluginConfig.middleware !== undefined && typeof pluginConfig.middleware !== "function",
          "Plugin middleware must be a function"
        ]
      ]);

      pluginConfig.onInit?.call(this);

      const result: PluginResult = {};

      if (pluginConfig.exposed) {
        for (const key of Object.keys(pluginConfig.exposed)) {
          const exposedValue = pluginConfig.exposed[key];
          this[key] = typeof exposedValue === "function"
            ? (exposedValue as Function).bind(this)
            : Object.create(exposedValue);
        }
      }

      const hookNames: Array<keyof PluginResult> = ["onModel", "middleware", "onStoreCreated"];
      for (const hookName of hookNames) {
        const hook = pluginConfig[hookName];
        if (hook) {
          result[hookName] = hook.bind(this) as () => void;
        }
      }

      return result;
    }
  };
}

declare const validateFunction: ValidateFunction;