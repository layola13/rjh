import { Sketch2d_IO, Sketch2d } from './Sketch2d';
import { Sketch2dBuilder } from './Sketch2dBuilder';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import * as THREE from 'three';

interface DumpOptions {
  [key: key]: unknown;
}

interface LoadOptions {
  idGenerator?: unknown;
  idMap?: Map<string, string>;
  [key: string]: unknown;
}

interface ExtrusionValueEntry {
  [key: string]: unknown;
}

interface SerializedMatrix {
  elements: number[];
}

interface SerializedData {
  extrusionValueMap?: Array<[string, number]>;
  _extrusionValueMap?: Array<[string, number]>;
  convert3dMatrix?: SerializedMatrix | number[];
  [key: string]: unknown;
}

type DumpCallback = (result: unknown[], entity: DecorateSketch2d) => void;

export class DecorateSketch2d_IO extends Sketch2d_IO {
  private static _DecorateSketch2d_IO_instance?: DecorateSketch2d_IO;

  static instance(): DecorateSketch2d_IO {
    if (!DecorateSketch2d_IO._DecorateSketch2d_IO_instance) {
      DecorateSketch2d_IO._DecorateSketch2d_IO_instance = new DecorateSketch2d_IO();
    }
    return DecorateSketch2d_IO._DecorateSketch2d_IO_instance;
  }

  dump(
    entity: DecorateSketch2d,
    callback?: DumpCallback,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const serializedData = result[0] as SerializedData;
    
    serializedData.extrusionValueMap = entity._extrusionValueMap.toJSON();
    
    if (entity.convert3dMatrix) {
      serializedData.convert3dMatrix = {
        elements: [...entity.convert3dMatrix.elements]
      };
    }
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(
    entity: DecorateSketch2d,
    data: SerializedData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    
    entity._extrusionValueMap = this.deserializeExtrusionValueMap(
      data.extrusionValueMap || data._extrusionValueMap,
      options
    );
    
    entity.convert3dMatrix = new THREE.Matrix4();
    const matrixElements = data.convert3dMatrix?.elements || data.convert3dMatrix;
    
    if (matrixElements) {
      entity.convert3dMatrix.fromArray(matrixElements as number[]);
    }
  }

  private deserializeExtrusionValueMap(
    serialized: Array<[string, number]> | undefined,
    options: LoadOptions
  ): Map<string, number> {
    const map = new Map<string, number>();
    
    if (!serialized) {
      return map;
    }
    
    serialized.forEach((entry) => {
      const shouldRemapId = options.idGenerator && options.idMap && options.idMap.size > 0;
      const id = shouldRemapId ? (options.idMap!.get(entry[0]) ?? entry[0]) : entry[0];
      map.set(id, entry[1]);
    });
    
    return map;
  }
}

class DecorateSketch2dBuilder extends Sketch2dBuilder {
  protected sketch2d!: DecorateSketch2d;

  copyFaceProps(sourceFace: unknown, targetFace: unknown): void {
    super.copyFaceProps(sourceFace, targetFace);
    
    const extrusionMap = this.sketch2d._extrusionValueMap;
    const sourceFaceId = (sourceFace as { id: string }).id;
    const targetFaceId = (targetFace as { id: string }).id;
    
    if (extrusionMap.has(sourceFaceId)) {
      const extrusionValue = extrusionMap.get(sourceFaceId);
      if (extrusionValue !== undefined) {
        extrusionMap.set(targetFaceId, extrusionValue);
      }
    }
  }
}

export class DecorateSketch2d extends Sketch2d {
  _extrusionValueMap: Map<string, number>;
  
  @EntityField({
    binaryEqual: (a: unknown, b: unknown) => false
  })
  convert3dMatrix: THREE.Matrix4;

  constructor(name: string = "", options?: unknown) {
    super(name, options);
    this._extrusionValueMap = new Map<string, number>();
    this.convert3dMatrix = new THREE.Matrix4();
  }

  protected _processFieldChanged(fieldName: string): void {
    if (['background', 'faces'].includes(fieldName)) {
      this._boundDirty = true;
    }
  }

  getIO(): DecorateSketch2d_IO {
    return DecorateSketch2d_IO.instance();
  }

  getExtrusionValue(faceId: string): number {
    return this._extrusionValueMap.get(faceId) || 0;
  }

  createBuilder(): DecorateSketch2dBuilder {
    return new DecorateSketch2dBuilder(this);
  }

  setExtrusionValue(faceId: string, value: number): void {
    for (const face of this.faces) {
      if ((face as { id: string }).id === faceId) {
        this._extrusionValueMap.set(faceId, value);
        (face as { dirty: (arg?: unknown) => void }).dirty(undefined);
        this.dirtyGeometry();
      }
    }
  }

  copyFace(sourceFace: unknown, targetFace: unknown, options?: unknown): unknown {
    const copiedFace = super.copyFace(sourceFace, targetFace, options);
    const targetFaceId = (targetFace as { id: string }).id;
    
    for (const [extrusionId, extrusionValue] of this._extrusionValueMap.entries()) {
      if (extrusionId === targetFaceId) {
        if (extrusionValue !== undefined) {
          this._extrusionValueMap.set((copiedFace as { id: string }).id, extrusionValue);
        }
        break;
      }
    }
    
    return copiedFace;
  }
}

Entity.registerClass(HSConstants.ModelClass.DecorateSketch2d, DecorateSketch2d);