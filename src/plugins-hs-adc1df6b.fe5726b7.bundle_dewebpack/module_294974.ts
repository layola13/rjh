import { HSCore } from './HSCore';
import { IPropertybarEditParametricopeingHoldAction } from './constants';

interface ParametricOpening {
  isSplitFace: boolean;
  aFaceMaterialSwitch: boolean;
  bFaceMaterialSwitch: boolean;
  seekId: string;
  displayName: string;
  build(): void;
  dirtyGeometry(): void;
}

interface ReceiveValue {
  value: boolean;
}

interface CurrentParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

export default class ParametricOpeningEditRequest extends HSCore.Transaction.Request {
  private _parametricopening: ParametricOpening;
  private _action?: IPropertybarEditParametricopeingHoldAction;
  private _value?: boolean;

  constructor(parametricOpening: ParametricOpening) {
    super();
    this._parametricopening = parametricOpening;
  }

  onReceive(action: IPropertybarEditParametricopeingHoldAction, data: ReceiveValue): boolean {
    this._action = action;
    this._value = data.value;
    this.doReceive(action, data.value);
    return true;
  }

  doReceive(action: IPropertybarEditParametricopeingHoldAction, value: boolean): void {
    switch (action) {
      case IPropertybarEditParametricopeingHoldAction.SplitFaceSwitch:
        this._parametricopening.isSplitFace = value;
        HSApp.App.getApp()?.signalCustomFunctionStart?.dispatch({
          key: "house.template.parametricWindow.styleSetting.openingSplit"
        });
        break;
      case IPropertybarEditParametricopeingHoldAction.AFaceMaterialSwitch:
        this._parametricopening.aFaceMaterialSwitch = value;
        break;
      case IPropertybarEditParametricopeingHoldAction.BFaceMaterialSwitch:
        this._parametricopening.bFaceMaterialSwitch = value;
        break;
    }
  }

  onCommit(): void {
    this._parametricopening.build();
    super.onCommit();
  }

  onUndo(): void {
    super.onUndo();
    if (this._action && this._value !== undefined) {
      this._value = !this._value;
      this.doReceive(this._action, this._value);
    }
    this._parametricopening.dirtyGeometry();
    this._parametricopening.build();
  }

  onRedo(): void {
    super.onRedo();
    if (this._action && this._value !== undefined) {
      this._value = !this._value;
      this.doReceive(this._action, this._value);
    }
    this._parametricopening.dirtyGeometry();
    this._parametricopening.build();
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  getDescription(): string {
    return "参数化洞材质编辑";
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: "contentEdit",
      activeSectionName: "模型操作",
      clicksRatio: {
        id: this._parametricopening.seekId,
        name: this._parametricopening.displayName
      }
    };
  }
}