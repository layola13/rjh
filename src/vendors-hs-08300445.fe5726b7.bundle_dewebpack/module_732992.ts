import { useContext, useRef, useMemo, useEffect, useState, useImperativeHandle, forwardRef, useCallback, ForwardRefRenderFunction, RefObject, CSSProperties } from 'react';
import KeyCode from './KeyCode';
import useMemoizedFn from './useMemoizedFn';
import { SelectContext, SelectContextProps } from './SelectContext';
import Tree from './Tree';
import useKeyValueMap from './useKeyValueMap';
import useKeyValueMapping from './useKeyValueMapping';

interface OptionData {
  value: string | number;
  selectable?: boolean;
  [key: string]: any;
}

interface FlattenOptionData {
  key: string;
  data: OptionData;
  [key: string]: any;
}

interface TreeNode {
  key: string;
  [key: string]: any;
}

interface SelectEvent {
  node: TreeNode;
  selected?: boolean;
}

interface ScrollToConfig {
  key: string;
}

export interface OptionListRef {
  scrollTo: (config: ScrollToConfig) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onKeyUp: () => void;
}

interface OptionListProps {
  prefixCls: string;
  height: number;
  itemHeight: number;
  virtual: boolean;
  options: any[];
  flattenOptions: FlattenOptionData[];
  multiple: boolean;
  searchValue: string;
  onSelect: (value: string | number, option: { selected: boolean }) => void;
  onToggleOpen: (open: boolean) => void;
  open: boolean;
  notFoundContent: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler;
}

const HIDDEN_STYLE: CSSProperties = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0,
};

const OptionList: ForwardRefRenderFunction<OptionListRef, OptionListProps> = (props, ref) => {
  const {
    prefixCls,
    height,
    itemHeight,
    virtual,
    options,
    flattenOptions,
    multiple,
    searchValue,
    onSelect,
    onToggleOpen,
    open,
    notFoundContent,
    onMouseEnter,
  } = props;

  const context = useContext(SelectContext);
  const {
    checkable,
    checkedKeys,
    halfCheckedKeys,
    treeExpandedKeys,
    treeDefaultExpandAll,
    treeDefaultExpandedKeys,
    onTreeExpand,
    treeIcon,
    showTreeIcon,
    switcherIcon,
    treeLine,
    treeNodeFilterProp,
    loadData,
    treeLoadedKeys,
    treeMotion,
    onTreeLoad,
  } = context;

  const treeRef = useRef<any>();

  const memoizedOptions = useMemoizedFn(
    () => options,
    [open, options],
    (prev, next) => next[0] && prev[1] !== next[1]
  );

  const keyValueMap = useKeyValueMap(flattenOptions);
  const [keyEntities, valueEntities] = keyValueMap;
  const keyValueMapping = useKeyValueMapping(keyEntities, valueEntities);
  const [getEntityByKey, getEntityByValue] = keyValueMapping;

  const selectedKeys = useMemo(() => {
    return checkedKeys.map((checkedKey) => {
      const entity = getEntityByValue(checkedKey);
      return entity ? entity.key : null;
    });
  }, [checkedKeys, getEntityByValue]);

  const checkInfo = useMemo(() => {
    return checkable
      ? {
          checked: selectedKeys,
          halfChecked: halfCheckedKeys,
        }
      : null;
  }, [selectedKeys, halfCheckedKeys, checkable]);

  useEffect(() => {
    if (open && !multiple && selectedKeys.length) {
      treeRef.current?.scrollTo({ key: selectedKeys[0] });
    }
  }, [open]);

  const lowerSearchValue = String(searchValue).toLowerCase();

  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(treeDefaultExpandedKeys);
  const [searchExpandedKeys, setSearchExpandedKeys] = useState<string[] | null>(null);

  const mergedExpandedKeys = useMemo(() => {
    if (treeExpandedKeys) {
      return [...treeExpandedKeys];
    }
    return searchValue ? searchExpandedKeys : internalExpandedKeys;
  }, [internalExpandedKeys, searchExpandedKeys, lowerSearchValue, treeExpandedKeys]);

  useEffect(() => {
    if (searchValue) {
      setSearchExpandedKeys(flattenOptions.map((option) => option.key));
    }
  }, [searchValue]);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleSelect = (value: any, event: SelectEvent) => {
    const nodeKey = event.node.key;
    const entity = getEntityByKey(nodeKey, checkable ? 'checkbox' : 'select');

    if (entity !== null) {
      onSelect(entity.data.value, {
        selected: !checkedKeys.includes(entity.data.value),
      });
    }

    if (!multiple) {
      onToggleOpen(false);
    }
  };

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const activeEntity = getEntityByKey(activeKey);

  useImperativeHandle(ref, () => ({
    scrollTo: treeRef.current?.scrollTo,
    onKeyDown: (event: React.KeyboardEvent) => {
      switch (event.which) {
        case KeyCode.UP:
        case KeyCode.DOWN:
        case KeyCode.LEFT:
        case KeyCode.RIGHT:
          treeRef.current?.onKeyDown(event);
          break;
        case KeyCode.ENTER:
          const nodeData = activeEntity?.data || {};
          const { selectable, value } = nodeData;
          if (selectable !== false) {
            handleSelect(0, {
              node: { key: activeKey },
              selected: !checkedKeys.includes(value),
            });
          }
          break;
        case KeyCode.ESC:
          onToggleOpen(false);
          break;
      }
    },
    onKeyUp: () => {},
  }));

  if (memoizedOptions.length === 0) {
    return (
      <div role="listbox" className={`${prefixCls}-empty`} onMouseDown={handleMouseDown}>
        {notFoundContent}
      </div>
    );
  }

  const treeProps: any = {};
  if (treeLoadedKeys) {
    treeProps.loadedKeys = treeLoadedKeys;
  }
  if (mergedExpandedKeys) {
    treeProps.expandedKeys = mergedExpandedKeys;
  }

  const handleExpand = (keys: string[]) => {
    setInternalExpandedKeys(keys);
    setSearchExpandedKeys(keys);
    onTreeExpand?.(keys);
  };

  const filterTreeNode = (node: any) => {
    return !!lowerSearchValue && String(node[treeNodeFilterProp]).toLowerCase().includes(lowerSearchValue);
  };

  return (
    <div onMouseDown={handleMouseDown} onMouseEnter={onMouseEnter}>
      {activeEntity && open && (
        <span style={HIDDEN_STYLE} aria-live="assertive">
          {activeEntity.data.value}
        </span>
      )}
      <Tree
        ref={treeRef}
        focusable={false}
        prefixCls={`${prefixCls}-tree`}
        treeData={memoizedOptions}
        height={height}
        itemHeight={itemHeight}
        virtual={virtual}
        multiple={multiple}
        icon={treeIcon}
        showIcon={showTreeIcon}
        switcherIcon={switcherIcon}
        showLine={treeLine}
        loadData={searchValue ? null : loadData}
        motion={treeMotion}
        checkable={checkable}
        checkStrictly={true}
        checkedKeys={checkInfo}
        selectedKeys={checkable ? [] : selectedKeys}
        defaultExpandAll={treeDefaultExpandAll}
        {...treeProps}
        onActiveChange={setActiveKey}
        onSelect={handleSelect}
        onCheck={handleSelect}
        onExpand={handleExpand}
        onLoad={onTreeLoad}
        filterTreeNode={filterTreeNode}
      />
    </div>
  );
};

const OptionListComponent = forwardRef(OptionList);
OptionListComponent.displayName = 'OptionList';

export default OptionListComponent;