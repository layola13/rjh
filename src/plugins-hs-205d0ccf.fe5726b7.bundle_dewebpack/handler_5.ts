import { HSCore } from './635589';
import { ThumbnailViewHandler } from './753966';
import { HSApp } from './518193';

interface ResizeWidgetChangedData {
  viewerType: string;
}

interface Signal<T = any> {
  dispatch(data: T): void;
  listen(callback: (event: SignalEvent<T>) => void, context?: any): SignalHook;
}

interface SignalEvent<T = any> {
  data: T;
  target?: any;
  disableViewUpdate?: boolean;
}

interface ViewModeChangedData {
  newViewMode: HSApp.View.ViewModeEnum;
  oldViewMode?: HSApp.View.ViewModeEnum;
}

interface EnvironmentActivatedData {
  newEnvironmentId: string;
  oldEnvironmentId?: string;
}

interface AppSettingsValueChangedData {
  fieldName: string;
  value: any;
}

interface ViewActivatedData {
  oldView?: any;
  newView?: any;
}

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface View {
  hide(): void;
  show(options?: { focus: boolean }): void;
  onSizeChange(): void;
  fit(): void;
  resize(width: number, height: number): void;
  getViewBox(): ViewBox;
  setViewBox(x: number, y: number, width: number, height: number): void;
  name: string;
  displayLayers?: {
    background?: {
      style(property: string, value: any): void;
    };
  };
}

interface Environment {
  viewMode3D: HSApp.View.ViewModeEnum;
  supportSingleRoomMode(): boolean;
}

interface AppSettings {
  signalValueChanged: Signal<AppSettingsValueChangedData>;
}

interface App {
  signalPrimaryViewModeChanged: Signal<ViewModeChangedData>;
  signal3DViewModeChanged: Signal<ViewModeChangedData>;
  signalEnvironmentActivated: Signal<EnvironmentActivatedData>;
  signalViewActivated: Signal<ViewActivatedData>;
  signalEnvironmentResumed: Signal<any>;
  appSettings: AppSettings;
  activeEnvironment: Environment;
  is3DViewActive(): boolean;
  is2DViewActive(): boolean;
  getActive3DView(): View;
  getActive2DView(): View;
  getMain3DView(): View;
  getMain2DView(): View;
  isMain3DViewActive(): boolean;
  isMain2DViewActive(): boolean;
  getAux2DView(): View;
}

interface HandlerOptions {
  signalResizeWidgetChanged: Signal<ResizeWidgetChangedData>;
}

interface SignalHook {
  listen<T>(signal: Signal<T>, callback: (event: SignalEvent<T>) => void): SignalHook;
}

declare const HSFPConstants: {
  Environment: {
    Render: string;
  };
};

declare const site: {
  signalWindowResizeEnd: Signal<any>;
};

export class Handler {
  private app?: App;
  private thumbnailViewHandler?: ThumbnailViewHandler;
  private signalHook: SignalHook;
  private viewBox?: ViewBox;
  private switch2DViewTimers: number[];
  private signalResizeWidgetChanged: Signal<ResizeWidgetChangedData>;

  constructor(options: HandlerOptions) {
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.switch2DViewTimers = [];
    this.signalResizeWidgetChanged = options.signalResizeWidgetChanged;
  }

  getSize(): any {
    return this.thumbnailViewHandler?.size;
  }

  init(app: App): void {
    this.app = app;
    this.initEditorContainer();
    
    const resizeWidgetContainer = document.querySelector('.resizewidgetcontainer');
    this.thumbnailViewHandler = new ThumbnailViewHandler(resizeWidgetContainer);
    
    this.thumbnailViewHandler.render(() => {
      this.thumbnailViewHandler?.initLayout();
      this.updateView();
    });
    
    this.initEvent();
    this.initSignal();
  }

