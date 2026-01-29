import * as HSCore from './HSCore';
import * as HSCatalog from './HSCatalog';
import * as HSFPConstants from './HSFPConstants';
import { Line2d, Loop } from './geometry';

interface HostInfo {
  hostCurveIndex: number;
  posParam: {
    startParam: number;
    endParam: number;
  };
}

interface PolygonCut {
  fromPolygon: { outerLoop: Loop };
  selfPolygon: { outerLoop: Loop };
  toPolygon: { outerLoop: Loop };
  color: string;
}

interface MaskStyle {
  fill?: string;
  stroke?: string;
  'stroke-dasharray'?: number | string;
  'stroke-width'?: number;
  'stroke-opacity'?: number;
  'fill-opacity'?: number;
  opacity?: number;
}

interface LoopMask {
  loop: Loop;
  style: MaskStyle;
}

interface LineGroup {
  index: number;
  group: string;
  line: Line2d;
}

interface FeatureFloorCurve {
  openingFloorOverlapCurve: Line2d;
  type?: string;
}

interface FloorMaskPayload {
  floor: unknown;
  paths: LoopMask[];
}

/**
 * Recursively collects target content entities from groups and arrays
 */
export function getTargetContent(
  entity: HSCore.Model.NgContent | HSCore.Model.Group | HSCore.Model.NgContent[],
  result: HSCore.Model.NgContent[],
  contentTypeWhitelist: unknown
): void {
  if (entity instanceof Array) {
    entity.forEach((item) => {
      getTargetContent(item, result, contentTypeWhitelist);
    });
  } else if (entity instanceof HSCore.Model.Group) {
    entity.forEachMember((member) => {
      getTargetContent(member, result, contentTypeWhitelist);
    });
  } else if (entity.instanceOf(HSConstants.ModelClass.NgContent) && isTargetContent(entity, contentTypeWhitelist)) {
    result.push(entity);
  }
}

/**
 * Checks if content is valid target for processing
 */
export function isTargetContent(content: HSCore.Model.NgContent, contentTypeWhitelist: unknown): boolean {
  if (!isItemValid(content)) {
    return false;
  }

  if (content.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
    return false;
  }

  if (!content.contentType) {
    return false;
  }

  const isCeilingAttached = content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached);
  if (isCeilingAttached && !isAllowedCeilingAttachedType(content.contentType)) {
    return false;
  }

  if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel)) {
    return false;
  }

  if (isOpeningOrWindowType(content)) {
    return false;
  }

  return isInContentTypeWhiteList(content, contentTypeWhitelist);
}

/**
 * Validates if entity is not marked as removed
 */
export function isItemValid(entity: HSCore.Model.NgContent): boolean {
  return entity.isFlagOff(HSCore.Model.EntityFlagEnum.removed);
}

/**
 * Checks if content is within the room and not a group
 */
export function isInContentTypeWhiteList(content: HSCore.Model.NgContent, room: unknown): boolean {
  return content.isContentInRoom(room) && !(content instanceof HSCore.Model.Group);
}

/**
 * Determines if content is a parametric type
 */
export function isParametricContent(content: unknown): boolean {
  return (
    content instanceof HSCore.Model.NCustomizedStructure ||
    content instanceof HSCore.Model.PAssembly ||
    content instanceof HSCore.Model.DAssembly ||
    content instanceof HSCore.Model.DExtruding ||
    content instanceof HSCore.Model.DMolding ||
    content instanceof HSCore.Model.MeshContent ||
    content instanceof HSCore.Model.WaterJetTile ||
    content instanceof HSCore.Model.ParametricContentBase ||
    content instanceof HSCore.Model.CustomizedModel ||
    content instanceof HSCore.Model.NCustomizedFeatureModel ||
    content instanceof HSCore.Model.NCustomizedBeam ||
    content instanceof HSCore.Model.ParametricModelContent ||
    content instanceof HSCore.Model.Obstacle
  );
}

/**
 * Finds the closest bounding box edge to the given curve
 */
export function findLineGroupInCurves(curve: Line2d | { getStartPt(): unknown; getEndPt(): unknown }, roomCurves: unknown[]): LineGroup | undefined {
  const line = curve instanceof Line2d ? curve : new Line2d(curve.getStartPt(), curve.getEndPt());
  
  const boundingBox = new Loop(roomCurves).getBoundingBox();
  const rectangleEdges = Loop.createByRectangle(boundingBox.min, boundingBox.max).getAllCurves();
  
  const edgeGroups: LineGroup[] = [
    { index: 0, group: 'x1', line: rectangleEdges[0] },
    { index: 1, group: 'y1', line: rectangleEdges[1] },
    { index: 2, group: 'x2', line: rectangleEdges[2] },
    { index: 3, group: 'y2', line: rectangleEdges[3] }
  ];

  const ANGLE_THRESHOLD = Math.PI / 4;
  const ANGLE_UPPER_THRESHOLD = Math.PI / 4 * 7;

  return edgeGroups.find(({ line: edge }) => {
    const angle = Math.abs(edge.getDirection().angleTo(line.getDirection()));
    return angle < ANGLE_THRESHOLD || angle > ANGLE_UPPER_THRESHOLD;
  });
}

/**
 * Creates mask definitions for skeleton polygons
 */
export function getSkeletonPolygonMasks(loops: Loop[]): LoopMask[] {
  return loops.map((loop) => ({
    loop,
    style: {
      fill: 'rgb(255, 255, 255)',
      stroke: '#ff0000',
      'stroke-dasharray': 10,
      'stroke-width': 5,
      'stroke-opacity': 0.8,
      'fill-opacity': 0.3
    }
  }));
}

/**
 * Creates mask definitions for feature floor curves
 */
