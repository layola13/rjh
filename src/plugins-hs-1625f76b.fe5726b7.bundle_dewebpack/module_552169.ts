const SNAPSHOT_WIDTH = 508;
const SNAPSHOT_HEIGHT = 288;

interface CameraPosition {
  id: string | number;
  name: string;
}

interface App {
  is3DViewActive(): boolean;
}

interface ImageUtil {
  clip(
    source: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number
  ): HTMLCanvasElement;
}

interface ObjectPool {
  getInstance(): {
    get(type: string): HTMLCanvasElement;
  };
}

declare const HSApp: {
  Util: {
    Image: ImageUtil;
  };
};

declare const HSCore: {
  Util: {
    ObjectPool: ObjectPool;
  };
};

declare global {
  interface HTMLCanvasElement {
    xRelease(): void;
    xAppendDbgInfo(info: string): void;
  }
}

function getApp(): App {
  // Implementation from module 403381
  throw new Error('getApp must be imported from the appropriate module');
}

function getCameraPositions(): CameraPosition[] {
  // Implementation from module 403381
  throw new Error('getCameraPositions must be imported from the appropriate module');
}

function setCameraPositions(positions: CameraPosition[]): void {
  // Implementation from module 403381
  throw new Error('setCameraPositions must be imported from the appropriate module');
}

function calculateClipBounds(
  sourceWidth: number,
  sourceHeight: number
): [number, number, number, number] {
  const sourceAspectRatio = sourceWidth / sourceHeight;
  const targetAspectRatio = SNAPSHOT_WIDTH / SNAPSHOT_HEIGHT;

  if (sourceAspectRatio > targetAspectRatio) {
    const clippedWidth = sourceHeight * SNAPSHOT_WIDTH / SNAPSHOT_HEIGHT;
    return [
      sourceWidth / 2 - clippedWidth / 2,
      0,
      clippedWidth,
      sourceHeight
    ];
  }

  const clippedHeight = sourceWidth * SNAPSHOT_HEIGHT / SNAPSHOT_WIDTH;
  return [
    0,
    (sourceHeight - clippedHeight) / 2,
    sourceWidth,
    clippedHeight
  ];
}

export function getClipBound(
  sourceWidth: number,
  sourceHeight: number,
  skipDevicePixelRatio: boolean
): [number, number, number, number] {
  const bounds = calculateClipBounds(sourceWidth, sourceHeight);
  
  let clipX = Math.floor(bounds[0]);
  let clipY = Math.floor(bounds[1]);
  let clipWidth = Math.floor(bounds[2]);
  let clipHeight = Math.floor(bounds[3]);

  if (getApp().is3DViewActive() && !skipDevicePixelRatio) {
    clipX *= window.devicePixelRatio;
    clipY *= window.devicePixelRatio;
    clipWidth *= window.devicePixelRatio;
    clipHeight *= window.devicePixelRatio;
  }

  return [clipX, clipY, clipWidth, clipHeight];
}

export function getClipData(
  sourceCanvas: HTMLCanvasElement,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  offsetX: number
): string {
  const [clipX, clipY, clipWidth, clipHeight] = getClipBound(
    sourceWidth,
    sourceHeight,
    false
  );

  const clippedCanvas = HSApp.Util.Image.clip(
    sourceCanvas,
    clipX + offsetX,
    clipY,
    clipWidth,
    clipHeight
  );

  sourceCanvas.xRelease();
  clippedCanvas.toDataURL();
  clippedCanvas.xAppendDbgInfo('Screenshot.Clip;');

  const scaledCanvas = HSCore.Util.ObjectPool.getInstance().get('Canvas');
  scaledCanvas.width = targetWidth;
  scaledCanvas.height = targetHeight;

  const context = scaledCanvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to get 2D context');
  }

  context.drawImage(clippedCanvas, 0, 0, targetWidth, targetHeight);

  const dataUrl = scaledCanvas.toDataURL('image/png');

  clippedCanvas.xRelease();
  scaledCanvas.xRelease();

  return dataUrl;
}

export function updateCameraPositionName(
  cameraId: string | number,
  newName: string
): void {
  const positions = getCameraPositions();

  positions.forEach((position) => {
    if (position.id === cameraId) {
      position.name = newName;
      setCameraPositions(positions);
    }
  });
}

export { SNAPSHOT_WIDTH as snapshotWidth, SNAPSHOT_HEIGHT as snapshotHeight };