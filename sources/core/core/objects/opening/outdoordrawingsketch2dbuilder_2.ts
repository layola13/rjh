import { Loop, Vector2, MathAlg } from './math-core';
import { ExtraordinarySketch2dBuilder } from './ExtraordinarySketch2dBuilder';
import { ExtraordinaryBackground } from './ExtraordinaryBackground';
import { ExtraordinaryGuideline } from './ExtraordinaryGuideline';

interface Curve {
  // Define based on your geometry library
}

interface Anchor {
  // Define based on your geometry library
}

interface GuidelineType {
  // Define based on your geometry library
}

interface SlabSketch2dGuideLine {
  curve: Curve;
  fromAnchor: Anchor;
  endAnchor: Anchor;
  type: GuidelineType;
}

interface WorldRawPath2d {
  outer: Curve[];
  holes: Curve[][];
}

interface Face {
  worldRawPath2d: WorldRawPath2d;
}

interface OutdoorLayer {
  slabSketch2dGuildLines: SlabSketch2dGuideLine[];
  faces: Record<string, HSCore.Model.Floor>;
}

interface CurveWrapper {
  curve: Curve;
}

interface BuilderRegion {
  outer: CurveWrapper[];
  holes: CurveWrapper[][];
  topo: string;
}

interface Sketch2dFace {
  topos: string;
  replaceTopoName(oldName: string, newName: string): void;
  toPolygon(): Polygon;
  toBuilderRegion(option: unknown): BuilderRegion;
}

interface Sketch2d {
  background: ExtraordinaryBackground;
  faces: Sketch2dFace[];
  guidelines: ExtraordinaryGuideline[];
}

interface Polygon {
  outer: Array<{ x: number; y: number }>;
  holes: Array<Array<{ x: number; y: number }>>;
}

interface DrawRegion {
  outer: CurveWrapper[];
}

interface UpdateAppendixOptions {
  removeFacesWithBkg?: boolean;
  drawRegions?: DrawRegion[];
  faceTranslation?: unknown;
}

interface BackgroundRegion {
  outer: Array<{ x: number; y: number }>;
  holes: Array<Array<{ x: number; y: number }>>;
}

export class OutdoorDrawingSketch2dBuilder extends ExtraordinarySketch2dBuilder {
  private static readonly FaceTopoTag = 'face';
  private static readonly DrawFaceTopoTag = 'drawFace';

  private _layer: OutdoorLayer;
  protected _sketch2d?: Sketch2d;

  constructor(layer: OutdoorLayer) {
    super(layer);
    this._layer = layer;
    this._initByOuterDoorLayer(layer);
  }

  private _initByOuterDoorLayer(layer: OutdoorLayer): void {
    const guidelines = layer.slabSketch2dGuildLines.map(guideline =>
      ExtraordinaryGuideline.create(
        guideline.curve,
        guideline.fromAnchor,
        guideline.endAnchor,
        guideline.type
      )
    );

    const sketch2dData: Sketch2d = {
      background: this._createSuperLargeBackground(),
      faces: [],
      guidelines
    };

    this.updateSketch2d(sketch2dData);

    const floorFaces = Object.values(layer.faces)
      .filter((face): face is HSCore.Model.Floor => face instanceof HSCore.Model.Floor)
      .map(face => face.worldRawPath2d);

    const regions: BuilderRegion[] = [];

    floorFaces.forEach(rawPath => {
      const region: BuilderRegion = {
        outer: rawPath.outer.map(curve => ({ curve })),
        holes: rawPath.holes.map(hole => hole.map(curve => ({ curve }))),
        topo: `-1_${OutdoorDrawingSketch2dBuilder.FaceTopoTag}`
      };
      regions.push(region);
    });

    this.addRegions(regions);
    this._filterValidFaces();
    this.updateSketch2d(this._sketch2d!);
  }

  updateAppendix(options?: UpdateAppendixOptions): void {
    this._filterValidFaces();

    if (options?.removeFacesWithBkg) {
      this._removeFacesWithBkg();
    }

    this._layer.slabSketch2dGuildLines = this._sketch2d ? this._sketch2d.guidelines : [];

    if (!this._sketch2d) {
      return;
    }

    let drawFaces = this._sketch2d.faces.filter(face =>
      this._isToposDrawFace(face.topos)
    );

    drawFaces.forEach(face => {
      face.replaceTopoName(
        OutdoorDrawingSketch2dBuilder.DrawFaceTopoTag,
        OutdoorDrawingSketch2dBuilder.FaceTopoTag
      );
    });

    if (options?.drawRegions?.length) {
      const drawRegionLoops = options.drawRegions.map(
        region => new Loop(region.outer.map(wrapper => wrapper.curve))
      );

      drawFaces = drawFaces.filter(face => {
        const points = HSCore.Util.ExtraordinarySketch2d.getAllPointsFromFaces([face], true).map(
          point => new Vector2(point)
        );

        return drawRegionLoops.some(loop =>
          points.some(
            point =>
              MathAlg.PositionJudge.ptToLoop(point, loop).type !== MathAlg.PtLoopPositonType.IN
          )
        );
      });
    }

    if (drawFaces.length > 1) {
      this.mergeFaces(drawFaces);
    }

    this._filterValidFaces();

    const polygons = this._sketch2d.faces.map(face => face.toPolygon());

    HSCore.Util.Slab.updateOutdoorLayerSlabsByCurves(
      polygons,
      false,
      [],
      true,
      options?.faceTranslation
    );

    this._initByOuterDoorLayer(this._layer);
  }

  protected _getPreBuildFaceRegions(option: unknown): BuilderRegion[] {
    if (!this._sketch2d) {
      return [];
    }

    return this._sketch2d.faces
      .filter(face => this._isToposValid(face.topos))
      .map(face => face.toBuilderRegion(option));
  }

  private _filterValidFaces(): void {
    if (this._sketch2d) {
      this._sketch2d.faces = this._sketch2d.faces.filter(face =>
        this._isToposValid(face.topos)
      );
    }
  }

  private _removeFacesWithBkg(): void {
    if (
      !this._sketch2d ||
      !this._sketch2d.faces.length ||
      !this._sketch2d.background.regions.length
    ) {
      return;
    }

    const backgroundRegion = this._sketch2d.background.regions[0];
    const backgroundLoop = new Loop(backgroundRegion.outer);

    this._sketch2d.faces = this._sketch2d.faces.filter(face => {
      const polygon = face.toPolygon();
      const faceLoop = new Loop(polygon.outer);

      return (
        MathAlg.PositionJudge.loopToLoop(faceLoop, backgroundLoop) !==
        MathAlg.LoopLoopPositonType.EQUAL
      );
    });
  }

  private _isToposValid(topos: string): boolean {
    return (
      topos.includes(OutdoorDrawingSketch2dBuilder.FaceTopoTag) ||
      topos.includes(OutdoorDrawingSketch2dBuilder.DrawFaceTopoTag)
    );
  }

  private _isToposDrawFace(topos: string): boolean {
    return topos.includes(OutdoorDrawingSketch2dBuilder.DrawFaceTopoTag);
  }

  private _createSuperLargeBackground(): ExtraordinaryBackground {
    const boundarySize = 10000;

    const corners = [
      { x: -boundarySize, y: boundarySize },
      { x: -boundarySize, y: -boundarySize },
      { x: boundarySize, y: -boundarySize },
      { x: boundarySize, y: boundarySize }
    ];

    const backgroundRegion: BackgroundRegion = {
      outer: new Loop(corners).getAllCurves(),
      holes: []
    };

    return new ExtraordinaryBackground([backgroundRegion]);
  }
}