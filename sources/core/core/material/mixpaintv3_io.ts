import { Entity, Entity_IO } from './Entity';
import { MixHost } from './MixHost';
import { FaceGroup } from './FaceGroup';
import { MixSketch2d } from './MixSketch2d';
import { PavingOption } from './PavingOption';
import { Util } from '../utils/Util';
import { ServiceManager, ClipMode, MixPaveUpdateBkgApi, PatternApi, RegionApi } from './ServiceManager';
import { DataModelConvertor } from './DataModelConvertor';
import { Curve2d } from './Curve2d';
import { ToSketchConvertor } from './ToSketchConvertor';
import { Logger } from './Logger';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpedData {
  host?: unknown;
  faceGroup?: unknown;
  [key: string]: unknown;
}

interface MaterialData {
  seekId?: string;
  [key: string]: unknown;
}

interface Point2D {
  x: number;
  y: number;
}

interface PaintItem {
  id: string | undefined;
  path: unknown[];
  innerPath: unknown[];
  pavingOption: PavingOption;
  holes: unknown[];
  material: MaterialData;
  grid: unknown;
  pattern: unknown;
  leftTop: Point2D;
}

interface PaintData {
  backgroundMaterial: MaterialData | undefined;
  paints: PaintItem[];
  boundaries: unknown[];
  background: unknown[] | undefined;
}

interface UpdateRegionsResult {
  regions: unknown[];
  independentRegions: unknown[];
}

interface ClearOptions {
  seekId?: string;
}

export class MixPaintV3_IO extends Entity_IO {
  private static _MixPaintV3_IO_instance: MixPaintV3_IO | undefined;

  static instance(): MixPaintV3_IO {
    if (!MixPaintV3_IO._MixPaintV3_IO_instance) {
      MixPaintV3_IO._MixPaintV3_IO_instance = new MixPaintV3_IO();
    }
    return MixPaintV3_IO._MixPaintV3_IO_instance;
  }

  dump(
    entity: MixPaintV3,
    callback?: (dumpedData: unknown[], entity: MixPaintV3) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpedData = super.dump(entity, undefined, includeChildren, options);
    const mainData = dumpedData[0] as DumpedData;
    
    mainData.host = entity.host.dump();
    mainData.faceGroup = entity.faceGroup.dump();
    
    if (callback) {
      callback(dumpedData, entity);
    }
    
    return dumpedData;
  }

  load(entity: MixPaintV3, data: DumpedData, options: LoadOptions = {}): void {
    super.load(entity, data, options);
    
    if (data.host) {
      entity.host.load(data.host, options);
    }
    
    if (data.faceGroup) {
      entity.faceGroup.load(data.faceGroup, options);
    }
  }
}

