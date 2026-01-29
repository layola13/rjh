import { Region } from './Region';
import { RoomTopoFace } from './RoomTopoFace';
import { Loader } from './Loader';
import { TopoName } from './TopoName';

export enum RoomExtrudeType {
  Bottom = "bottom",
  Top = "top",
  Side = "side"
}

export enum RoomSplitCurveType {
  Deprecated = 0,
  Space = 1,
  Slab = 2
}

interface Curve {
  clone(): Curve;
  transform(matrix: any): void;
  reverse(): void;
  translate(vector: any): void;
  dump(): any;
}

interface CoEdge {
  id: string;
  curve: Curve;
  topoName: TopoName;
  clone(): CoEdge;
}

interface CoEdgePath {
  outer: CoEdge[];
  holes: CoEdge[][];
}

interface SplitCurveEndpointData {
  topoName: TopoName;
  percent: number;
}

interface RoomSplitCurve {
  curve: Curve;
  type: RoomSplitCurveType;
  startData?: SplitCurveEndpointData;
  endData?: SplitCurveEndpointData;
}

interface Layer {
  slabThickness: number;
}

interface ShellWrapper {
  sideFaces: any[][];
}

interface TransformOperation {
  matrix3: any;
}

interface RoomRegionDumpData {
  topoIds: string[];
  fIds?: string[];
  sCs?: Array<{
    c: any;
    sData?: {
      n: any;
      p: number;
    };
    eData?: {
      n: any;
      p: number;
    };
    type?: RoomSplitCurveType;
  }>;
}

interface RoomRegionLoadedData {
  faceIds: string[];
  splitCurves: RoomSplitCurve[];
}

interface CloneOptions {
  splitCurves?: RoomSplitCurve[];
}

export class RoomRegion extends Region {
  private _layer: Layer;
  public coEdgePath!: CoEdgePath;
  public linkWallIds!: string[];
  public faceIds: string[];
  public splitCurves: RoomSplitCurve[];
  public shellWrapper!: ShellWrapper;
  public topoFaces!: RoomTopoFace[];

  constructor(id: string, layer: Layer) {
    super(id);
    this._layer = layer;
    this.faceIds = [];
    this.splitCurves = [];
  }

  static create(
    id: string,
    coEdgePath: CoEdgePath,
    layer: Layer,
    linkWallIds: string[]
  ): RoomRegion {
    const region = new RoomRegion(id, layer);
    region.coEdgePath = coEdgePath;
    region.linkWallIds = linkWallIds;
    return region;
  }

  get roomSplitCurves(): RoomSplitCurve[] {
    return this.splitCurves.filter(
      (curve) => curve.type !== RoomSplitCurveType.Deprecated
    );
  }

  extrudeBody(): void {
    const thickness = this._layer.slabThickness;
    super.extrudeBody(-thickness, 0);

    const allCoEdges = [this.coEdgePath.outer].concat(this.coEdgePath.holes);

    this.shellWrapper.sideFaces.forEach((faceGroup, groupIndex) =>
      faceGroup.forEach((face, faceIndex) => {
        const coEdge = this._getCoEdge(allCoEdges[groupIndex][faceIndex].id);
        const topoFace = new RoomTopoFace(
          face,
          coEdge.topoName.clone(),
          this.linkWallIds
        );
        this.topoFaces.push(topoFace);
      })
    );
  }

  getCoEdgeTopoName(topoId: string): CoEdge | undefined {
    if (!topoId) return undefined;

    const allCoEdges = [this.coEdgePath.outer].concat(this.coEdgePath.holes);

    for (let groupIndex = 0; groupIndex < allCoEdges.length; groupIndex++) {
      for (let edgeIndex = 0; edgeIndex < allCoEdges[groupIndex].length; edgeIndex++) {
        if (allCoEdges[groupIndex][edgeIndex].topoName.id === topoId) {
          return allCoEdges[groupIndex][edgeIndex];
        }
      }
    }

    return undefined;
  }

  clone(options?: CloneOptions): RoomRegion {
    const cloned = RoomRegion.create(
      this.id,
      {
        outer: this.coEdgePath.outer.map((edge) => edge.clone()),
        holes: this.coEdgePath.holes.map((hole) => hole.map((edge) => edge.clone()))
      },
      this._layer,
      this.linkWallIds.slice()
    );

    cloned.shellWrapper = this.shellWrapper;
    cloned.topoFaces = this.topoFaces.slice();
    cloned.faceIds = this.faceIds.slice();
    cloned.splitCurves = options?.splitCurves ?? this.cloneSplitCurves();

    return cloned;
  }

