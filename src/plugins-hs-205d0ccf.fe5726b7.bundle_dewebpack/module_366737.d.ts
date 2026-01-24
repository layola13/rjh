/**
 * 户型图面积展示类型枚举
 */
declare namespace HSCore.Model {
  /**
   * 面积展示类型枚举
   */
  enum FloorplanDisplayAreaEnum {
    /** 外框面积 */
    Outside = 0,
    /** 套内面积 */
    Inside = 1,
    /** 使用面积 */
    Used = 2
  }
}

/**
 * 日志分组类型常量
 */
declare namespace HSFPConstants {
  enum LogGroupTypes {
    /** 墙体操作 */
    WallOperation = "WallOperation"
  }
}

/**
 * 事务请求基类
 */
declare namespace HSCore.Transaction {
  /**
   * 事务请求基类
   * 所有可撤销/重做的操作都应继承此类
   */
  abstract class Request {
    /**
     * 提交事务时调用
     */
    abstract onCommit(): void;

    /**
     * 撤销事务时调用
     */
    abstract onUndo(): void;

    /**
     * 重做事务时调用
     */
    abstract onRedo(): void;

    /**
     * 获取操作描述文本
     * @returns 操作描述
     */
    abstract getDescription(): string;

    /**
     * 获取操作分类
     * @returns 操作分类标识
     */
    abstract getCategory(): string;
  }
}

/**
 * 户型图数据接口
 */
interface IFloorplanData {
  /** 当前面积展示类型 */
  displayAreaType: HSCore.Model.FloorplanDisplayAreaEnum;
}

/**
 * 面积展示类型数据快照
 */
interface IDisplayAreaTypeSnapshot {
  /** 保存的面积展示类型 */
  displayAreaType: HSCore.Model.FloorplanDisplayAreaEnum;
}

/**
 * 切换户型图面积展示类型的事务请求
 * 
 * 该类实现了户型图面积展示类型（外框/套内/使用）的切换功能，
 * 支持撤销和重做操作。
 * 
 * @example
 *