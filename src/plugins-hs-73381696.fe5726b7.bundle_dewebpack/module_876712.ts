import { HSCore } from './HSCore';
import { Loop } from './Loop';
import { ClipMode } from './ClipMode';

interface Point {
  clone(): Point;
  translate(offset: Vector): Point;
}

interface Vector {
  x: number;
  y: number;
}

interface Region {
  outer: Point[];
  holes?: Point[][];
}

interface SlabInfo {
  rawPath: {
    outer?: Point[];
  };
}

interface FloorSlab {
  slabInfo: SlabInfo;
}

interface LayerSlabRegionsInfo {
  floorSlabData: {
    regions: Region[];
    autoRegions: Region[];
  };
}

interface ModelContent {
  Class: string;
}

interface LayerContents {
  contents: Record<string, ModelContent>;
}

interface FloorSlabCollection {
  forEachFloorSlab(callback: (slab: FloorSlab) => void): void;
}

/**
 * Calculates the total area of regions including outer loops and holes
 */
function calculateRegionsArea(regions: Region[]): number {
  return regions.reduce((totalArea, region) => {
    totalArea += new Loop(region.outer).calcArea();
    
    region.holes?.forEach((hole) => {
      totalArea += new Loop(hole).calcArea();
    });
    
    return totalArea;
  }, 0);
}

/**
 * Checks if layer slabs have been edited by comparing floor slab regions with auto-generated regions
 */
export function isLayerSlabsEdited(layer: unknown): boolean {
  const AREA_THRESHOLD = 1e-4;
  
  const regionsInfo: LayerSlabRegionsInfo = HSCore.Util.TgSlab.getLayerSlabRegionsInfo(layer);
  
  const regionsMinusAuto = HSCore.Geometry.TgUtil.clip(
    regionsInfo.floorSlabData.regions,
    regionsInfo.floorSlabData.autoRegions,
    ClipMode.Diff
  );
  
  const autoMinusRegions = HSCore.Geometry.TgUtil.clip(
    regionsInfo.floorSlabData.autoRegions,
    regionsInfo.floorSlabData.regions,
    ClipMode.Diff
  );
  
  const regionsMinusAutoArea = calculateRegionsArea(regionsMinusAuto);
  const autoMinusRegionsArea = calculateRegionsArea(autoMinusRegions);
  
  return regionsMinusAutoArea >= AREA_THRESHOLD || autoMinusRegionsArea >= AREA_THRESHOLD;
}

/**
 * Checks if the layer contains any sketch ceiling models
 */
export function hasSketchCeiling(layer: LayerContents): boolean {
  return Object.values(layer.contents).some((content) => {
    return content.Class === HSConstants.ModelClass.NCustomizedCeilingModel;
  });
}

/**
 * Checks if floors overlap after applying an offset translation
 */
export function isFloorsOverlapAfterOffset(
  floorSlabs: FloorSlabCollection,
  offset: Vector
): boolean {
  let allFloorsOverlap = true;
  
  floorSlabs.forEachFloorSlab((floorSlab) => {
    const outerPath = floorSlab.slabInfo.rawPath.outer;
    
    if (outerPath) {
      const translatedPath = outerPath.map((point) => {
        return point.clone().translate(offset);
      });
      
      allFloorsOverlap = allFloorsOverlap && HSCore.Geometry.TgUtil.isCurvesOverLap(outerPath, translatedPath);
    }
  });
  
  return allFloorsOverlap;
}