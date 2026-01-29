function getFavContainer(): unknown {
  return this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Favorite).favContainer;
}