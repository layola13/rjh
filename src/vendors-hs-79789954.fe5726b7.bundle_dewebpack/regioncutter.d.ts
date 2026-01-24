/**
 * RegionCutter - 区域切割器
 * 用于从多边形区域中提取特征并生成楼层切割方案
 */

import { MathAlg, Tolerance } from './math-module'; // 假设模块路径
import { Polygon } from './polygon-module';
import { FeatureExtractor } from './feature-extractor-module';
import { findLineGroupInCurves } from './geometry-utils';
import { ExpandRegionFeature } from './expand-region-feature';

/**
 * 特征提取器构造函数类型
 */
type FeatureExtractorConstructor = new (...args: any[]) => any;

/**
 * 开口信息接口
 */
interface Opening {
  // 根据实际使用情况定义属性
  [key: string]: any;
}

/**
 * 提示框接口
 */
interface HintBox {
  /** 带边距的包围盒 */
  marginedBox: {
    getSize(): { x: number; y: number };
  };
  [key: string]: any;
}

/**
 * 楼层上下文信息
 */
interface FloorContext {
  /** 开口列表 */
  openings: Opening[];
  /** 提示框列表 */
  hintBoxes: HintBox[];
  /** 最小盒子尺寸 */
  minBoxDimension: number;
}

/**
 * 位置参数 - 描述特征在宿主曲线上的相对位置
 */
interface PositionParam {
  /** 起始参数 (0-1之间的归一化值) */
  startParam: number;
  /** 结束参数 (0-1之间的归一化值) */
  endParam: number;
  /** 中心参数 (0-1之间的归一化值) */
  centerParam: number;
}

/**
 * 特征宿主信息 - 描述特征在楼层中的位置和属性
 */
interface FeatureHostInfo {
  /** 曲线分组信息 */
  group: any;
  /** 宿主曲线索引 */
  hostCurveIndex: number;
  /** 开口索引 (-1表示特征类型) */
  openingIndex: number;
  /** 位置参数 */
  posParam: PositionParam;
  /** 关联的特征对象 */
  feature: ExtractedFeature;
  /** 开口与楼层的重叠曲线 */
  openingFloorOverlapCurve: any;
  /** 内容类型 */
  contentType: string;
  /** 分类ID */
  categoryId: string;
  /** 宿主曲线长度 */
  hostCurveLength: number;
  /** 连接房间类型 */
  linkRoomType: string;
  /** Z轴底部高度 */
  zBottom: number;
  /** Z轴顶部高度 */
  zTop: number;
  /** 开口类型 */
  openingType: string;
}

/**
 * 特征宿主信息集合
 */
interface FeatureHostInfoCollection {
  /** 底部轮廓几何集合WKT格式 */
  bottomProfileGeomCollectionWKT: string;
  /** 中心点几何集合WKT格式 */
  centerPtsGeomCollectionWKT: string;
  /** 中心点多点WKT格式 */
  centerPtsMultiPointWKT: string;
  /** 宿主曲线索引字符串 */
  hostCurveIndexStr: string;
  /** 特征数量 */
  count: number;
  /** 归一化类型 */
  normalizedType: string;
  /** 开口类型 */
  openingType: string;
  /** 宿主信息列表 */
  hostInfos: FeatureHostInfo[];
}

/**
 * 提取的特征接口
 */
interface ExtractedFeature {
  /** 特征自身的多边形 */
  selfPolygon: Polygon;
  /** 转换后的目标多边形 */
  toPolygon: Polygon;
  /**
   * 获取与指定曲线的重叠部分
   * @param curves - 曲线数组
   * @returns 重叠信息，包含特征曲线和楼层曲线
   */
  getOverlapCurveWith(curves: any[]): {
    featureCurve: any;
    floorCurve: any;
    feature: ExtractedFeature;
  } | undefined;
}

/**
 * 楼层切割结果
 */
interface FloorCutResult {
  /** 楼层外轮廓环 */
  floorOuterLoop: any;
  /** 特征宿主信息集合 */
  featureHostInfos: FeatureHostInfoCollection;
}

/**
 * 默认特征提取器列表
 */
const DEFAULT_FEATURE_EXTRACTORS: FeatureExtractorConstructor[] = [
  ExpandRegionFeature
];

/**
 * 区域切割器类
 * 负责从目标多边形中迭代提取特征，生成楼层切割方案
 */
export class RegionCutter {
  /** 目标多边形 - 原始输入多边形 */
  private readonly targetPolygon: Polygon;
  
  /** 当前多边形 - 每次提取特征后更新 */
  private currentPolygon: Polygon;
  
  /** 禁止区域环列表 - 与禁止区域相交的特征会被过滤 */
  private readonly forbiddenAreaLoops: any[] = [];
  
