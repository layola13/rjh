/**
 * Curtain组件材质和可见性管理请求
 */

interface Curtain {
  isComponentAvailable(component: CurtainComponent): boolean;
  getMaterial(component: CurtainComponent): Material | undefined;
  setMaterial(component: CurtainComponent, material: Material | undefined): void;
  getDisabledComponents(): CurtainComponent[];
  enableComponent(component: CurtainComponent): void;
  disableComponent(component: CurtainComponent): void;
}

type CurtainComponent = string;
type Material = unknown;

/**
 * 重置窗帘请求 - 清除所有组件材质并启用所有组件
 */
export class ResetCurtainRequest extends HSCore.Transaction.Request {
  private readonly _curtain: Curtain;
  private _oldMaterialByComponent: Map<CurtainComponent, Material>;
  private _oldDisabledComponent: CurtainComponent[];

  constructor(curtain: Curtain) {
    super();
    this._curtain = curtain;
    this._oldMaterialByComponent = new Map();
    this._oldDisabledComponent = [];
  }

  onCommit(): void {
    const curtain = this._curtain;
    const oldMaterialByComponent = this._oldMaterialByComponent;
    
    this._oldDisabledComponent = this._EnableAllComponents(curtain);
    
    Object.keys(HSCore.Model.CurtainComponentEnum)
      .map(key => HSCore.Model.CurtainComponentEnum[key])
      .filter(component => {
        return curtain.isComponentAvailable(component) &&
               component !== HSCore.Model.CurtainComponentEnum.RailTips &&
               curtain.getMaterial(component) !== undefined;
      })
      .forEach(component => {
        oldMaterialByComponent.set(component, curtain.getMaterial(component)!);
        curtain.setMaterial(component, undefined);
      });
  }

  onUndo(): void {
    for (let i = 0; i < this._oldDisabledComponent.length; i++) {
      this._curtain.disableComponent(this._oldDisabledComponent[i]);
    }
    
    this._oldMaterialByComponent.forEach((material, component) => {
      this._curtain.setMaterial(component, material);
    });
  }

  onRedo(): void {
    this._oldMaterialByComponent.forEach((material, component) => {
      this._curtain.setMaterial(component, undefined);
    });
    
    this._EnableAllComponents(this._curtain);
  }

  private _EnableAllComponents(curtain: Curtain): CurtainComponent[] {
    const disabledComponents = curtain.getDisabledComponents();
    
    for (let i = 0; i < disabledComponents.length; i++) {
      curtain.enableComponent(disabledComponents[i]);
    }
    
    return disabledComponents;
  }
}

/**
 * 显示/隐藏窗帘组件请求
 */
export class ShowHideCurtainComponentRequest extends HSCore.Transaction.Request {
  private readonly _curtain: Curtain;
  private readonly _component: CurtainComponent;
  private readonly _isHide: boolean;

  constructor(curtain: Curtain, component: CurtainComponent, isHide: boolean) {
    super();
    this._curtain = curtain;
    this._component = component;
    this._isHide = isHide;
  }

  onCommit(): void {
    this._ShowHideComponent(this._component, this._isHide);
  }

  onUndo(): void {
    this._ShowHideComponent(this._component, !this._isHide);
  }

  onRedo(): void {
    this._ShowHideComponent(this._component, this._isHide);
  }

  private _ShowHideComponent(component: CurtainComponent, isHide: boolean): void {
    if (isHide) {
      this._curtain.disableComponent(component);
    } else {
      this._curtain.enableComponent(component);
    }
  }
}