  cloneSplitCurves(): RoomSplitCurve[] {
    if (!this.splitCurves.length) return [];

    return this.splitCurves.map((splitCurve) => {
      const cloned: RoomSplitCurve = {
        curve: splitCurve.curve.clone(),
        type: splitCurve.type
      };

      if (splitCurve.startData) {
        cloned.startData = {
          topoName: splitCurve.startData.topoName.clone(),
          percent: splitCurve.startData.percent
        };
      }

      if (splitCurve.endData) {
        cloned.endData = {
          topoName: splitCurve.endData.topoName.clone(),
          percent: splitCurve.endData.percent
        };
      }

      return cloned;
    });
  }

  mirror(transform: TransformOperation): void {
    this.coEdgePath.outer.forEach((edge) => {
      edge.curve.transform(transform.matrix3);
      edge.curve.reverse();
    });
    this.coEdgePath.outer.reverse();

    this.coEdgePath.holes.forEach((hole) => {
      hole.forEach((edge) => {
        edge.curve.transform(transform.matrix3);
        edge.curve.reverse();
      });
      hole.reverse();
    });

    this.splitCurves.forEach((splitCurve) =>
      splitCurve.curve.transform(transform.matrix3)
    );
  }

  translate(vector: any): void {
    this.coEdgePath.outer.forEach((edge) => {
      edge.curve.translate(vector);
    });

    this.coEdgePath.holes.forEach((hole) => {
      hole.forEach((edge) => {
        edge.curve.translate(vector);
      });
    });

    this.splitCurves.forEach((splitCurve) => splitCurve.curve.translate(vector));
  }

  dump(): RoomRegionDumpData {
    const data: RoomRegionDumpData = {
      topoIds: this.allCoEdgeTopoNameIds
    };

    if (this.faceIds.length) {
      data.fIds = this.faceIds;
    }

    if (this.splitCurves.length) {
      data.sCs = this.splitCurves.map((splitCurve) => {
        const serialized: any = {
          c: splitCurve.curve.dump()
        };

        if (splitCurve.startData) {
          serialized.sData = {
            n: splitCurve.startData.topoName.dump(),
            p: splitCurve.startData.percent
          };
        }

        if (splitCurve.endData) {
          serialized.eData = {
            n: splitCurve.endData.topoName.dump(),
            p: splitCurve.endData.percent
          };
        }

        if (splitCurve.type) {
          serialized.type = splitCurve.type;
        }

        return serialized;
      });
    }

    return data;
  }

  load(data: RoomRegionDumpData): void {
    const loadedData = RoomRegion.loadData(data);
    this.setData(loadedData);
  }

  static loadData(data: RoomRegionDumpData): RoomRegionLoadedData {
    return {
      faceIds: data.fIds ?? [],
      splitCurves: data.sCs?.map((serialized) => {
        const { c, sData, eData, type } = serialized;
        const splitCurve: RoomSplitCurve = {
          curve: Loader.load(c),
          type: type ?? RoomSplitCurveType.Deprecated
        };

        if (sData) {
          splitCurve.startData = {
            topoName: TopoName.load(sData.n),
            percent: sData.p
          };
        }

        if (eData) {
          splitCurve.endData = {
            topoName: TopoName.load(eData.n),
            percent: eData.p
          };
        }

        return splitCurve;
      }) ?? []
    };
  }

  setData(data: RoomRegionLoadedData): void {
    this.faceIds = data.faceIds;
    this.splitCurves = data.splitCurves;
  }

  private _getCoEdge(id: string): CoEdge {
    const allCoEdges = [this.coEdgePath.outer].concat(this.coEdgePath.holes);
    for (const group of allCoEdges) {
      for (const edge of group) {
        if (edge.id === id) return edge;
      }
    }
    throw new Error(`CoEdge with id ${id} not found`);
  }

  protected get allCoEdgeTopoNameIds(): string[] {
    const ids: string[] = [];
    this.coEdgePath.outer.forEach(edge => ids.push(edge.topoName.id));
    this.coEdgePath.holes.forEach(hole => 
      hole.forEach(edge => ids.push(edge.topoName.id))
    );
    return ids;
  }
}