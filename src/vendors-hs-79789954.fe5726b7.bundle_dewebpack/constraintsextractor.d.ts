/**
 * Module: ConstraintsExtractor
 * 约束提取器模块，用于从场景中提取家具和房间之间的空间约束关系
 */

import { Loop, MathAlg } from './math-library';
import { ConstraintType, RegionType } from './constraint-types';
import { ContentConstraintObjectFactory, ContentConstraintObject, FloorConstraintObject, RegionConstraintObject } from './constraint-objects';
import { EntityObject, GroupObject, RoomObject } from './scene-objects';
import { BodyOperator } from './body-operator';
import { EN_TYPE } from './enums';
import { FaceOperator } from './face-operator';
import { idGenerator } from './id-generator';
import { contentToContentConstraintRules } from './constraint-rules';
import { GroupUtil } from './group-util';
import { FakeContent } from './fake-content';
import { contentToContentBoxDump } from './content-utils';

/**
 * 面信息接口
 */
interface FaceInfo {
  /** 面类型 */
  type: EN_TYPE | string;
  /** 面ID */
  faceId: string;
  /** 修剪后的几何数据 */
  trimmed: {
    getLoops(): Array<number[]>;
  };
}

/**
 * 体操作器接口
 */
interface BodyOperatorInstance {
  /** 查找指定类型的面 */
  findFace(predicate: (face: FaceInfo) => boolean): FaceInfo | undefined;
  /** 边界面集合 */
  boundFaces: FaceInfo[];
}

/**
 * 约束数据接口
 */
interface ConstraintData {
  /** 自身面类型 */
  selfFaceType: EN_TYPE | string;
  /** 参考内容ID */
  refContentId: string;
  /** 参考面类型 */
  refFaceType: EN_TYPE | string;
  /** 距离值 */
  distance: number;
  /** 参考面ID */
  refFaceId: string;
}

/**
 * 约束对象接口
 */
interface Constraint {
  /** 约束ID */
  id: string;
  /** 内容ID */
  contentId: string;
  /** 参考内容ID */
  refContentId: string;
  /** 约束定义 */
  constraint: {
    type: ConstraintType;
    data: ConstraintData;
  };
  /** 子约束ID列表 */
  subConstraintIds: string[];
}

/**
 * 面对比结果接口
 */
interface FaceComparisonResult {
  /** 当前面 */
  face: FaceInfo;
  /** 参考面 */
  refFace: FaceInfo;
  /** 两面之间的距离 */
  distance: number;
  /** 是否在同一平面上重叠 */
  isOverlappedOnSamePlane: boolean;
}

/**
 * 房间元信息接口
 */
interface RoomMeta {
  /** 地板轮廓 */
  floorOutline: unknown[];
  /** 房间类型 */
  roomType: string;
  /** 外部曲线数量 */
  numOfOuterCurves: number;
}

/**
 * 提取结果接口
 */
interface ExtractionResult {
  /** 房间元信息 */
  roomMeta: RoomMeta;
  /** 房间特征列表 */
  roomFeatures: unknown[];
  /** 区域对象列表 */
  regionObjects: RegionConstraintObject[];
  /** 内容对象列表 */
  contentObjects: ContentConstraintObject[];
  /** 房间-区域约束 */
  roomRegionConstraints: unknown[];
  /** 区域-区域约束 */
  regionRegionConstraints: unknown[];
  /** 区域-内容约束 */
  regionContentConstraints: Constraint[];
  /** 内容-内容约束 */
  contentContentConstraints: Constraint[];
  /** 分组信息 */
  groupInfos: unknown[];
}

/**
 * 地板导出数据接口
 */
interface FloorDump {
  /** 房间类型 */
  roomType: string;
  /** 世界坐标系2D路径导出 */
  worldRawPath2dDump: {
    outer: unknown[];
  };
}

/**
 * 内容导出数据接口
 */
interface ContentBoxDump {
  id: string;
  contentType: {
    isTypeOf(type: string): boolean;
  };
  content: unknown;
  constraints: Constraint[];
  tag?: string;
  hostTag?: string;
  hostId?: string;
}

/**
 * 判断两个循环是否重叠或相交
 * @param content1 - 第一个内容对象
 * @param content2 - 第二个内容对象
 * @returns 如果循环不在对方外部则返回true
 */
function areLoopsOverlapping(
  content1: ContentConstraintObject,
  content2: ContentConstraintObject
): boolean {
  const trimmed1 = content1.trimmed;
  const trimmed2 = content2.trimmed;
  const baseTrimmed = trimmed1;
  
  const loop1 = trimmed1.getLoops()[0];
  const loop2 = trimmed2.getLoops()[0];
  
  if (!loop1?.length || !loop2?.length) {
    return false;
  }
  
  const curve2dLoop1 = new Loop(
    loop1.map(index => baseTrimmed.getCurve2d(index))
  );
  const curve2dLoop2 = new Loop(
    loop2.map(index => baseTrimmed.getCurve2d(index))
  );
  
  return MathAlg.PositionJudge.loopToLoop(curve2dLoop1, curve2dLoop2) 
    !== MathAlg.LoopLoopPositonType.OUT;
}

