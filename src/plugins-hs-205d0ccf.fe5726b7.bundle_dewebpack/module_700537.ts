import pako from 'pako';

interface CameraPosition {
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  target_z: number;
  horizontal_fov: number;
  clip: boolean;
}

interface CameraData {
  pos: [number, number, number];
  target: [number, number, number];
  up: [number, number, number];
  fov: number;
  near: number;
  far: number;
  x?: number;
  y?: number;
  z?: number;
  target_x?: number;
  target_y?: number;
  target_z?: number;
  pitch?: number;
}

interface CameraItem {
  camera: CameraData;
  roomTypeDisplayName?: string;
}

interface RoomCameraConfig {
  camera_single: CameraItem[];
  camera_sphere: CameraItem[];
}

interface RoomWanderData {
  [roomId: string]: RoomCameraConfig;
}

interface LayoutWanderData {
  room_wander: RoomWanderData;
}

interface IntelligenceData {
  layout_wander?: LayoutWanderData;
  room_sort?: string[];
}

interface CameraResult {
  imageCamera: CameraItem[];
  panoCamera: CameraItem[];
}

interface TaskResult {
  designId?: string;
  taskId?: string;
}

interface GenerateUrlResponse {
  id: string;
  houseDataUrl: string;
}

interface SmartDataResponse {
  data?: {
    result?: {
      code: number;
      data: string;
    };
  };
}

function uploadData(url: string, data: unknown): Promise<unknown> {
  if (url.indexOf('.json.gzip') !== -1) {
    const compressed = pako.gzip(JSON.stringify(data));
    const blob = new Blob([compressed], {
      type: 'application/json'
    });
    return NWTK.ajax.put(url, blob, {
      dataType: undefined,
      processData: false,
      contentType: 'application/octet-stream',
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
  }
  return NWTK.ajax.put(url, data, {
    dataType: 'text'
  });
}

const intelligenceTask = {
  _stop: false,
  _interval: null as number | null,

  async start(): Promise<IntelligenceData> {
    const executeTask = async (): Promise<TaskResult> => {
      this._stop = false;
      const app = HSApp.App.getApp();
      const designId = app.designMetadata.get('designId');

      const urlResponse: GenerateUrlResponse = await NWTK.mtop.Render.videoSmartGenerateUrl({
        data: { designId }
      }).then((response: { data: { result: GenerateUrlResponse } }) => response.data.result);

      if (!urlResponse) {
        return {};
      }

      const houseDataUrl = urlResponse.houseDataUrl.replace('http://', 'https://');
      const houseDataPath = houseDataUrl.split('?')[0];
      const houseData = HSApp.Util.Recommend.getDataForAutoStyler(true, undefined, undefined);

      await uploadData(houseDataUrl, houseData);

      if (this._stop) {
        return {};
      }

      const taskId = urlResponse.id;

      await NWTK.mtop.Render.videSmartGenerateData({
        data: {
          taskId,
          designId,
          houseData: houseDataPath
        }
      });

      if (this._stop) {
        return {};
      }

      return { designId, taskId };
    };

    return new Promise((resolve, reject) => {
      executeTask().then((taskResult) => {
        if (!taskResult.designId || !taskResult.taskId) {
          resolve({} as IntelligenceData);
          this.end();
          return;
        }

        const startTime = Date.now();
        const TIMEOUT_MS = 300000; // 5 minutes
        const POLL_INTERVAL_MS = 2000;

        this._interval = window.setInterval(() => {
          NWTK.mtop.Render.videoSmartGetData({
            data: {
              designId: taskResult.designId,
              taskId: taskResult.taskId
            }
          }).then((response: SmartDataResponse) => {
            if (response.data?.result) {
              if (response.data.result.code === 0) {
                try {
                  resolve(JSON.parse(response.data.result.data));
                  this.end();
                } catch (error) {
                  reject(error);
                  this.end();
                }
              } else {
                reject(new Error('Invalid result code'));
                this.end();
              }
            }
          });

          if (Date.now() - startTime > TIMEOUT_MS) {
            reject(new Error('Timeout'));
            this.end();
          }
        }, POLL_INTERVAL_MS);
      });
    });
  },

  end(): void {
    this._stop = true;
    if (this._interval !== null) {
      window.clearInterval(this._interval);
      this._interval = null;
    }
  }
};

function normalizeCameraPosition(camera: CameraData): CameraPosition {
  const targetVector = new THREE.Vector2(
    camera.target_x! - camera.x!,
    camera.target_y! - camera.y!
  );
  const horizontalDistance = targetVector.length();
  const verticalSlope = (camera.target_z! - camera.z!) / (horizontalDistance || 1);

  targetVector.normalize();

  return {
    x: camera.x!,
    y: camera.y!,
    z: camera.z!,
    target_x: camera.x! + targetVector.x,
    target_y: camera.y! + targetVector.y,
    target_z: camera.z! + verticalSlope,
    horizontal_fov: camera.fov,
    clip: camera.near > 0.1
  };
}

function getRoomTypeDisplayName(room: { roomType: string; roomTypeDisplayName?: string }): string {
  if (!room) {
    return '';
  }

  if (room.roomTypeDisplayName !== '' && room.roomTypeDisplayName !== undefined) {
    return room.roomTypeDisplayName;
  }

  if (!ResourceManager) {
    return room.roomTypeDisplayName ?? '';
  }

  return ResourceManager.getString(`model_roomtype_${room.roomType}`) ||
         ResourceManager.getString('model_roomtype_none');
}

function extractCameras(cameraType: 'image' | 'pano', roomData: Array<Record<string, RoomCameraConfig>>): CameraItem[] {
  const cameras: CameraItem[] = [];

  roomData.forEach((roomConfig) => {
    const roomId = Object.keys(roomConfig)[0];
    const cameraList = cameraType === 'pano' 
      ? roomConfig[roomId].camera_sphere 
      : roomConfig[roomId].camera_single;

    cameraList.forEach((cameraItem, index) => {
      const camera = cameraItem.camera;
      const normalizedPosition = normalizeCameraPosition({
        ...camera,
        x: camera.pos[0],
        y: camera.pos[1],
        z: camera.pos[2],
        target_x: camera.target[0],
        target_y: camera.target[1],
        target_z: camera.target[2]
      });

      Object.assign(camera, normalizedPosition);

      const app = HSApp.App.getApp();
      const floorplan = app.floorplan;
      let matchedRoom: { roomType: string; roomTypeDisplayName?: string; ID: string } | null = null;

      floorplan.forEachRoom((room: { ID: string; roomType: string; roomTypeDisplayName?: string }) => {
        if (room.ID === roomId) {
          matchedRoom = room;
        }
      });

      if (matchedRoom) {
        cameraItem.roomTypeDisplayName = `${getRoomTypeDisplayName(matchedRoom)}-${index + 1}`;
      }

      cameras.push(cameraItem);
    });
  });

  return cameras;
}

function flipImageData(imageData: Uint8Array, width: number, height: number): Uint8ClampedArray {
  const flipped = new Uint8ClampedArray(width * height * 4);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const sourceIndex = (height - 1 - row) * width + col;
      const targetIndex = row * width + col;

      flipped[4 * targetIndex + 0] = imageData[4 * sourceIndex + 0];
      flipped[4 * targetIndex + 1] = imageData[4 * sourceIndex + 1];
      flipped[4 * targetIndex + 2] = imageData[4 * sourceIndex + 2];
      flipped[4 * targetIndex + 3] = imageData[4 * sourceIndex + 3];
    }
  }

  return flipped;
}

