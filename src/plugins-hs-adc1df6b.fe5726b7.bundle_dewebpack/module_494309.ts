import React from 'react';
import { IconfontView, Tooltip } from './IconComponents';
import SearchBox from './SearchBox';
import Button from './Button';
import Divider from './Divider';
import ItemTypes from './ItemTypes';

interface BadgeData {
  // Define badge properties based on usage
  [key: string]: unknown;
}

interface ChildItemData {
  visible?: boolean;
  enable?: boolean;
  icon?: string;
  label?: string;
  popover?: string;
  onclick?: () => void;
  isPressed?: boolean;
  badge?: BadgeData;
  hotkey?: string;
  showRedDot?: boolean;
  countNumber?: number;
  showNew?: boolean;
}

interface ChildItem {
  type: string;
  name: string;
  data: ChildItemData;
  childItems?: ChildItem[];
  hasChildPressed?: boolean;
  signalChanged?: () => void;
  getPath: () => string;
}

interface HelpItemProps {
  enable: boolean;
  visible: boolean;
  label: string;
  icon: string;
  childItems: ChildItem[];
  isPressed?: boolean;
  hasChildPressed?: boolean;
  badge?: BadgeData;
  path: string;
  showRedDot?: boolean;
  onClick?: () => void;
}

interface HelpItemState {
  hover: boolean;
  iconHover: boolean;
  isGuide: boolean;
}

declare const HSApp: {
  Util: {
    Url: {
      getQueryStrings: () => Record<string, string>;
    };
  };
  Config: {
    TENANT: string;
  };
};

declare const ResourceManager: {
  getString: (key: string) => string;
};

const LANGUAGE_SWITCH_TOOLTIP_KEY = 'language_switch_new_tooltip';