  private initEditorContainer(): void {
    const editor = document.getElementById('editor');
    
    const editor2dContainer = document.createElement('div');
    editor2dContainer.classList.add('editor2dContainer');
    editor2dContainer.appendChild(document.getElementById('editor2d')!);
    editor2dContainer.appendChild(document.getElementById('aux2d')!);
    
    const editor3dContainer = document.createElement('div');
    editor3dContainer.classList.add('editor3dContainer');
    editor3dContainer.appendChild(document.getElementById('editor3d')!);
    editor3dContainer.appendChild(document.getElementById('aux3d')!);
    
    const resizeWidgetContainer = document.createElement('div');
    resizeWidgetContainer.classList.add('resizewidgetcontainer');
    
    editor?.appendChild(editor2dContainer);
    editor?.appendChild(editor3dContainer);
    editor?.appendChild(resizeWidgetContainer);
    
    this.app?.getAux2DView().hide();
  }

  private initSignal(): void {
    this.signalHook
      .listen(this.app!.signalPrimaryViewModeChanged, this.onPrimaryViewModeChanged)
      .listen(this.app!.signal3DViewModeChanged, this.on3DViewModeChanged)
      .listen(this.app!.signalEnvironmentActivated, this.onEnvironmentActivated)
      .listen(this.app!.appSettings.signalValueChanged, this.onAppSettingsValueChanged)
      .listen(this.app!.signalViewActivated, this.onViewActivated)
      .listen(this.app!.signalEnvironmentResumed, this.onEnvironmentResumed);
  }

  private clearAll2dTimers(): void {
    this.switch2DViewTimers.forEach((timer) => {
      if (timer) {
        clearTimeout(timer);
      }
    });
    this.switch2DViewTimers = [];
  }

  private onPrimaryViewModeChanged = (event: SignalEvent<ViewModeChangedData>): void => {
    if (
      this.app!.activeEnvironment.viewMode3D === HSApp.View.ViewModeEnum.Elevation &&
      event.data.newViewMode !== HSApp.View.ViewModeEnum.Elevation
    ) {
      this.thumbnailViewHandler?.onExitElevation();
    } else {
      this.on3DViewModeChanged(event);
    }
  };

  private on3DViewModeChanged = (event: SignalEvent<ViewModeChangedData>): void => {
    this.thumbnailViewHandler?.updateSwitch3DViewBtn();
    
    if (event.data.newViewMode === HSApp.View.ViewModeEnum.Elevation) {
      const is3DViewActive = this.app!.is3DViewActive();
      
      if (is3DViewActive) {
        this.thumbnailViewHandler?.fit2DView();
      }
      
      this.thumbnailViewHandler?.updateShowExitElevationBtn(is3DViewActive);
    } else {
      this.thumbnailViewHandler?.updateShowExitElevationBtn(false);
    }
  };

  private onEnvironmentActivated = (event: SignalEvent<EnvironmentActivatedData>): void => {
    const supportsSingleRoomMode = this.app!.activeEnvironment.supportSingleRoomMode();
    this.thumbnailViewHandler?.updateShowSingleRoomModeBtn(supportsSingleRoomMode);
    
    const newEnvironmentId = event.data.newEnvironmentId;
    
    if (
      newEnvironmentId &&
      newEnvironmentId === HSFPConstants.Environment.Render &&
      !this.thumbnailViewHandler?.getToggleModalShowStatus()
    ) {
      this.thumbnailViewHandler?.toggleModalShow(false);
    }
  };

  private onAppSettingsValueChanged = (event: SignalEvent<AppSettingsValueChangedData>): void => {
    if (event.data.fieldName === 'isSingleRoomMode') {
      this.thumbnailViewHandler?.updateSingleRoomMode(event.data.value);
    }
  };

  private onViewActivated = (event: SignalEvent<ViewActivatedData>): void => {
    this.updateView();
  };

