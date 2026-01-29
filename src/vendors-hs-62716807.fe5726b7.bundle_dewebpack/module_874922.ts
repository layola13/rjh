import React, { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Empty from 'antd/lib/empty';
import Checkbox from 'antd/lib/checkbox';
import Radio from 'antd/lib/radio';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import { ConfigContext } from 'antd/lib/config-provider';
import { useControlledState } from '../hooks/useControlledState';
import { isArrayEqual } from '../utils/arrayUtils';

const { SubMenu, Item } = Menu;

interface FilterValue {
  text: React.ReactNode;
  value: string | number | boolean;
  children?: FilterValue[];
}

interface FilterState {
  filteredKeys?: React.Key[];
  forceFiltered?: boolean;
}

interface ColumnType {
  filters?: FilterValue[];
  filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode);
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
}

interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (keys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: () => void;
  clearFilters: () => void;
  filters?: FilterValue[];
  visible: boolean;
}

interface FilterMenuProps {
  filters: FilterValue[];
  prefixCls: string;
  filteredKeys: React.Key[];
  filterMultiple: boolean;
  locale: Locale;
}

interface Locale {
  filterEmptyText?: React.ReactNode;
  filterReset?: React.ReactNode;
  filterConfirm?: React.ReactNode;
}

interface FilterDropdownComponentProps {
  prefixCls: string;
  column: ColumnType;
  dropdownPrefixCls: string;
  columnKey: React.Key;
  filterMultiple: boolean;
  filterState?: FilterState;
  triggerFilter: (params: TriggerFilterParams) => void;
  locale: Locale;
  children?: React.ReactNode;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
}

interface TriggerFilterParams {
  column: ColumnType;
  key: React.Key;
  filteredKeys: React.Key[] | null;
}

