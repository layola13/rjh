import { Loop, MathAlg } from './math-utils';
import { ConstraintType, RegionType } from './constraint-types';
import { EntityObject, GroupObject, RoomObject, contentToContentBoxDump } from './entity-objects';
import { ContentConstraintObjectFactory, ContentConstraintObject, FloorConstraintObject, RegionConstraintObject } from './constraint-objects';
import { BodyOperator } from './body-operator';
import { EN_TYPE } from './entity-types';
import { FaceOperator } from './face-operator';
import { idGenerator } from './id-generator';
import { contentToContentConstraintRules } from './constraint-rules';
import { GroupUtil } from './group-util';
import { FakeContent } from './fake-content';

interface Face {
  type: string;
  faceId: string;
  trimmed: {
    getLoops(): number[][];
    getCurve2d(index: number): unknown;
  };
}

interface BodyOperatorInstance {
  findFace(predicate: (face: Face) => boolean): Face | undefined;
  boundFaces: Face[];
}

interface ConstraintData {
  selfFaceType: string;
  refContentId: string;
  refFaceType: string;
  distance: number;
  refFaceId: string;
}

interface Constraint {
  id: string;
  contentId: string;
  refContentId: string;
  constraint: {
    type: ConstraintType;
    data: ConstraintData;
  };
  subConstraintIds: string[];
}

interface ContentConstraintObjectWithConstraints extends ContentConstraintObject {
  id: string;
  constraints: Constraint[];
  contentType: {
    isTypeOf(type: string): boolean;
  };
  tag?: string;
  hostTag?: string;
  hostId?: string;
}

interface RegionConstraintObjectWithMethods extends RegionConstraintObject {
  type: RegionType;
  floorDump: unknown;
  contentConstraintObjects: ContentConstraintObjectWithConstraints[];
  getBodyFaceIdOfFaceTag(tag: string): string;
}

interface FaceConstraintInfo {
  face: Face;
  refFace: Face;
  distance: number;
  isOverlappedOnSamePlane: boolean;
}

interface RoomMeta {
  floorOutline: unknown[];
  roomType: string;
  numOfOuterCurves: number;
}

interface ExtractionResult {
  roomMeta: RoomMeta;
  roomFeatures: unknown[];
  regionObjects: RegionConstraintObjectWithMethods[];
  contentObjects: ContentConstraintObjectWithConstraints[];
  roomRegionConstraints: unknown[];
  regionRegionConstraints: unknown[];
  regionContentConstraints: Constraint[];
  contentContentConstraints: Constraint[];
  groupInfos: unknown[];
}

interface FloorDump {
  roomType: string;
  worldRawPath2dDump: {
    outer: unknown[];
  };
}

interface GroupingResult {
  dumps: unknown[];
  extractInfos: unknown[];
}

const AXIS_FACE_TYPE_GROUPS = [
  [EN_TYPE.EN_TOP, EN_TYPE.EN_BOTTOM],
  [EN_TYPE.EN_FRONT, EN_TYPE.EN_BACK, "indexBased_x1", "indexBased_x2"],
  [EN_TYPE.EN_LEFT, EN_TYPE.EN_RIGHT, "indexBased_y1", "indexBased_y2"]
];

function checkLoopOverlap(face1: Face, face2: Face): boolean {
  const trimmed1 = face1.trimmed;
  const trimmed2 = face2.trimmed;
  const surface = trimmed1;
  const loop1Data = trimmed1.getLoops()[0];
  const loop2Data = trimmed2.getLoops()[0];
  
  if (!loop1Data?.length || !loop2Data?.length) {
    return false;
  }
  
  const loop1 = new Loop(loop1Data.map(index => surface.getCurve2d(index)));
  const loop2 = new Loop(loop2Data.map(index => surface.getCurve2d(index)));
  
  return MathAlg.PositionJudge.loopToLoop(loop1, loop2) !== MathAlg.LoopLoopPositonType.OUT;
}

function areFacesOnSameAxis(face1: Face, face2: Face): boolean {
  return AXIS_FACE_TYPE_GROUPS
    .find(group => group.includes(face1.type))
    ?.some(faceType => face2.type === faceType) ?? false;
}

