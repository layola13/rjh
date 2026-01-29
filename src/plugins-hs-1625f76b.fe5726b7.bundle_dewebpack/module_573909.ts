import { HSCore } from './hscore';

interface CustomDuplicateDate {
  proxyId: string;
  [key: string]: unknown;
}

interface Transaction {
  undo(): void;
  redo(): void;
  prepareRedo(): void;
}

interface AddContentOptions {
  content: unknown;
  host: unknown;
  parent: unknown;
}

export default class CustomDuplicateDateStateRequest extends HSCore.Transaction.Common.StateRequest {
  private customDuplicateDate: CustomDuplicateDate;
  private transaction?: Transaction;

  constructor(customDuplicateDate: CustomDuplicateDate) {
    super();
    this.customDuplicateDate = customDuplicateDate;
  }

  onCommit(): unknown {
    const content = this.createContent();
    super.onCommit();
    return content;
  }

  createContent(): unknown {
    const entityProxy = HSCore.Model.EntityProxyFactory.getProxyObject(
      this.customDuplicateDate.proxyId
    );

    if (!entityProxy) {
      return null;
    }

    this.transaction = entityProxy.prepareUndoData();
    const duplicatedContent = entityProxy.loadFromDuplicateData(this.customDuplicateDate);

    if (duplicatedContent) {
      const activeDocument = HSCore.Doc.getDocManager().activeDocument;
      const options: AddContentOptions = {
        content: duplicatedContent,
        host: undefined,
        parent: activeDocument.scene.activeLayer
      };
      HSCore.Util.Content.addContent(options);
    }

    this.transaction?.prepareRedo();
    return duplicatedContent;
  }

  onUndo(): void {
    this.transaction?.undo();
    super.onUndo();
  }

  onRedo(): void {
    super.onRedo();
    this.transaction?.redo();
  }
}