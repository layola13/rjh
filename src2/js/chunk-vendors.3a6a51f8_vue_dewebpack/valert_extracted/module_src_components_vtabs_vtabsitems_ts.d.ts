import type VWindow from '../VWindow/VWindow';
import type { BaseItemGroup } from '../VItemGroup/VItemGroup';

/**
 * VTabsItems 组件的属性接口
 * 用于定义选项卡内容面板容器的配置
 */
export interface VTabsItemsProps {
  /**
   * 是否强制必须有一个激活项
   * @default false
   */
  mandatory?: boolean;
}

/**
 * VTabsItems 组件的计算属性接口
 */
export interface VTabsItemsComputed {
  /**
   * 组件的 CSS 类名集合
   * 继承自 VWindow 的类名，并添加 'v-tabs-items' 类
   */
  classes: Record<string, boolean>;

  /**
   * 是否为暗色主题
   * 从根组件继承暗色主题设置
   */
  isDark: boolean;
}

/**
 * VTabsItems 组件的方法接口
 */
export interface VTabsItemsMethods {
  /**
   * 获取选项卡项的值
   * 优先返回元素的 id 属性，如果不存在则回退到 BaseItemGroup 的默认行为
   * 
   * @param element - 选项卡项元素
   * @param index - 元素在列表中的索引
   * @returns 选项卡项的唯一标识值
   */
  getValue(element: any, index: number): string | number;
}

/**
 * VTabsItems 组件
 * 
 * 选项卡内容面板的容器组件，继承自 VWindow 组件
 * 用于管理和显示与 VTabs 相关联的内容面板
 * 
 * @extends VWindow
 * 
 * @example
 *