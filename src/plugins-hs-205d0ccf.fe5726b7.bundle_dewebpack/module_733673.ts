import React from 'react';
import PropTypes from 'prop-types';
import FolderComponent from './FolderComponent';
import ButtonComponent from './ButtonComponent';
import DividerComponent from './DividerComponent';
import ItemTypes from './ItemTypes';

interface ToolbarItemData {
  visible?: boolean;
  enable?: boolean;
  badge?: string | number;
  count?: number;
  hover?: boolean;
  firstTooltip?: string;
  isImg?: boolean;
  bgImg?: string;
  showTipBySignal?: boolean;
  delayDisappearTime?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  lineType?: string;
  hiddenIcon?: boolean;
  icon?: string;
  iconhover?: string;
  catagory?: string;
  label?: string;
  labelIcon?: string;
  tooltip?: string;
  isPressed?: boolean;
  dynamicTooltip?: string;
  styleName?: string;
  showNewCallBack?: () => void;
  popover?: React.ReactNode;
  width?: number;
  hotkey?: string;
  customTip?: React.ReactNode;
  hasDot?: boolean;
  onButtonMouseEnter?: () => void;
  onButtonMouseLeave?: () => void;
  lock?: boolean;
  guidetip?: string;
  infoIcon?: string;
  isChecked?: boolean;
  group?: string;
}

interface ToolbarItem {
  name: string;
  type: string;
  data: ToolbarItemData;
  childItems: ToolbarItem[];
  click?: () => void;
  signalChanged?: unknown;
  hasChildPressed?: boolean;
  hasBadgeDot?: boolean;
  hasWarning?: boolean;
  getPath: () => string;
}

interface Toolbar {
  getRoot: () => { childItems: ToolbarItem[] };
  isInDefaultEnv: () => boolean;
}

interface ToolbarProps {
  isActive: boolean;
  toolbar: Toolbar;
  showSecondToolbar?: boolean;
  signalToolbarHover?: {
    dispatch: (payload: { isHover: boolean }) => void;
  };
  toolTipSignalHook?: unknown;
}

