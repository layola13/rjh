import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { Signal } from './Signal';

enum CurtainComponentEnum {
  Side = "curtain_side",
  Loop = "curtain_loop",
  Screen = "curtain_screen",
  Rail = "curtain_rail",
  RailTips = "curtain_rail_tip"
}

Object.freeze(CurtainComponentEnum);

interface ComponentDisabledEvent {
  component: CurtainComponentEnum;
}

interface ComponentEnabledEvent {
  component: CurtainComponentEnum;
}

interface CurtainSerializedData {
  disabledComponents: string[];
  [key: string]: unknown;
}

class Curtain_IO extends Content_IO {
  dump(
    curtain: Curtain,
    callback?: (data: unknown[], curtain: Curtain) => void,
    includeMetadata: boolean = true,
    options: Record<string, unknown> = {}
  ): CurtainSerializedData[] {
    const serializedData = super.dump(curtain, undefined, includeMetadata, options) as CurtainSerializedData[];
    
    serializedData[0].disabledComponents = curtain._disabledComponents.map(
      component => curtain.getComponentStorageKey(component)
    );
    
    if (callback) {
      callback(serializedData, curtain);
    }
    
    return serializedData;
  }

  load(curtain: Curtain, data: CurtainSerializedData, options?: unknown): void {
    super.load(curtain, data, options);
    
    data.disabledComponents.forEach((componentKey: string) => {
      curtain._disabledComponents.push(CurtainComponentEnum[componentKey as keyof typeof CurtainComponentEnum]);
    });
  }
}

class Curtain extends Content {
  _disabledComponents: CurtainComponentEnum[];
  signalComponentDisabled: Signal<ComponentDisabledEvent>;
  signalComponentEnabled: Signal<ComponentEnabledEvent>;

  constructor(id: string = "", metadata?: unknown) {
    super(id, metadata);
    this._disabledComponents = [];
    this.signalComponentDisabled = new Signal<ComponentDisabledEvent>(this);
    this.signalComponentEnabled = new Signal<ComponentEnabledEvent>(this);
  }

  destroy(): void {
    if (!this._disposed) {
      this.signalComponentDisabled.dispose();
      this.signalComponentDisabled = undefined as any;
      this.signalComponentEnabled.dispose();
      this.signalComponentEnabled = undefined as any;
      super.destroy();
    }
  }

  initByMeta(metadata: unknown): void {
    super.initByMeta(metadata);
  }

  isComponentEnabled(component: CurtainComponentEnum): boolean {
    return !!this.isComponentAvailable(component) && !this._disabledComponents.includes(component);
  }

  disableComponentNumber(): number {
    return this._disabledComponents.length;
  }

  disableComponent(component: CurtainComponentEnum): void {
    if (this.isComponentEnabled(component)) {
      this._disabledComponents.push(component);
      this.signalComponentDisabled.dispatch({ component });
    }
  }

  enableComponent(component: CurtainComponentEnum): void {
    if (this._disabledComponents.includes(component)) {
      this._disabledComponents.xRemove(component);
      this.signalComponentEnabled.dispatch({ component });
    }
  }

  getDisabledComponents(): CurtainComponentEnum[] {
    return this._disabledComponents.slice(0);
  }

  getEnabledComponents(): CurtainComponentEnum[] {
    return Object.values(CurtainComponentEnum).filter(
      component => this.isComponentEnabled(component)
    );
  }

  getNormalizedComponentName(name: string): string {
    return Object.values(CurtainComponentEnum).find(
      component => name.includes(component)
    ) || name;
  }

  getComponentStorageKey(component: CurtainComponentEnum): string {
    for (const [key, value] of Object.entries(CurtainComponentEnum)) {
      if (value === component) {
        return key;
      }
    }
    return "";
  }

  getComponentByStorageKey(key: string): CurtainComponentEnum {
    return CurtainComponentEnum[key as keyof typeof CurtainComponentEnum];
  }

  getMaterial(component: CurtainComponentEnum): unknown {
    if (component === CurtainComponentEnum.RailTips) {
      component = CurtainComponentEnum.Rail;
    }
    return super.getMaterial(component);
  }

  setMaterial(component: CurtainComponentEnum, material: unknown): void {
    if (component === CurtainComponentEnum.RailTips) {
      component = CurtainComponentEnum.Rail;
    }
    super.setMaterial(component, material);
  }

  getMaterialList(): Array<[CurtainComponentEnum, unknown]> {
    const materialList = super.getMaterialList();
    const railTipsMaterial = this.getMaterial(CurtainComponentEnum.RailTips);
    
    if (railTipsMaterial) {
      materialList.push([CurtainComponentEnum.RailTips, railTipsMaterial]);
    }
    
    return materialList;
  }

  getIO(): Curtain_IO {
    return Curtain_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgCurtain, Curtain);

export { Curtain, CurtainComponentEnum, Curtain_IO };