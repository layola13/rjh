/**
 * 默认工具栏模块
 * 提供工具栏项的初始化、预处理和过滤功能
 */

/**
 * 工具栏项配置接口
 */
export interface ToolbarItem {
  /** 工具栏项名称 */
  name: string;
  /** 工具提示文本 */
  tooltip?: string;
  /** 显示标签 */
  label?: string;
  /** 弹出提示配置 */
  popover?: {
    text: string;
    [key: string]: unknown;
  };
  /** 是否可见 */
  visible?: boolean;
  /** 是否禁用 */
  disable?: boolean;
  /** 工具栏项类型 */
  type?: ToolbarItemType;
  /** 点击事件处理器 */
  onclick?: (event: Event) => void;
  /** 值变化事件处理器 */
  onchange?: (value: unknown) => void;
  /** 鼠标进入事件处理器 */
  onMouseEnter?: (event: MouseEvent) => void;
  /** 鼠标离开事件处理器 */
  onMouseLeave?: (event: MouseEvent) => void;
  /** 子菜单项 */
  submenu?: ToolbarItem[];
}

/**
 * 工具栏项类型枚举
 */
export enum ToolbarItemType {
  button = 'button',
  folder = 'folder',
}

/**
 * 默认工具栏处理器接口
 */
export interface IDefaultToolbarHandler {
  setParams(params: unknown): void;
  [key: string]: unknown;
}

/**
 * 应用配置接口
 */
export interface AppConfig {
  TENANT: 'ezhome' | 'fp' | 'ea' | string;
  VERSION: 'ea' | string;
}

/**
 * 全局HSApp接口
 */
declare global {
  const HSApp: {
    Config: AppConfig;
  };
  const ResourceManager: {
    getString(key: string): string | undefined;
  };
}

/**
 * 需要在HXRR环境中过滤的工具栏项名称列表
 */
const HXRR_FILTERED_ITEMS: readonly string[] = [
  'toolBar_new',
  'toolBar_fpCollection',
  'toolBar_load',
  'toolBar_save_as',
  'plugin_bomlist_menu',
  'toolBar_share_case',
  'toolBar_export_pic_with_paint',
  'toolBar_export_pic_color',
] as const;

/**
 * 默认工具栏类
 * 负责初始化和管理工具栏项配置
 */
export class DefaultToolbar {
  /**
   * 构造函数
   * @param params - 工具栏初始化参数
   */
  constructor(params: unknown) {
    // 从外部模块导入的defaultToolbarHandler
    const { defaultToolbarHandler } = require('./defaultToolbarHandler');
    defaultToolbarHandler.setParams(params);
  }

  /**
   * 获取默认工具栏项列表
   * @returns 处理后的工具栏项数组
   */
  public getDefaultToolbarItems(): ToolbarItem[] {
    return this._preProcess(this._setEzhomeItem());
  }

