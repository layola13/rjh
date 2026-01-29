import { Entity, EntityFlagEnum } from './Entity';
import { ParametricModelArray, ParametricModelArray_IO } from './ParametricModelArray';
import { Signal } from './Signal';
import { GraphicsCutter } from './GraphicsCutter';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { NCPClipTaskManager } from './NCPClipTaskManager';
import { EntityEventType } from './EntityEventType';
import { NCPBackgroundWallContent } from './NCPBackgroundWallContent';

interface GraphicsData {
  faces: Map<string, FaceData>;
  edges: Map<string, EdgeData>;
  contents?: Map<string, unknown>;
}

interface FaceData {
  meshKey?: string;
  [key: string]: unknown;
}

interface EdgeData {
  meshKey?: string;
  [key: string]: unknown;
}

interface ClipEvent {
  type: EntityEventType;
}

interface ObstacleInfo {
  baseCoord: unknown;
  [key: string]: unknown;
}

interface ClipOptions {
  isBackgroundWallArray: boolean;
}

interface ClipTask {
  run(data: GraphicsData): GraphicsData;
  delete(): void;
}

class NCPBackgroundWallArray_IO extends ParametricModelArray_IO {
  private static _instance?: NCPBackgroundWallArray_IO;

  static instance(): NCPBackgroundWallArray_IO {
    if (!this._instance) {
      this._instance = new NCPBackgroundWallArray_IO();
    }
    return this._instance;
  }
}

class NCPBackgroundWallArray extends ParametricModelArray {
  private _dirtyClip: boolean = false;
  private _graphicsData?: GraphicsData;
  private _clipTask?: ClipTask;
  private _boundDirty: boolean = false;
  
  public signalArrayChanged: Signal<void>;
  public signalClipDirty: Signal<ClipEvent>;
  
  private _signalHook: HSCore.Util.SignalHook;

  constructor(eId: string = "", srcId?: string) {
    super(eId, srcId);
    
    this.signalArrayChanged = new Signal(this);
    this._signalHook = new HSCore.Util.SignalHook(this);
    this.signalClipDirty = new Signal(this);
    
    this._signalHook.listen(this.signalClipDirty, (event: ClipEvent) => {
      this._dirtyClip = true;
    });
  }

  destroy(): void {
    this.signalClipDirty.dispose();
    this.signalClipDirty = undefined!;
    super.destroy();
  }

  protected _createArrayContent(): NCPBackgroundWallContent {
    return new NCPBackgroundWallContent();
  }

  initArray(data: unknown): void {
    super.initArray(data);
    this.dirtyClipGeometry();
  }

  private _enableClip(): boolean {
    if (!this._dirtyClip) return false;
    if (!HSConstants.Config.ClipBackgroundWallEnable) return false;
    if (this.isFlagOn(EntityFlagEnum.hidden)) return false;
    
    const parentsHidden = this.getParentsInPath().some((parent: Entity) => 
      parent.isFlagOn(EntityFlagEnum.hidden)
    );
    
    return !parentsHidden;
  }

  dirtyClipGeometry(options?: unknown): void {
    this._graphicsData = undefined;
    
    this.signalClipDirty.dispatch({
      type: EntityEventType.Clip
    });
    
    this.dirty({
      type: EntityEventType.Geometry
    }, options);
    
    this._boundDirty = true;
    this._clipTask = NCPClipTaskManager.addClipTask(
      this.id,
      this._clipGeom.bind(this),
      this
    );
    
    this.signalArrayChanged.dispatch();
  }

