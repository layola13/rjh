/**
 * Module: Container3D
 * 3D容器控件，用于管理和组织3D GUI控件的层次结构
 */

import { TransformNode } from "core/Misc/observable";
import { Control3D } from "./control3D";
import { Scene } from "core/scene";

/**
 * 容器方向枚举
 */
export enum Container3DOrientation {
  /** 未设置方向 */
  UNSET_ORIENTATION = 0,
  /** 面向原点 */
  FACEORIGIN_ORIENTATION = 1,
  /** 面向原点反向 */
  FACEORIGINREVERSED_ORIENTATION = 2,
  /** 面向前方 */
  FACEFORWARD_ORIENTATION = 3,
  /** 面向前方反向 */
  FACEFORWARDREVERSED_ORIENTATION = 4
}

/**
 * 3D容器控件类
 * 用于包含和管理多个3D GUI控件，支持自动布局
 */
export declare class Container3D extends Control3D {
  /** 方向常量：未设置 */
  static readonly UNSET_ORIENTATION: number;
  /** 方向常量：面向原点 */
  static readonly FACEORIGIN_ORIENTATION: number;
  /** 方向常量：面向原点反向 */
  static readonly FACEORIGINREVERSED_ORIENTATION: number;
  /** 方向常量：面向前方 */
  static readonly FACEFORWARD_ORIENTATION: number;
  /** 方向常量：面向前方反向 */
  static readonly FACEFORWARDREVERSED_ORIENTATION: number;

  /**
   * 是否阻止自动布局
   * 当设置为true时，不会自动重新排列子控件
   */
  private _blockLayout: boolean;

  /**
   * 子控件数组
   */
  private _children: Control3D[];

  /**
   * 构造函数
   * @param name - 容器名称
   */
  constructor(name?: string);

  /**
   * 获取所有子控件
   */
  get children(): ReadonlyArray<Control3D>;

  /**
   * 获取布局阻止状态
   */
  get blockLayout(): boolean;

  /**
   * 设置布局阻止状态
   * 当设置为false时，会立即触发子控件重新排列
   * @param value - 是否阻止布局
   */
  set blockLayout(value: boolean);

  /**
   * 手动触发更新布局
   * 重新排列所有子控件
   * @returns 返回当前容器实例，支持链式调用
   */
  updateLayout(): this;

  /**
   * 检查容器是否包含指定控件
   * @param control - 要检查的控件
   * @returns 如果包含返回true，否则返回false
   */
  containsControl(control: Control3D): boolean;

  /**
   * 向容器添加子控件
   * @param control - 要添加的控件
   * @returns 返回当前容器实例，支持链式调用
   */
  addControl(control: Control3D): this;

  /**
   * 从容器中移除子控件
   * @param control - 要移除的控件
   * @returns 返回当前容器实例，支持链式调用
   */
  removeControl(control: Control3D): this;

  /**
   * 排列子控件的内部方法
   * 子类应重写此方法实现具体的布局逻辑
   * @internal
   */
  protected _arrangeChildren(): void;

  /**
   * 创建容器的3D节点
   * @param scene - 场景对象
   * @returns 返回变换节点
   * @internal
   */
  protected _createNode(scene: Scene): TransformNode;

  /**
   * 获取类型名称
   * @returns 返回"Container3D"
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * 释放容器及其所有子控件占用的资源
   */
  dispose(): void;
}