import { HSCore } from './HSCore';

export class ChangeStructureModeRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _structure: HSCore.Model.NCustomizedStructure | HSCore.Model.Column;
  private readonly _isWallPart: boolean;

  constructor(
    structure: HSCore.Model.NCustomizedStructure | HSCore.Model.Column,
    isWallPart: boolean
  ) {
    super();
    this._structure = structure;
    this._isWallPart = isWallPart;
  }

  onCommit(): void {
    const shouldConvertToWallPart =
      this._isWallPart === false &&
      this._structure instanceof HSCore.Model.NCustomizedStructure &&
      this._structure.isWallPart();

    const shouldConvertFromWallPart =
      this._isWallPart === true &&
      this._structure instanceof HSCore.Model.NCustomizedStructure &&
      !this._structure.isWallPart();

    if (shouldConvertToWallPart || shouldConvertFromWallPart) {
      this._structure.setStructureMode(this._isWallPart);
    } else if (
      this._isWallPart === true &&
      this._structure instanceof HSCore.Model.Column
    ) {
      this.generateStructureFromColumn();
    }

    super.onCommit([]);
  }

  generateColumnFromStructure(): void {
    const column = new HSCore.Model.Column();
    column.initByMeta(this._structure.metadata);
    column.applyLengths(
      this._structure.XSize,
      this._structure.YSize,
      this._structure.ZSize
    );
    column.x = this._structure.x;
    column.y = this._structure.y;
    column.z = this._structure.z;
    column.ZRotation = this._structure.rotation;

    const parent = this._structure.parent;
    parent.removeChild(this._structure);
    parent.roomBuilder.build();
    parent.addChild(column);

    const selectionManager = HSApp.Selection.Manager;
    selectionManager.unselectAll();
    selectionManager.select(column, {});
  }

  generateStructureFromColumn(): void {
    if (!(this._structure instanceof HSCore.Model.Column)) {
      return;
    }

    let newStructure:
      | HSCore.Model.NCustomizedCircleColumn
      | HSCore.Model.NCustomizedSquareColumn
      | undefined;

    if (
      this._structure.contentType.isTypeOf(
        HSCatalog.ContentTypeEnum.ColumnDiyRound
      )
    ) {
      newStructure = new HSCore.Model.NCustomizedCircleColumn();
    } else if (
      this._structure.contentType.isTypeOf(
        HSCatalog.ContentTypeEnum.ColumnDiySquare
      )
    ) {
      newStructure = new HSCore.Model.NCustomizedSquareColumn();
    }

    if (!newStructure) {
      return;
    }

    newStructure.initByMeta(this._structure.metadata);
    newStructure.XLength = this._structure.XLength;
    newStructure.YLength = this._structure.YLength;
    newStructure.ZLength = this._structure.ZLength;
    newStructure.x = this._structure.x;
    newStructure.y = this._structure.y;
    newStructure.z = this._structure.z;
    newStructure.ZRotation = this._structure.ZRotation;

    const parent = this._structure.parent;
    parent.removeChild(this._structure);
    parent.addChild(newStructure);
    newStructure.syncLayerHeight();
    newStructure.XScale = this._structure.XScale;
    newStructure.YScale = this._structure.YScale;
    newStructure.ZScale = this._structure.ZSize / newStructure.ZLength;
    parent.roomBuilder.build();

    const selectionManager = HSApp.Selection.Manager;
    selectionManager.unselectAll();
    selectionManager.select(newStructure, {});
  }

  canTransactField(): boolean {
    return true;
  }
}