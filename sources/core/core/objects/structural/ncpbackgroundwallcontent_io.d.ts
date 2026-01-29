/**
 * 背景墙内容模型的IO处理器和实体类
 * @module NCPBackgroundWallContent
 */

import { Entity } from './Entity';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { ParametricModelContent, ParametricModelContent_IO } from './ParametricModelContent';

/**
 * 背景墙内容的IO处理类
 * 负责序列化和反序列化NCPBackgroundWallContent实体
 */
export declare class NCPBackgroundWallContent_IO extends ParametricModelContent_IO {
  /**
   * 获取单例实例
   * @returns IO处理器实例
   */
  static instance(): NCPBackgroundWallContent_IO;
}

/**
 * 背景墙内容实体类
 * 表示背景墙中的参数化内容模型
 */
export declare class NCPBackgroundWallContent extends ParametricModelContent {
  /**
   * 判断内容是否在指定房间内
   * 通过查找父级背景墙单元或背景墙来确定所属房间
   * 
   * @param room - 要检查的房间实体
   * @param recursive - 是否递归检查父级层级，默认为false
   * @returns 如果内容在指定房间内返回true，否则返回false
   */
  isContentInRoom(room: unknown, recursive?: boolean): boolean;

  /**
   * 获取对应的IO处理器实例
   * @returns NCPBackgroundWallContent_IO实例
   */
  getIO(): NCPBackgroundWallContent_IO;
}

/**
 * HSConstants中相关的模型类常量
 */
declare global {
  namespace HSConstants {
    enum ModelClass {
      /** 背景墙内容模型类型 */
      NCPBackgroundWallContent = 'NCPBackgroundWallContent',
      /** 背景墙单元模型类型 */
      NCPBackgroundWallUnit = 'NCPBackgroundWallUnit',
      /** 自定义参数化背景墙模型类型 */
      NCustomizedParametricBackgroundWall = 'NCustomizedParametricBackgroundWall'
    }
  }
}