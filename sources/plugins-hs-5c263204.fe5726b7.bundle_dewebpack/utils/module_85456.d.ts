/**
 * 热键模态框管理器
 * 用于显示和管理应用程序的快捷键帮助界面
 */

import { Theme } from './theme';

/**
 * 快捷键类别类型
 */
export type HotkeyCategory = string;

/**
 * 热键模态框控制器类
 * 负责创建、显示和关闭快捷键帮助模态框
 */
export default class HotkeyModalController {
  /**
   * 模态框的DOM容器元素
   */
  private containerDom?: HTMLDivElement;

  /**
   * 构造函数
   * 自动绑定showModel和closeModel方法的this上下文
   */
  constructor();

  /**
   * 初始化模态框容器
   * 在#plugin-container元素内创建模态框的DOM结构
   * @throws {Error} 如果找不到#plugin-container元素
   */
  init(): void;

  /**
   * 显示快捷键模态框
   * @param theme - 主题配置对象
   * @param selectedCategory - 默认选中的快捷键类别
   */
  showModel(theme: Theme, selectedCategory?: HotkeyCategory): void;

  /**
   * 关闭模态框
   * 卸载React组件并清理DOM
   */
  closeModel(): void;
}