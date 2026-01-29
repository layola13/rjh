import { HSCore } from './HSCore';
import { PerformanceLogCategory, PerformanceOperationTypes } from './PerformanceConstants';

const logger = log.logger(PerformanceLogCategory.Operation);

export class ResizeOpeningProfileRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _opening: Opening;

  constructor(opening: Opening) {
    super();
    this._opening = opening;
  }

  canTransactField(): boolean {
    return true;
  }

  onReceive(fieldName: string, value: number): boolean {
    if (fieldName === "archHeight") {
      logger.time(PerformanceOperationTypes.OpeningProfileResize);
      
      const heightDelta = value - this._opening.archHeight;
      this._opening.updateByPM(
        undefined, 
        this._opening.ZLength + heightDelta, 
        value
      );
      this._opening.build();
      
      logger.timeEnd(PerformanceOperationTypes.OpeningProfileResize, true);
    }
    return true;
  }

  getDescription(): string {
    const openingType = HSCore.Util.Content.isWallNiche(this._opening) 
      ? "墙龛" 
      : "门洞";
    return `${openingType}拱高设置`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

interface Opening {
  archHeight: number;
  ZLength: number;
  updateByPM(param1: undefined, zLength: number, archHeight: number): void;
  build(): void;
}