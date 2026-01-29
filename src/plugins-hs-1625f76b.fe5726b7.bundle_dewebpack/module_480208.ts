import { getApp, getCameraPositions, setCameraPositions } from './403381';
import { getClipData, snapshotWidth, snapshotHeight } from './552169';

interface CameraData {
  target_x: number;
  target_y: number;
  target_z: number;
  x: number;
  y: number;
  z: number;
  horizontal_fov: number;
  pitch: number;
}

interface CameraPosition {
  thumbnail: string;
  id: string;
  camera: CameraData;
  type: string;
  name: string;
}

interface SaveDocumentOptions {
  offsetWidth: number;
  format: string;
  width: number;
  height: number;
  forground: boolean;
}

function generateUuidSegment(): string {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}

function getNextCameraPositionIndex(positions: CameraPosition[]): number {
  const indices: number[] = [];
  const indexMap: Record<number, number> = {};
  const cameraPositionPrefix = ResourceManager.getString("project_camera_position");

  positions.forEach((position) => {
    if (position.name.indexOf(cameraPositionPrefix) === 0) {
      try {
        const index = parseInt(position.name.split(cameraPositionPrefix)[1]);
        indexMap[index] = 1;
      } catch (error) {
        // Ignore parsing errors
      }
    }
  });

  Object.keys(indexMap).forEach((key) => {
    indices.push(parseInt(key));
  });

  indices.sort((a, b) => a < b ? -1 : 1);

  for (let i = 0; i < indices.length; i++) {
    if (indices[i] !== i + 1) {
      return i + 1;
    }
  }

  return indices.length + 1;
}

function generateUuid(): string {
  return `${generateUuidSegment()}${generateUuidSegment()}-${generateUuidSegment()}-${generateUuidSegment()}-${generateUuidSegment()}-${generateUuidSegment()}${generateUuidSegment()}${generateUuidSegment()}`;
}

function saveCameraPosition(thumbnailUrl: string): void {
  const app = getApp();
  let positions = getCameraPositions();

  if (!positions) {
    positions = [];
  }

  const cameraPositionPrefix = ResourceManager.getString("project_camera_position");
  const activeCamera = app.floorplan.active_camera;

  const newPosition: CameraPosition = {
    thumbnail: thumbnailUrl,
    id: generateUuid(),
    camera: {
      target_x: activeCamera.target_x,
      target_y: activeCamera.target_y,
      target_z: activeCamera.target_z,
      x: activeCamera.x,
      y: activeCamera.y,
      z: activeCamera.z,
      horizontal_fov: activeCamera.horizontal_fov,
      pitch: activeCamera.pitch
    },
    type: activeCamera.type,
    name: positions.length <= 0 
      ? `${cameraPositionPrefix}1` 
      : `${cameraPositionPrefix}${getNextCameraPositionIndex(positions)}`
  };

  positions.splice(0, 0, newPosition);
  setCameraPositions(positions);
}

async function uploadScreenshot(imageResource: any, width: number, height: number, offsetWidth: number): Promise<string> {
  const clipData = getClipData(imageResource, width, height, snapshotWidth, snapshotHeight, offsetWidth);

  if (adskUser.sid) {
    const uploadOptions: Record<string, any> = {};

    if (HSApp.Config.TENANT === "fp") {
      Object.assign(uploadOptions, { resType: "model" });
    }

    return HSApp.Io.Request.Design.uploadFile(clipData, uploadOptions);
  }

  return Promise.reject();
}

export default function captureCamera3DSnapshot(): Promise<void> {
  const app = getApp();
  const clientRect = app.getActive3DView().context.clientRect;
  const width = clientRect.width;
  const height = clientRect.height;
  const offsetWidth = $("#render_tab .main").width() 
    ? -$("#render_tab .main").width() / 2 + 9 
    : 0;

  return new Promise<void>((resolve, reject) => {
    const saveOptions: SaveDocumentOptions = {
      offsetWidth,
      format: "image/png",
      width,
      height,
      forground: false
    };

    app.saveDocument("thumbnail 3d", saveOptions, (imagePath: string) => {
      ResourceManager.load(imagePath, HSApp.Io.Load.LoadTypeEnum.PluginImage)
        .then((imageResource: any) => {
          imageResource.xAppendDbgInfo("Screenshot.3DImg; ");
          return uploadScreenshot(imageResource, width, height, offsetWidth);
        })
        .then((thumbnailUrl: string) => {
          saveCameraPosition(thumbnailUrl);
          resolve();
        })
        .catch(reject);
    });
  });
}