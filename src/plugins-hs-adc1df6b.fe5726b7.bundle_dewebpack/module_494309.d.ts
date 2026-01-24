/**
 * 帮助菜单项组件
 * 支持嵌套子菜单、工具提示、红点提示等功能
 */

import React from 'react';
import { IconfontView, Tooltip } from './IconComponents';
import SearchBox from './SearchBox';
import Divider from './Divider';
import Button from './Button';
import { ItemType } from './ItemType';

/**
 * 菜单项徽章配置
 */
interface Badge {
  /** 徽章文本 */
  text?: string;
  /** 徽章类型 */
  type?: 'dot' | 'number' | 'new';
}

/**
 * 弹出层配置
 */
interface Popover {
  /** 弹出内容 */
  content: React.ReactNode;
  /** 弹出位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * 子菜单项数据
 */
interface ChildItemData {
  /** 是否可见 */
  visible?: boolean;
  /** 是否启用 */
  enable?: boolean;
  /** 图标类型 */
  icon?: string;
  /** 标签文本 */
  label?: string;
  /** 弹出层配置 */
  popover?: Popover;
  /** 点击回调 */
  onclick?: () => void;
  /** 是否按下状态 */
  isPressed?: boolean;
  /** 徽章配置 */
  badge?: Badge;
  /** 快捷键 */
  hotkey?: string;
  /** 是否显示红点 */
  showRedDot?: boolean;
  /** 计数数字 */
  countNumber?: number;
  /** 是否显示新标签 */
  showNew?: boolean;
}

/**
 * 子菜单项
 */
interface ChildItem {
  /** 菜单项名称 */
  name: string;
  /** 菜单项类型 */
  type: ItemType;
  /** 菜单项数据 */
  data: ChildItemData;
  /** 嵌套子项 */
  childItems?: ChildItem[];
  /** 是否有子项被选中 */
  hasChildPressed?: boolean;
  /** 信号变化标识 */
  signalChanged?: boolean;
  /** 获取路径 */
  getPath: () => string;
}

/**
 * 组件属性
 */
export interface HelpItemProps {
  /** 是否启用 */
  enable: boolean;
  /** 是否可见 */
  visible?: boolean;
  /** 标签文本 */
  label: string;
  /** 图标类型 */
  icon: string;
  /** 子菜单项列表 */
  childItems: ChildItem[];
  /** 是否处于按下状态 */
  isPressed?: boolean;
  /** 是否有子项被选中 */
  hasChildPressed?: boolean;
  /** 徽章配置 */
  badge?: Badge;
  /** 菜单路径 */
  path: string;
  /** 是否显示红点提示 */
  showRedDot?: boolean;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 组件状态
 */
interface HelpItemState {
  /** 是否悬停 */
  hover: boolean;
  /** 图标是否悬停 */
  iconHover: boolean;
  /** 是否为引导模式 */
  isGuide: boolean;
}

/**
 * 帮助菜单项组件
 * 提供可展开的多级菜单、工具提示、计数徽章等功能
 */
export default class HelpItem extends React.Component<HelpItemProps, HelpItemState> {
  /** 语言切换提示的本地存储键 */
  private static readonly LANGUAGE_SWITCH_TOOLTIP_KEY = 'language_switch_new_tooltip';

  static propTypes = {
    enable: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    childItems: PropTypes.array.isRequired,
    isPressed: PropTypes.bool,
    hasChildPressed: PropTypes.bool,
    badge: PropTypes.object,
    path: PropTypes.string.isRequired,
    showRedDot: PropTypes.bool
  };

  static defaultProps = {
    visible: true,
    isPressed: false,
    hasChildPressed: false,
    badge: undefined
  };

  /** 子项是否悬停 */
  private isSubItemHovered: boolean = false;
  
  /** 鼠标是否离开 */
  private isMouseLeave: boolean = false;
  
