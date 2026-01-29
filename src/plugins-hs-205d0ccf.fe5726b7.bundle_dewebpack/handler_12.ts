import { HSCore } from './635589';
import { SparkPicEnv } from './841756';
import { AppContainer } from './453423';
import { rootDivId, TOOL_BAR_NEW_RED_ICON, userTrackId } from './554926';
import { LogTriggerType } from './985785';
import { HSApp } from './518193';
import { createRef } from './304883';

interface Plugin {
  addItem(item: ToolbarItem, parent: string, toolbarId: string): void;
  autoSave(enable: boolean): void;
}

interface ToolbarItem {
  order: number;
  type: string;
  label: string;
  name: string;
  onclick: () => void;
}

interface PluginDependencies {
  [key: string]: Plugin;
}

interface Camera {
  type: string;
  signalFieldChanged: HSCore.Util.Signal<CameraFieldChangeData>;
  dump(): [CameraData];
}

interface CameraData {
  x?: number;
  y?: number;
  z?: number;
  [key: string]: unknown;
}

interface CameraFieldChangeData {
  fieldName?: string;
  data?: {
    fieldName?: string;
  };
}

interface T3DCamera {
  mEnableVerticalTiltCorrection?: boolean;
  setEnableVerticalTiltCorrection(enable: boolean): void;
}

interface CameraEntity {
  dirty(): void;
}

interface View3DCamera {
  entity: CameraEntity;
  getT3dCamera(): T3DCamera;
}

interface View3D {
  camera?: View3DCamera;
}

interface Floorplan {
  cameras: Record<string, Camera>;
}

interface App {
  floorplan: Floorplan;
  pluginManager: {
    getPlugin(type: string): Plugin;
  };
  userTrackLogger: {
    push(id: string, description: { description: string; group: string }, options: { triggerType: string }): void;
  };
  registerEnvironment(name: string, env: SparkPicEnv): void;
  activateEnvironment(name: string): void;
  getActive3DView(): View3D | null;
}

interface AppContainerRef {
  updateView(visible: boolean): void;
  updateSelectedRoomType(): void;
}

export class Handler {
  private _app: App;
  private _prevEnv?: string;
  private _appRef?: React.RefObject<AppContainerRef>;
  private _signalHook: HSCore.Util.SignalHook;
  public cameraRefreshSignal: HSCore.Util.Signal<CameraFieldChangeData>;
  private _toolbarPlugin?: Plugin;
  private _sparkPicImagePlugin?: Plugin;
  private timeId?: number;
  private cameraCache?: CameraData;
  public camera?: Camera;
  public tiltCorrectionSignal: HSCore.Util.Signal<boolean>;

  constructor() {
    this._app = HSApp.App.getApp();
    this._signalHook = new HSCore.Util.SignalHook(this);
    this.cameraRefreshSignal = new HSCore.Util.Signal(this);
    this.tiltCorrectionSignal = new HSCore.Util.Signal();
  }

  private onCameraFieldChanged = (event: CameraFieldChangeData): void => {
    this.cameraRefreshSignal.dispatch(event.data);
    
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    
    this.timeId = window.setTimeout(() => {
      this.updateRoomType();
    }, 200);
  };

  public init(dependencies: PluginDependencies): void {
    this._toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];
    this._sparkPicImagePlugin = dependencies[HSFPConstants.PluginType.SparkPicImage];
    
    this._injectToolbarFp();
    this._signalHook.listen(this.cameraRefreshSignal, this._cameraRefresh, this);
    
    this._app.registerEnvironment(HSFPConstants.Environment.SparkPicEnv, new SparkPicEnv({
      app: this._app,
      dependencies
    }));

    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('id', rootDivId);
    document.querySelector('#plugin-container')?.appendChild(containerDiv);
    
