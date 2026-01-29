import { MixGrid_IO, MixGrid } from './MixGrid';
import { Entity } from './Entity';
import { EntityEventType } from './EntityEventType';
import { EntityField } from './EntityField';
import { PaintsUtil } from './PaintsUtil';
import { CommonUtil } from './CommonUtil';
import { Logger } from './Logger';

interface Point {
  x: number;
  y: number;
}

interface GridPavingOption {
  point: Point;
  sliderOffsetX: number;
  sliderOffsetY: number;
  rotation: number;
}

interface FullPavingOption {
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface SerializedPatternGrid {
  fullPavingOption?: FullPavingOption | null;
  [key: string]: unknown;
}

interface PatternBlock {
  keyInString: string;
  key: unknown;
  localId: string;
  pavingOption: unknown;
  material: unknown;
  dirtyMaterial(): void;
  refreshMaterial(): Promise<void>;
}

interface FreePatternBlock extends PatternBlock {}

interface Pattern {
  getChildByLocalId(localId: string): { material: unknown } | null;
}

interface Polygon {
  pattern?: Pattern;
  pavingOption: {
    point: Point;
    sliderOffsetX: number;
    sliderOffsetY: number;
    rotation: number;
  };
  grid: PatternGrid;
  getDiscretePoints(): Point[];
  getInnerBoundaryPoints(): Point[];
  dirty(): void;
  getMixpaint(): Mixpaint | null;
}

interface BoundaryBlock extends Polygon {}

interface Mixpaint {
  onPatternChanged(pattern?: Pattern): void;
}

interface EntityEvent {
  type: string;
}

class PatternGrid_IO extends MixGrid_IO {
  private static _PatternGrid_IO_instance?: PatternGrid_IO;

  static instance(): PatternGrid_IO {
    if (!PatternGrid_IO._PatternGrid_IO_instance) {
      PatternGrid_IO._PatternGrid_IO_instance = new PatternGrid_IO();
    }
    return PatternGrid_IO._PatternGrid_IO_instance;
  }

  dump(
    entity: PatternGrid,
    callback?: (data: unknown[], entity: PatternGrid) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const data = super.dump(entity, undefined, includeChildren, options);
    const serialized = data[0] as SerializedPatternGrid;
    
    if (entity.fullPavingOption) {
      serialized.fullPavingOption = entity.fullPavingOption;
    }
    
    if (callback) {
      callback(data, entity);
    }
    
    return data;
  }

  load(entity: PatternGrid, serialized: SerializedPatternGrid, options: LoadOptions = {}): void {
    super.load(entity, serialized, options);
    entity.fullPavingOption = serialized.fullPavingOption || null;
  }
}

class PatternGrid extends MixGrid {
  private _fullPavingOption: FullPavingOption | null;
  private _patternBlocks: PatternBlock[];
  private _gridPavingOption: GridPavingOption;
  private _floorplan?: { loading: boolean };

  constructor(name: string = "", parent?: unknown) {
    super(name, parent);
    this._fullPavingOption = null;
    this._patternBlocks = [];
    this._gridPavingOption = {
      point: { x: 0, y: 0 },
      sliderOffsetX: 0,
      sliderOffsetY: 0,
      rotation: 0
    };
  }

  @EntityField({
    prefix: "_",
    postSet(entity: PatternGrid, value: GridPavingOption): void {
      Logger.console.assert(false, "该字段功能已废弃，不要再调用了");
    }
  })
  gridPavingOption!: GridPavingOption;

  @EntityField({ prefix: "_" })
  fullPavingOption!: FullPavingOption | null;

  @EntityField({ prefix: "_" })
  patternBlocks!: PatternBlock[];

  get blocks(): PatternBlock[] {
    return this._patternBlocks;
  }

  set blocks(value: PatternBlock[]) {
    this._patternBlocks = value;
  }

  get freePatternBlocks(): FreePatternBlock[] {
    return Object.values(this.children).filter(
      child => child instanceof HSCore.Model.FreePatternBlock
    ) as FreePatternBlock[];
  }

  static create(): PatternGrid {
    return new PatternGrid();
  }

  canEdit(): boolean {
    return true;
  }

