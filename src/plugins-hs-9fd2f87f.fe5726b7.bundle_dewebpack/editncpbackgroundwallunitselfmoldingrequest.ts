import { Line2d, Vector2, MathAlg } from './MathLibrary';
import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

type MoldingType = 'left' | 'right';

type MessageType =
  | 'onSelfMoldingOpen'
  | 'onSelfMoldingClose'
  | 'onSelfMoldingReplaceProfile'
  | 'onSelfMoldingReplaceMaterial'
  | 'onSelfMoldingReset';

interface MoldingInfo {
  // Define properties based on actual structure
  [key: string]: unknown;
}

interface MoldingMeta {
  // Define properties based on actual structure
  [key: string]: unknown;
}

interface RequestParam {
  moldingInfo?: MoldingInfo;
  meta?: MoldingMeta;
  moldingType?: MoldingType;
}

interface SelfMolding {
  parameters: {
    offset: number;
  };
}

export class EditNCPBackgroundWallUnitSelfMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _content: HSCore.Model.NCPBackgroundWallUnit;
  private readonly _msg: MessageType;
  private readonly _param: RequestParam;

  constructor(
    content: HSCore.Model.NCPBackgroundWallUnit,
    msg: MessageType,
    param: RequestParam
  ) {
    super();
    this._content = content;
    this._msg = msg;
    this._param = param;
  }

  doRequest(): void {
    switch (this._msg) {
      case 'onSelfMoldingOpen':
        if (this._param.moldingInfo && this._param.meta) {
          this._content.generateSelfMolding(this._param.moldingInfo, this._param.meta);
        }
        if (this._param.moldingType) {
          this.autoAdaptBySelfMolding(this._msg, this._param.moldingType);
        }
        break;

      case 'onSelfMoldingClose':
        if (this._param.moldingType) {
          this.autoAdaptBySelfMolding(this._msg, this._param.moldingType);
          this._content.clearSelfMoldingByType(this._param.moldingType);
        }
        break;

      case 'onSelfMoldingReplaceProfile':
      case 'onSelfMoldingReplaceMaterial':
        if (this._param.moldingInfo && this._param.meta) {
          this._content.generateSelfMolding(this._param.moldingInfo, this._param.meta);
        }
        break;

      case 'onSelfMoldingReset':
        this._content.clearSelfMoldingByType('left');
        this._content.clearSelfMoldingByType('right');
        break;
    }
  }

  onCommit(): void {
    this.doRequest();
    super.onCommit([]);
  }

  autoAdaptBySelfMolding(messageType: MessageType, moldingType: MoldingType): void {
    const layer = HSCore.Util.Layer.getEntityLayer(this._content);
    if (!layer) {
      return;
    }

    let isOpening: boolean;
    if (messageType === 'onSelfMoldingOpen') {
      isOpening = true;
    } else if (messageType === 'onSelfMoldingClose') {
      isOpening = false;
    } else {
      return;
    }

    const tolerance = 0.001;

    const calculateDistance = (
      sourceUnit: HSCore.Model.NCPBackgroundWallUnit,
      targetUnit: HSCore.Model.NCPBackgroundWallUnit,
      type: MoldingType
    ): number => {
      let distance = 0;

      const sourceOutline = sourceUnit === this._content
        ? sourceUnit.outline
        : sourceUnit.getOutlineIncludeMolding();
      const targetOutline = targetUnit === this._content
        ? targetUnit.outline
        : targetUnit.getOutlineIncludeMolding();

      let sourceLine: Line2d;
      let targetLine: Line2d;

      if (type === 'left') {
        sourceLine = new Line2d(sourceOutline[3], sourceOutline[0]);
        targetLine = new Line2d(targetOutline[1], targetOutline[2]);
      } else {
        sourceLine = new Line2d(sourceOutline[1], sourceOutline[2]);
        targetLine = new Line2d(targetOutline[3], targetOutline[0]);
      }

      if (targetLine.side(sourceLine.getMidPt(), tolerance) !== 0) {
        const pointDistance = MathAlg.CalculateDistance.pointToCurve2dSigned(
          sourceLine.getStartPt(),
          targetLine
        );
        if (Math.abs(pointDistance) > tolerance) {
          distance = pointDistance;
        }
      }

      return distance;
    };

    const adjacentUnits: HSCore.Model.NCPBackgroundWallUnit[] = [];

    layer.forEachContent((entity: unknown) => {
      if (
        entity instanceof HSCore.Model.NCPBackgroundWallUnit &&
        entity.host === this._content.host &&
        entity !== this._content
      ) {
        if (calculateDistance(this._content, entity, moldingType) >= 0) {
          adjacentUnits.push(entity);
        }
      }
    });

    adjacentUnits.sort((unitA, unitB) => {
      const distanceA = new Vector2(this._content).distanceTo(new Vector2(unitA));
      const distanceB = new Vector2(this._content).distanceTo(new Vector2(unitB));
      return distanceA - distanceB;
    });

    adjacentUnits.forEach((currentUnit, index) => {
      const previousUnit = index === 0 ? this._content : adjacentUnits[index - 1];
      const distance = calculateDistance(previousUnit, currentUnit, moldingType);
      const moldingOffset = this._content.findSelfMoldingByType(moldingType).parameters.offset / 1000;
      let adjustmentDistance = 0;

      if (isOpening) {
        if (distance >= 0) {
          if (distance < moldingOffset) {
            adjustmentDistance = moldingOffset - distance;
          }
        } else {
          adjustmentDistance = Math.abs(distance) < moldingOffset ? Math.abs(distance) : moldingOffset;
        }
      } else {
        if (distance > 0) {
          if (HSCore.Util.Math.nearlyEquals(distance, moldingOffset, tolerance)) {
            adjustmentDistance = moldingOffset;
          } else if (distance < moldingOffset) {
            adjustmentDistance = distance;
          }
        } else {
          adjustmentDistance = moldingOffset;
        }
      }

      if (adjustmentDistance !== 0) {
        const offsetVector =
          moldingType === 'left'
            ? new Vector2(isOpening ? -adjustmentDistance : adjustmentDistance, 0)
            : new Vector2(isOpening ? adjustmentDistance : -adjustmentDistance, 0);

        offsetVector.rotate(
          { x: 0, y: 0 },
          -THREE.Math.degToRad(this._content.rotation ?? 0)
        );

        currentUnit.x = currentUnit.x + offsetVector.x;
        currentUnit.y = currentUnit.y + offsetVector.y;
      }

      currentUnit.refreshBoundInternal();
    });

    this._content.dirtyPosition();
  }

  onUndo(): void {
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWallUnit;
  }

  getDescription(): string {
    switch (this._msg) {
      case 'onSelfMoldingOpen':
        if (this._param?.moldingType) {
          return this._param.moldingType === 'left'
            ? '开启参数化背景墙单元左侧线条'
            : '开启参数化背景墙单元右侧线条';
        }
        return '开启参数化背景墙单元左右线条';

      case 'onSelfMoldingClose':
        if (this._param?.moldingType) {
          return this._param.moldingType === 'left'
            ? '关闭参数化背景墙单元左侧线条'
            : '关闭参数化背景墙单元右侧线条';
        }
        return '关闭参数化背景墙单元左右线条';

      case 'onSelfMoldingReplaceProfile':
        if (this._param?.moldingType) {
          return this._param.moldingType === 'left'
            ? '替换参数化背景墙单元左侧线条样式'
            : '替换参数化背景墙单元右侧线条样式';
        }
        return '替换参数化背景墙单元左右线条样式';

      case 'onSelfMoldingReplaceMaterial':
        if (this._param?.moldingType) {
          return this._param.moldingType === 'left'
            ? '替换参数化背景墙单元左侧线条材质'
            : '替换参数化背景墙单元右侧线条材质';
        }
        return '替换参数化背景墙单元左右线条材质';

      case 'onSelfMoldingReset':
        return '参数化背景墙单元左右线条恢复默认';

      default:
        return '编辑参数化背景墙单元左右线条';
    }
  }
}