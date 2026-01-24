/**
 * Homestyler UI Components - Popover 组件样式模块
 * 提供弹出层、左侧菜单等组件的 CSS 样式定义
 */

/**
 * Webpack 模块导出函数类型
 * @param moduleExports - 模块导出对象
 * @param moduleId - 模块唯一标识符
 * @param cssLoader - CSS 加载器函数
 */
declare function webpackModuleExport(
  moduleExports: { exports: unknown; id: string | number },
  _unusedParam: unknown,
  cssLoader: (isSourceMap: boolean) => CSSLoaderAPI
): void;

/**
 * CSS 加载器 API 接口
 */
interface CSSLoaderAPI {
  /**
   * 添加 CSS 样式规则
   * @param rule - CSS 规则数组 [模块ID, CSS内容, 可选的sourceMap]
   */
  push(rule: [string | number, string, string?]): void;
}

/**
 * Homestyler Popover 弹出层组件样式类名
 */
declare namespace HomestylerPopoverStyles {
  /**
   * 弹出层位置类型
   */
  type PopoverPlacement =
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom';

  /**
   * 弹出层状态类型
   */
  type PopoverState = 'active' | 'inactive';

  /**
   * 弹出层主题类型
   */
  type PopoverTheme = 'light' | 'dark';

  /**
   * 样式类名常量
   */
  const CLASSES: {
    /** 弹出层容器基础类名 */
    readonly POPOVER_ITEM: 'homestyler-ui-components.homestyler-popover-item';
    /** 弹出层内容区域类名 */
    readonly POPOVER_CONTENT: 'homestyler-popover-content';
    /** 弹出层箭头类名 */
    readonly POPOVER_CARET: 'homestyler-popover-caret';
    /** 激活状态类名 */
    readonly ITEM_ACTIVE: 'homestyler-popover-item-active';
    /** 非激活状态类名 */
    readonly ITEM_INACTIVE: 'homestyler-popover-item-inactive';
    /** 深色主题类名 */
    readonly DARK_THEME: 'dark';
    /** 移除阴影类名 */
    readonly REMOVE_SHADOW: 'remove-box-shadow';
  };

  /**
   * 动画名称常量
   */
  const ANIMATIONS: {
    readonly DOWN_IN: 'homestylerPopoverDownIn';
    readonly DOWN_OUT: 'homestylerPopoverDownOut';
    readonly UP_IN: 'homestylerPopoverUpIn';
    readonly UP_OUT: 'homestylerPopoverUpOut';
    readonly LEFT_IN: 'homestylerPopoverLeftIn';
    readonly LEFT_OUT: 'homestylerPopoverLeftOut';
    readonly RIGHT_IN: 'homestylerPopoverRightIn';
    readonly RIGHT_OUT: 'homestylerPopoverRightOut';
  };
}

/**
 * Homestyler 左侧菜单组件样式类名
 */
declare namespace HomestylerLeftMenuStyles {
  /**
   * 菜单项状态类型
   */
  type MenuItemState = 'normal' | 'disable' | 'unusable' | 'hover';

  /**
   * 样式类名常量
   */
  const CLASSES: {
    /** 图标视图容器类名 */
    readonly ICON_VIEW: 'hs-iconfont-view';
    /** 悬停图标背景类名 */
    readonly HOVER_ICON_BG: 'hover-icon-bg';
    /** 左侧菜单项基础类名 */
    readonly LEFT_ITEM: 'hs-left-item';
    /** 禁用状态类名 */
    readonly DISABLED: 'disable';
    /** 不可用状态类名 */
    readonly UNUSABLE: 'unusable';
    /** VIP 图标类名 */
    readonly VIP_ICON: 'vipIcon';
    /** 免费试用标签类名 */
    readonly FREE_TRIAL: 'freeTrialItem';
    /** 菜单项图标类名 */
    readonly ITEM_ICON: 'hs-left-item-icon';
    /** 菜单项标签类名 */
    readonly ITEM_LABEL: 'hs-left-item-label';
    /** 快捷键提示类名 */
    readonly HOTKEY_TIP: 'hs-left-item-hotkey-tip';
    /** 子菜单容器类名 */
    readonly SUB_MENU: 'hs-left-item-sub-menu';
    /** 左侧菜单容器类名 */
    readonly LEFT_MENU: 'hs-left-menu';
    /** 菜单主体区域类名 */
    readonly MENU_MAINLAND: 'hs-left-menu-mainland';
    /** 菜单遮罩层类名 */
    readonly MENU_MASK: 'hs-left-menu-mask';
    /** 可拖动控制条类名 */
    readonly MOVE_BAR: 'hs-left-menu-move-bar';
    /** 扩展按钮类名 */
    readonly EXTEND_BTN: 'hs-left-menu-extend-btn';
    /** 分隔线类名 */
    readonly DIVIDER: 'hs-left-item-divider';
    /** 组分隔线类名 */
    readonly GROUP_DIVIDER: 'hs-left-item-group-divider';
  };

  /**
   * 样式尺寸常量
   */
  const DIMENSIONS: {
    /** 菜单项最小宽度（像素） */
    readonly MIN_WIDTH: 43;
    /** 图标尺寸（像素） */
    readonly ICON_SIZE: 20;
    /** 字体大小（像素） */
    readonly FONT_SIZE: 12;
    /** 边框圆角（像素） */
    readonly BORDER_RADIUS: 8;
  };

  /**
   * 颜色常量
   */
  const COLORS: {
    /** 文字颜色 */
    readonly TEXT: '#fff';
    /** 背景色（半透明黑） */
    readonly BACKGROUND: 'rgba(0, 0, 0, 0.85)';
    /** 悬停背景色 */
    readonly HOVER_BG: 'hsla(0, 0%, 100%, 0.1)';
    /** 禁用状态透明度 */
    readonly DISABLED_OPACITY: 0.5;
  };
}

/**
 * 全局组件盒模型类名
 */
declare const HOMESTYLER_UI_COMPONENTS: 'homestyler-ui-components';

/**
 * CSS 模块导出的样式字符串
 * 包含完整的 Popover 和左侧菜单组件样式定义
 */
declare const homestylerPopoverStyles: string;

export {
  HomestylerPopoverStyles,
  HomestylerLeftMenuStyles,
  HOMESTYLER_UI_COMPONENTS,
  homestylerPopoverStyles as default
};