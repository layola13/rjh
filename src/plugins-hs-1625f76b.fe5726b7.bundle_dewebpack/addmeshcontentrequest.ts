import { HSCore } from './HSCore';

interface Position {
  x?: number;
  y?: number;
  z?: number;
}

interface Rotation {
  x?: number;
  y?: number;
  z?: number;
}

interface Scale {
  x?: number;
  y?: number;
  z?: number;
}

type RotationValue = number | Rotation;

export class AddMeshContentRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _position?: Position;
  private readonly _rotation?: RotationValue;
  private readonly _scale?: Scale;
  private readonly _meta: unknown;

  constructor(
    meta: unknown,
    position?: Position,
    rotation?: RotationValue,
    scale?: Scale
  ) {
    super();
    this._meta = meta;
    this._position = position;
    this._rotation = rotation;
    this._scale = scale;
  }

  onCommit(): HSCore.Model.MeshContent | null {
    return this._createContent();
  }

  private _createContent(): HSCore.Model.MeshContent | null {
    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    const activeLayer = activeDocument.scene.activeLayer;
    const meshContent = HSCore.Model.MeshContent.create(this._meta);

    if (!meshContent) {
      return null;
    }

    if (activeLayer) {
      activeLayer.addChild(meshContent);
    }

    if (this._position) {
      if (this._position.x !== undefined && typeof this._position.x === 'number') {
        meshContent.x = this._position.x;
      }
      if (this._position.y !== undefined && typeof this._position.y === 'number') {
        meshContent.y = this._position.y;
      }
      if (this._position.z !== undefined && typeof this._position.z === 'number') {
        meshContent.z = this._position.z;
      }
    }

    if (this._rotation) {
      if (typeof this._rotation === 'number') {
        meshContent.ZRotation = this._rotation;
      } else {
        if (this._rotation.x !== undefined && typeof this._rotation.x === 'number') {
          meshContent.XRotation = this._rotation.x;
        }
        if (this._rotation.y !== undefined && typeof this._rotation.y === 'number') {
          meshContent.YRotation = this._rotation.y;
        }
        if (this._rotation.z !== undefined && typeof this._rotation.z === 'number') {
          meshContent.ZRotation = this._rotation.z;
        }
      }
    }

    return meshContent;
  }
}

export const ZRotation = 'ZRotation';
export const XRotation = 'XRotation';
export const YRotation = 'YRotation';