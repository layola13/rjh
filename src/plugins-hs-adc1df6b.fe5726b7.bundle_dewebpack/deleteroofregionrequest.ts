import { HSCore } from './HSCore';

export class DeleteRoofRegionRequest extends HSCore.Transaction.Common.StateRequest {
  private roofRegion: RoofRegion;

  constructor(roofRegion: RoofRegion) {
    super();
    this.roofRegion = roofRegion;
  }

  onCommit(): void {
    this.roofRegion.remove();
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}

interface RoofRegion {
  remove(): void;
}