export function getFeatureFloorCurveMasks(features: FeatureFloorCurve[]): LoopMask[] {
  return features.map((feature) => ({
    loop: new Loop([feature.openingFloorOverlapCurve.getStartPt(), feature.openingFloorOverlapCurve.getEndPt()]),
    style: {
      fill: 'rgb(255, 255, 255)',
      stroke: '#21ffec',
      'stroke-dasharray': feature.type === 'mergedIncision' ? 10 : 0,
      'stroke-width': 5,
      'stroke-opacity': 1,
      'fill-opacity': 0.3,
      opacity: 1
    }
  }));
}

/**
 * Creates mask definitions for merged feature floor curves
 */
export function getMergedFeatureFloorCurveMasks(features: FeatureFloorCurve[]): LoopMask[] {
  return features.map((feature) => ({
    loop: new Loop([feature.openingFloorOverlapCurve.getStartPt(), feature.openingFloorOverlapCurve.getEndPt()]),
    style: {
      fill: 'rgb(255, 255, 255)',
      stroke: '#21ffec',
      'stroke-dasharray': 10,
      'stroke-width': 5,
      'stroke-opacity': 0.5,
      'fill-opacity': 0.3
    }
  }));
}

/**
 * Converts host info to a bounding box curve segment
 */
export function hostInfoToBoxCurve(hostInfo: HostInfo, roomCurves: unknown[]): Line2d {
  const boundingBox = new Loop(roomCurves).getBoundingBox();
  const rectangleEdges = Loop.createByRectangle(boundingBox.min, boundingBox.max).getAllCurves();
  
  const edgeGroups: LineGroup[] = [
    { index: 0, group: 'x1', line: rectangleEdges[0] },
    { index: 1, group: 'y1', line: rectangleEdges[1] },
    { index: 2, group: 'x2', line: rectangleEdges[2] },
    { index: 3, group: 'y2', line: rectangleEdges[3] }
  ];

  const targetEdge = edgeGroups.find(({ index }) => index === hostInfo.hostCurveIndex)!.line;
  const range = targetEdge.getRange().clone();
  const { min: rangeMin } = range;
  const rangeLength = range.getLength();
  
  const startPos = rangeMin + rangeLength * hostInfo.posParam.startParam;
  const endPos = rangeMin + rangeLength * hostInfo.posParam.endParam;
  
  return targetEdge.clone().setRange(range.set(startPos, endPos));
}

/**
 * Creates mask definitions for door floor curves
 */
export function getDoorFloorCurveMasks(doors: HostInfo[], roomCurves: unknown[]): LoopMask[] {
  return doors.map((door) => {
    const curve = hostInfoToBoxCurve(door, roomCurves);
    return {
      loop: new Loop([curve.getStartPt(), curve.getEndPt()]),
      style: {
        fill: 'rgb(255, 255, 255)',
        stroke: '#0051ff',
        'stroke-width': 5,
        'stroke-opacity': 1,
        'fill-opacity': 0.3,
        opacity: 1
      }
    };
  });
}

/**
 * Creates mask definitions for window floor curves
 */
export function getWindowFloorCurveMasks(windows: HostInfo[], roomCurves: unknown[]): LoopMask[] {
  return windows.map((window) => {
    const curve = hostInfoToBoxCurve(window, roomCurves);
    return {
      loop: new Loop([curve.getStartPt(), curve.getEndPt()]),
      style: {
        fill: 'rgb(255, 255, 255)',
        stroke: '#ff00f2',
        'stroke-width': 5,
        'stroke-opacity': 1,
        'fill-opacity': 0.3,
        opacity: 1
      }
    };
  });
}

/**
 * Creates mask definitions for polygon cuts
 */
export function getPolygonCutsMasks(cuts: PolygonCut[]): LoopMask[] {
  return cuts.map((cut) => ({
    loop: cut.selfPolygon.outerLoop,
    style: {
      fill: cut.color
    }
  }));
}

/**
 * Dispatches floor mask SVG update event to the application
 */
export function dispatchHSAppUpdateFloorMaskSVGs(floor: unknown, paths: LoopMask[]): void {
  const signal = HSApp?.App.getApp()?.pluginManager.getPlugin(HSFPConstants.PluginType.ConstraintLayout)?.signal;
  
  signal?.dispatch({
    action: 'output_update_floor_paths',
    payload: {
      floor,
      paths
    }
  });
}

function isAllowedCeilingAttachedType(contentType: HSCatalog.ContentType): boolean {
  const allowedTypes = [
    HSCatalog.ContentTypeEnum.GeneralAttachToCeiling,
    HSCatalog.ContentTypeEnum.AccessoryCeilingAttached,
    HSCatalog.ContentTypeEnum.ApplianceCeilingAttached,
    HSCatalog.ContentTypeEnum.BathroomAccessoryCeilingAttached,
    HSCatalog.ContentTypeEnum.BathroomHeater,
    HSCatalog.ContentTypeEnum.CeilingAttachedShowerHead,
    HSCatalog.ContentTypeEnum.CeilingAttachedStorageUnit,
    ...HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting
  ];
  
  return contentType.isTypeOf(allowedTypes);
}

function isOpeningOrWindowType(content: HSCore.Model.NgContent): boolean {
  return (
    content instanceof HSCore.Model.Opening ||
    content instanceof HSCore.Model.CornerWindow ||
    content instanceof HSCore.Model.Door ||
    content instanceof HSCore.Model.Window ||
    content instanceof HSCore.Model.BayWindow ||
    content instanceof HSCore.Model.CornerFlatWindow ||
    content instanceof HSCore.Model.POrdinaryWindow ||
    content instanceof HSCore.Model.ParametricOpening
  );
}