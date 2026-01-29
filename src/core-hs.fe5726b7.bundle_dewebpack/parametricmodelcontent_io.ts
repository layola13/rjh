import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { Matrix4 } from './Matrix4';
import { Manager } from './Manager';
import { Material } from './Material';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { Signal } from './Signal';
import { EntityEventType } from './EntityEventType';
import * as THREE from 'three';

interface ContentInfoMaterial {
  seekId?: string;
}

interface ContentInfo {
  eId: string;
  xyzLength: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  visible?: boolean;
  materials?: ContentInfoMaterial[];
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface SerializedParametricModelContent {
  eId: string;
  uId: string;
  srcId: string;
  isSourceModel: boolean;
  [key: string]: unknown;
}

interface ClipEvent {
  type: EntityEventType;
}

interface GeometryEvent {
  type: EntityEventType;
}

export class ParametricModelContent_IO extends Content_IO {
  private static _instance?: ParametricModelContent_IO;

  public static instance(): ParametricModelContent_IO {
    if (!this._instance) {
      this._instance = new ParametricModelContent_IO();
    }
    return this._instance;
  }

  public dump(
    entity: ParametricModelContent,
    target?: unknown,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): [SerializedParametricModelContent, ...unknown[]] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const serialized = result[0] as SerializedParametricModelContent;
    
    serialized.eId = entity.eId;
    serialized.uId = entity.uId;
    serialized.srcId = entity.srcId;
    serialized.isSourceModel = entity.isSourceModel;
    
    return result as [SerializedParametricModelContent, ...unknown[]];
  }

  public load(
    entity: ParametricModelContent,
    data: SerializedParametricModelContent,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    
    entity.eId = data.eId;
    entity.uId = data.uId;
    entity.srcId = data.srcId;
    entity.isSourceModel = data.isSourceModel;
  }
}

export class ParametricModelContent extends Content {
  public eId!: string;
  public uId!: string;
  public srcId!: string;
  public isSourceModel!: boolean;
  public contentInfo?: ContentInfo;
  public splitPlanes: unknown[] = [];
  public signalClipDirty!: Signal<ClipEvent>;
  
  private _boundDirty: boolean = false;

  constructor(id: string = "", parent?: Entity) {
    super(id, parent);
    this.splitPlanes = [];
    this.signalClipDirty = new Signal<ClipEvent>(this);
  }

  public destroy(): void {
    this.signalClipDirty.dispose();
    this.signalClipDirty = undefined!;
    super.destroy();
  }

  public dirtyClipGeometry(options?: unknown): void {
    this.signalClipDirty.dispatch({
      type: EntityEventType.Clip
    });
    
    this.dirty({
      type: EntityEventType.Geometry
    }, options);
    
    this._boundDirty = true;
  }

  public initContent(info: ContentInfo): void {
    this.contentInfo = info;
    this.eId = info.eId;
    this.uId = this.eId;
    
    this._transformRotation(info);
    
    this.XScale = info.xyzLength.x / this.XLength;
    this.YScale = info.xyzLength.y / this.YLength;
    this.ZScale = info.xyzLength.z / this.ZLength;
    this.visible = info.visible === undefined || info.visible;
    
    this.splitPlanes.length = 0;
    this.initMaterial(info.materials);
  }

  public isContentInRoom(room: unknown): boolean {
    const targetClasses = [
      HSConstants.ModelClass.ParametricCurtain,
      HSConstants.ModelClass.ParametricBathroomCabinet
    ];
    
    const parent = NCustomizedFeatureModelUtil.getParentByEntityTypes(this, targetClasses);
    return !!parent && parent.isContentInRoom(room);
  }

  public initMaterial(materials?: ContentInfoMaterial[]): void {
    if (!materials) return;
    
    materials.forEach((materialInfo, index) => {
      const seekId = materialInfo.seekId;
      if (!seekId) return;
      
      const product = Manager.instance().getProductBySeekIdSync(seekId, undefined);
      if (product) {
        const material = Material.create(product);
        this.setMaterial(index, material);
      }
    });
  }

  public copyFrom(source: ParametricModelContent): void {
    this.x = source.x;
    this.y = source.y;
    this.z = source.z;
    this.XRotation = source.XRotation;
    this.YRotation = source.YRotation;
    this.ZRotation = source.ZRotation;
    this.XLength = source.XLength;
    this.YLength = source.YLength;
    this.ZLength = source.ZLength;
    this.XScale = source.XScale;
    this.YScale = source.YScale;
    this.ZScale = source.ZScale;
    this.visible = source.visible;
    this.materialsMap = source.materialsMap;
    this.contentInfo = source.contentInfo;
  }

  public updatePosition(position: { x: number; y: number; z: number }): void {
    this.x = position.x;
    this.y = position.y;
    this.z = position.z;
  }

  private _transformRotation(info: ContentInfo): void {
    const rotation = info.rotation;
    
    const rotationX = Matrix4.makeRotateX(THREE.Math.degToRad(rotation.x));
    const rotationY = Matrix4.makeRotateY(THREE.Math.degToRad(rotation.y));
    const rotationZ = Matrix4.makeRotateZ(THREE.Math.degToRad(rotation.z));
    
    const combinedRotation = rotationX.preMultiply(rotationY).preMultiply(rotationZ);
    
    const euler = new THREE.Euler();
    const matrix = new THREE.Matrix4();
    matrix.fromArray(combinedRotation.toArray());
    euler.setFromRotationMatrix(matrix, 'XYZ');
    
    this.XRotation = THREE.Math.radToDeg(-euler.x);
    this.YRotation = THREE.Math.radToDeg(-euler.y);
    this.ZRotation = THREE.Math.radToDeg(-euler.z);
    
    const halfHeight = info.xyzLength.z / 2;
    const yRotationRad = THREE.Math.degToRad(this.YRotation);
    const offsetX = -halfHeight * Math.sin(yRotationRad);
    const offsetZ = halfHeight * (Math.cos(yRotationRad) - 1);
    
    this.x = info.position.x + offsetX;
    this.y = info.position.y;
    this.z = info.position.z + offsetZ;
  }

  public getIO(): ParametricModelContent_IO {
    return ParametricModelContent_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.ParametricModelContent, ParametricModelContent);