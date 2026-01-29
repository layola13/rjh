import { HSCore } from './HSCore';

interface Content {
  displayName: string;
}

const HSFPConstants = {
  LogGroupTypes: {
    ContentOperation: 'ContentOperation'
  }
};

export class RenameContentRequest extends HSCore.Transaction.Common.StateRequest {
  private _content: Content;
  private _newName: string;

  constructor(content: Content, newName: string) {
    super();
    this._content = content;
    this._newName = newName;
  }

  onCommit(): void {
    this._content.displayName = this._newName;
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "模型重命名";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}