function extractConstraintsBetweenObjects(
  sourceObject: ContentConstraintObjectWithConstraints,
  targetObject: ContentConstraintObjectWithConstraints | { floorDump: unknown }
): Constraint[] {
  const containerEntity = EntityObject.fromContent(new FakeContent());
  
  const sourceEntity = ContentConstraintObjectFactory.isContentGroupCo(sourceObject)
    ? GroupObject.fromGroupCo(sourceObject)
    : EntityObject.fromContent(sourceObject.content);
    
  const targetEntity = targetObject instanceof ContentConstraintObject
    ? (ContentConstraintObjectFactory.isContentGroupCo(targetObject)
        ? GroupObject.fromGroupCo(targetObject)
        : EntityObject.fromContent(targetObject.content))
    : RoomObject.fromFloorDump(targetObject.floorDump);
  
  containerEntity.add(sourceEntity);
  containerEntity.add(targetEntity);
  
  const sourceBodyOp = BodyOperator.createFromEntity(sourceEntity, containerEntity);
  const targetBodyOp = BodyOperator.createFromEntity(targetEntity, containerEntity);
  
  const findClosestFaceForType = (faceType: string): FaceConstraintInfo | undefined => {
    const sourceFace = sourceBodyOp.findFace(face => face.type === faceType);
    if (!sourceFace) return undefined;
    
    const matchingFaces = targetBodyOp.boundFaces
      .filter(targetFace => 
        areFacesOnSameAxis(sourceFace, targetFace) && 
        checkLoopOverlap(sourceFace, targetFace)
      )
      .map(targetFace => ({
        face: sourceFace,
        refFace: targetFace,
        distance: FaceOperator.distanceFromFace1ToFace2(sourceFace, targetFace),
        isOverlappedOnSamePlane: checkLoopOverlap(sourceFace, targetFace)
      }));
    
    matchingFaces.sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance));
    return matchingFaces[0];
  };
  
  const findBestMatchFromTypes = (faceTypes: string[]): FaceConstraintInfo | undefined => {
    const matches = faceTypes.map(findClosestFaceForType).filter(Boolean) as FaceConstraintInfo[];
    
    matches.sort((a, b) => {
      if (a.isOverlappedOnSamePlane && !b.isOverlappedOnSamePlane) return -1;
      if (!a.isOverlappedOnSamePlane && b.isOverlappedOnSamePlane) return 1;
      return Math.abs(a.distance) - Math.abs(b.distance);
    });
    
    return matches[0];
  };
  
  const frontBackMatch = findBestMatchFromTypes([EN_TYPE.EN_FRONT, EN_TYPE.EN_BACK]);
  const leftRightMatch = findBestMatchFromTypes([EN_TYPE.EN_LEFT, EN_TYPE.EN_RIGHT]);
  const topBottomMatch = findBestMatchFromTypes([EN_TYPE.EN_BOTTOM, EN_TYPE.EN_TOP]);
  
  const constraints: Constraint[] = [];
  
  if (frontBackMatch && leftRightMatch && topBottomMatch) {
    [frontBackMatch, leftRightMatch, topBottomMatch].forEach(match => {
      const { face, refFace, distance } = match;
      const constraint: Constraint = {
        id: idGenerator(),
        contentId: sourceObject.id,
        refContentId: (targetObject as ContentConstraintObjectWithConstraints).id,
        constraint: {
          type: ConstraintType.distanceAsIs,
          data: {
            selfFaceType: face.type,
            refContentId: (targetObject as ContentConstraintObjectWithConstraints).id,
            refFaceType: refFace.type,
            distance: distance,
            refFaceId: refFace.faceId
          }
        },
        subConstraintIds: []
      };
      
      sourceObject.constraints.push(constraint);
      constraints.push(constraint);
    });
  }
  
  return constraints;
}

const contentToContentExtractors: Record<RegionType, (contents: ContentConstraintObjectWithConstraints[]) => Constraint[]> = {
  [RegionType.Bed]: (contents: ContentConstraintObjectWithConstraints[]): Constraint[] => {
    const constraints: Constraint[] = [];
    
    for (const rule of contentToContentConstraintRules) {
      const { contentType, refContentType, constraintType, refContentFinder } = rule;
      const sourceContents = contents.filter(content => content.contentType.isTypeOf(contentType));
      
      for (const sourceContent of sourceContents) {
        if (sourceContent.constraints.length) continue;
        
        const candidateTargets = contents.filter(content => content.contentType.isTypeOf(refContentType));
        
        let targetContent: ContentConstraintObjectWithConstraints | undefined;
        
        if (candidateTargets.length > 1) {
          targetContent = refContentFinder ? refContentFinder(sourceContent, candidateTargets) : candidateTargets[0];
        } else if (candidateTargets.length === 1) {
          targetContent = candidateTargets[0];
        } else {
          continue;
        }
        
        if (constraintType === ConstraintType.distanceAsIs) {
          constraints.push(...extractConstraintsBetweenObjects(sourceContent, targetContent));
        }
      }
    }
    
    return constraints;
  }
};

