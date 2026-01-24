/**
 * 多边形树结构，用于表示多边形的层级关系
 * 通常用于剪裁操作后的结果组织
 */
export declare class PolyTree extends PolyNode {
  /**
   * 树中所有多边形节点的总数（包括所有层级）
   */
  private _total: number;

  /**
   * 构造函数
   * 初始化一个空的多边形树
   */
  constructor();

  /**
   * 获取树中所有多边形节点的总数
   * @returns 节点总数
   */
  get total(): number;

  /**
   * 获取第一个子节点
   * @returns 第一个子多边形节点，如果没有子节点则返回 undefined
   */
  getFirst(): PolyNode | undefined;

  /**
   * 从原生 PolyTree 对象创建 TypeScript PolyTree 实例
   * @param nativePolyTree - 原生的多边形树对象
   * @param nativeLib - 原生库实例（用于调用底层方法）
   * @param shouldDelete - 是否在转换后删除原生对象以释放内存
   * @returns 新创建的 PolyTree 实例
   */
  static fromNativePolyTree(
    nativePolyTree: any,
    nativeLib: any,
    shouldDelete: boolean
  ): PolyTree;
}

/**
 * 多边形节点，表示树中的单个多边形及其子多边形
 */
export declare class PolyNode {
  /**
   * 子节点列表
   */
  childs: PolyNode[];

  /**
   * 从原生 PolyNode 填充数据到 TypeScript PolyNode
   * @param targetNode - 目标节点
   * @param nativeNode - 原生节点
   * @param nativeLib - 原生库实例
   * @param parent - 父节点
   * @param depth - 当前深度
   * @param isHole - 是否为孔洞
   */
  static fillFromNativePolyNode(
    targetNode: PolyNode,
    nativeNode: any,
    nativeLib: any,
    parent: PolyNode | undefined,
    depth: number,
    isHole: boolean
  ): void;
}