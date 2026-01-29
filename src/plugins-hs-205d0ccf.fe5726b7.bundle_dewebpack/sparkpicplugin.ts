import { Handler } from './Handler';
import { HSApp } from './HSApp';

export class SparkPicPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    super({
      name: "Spark Pic Plugin",
      description: "spark pic plugin",
      dependencies: [
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.ResizeWidget,
        HSFPConstants.PluginType.SingleRoom,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.LayerEdit,
        HSFPConstants.PluginType.TeachingAbility,
        HSFPConstants.PluginType.UserInfo,
        HSFPConstants.PluginType.SparkPicImage,
        HSFPConstants.PluginType.Compass,
        "hsw.brand.ezhome.firstlogin.Plugin"
      ].filter((dependency): dependency is string => !!dependency)
    });
    
    this._handler = new Handler();
  }

  public onActive(event: unknown, context: unknown): void {
    this._handler.init(context);
  }

  public onDeactive(): void {
    this._handler.onDeactive();
  }

  public start(): void {
    this._handler.start();
  }

  public getRefreshSignal(): unknown {
    return this._handler.getRefreshSignal();
  }

  public getTiltCorrectionSignal(): unknown {
    return this._handler.getTiltCorrectionSignal();
  }

  public setTiltCorrection(value: unknown): unknown {
    return this._handler.updateT3dCameraTiltCorrection(value);
  }

  public showAppContainer(): void {
    this._handler._appRef.current.updateView(true, false);
  }

  public hideAppContainer(): void {
    this._handler._appRef.current.updateView(false, false);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.SparkPic, SparkPicPlugin);