    this._appRef = createRef<AppContainerRef>();
    ReactDOM.render(
      React.createElement(AppContainer, {
        quitEnv: this.quitEnv.bind(this),
        ref: this._appRef
      }),
      document.getElementById(rootDivId)
    );
  }

  private _cameraRefresh(event: CameraFieldChangeData): void {
    let shouldUpdateTilt = false;
    
    switch (event.data?.fieldName) {
      case 'x':
      case 'y':
      case 'z':
        shouldUpdateTilt = false;
        break;
      default:
        shouldUpdateTilt = true;
    }
    
    if (shouldUpdateTilt) {
      this.updateT3dCameraTiltCorrection(false);
    }
  }

  public updateT3dCameraTiltCorrection(enable: boolean): void {
    const view3D = this._app.getActive3DView();
    
    if (view3D?.camera) {
      view3D.camera.getT3dCamera().setEnableVerticalTiltCorrection(enable);
      view3D.camera.entity.dirty();
    }
    
    this.tiltCorrectionSignal.dispatch(enable);
  }

  public start(): void {
    this.camera = Object.values(this._app.floorplan.cameras).find(
      (cam) => cam.type === HSApp.View.ViewModeEnum.FirstPerson
    );
    
    if (this.camera) {
      this.cacheCameraData(this.camera);
      this._signalHook.listen(this.camera.signalFieldChanged, this.onCameraFieldChanged);
    }
    
    localStorage.setItem(TOOL_BAR_NEW_RED_ICON, 'false');
    
    this._prevEnv = HSFPConstants.Environment.Default;
    this._app.activateEnvironment(HSFPConstants.Environment.SparkPicEnv);
    
    HSApp.App.getApp().userTrackLogger.push(
      userTrackId,
      {
        description: '进入灵图环境',
        group: HSFPConstants.LogGroupTypes.SparkPic
      },
      {
        triggerType: LogTriggerType.START
      }
    );
    
    this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).autoSave(true);
    
    if (this._appRef?.current) {
      this._appRef.current.updateView(true);
      this.cameraRefreshSignal.dispatch();
    }
    
    const enableVerticalTilt = this._app.getActive3DView()?.camera?.getT3dCamera()?.mEnableVerticalTiltCorrection;
    this.updateT3dCameraTiltCorrection(enableVerticalTilt ?? false);
  }

  public quitEnv(): void {
    this.updateT3dCameraTiltCorrection(false);
    this.recoverCameraData();
    this._signalHook.unlistenAll();
    
    if (this._prevEnv) {
      this._app.activateEnvironment(this._prevEnv);
    }
    
    this._appRef?.current?.updateView(false);
    
    HSApp.App.getApp().userTrackLogger.push(
      userTrackId,
      {
        description: '退出灵图环境',
        group: HSFPConstants.LogGroupTypes.SparkPic
      },
      {
        triggerType: LogTriggerType.END
      }
    );
  }

  private _injectToolbarFp(): void {
    if (HSApp.Config.TENANT === 'fp') {
      const toolbarItem: ToolbarItem = {
        order: 1,
        type: 'button',
        label: 'AI Styler',
        name: 'toolBar_spark_pic',
        onclick: () => this.start()
      };
      
      this._toolbarPlugin?.addItem(
        toolbarItem,
        'toolBar_ai_tools',
        HSApp.UI.ToolbarIdEnum.DEFAULT_TOOLBAR_ID
      );
    }
  }

  public onDeactive(): void {
    const rootElement = document.getElementById(rootDivId);
    if (rootElement) {
      ReactDOM.unmountComponentAtNode(rootElement);
    }
  }

  public updateRoomType(): void {
    this._appRef?.current?.updateSelectedRoomType();
  }

  public getRefreshSignal(): HSCore.Util.Signal<CameraFieldChangeData> {
    return this.cameraRefreshSignal;
  }

  public getTiltCorrectionSignal(): HSCore.Util.Signal<boolean> {
    return this.tiltCorrectionSignal;
  }

  private cacheCameraData(camera: Camera): void {
    this.cameraCache = camera.dump()[0];
  }

  private recoverCameraData(): void {
    if (this.camera && this.cameraCache) {
      Object.assign(this.camera, this.cameraCache);
    }
  }
}