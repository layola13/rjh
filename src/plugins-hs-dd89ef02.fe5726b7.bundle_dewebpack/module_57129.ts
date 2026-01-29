import { HSApp } from './HSApp';
import { WallFaceAssemblyUtil } from './WallFaceAssemblyUtil';
import { WallFaceAssemblyHandler } from './WallFaceAssemblyHandler';

interface PluginContext {
  dependencies: Map<string, unknown>;
  context: unknown;
}

interface AssemblyData {
  [key: string]: unknown;
}

class WallFaceAssemblyPlugin extends HSApp.Plugin.IPlugin {
  private _handler: WallFaceAssemblyHandler;

  constructor() {
    super({
      name: 'wall face assembly',
      description: 'Process wall face assemble commands and its gizmos.',
      dependencies: [
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.ContentMaterialReplace,
        HSFPConstants.PluginType.ContentManipulation,
        HSFPConstants.PluginType.ParametricOpening,
        'hsw.plugin.openingpocket.Plugin'
      ]
    });

    this._handler = new WallFaceAssemblyHandler();
  }

  onActive(context: unknown, dependencies: Map<string, unknown>): void {
    this._handler.init({
      dependencies,
      context
    });
  }

  getWallFaceAssemblyUtil(): typeof WallFaceAssemblyUtil {
    return WallFaceAssemblyUtil;
  }

  uploadAssembly(assemblyData: AssemblyData): void {
    this._handler.uploadWallFaceAssembly(assemblyData);
  }
}

HSApp.App.getApp().pluginManager.registerPlugin(
  HSFPConstants.PluginType.WallFaceAssembly,
  WallFaceAssemblyPlugin
);