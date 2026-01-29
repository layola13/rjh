import { HSCore } from './HSCore';

interface ContentType {
  // Define based on your actual ContentType structure
  [key: string]: unknown;
}

interface Entity {
  contentType?: ContentType;
}

export class EditCustomizedPMTypeRequest extends HSCore.Transaction.Common.StateRequest {
  private _entity?: Entity;
  private _contentType?: ContentType;

  constructor(entity?: Entity, contentType?: ContentType) {
    super();
    this._entity = entity;
    this._contentType = contentType;
  }

  onCommit(): void {
    if (this._entity) {
      this._entity.contentType = this._contentType;
    }
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}