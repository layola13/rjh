import { HSCore } from './HSCore';

interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

interface ParametricMeta {
  doc: string;
  [key: string]: unknown;
}

interface UserFreeData {
  parametricMeta?: string;
  [key: string]: unknown;
}

interface StairMeta {
  userFreeData: UserFreeData;
  [key: string]: unknown;
}

interface OldStairModel {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  getUniqueParent(): HSCore.Model.Layer | HSCore.Model.NContent;
}

export class ReplaceParametricStairRequest extends HSCore.Transaction.Common.StateRequest {
  private _meta: StairMeta;
  public old: OldStairModel;
  public new?: HSCore.Model.NCustomizedParametricStairs;

  constructor(oldStair: OldStairModel, meta: StairMeta) {
    super();
    this.old = oldStair;
    this._meta = meta;
  }

  async onCommit(): Promise<HSCore.Model.NCustomizedParametricStairs | undefined> {
    const newStair = await this._createContent();
    super.onCommit([]);
    return newStair;
  }

  private async _createContent(): Promise<HSCore.Model.NCustomizedParametricStairs | undefined> {
    const position: Position3D = {
      x: this.old.x,
      y: this.old.y,
      z: this.old.z
    };

    const rotation: Rotation3D = {
      x: this.old.XRotation,
      y: this.old.YRotation,
      z: this.old.ZRotation
    };

    const parent = this.old.getUniqueParent();

    HSCore.Util.Content.removeCustomizedModel(this.old);

    const newStair = new HSCore.Model.NCustomizedParametricStairs();
    newStair.initByMeta(this._meta);

    let parametricMetaString = this._meta.userFreeData.parametricMeta;
    if (!parametricMetaString) {
      parametricMetaString = JSON.stringify(this._meta.userFreeData);
    }

    try {
      const parametricMeta: ParametricMeta = JSON.parse(parametricMetaString);
      const docData = JSON.parse(parametricMeta.doc);
      await HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(docData);
    } catch (error) {
      console.error('Invalid JSON string in parametricMeta:', error);
      return undefined;
    }

    newStair.initStairs();

    HSCore.Util.Content.addContent({
      content: newStair,
      host: null,
      parent: parent
    });

    newStair.x = position.x;
    newStair.y = position.y;
    newStair.z = position.z;
    newStair.XRotation = rotation.x;
    newStair.YRotation = rotation.y;
    newStair.ZRotation = rotation.z;

    this.new = newStair;

    if (parent instanceof HSCore.Model.Layer) {
      parent.roomBuilder.build();
    }

    newStair.autoHeightByLayerHeight();

    return newStair;
  }

  canTransactField(): boolean {
    return true;
  }
}