const hostConstraintExtractors: Record<RegionType, (region: RegionConstraintObjectWithMethods) => Constraint[]> = {
  [RegionType.Bed]: (region: RegionConstraintObjectWithMethods): Constraint[] => {
    const contents = region.contentConstraintObjects;
    const constraints: Constraint[] = [];
    
    contents.forEach(content => {
      if (content.constraints.length) return;
      
      const hostContent = contents.find(c => c.tag === content.hostTag);
      
      if (hostContent) {
        const extractedConstraints = extractConstraintsBetweenObjects(content, hostContent);
        content.hostId = hostContent.id;
        constraints.push(...extractedConstraints);
      }
    });
    
    return constraints;
  }
};

const contentToRegionExtractors: Record<RegionType, (region: RegionConstraintObjectWithMethods) => Constraint[]> = {
  [RegionType.Bed]: (region: RegionConstraintObjectWithMethods): Constraint[] => {
    const contents = region.contentConstraintObjects;
    const constraints: Constraint[] = [];
    
    contents.forEach(content => {
      if (content.hostTag?.includes("Face")) {
        const extractedConstraints = extractConstraintsBetweenObjects(content, region);
        const faceTag = content.hostTag;
        const bodyFaceId = region.getBodyFaceIdOfFaceTag(faceTag);
        content.hostId = bodyFaceId;
        constraints.push(...extractedConstraints);
      } else {
        const hostContentId = contents.find(c => c.tag === content.hostTag)?.id;
        
        if (hostContentId) {
          content.hostId = hostContentId;
        } else {
          const faceTag = content.hostTag;
          if (faceTag) {
            const bodyFaceId = region.getBodyFaceIdOfFaceTag(faceTag);
            content.hostId = bodyFaceId;
          }
        }
        
        constraints.push(...extractConstraintsBetweenObjects(content, region));
      }
    });
    
    return constraints;
  }
};

export class ConstraintsExtractor {
  private regionObject!: RegionConstraintObjectWithMethods;
  
  execute(floor: unknown, contents: ContentConstraintObject[]): ExtractionResult {
    const contentDumps = contents.map(content => contentToContentBoxDump(content));
    const floorConstraint = FloorConstraintObject.dumpFromFloor(floor);
    return this.executeByDumps(floorConstraint, contentDumps);
  }
  
  executeByDumps(floorDump: FloorDump, contentDumps: unknown[]): ExtractionResult {
    const groupingResult: GroupingResult = GroupUtil.grouping(floorDump, contentDumps);
    const regionObject = RegionConstraintObject.fromContentDumps(groupingResult.dumps) as RegionConstraintObjectWithMethods;
    
    regionObject.type = RegionType.Bed;
    regionObject.floorDump = floorDump;
    this.regionObject = regionObject;
    
    const hostConstraints = this.extractConstraints("host");
    const contentToContentConstraints = this.extractConstraints("c2c");
    const contentToRegionConstraints = this.extractConstraints("c2r");
    
    return {
      roomMeta: {
        floorOutline: [],
        roomType: floorDump.roomType,
        numOfOuterCurves: floorDump.worldRawPath2dDump.outer.length
      },
      roomFeatures: [],
      regionObjects: [regionObject],
      contentObjects: [...regionObject.contentConstraintObjects],
      roomRegionConstraints: [],
      regionRegionConstraints: [],
      regionContentConstraints: contentToRegionConstraints,
      contentContentConstraints: [...hostConstraints, ...contentToContentConstraints],
      groupInfos: groupingResult.extractInfos
    };
  }
  
  private extractConstraints(constraintCategory: "c2c" | "c2r" | "host"): Constraint[] {
    const { regionObject } = this;
    
    switch (constraintCategory) {
      case "c2c":
        return contentToContentExtractors[regionObject.type]?.(regionObject.contentConstraintObjects) ?? [];
      case "c2r":
        return contentToRegionExtractors[regionObject.type]?.(regionObject) ?? [];
      case "host":
        return hostConstraintExtractors[regionObject.type]?.(regionObject) ?? [];
      default:
        return [];
    }
  }
}