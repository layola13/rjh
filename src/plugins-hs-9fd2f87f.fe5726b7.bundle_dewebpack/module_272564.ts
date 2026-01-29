interface LightBand {
  getUniqueParent(): CustomizedModel;
}

interface CustomizedModel {
  webCADDocument: unknown;
}

interface WebCADDocument {
  [key: string]: unknown;
}

namespace HSCore {
  export namespace Model {
    export class CustomizedModel {
      webCADDocument: unknown;
      
      static stringifyWebCADDocument(doc: unknown): string {
        return JSON.stringify(doc);
      }
      
      static parseWebCADDocument(docString: string): unknown {
        return JSON.parse(docString);
      }
    }
  }
  
  export namespace Util {
    export class Content {
      static removeCustomizedModelLightBand(lightBand: LightBand): void {}
      static restoreRemovedLightBand(lightBand: LightBand, model: CustomizedModel): void {}
    }
  }
  
  export namespace Transaction {
    export class Request {
      doRequest(): void {}
      onCommit(): void {}
      onUndo(): void {}
      onRedo(): void {}
    }
  }
}

export default class RemoveLightBandRequest extends HSCore.Transaction.Request {
  private _lightBand: LightBand;
  private _parentCustomizedModel: CustomizedModel;
  private _webcadDocBefore: string;
  private _webcadDocAfter: string;

  constructor(lightBand: LightBand) {
    super();
    this._lightBand = lightBand;
    this._parentCustomizedModel = lightBand.getUniqueParent();
    this._webcadDocBefore = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
    this._webcadDocAfter = "";
  }

  doRequest(): void {
    HSCore.Util.Content.removeCustomizedModelLightBand(this._lightBand);
  }

  onCommit(): void {
    this.doRequest();
    this._webcadDocAfter = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
  }

  onUndo(): void {
    this._parentCustomizedModel.webCADDocument = HSCore.Model.CustomizedModel.parseWebCADDocument(
      this._webcadDocBefore
    );
    HSCore.Util.Content.restoreRemovedLightBand(
      this._lightBand,
      this._parentCustomizedModel
    );
  }

  onRedo(): void {
    HSCore.Util.Content.removeCustomizedModelLightBand(this._lightBand);
    this._parentCustomizedModel.webCADDocument = HSCore.Model.CustomizedModel.parseWebCADDocument(
      this._webcadDocAfter
    );
  }
}