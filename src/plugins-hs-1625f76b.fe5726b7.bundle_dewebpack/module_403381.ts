interface CameraPosition {
  [key: string]: unknown;
}

interface UploadFileOptions {
  key: string;
  contentType: string;
}

interface UploadPayload {
  designId: string;
  positions: CameraPosition[];
  sid: string;
}

interface Plugin {
  [key: string]: unknown;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | undefined;
}

interface DesignMetadata {
  get(key: string): string | undefined;
  set(key: string, value: unknown): void;
  flush(): void;
}

interface Floorplan {
  snapshots: CameraPosition[] | unknown;
}

interface App {
  pluginManager: PluginManager;
  floorplan: Floorplan;
  designMetadata: DesignMetadata;
}

interface HSAppStatic {
  App: {
    getApp(): App;
  };
  Config: {
    ENV: string;
  };
  Io: {
    Request: {
      Design: {
        uploadFile(payload: UploadPayload, options: UploadFileOptions): Promise<unknown>;
      };
    };
  };
}

interface HSFPConstantsStatic {
  PluginType: {
    ContextualTools: string;
  };
}

interface AdskUserStatic {
  getUserSessionId(): string;
}

declare const HSApp: HSAppStatic;
declare const HSFPConstants: HSFPConstantsStatic;
declare const adskUser: AdskUserStatic;

const ORBIT_VIEW_PLUGIN_ID = 'hsw.plugin.orbitview.Plugin';
const RENDER_PLUGIN_ID = 'hsw.plugin.render.Plugin';
const CAMERA_POSITION_KEY_PREFIX = 'cameraposition/';
const CAMERA_POSITION_METADATA_KEY = 'cameraposition';
const DESIGN_ID_METADATA_KEY = 'designId';
const CONTENT_TYPE_JSON = 'application/json';
const SIDEBAR_WIDTH = 220;
const ITEM_WIDTH = 280;
const MIN_PAGE_SIZE = 1;

export const getApp = (): App => {
  return HSApp.App.getApp();
};

export const getContextualToolsPlugin = (): Plugin | undefined => {
  return getApp().pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools);
};

export const getOrbitViewPlugin = (): Plugin | undefined => {
  return getApp().pluginManager.getPlugin(ORBIT_VIEW_PLUGIN_ID);
};

export const getRenderPlugin = (): Plugin | undefined => {
  return getApp().pluginManager.getPlugin(RENDER_PLUGIN_ID);
};

export const getCameraPositions = (): CameraPosition[] => {
  const app = getApp();
  const floorplan = app.floorplan;
  
  if (!floorplan) {
    return [];
  }
  
  if (Array.isArray(floorplan.snapshots)) {
    return [...floorplan.snapshots];
  }
  
  return [];
};

export const setCameraPositions = (positions: CameraPosition[]): Promise<unknown | null> => {
  const app = getApp();
  const designId = app.designMetadata.get(DESIGN_ID_METADATA_KEY);
  
  const uploadOptions: UploadFileOptions = {
    key: `${CAMERA_POSITION_KEY_PREFIX}${designId}`,
    contentType: CONTENT_TYPE_JSON
  };
  
  const payload: UploadPayload = {
    designId: designId ?? '',
    positions,
    sid: `${adskUser.getUserSessionId()}, ${HSApp.Config.ENV}`
  };
  
  app.floorplan.snapshots = [...positions];
  
  return HSApp.Io.Request.Design.uploadFile(payload, uploadOptions)
    .then((response) => {
      app.designMetadata.set(CAMERA_POSITION_METADATA_KEY, response);
      app.designMetadata.flush();
      return response;
    })
    .catch(() => {
      return null;
    });
};

export const getPageSize = (): number => {
  const windowWidth = window.innerWidth;
  const availableWidth = windowWidth - SIDEBAR_WIDTH;
  const calculatedSize = Math.floor(availableWidth / ITEM_WIDTH);
  
  return calculatedSize >= MIN_PAGE_SIZE ? calculatedSize : MIN_PAGE_SIZE;
};