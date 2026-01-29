import { Entity, Entity_IO } from './Entity';
import { Signal } from './Signal';
import { defineFields } from './defineFields';

export const PModelTypes = {
  eContent: "content",
  eExtrude: "extrude",
  eMolding: "molding",
  eBox: "box",
  ePAssembly: "passembly",
  ePSlidingDoor: "pslidingdoor",
  ePSlidingDoorLeaf: "pslidingdoorleaf",
  ePSegmentLoft: "psegmentloft"
} as const;

Object.freeze(PModelTypes);

export const PModelValueProperties = {
  x: "x",
  y: "y",
  z: "z",
  XLength: "w",
  YLength: "d",
  ZLength: "h"
} as const;

Object.freeze(PModelValueProperties);

interface StateField {
  id: string;
  verify(): boolean;
  bindObjectFieldChanged(obj: unknown, field: string): void;
}

interface Material extends Entity {
  dump(context: unknown, deep: boolean, options: Record<string, unknown>): unknown[];
}

interface DumpContext {
  seekId?: string;
  localId?: string;
  x?: string;
  y?: string;
  z?: string;
  XRotation?: string;
  YRotation?: string;
  ZRotation?: string;
  XAnimationCenter?: string;
  YAnimationCenter?: string;
  ZAnimationCenter?: string;
  Axis?: string;
  AnimationRotation?: string;
  AnimationOffset?: string;
  host?: string;
  material?: string;
}

interface LoadContext {
  states: Record<string, StateField>;
}

interface DumpResult {
  seekId?: string;
  localId?: string;
  x?: string;
  y?: string;
  z?: string;
  XRotation?: string;
  YRotation?: string;
  ZRotation?: string;
  XAnimationCenter?: string;
  YAnimationCenter?: string;
  ZAnimationCenter?: string;
  Axis?: string;
  AnimationRotation?: string;
  AnimationOffset?: string;
  host?: string;
  material?: string;
}

export class PModel_IO extends Entity_IO {
  private static _instance?: PModel_IO;

  static instance(): PModel_IO {
    if (!PModel_IO._instance) {
      PModel_IO._instance = new PModel_IO();
    }
    return PModel_IO._instance;
  }

  dump(
    entity: PModel,
    callback?: (result: unknown[], entity: PModel) => void,
    deep: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    let result = super.dump(entity, undefined, deep, options);
    const dumpData = result[0] as DumpResult;

    if (entity.seekId) {
      dumpData.seekId = entity.seekId;
    }

    if (entity.localId) {
      dumpData.localId = entity.localId;
    }

    dumpData.x = entity.__x.id;
    dumpData.y = entity.__y.id;
    dumpData.z = entity.__z.id;
    dumpData.XRotation = entity.__XRotation.id;
    dumpData.YRotation = entity.__YRotation.id;
    dumpData.ZRotation = entity.__ZRotation.id;
    dumpData.XAnimationCenter = entity.__XAnimationCenter.id;
    dumpData.YAnimationCenter = entity.__YAnimationCenter.id;
    dumpData.ZAnimationCenter = entity.__ZAnimationCenter.id;
    dumpData.Axis = entity.__Axis.id;
    dumpData.AnimationRotation = entity.__AnimationRotation.id;
    dumpData.AnimationOffset = entity.__AnimationOffset.id;

    if (entity._host) {
      dumpData.host = entity._host.id;
    }

    if (entity.material) {
      dumpData.material = entity.material.id;
      if (deep || this.mustDeepClone(dumpData.material)) {
        result = result.concat(entity.material.dump(callback, deep, options));
      }
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: PModel, dumpData: DumpContext, context: LoadContext): void {
    super.load(entity, dumpData, context);

    entity.seekId = dumpData.seekId ?? "";
    entity.localId = dumpData.localId ?? "";

    entity.__x = context.states[dumpData.x!];
    entity.__y = context.states[dumpData.y!];
    entity.__z = context.states[dumpData.z!];
    entity.__XRotation = context.states[dumpData.XRotation!];
    entity.__YRotation = context.states[dumpData.YRotation!];
    entity.__ZRotation = context.states[dumpData.ZRotation!];

    entity.__x.bindObjectFieldChanged(entity, "x");
    entity.__y.bindObjectFieldChanged(entity, "y");
    entity.__z.bindObjectFieldChanged(entity, "z");
    entity.__XRotation.bindObjectFieldChanged(entity, "XRotation");
    entity.__YRotation.bindObjectFieldChanged(entity, "YRotation");
    entity.__ZRotation.bindObjectFieldChanged(entity, "ZRotation");

    entity.__XAnimationCenter = context.states[dumpData.XAnimationCenter!];
    entity.__YAnimationCenter = context.states[dumpData.YAnimationCenter!];
    entity.__ZAnimationCenter = context.states[dumpData.ZAnimationCenter!];
    entity.__Axis = context.states[dumpData.Axis!];
    entity.__AnimationRotation = context.states[dumpData.AnimationRotation!];
    entity.__AnimationOffset = context.states[dumpData.AnimationOffset!];

    if (dumpData.material) {
      const material = Entity.loadFromDumpById(dumpData.material, context) as Material;
      entity.__material = material;
      (globalThis as any).HSCore.Util.PaintMaterial.migrateMaterialColor(context, entity.__material);
    }

    const hostId = dumpData.host;
    if (hostId) {
      const host = Entity.loadFromDumpById(hostId, context) as PModel;
      entity.assignTo(host);
    }
  }

  private mustDeepClone(materialId: string): boolean {
    return false;
  }
}

export class PModel extends Entity {
  _host: PModel | null = null;
  type?: string;
  private _seekId: string = "";
  localId: string = "";
  