  /** 必须包含的提示框列表 */
  private readonly shouldContainHintBoxes: HintBox[];
  
  /** 楼层上下文信息 */
  private readonly floorContext: FloorContext;
  
  /** 特征提取器列表 */
  private readonly extractors: FeatureExtractor[];
  
  /** 所有步骤提取的特征列表的列表 */
  private readonly featureLists: ExtractedFeature[][] = [];
  
  /** 当前步骤提取的特征列表 */
  private currentStepExtractedFeatures: ExtractedFeature[] = [];

  /**
   * 最小有效特征曲线长度阈值（米）
   */
  private static readonly MIN_FEATURE_CURVE_LENGTH = 0.5;

  /**
   * 最大迭代次数限制
   */
  private static readonly MAX_ITERATIONS = 100;

  /**
   * 最小多边形曲线数量阈值
   */
  private static readonly MIN_POLYGON_CURVES = 5;

  /**
   * 默认楼层高度范围（米）
   */
  private static readonly DEFAULT_Z_BOTTOM = 0;
  private static readonly DEFAULT_Z_TOP = 2.8;

  /**
   * 构造函数
   * @param outerLoop - 外轮廓环数据
   * @param openings - 开口列表
   * @param hintBoxes - 提示框列表
   * @param featureExtractors - 特征提取器构造函数列表，默认使用ExpandRegionFeature
   */
  constructor(
    outerLoop: any,
    openings: Opening[],
    hintBoxes: HintBox[],
    featureExtractors: FeatureExtractorConstructor[] = DEFAULT_FEATURE_EXTRACTORS
  ) {
    const polygon = new Polygon(outerLoop);
    this.targetPolygon = polygon;
    this.currentPolygon = polygon;
    this.shouldContainHintBoxes = hintBoxes;

    // 计算所有提示框的最小尺寸
    const minBoxDimension = hintBoxes.reduce(
      (minSize, box) => {
        const size = box.marginedBox.getSize();
        return Math.min(minSize, size.x, size.y);
      },
      Number.MAX_VALUE
    );

    this.floorContext = {
      openings,
      hintBoxes,
      minBoxDimension
    };

    // 初始化特征提取器实例
    this.extractors = featureExtractors.map(
      ExtractorClass => new FeatureExtractor(ExtractorClass, this.floorContext)
    );
  }

  /**
   * 是否满足终止条件
   * 当以下任一条件满足时终止：
   * - 当前步骤未提取到任何特征
   * - 目标多边形曲线数量小于5
   * - 当前多边形曲线数量小于5
   */
  private get isMeetTerminateCondition(): boolean {
    return (
      this.currentStepExtractedFeatures.length === 0 ||
      this.targetPolygon.curves.length < RegionCutter.MIN_POLYGON_CURVES ||
      this.currentPolygon.curves.length < RegionCutter.MIN_POLYGON_CURVES
    );
  }

  /**
   * 执行区域切割
   * 迭代提取特征，直到满足终止条件或达到最大迭代次数
   * @returns 楼层切割结果数组，每个结果包含楼层轮廓和特征信息
   */
  public execute(): FloorCutResult[] {
    let iterationCount = 0;

    // 迭代提取特征
    do {
      const extractedFeatures: ExtractedFeature[] = [];

      // 使用所有提取器提取特征
      for (const extractor of this.extractors) {
        const features = extractor.extractFrom(this.currentPolygon);

        for (const feature of features) {
          // 检查特征是否与禁止区域相交
          if (this._isFeatureIntersectForbiddenArea(feature)) {
            this.forbiddenAreaLoops.push(feature.selfPolygon.outerLoop);
          } else {
            this.currentPolygon = feature.toPolygon;
            extractedFeatures.push(feature);
          }
        }
      }

      this.featureLists.push(extractedFeatures);
      this.currentStepExtractedFeatures = extractedFeatures;
      iterationCount++;
    } while (
      !this.isMeetTerminateCondition &&
      iterationCount < RegionCutter.MAX_ITERATIONS
    );

    // 获取有效的特征宿主信息
    const allFeatures = this.featureLists.flat();
    const validFeatureHostInfos = this._getValidFeatureHostInfos(allFeatures);

    const results: FloorCutResult[] = [];
    if (validFeatureHostInfos.length === 0) {
      return results;
    }

    // 为每个累积的特征集生成结果
    for (let i = 0; i < validFeatureHostInfos.length; i++) {
      const featuresUpToIndex = validFeatureHostInfos.slice(0, i + 1);
      const adjacentFeatures = this._filterOutNonAdjacentFeature(featuresUpToIndex);
      const lastFeature = adjacentFeatures.at(-1)!.feature;

      results.push({
        floorOuterLoop: lastFeature.toPolygon.outerLoop,
        featureHostInfos: this._getFeatureHostInfos(adjacentFeatures)
      });
    }

    return results;
  }

