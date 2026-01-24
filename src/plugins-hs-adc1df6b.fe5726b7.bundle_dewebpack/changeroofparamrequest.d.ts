/**
 * 屋顶参数修改请求
 * 用于处理屋顶参数的修改、撤销和重做操作
 */

import { HSCore } from './HSCore';

/**
 * 屋顶参数信息
 */
interface RoofParamInfo {
  /** 参数名称 */
  name: string;
  /** 参数新值 */
  value: unknown;
  /** 参数旧值 */
  oldValue: unknown;
}

/**
 * 屋顶对象接口
 */
interface IRoof {
  /**
   * 获取唯一父对象
   * @returns 父对象，可能是图层或其他类型
   */
  getUniqueParent(): unknown;
  
  /**
   * 设置屋顶参数
   * @param params 参数键值对
   */
  setParamsToRoof(params: Record<string, unknown>): void;
}

/**
 * 屋顶参数修改请求类
 * 继承自 HSCore.Transaction.Request，用于事务性修改屋顶参数
 */
export declare class ChangeRoofParamRequest extends HSCore.Transaction.Request {
  /** 屋顶对象 */
  private _roof: IRoof;
  
  /** 参数修改信息列表 */
  private _infos: RoofParamInfo[];

  /**
   * 构造函数
   * @param roof 要修改的屋顶对象
   * @param infos 参数修改信息数组
   */
  constructor(roof: IRoof, infos: RoofParamInfo[]);

  /**
   * 刷新构建器
   * 当父对象是图层时，触发房间构建器重新构建
   * @private
   */
  private _refreshBuilder(): void;

  /**
   * 提交修改
   * 应用新的参数值并刷新构建器
   * @returns 返回修改后的屋顶对象
   */
  onCommit(): IRoof;

  /**
   * 撤销修改
   * 恢复参数的旧值并刷新构建器
   */
  onUndo(): void;

  /**
   * 重做修改
   * 重新应用参数的新值并刷新构建器
   */
  onRedo(): void;
}