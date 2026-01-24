/**
 * 艺术类型枚举
 * 定义了图形对象的类型分类
 */
export enum ArtType {
  /** 多边形类型 */
  Poly = 0,
  /** 尺寸标注类型 */
  Dim = 1,
  /** 文本类型 */
  Text = 2
}

/**
 * 图层上下文接口
 * 定义了图形操作所需的上下文环境
 */
interface LayerContext {
  /** 当前活动图层 */
  activeLayer: Layer;
}

/**
 * 图层接口
 * 定义了图层的基本操作方法
 */
interface Layer {
  /**
   * 查找符合条件的第一个节点
   * @param predicate 查找条件函数
   * @returns 找到的节点或undefined
   */
  findOne(predicate: (node: KonvaNode) => boolean): KonvaNode | undefined;
  
  /**
   * 添加子节点到图层
   * @param node 要添加的节点
   */
  add(node: KonvaNode): void;
}

/**
 * Konva节点接口
 * 定义了Konva图形节点的通用属性和方法
 */
interface KonvaNode {
  /** 节点类型名称 */
  nodeType?: string;
  /** 类名 */
  className?: string;
  /** 节点属性集合 */
  attrs: NodeAttributes;
  
  /**
   * 判断节点是否可见
   * @returns 可见状态
   */
  visible(): boolean;
  
  /**
   * 判断节点是否正在拖拽
   * @returns 拖拽状态
   */
  isDragging(): boolean;
  
  /**
   * 判断节点是否包含指定名称
   * @param name 名称
   * @returns 是否包含
   */
  hasName(name: string): boolean;
  
  /**
   * 移动节点到指定容器
   * @param container 目标容器
   */
  moveTo(container: Layer | KonvaNode): void;
  
  /**
   * 设置节点属性
   * @param key 属性键
   * @param value 属性值
   */
  setAttr(key: string, value: unknown): void;
  
  /**
   * 显示节点
   */
  show(): void;
  
  /**
   * 查找符合条件的第一个子节点
   * @param predicate 查找条件函数
   * @returns 找到的节点或undefined
   */
  findOne(predicate: (node: KonvaNode) => boolean): KonvaNode | undefined;
}

/**
 * 节点属性接口
 * 定义了节点可能包含的各种属性
 */
interface NodeAttributes {
  /** 艺术类型 */
  artType?: ArtType;
  /** 相关数据 */
  data?: unknown;
  /** 图形对象 */
  shape?: unknown;
  /** 工具信息 */
  tool?: unknown;
  /** 机器人信息 */
  robot?: unknown;
  /** 机器人数据 */
  robData?: unknown;
  /** 命中测试函数 */
  hitFunc?: Function;
  /** 虚线样式 */
  dash?: number[];
  /** 裁剪函数 */
  clipFunc?: Function;
  /** 是否可拖拽 */
  draggable?: boolean;
}

/**
 * 多边形图形接口
 */
interface WinPolygon {
  // 多边形特定属性
}

/**
 * 文本图形接口
 */
interface Text {
  // 文本特定属性
}

/**
 * 图形创建工厂接口
 */
interface ShapeCraft {
  /**
   * 创建图形对象
   * @param source 源数据
   * @param context 上下文
   * @returns 创建的节点
   */
  create(source: unknown, context: LayerContext): KonvaNode;
}

/**
 * 图形辅助工具类型定义
 */
declare const ShapeHelper: {
  /**
   * 恢复图形的变换矩阵
   * @param shape 图形节点
   */
  restoreShapeMatrix(shape: KonvaNode): void;
};

/**
 * 图形创建工厂类型定义
 */
declare const PolyCraft: ShapeCraft;
declare const DimCraft: ShapeCraft;
declare const TextCraft: ShapeCraft;

/**
 * Konva分组类型定义
 */
declare const Group: {
  new (config: { draggable: boolean }): KonvaNode;
};

/**
 * 艺术家工具类
 * 提供图形对象的回收和复用功能
 */
export class Artisan {
  /**
   * 回收并复用图形对象
   * 从图层中查找不可见的相同类型图形进行复用，避免重复创建
   * 
   * @param shape 源图形对象（可以是多边形、文本或数组）
   * @param context 图层上下文
   * @returns 复用或新创建的图形节点
   */
  static recycleShape(
    shape: WinPolygon | Text | unknown[] | unknown,
    context: LayerContext
  ): KonvaNode;

  /**
   * 回收并复用分组对象
   * 从容器中查找不可见的分组进行复用，避免重复创建
   * 
   * @param container 容器节点
   * @param targetParent 目标父节点（可选）
   * @returns 复用或新创建的分组节点
   */
  static recycleGroup(
    container: KonvaNode,
    targetParent?: Layer | KonvaNode
  ): KonvaNode;
}