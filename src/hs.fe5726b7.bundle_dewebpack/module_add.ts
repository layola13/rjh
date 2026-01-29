interface ModuleConfig {
  id: string;
  dot?: {
    id: string;
    style: Record<string, unknown>;
  };
}

interface AppConfig {
  TENANT: string;
}

interface HSAppNamespace {
  Config: AppConfig;
}

declare const HSApp: HSAppNamespace;

const TARGET_TENANT = 'ezhome';
const TARGET_MODULE_ID = 'a12aa768-1d96-4a33-8cb5-4f308bf26115';

/**
 * Configures module with homepage dot settings for specific tenant and module ID
 * @param module - The module configuration object to modify
 */
function configureModule(module: ModuleConfig): void {
  if (HSApp.Config.TENANT === TARGET_TENANT && module.id === TARGET_MODULE_ID) {
    Object.assign(module, {
      dot: {
        id: 'l-homepage-now',
        style: {}
      }
    });
  }
}