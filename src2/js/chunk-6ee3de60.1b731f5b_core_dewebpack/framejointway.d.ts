/**
 * 框架连接方式模块
 * 用于管理和操作框架节点的连接方式
 */

import { Sash } from './Sash';

/**
 * 框架管理器接口
 * 定义框架管理所需的基础方法
 */
interface IFrameManager {
  /** 宿主对象，可能是Sash实例或其他类型 */
  host: Sash | unknown;
  
  /**
   * 获取指定索引的连接方式
   * @param index - 节点索引
   * @returns 连接方式值
   */
  getJointWay(index: number): number;
  
  /**
   * 设置指定索引的连接方式
   * @param index - 节点索引
   * @param jointWay - 新的连接方式
   * @param view - 视图实例
   */
  setJointWay(index: number, jointWay: number, view: IView): void;
}

/**
 * 视图接口
 * 定义视图相关的属性和方法
 */
interface IView {
  /** 当前激活的图层 */
  activeLayer: ILayer;
  
  /** 备忘录管理器，用于撤销/重做功能 */
  mometoManager: IMomentoManager;
}

/**
 * 图层接口
 */
interface ILayer {
  /**
   * 批量绘制图层内容
   */
  batchDraw(): void;
}

/**
 * 备忘录管理器接口
 */
interface IMomentoManager {
  /**
   * 创建检查点，用于记录当前状态
   */
  checkPoint(): void;
}

/**
 * 框架连接方式类
 * 封装框架节点连接方式的获取和设置逻辑
 */
export class FrameJointWay {
  /** 框架管理器实例 */
  private readonly fm: IFrameManager;
  
  /** 节点索引 */
  private readonly idx: number;
  
  /** 视图实例 */
  private readonly view: IView;

  /**
   * 构造函数
   * @param frameManager - 框架管理器实例
   * @param index - 节点索引
   * @param view - 视图实例
   */
  constructor(frameManager: IFrameManager, index: number, view: IView) {
    this.fm = frameManager;
    this.idx = index;
    this.view = view;
  }

  /**
   * 获取当前节点的连接方式
   * @returns 连接方式值
   */
  get jointWay(): number {
    return this.fm.getJointWay(this.idx);
  }

  /**
   * 设置节点的连接方式
   * 当连接方式改变时，会触发相关更新操作：
   * - 更新框架管理器中的连接方式
   * - 如果宿主是Sash实例，更新硬件多边形并重绘
   * - 批量绘制激活图层
   * - 创建状态检查点
   * 
   * @param value - 新的连接方式值
   */
  set jointWay(value: number) {
    // 仅在连接方式发生变化时执行更新
    if (this.jointWay !== value) {
      // 更新框架管理器中的连接方式
      this.fm.setJointWay(this.idx, value, this.view);
      
      // 如果宿主是Sash实例，执行额外的更新操作
      if (this.fm.host instanceof Sash) {
        const sashInstance = this.fm.host;
        
        // 更新硬件管理器的多边形
        sashInstance.hardwareManager.updatePoly();
        
        // 重绘Sash实例
        sashInstance.draw(this.view);
        
        // 批量绘制当前激活图层
        this.view.activeLayer.batchDraw();
        
        // 创建状态检查点（用于撤销/重做）
        this.view.mometoManager.checkPoint();
      }
    }
  }
}