interface CustomizedPMInstance {
  getUniqueParent(): RootModel;
}

interface RootModel {
  webCADDocument: string;
  openDiyDocument(flag: boolean): Promise<void>;
}

interface RemoveSpec {
  insModels: CustomizedPMInstance[];
  rootModel: RootModel;
}

interface CustomizedPMModelUtil {
  removeCustomizedPMInstance(instances: CustomizedPMInstance[]): RemoveSpec;
  addCustomizedPMInstance(options: { insModel: CustomizedPMInstance; rootModel: RootModel }): void;
}

declare global {
  namespace HSApp {
    namespace Util {
      const CustomizedPMModel: CustomizedPMModelUtil;
    }
  }
  namespace HSCore {
    namespace Transaction {
      class Request {
        onCommit?(): void;
        onUndo?(): Promise<void>;
        onRedo?(): Promise<void>;
      }
    }
  }
}

export class DeleteCustomizedPMInstanceRequest extends HSCore.Transaction.Request {
  private readonly _instances: CustomizedPMInstance[];
  private readonly _rootModel: RootModel | undefined;
  private readonly _webcadDocBefore: string | undefined;
  private _webcadDocAfter: string = "";
  private _spec!: RemoveSpec;

  constructor(instances: CustomizedPMInstance[]) {
    super();
    this._instances = instances;
    this._rootModel = instances.length ? instances[0].getUniqueParent() : undefined;
    this._webcadDocBefore = this._rootModel?.webCADDocument;
  }

  onCommit(): void {
    this._spec = HSApp.Util.CustomizedPMModel.removeCustomizedPMInstance(this._instances);
    if (this._rootModel) {
      this._webcadDocAfter = this._rootModel.webCADDocument;
    }
  }

  async onUndo(): Promise<void> {
    if (!this._rootModel) return;

    this._rootModel.webCADDocument = this._webcadDocBefore ?? "";
    await this._rootModel.openDiyDocument(false);

    this._spec.insModels.forEach((insModel) => {
      HSApp.Util.CustomizedPMModel.addCustomizedPMInstance({
        insModel,
        rootModel: this._spec.rootModel
      });
    });
  }

  async onRedo(): Promise<void> {
    if (!this._rootModel) return;

    this._rootModel.webCADDocument = this._webcadDocAfter;
    await this._rootModel.openDiyDocument(false);
    HSApp.Util.CustomizedPMModel.removeCustomizedPMInstance(this._instances);
  }
}