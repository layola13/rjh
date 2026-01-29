import { ExtraordinaryBackground } from './ExtraordinaryBackground';
import { ExtraordinaryGuideline } from './ExtraordinaryGuideline';
import { TgSlabUtil } from './TgSlabUtil';

interface Curve {
  // Define curve interface based on your geometry system
  // Add specific properties as needed
}

interface Loop {
  getAllCurves(): Curve[];
}

interface SlabSketch2dHole {
  id: string;
  loop: Loop;
}

interface Anchor {
  // Define anchor interface
  // Add specific properties as needed
}

interface GuidelineType {
  // Define guideline type
  // Add specific properties as needed
}

interface SlabSketch2dGuideline {
  curve: Curve;
  fromAnchor: Anchor;
  endAnchor: Anchor;
  type: GuidelineType;
}

interface LayerFloorSlabPath {
  outer: Curve[];
  holes?: Curve[][];
}

interface PathData {
  outer: Curve[];
  holes: Curve[][];
}

interface CurveWrapper {
  curve: Curve;
}

interface HoleData {
  id: string;
  outer: CurveWrapper[];
  holes: never[];
  topo: string;
}

interface LayerSketch2dData {
  background: ExtraordinaryBackground;
  holes: HoleData[];
  guideLines: ExtraordinaryGuideline[];
}

interface LayerEntity {
  slabSketch2dHoles?: SlabSketch2dHole[];
  slabSketch2dGuildLines: SlabSketch2dGuideline[];
}

export class LayerSketchUtil {
  private static readonly HoleTopoTag = 'slabhole';

  /**
   * Creates 2D sketch data for a layer
   * @param layer - The layer entity to process
   * @returns Layer sketch 2D data or undefined if no floor slab paths exist
   */
  static createLayerSketch2dData(layer: LayerEntity): LayerSketch2dData | undefined {
    const floorSlabPaths = TgSlabUtil.getLayerFloorSlabPaths(layer);
    
    if (floorSlabPaths.length === 0) {
      return undefined;
    }

    const pathDataList: PathData[] = floorSlabPaths.map((path) => ({
      outer: path.outer,
      holes: []
    }));

    const holes: HoleData[] = layer.slabSketch2dHoles
      ? layer.slabSketch2dHoles.map((hole) => {
          const curveWrappers = hole.loop.getAllCurves().map((curve) => ({
            curve: curve
          }));

          return {
            id: hole.id,
            outer: curveWrappers,
            holes: [],
            topo: `-1_${LayerSketchUtil.HoleTopoTag}`
          };
        })
      : [];

    const guideLines = layer.slabSketch2dGuildLines.map((guideLine) =>
      ExtraordinaryGuideline.create(
        guideLine.curve,
        guideLine.fromAnchor,
        guideLine.endAnchor,
        guideLine.type
      )
    );

    return {
      background: new ExtraordinaryBackground(pathDataList),
      holes: holes,
      guideLines: guideLines
    };
  }
}