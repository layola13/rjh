import { Logger } from './Logger';
import { State } from './State';

interface ConstraintInputs {
  [key: string]: State;
}

interface ConstraintOutputs {
  [key: string]: State;
}

interface ConstraintDumpData {
  l: string;
  id: string;
  localId: string;
  type: string;
  inputs: string[];
  outputs: string[];
}

interface DumpOptions {
  constraintsData?: Map<string, ConstraintDumpData>;
}

interface IDGenerator {
  generate(id: string): string;
  getNewId?(oldId: string): string;
}

interface LoadOptions {
  constraintIdGenerator?: IDGenerator;
  constraints?: Record<string, Constraint>;
  constraintsData?: Map<string, ConstraintDumpData>;
  duringRestore?: boolean;
  getConstraintById?(id: string): Constraint | undefined;
}

type ConstraintConstructor = new (id?: string) => Constraint;

export class Constraint {
  static readonly _constructorByClassName: Map<string, ConstraintConstructor> = new Map();

  readonly Class: string = HSConstants.ModelClass.Constraint;
  
  private _tag?: string;
  
  id: string;
  localId: string;
  type: string;
  inputs: ConstraintInputs;
  outputs: ConstraintOutputs;

  constructor(idPrefix: string = "") {
    this.id = HSCore.Util.IDGenerator.generate(
      idPrefix,
      HSCore.Util.IDGeneratorType.Constraint
    );
    this.localId = "";
    this.type = "default";
    this.inputs = {};
    this.outputs = {};

    HSCore.Doc.getDocManager().activeDocument.constraintManager.add(this);
  }

  init(param1: unknown, param2: unknown): void {
    // Implementation placeholder
  }

  get ID(): string {
    return this.id;
  }

  getClassName(): string {
    const classPath = this.Class || this.constructor.prototype.Class;
    return classPath 
      ? classPath.slice(classPath.lastIndexOf(".") + 1) 
      : this.constructor.name;
  }

  get tag(): string {
    if (!this._tag) {
      this._tag = `${this.getClassName()}-${this.id}`;
    }
    return this._tag;
  }

  verify(): boolean {
    return !!this.id && !!this.localId;
  }

  verifyBeforeDump(): boolean {
    return !!this.id && !!this.localId;
  }

  dump(options: DumpOptions = {}): ConstraintDumpData[] {
    if (!this.verifyBeforeDump()) {
      log.error(
        `${this.Class} ${this.id} verify failed!`,
        "HSCore.Dump.Error"
      );
    }

    const dumpData: ConstraintDumpData = {
      l: HSConstants.ClassLNameToSName.get(this.Class),
      id: this.id,
      localId: this.localId,
      type: this.type,
      inputs: Object.keys(this.inputs),
      outputs: Object.keys(this.outputs)
    };

    if (options.constraintsData) {
      options.constraintsData.set(dumpData.id, dumpData);
    }

    return [dumpData];
  }

  load(data: ConstraintDumpData, options: LoadOptions = {}): void {
    this.localId = data.localId;
    this.type = data.type;

    data.inputs.forEach((inputId: string) => {
      const state = State.loadFromDumpById(inputId, options, options.duringRestore);
      if (state) {
        this.inputs[state.id] = state;
      } else {
        Logger.console.error(`Invalid input state in ${this.tag}`);
      }
    });

    data.outputs.forEach((outputId: string) => {
      const state = State.loadFromDumpById(outputId, options, options.duringRestore);
      if (state) {
        this.outputs[state.id] = state;
      } else {
        Logger.console.error(`Invalid output state in ${this.tag}`);
      }
    });
  }

  compute(): void {
    // Implementation placeholder
  }

  destroy(): void {
    // Implementation placeholder
  }

  refresh(param: unknown): void {
    // Implementation placeholder
  }

  static registerClass(className: string, constructor: ConstraintConstructor): void {
    constructor.prototype.Class = className;
    Constraint._constructorByClassName.set(className, constructor);
  }

  static getClass(classNameOrShortName: string): ConstraintConstructor | undefined {
    let className = HSConstants.ClassSNameToLName.get(classNameOrShortName);
    if (!className) {
      className = classNameOrShortName;
    }
    return Constraint._constructorByClassName.get(className);
  }

  static createFromDump(data: ConstraintDumpData, options: LoadOptions = {}): Constraint | undefined {
    if (!data) {
      return undefined;
    }

    let constraintId = data.id;
    if (options.constraintIdGenerator) {
      constraintId = options.constraintIdGenerator.generate(constraintId);
    }

    if (constraintId && options.constraints) {
      const existingConstraint = options.constraints[constraintId];
      if (existingConstraint) {
        return existingConstraint;
      }
    }

    const ConstraintClass = Constraint.getClass(data.l || data.Class);
    if (!ConstraintClass) {
      return undefined;
    }

    const constraint = new ConstraintClass(constraintId);
    
    if (options.constraints) {
      options.constraints[constraint.id] = constraint;
    }

    constraint.load(data, options);
    return constraint;
  }

  static dumpConstraint(constraint: Constraint, options: DumpOptions = {}): ConstraintDumpData[] {
    const cachedData = options.constraintsData?.get(constraint.id);
    return cachedData ? [cachedData] : constraint.dump(options);
  }

  static loadFromDump(data: ConstraintDumpData, options: LoadOptions = {}): Constraint | undefined {
    if (!data) {
      return undefined;
    }
    return Constraint.getExistingConstraint(data.id, options) || Constraint.createFromDump(data, options);
  }

  static loadFromDumpById(id: string, options: LoadOptions = {}): Constraint | undefined {
    if (!id) {
      return undefined;
    }

    const existingConstraint = Constraint.getExistingConstraint(id, options);
    if (existingConstraint) {
      return existingConstraint;
    }

    if (options.constraintsData) {
      const data = options.constraintsData.get(id);
      return data ? Constraint.createFromDump(data, options) : undefined;
    }

    return undefined;
  }

  static getExistingConstraint(id: string, options: LoadOptions = {}): Constraint | undefined {
    if (!id) {
      return undefined;
    }

    let resolvedId = id;
    if (options.constraintIdGenerator?.getNewId) {
      resolvedId = options.constraintIdGenerator.getNewId(id);
    }

    if (!resolvedId) {
      return undefined;
    }

    if (options.getConstraintById) {
      return options.getConstraintById(resolvedId);
    }

    if (options.constraints) {
      return options.constraints[resolvedId];
    }

    return undefined;
  }
}

Constraint.registerClass("HSCore.Constraint", Constraint);