export async function getIntelligenceCameras(): Promise<CameraResult | undefined> {
  const T3D = window.T3D;
  const Rectangle = T3D.Rectangle;
  const Vector3 = T3D.Vector3;

  const app = HSApp.App.getApp();
  const renderPlugin = app.pluginManager.getPlugin('hsw.plugin.render.Plugin');
  const handler = renderPlugin.getHandler();

  try {
    const intelligenceData = await intelligenceTask.start();

    if (!intelligenceData?.layout_wander?.room_wander) {
      return undefined;
    }

    const roomWanderData = intelligenceData.layout_wander.room_wander;
    const roomSort = intelligenceData.room_sort ?? [];

    const sortedRoomData: Array<Record<string, RoomCameraConfig>> = [];
    roomSort.forEach((roomId) => {
      sortedRoomData.push({ [roomId]: roomWanderData[roomId] });
    });

    const imageCameras = extractCameras('image', sortedRoomData);
    const panoCameras = extractCameras('pano', sortedRoomData);

    const THUMBNAIL_WIDTH = 96;
    const THUMBNAIL_HEIGHT = 54;
    const captureRectangle = new Rectangle(0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    const capturePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.T3dCapture);

    const allCameras = imageCameras.concat(panoCameras);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', String(THUMBNAIL_WIDTH));
    canvas.setAttribute('height', String(THUMBNAIL_HEIGHT));
    const context = canvas.getContext('2d')!;

    const capturePromises = allCameras.map((cameraItem) => {
      const camera = cameraItem.camera;
      const position = camera.pos;
      const target = camera.target;
      const up = camera.up;

      const lookDirection = new THREE.Vector3(
        camera.x! - camera.target_x!,
        camera.y! - camera.target_y!,
        camera.z! - camera.target_z!
      );

      camera.pitch = THREE.Math.radToDeg(
        lookDirection.angleTo(new THREE.Vector3(0, 0, 1))
      ) - 90;

      return new Promise<void>((resolve, reject) => {
        window.T3D.App.Instance.update(0);

        const midHeight = handler.getUI().midH;
        const canvasSize = handler.getUI().getCanvasSize();
        const verticalFovRad = handler.viewFovToRealFov(
          midHeight ?? 540,
          canvasSize.h,
          camera.fov
        ) / 180 * Math.PI;

        const ASPECT_RATIO = 16 / 9;
        const horizontalFovDeg = 2 * Math.atan(
          Math.tan(0.5 * verticalFovRad) * ASPECT_RATIO
        ) / Math.PI * 180;

        capturePlugin.update(
          horizontalFovDeg,
          camera.near,
          camera.far,
          captureRectangle,
          new Vector3(position[0], position[2], -position[1]),
          new Vector3(target[0], target[2], -target[1]),
          new Vector3(up[0], up[1], up[2]),
          (capturedData: Uint8Array) => {
            const flippedData = flipImageData(capturedData, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
            const imageData = new ImageData(flippedData, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);

            context.putImageData(imageData, 0, 0);
            const thumbnailDataUrl = canvas.toDataURL('image/jpeg');

            Object.assign(cameraItem, { thumbnail: thumbnailDataUrl });
            resolve();
          }
        );
      });
    });

    await Promise.all(capturePromises);
    capturePlugin.finish();

    return {
      imageCamera: imageCameras,
      panoCamera: panoCameras
    };
  } catch (error) {
    return undefined;
  }
}