  getUnClippedGraphicsData(): GraphicsData {
    const graphicsData: GraphicsData = {
      faces: new Map(),
      edges: new Map(),
      contents: new Map()
    };

    if (!this.eId || !this.srcId) return graphicsData;

    const uniqueParent = this.getUniqueParent();
    if (!uniqueParent) return graphicsData;

    const childModel = uniqueParent.getChildByEId(this.srcId);
    let sourceGraphics: GraphicsData | undefined;

    if (childModel) {
      sourceGraphics = this.getSrcModelGraphicsData(childModel);
    } else {
      sourceGraphics = uniqueParent.getBrepGraphicsDataByEId(this.srcId);
    }

    if (!sourceGraphics) return graphicsData;

    const matrixes = this.matrixes;
    const matrixCount = matrixes?.length || 0;

    matrixes?.forEach((matrix: unknown, index: number) => {
      let clonedGraphics = _.cloneDeep(sourceGraphics);

      if (index === matrixCount - 1) {
        const clipCoord = this.getClipCoord();
        if (clipCoord) {
          clonedGraphics = GraphicsCutter.getInstance().clipGeomByPlanes(
            clonedGraphics,
            [clipCoord]
          );
        }
      }

      const transformedData = this.transformGraphicsData(clonedGraphics, matrix);

      transformedData.faces.forEach((faceData: FaceData, faceKey: string) => {
        const uniqueKey = `${faceKey}-${this.id}>${index}`;
        faceData.meshKey = uniqueKey;
        graphicsData.faces.set(uniqueKey, faceData);
      });

      transformedData.edges.forEach((edgeData: EdgeData, edgeKey: string) => {
        const uniqueKey = `${edgeKey}-${this.id}>${index}`;
        edgeData.meshKey = uniqueKey;
        graphicsData.edges.set(uniqueKey, edgeData);
      });
    });

    return graphicsData;
  }

  getGraphicsData(): GraphicsData {
    if (!this._graphicsData) {
      let graphicsData = super.getGraphicsData();

      if (this._enableClip()) {
        graphicsData = this._clipTask 
          ? this._clipTask.run(graphicsData) 
          : this._clipGeom(graphicsData);
      } else {
        this._clipTask?.delete();
      }

      this._graphicsData = graphicsData;
    }

    this._dirtyClip = false;
    return this._graphicsData;
  }

  private _clipGeom(graphicsData: GraphicsData): GraphicsData {
    const obstacleInfos = NCustomizedFeatureModelUtil.getObstacleInfos(this);

    if (obstacleInfos && obstacleInfos.length > 0) {
      const baseCoord = obstacleInfos[0].baseCoord;
      const clipOptions: ClipOptions = {
        isBackgroundWallArray: true
      };

      return GraphicsCutter.getInstance().clipGeomByObstacles(
        graphicsData,
        obstacleInfos,
        baseCoord,
        clipOptions
      );
    }

    return graphicsData;
  }

  transformMatrixes(matrixes: unknown[]): unknown[] {
    const uniqueParent = this.getUniqueParent();
    const transformedMatrixes = matrixes;

    if (
      uniqueParent &&
      uniqueParent !== this.srcModel &&
      this.srcModel instanceof HSCore.Model.NCPBackgroundWallSubpart &&
      this.srcModel.subpartMatrix
    ) {
      const subpartMatrix = this.srcModel.subpartMatrix;
      transformedMatrixes.forEach((matrix: any) => {
        matrix.multiply(subpartMatrix);
      });
    }

    return transformedMatrixes;
  }

  async getGraphicsDataAsync(): Promise<GraphicsData> {
    return new Promise((resolve) => {
      if (!this._graphicsData) {
        let graphicsData = super.getGraphicsData();

        if (this._enableClip()) {
          graphicsData = this._clipTask 
            ? this._clipTask.run(graphicsData) 
            : this._clipGeom(graphicsData);
        } else {
          this._clipTask?.delete();
        }

        this._graphicsData = graphicsData;
      }

      this._dirtyClip = false;
      resolve(this._graphicsData);
    });
  }

  getIO(): NCPBackgroundWallArray_IO {
    return NCPBackgroundWallArray_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NCPBackgroundWallArray, NCPBackgroundWallArray);

export { NCPBackgroundWallArray_IO, NCPBackgroundWallArray };