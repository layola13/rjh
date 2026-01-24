import { MathAlg, Loop } from './math-module';
import { ExtraordinarySketch2dBuilder } from './extraordinary-sketch2d-builder';
import { LayerSketchUtil, LayerSketch2dData } from './layer-sketch-util';
import { Logger } from './logger';
import { TgSlab } from './tg-slab';

/**
 * Sketch2D face region data structure
 */
interface Sketch2dFace {
  /** Unique identifier for the face */
  id: string;
  /** Topological tags associated with this face */
  topos: string[];
  /** Outer boundary loop of the face */
  outerLoop: SketchLoop;
  /** Convert face to builder region format */
  toBuilderRegion(context: unknown): BuilderRegion;
}

/**
 * Sketch loop representation
 */
interface SketchLoop {
  /** Convert sketch loop to mathematical loop */
  toMathLoop(): Loop;
}

/**
 * Builder region data structure
 */
interface BuilderRegion {
  // Region-specific properties
  [key: string]: unknown;
}

/**
 * 2D sketch data structure containing background, faces, and guidelines
 */
interface Sketch2d {
  /** Background regions defining the base geometry */
  background: {
    regions: unknown[];
  };
  /** Collection of face regions within the sketch */
  faces: Sketch2dFace[];
  /** Guidelines for sketch construction */
  guidelines: unknown[];
}

/**
 * Slab hole definition with geometric loop and identifier
 */
interface SlabHole {
  /** Mathematical loop defining the hole boundary */
  loop: Loop;
  /** Unique identifier for the hole */
  id: string;
}

/**
 * Slab face structure
 */
interface SlabFace {
  /** Face identifier */
  id: string;
}

/**
 * Slab structure containing top and bottom faces
 */
interface Slab {
  /** Top surface faces */
  topFaces: Record<string, SlabFace>;
  /** Bottom surface faces */
  bottomFaces: Record<string, SlabFace>;
}

/**
 * Layer entity with sketch and slab information
 */
interface Layer {
  /** Previous layer in the hierarchy */
  prev?: Layer;
  /** Slab builder instance */
  slabBuilder: SlabBuilder;
  /** Hole builder instance */
  holeBuilder: HoleBuilder;
  /** Floor slab collection */
  floorSlabs: Record<string, Slab>;
  /** 2D sketch holes for slab generation */
  slabSketch2dHoles: SlabHole[];
  /** 2D sketch guidelines for slab generation */
  slabSketch2dGuildLines: unknown[];
  /** Set the sketch for this layer */
  setSketch(sketch: Sketch2d): void;
}

/**
 * Slab builder interface
 */
interface SlabBuilder {
  /** Build ceiling geometry from 2D sketch */
  buildCeilingFromSketch2d(profile: unknown[]): void;
  /** Build floor geometry from 2D sketch */
  buildFloorFromSketch2d(profile: unknown[]): void;
}

/**
 * Hole builder interface
 */
interface HoleBuilder {
  /** Update slab holes with face IDs */
  updateSlabHole(faceIds: string[], slab: Slab): void;
}

/**
 * Builder for generating 2D sketches on layer entities.
 * Handles background regions, face generation, hole mapping, and slab updates.
 */
export class LayerSketch2dBuilder extends ExtraordinarySketch2dBuilder {
  /** Topological tag identifying slab holes */
  static readonly HoleTopoTag = 'slabhole';

  /** The layer entity this builder operates on */
  private readonly layer: Layer;

  /** Mapping from face IDs to their corresponding hole IDs */
  private readonly faceHoleIDMp: Map<string, string>;

  /** The generated 2D sketch data */
  private _sketch2d?: Sketch2d;

  /**
   * Creates a new LayerSketch2dBuilder instance
   * @param layer - The layer entity to build the sketch for
   */
  constructor(layer: Layer) {
    super(layer);
    this.layer = layer;
    this.faceHoleIDMp = new Map<string, string>();

    const layerSketchData = LayerSketchUtil.createLayerSketch2dData(layer);
    Logger.console.assert(!!layerSketchData, 'Generate Layer Sketch failed!');

    const sketch = this.generateSketch(
      layerSketchData.background,
      layerSketchData.holes,
      layerSketchData.guideLines
    );

    layer.setSketch(sketch);
    this._sketch2d = { ...sketch };

    if (layerSketchData) {
      this._establishHoleFaceMap(layerSketchData.holes);
    }
  }

