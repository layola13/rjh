/**
 * 墙板踢脚线模块
 * 
 * 该模块定义了墙板踢脚线实体类，继承自墙体线条基类。
 * 墙板踢脚线是一种特殊的墙体装饰线条，通常安装在墙体底部。
 */

import { WallMolding } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';

/**
 * 墙板踢脚线类
 * 
 * @class WallBoardBaseboard
 * @extends {WallMolding}
 * @description 表示墙体底部的装饰性踢脚线，具有不可选择的特性
 */
export class WallBoardBaseboard extends WallMolding {
  /**
   * 墙板踢脚线路径
   * @type {unknown}
   * @description 存储踢脚线的几何路径信息
   */
  wallBoardBaseboardPath: unknown;

  /**
   * 构造函数
   * 
   * @param {string} id - 实体唯一标识符，默认为空字符串
   * @param {unknown} options - 初始化配置选项
   */
  constructor(id: string = '', options?: unknown) {
    super(id, options);
    this.wallBoardBaseboardPath = undefined;
    this.type = MoldingTypeEnum.WallBoardBaseboard;
    this.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable);
  }

  /**
   * 克隆当前墙板踢脚线实例
   * 
   * @returns {WallBoardBaseboard} 返回一个新的墙板踢脚线副本
   * @description 创建当前对象的深拷贝，包含所有属性和状态
   */
  clone(): WallBoardBaseboard {
    const clonedInstance = new WallBoardBaseboard();
    clonedInstance._copyFrom(this);
    return clonedInstance;
  }
}

// 将类注册到实体系统中，使用特定的模型类标识符
Entity.registerClass(HSConstants.ModelClass.NgWallBoardBaseboard, WallBoardBaseboard);