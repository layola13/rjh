/**
 * 楼板编辑多边形绘制命令模块
 * @module CmdDrawPolygons
 */

import { Vector2, Loop } from './GeometryTypes';
import { TransactionManager } from './TransactionManager';
import { Sketch2dBuilder } from './Sketch2dBuilder';
import { CmdDrawExLines } from './CmdDrawExLines';

/**
 * 楼板编辑多边形绘制命令类
 * 继承自CmdDrawExLines，用于在楼板编辑模式下绘制多边形洞口
 */
export declare class CmdDrawPolygons extends CmdDrawExLines {
  /**
   * 草图2D构建器实例
   */
  readonly sketch2dBuilder: Sketch2dBuilder;

  /**
   * 构造函数
   * @param sketch2dBuilder - 草图2D构建器实例
   */
  constructor(sketch2dBuilder: Sketch2dBuilder);

  /**
   * 创建绘制多边形的请求
   * @param polygons - 多边形顶点数组集合，每个多边形由一组Vector2坐标点定义
   * @returns 返回事务请求对象
   * @remarks
   * - 过滤掉少于3个顶点的多边形
   * - 检查首尾点是否闭合
   * - 将有效多边形转换为Loop对象
   */
  protected _createRequest(polygons: Vector2[][]): unknown;

  /**
   * 显示操作提示信息
   * @param polygons - 多边形顶点数组集合
   * @remarks
   * 根据多边形有效性显示不同提示：
   * - 若存在无效多边形：显示"多边形无效"提示
   * - 若多边形未闭合：显示"请闭合多边形末端"提示
   * - 提示持续时间5秒
   */
  showToast(polygons: Vector2[][]): void;

  /**
   * 获取命令描述
   * @returns 返回命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令所属分类
   * @returns 返回日志分组类型：楼板编辑
   */
  getCategory(): string;
}

/**
 * 二维向量类型（从GeometryTypes模块导入）
 */
export interface Vector2 {
  /**
   * 判断两个向量是否相等
   * @param other - 另一个向量或坐标点
   */
  equals(other: Vector2 | number[]): boolean;
}

/**
 * 闭合环路类型（从GeometryTypes模块导入）
 */
export interface Loop {
  /**
   * 构造函数
   * @param points - 构成环路的顶点数组
   */
  new (points: Vector2[]): Loop;

  /**
   * 检查环路是否有效
   * @returns 环路几何有效性
   */
  isValid(): boolean;

  /**
   * 检查环路是否闭合
   * @returns 首尾点是否连接
   */
  isClosed(): boolean;
}

/**
 * 事务管理器接口
 */
export interface TransactionManager {
  /**
   * 创建事务请求
   * @param requestType - 请求类型枚举值
   * @param args - 请求参数数组
   */
  createRequest(requestType: string, args: unknown[]): unknown;
}

/**
 * 草图2D构建器接口
 */
export interface Sketch2dBuilder {
  // 具体属性和方法取决于实际实现
}

/**
 * HSFPConstants常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  namespace RequestType {
    namespace SlabEdit {
      /**
       * 绘制多边形请求类型
       */
      const DrawPolygon: string;
    }
  }

  /**
   * 日志分组类型枚举
   */
  namespace LogGroupTypes {
    /**
     * 楼板编辑日志分组
     */
    const SlabEdit: string;
  }
}

/**
 * 资源管理器（全局对象）
 */
declare const ResourceManager: {
  /**
   * 获取国际化字符串
   * @param key - 资源键名
   */
  getString(key: string): string;
};

/**
 * 实时提示组件（全局对象）
 */
declare const LiveHint: {
  /**
   * 显示提示信息
   * @param message - 提示内容
   * @param duration - 持续时间（毫秒）
   * @param target - 目标元素（可选）
   * @param options - 配置选项
   */
  show(
    message: string,
    duration: number,
    target?: HTMLElement,
    options?: { status: number }
  ): void;

  /**
   * 状态枚举
   */
  statusEnum: {
    /**
     * 可操作状态
     */
    canops: number;
  };
};