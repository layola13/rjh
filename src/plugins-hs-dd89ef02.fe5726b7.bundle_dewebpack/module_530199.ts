import { Material } from 'HSCore/Material';
import { EntityEventType } from 'HSCore/Model';
import { Request } from 'HSCore/Transaction';

interface MaterialData {
  [key: string]: unknown;
}

interface DirtySignalPayload {
  type: EntityEventType;
}

interface Molding {
  material: Material;
  signalDirty: {
    dispatch(payload: DirtySignalPayload): void;
  };
}

type Face = unknown;
type FaceType = unknown;
type MoldingType = unknown;

export class ChangeFaceMoldingTextureRequest extends Request {
  private materialData: MaterialData;
  private face: Face;
  private faceType: FaceType;
  private moldingType: MoldingType;
  private _savedMaterial: Material | undefined;
  private molding: Molding;

  constructor(
    materialData: MaterialData,
    face: Face,
    faceType: FaceType,
    moldingType: MoldingType,
    molding: Molding
  ) {
    super();
    this.materialData = materialData;
    this.face = face;
    this.faceType = faceType;
    this.moldingType = moldingType;
    this._savedMaterial = undefined;
    this.molding = molding;
  }

  onCommit(): void {
    this._changeMaterial(Material.create(this.materialData));
  }

  onUndo(): void {
    if (this._savedMaterial) {
      this._changeMaterial(this._savedMaterial);
    }
  }

  onRedo(): void {
    if (this._savedMaterial) {
      this._changeMaterial(this._savedMaterial);
    }
  }

  private _changeMaterial(material: Material): void {
    this._savedMaterial = this.molding.material;
    this.molding.material = material;

    const payload: DirtySignalPayload = {
      type: EntityEventType.Material
    };

    this.molding.signalDirty.dispatch(payload);
  }
}