  private onEnvironmentResumed = (event: SignalEvent<any>): void => {
    const supportsSingleRoomMode = this.app!.activeEnvironment.supportSingleRoomMode();
    this.thumbnailViewHandler?.updateShowSingleRoomModeBtn(supportsSingleRoomMode);
  };

  animateHide(enableUpdate: boolean = true): void {
    if (this.app!.is2DViewActive()) {
      this.app!.getActive3DView().hide();
    } else {
      this.app!.getActive2DView().hide();
    }
    
    this.thumbnailViewHandler?.hide({ enableUpdate });
  }

  animateShow(enableUpdate: boolean = true): void {
    if (this.app!.is2DViewActive()) {
      this.app!.getActive3DView().show({ focus: false });
    } else {
      this.app!.getActive2DView().show({ focus: false });
    }
    
    this.thumbnailViewHandler?.show({ enableUpdate });
  }

  uiHide(enableUpdate: boolean = true): void {
    this.thumbnailViewHandler?.hide({ enableUpdate });
  }

  uiShow(enableUpdate: boolean = true): void {
    this.thumbnailViewHandler?.show({ enableUpdate });
  }

  enterSimpleMode(): void {
    this.thumbnailViewHandler?.updateSimpleMode(true);
  }

  exitSimpleMode(): void {
    this.thumbnailViewHandler?.updateSimpleMode(false);
  }

  changeZIndex(element: any, zIndex: number): void {
    this.thumbnailViewHandler?.changeZIndex(element, zIndex);
  }

  updateView(event?: SignalEvent<ViewActivatedData>): void {
    const app = this.app!;
    let oldView: View | undefined;
    
    if (event?.data) {
      oldView = event.data.oldView;
    }
    
    if (app.is3DViewActive()) {
      this.thumbnailViewHandler?.switchThumbnailView('2d', () => {
        this.switch2DViewTimers.push(
          window.setTimeout(() => {
            this.thumbnailViewHandler?.fit2DView(true);
          })
        );
      });
      
      const active2DView = app.getActive2DView();
      
      if (active2DView && (oldView !== active2DView || !event?.disableViewUpdate)) {
        this.viewBox = active2DView.getViewBox();
      }
    } else {
      this.thumbnailViewHandler?.switchThumbnailView('3d', () => {
        const active2DView = this.app!.getActive2DView();
        this.clearAll2dTimers();
        
        if (active2DView) {
          if (this.viewBox) {
            active2DView.resize(window.innerWidth, window.innerHeight);
            active2DView.setViewBox(
              this.viewBox.x,
              this.viewBox.y,
              this.viewBox.width,
              this.viewBox.height
            );
          } else {
            active2DView.fit();
          }
        }
      });
    }
    
    this.updateUI();
    
    if (app.isMain3DViewActive()) {
      this.signalResizeWidgetChanged.dispatch({
        viewerType: app.getMain3DView().name
      });
    } else if (app.isMain2DViewActive()) {
      this.signalResizeWidgetChanged.dispatch({
        viewerType: app.getMain2DView().name
      });
    }
  }

  private updateUI(): void {
    const main2DView = this.app!.getMain2DView();
    
    if (main2DView?.displayLayers?.background) {
      main2DView.displayLayers.background.style('opacity', 1);
    }
    
    const active3DView = this.app!.getActive3DView();
    active3DView?.onSizeChange();
  }

  private initEvent(): void {
    const app = this.app!;
    
    site.signalWindowResizeEnd.listen((event: SignalEvent<any>) => {
      const eventData = event.data;
      
      if (event.target) {
        if (app.is3DViewActive()) {
          app.getActive3DView().onSizeChange();
          this.viewBox = undefined;
        } else {
          app.getActive2DView().fit();
        }
      }
      
      eventData.stopPropagation();
    }, this);
  }

  foldResizeWidget(): void {
    this.thumbnailViewHandler?.thumbnailModal?.toggleModalShow(true);
    this.thumbnailViewHandler?.thumbnailModal?.showToggleModalBtn(true);
  }
}