  createPolygons(): void {
    const polygon = this.parent as Polygon;
    if (!polygon.pattern) return;

    const patternBlocks = PatternGrid.updatePatternPolygon(polygon, this);
    this.blocks = [];
    polygon.grid.addModifiedBlocks(patternBlocks);
    polygon.dirty();

    const mixpaint = polygon.getMixpaint();
    if (mixpaint) {
      mixpaint.onPatternChanged(polygon.pattern);
    }
  }

  addModifiedBlocks(blocks: PatternBlock[]): void {
    const newBlocks: PatternBlock[] = [];
    
    for (let i = 0; i < blocks.length; ++i) {
      const block = blocks[i];
      const existingBlock = this.getModifiedBlockByKey(block.keyInString);
      
      if (existingBlock) {
        existingBlock.pavingOption = block.pavingOption;
        existingBlock.material = block.material;
      } else {
        newBlocks.push(block);
      }
    }
    
    this.blocks = this.blocks.concat(newBlocks);
  }

  removeModifiedBlock(block: PatternBlock): void {
    if (!this.getModifiedBlock(block)) return;

    const index = this._findPolygonIndex(block);
    if (index !== -1) {
      const blocks = this.blocks;
      blocks.splice(index, 1);
      this.blocks = blocks;
    }
  }

  getModifiedBlock(block: PatternBlock): PatternBlock | null {
    const key = block.keyInString;
    return this.getModifiedBlockByKey(key);
  }

  getModifiedBlockByKey(key: string): PatternBlock | null {
    if (!key) return null;

    for (const childKey in this.children) {
      const child = this.children[childKey];
      if (
        child instanceof HSCore.Model.PatternBlock &&
        !(child instanceof HSCore.Model.FreePatternBlock) &&
        key === child.keyInString
      ) {
        return child as PatternBlock;
      }
    }
    
    return null;
  }

  clearModifiedBlocks(): void {
    this.blocks = [];
  }

  private _findPolygonIndex(block: PatternBlock): number {
    let foundIndex = -1;
    
    for (let i = 0; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const currentKey = CommonUtil.parseMassPropertyToKey(currentBlock.key, currentBlock.localId);
      const targetKey = CommonUtil.parseMassPropertyToKey(block.key, block.localId);
      
      if (currentKey === targetKey) {
        foundIndex = i;
        break;
      }
    }
    
    return foundIndex;
  }

  getIO(): PatternGrid_IO {
    return PatternGrid_IO.instance();
  }

  static getStartPointWithBoundary(polygon: Polygon): Point {
    const discretePoints = polygon.getDiscretePoints().map(point => ({
      x: point.x,
      y: point.y
    }));

    if (!discretePoints.length) {
      return { x: 0, y: 0 };
    }

    const innerBoundaryPoints = polygon.getInnerBoundaryPoints().map(point => ({
      x: point.x,
      y: point.y
    }));

    discretePoints.push(discretePoints[0]);
    const discreteBounds = HSCore.Util.Math.getBounds(discretePoints);

    innerBoundaryPoints.push(innerBoundaryPoints[0]);
    const innerBounds = HSCore.Util.Math.getBounds(innerBoundaryPoints);

    return {
      x: innerBounds[0] - discreteBounds[0],
      y: innerBounds[1] - discreteBounds[1]
    };
  }

  static migratePattern(polygon: Polygon, shouldMigrate: boolean = false): PatternGrid {
    const grid = PatternGrid.create();
    polygon.grid = grid;

    if (shouldMigrate) {
      const startPoint = PatternGrid.getStartPointWithBoundary(polygon);
      grid.gridPavingOption.point.x = 
        polygon.pavingOption.point.x - polygon.pavingOption.sliderOffsetX - startPoint.x;
      grid.gridPavingOption.point.y = 
        polygon.pavingOption.point.y - polygon.pavingOption.sliderOffsetY - startPoint.y;
      grid.gridPavingOption.sliderOffsetX = polygon.pavingOption.sliderOffsetX;
      grid.gridPavingOption.sliderOffsetY = polygon.pavingOption.sliderOffsetY;
      grid.gridPavingOption.rotation = polygon.pavingOption.rotation;
    }

    (polygon as any).__polygons = polygon;
    const patternPolygons = PaintsUtil.createPatternPolygons(polygon);
    polygon.grid.addModifiedBlocks(patternPolygons);

    const mixpaint = polygon.getMixpaint();
    if (mixpaint) {
      mixpaint.onPatternChanged(polygon.pattern);
    }

    return polygon.grid;
  }