  /**
   * 过滤掉非相邻的特征
   * 保留与最后一个特征的多边形相交的特征
   * @param features - 特征宿主信息数组
   * @returns 过滤后的相邻特征数组
   */
  private _filterOutNonAdjacentFeature(
    features: FeatureHostInfo[]
  ): FeatureHostInfo[] {
    if (features.length < 2) {
      return features;
    }

    const lastFeatureLoop = features.at(-1)!.feature.toPolygon.outerLoop;

    return features.filter(({ feature }) => {
      const positionType = MathAlg.PositionJudge.loopToLoop(
        feature.selfPolygon.outerLoop,
        lastFeatureLoop,
        undefined,
        true
      );
      return positionType === MathAlg.LoopLoopPositonType.INTERSECT;
    });
  }

  /**
   * 构建特征宿主信息集合
   * @param features - 特征宿主信息数组
   * @returns 特征宿主信息集合对象
   */
  private _getFeatureHostInfos(
    features: FeatureHostInfo[]
  ): FeatureHostInfoCollection {
    return {
      bottomProfileGeomCollectionWKT: '',
      centerPtsGeomCollectionWKT: '',
      centerPtsMultiPointWKT: '',
      hostCurveIndexStr: '',
      count: features.length,
      normalizedType: 'centroid',
      openingType: 'feature',
      hostInfos: features
    };
  }

  /**
   * 获取有效的特征宿主信息列表
   * 过滤掉曲线长度小于阈值或无法匹配宿主曲线的特征
   * @param features - 提取的特征数组
   * @returns 有效的特征宿主信息数组
   */
  private _getValidFeatureHostInfos(
    features: ExtractedFeature[]
  ): FeatureHostInfo[] {
    const validInfos: FeatureHostInfo[] = [];

    if (features.length < 1) {
      return validInfos;
    }

    for (const feature of features) {
      const allCurves = feature.toPolygon.outerLoop.getAllCurves();
      const overlapInfo = feature.getOverlapCurveWith(allCurves);

      // 检查特征曲线是否存在且长度满足阈值
      if (
        !overlapInfo?.featureCurve ||
        overlapInfo.featureCurve.getLength() <= RegionCutter.MIN_FEATURE_CURVE_LENGTH
      ) {
        continue;
      }

      // 在楼层曲线中查找宿主曲线组
      const lineGroup = findLineGroupInCurves(
        overlapInfo.floorCurve,
        allCurves
      );

      if (!lineGroup) {
        continue;
      }

      const { featureCurve } = overlapInfo;
      const hostLine = lineGroup.line;
      const hostRange = hostLine.getRange();
      const hostLength = hostRange.getLength();
      const hostMin = hostRange.min;

      // 计算特征在宿主曲线上的归一化参数
      const featureStartParam = hostLine.getParamAt(featureCurve.getStartPt());
      const featureEndParam = hostLine.getParamAt(featureCurve.getEndPt());
      const normalizedStart = (featureStartParam - hostMin) / hostLength;
      const normalizedEnd = (featureEndParam - hostMin) / hostLength;

      const startParam = Math.min(normalizedStart, normalizedEnd);
      const endParam = Math.max(normalizedStart, normalizedEnd);
      const centerParam = (startParam + endParam) / 2;

      const hostInfo: FeatureHostInfo = {
        group: lineGroup.group,
        hostCurveIndex: lineGroup.index,
        openingIndex: -1,
        posParam: {
          startParam,
          endParam,
          centerParam
        },
        feature: overlapInfo.feature,
        openingFloorOverlapCurve: overlapInfo.featureCurve,
        contentType: 'feature',
        categoryId: 'feature-category',
        hostCurveLength: hostLine.getLength(),
        linkRoomType: 'none',
        zBottom: RegionCutter.DEFAULT_Z_BOTTOM,
        zTop: RegionCutter.DEFAULT_Z_TOP,
        openingType: 'feature'
      };

      validInfos.push(hostInfo);
    }

    return validInfos;
  }

  /**
   * 判断特征是否与禁止区域相交
   * @param feature - 待检查的特征
   * @returns true表示相交，false表示不相交
   */
  private _isFeatureIntersectForbiddenArea(feature: ExtractedFeature): boolean {
    return this.forbiddenAreaLoops.some(forbiddenLoop => {
      const positionType = MathAlg.PositionJudge.loopToLoop(
        forbiddenLoop,
        feature.selfPolygon.outerLoop,
        Tolerance.LENGTH_EPS,
        true
      );
      return positionType !== MathAlg.LoopLoopPositonType.OUT;
    });
  }
}