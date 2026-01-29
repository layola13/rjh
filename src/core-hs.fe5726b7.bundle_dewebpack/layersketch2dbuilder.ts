import { MathAlg, Loop } from './MathAlgorithm';
import { ExtraordinarySketch2dBuilder } from './ExtraordinarySketch2dBuilder';
import { LayerSketchUtil } from './LayerSketchUtil';
import { Logger } from './Logger';
import { TgSlab } from './TgSlab';

interface Curve {
  // Define curve properties based on your geometry system
}

interface MathLoop {
  isAnticlockwise(): boolean;
  reverse(): void;
}

interface SketchLoop {
  toMathLoop(): MathLoop;
}

interface Region {
  outer: Array<{ curve: Curve }>;
  // Add other region properties as needed
}

interface Face {
  id: string;
  outerLoop: SketchLoop;
  topos: string[];
  toBuilderRegion(param: unknown): Region;
}

interface Sketch2dData {
  background: {
    regions: Region[];
  };
  faces: Face[];
  guidelines: unknown[];
}

interface LayerSketch2dHole {
  loop: MathLoop;
  id: string;
}

interface SlabBuilder {
  buildCeilingFromSketch2d(profile: Region[]): void;
  buildFloorFromSketch2d(profile: Region[]): void;
}

interface SlabFace {
  id: string;
}

interface Slab {
  topFaces: Record<string, SlabFace>;
  bottomFaces: Record<string, SlabFace>;
}

interface HoleBuilder {
  updateSlabHole(faceIds: string[], slab: Slab): void;
}

interface Layer {
  prev?: Layer;
  slabBuilder: SlabBuilder;
  holeBuilder: HoleBuilder;
  floorSlabs: Record<string, Slab>;
  slabSketch2dHoles: LayerSketch2dHole[];
  slabSketch2dGuildLines: unknown[];
  setSketch(sketch: Sketch2dData): void;
}

interface HoleData {
  id: string;
  outer: Array<{ curve: Curve }>;
}

export class LayerSketch2dBuilder extends ExtraordinarySketch2dBuilder {
  static readonly HoleTopoTag = "slabhole";

  private layer: Layer;
  private faceHoleIDMp: Map<string, string>;
  private _sketch2d?: Sketch2dData;

  constructor(layer: Layer) {
    super(layer);
    this.layer = layer;
    this.faceHoleIDMp = new Map<string, string>();

    const sketchData = LayerSketchUtil.createLayerSketch2dData(layer);
    Logger.console.assert(!!sketchData, "Generate Layer Sketch failed!");

    const sketch = this.generateSketch(
      sketchData.background,
      sketchData.holes,
      sketchData.guideLines
    );
    layer.setSketch(sketch);
    this._sketch2d = { ...sketch };

    if (sketchData) {
      this._establishHoleFaceMap(sketchData.holes);
    }
  }

  generateSketch(
    background: Sketch2dData['background'],
    holes: HoleData[],
    guidelines: unknown[]
  ): Sketch2dData {
    this._sketch2d = {
      background,
      faces: [],
      guidelines
    };
    this.addRegions(holes);
    return this._sketch2d;
  }

  update(param1: unknown, param2: unknown, param3: unknown): void {
    super.update(param1, param2, param3);
  }

  updateAppendix(): void {
    this.updateLayer();
  }

  updateLayer(): void {
    this._completeUpdate();
    this._updateSlabs();
  }

  protected _getPreBuildFaceRegions(param: unknown): Region[] {
    if (!this._sketch2d) {
      return [];
    }

    return this._sketch2d.faces
      .filter(face => face.topos.includes(LayerSketch2dBuilder.HoleTopoTag))
      .map(face => face.toBuilderRegion(param));
  }

  private _completeUpdate(): void {
    if (!this._sketch2d) {
      return;
    }

    const holeFaces = this._sketch2d.faces.filter(face =>
      face.topos.includes(LayerSketch2dBuilder.HoleTopoTag)
    );
    this.mergeFaces(holeFaces);
  }

  private _updateSlabs(): void {
    const slabHoles = this._extractSlabHoles();
    this.layer.slabSketch2dHoles = slabHoles;
    this.layer.slabSketch2dGuildLines = this._sketch2d?.guidelines ?? [];

    const slabProfile = this._extractSlabProfile();
    const prevLayer = this.layer.prev;

    if (prevLayer) {
      prevLayer.slabBuilder.buildCeilingFromSketch2d(slabProfile);
    }

    this.layer.slabBuilder.buildFloorFromSketch2d(slabProfile);
    TgSlab.updateLayerSlabFaces(this.layer);

    Object.values(this.layer.floorSlabs).forEach(slab => {
      const faces = [
        ...Object.values(slab.topFaces),
        ...Object.values(slab.bottomFaces)
      ];
      this.layer.holeBuilder.updateSlabHole(
        faces.map(face => face.id),
        slab
      );
    });
  }

  private _extractSlabHoles(): LayerSketch2dHole[] {
    const holeFaces = this._sketch2d?.faces.filter(face =>
      face.topos.includes(LayerSketch2dBuilder.HoleTopoTag)
    ) ?? [];

    return holeFaces.map(face => {
      const mathLoop = face.outerLoop.toMathLoop();
      if (!mathLoop.isAnticlockwise()) {
        mathLoop.reverse();
      }

      return {
        loop: mathLoop,
        id: this.faceHoleIDMp.get(face.id) ?? face.id
      };
    });
  }

  private _extractSlabProfile(): Region[] {
    return this._sketch2d?.background.regions ?? [];
  }

  private _establishHoleFaceMap(holes: HoleData[]): void {
    holes.forEach(hole => {
      const matchingFace = this._sketch2d?.faces.find(face => {
        const faceLoop = face.outerLoop.toMathLoop();
        const holeLoop = new Loop(hole.outer.map(segment => segment.curve));
        const positionType = MathAlg.PositionJudge.loopToLoop(faceLoop, holeLoop);

        return [
          MathAlg.LoopLoopPositonType.EQUAL,
          MathAlg.LoopLoopPositonType.IN
        ].includes(positionType);
      });

      if (matchingFace) {
        this.faceHoleIDMp.set(matchingFace.id, hole.id);
      }
    });
  }
}