function renderFilterMenu({
  filters,
  prefixCls,
  filteredKeys,
  filterMultiple,
  locale
}: FilterMenuProps): React.ReactNode {
  if (filters.length === 0) {
    return (
      <div style={{ margin: '16px 0' }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={locale.filterEmptyText}
          imageStyle={{ height: 24 }}
        />
      </div>
    );
  }

  return filters.map((filter, index) => {
    const key = String(filter.value);

    if (filter.children) {
      return (
        <SubMenu
          key={key || index}
          title={filter.text}
          popupClassName={`${prefixCls}-dropdown-submenu`}
        >
          {renderFilterMenu({
            filters: filter.children,
            prefixCls,
            filteredKeys,
            filterMultiple,
            locale
          })}
        </SubMenu>
      );
    }

    const SelectionComponent = filterMultiple ? Checkbox : Radio;

    return (
      <Item key={filter.value !== undefined ? key : index}>
        <SelectionComponent checked={filteredKeys.includes(key)} />
        <span>{filter.text}</span>
      </Item>
    );
  });
}

export default function FilterDropdown({
  prefixCls,
  column,
  dropdownPrefixCls,
  columnKey,
  filterMultiple,
  filterState,
  triggerFilter,
  locale,
  children,
  getPopupContainer
}: FilterDropdownComponentProps): React.ReactElement {
  const [internalVisible, setInternalVisible] = useState(false);
  
  const hasFilter = Boolean(
    filterState && 
    (filterState.filteredKeys?.length || filterState.forceFiltered)
  );

  const handleVisibleChange = (visible: boolean): void => {
    setInternalVisible(visible);
    column.onFilterDropdownVisibleChange?.(visible);
  };

  const visible = typeof column.filterDropdownVisible === 'boolean' 
    ? column.filterDropdownVisible 
    : internalVisible;

  const defaultFilteredKeys = filterState?.filteredKeys;
  const [selectedKeys, setSelectedKeys] = useControlledState<React.Key[]>(
    defaultFilteredKeys || []
  );

  const handleSelect = ({ selectedKeys: keys }: { selectedKeys: React.Key[] }): void => {
    setSelectedKeys(keys);
  };

  useEffect(() => {
    handleSelect({ selectedKeys: defaultFilteredKeys || [] });
  }, [defaultFilteredKeys]);

  const [openKeys, setOpenKeys] = useState<React.Key[]>([]);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const confirmFilter = (keys: React.Key[]): void => {
    handleVisibleChange(false);
    const filteredKeys = keys.length > 0 ? keys : null;

    if (filteredKeys === null && !filterState?.filteredKeys) {
      return;
    }

    if (isArrayEqual(filteredKeys, filterState?.filteredKeys ?? null)) {
      return;
    }

    triggerFilter({
      column,
      key: columnKey,
      filteredKeys
    });
  };

  const handleConfirm = (): void => {
    confirmFilter(selectedKeys);
  };

  const handleClearFilters = (): void => {
    setSelectedKeys([]);
    confirmFilter([]);
  };

  const menuClassName = classNames({
    [`${dropdownPrefixCls}-menu-without-submenu`]: !(column.filters || []).some(
      filter => filter.children
    )
  });

  let dropdownContent: React.ReactNode;

  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (keys) => handleSelect({ selectedKeys: keys }),
      selectedKeys,
      confirm: handleConfirm,
      clearFilters: handleClearFilters,
      filters: column.filters,
      visible
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    const currentSelectedKeys = selectedKeys || [];

    dropdownContent = (
      <>
        <Menu
          multiple={filterMultiple}
          prefixCls={`${dropdownPrefixCls}-menu`}
          className={menuClassName}
          onClick={() => window.clearTimeout(timeoutRef.current)}
          onSelect={handleSelect}
          onDeselect={handleSelect}
          selectedKeys={currentSelectedKeys}
          getPopupContainer={getPopupContainer}
          openKeys={openKeys}
          onOpenChange={(keys) => {
            timeoutRef.current = window.setTimeout(() => {
              setOpenKeys(keys);
            });
          }}
        >
          {renderFilterMenu({
            filters: column.filters || [],
            prefixCls,
            filteredKeys: selectedKeys,
            filterMultiple,
            locale
          })}
        </Menu>
        <div className={`${prefixCls}-dropdown-btns`}>
          <Button
            type="link"
            size="small"
            disabled={currentSelectedKeys.length === 0}
            onClick={handleClearFilters}
          >
            {locale.filterReset}
          </Button>
          <Button type="primary" size="small" onClick={handleConfirm}>
            {locale.filterConfirm}
          </Button>
        </div>
      </>
    );
  }

  const overlay = (
    <div className={`${prefixCls}-dropdown`}>
      {dropdownContent}
    </div>
  );

  let filterIcon: React.ReactNode;
  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(hasFilter);
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon;
  } else {
    filterIcon = <FilterOutlined />;
  }

  const { direction } = useContext(ConfigContext);

  return (
    <div className={classNames(`${prefixCls}-column`)}>
      <span className={`${prefixCls}-column-title`}>{children}</span>
      <span
        className={classNames(`${prefixCls}-trigger-container`, {
          [`${prefixCls}-trigger-container-open`]: visible
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <Dropdown
          overlay={overlay}
          trigger={['click']}
          visible={visible}
          onVisibleChange={(isVisible) => {
            if (isVisible && defaultFilteredKeys !== undefined) {
              setSelectedKeys(defaultFilteredKeys || []);
            }
            handleVisibleChange(isVisible);
            if (!isVisible && !column.filterDropdown) {
              handleConfirm();
            }
          }}
          getPopupContainer={getPopupContainer}
          placement={direction === 'rtl' ? 'bottomLeft' : 'bottomRight'}
        >
          <span
            role="button"
            tabIndex={-1}
            className={classNames(`${prefixCls}-trigger`, {
              active: hasFilter
            })}
          >
            {filterIcon}
          </span>
        </Dropdown>
      </span>
    </div>
  );
}