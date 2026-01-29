import { MixBlock_IO, MixBlock } from './MixBlock';
import { Entity } from './Entity';
import { PatternGrid } from './PatternGrid';
import { EntityEventType } from './EntityEventType';
import { clonePoint2ds } from './GeometryUtils';
import { EntityUtil } from './EntityUtil';
import { EntityField } from './EntityDecorators';

interface Point2D {
  x: number;
  y: number;
}

interface DumpContext {
  materialsData?: Map<string, unknown>;
  productsMap?: Map<string, unknown>;
  ignorePattern?: boolean;
}

interface LoadContext {
  grid?: string;
  pattern?: unknown;
  materialsData?: Map<string, unknown>;
  productsMap?: Map<string, unknown>;
  entities?: Record<string, unknown>;
  materials?: Map<string, unknown>;
  states?: Record<string, unknown>;
  constraints?: Record<string, unknown>;
  idGenerator?: unknown;
  options?: {
    ignorePattern?: boolean;
  };
}

interface DumpData {
  id: string;
  grid?: string;
  [key: string]: unknown;
}

interface ClonedDumpData {
  dumps: DumpData[];
  context: {
    data: Record<string, DumpData>;
    materialsData: Map<string, unknown>;
    states: Record<string, unknown>;
    constraints: Record<string, unknown>;
    entities: Record<string, unknown>;
    materials: Map<string, unknown>;
    productsMap: Map<string, unknown>;
    idGenerator: unknown;
    options: {
      ignorePattern: boolean;
    };
  };
}

interface Pattern {
  id: string;
  clone(): Pattern;
}

interface Grid extends Entity {
  _flag?: unknown;
  freePatterns?: Record<string, Pattern>;
}

class BoundaryBlock_IO extends MixBlock_IO {
  private static _BoundaryBlock_IO_Instance?: BoundaryBlock_IO;

  static instance(): BoundaryBlock_IO {
    if (!BoundaryBlock_IO._BoundaryBlock_IO_Instance) {
      BoundaryBlock_IO._BoundaryBlock_IO_Instance = new BoundaryBlock_IO();
    }
    return BoundaryBlock_IO._BoundaryBlock_IO_Instance;
  }

  dump(
    entity: BoundaryBlock,
    callback?: (dumpData: DumpData[], entity: BoundaryBlock) => void,
    includeChildren: boolean = true,
    context: DumpContext = {}
  ): DumpData[] {
    const dumpData = super.dump(entity, undefined, includeChildren, context);
    dumpData[0].grid = entity.grid ? entity.grid.id : undefined;
    
    if (callback) {
      callback(dumpData, entity);
    }
    
    return dumpData;
  }

  load(entity: BoundaryBlock, data: DumpData, context: LoadContext = {}): void {
    super.load(entity, data, context);
    
    if (!data.grid && data.pattern) {
      PatternGrid.migratePattern(entity, true);
    } else {
      entity.grid = Entity.loadFromDumpById(data.grid, context) as Grid | undefined;
      if (entity.grid && !(entity.grid instanceof PatternGrid)) {
        entity.pattern = undefined;
      }
    }
  }
}

class BoundaryBlock extends MixBlock {
  private __grid?: Grid;
  
  @EntityField({
    partialSet(this: BoundaryBlock, value: Grid | undefined): void {
      this._setGrid(value);
    }
  })
  grid?: Grid;
  
  pattern?: Pattern;
  points: Point2D[] = [];
  holes: Point2D[][] = [];
  originPoints: Point2D[] = [];

  constructor(tag: string = "", parent?: unknown) {
    super(tag, parent);
  }

  getIO(): BoundaryBlock_IO {
    return BoundaryBlock_IO.instance();
  }

  verify(): boolean {
    const childrenArray = Object.values(this.children);
    
    if (this.grid && !childrenArray.includes(this.grid)) {
      log.error(
        `${this.tag}: grid is not a child.`,
        'HSCore.Verify.Error',
        true
      );
      return false;
    }
    
    return super.verify();
  }

