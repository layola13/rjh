import { HSApp } from './HSApp';
import { loadUniversalDesignJson } from './utils';

interface PluginConfig {
  name: string;
  description: string;
}

class OpenLocalDesignPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "open local design plugin",
      description: "open local design in order to clone and save design to server"
    });
  }

  async openLocalDesign(designPath: string): Promise<void> {
    await loadUniversalDesignJson(designPath);
  }
}

HSApp.Plugin.registerPlugin(
  "hsw.plugin.openlocaldesign.Plugin",
  OpenLocalDesignPlugin,
  () => {}
);