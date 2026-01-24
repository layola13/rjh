/**
 * TextCraft模块 - 用于在Konva画布上渲染和操作文本形状
 * @module TextCraft
 */

import Konva from 'konva';
import { Point } from './Point';
import { DrawParams } from './DrawParams';
import { dimModeEnum } from './DimensionTypes';

/**
 * 多边形数据接口
 */
interface Poly {
  /** 边框数据 */
  border(): {
    /** 创建碰撞检测区域 */
    makeHitRegion(shape: Konva.Shape, context: Konva.Context): void;
  };
  /** 文本内容 */
  content: string;
  /** 位置坐标 */
  position: Point;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 自身偏移量 */
  selfOffset: Point;
  /** 是否可拖拽 */
  draggable: boolean;
  /** 颜色 */
  color: string;
  /** 字体样式 */
  font: string;
}

/**
 * 维度信息接口
 */
interface DimensionInfo {
  /** 维度名称 */
  name: string;
}

/**
 * 形状数据接口
 */
interface ShapeData {
  /** 多边形数据 */
  poly: Poly;
  /** 高亮颜色（可选） */
  highlight?: string;
  /** 维度信息（可选） */
  dimInfo?: DimensionInfo;
}

/**
 * 视图接口
 */
interface View {
  /** 维度管理器 */
  dimManager: {
    /** 当前维度模式 */
    mode: dimModeEnum;
  };
}

/**
 * TextCraft类 - 提供文本形状的创建和渲染功能
 */
export declare class TextCraft {
  /**
   * 创建文本形状
   * @param poly - 多边形数据
   * @param view - 视图对象
   * @returns 创建的Konva形状实例
   */
  static create(poly: Poly, view: View): Konva.Shape;

  /**
   * 碰撞检测函数
   * @param context - Konva上下文
   * @param shape - 形状实例
   */
  static hitFunc(context: Konva.Context, shape: Konva.Shape): void;

  /**
   * 场景渲染函数
   * @param context - Konva上下文
   * @param shape - 形状实例
   */
  static sceneFunc(context: Konva.Context, shape: Konva.Shape): void;
}

/**
 * 扩展Konva.Shape的属性接口
 */
declare module 'konva/lib/Shape' {
  interface Shape {
    attrs: {
      /** 形状数据 */
      data: ShapeData;
      /** 视图对象 */
      view: View;
    };
  }
}