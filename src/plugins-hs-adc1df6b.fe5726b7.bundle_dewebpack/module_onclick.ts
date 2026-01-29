import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

export function showReplaceMaterialPanel(): void {
  const app = HSApp.App.getApp();
  const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ParametricRoof);
  plugin.handler.showReplaceMaterialPanel();
}