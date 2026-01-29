interface App {
  catalogManager: {
    getDefaultItem(type: string): Promise<any>;
  };
}

interface SignalHook {
  unlistenAll(): void;
}

interface MoldingItem {
  profile: any;
  material: any;
}

declare namespace HSCore.Util {
  class SignalHook {
    constructor(context: any);
    unlistenAll(): void;
  }
}

declare namespace HSCatalog {
  enum DefaultItemTypeEnum {
    Baseboard = 'baseboard',
    BaseboardMaterial = 'baseboardMaterial',
    Cornice = 'cornice',
    PaintMaterial = 'paintMaterial',
    TopRail = 'topRail',
    TopRailMaterial = 'topRailMaterial',
    Mitre = 'mitre',
    MitreMaterial = 'mitreMaterial'
  }
}

export class Handler {
  private app!: App;
  private _signalHook!: SignalHook;
  private _defaultBaseboard!: Promise<MoldingItem>;
  private _defaultCornice!: Promise<MoldingItem>;
  private _defaultWallBoardWaistLine!: Promise<MoldingItem>;
  private _defaultMitre!: Promise<MoldingItem>;

  init(app: App): void {
    this.app = app;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._initDefaultMolding(app);
  }

  uninit(): void {
    this._signalHook.unlistenAll();
  }

  private _initDefaultMolding(app: App): void {
    const getDefaultItem = (type: string): Promise<any> => {
      return app.catalogManager.getDefaultItem(type);
    };

    const baseboardType = HSCatalog.DefaultItemTypeEnum.Baseboard;
    const baseboardMaterialType = HSCatalog.DefaultItemTypeEnum.BaseboardMaterial;
    this._defaultBaseboard = Promise.all([
      getDefaultItem(baseboardType),
      getDefaultItem(baseboardMaterialType)
    ]).then((items) => ({
      profile: items[0],
      material: items[1]
    }));

    const corniceType = HSCatalog.DefaultItemTypeEnum.Cornice;
    const paintMaterialType = HSCatalog.DefaultItemTypeEnum.PaintMaterial;
    this._defaultCornice = Promise.all([
      getDefaultItem(corniceType),
      getDefaultItem(paintMaterialType)
    ]).then((items) => ({
      profile: items[0],
      material: items[1]
    }));

    const topRailType = HSCatalog.DefaultItemTypeEnum.TopRail;
    const topRailMaterialType = HSCatalog.DefaultItemTypeEnum.TopRailMaterial;
    this._defaultWallBoardWaistLine = Promise.all([
      getDefaultItem(topRailType),
      getDefaultItem(topRailMaterialType)
    ]).then((items) => ({
      profile: items[0],
      material: items[1]
    }));

    const mitreType = HSCatalog.DefaultItemTypeEnum.Mitre || 'mitre';
    const mitreMaterialType = HSCatalog.DefaultItemTypeEnum.MitreMaterial || 'mitreMaterial';
    this._defaultMitre = Promise.all([
      getDefaultItem(mitreType),
      getDefaultItem(mitreMaterialType)
    ]).then((items) => ({
      profile: items[0],
      material: items[1]
    }));
  }

  getDefaultBaseboard(): Promise<MoldingItem> {
    return this._defaultBaseboard;
  }

  getDefaultBaseboardMaterial(): Promise<any> {
    return this._defaultBaseboard.then((item) => item.material);
  }

  getDefaultCornice(): Promise<MoldingItem> {
    return this._defaultCornice;
  }

  getDefaultCorniceMaterial(): Promise<any> {
    return this._defaultCornice.then((item) => item.material);
  }

  getDefaultWallBoardWaistLine(): Promise<MoldingItem> {
    return this._defaultWallBoardWaistLine;
  }

  getDefaultWallBoardWaistLineMaterial(): Promise<any> {
    return this._defaultWallBoardWaistLine.then((item) => item.material);
  }

  getDefaultMitre(): Promise<MoldingItem> {
    return this._defaultMitre;
  }

  getDefaultMitreMaterial(): Promise<any> {
    return this._defaultMitre.then((item) => item.material);
  }
}