  /** 工具提示引用 */
  private tooltipRef: React.RefObject<typeof Tooltip>;

  constructor(props: HelpItemProps) {
    super(props);

    this.state = {
      hover: false,
      iconHover: false,
      isGuide: HSApp.Util.Url.getQueryStrings().guide === 'restart'
    };

    this.tooltipRef = React.createRef();
  }

  /**
   * 组件接收新属性时的生命周期
   */
  UNSAFE_componentWillReceiveProps(nextProps: HelpItemProps): void {
    if (this.state.hover && this.isPropChanged(nextProps, 'enable')) {
      this.setState({ hover: false });
    }
  }

  /**
   * 检查属性是否变化
   */
  private isPropChanged<K extends keyof HelpItemProps>(
    nextProps: HelpItemProps,
    key: K
  ): boolean {
    return nextProps[key] !== this.props[key];
  }

  /**
   * 检查是否启用
   */
  private isEnabled(): boolean {
    return this.props.enable;
  }

  /**
   * 鼠标进入事件处理
   */
  private onMouseEnter = (): void => {
    if (this.isEnabled()) {
      this.isMouseLeave = false;
      this.setState({ hover: true });
    }
  };

  /**
   * 鼠标离开事件处理
   */
  private onMouseLeave = (): void => {
    this.isMouseLeave = true;
    if (!this.isSubItemHovered && this.state.hover) {
      this.setState({ hover: false });
    }
  };

  /**
   * 子菜单点击事件处理
   */
  private onSubMenuClick = (): void => {
    if (this.isEnabled()) {
      this.setState({ hover: false });
    }
  };

  /**
   * 文件夹点击事件处理
   */
  private folderClick = (): void => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  };

  /**
   * 子项鼠标进入事件处理
   */
  private handleSubItemEnter = (): void => {
    this.isSubItemHovered = true;
  };

  /**
   * 子项鼠标离开事件处理
   */
  private handleSubItemLeave = (): void => {
    this.isSubItemHovered = false;
    if (this.isMouseLeave) {
      this.onMouseLeave();
    }
  };

  /**
   * 关闭工具提示
   */
  private closeToolTip = (): void => {
    localStorage.setItem(HelpItem.LANGUAGE_SWITCH_TOOLTIP_KEY, 'true');
    this.tooltipRef.current?.close();
  };

