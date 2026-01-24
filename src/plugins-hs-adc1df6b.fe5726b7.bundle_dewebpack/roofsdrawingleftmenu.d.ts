/**
 * 屋顶绘图左侧菜单模块
 * 提供用于自定义参数化屋顶的菜单项和交互功能
 */

import { HSCore } from 'HSCore';
import { SvgMap } from 'SvgMap';
import { ENParamRoofType } from 'ENParamRoofType';

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  imageButton = 'imageButton',
}

/**
 * UI模式常量
 */
declare namespace HSFPConstants {
  enum UIMode {
    layoutDesignMode = 'layoutDesignMode',
  }

  enum PluginType {
    ParametricRoof = 'ParametricRoof',
  }

  namespace CommandType {
    namespace RoofsDrawing {
      const DeleteRoofRegion: string;
    }
    const UpdateRoofDirection: string;
  }
}

/**
 * 菜单项配置接口
 */
interface MenuItemConfig {
  /** 菜单项唯一标识符 */
  id: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum;
  /** 显示顺序 */
  order: number;
  /** 图标资源路径 */
  src: string;
  /** 显示标签文本 */
  label: string;
  /** UI模式限制（可选） */
  uiMode?: HSFPConstants.UIMode[];
  /** 是否禁用（可选） */
  disable?: boolean;
  /** 点击事件处理函数 */
  onClick: () => void;
}

/**
 * 选择上下文接口
 * 包含当前选中的实体列表
 */
interface SelectionContext {
  /** 选中的实体数组 */
  entities: Array<HSCore.Model.NCustomizedParametricRoof | unknown>;
}

/**
 * 屋顶绘图左侧菜单配置对象
 */
export interface RoofsDrawingLeftMenu {
  /** 模块名称 */
  readonly name: 'RoofsDrawingLeftMenu';

  /**
   * 判断菜单是否应用于当前选择
   * @param selectionContext - 选择上下文，包含当前选中的实体
   * @returns 如果选中的实体中包含自定义参数化屋顶则返回true
   */
  isApplied(selectionContext: SelectionContext): boolean;

  /**
   * 获取菜单项列表
   * @param selectionContext - 选择上下文，包含当前选中的实体
   * @returns 菜单项配置数组
   */
  getItems(selectionContext: SelectionContext): MenuItemConfig[];
}

/**
 * 屋顶绘图左侧菜单模块导出
 * 
 * 功能说明：
 * 1. 替换材质：显示材质替换面板
 * 2. 删除：删除选中的屋顶区域
 * 3. 方向变换：针对特定屋顶类型（人字形、盐盒式、盒型山墙）改变屋顶方向
 * 
 * @example
 * // 检查菜单是否适用
 * if (RoofsDrawingLeftMenu.isApplied(context)) {
 *   const items = RoofsDrawingLeftMenu.getItems(context);
 *   // 渲染菜单项...
 * }
 */
export declare const RoofsDrawingLeftMenu: RoofsDrawingLeftMenu;