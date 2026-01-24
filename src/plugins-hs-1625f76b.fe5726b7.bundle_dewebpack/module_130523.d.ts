/**
 * 应用参数到所有Opening实体的命令类
 * 该命令会将模板实体的参数（如离地高度）应用到场景中所有相同类型的Opening实体
 */

import { HSApp } from '../../518193';
import { HSCore } from '../../635589';

/**
 * Opening实体接口
 */
interface IOpeningEntity {
  /** 实体唯一标识符 */
  id: string;
  
  /** 实体查找ID */
  seekId: string;
  
  /**
   * 检查实体是否设置了指定标志位
   * @param flags - 要检查的标志位（可以是位运算组合）
   * @returns 是否包含指定标志
   */
  isFlagOn(flags: number): boolean;
}

/**
 * 图层接口
 */
interface ILayer {
  /**
   * 遍历图层中的所有Opening实体
   * @param callback - 对每个Opening执行的回调函数
   */
  forEachOpening(callback: (opening: IOpeningEntity) => void): void;
}

/**
 * 场景接口
 */
interface IScene {
  /**
   * 遍历场景中的所有图层
   * @param callback - 对每个图层执行的回调函数
   */
  forEachLayer(callback: (layer: ILayer) => void): void;
}

/**
 * 楼层平面图接口
 */
interface IFloorplan {
  /** 场景对象 */
  scene: IScene;
}

/**
 * 应用程序实例接口
 */
interface IAppInstance {
  /** 楼层平面图对象 */
  floorplan: IFloorplan;
  
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 事务请求接口
 */
interface ITransactionRequest {
  /** 请求类型 */
  type: string;
  
  /** 请求参数 */
  params: unknown[];
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建一个事务请求
   * @param requestType - 请求类型常量
   * @param params - 请求参数数组：[模板实体, 目标实体数组]
   * @returns 事务请求对象
   */
  createRequest(
    requestType: string,
    params: [IOpeningEntity, IOpeningEntity[]]
  ): ITransactionRequest;
  
  /**
   * 提交事务请求
   * @param request - 要提交的事务请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 命令基类
 */
declare class Command {
  /**
   * 执行命令的抽象方法
   */
  onExecute(): void;
  
  /**
   * 判断命令是否可以撤销/重做
   * @returns 是否支持撤销重做
   */
  canUndoRedo(): boolean;
  
  /**
   * 获取命令的描述信息
   * @returns 命令描述字符串
   */
  getDescription(): string;
}

/**
 * 应用参数到所有Opening实体的命令
 * 
 * @remarks
 * 该命令会：
 * 1. 获取场景中所有与模板实体类型相同的Opening实体
 * 2. 排除模板实体自身
 * 3. 排除已隐藏或已删除的实体
 * 4. 通过事务管理器批量应用参数
 * 
 * @example
 *