/**
 * 提取两个对象之间的距离约束
 * @param content - 内容约束对象
 * @param reference - 参考对象（内容或房间）
 * @returns 约束对象数组
 */
function extractDistanceConstraints(
  content: ContentConstraintObject,
  reference: ContentConstraintObject | { floorDump: FloorDump }
): Constraint[] {
  const container = EntityObject.fromContent(new FakeContent());
  
  const contentEntity = ContentConstraintObjectFactory.isContentGroupCo(content)
    ? GroupObject.fromGroupCo(content)
    : EntityObject.fromContent(content.content);
  
  const referenceEntity = reference instanceof ContentConstraintObject
    ? ContentConstraintObjectFactory.isContentGroupCo(reference)
      ? GroupObject.fromGroupCo(reference)
      : EntityObject.fromContent(reference.content)
    : RoomObject.fromFloorDump(reference.floorDump);
  
  container.add(contentEntity);
  container.add(referenceEntity);
  
  const contentBody = BodyOperator.createFromEntity(contentEntity, container);
  const referenceBody = BodyOperator.createFromEntity(referenceEntity, container);
  
  /**
   * 查找指定面类型的最近匹配面对
   */
  const findClosestFacePair = (faceType: EN_TYPE | string): FaceComparisonResult | undefined => {
    const targetFace = contentBody.findFace(face => face.type === faceType);
    if (!targetFace) return undefined;
    
    const matchingFaces = referenceBody.boundFaces
      .filter(refFace => {
        return areFacesOnSameAxis(targetFace, refFace) && areLoopsOverlapping(targetFace, refFace);
      })
      .map(refFace => ({
        face: targetFace,
        refFace,
        distance: FaceOperator.distanceFromFace1ToFace2(targetFace, refFace),
        isOverlappedOnSamePlane: areLoopsOverlapping(targetFace, refFace)
      }));
    
    matchingFaces.sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance));
    return matchingFaces[0];
  };
  
  /**
   * 判断两个面是否在同一坐标轴上
   */
  const areFacesOnSameAxis = (face1: FaceInfo, face2: FaceInfo): boolean => {
    const AXIS_GROUPS = [
      [EN_TYPE.EN_TOP, EN_TYPE.EN_BOTTOM],
      [EN_TYPE.EN_FRONT, EN_TYPE.EN_BACK, 'indexBased_x1', 'indexBased_x2'],
      [EN_TYPE.EN_LEFT, EN_TYPE.EN_RIGHT, 'indexBased_y1', 'indexBased_y2']
    ];
    
    const axisGroup = AXIS_GROUPS.find(group => group.includes(face1.type as EN_TYPE));
    return axisGroup?.some(type => face2.type === type) ?? false;
  };
  
  /**
   * 从多个面类型中选择最佳匹配
   */
  const selectBestMatch = (faceTypes: Array<EN_TYPE | string>): FaceComparisonResult | undefined => {
    const results = faceTypes.map(findClosestFacePair).filter(Boolean) as FaceComparisonResult[];
    
    results.sort((a, b) => {
      if (a.isOverlappedOnSamePlane && !b.isOverlappedOnSamePlane) return -1;
      if (!a.isOverlappedOnSamePlane && b.isOverlappedOnSamePlane) return 1;
      return Math.abs(a.distance) - Math.abs(b.distance);
    });
    
    return results[0];
  };
  
  const frontBackMatch = selectBestMatch([EN_TYPE.EN_FRONT, EN_TYPE.EN_BACK]);
  const leftRightMatch = selectBestMatch([EN_TYPE.EN_LEFT, EN_TYPE.EN_RIGHT]);
  const topBottomMatch = selectBestMatch([EN_TYPE.EN_BOTTOM, EN_TYPE.EN_TOP]);
  
  const constraints: Constraint[] = [];
  
  if (frontBackMatch && leftRightMatch && topBottomMatch) {
    [frontBackMatch, leftRightMatch, topBottomMatch].forEach(match => {
      const { face, refFace, distance } = match;
      
      const constraint: Constraint = {
        id: idGenerator(),
        contentId: content.id,
        refContentId: reference.id,
        constraint: {
          type: ConstraintType.distanceAsIs,
          data: {
            selfFaceType: face.type,
            refContentId: reference.id,
            refFaceType: refFace.type,
            distance,
            refFaceId: refFace.faceId
          }
        },
        subConstraintIds: []
      };
      
      content.constraints.push(constraint);
      constraints.push(constraint);
    });
  }
  
  return constraints;
}

/**
 * 内容对内容约束提取策略
 */
