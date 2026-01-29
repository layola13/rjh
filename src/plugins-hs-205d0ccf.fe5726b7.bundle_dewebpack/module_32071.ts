import { HSCore, HSApp, HSFPConstants } from './types/hs-types';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface ClipRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Camera {
  type: HSCore.Model.CameraTypeEnum;
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  near: number;
}

interface Wall {
  instanceOf(modelClass: string): boolean;
  setFlagOn(flag: HSCore.Model.EntityFlagEnum, value: boolean): void;
  setFlagOff(flag: HSCore.Model.EntityFlagEnum, value: boolean): void;
}

interface Room {
  parent?: Layer;
  getOuterLoopPolygon(): Point2D[];
}

interface Layer {
  height: number;
}

interface Floorplan {
  active_camera: Camera;
  cameras: Record<string, Camera>;
  global_wall_height3d: number;
  scene: Scene;
  forEachWall(callback: (wall: Wall) => void): void;
  forEachRoom(callback: (room: Room) => void): void;
}

interface Scene {
  activeLayer: Layer;
  ceilingLayer?: Layer;
  getLayerAltitude(layer: Layer): number;
}

interface App {
  floorplan: Floorplan;
  getActive3DView(): View3D;
  pluginManager: PluginManager;
}

interface View3D {
  toImage(options: { format: string; forground: boolean }): Promise<string>;
}

interface PluginManager {
  getPlugin(pluginType: string): SparkPicPlugin | undefined;
}

interface SparkPicPlugin {
  setTiltCorrection(enabled: boolean): void;
  getRefreshSignal(): unknown;
  getTiltCorrectionSignal(): unknown;
}

interface ImageResource {
  xRelease(): void;
  toDataURL(format: string): Promise<string>;
}

interface RoomInfo {
  isNeedHostType: boolean;
  needPavingCeilingInfo: boolean;
  needWallInfo: boolean;
}

export function controlWalls(app: App, freeze: boolean): void {
  const callback = (wall: Wall): void => {
    if (wall.instanceOf(HSConstants.ModelClass.NgWall)) {
      if (freeze) {
        wall.setFlagOn(HSCore.Model.EntityFlagEnum.freezed, true);
        wall.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable, true);
      } else {
        wall.setFlagOff(HSCore.Model.EntityFlagEnum.freezed, true);
        wall.setFlagOff(HSCore.Model.EntityFlagEnum.unselectable, true);
      }
    }
  };

  app.floorplan.forEachWall(callback);
}

export function getApp(): App {
  return HSApp.App.getApp();
}

export function getCameraPoint(): Point3D {
  const camera = getApp().floorplan.active_camera;
  const cameraPosition = new THREE.Vector2(camera.x, camera.y);
  const targetPosition = new THREE.Vector2(camera.target_x, camera.target_y);
  
  const direction = targetPosition
    .clone()
    .sub(cameraPosition)
    .normalize()
    .setLength(camera.near)
    .add(cameraPosition);

  return {
    x: direction.x,
    y: direction.y,
    z: camera.z
  };
}

export function getCeilingLayerHeight(): number {
  const app = getApp();
  let height = app.floorplan.global_wall_height3d;
  
  if (app.floorplan.scene.ceilingLayer) {
    height = app.floorplan.scene.getLayerAltitude(app.floorplan.scene.ceilingLayer);
  }
  
  const MILLIMETERS_PER_METER = 1000;
  return parseInt((MILLIMETERS_PER_METER * height).toString());
}

export function getCurrentCamera(): Camera | undefined {
  const app = getApp();
  const currentCameraType = app.floorplan.active_camera.type;
  const cameras = app.floorplan.cameras;
  
  return Object.values(cameras).find(camera => camera.type === currentCameraType);
}

export function getCurrentFirstViewCamera(): Camera | null {
  const cameras = getApp().floorplan.cameras;
  const firstPersonCameras = Object.values(cameras).filter(
    camera => camera.type === HSCore.Model.CameraTypeEnum.FirstPerson
  );
  
  return firstPersonCameras.length > 0 ? firstPersonCameras[0] : null;
}

export function getRefreshSignal(): unknown {
  return getApp().pluginManager.getPlugin(HSFPConstants.PluginType.SparkPic)?.getRefreshSignal();
}

export function getRoomCameraIn(): Room | undefined {
  const app = getApp();
  const cameraPoint = getCameraPoint();
  let targetRoom: Room | undefined;

  app.floorplan.forEachRoom((room: Room) => {
    const layer = room.parent ?? app.floorplan.scene.activeLayer;
    const layerAltitude = HSCore.Util.Layer.getAltitude(layer);
    const relativeHeight = cameraPoint.z - layerAltitude;

    const point2D: Point2D = { x: cameraPoint.x, y: cameraPoint.y };
    const isInPolygon = HSCore.Util.Math.isPointInPolygon(point2D, room.getOuterLoopPolygon());
    
    if (isInPolygon && relativeHeight >= 0 && relativeHeight <= layer.height) {
      targetRoom = room;
    }
  });

  return targetRoom;
}

export function getRoomInfo(room: Room): unknown {
  return HSApp.Util.Recommend.getDataForAutoStyler(true, room, {
    isNeedHostType: true,
    needPavingCeilingInfo: true,
    needWallInfo: true
  });
}

export function getString(key: string): string {
  return ResourceManager.getString(key) ?? key;
}

export function setTiltCorrection(enabled: boolean): void {
  getApp().pluginManager.getPlugin(HSFPConstants.PluginType.SparkPic)?.setTiltCorrection(enabled);
}

export function getTiltCorrectionSignal(): unknown {
  return getApp().pluginManager.getPlugin(HSFPConstants.PluginType.SparkPic)?.getTiltCorrectionSignal();
}

export async function getclipImg(clipRect?: ClipRect): Promise<string> {
  const view3D = getApp().getActive3DView();
  let imageDataUrl = await view3D.toImage({
    format: "image/jpeg",
    forground: false
  });

  if (clipRect) {
    const devicePixelRatio = window.devicePixelRatio;
    const scaledLeft = clipRect.left * devicePixelRatio;
    const scaledTop = clipRect.top * devicePixelRatio;
    const scaledWidth = clipRect.width * devicePixelRatio;
    const scaledHeight = clipRect.height * devicePixelRatio;

    const loadedImage = await ResourceManager.load(
      imageDataUrl,
      HSApp.Io.Load.LoadTypeEnum.PluginImage
    ) as ImageResource;

    const clippedImage = await HSApp.Util.Image.clip(
      loadedImage,
      scaledLeft,
      scaledTop,
      scaledWidth,
      scaledHeight
    ) as ImageResource;

    loadedImage.xRelease();
    imageDataUrl = await clippedImage.toDataURL("image/jpeg");
    clippedImage.xRelease();
  }

  return imageDataUrl;
}

export function singleton<T extends new (...args: any[]) => any>(constructor: T): T {
  let instance: InstanceType<T> | undefined;
  let previousArgs: any[] = [];

  return new Proxy(constructor, {
    construct(target: T, args: any[] = []): InstanceType<T> {
      if (!instance) {
        instance = new target(...args);
        previousArgs = args;
      }

      if (!areArgumentsEqual(previousArgs, args)) {
        throw new Error("cannot create another instance");
      }

      return instance;
    }
  }) as T;
}

function areArgumentsEqual(args1: any[] | undefined, args2: any[]): boolean {
  if (args1?.length !== args2.length) {
    return false;
  }

  for (let i = 0; i < args2.length; i++) {
    if (args1[i] !== args2[i]) {
      return false;
    }
  }

  return true;
}