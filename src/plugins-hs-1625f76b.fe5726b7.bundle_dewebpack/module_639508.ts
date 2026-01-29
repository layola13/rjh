import { HSCore } from './path/to/HSCore';
import HSCatalog from './path/to/HSCatalog';
import HSFPConstants from './path/to/HSFPConstants';

type SwingType = 0 | 1 | 2 | 3;

interface Opening {
  swing: SwingType;
  contentType: {
    isTypeOf(type: string): boolean;
  };
  build(): void;
}

class SwingDoorFlipTransaction extends HSCore.Transaction.Common.StateRequest {
  private opening: Opening;
  private nextSwing: SwingType;

  constructor(opening: Opening, nextSwing?: SwingType) {
    super();
    this.opening = opening;
    this.nextSwing = nextSwing !== undefined ? nextSwing : this.getNextSwing();
  }

  private getNextSwing(): SwingType {
    const normalSwingMap = new Map<SwingType, SwingType>([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0]
    ]);

    const reverseSwingMap = new Map<SwingType, SwingType>([
      [0, 3],
      [3, 2],
      [2, 1],
      [1, 0]
    ]);

    const doubleSwingMap = new Map<SwingType, SwingType>([
      [0, 1],
      [1, 0],
      [2, 3],
      [3, 2]
    ]);

    let swingMap = normalSwingMap;

    if (
      this.opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.AdoubleSwingDoor) ||
      this.opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.FoldingDoor)
    ) {
      swingMap = reverseSwingMap;
    } else if (this.opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.DoubleSwingDoor)) {
      swingMap = doubleSwingMap;
    }

    return swingMap.get(this.opening.swing) as SwingType;
  }

  onCommit(): void {
    this.opening.swing = this.nextSwing;
    this.opening.build();
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "翻转操作";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default SwingDoorFlipTransaction;