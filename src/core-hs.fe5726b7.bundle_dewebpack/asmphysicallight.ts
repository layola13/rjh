import { Entity } from './Entity';
import { LightTypeEnum } from './LightTypeEnum';
import { PhysicalLight_IO, PhysicalLight } from './PhysicalLight';
import { LightSubGroup } from './LightSubGroup';
import { LightSubGroupCompareUtil } from './LightSubGroupCompareUtil';

interface LoadOptions {
  [key: string]: unknown;
}

interface RenderParameters {
  isAssembly?: boolean;
  [key: string]: unknown;
}

interface LightGroup {
  groupInteractionMode: boolean;
  memberProxy: {
    type: string;
  };
  memberPropertiesConfig: unknown;
  toFlatMemberList(): unknown[];
}

export class AsmPhysicalLight_IO extends PhysicalLight_IO {
  private static _instance?: AsmPhysicalLight_IO;

  static instance(): AsmPhysicalLight_IO {
    if (!this._instance) {
      this._instance = new AsmPhysicalLight_IO();
    }
    return this._instance;
  }

  load(entity: AsmPhysicalLight, data: unknown, options: LoadOptions = {}): void {
    super.load(entity, data, options);
    entity.type = LightTypeEnum.AsmPhysicalLight;
    entity.attachRealLight();
  }
}

export class AsmPhysicalLight extends PhysicalLight {
  type: LightTypeEnum;
  group?: LightGroup;

  constructor(name: string = "", parent: unknown = undefined) {
    super(name, parent);
    this.type = LightTypeEnum.AsmPhysicalLight;
  }

  static create(): AsmPhysicalLight {
    const light = new AsmPhysicalLight();
    light.reset();
    return light;
  }

  reset(): void {
    super.reset();
  }

  getIO(): AsmPhysicalLight_IO {
    return AsmPhysicalLight_IO.instance();
  }

  static createFromPhysicalLight(physicalLight: PhysicalLight): AsmPhysicalLight {
    const asmLight = AsmPhysicalLight.create();
    asmLight.load(physicalLight.dump()[0], {});
    return asmLight;
  }

  getRenderParameters(): RenderParameters {
    const parameters = super.getRenderParameters();
    parameters.isAssembly = true;
    return parameters;
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    super.onFieldChanged(fieldName, newValue, oldValue);
    
    if (fieldName !== 'group' && this.group && !this.group.groupInteractionMode) {
      const memberPropertiesConfig = LightSubGroup.createMemberPropertiesConfig(
        this.group.memberProxy.type
      );
      LightSubGroupCompareUtil.updateProperty(
        memberPropertiesConfig,
        this.group.toFlatMemberList()
      );
      this.group.memberPropertiesConfig = memberPropertiesConfig;
    }
  }

  attachRealLight(): void {
    // Implementation needed
  }

  load(data: unknown, options: LoadOptions): void {
    // Implementation needed
  }

  dump(): unknown[] {
    // Implementation needed
    return [];
  }
}

Entity.registerClass(HSConstants.ModelClass.NgAsmPhysicalLight, AsmPhysicalLight);