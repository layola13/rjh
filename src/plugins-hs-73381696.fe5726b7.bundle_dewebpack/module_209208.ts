class MaterialImagePlugin extends HSApp.Plugin.IPlugin {
  private _handler: MaterialImageHandler;

  constructor() {
    super({
      name: "Material Image Plugin",
      description: "Manage material image issues like add seam filler",
      dependencies: []
    });
    this._handler = new MaterialImageHandler();
  }

  onActive(app: HSApp.Application, context: unknown): void {
    super.onActive(app, context);
    HSCore.Material.Util.isSeamFillerSupported = true;
    this._handler.init({ app: app.app });
  }

  onDeactive(): void {
    // No-op
  }

  getMaterialUrlWithSeamFiller(
    materialId: string,
    width: number,
    height: number,
    options: unknown
  ): string {
    return this._handler.getMaterialUrlWithSeamFiller(materialId, width, height, options);
  }

  getSeamImageUrl(materialId: string, width: number, height: number): string {
    return this._handler.getSeamImageUrl(materialId, width, height);
  }

  addPreZero(value: number): string {
    return this._handler.addPreZero(value);
  }

  resetMaterialUrlCache(): void {
    return this._handler.resetMaterialUrlCache();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.MaterialImage, MaterialImagePlugin);