  /**
   * 渲染可移除的工具提示内容
   */
  private tooltipCanRemove = (): React.ReactNode => {
    return (
      <div className="tool-tip-area">
        <div className="tool-tip-title">
          {ResourceManager.getString('usersetting_switch_language_tooltip')}
        </div>
        <IconfontView
          showType="hs_xian_guanbi"
          iconOnclick={this.closeToolTip}
          customStyle={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.3)'
          }}
        />
      </div>
    );
  };

  render(): React.ReactNode {
    const {
      enable,
      label,
      visible,
      childItems,
      isPressed,
      hasChildPressed,
      path,
      showRedDot
    } = this.props;

    const { hover, isGuide } = this.state;

    // 构建容器类名
    const containerClassNames = ['helpitem'];
    if (!visible) containerClassNames.push('hidden');
    if (!enable) containerClassNames.push('disabled');
    if (hover) containerClassNames.push('hover');
    if (isPressed || hasChildPressed) containerClassNames.push('actived');

    // 构建菜单类名
    const menuClassNames = ['moreoptions'];
    const bottomMenuClassNames = ['moreoptions'];
    
    if (hover) {
      menuClassNames.push('expandmenu');
      bottomMenuClassNames.push('expandmenu');
    }

    // 处理 URL 参数
    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const { env, taobaoId, reenterurl } = queryStrings;
    
    if (env && taobaoId && reenterurl) {
      menuClassNames.push('ihomeversion');
      bottomMenuClassNames.push('ihomeversion');
    }

    // 渲染底部菜单（搜索框）
    let bottomMenu: React.ReactNode = null;
    const hasSearchBox = childItems.some(item => item.type === ItemType.searchbox);
    
    if (hasSearchBox) {
      bottomMenu = (
        <ul className={bottomMenuClassNames.join(' ')} onClick={this.onSubMenuClick}>
          {childItems.map((item) => {
            if (item.type === ItemType.searchbox) {
              return (
                <SearchBox
                  key={item.name}
                  enable={item.data.enable}
                  label={item.data.label}
                  isPressed={item.data.isPressed}
                />
              );
            }
            return null;
          })}
        </ul>
      );
      menuClassNames.push('bottommoreoptions');
    }

    // 计算最大计数和是否显示新标签
    let maxCountNumber = 0;
    let hasNewBadge = false;
    
    childItems.forEach(item => {
      if (item.data.countNumber && item.data.countNumber > maxCountNumber) {
        maxCountNumber = item.data.countNumber;
      }
      if (item.data.showNew) {
        hasNewBadge = item.data.showNew;
      }
    });

    // 渲染帮助图标
    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const shouldShowTooltip = 
      isFpTenant && 
      localStorage.getItem(HelpItem.LANGUAGE_SWITCH_TOOLTIP_KEY) !== 'true' &&
      !hover &&
      !isGuide;

    let helpIcon: React.ReactNode = (
      <IconfontView
        showType={isFpTenant ? 'hs_xian_shezhi' : 'hs_mian_bangzhu'}
        customStyle={{
          fontSize: '20px',
          color: '#1c1c1c'
        }}
        customClass="helpicon"
      />
    );

    if (shouldShowTooltip) {
      helpIcon = (
        <Tooltip
          overlayClassName="switch-language-tool-tip"
          placement="bottom"
          trigger="new"
          title={this.tooltipCanRemove()}
          ref={this.tooltipRef}
          getPopupContainer={(element) => element.parentElement}
        >
          {helpIcon}
        </Tooltip>
      );
    }

    return (
      <li
        className={containerClassNames.join(' ')}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        data-helpbar-path={path}
        onClick={this.folderClick}
      >
        {bottomMenu}
        <ul className={menuClassNames.join(' ')} onClick={this.onSubMenuClick}>
          {childItems.map((item) => {
            const { data } = item;
            let renderedItem: React.ReactNode = null;

            switch (item.type) {
              case ItemType.folder:
                renderedItem = (
                  <HelpItem
                    key={item.name}
                    visible={data.visible}
                    enable={data.enable}
                    icon={data.icon}
                    label={data.label}
                    childItems={item.childItems}
                    isPressed={data.isPressed}
                    hasChildPressed={item.hasChildPressed}
                    badge={data.badge}
                    path={item.getPath()}
                    showRedDot={data.showRedDot}
                  />
                );
                break;
              case ItemType.divider:
                renderedItem = (
                  <Divider key={item.name} visible={data.visible} />
                );
                break;
              case ItemType.button:
              default:
                renderedItem = (
                  <Button
                    key={item.name}
                    visible={data.visible}
                    enable={data.enable}
                    icon={data.icon}
                    label={data.label}
                    popover={data.popover}
                    onclick={data.onclick}
                    isPressed={data.isPressed}
                    badge={data.badge}
                    signalChanged={item.signalChanged}
                    path={item.getPath()}
                    hotkey={data.hotkey}
                    showRedDot={data.showRedDot}
                    countNumber={data.countNumber}
                    showNew={data.showNew}
                  />
                );
            }

            return renderedItem;
          })}
        </ul>
        {helpIcon}
        {label && <span className="topLevelLabel">{label}</span>}
        {!maxCountNumber && (showRedDot || hasNewBadge) && (
          <span className="help-red-dot" />
        )}
        {maxCountNumber > 0 && (
          <span className="count-number">{maxCountNumber}</span>
        )}
      </li>
    );
  }
}