const CONTENT_TO_CONTENT_STRATEGIES: Record<RegionType, (contents: ContentConstraintObject[]) => Constraint[]> = {
  [RegionType.Bed]: (contents: ContentConstraintObject[]): Constraint[] => {
    const constraints: Constraint[] = [];
    
    for (const rule of contentToContentConstraintRules) {
      const { contentType, refContentType, constraintType, refContentFinder } = rule;
      
      const targetContents = contents.filter(c => c.contentType.isTypeOf(contentType));
      
      for (const targetContent of targetContents) {
        if (targetContent.constraints.length) continue;
        
        const candidateRefs = contents.filter(c => c.contentType.isTypeOf(refContentType));
        
        let selectedRef: ContentConstraintObject | undefined;
        if (candidateRefs.length > 1) {
          selectedRef = refContentFinder ? refContentFinder(targetContent, candidateRefs) : candidateRefs[0];
        } else if (candidateRefs.length === 1) {
          selectedRef = candidateRefs[0];
        } else {
          continue;
        }
        
        if (constraintType === ConstraintType.distanceAsIs) {
          constraints.push(...extractDistanceConstraints(targetContent, selectedRef));
        }
      }
    }
    
    return constraints;
  }
};

/**
 * 主机约束提取策略
 */
const HOST_CONSTRAINT_STRATEGIES: Record<RegionType, (region: RegionConstraintObject) => Constraint[]> = {
  [RegionType.Bed]: (region: RegionConstraintObject): Constraint[] => {
    const contents = region.contentConstraintObjects;
    const constraints: Constraint[] = [];
    
    contents.forEach(content => {
      if (content.constraints.length) return;
      
      const hostContent = contents.find(c => c.tag === content.hostTag);
      if (hostContent) {
        const extracted = extractDistanceConstraints(content, hostContent);
        content.hostId = hostContent.id;
        constraints.push(...extracted);
      }
    });
    
    return constraints;
  }
};

/**
 * 内容对区域约束提取策略
 */
const CONTENT_TO_REGION_STRATEGIES: Record<RegionType, (region: RegionConstraintObject) => Constraint[]> = {
  [RegionType.Bed]: (region: RegionConstraintObject): Constraint[] => {
    const contents = region.contentConstraintObjects;
    const constraints: Constraint[] = [];
    
    contents.forEach(content => {
      if (content.hostTag?.includes('Face')) {
        const extracted = extractDistanceConstraints(content, region);
        const faceTag = content.hostTag;
        const bodyFaceId = region.getBodyFaceIdOfFaceTag(faceTag);
        content.hostId = bodyFaceId;
        constraints.push(...extracted);
      } else {
        const hostContent = contents.find(c => c.tag === content.hostTag);
        if (hostContent?.id) {
          content.hostId = hostContent.id;
        } else {
          const faceTag = content.hostTag;
          const bodyFaceId = region.getBodyFaceIdOfFaceTag(faceTag);
          content.hostId = bodyFaceId;
        }
        constraints.push(...extractDistanceConstraints(content, region));
      }
    });
    
    return constraints;
  }
};

/**
 * 约束提取器类
 * 负责从场景数据中提取各类空间约束关系
 */
export class ConstraintsExtractor {
  /** 当前处理的区域对象 */
  private regionObject?: RegionConstraintObject;
  
  /**
   * 执行约束提取
   * @param floor - 地板对象
   * @param contents - 内容对象数组
   * @returns 提取结果
   */
  execute(floor: unknown, contents: unknown[]): ExtractionResult {
    const contentDumps = contents.map(c => contentToContentBoxDump(c));
    const floorDump = FloorConstraintObject.dumpFromFloor(floor);
    return this.executeByDumps(floorDump, contentDumps);
  }
  
  /**
   * 基于导出数据执行约束提取
   * @param floorDump - 地板导出数据
   * @param contentDumps - 内容导出数据数组
   * @returns 提取结果
   */
  executeByDumps(floorDump: FloorDump, contentDumps: ContentBoxDump[]): ExtractionResult {
    const groupResult = GroupUtil.grouping(floorDump, contentDumps);
    const regionObject = RegionConstraintObject.fromContentDumps(groupResult.dumps);
    
    regionObject.type = RegionType.Bed;
    regionObject.floorDump = floorDump;
    this.regionObject = regionObject;
    
    const hostConstraints = this.extractConstraints('host');
    const c2cConstraints = this.extractConstraints('c2c');
    const c2rConstraints = this.extractConstraints('c2r');
    
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
      regionContentConstraints: c2rConstraints,
      contentContentConstraints: [...hostConstraints, ...c2cConstraints],
      groupInfos: groupResult.extractInfos
    };
  }
  
  /**
   * 提取指定类型的约束
   * @param type - 约束类型 ('c2c' | 'c2r' | 'host')
   * @returns 约束数组
   */
  private extractConstraints(type: 'c2c' | 'c2r' | 'host'): Constraint[] {
    const { regionObject } = this;
    if (!regionObject) return [];
    
    switch (type) {
      case 'c2c':
        return CONTENT_TO_CONTENT_STRATEGIES[regionObject.type]?.(regionObject.contentConstraintObjects) ?? [];
      case 'c2r':
        return CONTENT_TO_REGION_STRATEGIES[regionObject.type]?.(regionObject) ?? [];
      case 'host':
        return HOST_CONSTRAINT_STRATEGIES[regionObject.type]?.(regionObject) ?? [];
      default:
        return [];
    }
  }
}