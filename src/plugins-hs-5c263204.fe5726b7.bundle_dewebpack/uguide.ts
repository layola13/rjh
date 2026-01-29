import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  app: any;
}

interface Dependencies {
  [key: string]: any;
  'hsw.plugin.signin.Plugin': SigninPlugin;
}

interface SigninPlugin {
  signals: {
    signalSigninSucceeded: {
      listen(callback: Function, context: any): void;
      unlisten(callback: Function, context: any): void;
    };
  };
}

interface GuideOptions {
  [key: string]: any;
}

export class UGuide extends HSApp.Plugin.IPlugin {
  private _handler: Handler;
  public signalGuideToLog: any;
  private _signinPlugin?: SigninPlugin;

  constructor() {
    super({
      name: 'Guide Plugin',
      description: 'provide Guide for floorplan',
      dependencies: ['hsw.plugin.signin.Plugin']
    });

    this._handler = new Handler();
    this.signalGuideToLog = this._handler.signalGuideToLog;
  }

  onActive(context: PluginContext, dependencies: Dependencies): void {
    super.onActive(context, undefined);

    this._handler.init({
      app: context.app,
      dependencies
    });

    this._handler.setUserGuideTimer(undefined);

    this._signinPlugin = dependencies['hsw.plugin.signin.Plugin'];
    this._signinPlugin.signals.signalSigninSucceeded.listen(this.restartGuide, this);
  }

  onDeactive(context: PluginContext): void {
    super.onDeactive(context);

    this._handler.setDisableGuide(true);

    this._signinPlugin?.signals.signalSigninSucceeded.unlisten(this.restartGuide, this);
  }

  showGuide(): any {
    return this._handler.showGuide();
  }

  getStarted(): any {
    return this._handler.getStarted();
  }

  async copyDesign(shouldCopy: boolean = false): Promise<any> {
    const result = await this._handler.copyDesign(shouldCopy);
    return result;
  }

  startGuide(options: GuideOptions = {}): void {
    this._handler.startGuide(options);
  }

  startCustomGuide(options: GuideOptions = {}): void {
    this._handler.startCustomGuide(options);
  }

  restartGuide(): void {
    this._handler.restartGuide();
  }

  exitGuide(shouldExit: boolean = true): any {
    return this._handler.exitGuide(shouldExit);
  }

  get isInCustomGuide(): boolean {
    return this._handler.isInCustomGuide;
  }

  getNewUserDesignId(): any {
    return this._handler.getNewUserDesignId();
  }

  setHasGotDesign(hasGotDesign: boolean): void {
    this._handler.setHasGotDesign(hasGotDesign);
  }

  async isNewbie(): Promise<boolean> {
    return await this._handler.isNewbie();
  }

  updateGuide(step: any, data: any): void {
    this._handler.updateGuide(step, data);
  }

  unmountGuideTip(): void {
    this._handler?.unmountGuideTip?.();
  }

  exitRenderAndNewDoc(): void {
    this._handler.exitRenderAndNewDoc();
  }

  get handler(): Handler {
    return this._handler;
  }

  getCurrentStepOptions(): any {
    return this._handler.getCurrentStepOptions();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Guide, UGuide, () => {});