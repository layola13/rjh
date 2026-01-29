import { PModel_IO, PModel } from './PModel';
import { Entity } from './Entity';
import { Material } from './Material';
import { State } from './State';

interface DumpOptions {
  [key: string]: unknown;
}

interface SerializedPBox {
  XLength: string;
  YLength: string;
  ZLength: string;
  [key: string]: unknown;
}

interface LoadContext {
  states: Record<string, State<number>>;
}

interface PBoxParameters {
  x?: number | null;
  y?: number | null;
  z?: number | null;
  XLength?: number | null;
  YLength?: number | null;
  ZLength?: number | null;
}

interface CreateParams {
  localId: string;
  material: unknown;
  parameters?: PBoxParameters;
}

class PBox_IO extends PModel_IO {
  private static _instance: PBox_IO;

  static instance(): PBox_IO {
    if (!PBox_IO._instance) {
      PBox_IO._instance = new PBox_IO();
    }
    return PBox_IO._instance;
  }

  dump(
    model: PBox,
    callback?: (result: [SerializedPBox, unknown], model: PBox) => void,
    includeState: boolean = true,
    options: DumpOptions = {}
  ): [SerializedPBox, unknown] {
    const result = super.dump(model, undefined, includeState, options);
    const serialized = result[0] as SerializedPBox;
    
    serialized.XLength = model.__XLength.id;
    serialized.YLength = model.__YLength.id;
    serialized.ZLength = model.__ZLength.id;
    
    if (callback) {
      callback(result as [SerializedPBox, unknown], model);
    }
    
    return result as [SerializedPBox, unknown];
  }

  load(model: PBox, data: SerializedPBox, context: LoadContext): void {
    super.load(model, data, context);
    
    if (context.states[data.XLength]) {
      model.__XLength = context.states[data.XLength];
    }
    if (context.states[data.YLength]) {
      model.__YLength = context.states[data.YLength];
    }
    if (context.states[data.ZLength]) {
      model.__ZLength = context.states[data.ZLength];
    }
    
    model.__XLength.bindObjectFieldChanged(model, 'XLength');
    model.__YLength.bindObjectFieldChanged(model, 'YLength');
    model.__ZLength.bindObjectFieldChanged(model, 'ZLength');
  }
}

class PBox extends PModel {
  __XLength!: State<number>;
  __YLength!: State<number>;
  __ZLength!: State<number>;
  __x!: State<number>;
  __y!: State<number>;
  __z!: State<number>;
  localId!: string;
  material!: Material;
  tag!: string;

  constructor(name: string = '', parent?: unknown) {
    super(name, parent);
    
    this.defineStateField('XLength', 0);
    this.defineStateField('YLength', 0);
    this.defineStateField('ZLength', 0);
  }

  static create(params: CreateParams): PBox {
    const box = new PBox();
    box.localId = params.localId;
    box.material = Material.create(params.material);
    
    const parameters = params.parameters;
    if (parameters) {
      box.__x.__value = parameters.x ?? 0;
      box.__y.__value = parameters.y ?? 0;
      box.__z.__value = parameters.z ?? 0;
      box.__XLength.__value = parameters.XLength ?? 0;
      box.__YLength.__value = parameters.YLength ?? 0;
      box.__ZLength.__value = parameters.ZLength ?? 0;
    }
    
    return box;
  }

  forEachState(callback: (state: State<unknown>) => void): void {
    Object.values(this).forEach((value) => {
      if (value instanceof State) {
        callback(value);
      }
    });
  }

  clone(): PBox {
    const context = HSCore.Doc.getDocManager().activeDocument.createContext();
    const serialized = this.dump()[0];
    const cloned = new PBox();
    cloned.load(serialized, context);
    return cloned;
  }

  verify(): boolean {
    if (!super.verify()) {
      return false;
    }
    
    if (!this.__XLength?.verify()) {
      log.error(`${this.tag}: invalid XLength.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    if (!this.__YLength?.verify()) {
      log.error(`${this.tag}: invalid YLength.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    if (!this.__ZLength?.verify()) {
      log.error(`${this.tag}: invalid ZLength.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    return true;
  }

  getIO(): PBox_IO {
    return PBox_IO.instance();
  }

  isContentInRoom(room: unknown, strict: boolean = false): boolean {
    return this.getUniqueParent().isContentInRoom(room, strict);
  }

  isContentInLoop(loop: unknown, strict: boolean = false): boolean {
    return this.getUniqueParent().isContentInLoop(loop, strict);
  }

  refreshBoundInternal(): void {
    // Implementation intentionally empty
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (fieldName === 'XLength' || fieldName === 'YLength' || fieldName === 'ZLength') {
      this.dirty();
      this.signalGeometryChanged.dispatch();
    }
    
    super.onFieldChanged(fieldName, oldValue, newValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPBox, PBox);

export { PBox, PBox_IO };