  /**
   * 预处理工具栏项
   * - 过滤HXRR环境特定项
   * - 本地化文本内容
   * - 绑定事件处理器
   * - 设置默认类型和可见性
   * @param items - 待处理的工具栏项数组
   * @returns 处理后的工具栏项数组
   */
  private _preProcess(items: ToolbarItem[]): ToolbarItem[] {
    const { defaultToolbarHandler } = require('./defaultToolbarHandler');
    const { isHXRR } = require('./utils');

    // 如果是HXRR环境，过滤特定项
    if (isHXRR()) {
      this._filterHXRRItems(items);
    }

    /**
     * 获取本地化字符串
     * @param key - 资源键
     * @returns 本地化字符串或原始键
     */
    const getLocalizedString = (key: string): string => {
      return ResourceManager.getString(key) ?? key;
    };

    // 过滤掉禁用的项
    const filteredItems = items.filter((item) => !item.disable);

    // 处理每个工具栏项
    filteredItems.forEach((item) => {
      // 本地化文本内容
      if (item.tooltip) {
        item.tooltip = getLocalizedString(item.tooltip);
      }
      if (item.label) {
        item.label = getLocalizedString(item.label);
      }
      if (item.popover && typeof item.popover.text === 'string') {
        item.popover.text = getLocalizedString(item.popover.text);
      }

      // 设置默认可见性
      if (item.visible !== false) {
        item.visible = true;
      }

      // 绑定点击事件处理器
      const clickHandler = defaultToolbarHandler[`${item.name}_Click`];
      if (clickHandler && !item.onclick) {
        item.onclick = clickHandler.bind(defaultToolbarHandler);
      }

      // 绑定值变化事件处理器
      const changeHandler = defaultToolbarHandler[`${item.name}_Change`];
      if (changeHandler && !item.onchange) {
        item.onchange = changeHandler.bind(defaultToolbarHandler);
      }

      // 绑定鼠标进入事件处理器
      const mouseEnterHandler = defaultToolbarHandler[`${item.name}_OnMouseEnter`];
      if (mouseEnterHandler && !item.onMouseEnter) {
        item.onMouseEnter = mouseEnterHandler.bind(defaultToolbarHandler);
      }

      // 绑定鼠标离开事件处理器
      const mouseLeaveHandler = defaultToolbarHandler[`${item.name}_OnMouseLeave`];
      if (mouseLeaveHandler && !item.onMouseLeave) {
        item.onMouseLeave = mouseLeaveHandler.bind(defaultToolbarHandler);
      }

      // 处理子菜单或设置默认类型
      if (item.submenu) {
        if (!item.type) {
          item.type = ToolbarItemType.folder;
        }
        this._preProcess(item.submenu);
      } else if (!item.type) {
        item.type = ToolbarItemType.button;
      }
    });

    return filteredItems;
  }

  /**
   * 根据租户类型设置特定工具栏项
   * - ezhome租户：设置导出联合菜单项
   * - fp租户：设置导出全球施工项
   * - ea版本：过滤分享案例相关项
   * @returns 配置后的工具栏项数组
   */
  private _setEzhomeItem(): ToolbarItem[] {
    const { default: getDefaultToolbarItems } = require('./defaultToolbarItems');
    const { exportJointMenuItems, exportGlobalConstructionItems } = require('./exportMenuItems');
    const { isHXRR } = require('./utils');

    const items = getDefaultToolbarItems();

    // 查找导出工具栏项索引
    const exportItemIndex = items.findIndex((item) => item.name === 'toolBar_export');

    // 查找文件工具栏项索引
    const fileItemIndex = items.findIndex((item) => item.name === 'toolBar_file');

    // ezhome租户且非HXRR环境：设置导出联合菜单
    if (
      HSApp.Config.TENANT === 'ezhome' &&
      !isHXRR() &&
      exportItemIndex !== -1
    ) {
      items[exportItemIndex].submenu = exportJointMenuItems;
    }

    // fp租户：设置导出全球施工项
    if (HSApp.Config.TENANT === 'fp' && exportItemIndex !== -1) {
      items[exportItemIndex].submenu = exportGlobalConstructionItems;
    }

    // ea版本：过滤文件菜单中的分享案例项
    if (HSApp.Config.VERSION === 'ea' && fileItemIndex !== -1) {
      items[fileItemIndex].submenu = items[fileItemIndex].submenu?.filter(
        (item) => !['toolBar_share_case', 'toolBar_file_divider2'].includes(item.name)
      );
    }

    return items;
  }

  /**
   * 递归过滤HXRR环境中不需要的工具栏项
   * @param items - 待过滤的工具栏项数组
   * @returns 过滤后的工具栏项数组
   */
  private _filterHXRRItems(items: ToolbarItem[]): ToolbarItem[] {
    // 从后向前遍历以安全删除元素
    for (let i = items.length - 1; i >= 0; i--) {
      const currentItem = items[i];

      // 如果当前项在过滤列表中，删除它
      if (HXRR_FILTERED_ITEMS.includes(currentItem.label ?? '')) {
        items.splice(i, 1);
      } else if (currentItem.submenu?.length) {
        // 递归处理子菜单
        this._filterHXRRItems(currentItem.submenu);
      }
    }

    return items;
  }
}