import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import CameraPositionPanel from './components/CameraPositionPanel';
import { showCameraPosition } from './actions/showCameraPosition';
import { hideCameraPosition } from './actions/hideCameraPosition';
import { setReadonlyMode } from './actions/setReadonlyMode';
import { rootDivId } from './constants';
import { getContextualToolsPlugin } from './utils/pluginUtils';

interface CameraPosition {
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  target: {
    x: number;
    y: number;
    z: number;
  };
  [key: string]: unknown;
}

interface CameraPositionResponse {
  positions: CameraPosition[];
}

interface AppMetadata {
  get(key: string): string | undefined;
}

interface FloorPlan {
  snapshots: CameraPosition[];
}

interface SelectionManager {
  signalSelectionChanged: {
    listen(callback: () => void): void;
  };
}

interface HSFPApp {
  activeView: unknown;
  selectionManager: SelectionManager;
  floorplan: FloorPlan;
  designMetadata: AppMetadata;
  signalViewActivated: {
    listen(callback: (view: unknown) => void, context: unknown): void;
  };
  signalDocumentOpened: {
    listen(callback: () => void, context: unknown): void;
  };
  is2DViewActive(): boolean;
}

interface PluginContext {
  app: HSFPApp;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface ContextualToolsPlugin {
  signalContralPopup: {
    listen(callback: (event: unknown) => void): void;
  };
}

interface CameraPositionPopupEvent {
  isActive: boolean;
}

interface OrbitViewPlugin {
  signalCameraPositionPopup: {
    dispatch(event: CameraPositionPopupEvent): void;
  };
}

interface PluginManager {
  getPlugin(pluginId: string): OrbitViewPlugin;
}

interface ReduxState {
  isShown: boolean;
  isPinned: boolean;
}

interface Store {
  dispatch(action: unknown): void;
  getState(): ReduxState;
}

class RIBPApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'RIBPApiError';
  }
}

enum RIBPApiStatus {
  STATUS_GENERAL_ERROR = -1,
}

const codeMessage: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

class CameraPositionPlugin extends HSApp.Plugin.IPlugin {
  private isReadonly: boolean = false;
  private app!: HSFPApp;

  constructor() {
    super({
      name: 'Camera Position Plugin',
      description: 'List camera position list',
      dependencies: [HSFPConstants.PluginType.ContextualTools],
    });
  }

  onActive(context: PluginContext, options: unknown): void {
    super.onActive(context, options);

    this.app = context.app;

    $('#plugin-container').append(`<div id="${rootDivId}"></div>`);

    ReactDOM.render(
      React.createElement(
        Provider,
        { store },
        React.createElement(CameraPositionPanel, null)
      ),
      document.getElementById(rootDivId)
    );

    this.app.selectionManager.signalSelectionChanged.listen(() => {
      if (this.isShown() && !this.isPinned()) {
        this.hide();
      }
    });

    this.app.signalViewActivated.listen(
      (view: unknown) => {
        this.app.activeView;
        if (this.app.is2DViewActive() && this.isShown() && !this.isPinned()) {
          this.hide();
        }
      },
      this
    );

    getContextualToolsPlugin().signalContralPopup.listen((event: unknown) => {
      this._checkHide();
    });

    this.app.signalDocumentOpened.listen(this.loadCameraInfo, this);
  }

  loadCameraInfo(): void {
    if (this.app.floorplan.snapshots.length === 0) {
      const cameraPositionUrl = this.app.designMetadata.get('cameraposition');

      if (cameraPositionUrl) {
        window
          .fetch(cameraPositionUrl)
          .then((response: Response) => {
            if (response.status >= 200 && response.status < 300) {
              return response;
            }
            const errorMessage =
              codeMessage[response.status] || response.statusText;
            throw new RIBPApiError(
              errorMessage,
              response.status || RIBPApiStatus.STATUS_GENERAL_ERROR
            );
          })
          .then((response: Response) => response.json())
          .then((data: CameraPositionResponse) => {
            for (const position of data.positions) {
              this.app.floorplan.snapshots.push(position);
            }
          });
      }
    }
  }

  show(position: CameraPosition): void {
    store.dispatch(showCameraPosition(position, this.isReadonly));
  }

  hide(): void {
    HSApp.App.getApp()
      .pluginManager.getPlugin('hsw.plugin.orbitview.Plugin')
      .signalCameraPositionPopup.dispatch({ isActive: false });

    store.dispatch(hideCameraPosition());
  }

  isShown(): boolean {
    return store.getState().isShown;
  }

  setCameraPositionEditMode(): void {
    this.isReadonly = false;
    store.dispatch(setReadonlyMode(false));
  }

  setCameraPositionReadonlyMode(): void {
    this.isReadonly = true;
    store.dispatch(setReadonlyMode(true));
  }

  isPinned(): boolean {
    return store.getState().isPinned;
  }

  private _checkHide(): void {
    if (this.isShown() && !this.isPinned()) {
      this.hide();
    }
  }
}

HSApp.Plugin.registerPlugin(
  'hsw.plugin.cameraposition.Plugin',
  CameraPositionPlugin
);