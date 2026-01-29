interface CustomizedModelMeta {
  [key: string]: unknown;
}

interface CustomizedModel {
  webCADDocument: unknown;
}

interface LightSlot {
  [key: string]: unknown;
}

interface MoldingSpec {
  lightSlot: LightSlot;
  parent: CustomizedModel;
}

/**
 * Transaction request for adding customized model molding
 */
class AddCustomizedModelMoldingRequest extends HSCore.Transaction.Request {
  private readonly _meta: CustomizedModelMeta;
  private readonly _parentCustomizedModel: CustomizedModel;
  private readonly _webcadDocBefore: string;
  private _webcadDocAfter: string;
  private _spec!: MoldingSpec;

  constructor(meta: CustomizedModelMeta, parentCustomizedModel: CustomizedModel) {
    super();
    this._meta = meta;
    this._parentCustomizedModel = parentCustomizedModel;
    this._webcadDocBefore = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      parentCustomizedModel.webCADDocument
    );
    this._webcadDocAfter = "";
  }

  onCommit(): void {
    const lightSlot = HSCore.Util.CustomizedModel.createCustomizedModelLightSlot(this._meta);
    this._spec = {
      lightSlot,
      parent: this._parentCustomizedModel
    };
    HSCore.Util.Content.addCustomizedModelMolding(this._spec);
    this._webcadDocAfter = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
  }

  onUndo(): void {
    HSCore.Util.Content.removeCustomizedModelMolding(this._spec.lightSlot);
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

export default AddCustomizedModelMoldingRequest;