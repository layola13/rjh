/**
 * PatternGrid 模块类型定义
 * 用于处理图案网格的 I/O 操作和网格管理
 */

import { MixGrid, MixGrid_IO } from './MixGrid';
import { EntityEventType } from './EntityEvent';
import { PatternBlock } from './PatternBlock';
import { FreePatternBlock } from './FreePatternBlock';

/**
 * 二维坐标点接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 网格铺装选项接口
 */
interface GridPavingOption {
  /** 起始点坐标 */
  point: Point2D;
  /** X轴滑块偏移量 */
  sliderOffsetX: number;
  /** Y轴滑块偏移量 */
  sliderOffsetY: number;
  /** 旋转角度 */
  rotation: number;
}

/**
 * 完整铺装选项类型
 */
type FullPavingOption = unknown;

/**
 * PatternGrid I/O 处理类
 * 负责 PatternGrid 的序列化和反序列化操作
 */
export declare class PatternGrid_IO extends MixGrid_IO {
  /** 单例实例 */
  private static _PatternGrid_IO_instance: PatternGrid_IO | null;

  /**
   * 获取 PatternGrid_IO 的单例实例
   * @returns PatternGrid_IO 单例对象
   */
  static instance(): PatternGrid_IO;

  /**
   * 导出网格数据
   * @param grid - 要导出的 PatternGrid 实例
   * @param callback - 导出完成后的回调函数
   * @param includeChildren - 是否包含子元素，默认为 true
   * @param options - 额外的导出选项
   * @returns 导出的数据数组
   */
  dump(
    grid: PatternGrid,
    callback?: (data: unknown[], grid: PatternGrid) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 加载网格数据
   * @param grid - 目标 PatternGrid 实例
   * @param data - 要加载的数据对象
   * @param options - 加载选项
   */
  load(
    grid: PatternGrid,
    data: { fullPavingOption?: FullPavingOption | null },
    options?: Record<string, unknown>
  ): void;
}

/**
 * 图案网格类
 * 管理图案铺装、修改块和材质等
 */
export declare class PatternGrid extends MixGrid {
  /** 完整铺装选项（已废弃） */
  private _gridPavingOption: GridPavingOption;
  
  /** 完整铺装选项 */
  private _fullPavingOption: FullPavingOption | null;
  
  /** 图案块数组 */
  private _patternBlocks: PatternBlock[];

  /**
   * 构造函数
   * @param name - 网格名称，默认为空字符串
   * @param parent - 父元素
   */
  constructor(name?: string, parent?: unknown);

  /**
   * 创建新的 PatternGrid 实例
   * @returns 新的 PatternGrid 实例
   */
  static create(): PatternGrid;

  /**
   * 判断网格是否可编辑
   * @returns 始终返回 true
   */
  canEdit(): boolean;

  /**
   * 创建多边形
   * 根据父元素的图案创建多边形块
   */
  createPolygons(): void;

  /**
   * 添加已修改的块
   * @param blocks - 要添加的块数组
   */
  addModifiedBlocks(blocks: PatternBlock[]): void;

  /**
   * 移除指定的修改块
   * @param block - 要移除的块
   */
  removeModifiedBlock(block: PatternBlock): void;

  /**
   * 获取指定的修改块
   * @param block - 要查找的块
   * @returns 找到的块或 null
   */
  getModifiedBlock(block: PatternBlock): PatternBlock | null;

  /**
   * 通过键字符串获取修改块
   * @param keyInString - 块的键字符串
   * @returns 找到的块或 null
   */
  getModifiedBlockByKey(keyInString: string): PatternBlock | null;

  /**
   * 清空所有修改块
   */
  clearModifiedBlocks(): void;

  /**
   * 查找多边形索引
   * @param block - 要查找的块
   * @returns 块的索引，未找到返回 -1
   */
  private _findPolygonIndex(block: PatternBlock): number;

  /**
   * 获取 I/O 处理器实例
   * @returns PatternGrid_IO 实例
   */
  getIO(): PatternGrid_IO;

  /**
   * 根据边界获取起始点
   * @param boundary - 边界对象
   * @returns 起始点坐标
   */
  static getStartPointWithBoundary(boundary: {
    getDiscretePoints(): Point2D[];
    getInnerBoundaryPoints(): Point2D[];
  }): Point2D;

