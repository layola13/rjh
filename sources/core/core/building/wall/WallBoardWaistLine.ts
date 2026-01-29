/**
 * WallBoardWaistLine - 墙面腰线
 * 墙面装饰线条，用于墙面中部的水平装饰线
 */

import { EntityField } from '../../scene/decorators';

/**
 * 墙面腰线类
 * 继承自WallMolding，实现墙面腰线的自动匹配和位置调整
 */
export class WallBoardWaistLine {
  @EntityField()
  private __offset: number = 0;

  @EntityField()
  private __autoFit: boolean = true;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param parent - 父实体
   */
  constructor(id: string = '', parent?: any) {
    // 设置类型为墙面腰线
    // this.type = MoldingTypeEnum.WallBoardWaistLine;
    // this.setFlagOn(EntityFlagEnum.unselectable);
  }

  /**
   * 偏移量（距离地面的高度）
   */
  get offset(): number {
    return this.__offset;
  }

  set offset(value: number) {
    this.__offset = value;
  }

  /**
   * 是否自动适配墙面
   */
  get autoFit(): boolean {
    return this.__autoFit;
  }

  set autoFit(value: boolean) {
    this.__autoFit = value;
  }

  /**
   * 克隆实体
   */
  clone(): WallBoardWaistLine {
    const entity = new WallBoardWaistLine();
    // entity._copyFrom(this);
    return entity;
  }

  /**
   * 获取元数据过滤键
   */
  getMetadataFilterKeys(): Set<string> {
    const keys = new Set<string>();
    // const keys = super.getMetadataFilterKeys();
    ['profileHigh'].forEach((key) => {
      keys.add(key);
    });
    return keys;
  }

  /**
   * 字段变更回调
   * @param fieldName - 字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void {
    switch (fieldName) {
      case 'autoFit':
        this.doAutoFit();
        break;
      case 'offset':
        this.dirtyPosition();
        break;
    }
    // super.onFieldChanged(fieldName, oldValue, newValue);
  }

  /**
   * 执行自动适配
   */
  doAutoFit(): void {
    if (this.autoFit) {
      // 自动适配墙面的逻辑
    }
  }

  /**
   * 标记位置需要更新
   */
  dirtyPosition(): void {
    // 标记位置dirty
  }
}

// 全局声明
declare global {
  namespace HSConstants {
    namespace ModelClass {
      const NgWallBoardWaistLine: string;
    }
  }
}

// 注册实体类
if (typeof globalThis !== 'undefined') {
  const Entity = (globalThis as any).HSCore?.Model?.Entity;
  if (Entity && Entity.registerClass) {
    Entity.registerClass(
      (globalThis as any).HSConstants?.ModelClass?.NgWallBoardWaistLine || 'NgWallBoardWaistLine',
      WallBoardWaistLine
    );
  }
}