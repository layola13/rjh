import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

interface Mitre {
  // Define mitre properties based on your domain model
  id?: string;
  [key: string]: unknown;
}

export class DeleteMitreMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private mitre: Mitre;

  constructor(mitre: Mitre) {
    super();
    this.mitre = mitre;
  }

  onCommit(): void {
    HSCore.Util.Content.removeContent(this.mitre);
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "删除阳角线";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}