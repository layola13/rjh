import { getclipImg } from './clipUtils';

export const SPARK_CAMERA_TYPE = "9";

interface Camera {
  target_x: number;
  target_y: number;
  target_z: number;
  x: number;
  y: number;
  z: number;
  horizontal_fov: number;
  pitch: number;
  near: number;
  clip: number;
  zoom: number;
  type?: string;
}

interface Snapshot {
  id: string;
  camera: Camera;
  type: string;
  name: string;
  renderType: string;
  thumbnail?: string;
}

interface CameraItem {
  name: string;
  type?: string;
}

interface OriRenderUI {
  cropType?: string;
  midH?: number;
  oriCanvasSize?: {
    h?: number;
  };
}

interface SetSparkCameraOptions {
  oriRenderUI?: OriRenderUI;
  renderType?: string;
}

interface UploadFileOptions {
  resType?: string;
}

/**
 * Generate unique camera name based on existing cameras
 */
function generateCameraName(cameras: CameraItem[]): string {
  const prefix = ResourceManager.getString("project_camera_position");
  
  const numberedCameras = cameras
    .filter((camera) => {
      const numberPart = camera.name.replace(/[^0-9]/gi, "");
      const nameLength = camera.name.length;
      const namePrefixLength = nameLength - numberPart.length;
      return camera.name.slice(0, namePrefixLength) === prefix && parseInt(numberPart) > 0;
    })
    .sort((a, b) => {
      const numA = parseInt(a.name.replace(/[^0-9]/gi, ""));
      const numB = parseInt(b.name.replace(/[^0-9]/gi, ""));
      return numA - numB;
    });

  if (numberedCameras.length === 0) {
    return `${prefix}1`;
  }

  const lastCameraNumber = parseInt(
    numberedCameras[numberedCameras.length - 1].name.replace(/[^0-9]/gi, "")
  );
  const nextNumber = lastCameraNumber + 1;
  
  return `${prefix}${nextNumber}`;
}

/**
 * Calculate adjusted field of view based on canvas dimensions
 */
function calculateAdjustedFOV(
  midHeight: number = 0,
  canvasHeight: number = 0,
  baseFOV: number
): number {
  if (!midHeight || !canvasHeight) {
    return baseFOV;
  }
  
  return (360 * Math.atan((canvasHeight + 42) * Math.tan(baseFOV * Math.PI / 360) / midHeight)) / Math.PI;
}

/**
 * Create a new spark camera snapshot
 */
export function createSparkCamera(
  existingCameras: CameraItem[],
  renderTarget: HTMLElement,
  cameraId?: string,
  cameraName?: string
): Promise<Snapshot> {
  const app = HSApp.App.getApp();
  const renderPlugin = app.pluginManager.getPlugin("hsw.plugin.render.Plugin");
  const renderHandler = renderPlugin.getHandler();
  const activeCamera = app.floorplan.active_camera;

  const snapshotData: Snapshot = {
    id: cameraId ?? generateUUID(),
    camera: {
      target_x: activeCamera.target_x,
      target_y: activeCamera.target_y,
      target_z: activeCamera.z,
      x: activeCamera.x,
      y: activeCamera.y,
      z: activeCamera.z,
      horizontal_fov: activeCamera.horizontal_fov,
      pitch: activeCamera.pitch,
      near: activeCamera.near,
      clip: activeCamera.clip,
      zoom: activeCamera.zoom
    },
    type: activeCamera.type,
    name: cameraName ?? generateCameraName(existingCameras),
    renderType: SPARK_CAMERA_TYPE
  };

  const clipImagePromise = getclipImg(renderTarget).then((imageUrl) => ({
    url: imageUrl,
    img: imageUrl
  }));

  return renderHandler
    .simpleAnimation(
      {
        animationDirection: "right",
        animationTarget: "#sparkCreateCamera"
      },
      clipImagePromise
    )
    .then((thumbnailData) => {
      snapshotData.thumbnail = thumbnailData;

      const uploadOptions: UploadFileOptions = {};
      if (HSApp.Config.TENANT === "fp") {
        uploadOptions.resType = "model";
      }

      return HSApp.Io.Request.Design.uploadFile(thumbnailData, uploadOptions)
        .then((uploadedUrl) => {
          app.floorplan.addSnapshot(
            {
              ...snapshotData,
              thumbnail: uploadedUrl
            },
            true
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => snapshotData);
    });
}

/**
 * Set/animate camera to spark camera position
 */
export function setSparkCamera(
  targetCamera: Camera,
  cameraType: string,
  options: SetSparkCameraOptions = {}
): void {
  const floorplan = HSApp.App.getApp().floorplan;
  const cameras = floorplan.cameras;

  let currentCamera: Camera | undefined;
  Object.values(cameras).forEach((camera) => {
    if (camera.type === cameraType) {
      currentCamera = camera;
    }
  });

  if (!currentCamera) {
    return;
  }

  const { oriRenderUI = {}, renderType } = options;

  const adjustedHorizontalFOV =
    oriRenderUI.cropType === "vertical" &&
    renderType === "0" &&
    cameraType === HSCore.Model.CameraTypeEnum.FirstPerson
      ? calculateAdjustedFOV(
          oriRenderUI.midH,
          oriRenderUI.oriCanvasSize?.h,
          targetCamera.horizontal_fov
        )
      : targetCamera.horizontal_fov;

  const targetCameraState: Camera = {
    horizontal_fov: adjustedHorizontalFOV,
    near: targetCamera.near,
    pitch: targetCamera.pitch,
    target_x: targetCamera.target_x,
    target_y: targetCamera.target_y,
    target_z: targetCamera.target_z,
    x: targetCamera.x,
    y: targetCamera.y,
    z: targetCamera.z,
    zoom: targetCamera.zoom,
    clip: currentCamera.clip
  };

  new TWEEN.Tween(currentCamera)
    .to(targetCameraState, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(() => {
      currentCamera!.clip = targetCamera.clip;
    })
    .start();
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}