  static createPattern(polygon: Polygon, grid: PatternGrid): PatternGrid {
    const patternPolygons = PaintsUtil.createPatternPolygons(polygon);
    (grid as any).polygons = patternPolygons;

    const mixpaint = polygon.getMixpaint();
    if (mixpaint) {
      mixpaint.onPatternChanged(polygon.pattern);
    }

    return grid;
  }

  static updatePatternPolygon(polygon: Polygon, grid: PatternGrid): PatternBlock[] {
    return PaintsUtil.createPatternPolygons(polygon, true);
  }

  updateBlockMaterialMap(map: unknown): void {
    // Implementation placeholder
  }

  getChildMaterials(): unknown[] {
    return [];
  }

  onDirty(event?: EntityEvent): void {
    super.onDirty(event);
    
    if (event?.type === EntityEventType.Material) {
      this.blocks.forEach(block => this.refreshMaterial(block));
    }
  }

  onPatternReset(pattern: Pattern): void {
    this.clearModifiedBlocks();
  }

  onPatternResetOverride(pattern: Pattern): void {
    this.clearModifiedBlocks();
  }

  dirtyBlocks(block?: PatternBlock): void {
    const blocksToProcess = block ? [block] : this.blocks;
    blocksToProcess.forEach(b => b.dirtyMaterial());
  }

  refreshMaterial(block?: PatternBlock): Promise<void> | undefined {
    const polygon = this.getUniqueParent() as Polygon | null;
    if (!polygon) return;
    if (!polygon.pattern) return;

    const blocksToRefresh = block 
      ? [block] 
      : Object.values(this.children) as PatternBlock[];

    const promises: Promise<void>[] = [];
    blocksToRefresh.forEach(b => {
      promises.push(b.refreshMaterial());
    });

    return Promise.all(promises).then(() => {});
  }

  recomputeTemplate(polygon: Polygon): PatternGrid {
    if (this._floorplan?.loading) return polygon.grid;

    this.blocks = [];
    const patternPolygons = HSCore.Paint.PaintsUtil.createPatternPolygons(polygon);
    this.addModifiedBlocks(patternPolygons);

    return polygon.grid;
  }

  recomputeFullPaving(): void {
    if (
      this._fullPavingOption &&
      this.freePatternBlocks &&
      this.freePatternBlocks.length > 1
    ) {
      PaintsUtil.recomputeFullPaving(this);
    }
  }

  update(): void {
    const polygon = this.parent as Polygon;
    
    if (
      polygon &&
      polygon.pattern &&
      !(polygon instanceof HSCore.Model.BoundaryBlock)
    ) {
      this.recomputeTemplate(polygon);
    }

    if (
      this._fullPavingOption &&
      this.freePatternBlocks &&
      this.freePatternBlocks.length > 1
    ) {
      HSCore.Paint.PaintsUtil.recomputeFullPaving(this);
    }
  }

  isValid(): boolean {
    return true;
  }

  getOriginalMaterialData(localId: string, pattern?: Pattern): unknown | null {
    Logger.console.assert(localId, "localId should not be empty");
    if (!localId) return null;

    let targetPattern = pattern;
    if (!targetPattern) {
      const polygon = this.parent as Polygon;
      Logger.console.assert(Boolean(polygon), "patterngirds parent should be polygon");
      if (!polygon) return null;

      targetPattern = polygon.pattern;
      Logger.console.assert(targetPattern, "polygon should have pattern");
      if (!targetPattern) return null;
    }

    const brick = targetPattern.getChildByLocalId(localId);
    Logger.console.assert(brick, "brick of pattern should not be null");

    return brick ? HSCore.Material.Util.getSafeMaterialData(brick.material) : null;
  }
}

Entity.registerClass(HSConstants.ModelClass.PatternGrid, PatternGrid);

export { PatternGrid_IO, PatternGrid };