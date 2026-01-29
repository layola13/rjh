import HSApp from './HSApp';
import HSCatalog from './HSCatalog';
import HSFPConstants from './HSFPConstants';
import CornerWindowHandler from './CornerWindowHandler';
import MetaProcessor from './MetaProcessor';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  [key: string]: unknown;
}

class CornerWindowPlugin extends HSApp.Plugin.IPlugin {
  private _handler: CornerWindowHandler | null;

  constructor() {
    const config: PluginConfig = {
      name: "Corner Window plugin",
      description: "Corner Window plugin",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.ResizeWidget,
        HSFPConstants.PluginType.PropertyBar
      ]
    };

    super(config);
    this._handler = new CornerWindowHandler();
  }

  /**
   * Called when the plugin is activated
   * @param context - The plugin context
   * @param options - Additional options for activation
   */
  public onActive(context: PluginContext, options: unknown): void {
    this._handler?.init_(context, options);
    HSCatalog.Builder.addMetaProcessor(MetaProcessor.process);
  }

  /**
   * Called when the plugin is deactivated
   */
  public onDeactive(): void {
    this._handler = null;
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.CornerWindow,
  CornerWindowPlugin
);

export default CornerWindowPlugin;