class HelpItem extends React.Component<HelpItemProps, HelpItemState> {
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
    showRedDot: PropTypes.bool,
  };

  static defaultProps = {
    visible: true,
    isPressed: false,
    hasChildPressed: false,
    badge: undefined,
  };

  private _isSubItemHovered: boolean = false;
  private _isMouseLeave: boolean = false;
  private _tooltip: unknown = null;
  private tooltipRef: React.RefObject<typeof Tooltip>;

  constructor(props: HelpItemProps) {
    super(props);

    this.state = {
      hover: false,
      iconHover: false,
      isGuide: HSApp.Util.Url.getQueryStrings().guide === 'restart',
    };

    this.tooltipRef = React.createRef();

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onSubMenuClick = this._onSubMenuClick.bind(this);
    this._handleSubItemEnter = this._handleSubItemEnter.bind(this);
    this._handleSubItemLeave = this._handleSubItemLeave.bind(this);
    this.tooltipCanRemove = this.tooltipCanRemove.bind(this);
    this.folderClick = this.folderClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: HelpItemProps): void {
    if (this.state.hover && this._isPropChanged(nextProps, 'enable')) {
      this.setState({ hover: false });
    }
  }

  private _isPropChanged(nextProps: HelpItemProps, propName: keyof HelpItemProps): boolean {
    return nextProps[propName] !== this.props[propName];
  }

  private _isEnabled(): boolean {
    return this.props.enable;
  }

  private _onMouseEnter(): void {
    if (this._isEnabled()) {
      this._isMouseLeave = false;
      this.setState({ hover: true });
    }
  }

  private _onMouseLeave(): void {
    this._isMouseLeave = true;
    if (!this._isSubItemHovered && this.state.hover) {
      this.setState({ hover: false });
    }
  }

  private _onSubMenuClick(): void {
    if (this._isEnabled()) {
      this.setState({ hover: false });
    }
  }

  private folderClick(): void {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }

  private _handleSubItemEnter(): void {
    this._isSubItemHovered = true;
  }

  private _handleSubItemLeave(): void {
    this._isSubItemHovered = false;
    if (this._isMouseLeave) {
      this._onMouseLeave();
    }
  }

  private closeToolTip = (): void => {
    localStorage.setItem(LANGUAGE_SWITCH_TOOLTIP_KEY, 'true');
    this.tooltipRef.current?.close();
  };

  private tooltipCanRemove(): React.ReactElement {
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
            color: 'rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>
    );
  }

  render(): React.ReactElement {
    const {
      enable,
      label,
      visible,
      childItems,
      isPressed,
      hasChildPressed,
      path,
      showRedDot,
    } = this.props;

    const { hover, isGuide } = this.state;

    const helpItemClasses: string[] = ['helpitem'];
    if (!visible) helpItemClasses.push('hidden');
    if (!enable) helpItemClasses.push('disabled');
    if (hover) helpItemClasses.push('hover');
    if (isPressed || hasChildPressed) helpItemClasses.push('actived');

    const moreOptionsClasses: string[] = ['moreoptions'];
    const expandMenuClasses: string[] = ['moreoptions'];

    if (hover) {
      moreOptionsClasses.push('expandmenu');
      expandMenuClasses.push('expandmenu');
    }

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const { env, taobaoId, reenterurl } = queryStrings;

    if (env && taobaoId && reenterurl) {
      moreOptionsClasses.push('ihomeversion');
      expandMenuClasses.push('ihomeversion');
    }

    let searchBoxMenu: React.ReactElement | string = '';
    const hasSearchBox = childItems.some(item => item.type === ItemTypes.searchbox);

    if (hasSearchBox) {
      searchBoxMenu = (
        <ul className={expandMenuClasses.join(' ')} onClick={this._onSubMenuClick}>
          {childItems.map((item, index) => {
            const { data } = item;
            let element: React.ReactElement | string = '';

            if (item.type === ItemTypes.searchbox) {
              element = (
                <SearchBox
                  key={item.name}
                  enable={data.enable}
                  label={data.label}
                  isPressed={data.isPressed}
                />
              );
            }

            return element;
          })}
        </ul>
      );
      moreOptionsClasses.push('bottommoreoptions');
    }

    let maxCountNumber = 0;
    let hasNewIndicator = false;

    let helpIcon: React.ReactElement = (
      <IconfontView
        showType={HSApp.Config.TENANT === 'fp' ? 'hs_xian_shezhi' : 'hs_mian_bangzhu'}
        customStyle={{
          fontSize: '20px',
          color: '#1c1c1c',
        }}
        customClass="helpicon"
      />
    );

    const shouldShowTooltip = localStorage.getItem(LANGUAGE_SWITCH_TOOLTIP_KEY) !== 'true';

    if (HSApp.Config.TENANT === 'fp' && shouldShowTooltip && !hover && !isGuide) {
      helpIcon = (
        <Tooltip
          overlayClassName="switch-language-tool-tip"
          placement="bottom"
          trigger="new"
          title={this.tooltipCanRemove()}
          ref={this.tooltipRef}
          getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement!}
        >
          {helpIcon}
        </Tooltip>
      );
    }

    return (
      <li
        className={helpItemClasses.join(' ')}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        data-helpbar-path={path}
        onClick={this.folderClick}
      >
        {searchBoxMenu}
        <ul className={moreOptionsClasses.join(' ')} onClick={this._onSubMenuClick}>
          {childItems.map((item, index) => {
            const { data } = item;

            if (data.countNumber && data.countNumber > maxCountNumber) {
              maxCountNumber = data.countNumber;
            }

            if (data.showNew) {
              hasNewIndicator = data.showNew;
            }

            let element: React.ReactElement | string = '';

            switch (item.type) {
              case ItemTypes.folder:
                element = (
                  <HelpItem
                    key={item.name}
                    visible={data.visible}
                    enable={data.enable}
                    icon={data.icon!}
                    label={data.label!}
                    childItems={item.childItems!}
                    isPressed={data.isPressed}
                    hasChildPressed={item.hasChildPressed}
                    badge={data.badge}
                    path={item.getPath()}
                    showRedDot={data.showRedDot}
                  />
                );
                break;
              case ItemTypes.divider:
                element = <Divider key={item.name} visible={data.visible} />;
                break;
              case ItemTypes.button:
              default:
                element = (
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

            return element;
          })}
        </ul>
        {helpIcon}
        {label && <span className="topLevelLabel">{label}</span>}
        {!maxCountNumber && (showRedDot || hasNewIndicator) && (
          <span className="help-red-dot" />
        )}
        {!!maxCountNumber && <span className="count-number">{maxCountNumber}</span>}
      </li>
    );
  }
}

export default HelpItem;