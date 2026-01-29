interface Environment {
  Default: string | number;
  NCustomizedCeilingModel: string | number;
  NCustomizedBackgroundWall: string | number;
  NCustomizedPlatform: string | number;
  CustomizedPM: string | number;
  TPZZCabinet: string | number;
  MixPaint: string | number;
  ConcealedWorkV2: string | number;
  Render: string | number;
}

interface EnvironmentManager {
  signalEnvironmentActivated: unknown;
}

interface App {
  environmentManager: EnvironmentManager;
  activeEnvironmentId: string | number;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
}

interface UIComponent {
  init(): void;
  showModel(model: unknown, category: number): void;
  closeModel(): void;
}

declare const HSFPConstants: {
  Environment: Environment;
};

declare const HSApp: HSAppNamespace;

const ENVIRONMENT_CATEGORY_MAP: Record<string | number, number> = {
  [HSFPConstants.Environment.Default]: 0,
  [HSFPConstants.Environment.NCustomizedCeilingModel]: 2,
  [HSFPConstants.Environment.NCustomizedBackgroundWall]: 2,
  [HSFPConstants.Environment.NCustomizedPlatform]: 2,
  [HSFPConstants.Environment.CustomizedPM]: 3,
  [HSFPConstants.Environment.TPZZCabinet]: 4,
  [HSFPConstants.Environment.MixPaint]: 5,
  [HSFPConstants.Environment.ConcealedWorkV2]: 6,
  [HSFPConstants.Environment.Render]: 7,
};

export default class EnvironmentController {
  public ui: UIComponent;
  private _app: App | undefined;
  private _signalHook: any;
  public selectedCategory: number;

  constructor() {
    this.ui = new (require('./ui-component') as any).default();
    this.selectedCategory = 0;
  }

  public init(): void {
    this.ui.init();
    this._app = HSApp.App.getApp();
    this._signalHook = new (window as any).HSCore.Util.SignalHook(this);
    this._signalHook.listen(
      this._app.environmentManager.signalEnvironmentActivated,
      this.onEnvActivated
    );
  }

  public onEnvActivated(): void {
    const app = HSApp.App.getApp();
    this.selectedCategory = ENVIRONMENT_CATEGORY_MAP[app.activeEnvironmentId] ?? 0;
  }

  public showModel(model: unknown, category?: number): void {
    const selectedCategory = category !== undefined ? category : this.selectedCategory;
    this.ui.showModel(model, selectedCategory);
  }

  public closeModel(): void {
    this.ui.closeModel();
  }
}