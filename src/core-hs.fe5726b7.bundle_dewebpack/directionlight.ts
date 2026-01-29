import { Light, Light_IO } from './Light';
import { Entity } from './Entity';
import { nearlyEquals } from './mathUtils';
import { isValidNumber, EntityField } from './entityUtils';

interface SerializedDirectionLight {
  XRotation?: number;
  YRotation?: number;
  ZRotation?: number;
  targetEnabled?: boolean;
  XTarget?: number;
  YTarget?: number;
  ZTarget?: number;
}

interface DumpOptions {
  [key: string]: unknown;
}

type DumpCallback = (result: unknown[], entity: DirectionLight) => void;

function isTargetCoordinateEqual(valueA: number, valueB: number): boolean {
  const isValueAValid = isValidNumber(valueA);
  const isValueBValid = isValidNumber(valueB);
  
  if (!isValueAValid && !isValueBValid) {
    return true;
  }
  
  if (!isValueAValid || !isValueBValid) {
    return false;
  }
  
  return nearlyEquals(valueA, valueB);
}

export class DirectionLight_IO extends Light_IO {
  dump(
    entity: DirectionLight,
    callback?: DumpCallback,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const serialized = result[0] as SerializedDirectionLight;
    
    if (entity.XRotation) {
      serialized.XRotation = entity.XRotation;
    }
    
    if (entity.YRotation) {
      serialized.YRotation = entity.YRotation;
    }
    
    if (entity.ZRotation) {
      serialized.ZRotation = entity.ZRotation;
    }
    
    if (entity.targetEnabled) {
      serialized.targetEnabled = entity.targetEnabled;
      serialized.XTarget = entity.XTarget;
      serialized.YTarget = entity.YTarget;
      serialized.ZTarget = entity.ZTarget;
    }
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }
  
  load(
    entity: DirectionLight,
    data: SerializedDirectionLight,
    options: DumpOptions = {}
  ): void {
    super.load(entity, data, options);
    
    entity.__XRotation = data.XRotation || 0;
    entity.__YRotation = data.YRotation || 0;
    entity.__ZRotation = data.ZRotation || 0;
    entity.__rotation = entity.ZRotation;
    entity.__targetEnabled = data.targetEnabled || false;
    
    if (entity.__targetEnabled) {
      entity.__XTarget = data.XTarget;
      entity.__YTarget = data.YTarget;
      entity.__ZTarget = data.ZTarget;
    }
  }
}

export class DirectionLight extends Light {
  @EntityField()
  XRotation: number = 0;
  
  @EntityField()
  YRotation: number = 0;
  
  @EntityField()
  ZRotation: number = 0;
  
  __rotation: number = 0;
  
  @EntityField()
  targetEnabled: boolean = false;
  
  @EntityField({ binaryEqual: isTargetCoordinateEqual })
  XTarget: number = NaN;
  
  @EntityField({ binaryEqual: isTargetCoordinateEqual })
  YTarget: number = NaN;
  
  @EntityField({ binaryEqual: isTargetCoordinateEqual })
  ZTarget: number = NaN;
  
  constructor(name: string = "", parent: unknown = undefined) {
    super(name, parent);
  }
  
  reset(): void {
    super.reset();
    this.XRotation = 0;
    this.YRotation = 0;
    this.ZRotation = 0;
    this.resetTarget();
  }
  
  isTargetValid(): boolean {
    return isValidNumber(this.XTarget) && 
           isValidNumber(this.YTarget) && 
           isValidNumber(this.ZTarget);
  }
  
  isVirtual(): boolean {
    return true;
  }
  
  resetTarget(): void {
    this.targetEnabled = false;
    this.XTarget = NaN;
    this.YTarget = NaN;
    this.ZTarget = NaN;
  }
  
  mirror(axis: unknown, flipZ: boolean): void {
    this.XRotation = -this.XRotation;
    this.YRotation = -this.YRotation;
    
    const newZRotation = flipZ ? -this.ZRotation : Math.PI - this.ZRotation;
    this.ZRotation = newZRotation;
    
    super.mirror(axis, flipZ);
  }
  
  getRenderParameters(): Record<string, unknown> {
    return {
      ...super.getRenderParameters(),
      XRotation: this.XRotation,
      YRotation: this.YRotation,
      ZRotation: this.ZRotation
    };
  }
  
  getIO(): DirectionLight_IO {
    return DirectionLight_IO.instance();
  }
  
  updateRotationToTarget(): void {
    if (!this.targetEnabled) {
      return;
    }
    
    const directionVector = new THREE.Vector3(
      this.XTarget - this.x,
      this.YTarget - this.y,
      this.ZTarget - this.z
    ).normalize();
    
    const defaultDirection = new THREE.Vector3(0, 0, -1);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultDirection, directionVector);
    const euler = new THREE.Euler().setFromQuaternion(quaternion, 'XYZ');
    
    this.XRotation = THREE.Math.radToDeg(-euler.x);
    this.YRotation = THREE.Math.radToDeg(-euler.y);
  }
  
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (fieldName === 'rotation') {
      this.ZRotation = newValue as number;
    }
    
    if (['XRotation', 'YRotation', 'ZRotation'].includes(fieldName)) {
      this._boundDirty = true;
      this.dirtyGeometry();
    }
    
    super.onFieldChanged(fieldName, oldValue, newValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgDirectionLight, DirectionLight);