import { BaseObject } from './BaseObject';
import { Manager } from './Manager';
import { WebCadDocument } from './WebCadDocument';
import { Util } from '../utils/Util';
import * as THREE from 'three';

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDefinition[];
}

interface GraphicsObject {
  customAttrs?: {
    roomType?: string;
    type?: string;
  };
}

interface MeshDefinition {
  vertexPositions: number[];
}

interface CSGData {
  csg: THREE.Mesh;
  box: THREE.Box3;
}

interface ClipAidCSGs {
  csgs: CSGData[];
  node?: THREE.Object3D;
}

interface Entity {
  id: string;
  x: number;
  y: number;
  z: number;
  needUpdate: boolean;
  signalDirty: unknown;
  XRotation: number;
  YRotation: number;
  rotation: number;
  ZSize: number;
  showPocket: boolean;
  contentType: {
    isTypeOf(type: string): boolean;
  };
  forEachChild(callback: (child: Entity) => void): void;
  getHost(): Entity | null;
  instanceOf(modelClass: string): boolean;
  isFlagOff(flag: number): boolean;
  isFlagOn(flag: number): boolean;
  getWindowHoles(): WindowHole[];
  getWindowPockets(): WindowPocket[];
  getWindowSills(): WindowSill[];
}

interface WindowHole {
  profile: string;
  ZSize: number;
  XRotation: number;
  YRotation: number;
  rotation: number;
  getHost(): Entity | null;
}

interface WindowPocket {
  parameters: {
    profileData: {
      profileSizeX: number;
    };
  };
}

interface WindowSill {
  isFlagOn(flag: number): boolean;
}

interface RoomInfo {
  floor?: {
    id: string;
    roomType?: string;
  };
}

interface Context {
  dirtyObjectMap: Map<string, unknown>;
  objectMap: Map<string, CornerWindow>;
}

interface ParametricModel {
  entity: Entity;
  updated: boolean;
  geometryDirty: boolean;
  context: Context;
  toGraphicsDataAsync(): Promise<GraphicsData | null>;
  toGraphicsData(): GraphicsData | null;
  onUpdate(): void;
  clear(): void;
}

interface ChildRemovedEvent {
  data: {
    entity?: Entity;
  };
}

interface ParentReplacedEvent {
  data: {
    newParent: Entity;
  };
}

interface ExtrudeSettings {
  amount: number;
  bevelEnabled: boolean;
}

/**
 * CornerWindow view model class
 * Manages child models and graphics data generation for corner windows
 */
export class CornerWindow extends BaseObject {
  private childModels: ParametricModel[] = [];
  private _clipAidCSGs?: ClipAidCSGs;
  private _webCadDocument: WebCadDocument;

  constructor(entity: Entity, parent: CornerWindow | null, context: Context) {
    super(entity, parent, context);

    entity.forEachChild((child: Entity) => {
      this._createViewModel(child);
    });

    this.signalHook.listen(this.entity.signalDirty, () => {
      this._clipAidCSGs = undefined;
    });

    this._webCadDocument = new WebCadDocument();
  }

  private _createViewModel(entity: Entity): void {
    const model = Manager.instance().createParametricModel(
      entity,
      this._webCadDocument,
      this.context,
      this
    );

    if (model) {
      this.childModels.push(model);
    }
  }

  onChildRemoved(event: ChildRemovedEvent): void {
    super.onChildRemoved(event);

    const entity = event.data.entity;
    if (!entity) return;

    const model = this.childModels.find((m) => m.entity === entity);
    if (model) {
      const index = this.childModels.indexOf(model);
      if (index > -1) {
        this.childModels.splice(index, 1);
      }
      model.clear();
    }
  }

  updateRoomCustomAttrs(): { roomType: string } {
    const host = this.entity.getHost();
    let roomType = 'none';

    if (host?.instanceOf(HSConstants.ModelClass.NgWall)) {
      const roomInfo = HSCore.Doc.getDocManager().geometryManager.getWallRoomsInfo(host)[0];
      if (roomInfo?.floor) {
        roomType = roomInfo.floor.roomType
          ? `${roomInfo.floor.roomType}-${roomInfo.floor.id}`
          : `${roomType}-${roomInfo.floor.id}`;
      }
    }

    return { roomType };
  }