function Toolbar(props: ToolbarProps): React.ReactElement | null {
  const { isActive, toolbar } = props;

  if (!isActive) {
    return null;
  }

  const displayStyle = {
    display: isActive ? 'inline-flex' : 'none'
  };

  const contentElements: React.ReactElement[] = [];
  const classNames = ['toollist'];
  const rootNode = toolbar.getRoot();
  const secondLineItems: ToolbarItem[] = [];
  const mainLineItems: ToolbarItem[] = [];

  rootNode.childItems.forEach((item) => {
    if (item.data.visible !== false && (item.type !== ItemTypes.folder || item.childItems.length !== 0)) {
      if (item.data.lineType === 'second') {
        if (props.showSecondToolbar) {
          secondLineItems.push(item);
        }
      } else {
        mainLineItems.push(item);
      }
    }
  });

  if (!toolbar.isInDefaultEnv()) {
    classNames.push('toolbar-in-sub-env');
  }

  if (mainLineItems.length > 0) {
    contentElements.push(
      React.createElement(
        'ul',
        { className: classNames.join(' ') },
        mainLineItems.map((item) => {
          const itemData = item.data;
          let element: React.ReactElement;

          switch (item.type) {
            case ItemTypes.folder:
              element = React.createElement(FolderComponent, {
                delayDisappearTime: itemData.delayDisappearTime,
                hover: itemData.hover,
                onMouseEnter: itemData.onMouseEnter,
                onMouseLeave: itemData.onMouseLeave,
                key: item.name,
                isTopLevel: true,
                visible: itemData.visible,
                enable: itemData.enable,
                count: itemData.count,
                onclick: item.click?.bind(item),
                badge: itemData.badge,
                lineType: itemData.lineType,
                hiddenIcon: itemData.hiddenIcon,
                icon: itemData.icon,
                isImg: itemData.isImg,
                bgImg: toolbar.isInDefaultEnv() ? itemData.bgImg : undefined,
                firstTooltip: itemData.firstTooltip,
                iconhover: itemData.iconhover || itemData.icon,
                catagory: itemData.catagory,
                label: itemData.label,
                labelIcon: itemData.labelIcon,
                tooltip: itemData.tooltip,
                childItems: item.childItems,
                isPressed: itemData.isPressed,
                dynamicTooltip: itemData.dynamicTooltip,
                hasChildPressed: item.hasChildPressed,
                hasDot: item.hasBadgeDot,
                path: item.getPath(),
                isToolbarActive: isActive,
                styleName: itemData.styleName,
                hasWarning: item.hasWarning,
                showNewCallBack: itemData.showNewCallBack,
                toolTipSignalHook: props.toolTipSignalHook,
                showTipBySignal: itemData.showTipBySignal
              });
              break;
            case ItemTypes.divider:
              element = React.createElement(DividerComponent, {
                key: item.name,
                isTopLevel: true
              });
              break;
            case ItemTypes.button:
            default:
              element = React.createElement(ButtonComponent, {
                key: item.name,
                isTopLevel: true,
                visible: itemData.visible,
                enable: itemData.enable,
                badge: itemData.badge,
                lineType: itemData.lineType,
                hiddenIcon: itemData.hiddenIcon,
                signalChanged: item.signalChanged,
                icon: itemData.icon,
                iconhover: itemData.iconhover || itemData.icon,
                label: itemData.label,
                tooltip: itemData.tooltip,
                popover: itemData.popover,
                onclick: item.click!.bind(item),
                width: itemData.width,
                isPressed: itemData.isPressed,
                path: item.getPath(),
                hotkey: itemData.hotkey,
                customTip: itemData.customTip,
                hasDot: itemData.hasDot,
                onButtonMouseEnter: itemData.onButtonMouseEnter,
                onButtonMouseLeave: itemData.onButtonMouseLeave,
                lock: itemData.lock,
                guidetip: itemData.guidetip,
                styleName: itemData.styleName,
                infoIcon: itemData.infoIcon
              });
          }

          return element;
        })
      )
    );
    classNames.push('tool-list-secline');
  } else if (toolbar.isInDefaultEnv()) {
    classNames.push('hs-hover-shadow');
  }

  const secondLineItemCount = secondLineItems.length;

  return React.createElement(
    'div',
    {
      className: `toolbar ${isActive ? 'active-toolbar' : ''}`,
      style: displayStyle,
      onMouseEnter: () => {
        props.signalToolbarHover?.dispatch({ isHover: true });
      },
      onMouseLeave: () => {
        props.signalToolbarHover?.dispatch({ isHover: false });
      }
    },
    contentElements.length > 0 && contentElements,
    secondLineItemCount > 0 &&
      React.createElement(
        'ul',
        { className: classNames.join(' ') },
        contentElements.length > 0
          ? renderGroupedItems(secondLineItems)
          : secondLineItems.map((item) => {
              const itemData = item.data;
              let element: React.ReactElement;

              switch (item.type) {
                case ItemTypes.folder:
                  element = React.createElement(FolderComponent, {
                    delayDisappearTime: itemData.delayDisappearTime,
                    hover: itemData.hover,
                    onMouseEnter: itemData.onMouseEnter,
                    onMouseLeave: itemData.onMouseLeave,
                    isChecked: itemData.isChecked,
                    count: itemData.count,
                    key: item.name,
                    isTopLevel: true,
                    visible: itemData.visible,
                    enable: itemData.enable,
                    badge: itemData.badge,
                    icon: itemData.icon,
                    iconhover: itemData.iconhover || itemData.icon,
                    catagory: itemData.catagory,
                    label: itemData.label,
                    labelIcon: itemData.labelIcon,
                    tooltip: itemData.tooltip,
                    isImg: itemData.isImg,
                    childItems: item.childItems,
                    isPressed: itemData.isPressed,
                    dynamicTooltip: itemData.dynamicTooltip,
                    hasChildPressed: item.hasChildPressed,
                    hasDot: item.hasBadgeDot,
                    path: item.getPath(),
                    isToolbarActive: isActive,
                    styleName: itemData.styleName,
                    hasWarning: item.hasWarning
                  });
                  break;
                case ItemTypes.divider:
                  element = React.createElement(DividerComponent, {
                    key: item.name,
                    isTopLevel: true
                  });
                  break;
                case ItemTypes.button:
                default:
                  element = React.createElement(ButtonComponent, {
                    key: item.name,
                    isTopLevel: true,
                    visible: itemData.visible,
                    enable: itemData.enable,
                    badge: itemData.badge,
                    count: itemData.count,
                    signalChanged: item.signalChanged,
                    icon: itemData.icon,
                    iconhover: itemData.iconhover || itemData.icon,
                    label: itemData.label,
                    tooltip: itemData.tooltip,
                    popover: itemData.popover,
                    onclick: item.click!.bind(item),
                    width: itemData.width,
                    isPressed: itemData.isPressed,
                    path: item.getPath(),
                    hotkey: itemData.hotkey,
                    customTip: itemData.customTip,
                    hasDot: itemData.hasDot,
                    onButtonMouseEnter: itemData.onButtonMouseEnter,
                    onButtonMouseLeave: itemData.onButtonMouseLeave,
                    lock: itemData.lock,
                    guidetip: itemData.guidetip,
                    styleName: itemData.styleName,
                    infoIcon: itemData.infoIcon
                  });
              }

              return element;
            })
      )
  );
}

