/**
 * GSAP动画扩展模块
 * 用于管理场景中的时间轴动画
 */

import { Scene } from './Scene';
import { Timeline } from 'gsap';
import * as gsap from 'gsap';

/**
 * 动画项配置接口
 * 定义了每个可动画节点的属性和行为
 */
export interface PtItem {
  /** 动画节点对象 */
  node: {
    /** 节点位置坐标 */
    position: {
      x: number;
      y: number;
      z: number;
    };
    /** 节点旋转角度 */
    rotation: {
      x: number;
      y: number;
      z: number;
    };
  };
  
  /** 开启方向：'left' 表示向左，其他值表示向右 */
  openDirection: 'left' | 'right';
  
  /** 是否向外开启 */
  isOutward: boolean;
  
  /** 原始X坐标位置 */
  orix: number;
  
  /** X轴移动增量 */
  movex: number;
}

/**
 * GSAP动画扩展类
 * 提供场景中物体的开合动画管理功能
 */
export class GsapExtension {
  /** 存储所有动画时间轴实例 */
  private static timelines: Timeline[] = [];
  
  /** 当前场景实例 */
  private static scene?: Scene;

  /**
   * 初始化扩展，绑定场景
   * @param scene - 要绑定的场景对象
   */
  public static Init(scene: Scene): void {
    this.scene = scene;
  }

  /**
   * 初始化所有动画时间轴
   * 为每个动画项创建循环播放的开合动画
   * @param items - 动画项配置数组
   */
  public static DoInit(items: PtItem[]): void {
    // 清空现有时间轴
    this.timelines.length = 0;

    items.forEach((item) => {
      // 创建无限循环的时间轴
      const timeline = gsap.timeline({
        repeat: -1
      });

      // 计算旋转角度：根据开启方向和内外方向确定
      const HALF_PI = Math.PI * 0.5;
      const rotationY = item.openDirection === 'left'
        ? HALF_PI * (item.isOutward ? 1 : -1)
        : HALF_PI * (item.isOutward ? -1 : 1);

      const MOVE_DISTANCE = 10;
      const POSITION_DURATION = 1.5;
      const ROTATION_DURATION = 1.0;

      // 动画序列：移动 -> 旋转打开 -> 旋转关闭 -> 回到原位
      timeline.add(
        gsap.to(item.node.position, {
          x: item.orix + MOVE_DISTANCE * item.movex,
          duration: POSITION_DURATION
        })
      );

      timeline.to(item.node.rotation, {
        y: rotationY,
        duration: ROTATION_DURATION
      });

      timeline.to(item.node.rotation, {
        y: 0,
        duration: ROTATION_DURATION
      });

      timeline.to(item.node.position, {
        x: item.orix,
        duration: POSITION_DURATION
      });

      this.timelines.push(timeline);
    });
  }

  /**
   * 播放所有动画
   * 如果时间轴未初始化，则先进行初始化
   * @param items - 动画项配置数组
   */
  public static DoPlay(items: PtItem[]): void {
    if (this.timelines.length === 0) {
      this.DoInit(items);
    }
    this.timelines.forEach((timeline) => timeline.play());
  }

  /**
   * 暂停所有动画
   * 如果时间轴未初始化，则先进行初始化
   * @param items - 动画项配置数组
   */
  public static DoPause(items: PtItem[]): void {
    if (this.timelines.length === 0) {
      this.DoInit(items);
    }
    this.timelines.forEach((timeline) => timeline.pause());
  }

  /**
   * 重置所有动画
   * 清除时间轴并将所有节点恢复到初始状态
   * @param items - 动画项配置数组
   */
  public static DoReset(items: PtItem[]): void {
    // 清除所有时间轴
    this.timelines.forEach((timeline) => timeline.clear());
    this.timelines.length = 0;

    // 恢复所有节点到初始位置和旋转
    items.forEach((item) => {
      item.node.position.x = item.orix;
      item.node.rotation.y = 0;
    });
  }
}