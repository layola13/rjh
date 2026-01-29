import { HSCore } from './HSCore';

interface Size3D {
  x: number;
  y: number;
  z: number;
}

interface Offset3D {
  x: number;
  y: number;
  z: number;
}

interface IParametricContent {
  XSize: number;
  YSize: number;
  ZSize: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  x: number;
  y: number;
  z: number;
  initBySize(): void;
}

type ParametricModelType =
  | HSCore.Model.NCustomizedParametricModel
  | HSCore.Model.NCustomizedParametricBackgroundWall
  | HSCore.Model.NCPBackgroundWallUnit
  | HSCore.Model.ParametricCurtain
  | HSCore.Model.ParametricBathroomCabinet;

/**
 * Handles resize operations for customized parametric models with undo/redo support
 */
export class ResizeNCustomizedParametricModel extends HSCore.Transaction.Common.StateRequest {
  private readonly _content: ParametricModelType & IParametricContent;
  private readonly _beginSize: Size3D;
  private readonly _endSize: Size3D;
  private readonly _offset: Offset3D;

  constructor(
    content: ParametricModelType & IParametricContent,
    beginSize: Size3D,
    endSize?: Size3D,
    offset?: Partial<Offset3D>
  ) {
    super();

    this._content = content;
    this._beginSize = beginSize;
    this._endSize = endSize ?? {
      x: content.XSize,
      y: content.YSize,
      z: content.ZSize
    };
    this._offset = {
      x: 0,
      y: 0,
      z: 0,
      ...offset
    };
  }

  onCommit(): void {
    if (this._content instanceof HSCore.Model.NCustomizedParametricModel) {
      this.updateSize(this._endSize);
      this.updatePosition(this._offset, true);
      this._content.initBySize();
    }
  }

  onUndo(): void {
    this.updateSize(this._beginSize);
    this._content.initBySize();
    this.updatePosition(this._offset, false);
  }

  onRedo(): void {
    this.updateSize(this._endSize);
    this._content.initBySize();
    this.updatePosition(this._offset, true);
  }

  private updateSize(size: Size3D): void {
    if (size?.x && size?.y && size?.z) {
      this._content.XScale = size.x / this._content.XLength;
      this._content.YScale = size.y / this._content.YLength;
      this._content.ZScale = size.z / this._content.ZLength;
    }
  }

  private updatePosition(offset: Offset3D, isApply: boolean): void {
    if (isApply) {
      this._content.x += offset.x;
      this._content.y += offset.y;
      this._content.z += offset.z;
    } else {
      this._content.x -= offset.x;
      this._content.y -= offset.y;
      this._content.z -= offset.z;
    }
  }

  canTransactField(): boolean {
    return false;
  }

  getCategory(): string {
    if (this._content instanceof HSCore.Model.NCustomizedParametricBackgroundWall) {
      return HSFPConstants.LogGroupTypes.ParametricBackgroundWall;
    }
    if (this._content instanceof HSCore.Model.NCPBackgroundWallUnit) {
      return HSFPConstants.LogGroupTypes.ParametricBackgroundWallUnit;
    }
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return HSFPConstants.LogGroupTypes.ParametricCurtain;
    }
    if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return HSFPConstants.LogGroupTypes.ParametricBathroomCabinet;
    }
    return HSFPConstants.LogGroupTypes.ParametricModel;
  }

  getDescription(): string {
    if (this._content instanceof HSCore.Model.NCustomizedParametricBackgroundWall) {
      return '修改参数化背景墙尺寸';
    }
    if (this._content instanceof HSCore.Model.NCPBackgroundWallUnit) {
      return '修改参数化背景墙单元尺寸';
    }
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return '修改参数化窗帘尺寸';
    }
    if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return '修改参数化浴室柜尺寸';
    }
    return '修改参数化模型尺寸';
  }
}