function renderGroupedItems(items: ToolbarItem[]): React.ReactElement {
  const group01Items: ToolbarItem[] = [];
  const leftItems: ToolbarItem[] = [];
  const mediumItems: ToolbarItem[] = [];
  const defaultItems: ToolbarItem[] = [];

  items.forEach((item) => {
    switch (item.data.group) {
      case 'group01':
        group01Items.push(item);
        break;
      case 'left':
        leftItems.push(item);
        break;
      case 'medium':
        mediumItems.push(item);
        break;
      default:
        defaultItems.push(item);
    }
  });

  const hasGroup01 = group01Items.length > 0;
  const hasLeft = leftItems.length > 0;
  const hasMedium = mediumItems.length > 0;
  const hasDefault = defaultItems.length > 0;

  return React.createElement(
    'div',
    null,
    hasGroup01 && React.createElement('div', { className: 'group' }, renderItemList(group01Items)),
    hasLeft && React.createElement('div', { className: 'group' }, renderItemList(leftItems)),
    hasMedium && React.createElement('div', { className: 'group' }, renderItemList(mediumItems)),
    hasDefault && React.createElement('div', { className: 'group' }, renderItemList(defaultItems))
  );
}

function renderItemList(items: ToolbarItem[]): React.ReactElement[] {
  return items.map((item) => {
    const itemData = item.data;
    let element: React.ReactElement;

    switch (item.type) {
      case ItemTypes.folder:
        element = React.createElement(FolderComponent, {
          delayDisappearTime: itemData.delayDisappearTime,
          hover: itemData.hover,
          count: itemData.count,
          onMouseEnter: itemData.onMouseEnter,
          onMouseLeave: itemData.onMouseLeave,
          key: item.name,
          isTopLevel: true,
          visible: itemData.visible,
          enable: itemData.enable,
          badge: itemData.badge,
          icon: itemData.icon,
          isImg: itemData.isImg,
          iconhover: itemData.iconhover || itemData.icon,
          catagory: itemData.catagory,
          label: itemData.label,
          labelIcon: itemData.labelIcon,
          tooltip: itemData.tooltip,
          childItems: item.childItems,
          isPressed: itemData.isPressed,
          hasChildPressed: item.hasChildPressed,
          hasDot: item.hasBadgeDot,
          path: item.getPath(),
          styleName: itemData.styleName,
          hasWarning: item.hasWarning
        });
        break;
      case ItemTypes.divider:
        element = React.createElement(DividerComponent, {
          key: item.name,
          isTopLevel: true
        });
        break;
      case ItemTypes.button:
      default:
        element = React.createElement(ButtonComponent, {
          key: item.name,
          isTopLevel: true,
          visible: itemData.visible,
          enable: itemData.enable,
          badge: itemData.badge,
          signalChanged: item.signalChanged,
          icon: itemData.icon,
          iconhover: itemData.iconhover || itemData.icon,
          label: itemData.label,
          tooltip: itemData.tooltip,
          popover: itemData.popover,
          onclick: item.click!.bind(item),
          width: itemData.width,
          isPressed: itemData.isPressed,
          path: item.getPath(),
          hotkey: itemData.hotkey,
          customTip: itemData.customTip,
          hasDot: itemData.hasDot,
          onButtonMouseEnter: itemData.onButtonMouseEnter,
          onButtonMouseLeave: itemData.onButtonMouseLeave,
          lock: itemData.lock,
          guidetip: itemData.guidetip,
          styleName: itemData.styleName,
          infoIcon: itemData.infoIcon
        });
    }

    return element;
  });
}

Toolbar.propTypes = {
  isActive: PropTypes.bool.isRequired,
  toolbar: PropTypes.object.isRequired
};

export default Toolbar;