export class MixPaintV3 extends Entity {
  private _host: MixHost;
  private _faceGroup: FaceGroup;
  private _dataVersion: number;
  private _sketch2d: MixSketch2d | undefined;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
    this._host = new MixHost();
    this._faceGroup = new FaceGroup();
    this._dataVersion = 0;
    this._sketch2d = undefined;
  }

  destroy(): void {
    if (!this._disposed) {
      super.destroy();
    }
  }

  getIO(): MixPaintV3_IO {
    return MixPaintV3_IO.instance();
  }

  isRoot(): boolean {
    return true;
  }

  copyFrom(source: MixPaintV3): void {
    this._host.copyFrom(source._host);
    this._faceGroup.copyFrom(source._faceGroup);
    
    const clonedSketch = source.sketch2d.clone();
    this.addChild(clonedSketch);
  }

  get host(): MixHost {
    return this._host;
  }

  get faceEntity(): unknown {
    return this._host.faceEntity;
  }

  set faceEntity(value: unknown) {
    this._host.faceEntity = value;
  }

  get faceId(): unknown {
    return this._host.faceId;
  }

  set faceId(value: unknown) {
    this._host.faceId = value;
  }

  get dataVersion(): number {
    return this._dataVersion;
  }

  get backgroundMaterial(): unknown {
    return this.sketch2d.backgroundMaterial;
  }

  set backgroundMaterial(value: unknown) {
    this.sketch2d.backgroundMaterial = value;
  }

  get sketch2d(): MixSketch2d {
    if (this._sketch2d) {
      return this._sketch2d;
    }
    
    const newSketch = new MixSketch2d();
    this.addChild(newSketch);
    return newSketch;
  }

  get mixPave(): unknown {
    return this.sketch2d.mixPave;
  }

  set mixPave(value: unknown) {
    this.sketch2d.mixPave = value;
  }

  get polygons(): unknown[] {
    return [];
  }

  get faceGroup(): FaceGroup {
    return this._faceGroup;
  }

  set faceGroupId(value: unknown) {
    this._faceGroup.faceGroupId = value;
  }

  get faceGroupId(): unknown {
    return this._faceGroup.faceGroupId;
  }

  getFaceIds(): unknown[] {
    return this._faceGroup.getFaceIds();
  }

  set faceGroupBoundMap(value: unknown) {
    this._faceGroup.faceGroupBoundMap = value;
  }

  get faceGroupBoundMap(): unknown {
    return this._faceGroup.faceGroupBoundMap;
  }

  clearFaceGroup(): void {
    this._faceGroup.clear();
  }

  transform(matrix: unknown): void {
    this.sketch2d.transform(matrix);
    ServiceManager.getMixPaveService().transform(
      this.mixPave,
      DataModelConvertor.convertMatrix(matrix)
    );
    this._faceGroup.transformBoundMap(matrix);
  }

  mergeBackgroundWithOtherMixPaves(otherMixPaves: unknown[]): void {
    ToSketchConvertor.mergeBackgroundWithOtherMixPaves(
      this.mixPave,
      otherMixPaves,
      this.sketch2d.background
    );
  }

  updateBackgroundPolygon(element: unknown, data: unknown): void {
    const { regions, independentRegions } = new MixPaveUpdateBkgApi().getUpdateRegions(
      this.mixPave,
      [element],
      data
    ) as UpdateRegionsResult;
    
    this.sketch2d.independentRegions = independentRegions;
    this.sketch2d.regions = regions;
  }

  setBackgroundData(data: any, options: unknown): void {
    if (data.outer?.every((curve: unknown) => curve instanceof Curve2d)) {
      const background = ToSketchConvertor.fromPathToBackground(data);
      this.sketch2d.setBackgroundData(background, false, options);
    } else {
      this.sketch2d.setBackgroundData(data, false, options);
    }
  }

  getBackgroundPath(): unknown | undefined {
    const paths = this.mixPave.regions.map((region: any) => region.path);
    
    if (paths.length === 1) {
      return paths[0];
    }
    
    if (paths.length > 1) {
      const unifiedPaths = ServiceManager.getClipperService().clip(
        paths,
        [],
        ClipMode.Union
      );
      
      if (unifiedPaths.length === 1) {
        return unifiedPaths[0];
      }
    }
    
    return undefined;
  }

  getBackgroundOuter(): unknown {
    return this.sketch2d.getBackgroundOuter();
  }

  clear(options?: ClearOptions): void {
    const backgroundPath = this.getBackgroundPath();
    const regions: unknown[] = [];
    
    if (backgroundPath) {
      const seekId = options?.seekId ?? this.mixPave.backgroundMaterial.seekId;
      const pattern = new PatternApi().createDefaultPattern(seekId);
      const region = new RegionApi().createRegion(backgroundPath, pattern);
      regions.push(region);
    }
    
    this.sketch2d.independentRegions = [];
    this.sketch2d.regions = regions;
  }

  isValidChild(child: unknown): boolean {
    if (!super.isValidChild(child)) {
      return false;
    }
    
    if (child instanceof MixSketch2d) {
      return true;
    }
    
    Logger.console.assert(false, "invalid type of child.");
    return false;
  }

  onChildAdded(child: unknown): void {
    super.onChildAdded(child);
    
    if (child instanceof MixSketch2d) {
      this._sketch2d = child;
      this._sketch2d.host = this._host;
    }
  }

  onChildRemoved(child: unknown, notify: boolean = true): void {
    super.onChildRemoved(child, notify);
    
    if (child instanceof MixSketch2d) {
      this._sketch2d = undefined;
    }
  }

  onChildDirty(child: unknown, dirtyInfo: any): void {
    if (dirtyInfo.type === "geometry") {
      this.dirtyGeometry();
    }
    
    super.onChildDirty(child, dirtyInfo);
    this._dataVersion++;
  }

  getPaintData(useFGIFormat: boolean = true): PaintData {
    const backgroundMaterial = this.backgroundMaterial;
    const getMaterialDataFn = useFGIFormat ? Util.getMaterialDataForFGI : Util.getMaterialData;
    
    const paintData: PaintData = {
      backgroundMaterial: undefined,
      paints: [],
      boundaries: [],
      background: undefined
    };
    
    paintData.backgroundMaterial = getMaterialDataFn(this.backgroundMaterial);
    
    const backgroundOuter = this.getBackgroundOuter();
    paintData.background = backgroundOuter || [];
    
    const clonedPath = backgroundOuter ? _.cloneDeep(backgroundOuter) : [];
    
    paintData.paints.push({
      id: undefined,
      path: clonedPath,
      innerPath: clonedPath,
      pavingOption: PavingOption.create(),
      holes: [],
      material: getMaterialDataFn(backgroundMaterial),
      grid: undefined,
      pattern: undefined,
      leftTop: { x: 0, y: 0 }
    });
    
    return paintData;
  }

  loadMigrationData(migrationData: unknown, options: unknown): void {
    this.sketch2d.createBackground(migrationData);
  }

  get waterJetTiles(): unknown[] {
    return [];
  }
}