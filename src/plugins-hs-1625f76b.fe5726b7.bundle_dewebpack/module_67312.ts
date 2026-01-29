import { createAction } from './action-creator';
import ActionTypes from './action-types';
import { getApp, getCameraPositions, getRenderPlugin } from './app-utils';

interface CameraData {
  type: string;
  camera: {
    horizontal_fov: number;
    pitch: number;
    target_x: number;
    target_y: number;
    x: number;
    y: number;
    z: number;
    near: number;
  };
}

interface CameraObject {
  type: string;
  horizontal_fov: number;
  pitch: number;
  target_x: number;
  target_y: number;
  x: number;
  y: number;
  z: number;
  near: number;
}

interface CameraTargetProperties {
  horizontal_fov: number;
  pitch: number;
  target_x: number;
  target_y: number;
  x: number;
  y: number;
  z: number;
  near: number;
}

interface App {
  floorplan: {
    active_camera: {
      type: string;
    };
    skybox: {
      setEnabled(enabled: boolean): void;
    };
    cameras: Record<string, CameraObject>;
  };
  activeEnvironmentId: string;
  pluginManager: {
    getPlugin(pluginType: string): ViewSwitchPlugin | null;
  };
}

interface RenderPlugin {
  selectImageType(imageType: string): void;
}

interface ViewSwitchPlugin {
  show(): void;
}

declare const HSFPConstants: {
  Environment: {
    Render: string;
  };
  PluginType: {
    ViewSwitch: string;
  };
};

declare const TWEEN: {
  Tween: new (target: CameraObject) => {
    to(properties: CameraTargetProperties, duration: number): {
      easing(easingFunction: unknown): {
        start(): void;
      };
    };
  };
  Easing: {
    Quadratic: {
      Out: unknown;
    };
  };
};

const CAMERA_ANIMATION_DURATION = 500;
const ORBIT_VIEW_TYPE = 'orbitview';
const ORBIT_VIEW_IMAGE_TYPE = '2';
const DEFAULT_IMAGE_TYPE = '0';

/**
 * Handles camera selection and transition animation
 */
function selectCamera(cameraIndex: number): void {
  const app: App = getApp();
  const cameraPositions: CameraData[] | null = getCameraPositions();

  if (!cameraPositions || cameraPositions.length <= cameraIndex || cameraIndex < 0) {
    return;
  }

  const selectedCamera = cameraPositions[cameraIndex];

  if (selectedCamera.type !== app.floorplan.active_camera.type) {
    const renderPlugin: RenderPlugin = getRenderPlugin();
    const imageType = selectedCamera.type === ORBIT_VIEW_TYPE 
      ? ORBIT_VIEW_IMAGE_TYPE 
      : DEFAULT_IMAGE_TYPE;
    
    renderPlugin.selectImageType(imageType);

    if (app.activeEnvironmentId !== HSFPConstants.Environment.Render) {
      app.floorplan.skybox.setEnabled(false);
    }

    const viewSwitchPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
    if (viewSwitchPlugin) {
      viewSwitchPlugin.show();
    }
  }

  const cameras = app.floorplan.cameras;
  let targetCamera: CameraObject | undefined;

  Object.values(cameras).forEach((camera) => {
    if (camera.type === selectedCamera.type) {
      targetCamera = camera;
    }
  });

  if (!targetCamera) {
    return;
  }

  const targetProperties: CameraTargetProperties = {
    horizontal_fov: selectedCamera.camera.horizontal_fov,
    pitch: selectedCamera.camera.pitch,
    target_x: selectedCamera.camera.target_x,
    target_y: selectedCamera.camera.target_y,
    x: selectedCamera.camera.x,
    y: selectedCamera.camera.y,
    z: selectedCamera.camera.z,
    near: selectedCamera.camera.near
  };

  new TWEEN.Tween(targetCamera)
    .to(targetProperties, CAMERA_ANIMATION_DURATION)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
}

export default createAction(
  ActionTypes.SELECT_CAMERA,
  (cameraIndex: number) => {
    selectCamera(cameraIndex);
    return { selectIndex: cameraIndex };
  }
);