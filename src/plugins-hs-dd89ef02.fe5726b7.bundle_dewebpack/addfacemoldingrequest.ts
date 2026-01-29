import { HSCore } from '../path/to/HSCore';
import { HSFPConstants } from '../path/to/HSFPConstants';

type ProductMeta = HSCore.Model.WallMolding | {
  profile: unknown;
  material: unknown;
};

interface BaseSweepPath {
  zlimit: number;
  offset?: number;
  offsetZLimit?: number;
}

export class AddFaceMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private productMetas: ProductMeta | undefined;
  private face: HSCore.Model.Face;
  private moldingType: HSCore.Model.MoldingTypeEnum;

  constructor(
    productMetas: ProductMeta | undefined,
    face: HSCore.Model.Face,
    moldingType: HSCore.Model.MoldingTypeEnum
  ) {
    super();
    this.productMetas = productMetas;
    this.face = face;
    this.moldingType = moldingType;
  }

  onCommit(): void {
    const moldingType = this.moldingType;

    if (
      moldingType === HSCore.Model.MoldingTypeEnum.Cornice ||
      moldingType === HSCore.Model.MoldingTypeEnum.Baseboard ||
      moldingType === HSCore.Model.MoldingTypeEnum.WallBoardBaseboard ||
      moldingType === HSCore.Model.MoldingTypeEnum.WallBoardWaistLine
    ) {
      const existingMolding = this.face.getMolding(moldingType);
      
      if (existingMolding?.length) {
        this._removeFromFace(existingMolding);
      }

      if (!this.productMetas) {
        return;
      }

      const meta = this.productMetas;
      const moldingsToAdd: HSCore.Model.Molding[] = [];

      if (meta instanceof HSCore.Model.WallMolding) {
        if (moldingType === HSCore.Model.MoldingTypeEnum.Baseboard) {
          HSCore.Model.BaseboardTopoPather.calcBaseSweepPath(this.face).forEach((path: BaseSweepPath) => {
            const clonedMolding = meta.clone();
            
            if (clonedMolding.height >= path.zlimit) {
              return;
            }

            const topoPather = HSCore.Util.Molding.createBaseboardTopoPather(path);
            if (clonedMolding.addTopoPather(topoPather)) {
              moldingsToAdd.push(clonedMolding);
            }
          });
        } else if (moldingType === HSCore.Model.MoldingTypeEnum.Cornice) {
          HSCore.Model.CorniceTopoPather.calcBaseSweepPath(this.face).forEach((path: BaseSweepPath) => {
            const clonedMolding = meta.clone();
            clonedMolding.offset = path.offset;

            if (clonedMolding.height >= (path.offsetZLimit ?? 0)) {
              return;
            }

            const topoPather = HSCore.Util.Molding.createCorniceTopoPather(path);
            if (clonedMolding.addTopoPather(topoPather)) {
              moldingsToAdd.push(clonedMolding);
            }
          });
        } else {
          const clonedMolding = meta.clone();
          clonedMolding.material = meta.material.clone();
          assert(clonedMolding);
          moldingsToAdd.push(clonedMolding);
        }
      } else {
        if (moldingType === HSCore.Model.MoldingTypeEnum.Baseboard) {
          HSCore.Model.BaseboardTopoPather.calcBaseSweepPath(this.face).forEach((path: BaseSweepPath) => {
            const baseboard = this.createBaseboard(path);
            if (baseboard) {
              moldingsToAdd.push(baseboard);
            }
          });
        } else if (moldingType === HSCore.Model.MoldingTypeEnum.Cornice) {
          HSCore.Model.CorniceTopoPather.calcBaseSweepPath(this.face).forEach((path: BaseSweepPath) => {
            const cornice = this.createCornice(path);
            moldingsToAdd.push(cornice);
          });
        } else {
          const molding = HSCore.Util.Molding.createFromType(moldingType);
          assert(molding, '添加墙面线条：不支持的线条类型');
          molding.initByMeta(meta.profile);
          molding.material = HSCore.Material.Material.create(meta.material);
          moldingsToAdd.push(molding);
        }
      }

      moldingsToAdd.forEach((molding: HSCore.Model.Molding) => {
        HSCore.Util.Molding.copyMoldingAttribute(molding, meta);
        this._addToFace(molding);
      });

      if (moldingsToAdd.length > 0) {
        if (moldingsToAdd[0] instanceof HSCore.Model.Baseboard) {
          HSCore.Util.Molding.autoConnectFaceBaseboards(this.face);
        } else if (moldingsToAdd[0] instanceof HSCore.Model.Cornice) {
          HSCore.Util.Molding.autoConnectFaceCornices(this.face);
        }
      }

      super.onCommit?.([]);
    } else {
      assert(false, 'invalid molding type');
    }
  }

  createBaseboard(path: BaseSweepPath): HSCore.Model.Baseboard | undefined {
    const baseboard = HSCore.Util.Molding.createFromType(
      HSCore.Model.MoldingTypeEnum.Baseboard
    ) as HSCore.Model.Baseboard;

    assert(!!baseboard, '生成踢脚线失败!');

    if (!this.productMetas) {
      return undefined;
    }

    baseboard.initByMeta(this.productMetas.profile);
    baseboard.material = HSCore.Material.Material.create(this.productMetas.material);

    if (baseboard.height >= path.zlimit) {
      return undefined;
    }

    const topoPather = HSCore.Util.Molding.createBaseboardTopoPather(path);
    if (baseboard.addTopoPather(topoPather)) {
      return baseboard;
    }

    assert(false, '踢脚线添加路径失败!');
    return undefined;
  }

  createCornice(path: BaseSweepPath): HSCore.Model.Cornice | undefined {
    const cornice = HSCore.Util.Molding.createFromType(
      HSCore.Model.MoldingTypeEnum.Cornice
    ) as HSCore.Model.Cornice;

    assert(!!cornice, '生成石膏线失败');

    if (!this.productMetas) {
      return undefined;
    }

    cornice.initByMeta(this.productMetas.profile);
    cornice.material = HSCore.Material.Material.create(this.productMetas.material);
    cornice.offset = path.offset ?? 0;

    if (cornice.height + cornice.offset >= (path.offsetZLimit ?? 0)) {
      return undefined;
    }

    const topoPather = HSCore.Util.Molding.createCorniceTopoPather(path);
    if (cornice.addTopoPather(topoPather)) {
      return cornice;
    }

    assert(false, '石膏线添加路径失败!');
    return undefined;
  }

  onUndo(): void {
    super.onUndo?.([]);
  }

  onRedo(): void {
    super.onRedo?.([]);
  }

  canTransactField(): boolean {
    return true;
  }

  private _addToFace(molding: HSCore.Model.Molding): void {
    if (!molding) {
      return;
    }

    molding.assignTo(this.face);
    this.face.addMolding(molding);

    if (molding instanceof HSCore.Model.Baseboard) {
      if (molding.offset > 0) {
        HSCore.Util.Face.makeHoleForMolding(molding);
      } else {
        HSCore.Util.Face.removeHoleForMolding(molding);
      }
    }

    HSCore.Util.Molding.dirtyNeighborMoldingsByFacetype(this.face, this.moldingType);
  }

  private _removeFromFace(moldings: HSCore.Model.Molding[]): void {
    if (!moldings.length) {
      return;
    }

    moldings.forEach((molding: HSCore.Model.Molding) => {
      if (molding instanceof HSCore.Model.Baseboard) {
        HSCore.Util.Face.removeHoleForMolding(molding);
      }
      this.face.removeMolding(molding);
    });

    const hasBaseboardInWall = moldings.some(
      (molding: HSCore.Model.Molding) =>
        molding instanceof HSCore.Model.Baseboard && molding.isInWall
    );

    if (hasBaseboardInWall) {
      this.face.updateFaceMixpaint();
      this.face.dirtyGeometry();
    }

    HSCore.Util.Molding.dirtyNeighborMoldingsByFacetype(this.face, this.moldingType);
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}