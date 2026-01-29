import { DirectionLight_IO, DirectionLight } from './DirectionLight';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { BrepBound } from './BrepBound';
import * as THREE from 'three';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpedData {
  width: number;
  height: number;
  double_flat: boolean;
  renderVisible: boolean;
  [key: string]: unknown;
}

interface BoundingSize {
  width: number;
  height: number;
}

interface BoundingRotation {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface BoundingData {
  x: number;
  y: number;
  z: number;
  size: BoundingSize;
  rotation: BoundingRotation;
}

interface RenderParameters {
  temperature: number;
  intensity: number;
  x: number;
  y: number;
  z: number;
  double_flat: boolean;
  width: number;
  height: number;
  skylightPortal: boolean;
  rgb: string | number[];
  affectSpecular: boolean;
  close: boolean;
  sourceContentType: string;
  renderVisible: boolean;
}

interface VirtualAreaLightData {
  __width?: number;
  __height?: number;
  __double_flat?: boolean;
  __renderVisible?: boolean;
}

export class VirtualAreaLight_IO extends DirectionLight_IO {
  dump(
    entity: VirtualAreaLight,
    callback?: (data: unknown[], entity: VirtualAreaLight) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpedData = super.dump(entity, undefined, includeMetadata, options);
    const mainData = dumpedData[0] as DumpedData;
    
    mainData.width = entity.width;
    mainData.height = entity.height;
    mainData.double_flat = entity.double_flat;
    mainData.renderVisible = entity.renderVisible;
    
    if (callback) {
      callback(dumpedData, entity);
    }
    
    return dumpedData;
  }

  load(
    entity: VirtualAreaLight & VirtualAreaLightData,
    data: DumpedData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    
    entity.__width = data.width;
    entity.__height = data.height;
    entity.__double_flat = data.double_flat;
    entity.__renderVisible = !!data.renderVisible;
  }
}

export class VirtualAreaLight extends DirectionLight {
  @EntityField()
  width: number = 1;

  @EntityField()
  height: number = 1;

  @EntityField()
  double_flat: boolean = false;

  @EntityField()
  renderVisible: boolean = false;

  constructor(name: string = "", parent?: unknown) {
    super(name, parent);
  }

  static create(): VirtualAreaLight {
    const light = new VirtualAreaLight();
    light.reset();
    return light;
  }

  reset(): void {
    super.reset();
    this.double_flat = false;
    this.renderVisible = false;
  }

  getIO(): VirtualAreaLight_IO {
    return VirtualAreaLight_IO.instance();
  }

  constructPath(parameter: unknown): unknown[] {
    return [];
  }

  refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();
    
    const position = HSCore.Util.Math.Vec2.fromCoordinate(this);
    const euler = new THREE.Euler(
      -THREE.Math.degToRad(this.XRotation),
      -THREE.Math.degToRad(this.YRotation),
      -THREE.Math.degToRad(this.ZRotation),
      'XYZ'
    );
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    
    const corners = [
      new THREE.Vector3(-halfWidth, -halfHeight, 0).applyQuaternion(quaternion),
      new THREE.Vector3(halfWidth, -halfHeight, 0).applyQuaternion(quaternion),
      new THREE.Vector3(halfWidth, halfHeight, 0).applyQuaternion(quaternion),
      new THREE.Vector3(-halfWidth, halfHeight, 0).applyQuaternion(quaternion)
    ];
    
    let minX = corners[0].x;
    let maxX = corners[0].x;
    let minY = corners[0].y;
    let maxY = corners[0].y;
    let minZ = corners[0].z;
    let maxZ = corners[0].z;
    
    for (let i = 1; i < 4; ++i) {
      minX = Math.min(minX, corners[i].x);
      maxX = Math.max(maxX, corners[i].x);
      minY = Math.min(minY, corners[i].y);
      maxY = Math.max(maxY, corners[i].y);
      minZ = Math.max(minZ, corners[i].z);
      maxZ = Math.max(maxZ, corners[i].z);
    }
    
    const MIN_SIZE = 0.1;
    const paddingX = (MIN_SIZE - (maxX - minX)) / 2;
    if (paddingX > 0) {
      maxX += paddingX;
      minX -= paddingX;
    }
    
    const paddingY = (MIN_SIZE - (maxY - minY)) / 2;
    if (paddingY > 0) {
      maxY += paddingY;
      minY -= paddingY;
    }
    
    bound.appendBound(new BrepBound(
      minX + position.x,
      minY + position.y,
      maxX - minX,
      maxY - minY
    ));
    
    this.XSize = maxX - minX;
    this.YSize = maxY - minY;
    this.ZSize = maxZ - minZ;
  }

  getArea(): number {
    return this.height * this.width;
  }

  hasAreaSize(): boolean {
    return true;
  }

  getRenderParameters(): RenderParameters {
    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(this);
    
    return {
      ...super.getRenderParameters(),
      temperature: this.getTemperature(),
      intensity: this.intensity * this.getArea(),
      x: this.x,
      y: this.y,
      z: this.z + baseHeight,
      double_flat: this.double_flat,
      width: this.width,
      height: this.height,
      skylightPortal: this.skylightPortal,
      rgb: this.rgb,
      affectSpecular: this.affectSpecular,
      close: this.close,
      sourceContentType: this.sourceContentType,
      renderVisible: this.renderVisible
    };
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    this.dirty();
    
    if (fieldName === 'width' || fieldName === 'height') {
      this.dirtyPosition();
      this.group?.dirtyPosition();
    }
    
    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  getBoundingData(): BoundingData {
    const { x, y, z, width, height, XRotation, YRotation, ZRotation } = this;
    
    return {
      x,
      y,
      z,
      size: {
        width,
        height
      },
      rotation: {
        XRotation,
        YRotation,
        ZRotation
      }
    };
  }
}

Entity.registerClass(HSConstants.ModelClass.NgFlatLight, VirtualAreaLight);