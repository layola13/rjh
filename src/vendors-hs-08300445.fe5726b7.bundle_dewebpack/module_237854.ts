interface TabItem {
  key: string;
}

interface TabDimensions {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
}

interface TabsConfig {
  tabs: TabItem[];
  tabPosition: 'top' | 'bottom' | 'left' | 'right';
  rtl: boolean;
}

const DEFAULT_DIMENSIONS: TabDimensions = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  right: 0
};

export default function calculateVisibleRange(
  tabDimensionsMap: Map<string, TabDimensions>,
  containerDimensions: TabDimensions,
  contentDimensions: TabDimensions,
  operationsWidth: TabDimensions,
  config: TabsConfig
): [number, number] {
  const { tabs, tabPosition, rtl } = config;

  let dimensionKey: 'width' | 'height';
  let positionKey: 'left' | 'top' | 'right';
  let scrollOffset: number;

  if (['top', 'bottom'].includes(tabPosition)) {
    dimensionKey = 'width';
    positionKey = rtl ? 'right' : 'left';
    scrollOffset = Math.abs(containerDimensions.left);
  } else {
    dimensionKey = 'height';
    positionKey = 'top';
    scrollOffset = -containerDimensions.top;
  }

  const containerSize = containerDimensions[dimensionKey];
  const contentSize = contentDimensions[dimensionKey];
  const operationsSize = operationsWidth[dimensionKey];

  let availableSize = containerSize;
  if (contentSize + operationsSize > containerSize) {
    availableSize = containerSize - operationsSize;
  }

  return useMemo(() => {
    if (!tabs.length) {
      return [0, 0];
    }

    const totalTabs = tabs.length;
    let endIndex = totalTabs;

    for (let i = 0; i < totalTabs; i++) {
      const tabDimensions = tabDimensionsMap.get(tabs[i].key) ?? DEFAULT_DIMENSIONS;
      const tabPosition = tabDimensions[positionKey];
      const tabSize = tabDimensions[dimensionKey];

      if (tabPosition + tabSize > scrollOffset + availableSize) {
        endIndex = i - 1;
        break;
      }
    }

    let startIndex = 0;
    for (let i = totalTabs - 1; i >= 0; i--) {
      const tabDimensions = tabDimensionsMap.get(tabs[i].key) ?? DEFAULT_DIMENSIONS;
      const tabPosition = tabDimensions[positionKey];

      if (tabPosition < scrollOffset) {
        startIndex = i + 1;
        break;
      }
    }

    return [startIndex, endIndex];
  }, [
    tabDimensionsMap,
    scrollOffset,
    availableSize,
    tabPosition,
    tabs.map(tab => tab.key).join('_'),
    rtl
  ]);
}