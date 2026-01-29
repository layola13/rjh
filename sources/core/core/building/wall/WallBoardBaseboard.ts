/**
 * WallBoardBaseboard - 墙面踢脚板
 * 继承自WallMolding，用于处理墙面踢脚板的创建和管理
 */

import { WallMolding } from './WallMolding';
import { MoldingTypeEnum } from '../molding/MoldingTypeEnum';
import { Entity } from '../../scene/Entity';

/**
 * 墙面踢脚板类
 * 用于在墙面底部添加踢脚板装饰线条
 */
export class WallBoardBaseboard extends WallMolding {
    /**
     * 踢脚板路径信息
     */
    public wallBoardBaseboardPath: any;

    /**
     * 构造函数
     * @param id 实体ID
     * @param tag 实体标签
     */
    constructor(id: string = '', tag?: string) {
        super(id, tag);
        this.wallBoardBaseboardPath = undefined;
        this.type = MoldingTypeEnum.WallBoardBaseboard;
        
        // 设置为不可选择
        this.setFlagOn(EntityFlagEnum.unselectable);
    }

    /**
     * 克隆当前踢脚板对象
     * @returns 新的WallBoardBaseboard实例
     */
    public clone(): WallBoardBaseboard {
        const newBaseboard = new WallBoardBaseboard();
        newBaseboard._copyFrom(this);
        return newBaseboard;
    }

    /**
     * 获取踢脚板类型
     * @returns 线条类型枚举
     */
    public getType(): MoldingTypeEnum {
        return MoldingTypeEnum.WallBoardBaseboard;
    }
}

// 注册类到全局
if (typeof HSConstants !== 'undefined' && HSConstants.ModelClass) {
    Entity.registerClass(HSConstants.ModelClass.NgWallBoardBaseboard, WallBoardBaseboard);
}

// 导出枚举
enum EntityFlagEnum {
    unselectable = 1 << 0,
    hidden = 1 << 1,
    locked = 1 << 2,
    removed = 1 << 3
}