  __x!: StateField;
  __y!: StateField;
  __z!: StateField;
  __XRotation!: StateField;
  __YRotation!: StateField;
  __ZRotation!: StateField;
  __XAnimationCenter!: StateField;
  __YAnimationCenter!: StateField;
  __ZAnimationCenter!: StateField;
  __Axis!: StateField;
  __AnimationRotation!: StateField;
  __AnimationOffset!: StateField;
  __material?: Material;

  material?: Material;
  signalPositionChanged!: Signal<void>;
  signalMaterialChanged!: Signal<void>;
  signalGeometryChanged!: Signal<void>;
  outline: unknown[] = [];

  x!: number;
  y!: number;
  z!: number;
  XRotation!: number;
  YRotation!: number;
  ZRotation!: number;

  constructor(id: string = "", parent?: Entity) {
    super(id, parent);

    this.defineStateField("x", 0);
    this.defineStateField("y", 0);
    this.defineStateField("z", 0);
    this.defineStateField("XRotation", 0);
    this.defineStateField("YRotation", 0);
    this.defineStateField("ZRotation", 0);
    this.defineStateField("XAnimationCenter", 0);
    this.defineStateField("YAnimationCenter", 0);
    this.defineStateField("ZAnimationCenter", 0);
    this.defineStateField("Axis", 0);
    this.defineStateField("AnimationRotation", 0);
    this.defineStateField("AnimationOffset", 0);
    this.defineField("material", undefined);

    this.signalPositionChanged = new Signal(this);
    this.signalMaterialChanged = new Signal(this);
    this.signalGeometryChanged = new Signal(this);

    this.defineValueProperties();
  }

  get seekId(): string {
    return this._seekId;
  }

  set seekId(value: string) {
    this._seekId = value;
  }

  defineValueProperties(): void {
    const fieldDefinitions: Record<string, unknown> = {};
    
    Object.keys(PModelValueProperties).forEach((propertyKey) => {
      const valuePropertyName = `${propertyKey}Value`;
      fieldDefinitions[valuePropertyName] = {
        initialValue: undefined,
        get: () => (this as any)[propertyKey]
      };
    });

    defineFields(this, fieldDefinitions);
  }

  destroy(): void {
    if (!this._disposed) {
      this.signalPositionChanged.dispose();
      this.signalPositionChanged = undefined!;
      this.signalMaterialChanged.dispose();
      this.signalMaterialChanged = undefined!;
      this.signalGeometryChanged.dispose();
      this.signalGeometryChanged = undefined!;
      super.destroy();
    }
  }

  assignTo(host: PModel): void {
    this._host = host;
  }

  setMaterial(materialOrId: string | Material, material?: Material): void {
    let targetMaterial: Material | undefined = material;
    
    if (typeof materialOrId !== "string") {
      targetMaterial = materialOrId;
    }

    if (this.material !== targetMaterial) {
      this.material = targetMaterial;
      this.dirtyMaterial();
    }
  }

  getMaterial(): Material | undefined {
    return this.material;
  }

  verify(): boolean {
    if (!this.localId) {
      return false;
    }

    if (!this.__x?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid x.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__y?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid y.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__z?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid z.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__XRotation?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid XRotation.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__YRotation?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid YRotation.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__ZRotation?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid ZRotation.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__XAnimationCenter?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid XAnimation.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__YAnimationCenter?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid YAnimation.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__ZAnimationCenter?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid ZAnimation.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__Axis?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid Axis.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__AnimationRotation?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid AnimationRotation.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (!this.__AnimationOffset?.verify()) {
      (globalThis as any).log.error(`${this.tag}: invalid AnimationOffset.`, "HSCore.Verify.Error", true);
      return false;
    }

    return true;
  }

  getIO(): PModel_IO {
    return PModel_IO.instance();
  }

  refreshBoundInternal(): void {
    // Implementation placeholder
  }

  getHost(): PModel | null {
    return this._host;
  }

  setHost(host: PModel): void {
    this._host = host;
  }

  update(): void {
    // Implementation placeholder
  }

  forEachState(): void {
    // Implementation placeholder
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    this.dirty();

    if (fieldName === "x" || fieldName === "y" || fieldName === "z" ||
        fieldName === "XRotation" || fieldName === "YRotation" || fieldName === "ZRotation") {
      this.signalPositionChanged.dispatch();
    } else if (fieldName === "material") {
      this.signalMaterialChanged.dispatch();
    }

    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  flipSelf(): void {
    this.dirty();
    this.signalMaterialChanged.dispatch();
    this.signalPositionChanged.dispatch();
  }

  forEachMaterial(callback: (material: Material) => void, context?: unknown): void {
    if (this.material) {
      callback.call(context, this.material);
    }

    this.forEachChild((child: PModel) => {
      child.forEachMaterial(callback, context);
    });
  }

  replaceParent(parent: Entity): Entity | undefined {
    const isContentHasPAssemblyParent = (globalThis as any).HSCore.Util.PAssemblyBody.isContentHasPAssemblyParent(this);
    
    if (!isContentHasPAssemblyParent) {
      return super.replaceParent(parent);
    }

    return undefined;
  }

  canTransactField(): boolean {
    return false;
  }

  protected defineStateField(name: string, initialValue: number): void {
    // Placeholder for defineStateField implementation
  }

  protected defineField(name: string, initialValue: unknown): void {
    // Placeholder for defineField implementation
  }

  protected dirty(): void {
    // Placeholder for dirty implementation
  }

  protected dirtyMaterial(): void {
    // Placeholder for dirtyMaterial implementation
  }

  protected forEachChild(callback: (child: PModel) => void): void {
    // Placeholder for forEachChild implementation
  }
}

Entity.registerClass((globalThis as any).HSConstants.ModelClass.NgPModel, PModel);