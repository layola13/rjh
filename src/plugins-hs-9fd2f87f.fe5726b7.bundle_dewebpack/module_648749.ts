interface Molding {
  getUniqueParent(): CustomizedModel;
}

interface CustomizedModel {
  webCADDocument: unknown;
}

interface MoldingSpec {
  [key: string]: unknown;
}

declare namespace HSCore {
  namespace Model {
    namespace CustomizedModel {
      function stringifyWebCADDocument(doc: unknown): string;
      function parseWebCADDocument(str: string): unknown;
    }
  }
  
  namespace Util {
    namespace Content {
      function removeCustomizedModelMolding(molding: Molding): MoldingSpec;
      function addCustomizedModelMolding(spec: MoldingSpec): void;
    }
  }
  
  namespace Transaction {
    class Request {
      onCommit?(): void;
      onUndo?(): void;
      onRedo?(): void;
    }
  }
}

export default class RemoveMoldingTransaction extends HSCore.Transaction.Request {
  private _molding: Molding;
  private _parentCustomizedModel: CustomizedModel;
  private _webcadDocBefore: string;
  private _webcadDocAfter: string;
  private _spec?: MoldingSpec;

  constructor(molding: Molding) {
    super();
    this._molding = molding;
    this._parentCustomizedModel = molding.getUniqueParent();
    this._webcadDocBefore = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
    this._webcadDocAfter = "";
  }

  onCommit(): void {
    this._spec = HSCore.Util.Content.removeCustomizedModelMolding(this._molding);
    this._webcadDocAfter = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
  }

  onUndo(): void {
    this._parentCustomizedModel.webCADDocument = 
      HSCore.Model.CustomizedModel.parseWebCADDocument(this._webcadDocBefore);
    
    if (this._spec) {
      HSCore.Util.Content.addCustomizedModelMolding(this._spec);
    }
  }

  onRedo(): void {
    this._parentCustomizedModel.webCADDocument = 
      HSCore.Model.CustomizedModel.parseWebCADDocument(this._webcadDocAfter);
    
    HSCore.Util.Content.removeCustomizedModelMolding(this._molding);
  }
}