  async toGraphicsDataAsync(): Promise<GraphicsData> {
    let meshDefs: MeshDefinition[] = [];
    let objects: GraphicsObject[] = [];

    if (!this.entity.needUpdate) {
      return { objects, meshDefs };
    }

    const host = this.entity.getHost();
    let roomType = 'none';

    if (host?.instanceOf(HSConstants.ModelClass.NgWall)) {
      const roomInfo = HSCore.Doc.getDocManager().geometryManager.getWallRoomsInfo(host)[0];
      if (roomInfo?.floor) {
        roomType = roomInfo.floor.roomType
          ? `${roomInfo.floor.roomType}-${roomInfo.floor.id}`
          : `${roomType}-${roomInfo.floor.id}`;
      }
    }

    const promises: Promise<void>[] = [];

    this.childModels.forEach((model) => {
      if (model.entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)) {
        const promise = model.toGraphicsDataAsync().then((graphicsData) => {
          if (graphicsData) {
            graphicsData.objects.forEach((obj) => {
              obj.customAttrs = {
                roomType,
                type: 'BayWindow',
              };
            });

            meshDefs = meshDefs.concat(graphicsData.meshDefs);
            objects = objects.concat(graphicsData.objects);
          }
        });
        promises.push(promise);
      }
      model.context.dirtyObjectMap.delete(model.entity.id);
    });

    try {
      await Promise.all(promises);

      const shouldTransform =
        this.entity.instanceOf(HSConstants.ModelClass.NgBayWindow) ||
        this.entity.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow) ||
        !host;

