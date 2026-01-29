import { Entity_IO, Entity } from './Entity';
import { EntityField } from './decorators';
import { Signal } from './Signal';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpCallback {
  (dump: unknown[], entity: Entity): void;
}

interface FreePatternMap {
  [id: string]: HSCore.Model.Pattern;
}

export class Grid_IO extends Entity_IO {
  private static _Grid_IO_instance: Grid_IO;

  static instance(): Grid_IO {
    if (!Grid_IO._Grid_IO_instance) {
      Grid_IO._Grid_IO_instance = new Grid_IO();
    }
    return Grid_IO._Grid_IO_instance;
  }

  dump(
    entity: Grid,
    callback?: DumpCallback,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    let dumpResult = super.dump(entity, undefined, includeChildren, options);
    const mainDump = dumpResult[0] as Record<string, unknown>;
    const freePatternValues = Object.values(entity.freePatterns);

    if (freePatternValues && freePatternValues.length > 0) {
      mainDump.freePatterns = freePatternValues.map((pattern) => pattern.id);
      freePatternValues.forEach((pattern) => {
        dumpResult = dumpResult.concat(pattern.dump(callback, includeChildren, options));
      });
    }

    if (callback) {
      callback(dumpResult, entity);
    }

    return dumpResult;
  }

  load(entity: Grid, data: Record<string, unknown>, options: LoadOptions = {}): void {
    super.load(entity, data, options);

    if (data.freePatterns && Array.isArray(data.freePatterns)) {
      data.freePatterns.forEach((patternId: string) => {
        entity.freePatterns[patternId] = Entity.loadFromDumpById(patternId, options);
      });
    }

    entity._freePatternBlocks = Object.values(entity.children).filter(
      (child): child is HSCore.Model.FreePatternBlock =>
        child instanceof HSCore.Model.FreePatternBlock
    );
  }
}

export class Grid extends Entity {
  private _freePatterns: FreePatternMap = {};
  public _freePatternBlocks: HSCore.Model.FreePatternBlock[] = [];
  public signalFreePatternBlockAdded: Signal<this>;
  public signalFreePatternBlockRemoved: Signal<this>;

  @EntityField({
    get(this: Grid): HSCore.Model.FreePatternBlock[] {
      return this._freePatternBlocks.slice();
    },
    partialSet(this: Grid, value: HSCore.Model.FreePatternBlock[]): void {
      this._setFreePatternBlocks(value);
    }
  })
  freePatternBlocks: HSCore.Model.FreePatternBlock[];

  constructor(id: string = "", parent?: Entity) {
    super(id, parent);
    this._freePatterns = {};
    this._freePatternBlocks = [];
    this.signalFreePatternBlockAdded = new Signal(this);
    this.signalFreePatternBlockRemoved = new Signal(this);
    this.freePatternBlocks = [];
  }

  private _setFreePatternBlocks(blocks: HSCore.Model.FreePatternBlock[]): void {
    this.replaceChildren(this._freePatternBlocks, blocks);
    this._freePatternBlocks = blocks.slice();
  }

  get freePatterns(): FreePatternMap {
    this._freePatterns = {};
    this.freePatternBlocks.forEach((block) => {
      this._freePatterns[block.pattern.id] = block.pattern;
    });
    return this._freePatterns;
  }

  addFreePatternBlock(block: HSCore.Model.FreePatternBlock): void {
    this.freePatternBlocks = this.freePatternBlocks.concat([block]);
  }

  removeFreePatternBlock(block: HSCore.Model.FreePatternBlock): void {
    const index = this.freePatternBlocks.findIndex((b) => b.id === block.id);
    if (index !== -1) {
      const updatedBlocks = this.freePatternBlocks.slice();
      updatedBlocks.splice(index, 1);
      this.freePatternBlocks = updatedBlocks;
    }
  }

  get gussetBlocks(): HSCore.Model.GussetBlock[] {
    return this._freePatternBlocks.filter(
      (block): block is HSCore.Model.GussetBlock =>
        block instanceof HSCore.Model.GussetBlock
    );
  }

  hasGussetBlocks(): boolean {
    return this._freePatternBlocks.findIndex(
      (block) => block instanceof HSCore.Model.GussetBlock
    ) !== -1;
  }

  getIO(): Grid_IO {
    return Grid_IO.instance();
  }

  isValid(): boolean {
    return true;
  }

  checkClonedResult(clonedEntity: Grid): void {
    // Implementation placeholder
  }
}