import { createAction } from './actions';
import ActionTypes from './actionTypes';
import { CreateCamera } from './cameraCreator';
import { getContextualToolsPlugin, getApp } from './appUtils';
import { getClipBound, getClipData } from './clipUtils';

interface SaveOptions {
  offsetWidth: number;
  format: string;
  width: number;
  height: number;
  forground: boolean;
}

interface AppState {
  isAnimation: boolean;
}

interface PersistencePlugin {
  ensureSaved(): Promise<boolean>;
}

interface PluginManager {
  getPlugin(pluginName: string): PersistencePlugin;
}

interface View3D {
  context: {
    clientRect: {
      width: number;
      height: number;
    };
  };
}

interface App {
  pluginManager: PluginManager;
  getActive3DView(): View3D;
  saveDocument(
    name: string,
    options: SaveOptions,
    callback: (imageData: string) => void
  ): void;
}

interface HSAppGlobal {
  App: {
    getApp(): App;
  };
  Io: {
    Load: {
      LoadTypeEnum: {
        PluginImage: string;
      };
    };
  };
}

interface ResourceManager {
  load(data: string, loadType: string): Promise<ImageResource>;
}

interface ImageResource {
  xAppendDbgInfo(info: string): void;
}

declare const HSApp: HSAppGlobal;
declare const ResourceManager: ResourceManager;
declare const $: (selector: string) => JQueryElement;

interface JQueryElement {
  width(): number;
}

interface StateStore {
  getState(): AppState;
}

declare const stateStore: StateStore;

type DispatchFunction = (action: unknown) => void;

type ThunkFunction = (dispatch: DispatchFunction) => Promise<void | unknown>;

function captureThumbnail(callback: (imageData: string) => void): void {
  getContextualToolsPlugin();
  
  const app = getApp();
  const view3D = app.getActive3DView();
  const clientRect = view3D.context.clientRect;
  const viewportWidth = clientRect.width;
  const viewportHeight = clientRect.height;
  
  const renderTabMainWidth = $('#render_tab .main').width();
  const offsetWidth = renderTabMainWidth ? -renderTabMainWidth / 2 + 9 : 0;
  
  const saveOptions: SaveOptions = {
    offsetWidth,
    format: 'image/png',
    width: viewportWidth,
    height: viewportHeight,
    forground: false
  };
  
  app.saveDocument('thumbnail 3d', saveOptions, (imageData: string) => {
    ResourceManager.load(imageData, HSApp.Io.Load.LoadTypeEnum.PluginImage).then((imageResource: ImageResource) => {
      imageResource.xAppendDbgInfo('Screenshot.3DImg; ');
      
      const clipBounds = getClipBound(viewportWidth, viewportHeight, true);
      const clippedData = getClipData(
        imageResource,
        viewportWidth,
        viewportHeight,
        clipBounds[2],
        clipBounds[3],
        offsetWidth
      );
      
      callback(clippedData);
    });
  });
}

function createCameraAction(thumbnailCallback?: (imageData: string) => void): ThunkFunction {
  return (dispatch: DispatchFunction): Promise<void | unknown> => {
    const app = HSApp.App.getApp();
    const persistencePlugin = app.pluginManager.getPlugin('hsw.plugin.persistence.Plugin');
    
    return persistencePlugin.ensureSaved().then((isSaved: boolean) => {
      if (!isSaved) {
        return Promise.reject('Need to save before render');
      }
      
      const currentState = stateStore.getState();
      if (currentState.isAnimation) {
        return undefined;
      }
      
      dispatch(createAction(ActionTypes.START_ANIMATION)());
      
      if (thumbnailCallback) {
        captureThumbnail(thumbnailCallback);
      }
      
      return CreateCamera().then(() => {
        dispatch(createAction(ActionTypes.SET_PROGRESS)(0));
        dispatch(createAction(ActionTypes.END_ANIMATION)());
        dispatch(createAction(ActionTypes.REFRESH_VIEW)());
        dispatch(createAction(ActionTypes.RESET_RENDER)(0));
      });
    });
  };
}

export default createCameraAction;