      if (shouldTransform) {
        meshDefs.forEach((meshDef) => {
          const positions = meshDef.vertexPositions;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += this.entity.x;
            positions[i + 1] += this.entity.y;
            positions[i + 2] += this.entity.z;
          }
        });
      }

      return { objects, meshDefs };
    } catch (error) {
      return { objects: [], meshDefs: [] };
    }
  }

  toGraphicsData(): GraphicsData {
    const meshDefs: MeshDefinition[] = [];
    const objects: GraphicsObject[] = [];

    if (!this.entity.needUpdate) {
      return { objects, meshDefs };
    }

    const host = this.entity.getHost();
    let roomType = 'none';

    if (host?.instanceOf(HSConstants.ModelClass.NgWall)) {
      const roomInfo = HSCore.Doc.getDocManager().geometryManager.getWallRoomsInfo(host)[0];
      if (roomInfo?.floor) {
        roomType = roomInfo.floor.roomType
          ? `${roomInfo.floor.roomType}-${roomInfo.floor.id}`
          : `${roomType}-${roomInfo.floor.id}`;
      }
    }

    this.childModels.forEach((model) => {
      if (model.entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)) {
        const graphicsData = model.toGraphicsData();
        model.updated = false;

        if (graphicsData) {
          graphicsData.objects.forEach((obj) => {
            obj.customAttrs = {
              roomType,
              type: 'BayWindow',
            };
          });

          meshDefs.push(...graphicsData.meshDefs);
          objects.push(...graphicsData.objects);
        }
      }
      model.context.dirtyObjectMap.delete(model.entity.id);
    });

    const shouldTransform =
      this.entity.instanceOf(HSConstants.ModelClass.NgBayWindow) ||
      this.entity.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow) ||
      !host;

    if (shouldTransform) {
      meshDefs.forEach((meshDef) => {
        const positions = meshDef.vertexPositions;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += this.entity.x;
          positions[i + 1] += this.entity.y;
          positions[i + 2] += this.entity.z;
        }
      });
    }

    return { objects, meshDefs };
  }

  onUpdate(): void {
    if (this.entity.needUpdate) {
      this.childModels.forEach((model) => {
        if (model.geometryDirty) {
          model.onUpdate();
          model.geometryDirty = false;
          model.updated = true;
        }
      });
    }
  }

  getClipAidCSGs(): ClipAidCSGs {
    if (!this._clipAidCSGs) {
      this._clipAidCSGs = this._createClipAidCSGs();
    }
    return this._clipAidCSGs;
  }

  private _createClipAidCSGs(): ClipAidCSGs {
    const extrudeSettings: ExtrudeSettings = {
      amount: 2,
      bevelEnabled: false,
    };

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.25,
    });

    const csgs: CSGData[] = [];
    let node: THREE.Object3D | undefined;

    this.entity.getWindowHoles().forEach((hole) => {
      const contentNode = Util.getContentNode(hole);
      const aidMesh = this._getBayWindowAidMesh(hole, extrudeSettings, material, contentNode);

      if (contentNode) {
        contentNode.updateMatrixWorld(false);

        if (aidMesh) {
          const box = new THREE.Box3();
          box.setFromObject(contentNode);
          csgs.push({ csg: aidMesh, box });
          node = contentNode;
        }
      }
    });

    return { csgs, node };
  }

  private _getBayWindowAidMesh(
    hole: WindowHole,
    extrudeSettings: ExtrudeSettings,
    material: THREE.Material,
    contentNode: THREE.Object3D
  ): THREE.Mesh | undefined {
    const host = hole.getHost();
    if (!host?.instanceOf(HSConstants.ModelClass.NgWall)) {
      return undefined;
    }

    const verticalToWall = Util.getVerticalToWall(host);
    const holeLoop = CornerWindow.getHoleLoop(this.entity, hole);

    if (!holeLoop) {
      return undefined;
    }

    const shape = new THREE.Shape(holeLoop);
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, material);

    const halfAmount = extrudeSettings.amount / 2;
    const offset = new THREE.Vector3().copy(verticalToWall).multiplyScalar(halfAmount);

    contentNode.add(mesh);
    contentNode.position.add(new THREE.Vector3(offset.x, offset.z, -offset.y));
    contentNode.position.y -= hole.ZSize / 2;
    contentNode.rotation.set(
      THREE.MathUtils.degToRad(-hole.XRotation),
      THREE.MathUtils.degToRad(-hole.rotation),
      THREE.MathUtils.degToRad(hole.YRotation),
      'YZX'
    );

    return mesh;
  }

  onParentReplaced(event: ParentReplacedEvent): void {
    this.parent.childNodes.delete(this.entity.id);
    this.parent = this.context.objectMap.get(event.data.newParent.id);
    if (this.parent) {
      this.parent.childNodes.set(this.entity.id, this);
    }
  }

  static getHoleLoop(entity: Entity, hole: WindowHole): THREE.Vector2[] | null {
    let loop = HSCore.Util.ProfileParser.parse(hole.profile).map(
      (point: { x: number; y: number }) => new THREE.Vector2(point.x, point.y)
    );

    if (!loop || loop.length === 0 || HSCore.Util.Math.isZero(GeLib.PolygonUtils.getArea(loop))) {
      return null;
    }

    const pockets = entity.getWindowPockets();

    if (
      entity.showPocket &&
      pockets.length > 0 &&
      (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.POrdinaryWindow) ||
        entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow) ||
        entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerFlatWindow) ||
        entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerWindow))
    ) {
      const profileSizeX = pockets[0]?.parameters.profileData.profileSizeX ?? 0;

      if (profileSizeX) {
        loop = HSCore.Util.Collision.OffsetPolygon([loop], profileSizeX)[0];

        const sills = entity.getWindowSills();
        if (
          sills &&
          sills.length > 0 &&
          !sills[0].isFlagOn(HSCore.Model.EntityFlagEnum.hidden)
        ) {
          loop.forEach((point) => {
            if (point.y < 0) {
              point.y = 0;
            }
          });
        }
      }
    }

    return loop;
  }
}