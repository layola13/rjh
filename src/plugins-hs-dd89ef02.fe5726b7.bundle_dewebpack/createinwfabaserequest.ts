import { HSCore } from './HSCore';

export class CreateInWFABaseRequest extends HSCore.Transaction.Common.StateRequest {
  params: unknown;

  constructor(params: unknown) {
    super();
    this.params = params;
  }

  canTransactField(): boolean {
    return true;
  }
}