interface MoldingMeta {
  [key: string]: unknown;
}

interface CustomizedModel {
  webCADDocument: unknown;
}

interface MoldingSpec {
  molding: unknown;
  parent: CustomizedModel;
}

declare namespace HSCore {
  namespace Model {
    namespace CustomizedModel {
      function stringifyWebCADDocument(doc: unknown): string;
      function parseWebCADDocument(str: string): unknown;
    }
  }
  
  namespace Util {
    namespace CustomizedModel {
      function createCustomizedModelMolding(meta: MoldingMeta): unknown;
    }
    
    namespace Content {
      function addCustomizedModelMolding(spec: MoldingSpec): void;
      function removeCustomizedModelMolding(molding: unknown): void;
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

export default class AddCustomizedModelMoldingRequest extends HSCore.Transaction.Request {
  private readonly _meta: MoldingMeta;
  private readonly _parentCustomizedModel: CustomizedModel;
  private readonly _webcadDocBefore: string;
  private _webcadDocAfter: string;
  private _spec!: MoldingSpec;

  constructor(meta: MoldingMeta, parentCustomizedModel: CustomizedModel) {
    super();
    this._meta = meta;
    this._parentCustomizedModel = parentCustomizedModel;
    this._webcadDocBefore = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
    this._webcadDocAfter = "";
  }

  onCommit(): void {
    const molding = HSCore.Util.CustomizedModel.createCustomizedModelMolding(this._meta);
    this._spec = {
      molding,
      parent: this._parentCustomizedModel
    };
    HSCore.Util.Content.addCustomizedModelMolding(this._spec);
    this._webcadDocAfter = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
  }

  onUndo(): void {
    HSCore.Util.Content.removeCustomizedModelMolding(this._spec.molding);
    this._parentCustomizedModel.webCADDocument = HSCore.Model.CustomizedModel.parseWebCADDocument(
      this._webcadDocBefore
    );
  }

  onRedo(): void {
    HSCore.Util.Content.addCustomizedModelMolding(this._spec);
    this._parentCustomizedModel.webCADDocument = HSCore.Model.CustomizedModel.parseWebCADDocument(
      this._webcadDocAfter
    );
  }
}