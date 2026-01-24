/**
 * 窗扇创建器模块
 * 提供各种类型窗扇的工厂方法
 */

import { PolyId } from './poly-id';
import {
  AntiTheft,
  WinPolygon,
  ShapeType,
  PushSash,
  CircleSash,
  KfcSash,
  DoubleKfcSash,
  DoubleSash,
  Fold,
  Slide,
  GuardSash
} from './shapes';

/**
 * 窗扇创建参数接口
 */
interface CreateParams {
  /** 窗扇对象数据 */
  obj: unknown;
}

/**
 * 防盗窗创建参数接口
 */
interface AntiTheftParams {
  /** 窗扇对象数据 */
  obj: unknown;
}

/**
 * 窗扇创建器函数类型
 */
type CreatorFunction = (params: CreateParams) => 
  | PushSash 
  | CircleSash 
  | KfcSash 
  | DoubleKfcSash 
  | DoubleSash 
  | Fold 
  | Slide 
  | GuardSash;

/**
 * 窗扇创建器映射表类型
 */
type CreatorMap = {
  [K in ShapeType]?: CreatorFunction;
};

/**
 * 窗扇创建器类
 * 使用工厂模式创建不同类型的窗扇对象
 * 
 * @example
 *