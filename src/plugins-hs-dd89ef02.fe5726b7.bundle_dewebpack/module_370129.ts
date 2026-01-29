import { App } from './App';
import { Plugin } from './Plugin';
import { View } from './View';
import { Util } from './Util';
import { ResourceManager } from './ResourceManager';
import { LiveHint, LiveHintStatusEnum, LiveHintEffectType } from './LiveHint';

const PLUGIN_NAME = 'hsw.plugin.webglvalidation';

interface PluginConfig {
  name: string;
  description: string;
}

interface ViewChangeEventData {
  data: {
    newView: {
      name: string;
    };
  };
}

interface LiveHintOptions {
  status: LiveHintStatusEnum;
  effect?: LiveHintEffectType;
}

class WebGLValidationPlugin extends Plugin.IPlugin {
  constructor() {
    super({
      name: 'webgl validation plugin',
      description: 'detect whether browser support webgl.'
    });
  }

  onActive(): void {
    const app = App.getApp();
    
    if (!View.T3d.WebGLDetect.isWebGLSupported()) {
      PluginHandler.showUI();
    }
    
    app.signalViewActivating.listen(
      PluginHandler.onViewChanged,
      PluginHandler
    );
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

const PluginHandler = {
  showLiveHint(effect?: LiveHintEffectType): void {
    const message = ResourceManager.getString('plugin_webgl_validation_livehint');
    const options: LiveHintOptions = {
      status: LiveHint.statusEnum.warning
    };

    if (effect) {
      options.effect = effect;
    }

    LiveHint.show(message, undefined, undefined, options);
  },

  showUI(): void {
    setTimeout(() => {
      this.showLiveHint();
    }, 800);
  },

  onViewChanged(event: ViewChangeEventData): void {
    const isWebGL3DView = event.data.newView.name === 'webgl3d';
    const isWebGLSupported = View.T3d.WebGLDetect.isWebGLSupported();

    if (isWebGL3DView && !isWebGLSupported) {
      this.showLiveHint('shake');
    }
  }
};

const pluginDefinition = Util.Core.define(PLUGIN_NAME);
pluginDefinition.Handler = PluginHandler;

Plugin.registerPlugin(`${PLUGIN_NAME}.Plugin`, WebGLValidationPlugin);

export { WebGLValidationPlugin, PluginHandler, PLUGIN_NAME };