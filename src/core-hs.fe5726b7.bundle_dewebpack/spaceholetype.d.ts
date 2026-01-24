/**
 * 空间孔洞类型枚举
 * 定义了各种类型的孔洞用于家具制造
 */
export enum SpaceHoleType {
  /** 铰链孔 */
  Hinge = 1,
  /** 三合一连接件孔 */
  ThreeInOne = 2,
  /** 槽孔 */
  Groove = 3,
  /** 柄孔 */
  Shank = 4
}

/**
 * 空间孔洞实体类
 * 管理实体对象上的孔洞集合
 */
export declare class SpaceHole extends Entity {
  private _spaceHoles: unknown[];

  /**
   * 设置空间孔洞数组
   * @param holes - 孔洞数据数组
   */
  set spaceHoles(holes: unknown[]);

  /**
   * 获取空间孔洞数组
   * @returns 当前的孔洞数据数组
   */
  get spaceHoles(): unknown[];

  /**
   * 清空所有空间孔洞
   * 清空后会标记几何体为脏状态以触发重新渲染
   */
  clearSpaceHoles(): void;

  /**
   * 判断是否需要序列化
   * @returns 始终返回false，表示不需要序列化
   */
  needDump(): boolean;

  /**
   * 判断是否可以进行事务操作
   * @returns 始终返回false，表示不支持事务
   */
  canTransact(): boolean;
}

/**
 * Entity基类声明（从依赖模块导入）
 */
declare class Entity {
  /**
   * 标记几何体为脏状态，触发重新计算和渲染
   */
  protected dirtyGeometry(): void;

  /**
   * 注册实体类到类型系统
   * @param classType - 模型类类型标识
   * @param classConstructor - 类构造函数
   */
  static registerClass(classType: string, classConstructor: new (...args: any[]) => Entity): void;
}

/**
 * 全局常量声明
 */
declare const HSConstants: {
  ModelClass: {
    SpaceHole: string;
  };
};