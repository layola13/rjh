import React, { useState, useEffect, forwardRef, CSSProperties } from 'react';
import classNames from 'classnames';
import Menu, { MenuItem } from './Menu';
import KeyCode from './KeyCode';
import Dropdown from './Dropdown';
import EditableActions from './EditableActions';

interface Tab {
  key: string;
  tab: React.ReactNode;
  disabled?: boolean;
}

interface Locale {
  dropdownAriaLabel?: string;
}

interface EditableConfig {
  onEdit?: (type: 'add' | 'remove', info: { key: string; event: React.MouseEvent | React.KeyboardEvent }) => void;
  showAdd?: boolean;
  removeIcon?: React.ReactNode;
  addIcon?: React.ReactNode;
}

interface OperationsNodeProps {
  prefixCls: string;
  id: string;
  tabs: Tab[];
  locale?: Locale;
  mobile?: boolean;
  moreIcon?: React.ReactNode;
  moreTransitionName?: string;
  style?: CSSProperties;
  className?: string;
  editable?: EditableConfig;
  tabBarGutter?: number;
  rtl?: boolean;
  onTabClick: (key: string, event: React.MouseEvent | React.KeyboardEvent) => void;
}

function OperationsNode(props: OperationsNodeProps, ref: React.Ref<HTMLDivElement>) {
  const {
    prefixCls,
    id,
    tabs,
    locale,
    mobile,
    moreIcon = 'More',
    moreTransitionName,
    style,
    className,
    editable,
    tabBarGutter,
    rtl,
    onTabClick
  } = props;

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const popupId = `${id}-more-popup`;
  const dropdownClassName = `${prefixCls}-dropdown`;
  const activeDescendantId = selectedKey !== null ? `${popupId}-${selectedKey}` : null;
  const ariaLabel = locale?.dropdownAriaLabel;

  const dropdownMenu = (
    <Menu
      onClick={(event: { key: string; domEvent: React.MouseEvent }) => {
        const { key, domEvent } = event;
        onTabClick(key, domEvent);
        setDropdownVisible(false);
      }}
      id={popupId}
      tabIndex={-1}
      role="listbox"
      aria-activedescendant={activeDescendantId}
      selectedKeys={selectedKey ? [selectedKey] : []}
      aria-label={ariaLabel !== undefined ? ariaLabel : 'expanded dropdown'}
    >
      {tabs.map((tab: Tab) => (
        <MenuItem
          key={tab.key}
          id={`${popupId}-${tab.key}`}
          role="option"
          aria-controls={id ? `${id}-panel-${tab.key}` : undefined}
          disabled={tab.disabled}
        >
          {tab.tab}
        </MenuItem>
      ))}
    </Menu>
  );

  function navigateOptions(direction: number): void {
    const enabledTabs = tabs.filter((tab: Tab) => !tab.disabled);
    const currentIndex = enabledTabs.findIndex((tab: Tab) => tab.key === selectedKey) || 0;
    const totalCount = enabledTabs.length;

    for (let i = 0; i < totalCount; i++) {
      const nextIndex = (currentIndex + direction + totalCount) % totalCount;
      const nextTab = enabledTabs[nextIndex];
      if (!nextTab.disabled) {
        setSelectedKey(nextTab.key);
        return;
      }
    }
  }

  useEffect(() => {
    const activeElement = document.getElementById(activeDescendantId);
    if (activeElement?.scrollIntoView) {
      activeElement.scrollIntoView(false);
    }
  }, [selectedKey]);

  useEffect(() => {
    if (!dropdownVisible) {
      setSelectedKey(null);
    }
  }, [dropdownVisible]);

  const moreButtonStyle: CSSProperties = {
    ...(rtl ? { marginLeft: tabBarGutter } : { marginRight: tabBarGutter })
  };

  if (!tabs.length) {
    moreButtonStyle.visibility = 'hidden';
    moreButtonStyle.order = 1;
  }

  const dropdownClassNameWithRtl = classNames({
    [`${dropdownClassName}-rtl`]: rtl
  });

  const moreButton = mobile ? null : (
    <Dropdown
      prefixCls={dropdownClassName}
      overlay={dropdownMenu}
      trigger={['hover']}
      visible={dropdownVisible}
      transitionName={moreTransitionName}
      onVisibleChange={setDropdownVisible}
      overlayClassName={dropdownClassNameWithRtl}
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
    >
      <button
        type="button"
        className={`${prefixCls}-nav-more`}
        style={moreButtonStyle}
        tabIndex={-1}
        aria-hidden="true"
        aria-haspopup="listbox"
        aria-controls={popupId}
        id={`${id}-more`}
        aria-expanded={dropdownVisible}
        onKeyDown={(event: React.KeyboardEvent) => {
          const { which } = event;
          if (dropdownVisible) {
            switch (which) {
              case KeyCode.UP:
                navigateOptions(-1);
                event.preventDefault();
                break;
              case KeyCode.DOWN:
                navigateOptions(1);
                event.preventDefault();
                break;
              case KeyCode.ESC:
                setDropdownVisible(false);
                break;
              case KeyCode.SPACE:
              case KeyCode.ENTER:
                if (selectedKey !== null) {
                  onTabClick(selectedKey, event);
                }
                break;
            }
          } else if ([KeyCode.DOWN, KeyCode.SPACE, KeyCode.ENTER].includes(which)) {
            setDropdownVisible(true);
            event.preventDefault();
          }
        }}
      >
        {moreIcon}
      </button>
    </Dropdown>
  );

  return (
    <div
      className={classNames(`${prefixCls}-nav-operations`, className)}
      style={style}
      ref={ref}
    >
      {moreButton}
      <EditableActions
        prefixCls={prefixCls}
        locale={locale}
        editable={editable}
      />
    </div>
  );
}

export default forwardRef(OperationsNode);