  /**
   * 迁移图案
   * @param polygon - 多边形对象
   * @param adjustOffset - 是否调整偏移量，默认为 false
   * @returns 创建的 PatternGrid 实例
   */
  static migratePattern(
    polygon: {
      grid?: PatternGrid;
      pavingOption: GridPavingOption;
      pattern: unknown;
      getMixpaint(): { onPatternChanged(pattern: unknown): void } | null;
    },
    adjustOffset?: boolean
  ): PatternGrid;

  /**
   * 创建图案
   * @param source - 源对象
   * @param target - 目标对象
   * @returns 目标对象
   */
  static createPattern(
    source: { getMixpaint(): { onPatternChanged(pattern: unknown): void } | null; pattern: unknown },
    target: { polygons?: PatternBlock[] }
  ): typeof target;

  /**
   * 更新图案多边形
   * @param polygon - 多边形对象
   * @param grid - 网格对象
   * @returns 更新后的块数组
   */
  static updatePatternPolygon(
    polygon: { pattern: unknown },
    grid: PatternGrid
  ): PatternBlock[];

  /**
   * 更新块材质映射
   * @param materialMap - 材质映射对象
   */
  updateBlockMaterialMap(materialMap: unknown): void;

  /**
   * 获取子元素材质列表
   * @returns 空数组
   */
  getChildMaterials(): unknown[];

  /**
   * 脏数据处理回调
   * @param event - 实体事件
   */
  onDirty(event: { type: EntityEventType }): void;

  /**
   * 图案重置回调
   * @param pattern - 图案对象
   */
  onPatternReset(pattern: unknown): void;

  /**
   * 图案重置覆盖回调
   * @param pattern - 图案对象
   */
  onPatternResetOverride(pattern: unknown): void;

  /**
   * 标记块为脏数据
   * @param block - 可选的块对象，不传则标记所有块
   */
  dirtyBlocks(block?: PatternBlock): void;

  /**
   * 刷新材质
   * @param block - 可选的块对象，不传则刷新所有块
   * @returns Promise 对象
   */
  refreshMaterial(block?: PatternBlock): Promise<void>;

  /**
   * 重新计算模板
   * @param polygon - 多边形对象
   * @returns PatternGrid 实例
   */
  recomputeTemplate(polygon: {
    pattern: unknown;
    grid: PatternGrid;
  }): PatternGrid | undefined;

  /**
   * 重新计算完整铺装
   * @returns 计算结果
   */
  recomputeFullPaving(): unknown;

  /**
   * 更新网格
   * 根据父元素重新计算模板和铺装
   */
  update(): void;

  /**
   * 验证网格是否有效
   * @returns 始终返回 true
   */
  isValid(): boolean;

  /**
   * 获取原始材质数据
   * @param localId - 本地 ID
   * @param pattern - 可选的图案对象
   * @returns 材质数据或 null
   */
  getOriginalMaterialData(
    localId: string,
    pattern?: { getChildByLocalId(id: string): { material: unknown } | null }
  ): unknown | null;

  /**
   * 网格铺装选项（已废弃，不要再使用）
   * @deprecated 该字段功能已废弃
   */
  gridPavingOption: GridPavingOption;

  /**
   * 完整铺装选项
   */
  fullPavingOption: FullPavingOption | null;

  /**
   * 图案块数组
   */
  patternBlocks: PatternBlock[];

  /**
   * 块数组（继承自 MixGrid）
   */
  blocks: PatternBlock[];

  /**
   * 自由图案块数组
   */
  freePatternBlocks: FreePatternBlock[];

  /**
   * 父元素引用
   */
  parent: {
    pattern: unknown;
    grid: PatternGrid;
    pavingOption: GridPavingOption;
    getMixpaint(): { onPatternChanged(pattern: unknown): void } | null;
    dirty(): void;
  };

  /**
   * 子元素集合
   */
  children: Record<string, PatternBlock | FreePatternBlock>;

  /**
   * 平面图对象（内部使用）
   */
  private _floorplan?: { loading: boolean };
}