  getClonedDumpData(): ClonedDumpData {
    const productsMap = new Map<string, unknown>();
    const materialsData = new Map<string, unknown>();
    
    const dumps = this.dump(undefined, true, {
      materialsData,
      productsMap
    });
    
    const idMap = new Map<string, string>();
    const clonedEntities: Record<string, Pattern> = {};
    
    let patterns: Pattern[] = [];
    
    if (this.pattern) {
      patterns = [this.pattern];
    }
    
    if (this.grid?.freePatterns && Object.keys(this.grid.freePatterns).length > 0) {
      patterns = patterns.concat(Object.values(this.grid.freePatterns));
    }
    
    patterns.forEach(pattern => {
      const clonedPattern = pattern.clone();
      idMap.set(pattern.id, clonedPattern.id);
      clonedEntities[clonedPattern.id] = clonedPattern;
    });
    
    const context = {
      data: {} as Record<string, DumpData>,
      materialsData,
      states: {},
      constraints: {},
      entities: clonedEntities,
      materials: new Map<string, unknown>(),
      productsMap,
      idGenerator: EntityUtil.createIDGeneratorForClone(
        idMap,
        HSCore.Util.IDGeneratorType.Entity
      ),
      options: {
        ignorePattern: true
      }
    };
    
    dumps.forEach(dump => {
      context.data[dump.id] = dump;
    });
    
    return {
      dumps,
      context
    };
  }

  clone(): BoundaryBlock {
    const cloned = new BoundaryBlock();
    const clonedData = this.getClonedDumpData();
    cloned.load(clonedData.dumps[0], clonedData.context);
    return cloned;
  }

  partOfGrid(): boolean {
    return this.parent instanceof HSCore.Model.MixGrid;
  }

  static create(points: Point2D[], holes: Point2D[][]): BoundaryBlock {
    const clonedPoints = clonePoint2ds(points);
    const clonedHoles = holes.map(clonePoint2ds);
    
    const block = new BoundaryBlock();
    block.points = clonedPoints;
    block.holes = clonedHoles;
    block.originPoints = clonePoint2ds(points);
    
    return block;
  }

  private _setGrid(grid: Grid | undefined): void {
    const oldGrid = this.__grid;
    
    if (oldGrid) {
      this.removeChild(oldGrid);
    }
    
    this.__grid = grid;
    
    if (grid) {
      this.addChild(grid);
      grid._flag = this._flag;
    }
  }

  containsParamTemplate(): boolean {
    return !!this.pattern;
  }

  containsGrid(): boolean {
    return !!this.grid;
  }

  onPatternDirty(event: { data: { type: EntityEventType } }): void {
    super.onPatternDirty(event);
    
    if (
      this.grid &&
      (event.data.type === EntityEventType.Material ||
        event.data.type === EntityEventType.Geometry) &&
      this.grid instanceof HSCore.Model.PatternGrid
    ) {
      this.grid.dirtyBlocks();
    }
  }

  onPatternReset(event: unknown): void {
    if (
      this.pattern &&
      this.grid &&
      this.grid instanceof HSCore.Model.PatternGrid
    ) {
      this.grid.onPatternReset(event);
    }
  }

  onPatternResetOverride(event: unknown): void {
    if (
      this.pattern &&
      this.grid &&
      this.grid instanceof HSCore.Model.PatternGrid
    ) {
      this.grid.onPatternResetOverride(event);
    }
  }

  protected _onPatternChanged(): void {
    if (this.pattern) {
      if (this.grid) {
        if (this.grid instanceof HSCore.Model.PatternGrid) {
          this.grid.dirtyBlocks();
        }
      } else {
        PatternGrid.migratePattern(this, true);
      }
    }
  }

  getInnerBoundaryPoints(): Point2D[] {
    return this.points;
  }
}

Entity.registerClass(HSConstants.ModelClass.BoundaryBlock, BoundaryBlock);

export { BoundaryBlock_IO, BoundaryBlock };