  /**
   * Generate a complete 2D sketch from background, holes, and guidelines
   * @param background - Background region data
   * @param holes - Collection of hole definitions
   * @param guidelines - Guideline data for sketch construction
   * @returns The generated 2D sketch
   */
  generateSketch(
    background: Sketch2d['background'],
    holes: LayerSketch2dData['holes'],
    guidelines: unknown[]
  ): Sketch2d {
    this._sketch2d = {
      background,
      faces: [],
      guidelines
    };

    this.addRegions(holes);
    return this._sketch2d;
  }

  /**
   * Update the sketch with new data
   * @param param1 - First update parameter
   * @param param2 - Second update parameter
   * @param param3 - Third update parameter
   */
  update(param1: unknown, param2: unknown, param3: unknown): void {
    super.update(param1, param2, param3);
  }

  /**
   * Update appendix data after sketch modification
   */
  updateAppendix(): void {
    this.updateLayer();
  }

  /**
   * Perform a complete layer update including slabs
   */
  updateLayer(): void {
    this._completeUpdate();
    this._updateSlabs();
  }

  /**
   * Get pre-built face regions filtered by hole topology
   * @param context - Context parameter for region conversion
   * @returns Array of builder regions representing holes
   */
  protected _getPreBuildFaceRegions(context: unknown): BuilderRegion[] {
    if (!this._sketch2d) {
      return [];
    }

    return this._sketch2d.faces
      .filter(face => face.topos.includes(LayerSketch2dBuilder.HoleTopoTag))
      .map(face => face.toBuilderRegion(context));
  }

  /**
   * Complete the update process by merging hole faces
   */
  private _completeUpdate(): void {
    if (!this._sketch2d) {
      return;
    }

    const holeFaces = this._sketch2d.faces.filter(face =>
      face.topos.includes(LayerSketch2dBuilder.HoleTopoTag)
    );

    this.mergeFaces(holeFaces);
  }

  /**
   * Update slab geometry based on current sketch state
   */
  private _updateSlabs(): void {
    const slabHoles = this._extractSlabHoles();
    this.layer.slabSketch2dHoles = slabHoles;
    this.layer.slabSketch2dGuildLines = this._sketch2d?.guidelines ?? [];

    const slabProfile = this._extractSlabProfile();
    const previousLayer = this.layer.prev;

    if (previousLayer) {
      previousLayer.slabBuilder.buildCeilingFromSketch2d(slabProfile);
    }

    this.layer.slabBuilder.buildFloorFromSketch2d(slabProfile);
    TgSlab.updateLayerSlabFaces(this.layer);

    Object.values(this.layer.floorSlabs).forEach(slab => {
      const allFaces = [
        ...Object.values(slab.topFaces),
        ...Object.values(slab.bottomFaces)
      ];
      this.layer.holeBuilder.updateSlabHole(
        allFaces.map(face => face.id),
        slab
      );
    });
  }

  /**
   * Extract slab hole definitions from the current sketch
   * @returns Array of slab holes with loops and IDs
   */
  private _extractSlabHoles(): SlabHole[] {
    const holeFaces = this._sketch2d?.faces.filter(face =>
      face.topos.includes(LayerSketch2dBuilder.HoleTopoTag)
    ) ?? [];

    return holeFaces.map(face => {
      const loop = face.outerLoop.toMathLoop();

      // Ensure loop is clockwise
      if (loop.isAnticlockwise()) {
        loop.reverse();
      }

      return {
        loop,
        id: this.faceHoleIDMp.get(face.id) ?? face.id
      };
    });
  }

  /**
   * Extract slab profile regions from background
   * @returns Array of background regions
   */
  private _extractSlabProfile(): unknown[] {
    return this._sketch2d?.background.regions ?? [];
  }

  /**
   * Establish mapping between sketch faces and hole IDs
   * @param holes - Collection of hole data from layer sketch
   */
  private _establishHoleFaceMap(holes: LayerSketch2dData['holes']): void {
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