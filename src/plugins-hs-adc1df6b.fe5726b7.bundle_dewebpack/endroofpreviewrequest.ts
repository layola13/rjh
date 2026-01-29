import { HSCore } from './HSCore';

interface Roof {
  previewParams?: Record<string, unknown>;
}

export class EndRoofPreviewRequest extends HSCore.Transaction.Request {
  private roof: Roof;

  constructor(roof: Roof) {
    super();
    this.roof = roof;
  }

  onCommit(): Roof {
    if (this.roof.previewParams) {
      this.roof.previewParams = undefined;
    }
    super.onCommit([]);
    return this.roof;
  }

  onUndo(): void {
    this.roof.previewParams = {};
  }

  onRedo(): void {
    this.roof.previewParams = undefined;
  }
}