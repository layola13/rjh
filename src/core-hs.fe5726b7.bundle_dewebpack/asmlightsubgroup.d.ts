/**
 * 装配体灯光子组模块
 * 提供装配体场景中灯光分组的IO序列化和实体类定义
 */

import { Entity } from './Entity';
import { LightSubGroup_IO, LightSubGroup } from './LightSubGroup';
import { LightTypeEnum } from './LightTypeEnum';
import { LightSubGroupCompareUtil } from './LightSubGroupCompareUtil';
import { Logger } from './Logger';

/**
 * 装配体灯光子组IO序列化类
 * 负责装配体灯光子组的加载、保存和序列化操作
 */
export declare class AsmLightSubGroup_IO extends LightSubGroup_IO {
  /**
   * 加载装配体灯光子组数据
   * @param entity - 要加载数据的实体对象
   * @param data - 序列化的数据对象
   * @param context - 加载上下文信息
   */
  load(entity: AsmLightSubGroup, data: unknown, context: unknown): void;

  /**
   * 获取IO实例（单例模式）
   */
  static instance(): AsmLightSubGroup_IO;
}

/**
 * 装配体灯光子组实体类
 * 表示装配体场景中的灯光分组，包含多个灯光成员
 * 与普通灯光子组的区别在于关联了装配体内容实体
 */
export declare class AsmLightSubGroup extends LightSubGroup {
  /**
   * 灯光类型，固定为装配体子组类型
   */
  type: LightTypeEnum.AsmSubGroup;

  /**
   * 组交互模式标志
   * false表示禁用组级别的交互
   */
  groupInteractionMode: boolean;

  /**
   * 关联的装配体内容实体ID
   */
  contentID?: string;

  /**
   * 关联的装配体内容实体引用
   */
  content?: HSCore.Model.Entity;

  /**
   * 内部边界盒数据
   */
  boundInternal?: unknown;

  /**
   * 轮廓数据
   */
  outline: unknown[];

  /**
   * 子成员列表
   */
  members: AsmLightSubGroup[];

  /**
   * 成员属性配置
   */
  memberPropertiesConfig: unknown;

  /**
   * 成员代理对象
   */
  memberProxy: { type: unknown };

  /**
   * 构造函数
   * @param name - 灯光子组名称，默认为空字符串
   */
  constructor(name?: string);

  /**
   * 创建装配体灯光子组实例（已废弃）
   * @param entity - 实体对象
   * @param autoUpdate - 是否自动更新属性
   * @returns 新创建的装配体灯光子组实例
   * @deprecated 不能直接创建AsmLightSubGroup，应使用createByAssembly方法
   */
  static create(entity: unknown, autoUpdate?: boolean): AsmLightSubGroup;

  /**
   * 通过装配体创建灯光子组
   * @param contentID - 装配体内容实体ID
   * @param members - 灯光成员数组
   * @param autoUpdate - 是否自动更新成员属性，默认true
   * @returns 新创建的装配体灯光子组实例
   */
  static createByAssembly(
    contentID: string,
    members: AsmLightSubGroup[],
    autoUpdate?: boolean
  ): AsmLightSubGroup;

  /**
   * 附加真实灯光实体
   * 将成员灯光与场景中的实际灯光实体关联
   * 如果已有content或contentID为空则跳过
   */
  attachRealLight(): void;

  /**
   * 获取IO序列化器实例
   * @returns IO序列化器单例
   */
  getIO(): AsmLightSubGroup_IO;

  /**
   * 刷新内部边界盒
   * 基于关联的装配体内容实体更新边界数据
   * 如果没有成员则清空轮廓
   */
  refreshBoundInternal(): void;

  /**
   * 验证灯光子组的有效性
   * 检查成员是否被移除、父对象是否一致
   * 自动清理无效成员，如果没有有效成员则标记为已移除
   * @returns 是否有效（至少有一个有效成员）
   */
  verify(): boolean;

  /**
   * 检查灯光子组是否有效
   * @returns 是否包含至少一个成员
   */
  isValid(): boolean;

  /**
   * 获取边界数据
   * 物理灯光不支持边界计算，会输出警告
   * @returns 边界数据对象
   */
  getBoundingData(): unknown;

  /**
   * 添加成员
   * @param member - 要添加的成员
   */
  addMember(member: AsmLightSubGroup): void;

  /**
   * 转换为扁平成员列表
   * @returns 扁平化的成员数组
   */
  toFlatMemberList(): unknown[];

  /**
   * 获取唯一父对象
   * @returns 父对象引用
   */
  getUniqueParent(): unknown;

  /**
   * 设置实体标志位
   * @param flags - 标志位枚举值
   * @param value - 标志值
   * @param recursive - 是否递归设置
   */
  setFlagOn(flags: number, value: boolean, recursive: boolean): void;

  /**
   * 检查标志位是否关闭
   * @param flag - 要检查的标志位
   * @returns 标志位是否为关闭状态
   */
  isFlagOff(flag: number): boolean;

  /**
   * 创建成员属性配置
   * @param memberType - 成员类型
   * @returns 属性配置对象
   */
  static createMemberPropertiesConfig(memberType: unknown): unknown;
}

/**
 * 全局HSCore命名空间声明
 */
declare global {
  namespace HSCore {
    namespace Doc {
      /**
       * 获取文档管理器
       */
      function getDocManager(): {
        /**
         * 当前激活的文档
         */
        activeDocument: {
          /**
           * 根据ID获取实体
           * @param id - 实体ID
           * @returns 实体对象或undefined
           */
          getEntityById(id: string): HSCore.Model.Entity | undefined;
        };
      };
    }

    namespace Model {
      /**
       * 实体基类
       */
      interface Entity {
        /**
         * 实体边界盒
         */
        bound?: unknown;

        /**
         * 刷新内部边界
         */
        refreshBoundInternal(): void;
      }

      /**
       * 实体标志位枚举
       */
      enum EntityFlagEnum {
        /** 已移除标志 */
        removed = 1,
        /** 隐藏标志 */
        hidden = 2,
      }
    }
  }

  namespace HSConstants {
    /**
     * 模型类常量
     */
    namespace ModelClass {
      /**
       * 装配体灯光子组类型常量
       */
      const NgAsmLightSubGroup: string;
    }
  }
}