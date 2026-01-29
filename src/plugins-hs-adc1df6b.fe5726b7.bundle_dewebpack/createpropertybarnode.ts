enum PropertyBarType {
  PropertyBar = 'PropertyBar',
  FirstLevelNode = 'FirstLevelNode',
  SecondLevelNode = 'SecondLevelNode',
  ThirdLevelNode = 'ThirdLevelNode',
  FloatItem = 'FloatItem'
}

enum UIMode {
  layoutDesignMode = 'layoutDesignMode'
}

enum PluginType {
  Ngmmixpaint = 'Ngmmixpaint'
}

enum ConfigKey {
  propertyBar = 'propertyBar'
}

interface PropertyBarNodeData {
  type: PropertyBarType;
  id?: string;
  parentId?: string;
  order?: number;
  items?: PropertyBarNodeData[];
  uiMode?: UIMode[];
  label?: string;
  data?: Record<string, unknown>;
}

interface PluginInterface {
  getBenefitAmount?: () => unknown;
  showMarketModal?: () => unknown;
}

interface AppSettings {
  layoutDesignMode?: boolean;
}

interface App {
  appSettings: AppSettings;
  pluginManager: {
    getPlugin(type: PluginType): PluginInterface | null;
  };
}

interface LayoutModeManager {
  filterData(config: {
    data: PropertyBarNodeData[];
    configKey: ConfigKey;
    keyPropertyName: string;
  }): PropertyBarNodeData[];
}

interface LayoutMode {
  LayoutModeManager: {
    getInstance(): LayoutModeManager;
  };
  ConfigKey: typeof ConfigKey;
}

declare const HSFPConstants: {
  PropertyBarType: typeof PropertyBarType;
  UIMode: typeof UIMode;
  PluginType: typeof PluginType;
};

declare const HSApp: {
  App: {
    getApp(): App;
  };
  LayoutMode: LayoutMode;
};

interface PropertyBarNode {
  initData(): void;
  setFloatItems(items: unknown[]): void;
  insert(node: PropertyBarNodeData | PropertyBarNode, parentId?: string): void;
}

class PropertyBarNodeClass implements PropertyBarNode {
  constructor(data: PropertyBarNodeData) {}
  initData(): void {}
  setFloatItems(items: unknown[]): void {}
  insert(node: PropertyBarNodeData | PropertyBarNode, parentId?: string): void {}
}

class FirstLevelNodeClass extends PropertyBarNodeClass {}
class SecondLevelNodeClass extends PropertyBarNodeClass {}
class ThirdLevelNodeClass extends PropertyBarNodeClass {}

export function CreatePropertyBarNode(data: PropertyBarNodeData): PropertyBarNode | PropertyBarNodeData {
  switch (data.type) {
    case HSFPConstants.PropertyBarType.PropertyBar:
      return new PropertyBarNodeClass(data);
    case HSFPConstants.PropertyBarType.FirstLevelNode:
      return new FirstLevelNodeClass(data);
    case HSFPConstants.PropertyBarType.SecondLevelNode:
      return new SecondLevelNodeClass(data);
    case HSFPConstants.PropertyBarType.ThirdLevelNode:
      return new ThirdLevelNodeClass(data);
    default:
      return data;
  }
}

export function IsPropertyBarType(type: unknown): boolean {
  if (!type) {
    return false;
  }
  
  const validTypes = [
    HSFPConstants.PropertyBarType.PropertyBar,
    HSFPConstants.PropertyBarType.FirstLevelNode,
    HSFPConstants.PropertyBarType.SecondLevelNode,
    HSFPConstants.PropertyBarType.ThirdLevelNode
  ];
  
  return validTypes.includes(type as PropertyBarType);
}

function flattenPropertyBarItems(items: PropertyBarNodeData[], parentId?: string): PropertyBarNodeData[] {
  const result: PropertyBarNodeData[] = [];
  
  if (!items.length) {
    return result;
  }
  
  const clonedItems = [...items];
  
  clonedItems.forEach((item, index) => {
    if (!item) {
      return;
    }
    
    if (!item.parentId) {
      item.parentId = parentId;
    }
    
    if (!item.order) {
      if (index === 0) {
        item.order = 1;
      } else {
        const previousOrder = clonedItems[index - 1].order;
        if (previousOrder) {
          item.order = previousOrder + 0.1;
        }
      }
    }
    
    result.push(item);
    
    if (item.items) {
      if (item.type !== HSFPConstants.PropertyBarType.FloatItem) {
        result.push(...flattenPropertyBarItems(item.items, item.id));
        item.items = [];
      } else {
        item.parentId = parentId;
      }
    }
  });
  
  return result;
}

function enhanceWallDecorationData(items: PropertyBarNodeData[]): void {
  const wallDecorationNode = items.find(item => item.id === 'walldecorationAdvanced');
  
  if (!wallDecorationNode) {
    return;
  }
  
  const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Ngmmixpaint);
  
  const pluginMethods = {
    getBenefitAmount: () => plugin?.getBenefitAmount?.call(plugin),
    showMarketModal: () => plugin?.showMarketModal?.call(plugin)
  };
  
  wallDecorationNode.data = {
    ...(wallDecorationNode.data || {}),
    ...pluginMethods
  };
}

function mergePropertyBarConfig(target: PropertyBarNodeData, source: PropertyBarNodeData): void {
  if (!target || !source) {
    return;
  }
  
  const sourceItems = source.items || [];
  delete source.items;
  
  Object.assign(target, source);
  
  if (!target.items) {
    target.items = [];
  }
  
  target.items.xInsertCollection(1, sourceItems);
}

export function initPropertyBarDataModel(rawData: PropertyBarNodeData[]): PropertyBarNode {
  let flattenedData = flattenPropertyBarItems(rawData);
  
  enhanceWallDecorationData(flattenedData);
  
  const app = HSApp.App.getApp();
  if (app.appSettings.layoutDesignMode) {
    flattenedData = flattenedData.filter(item => 
      item.uiMode?.includes(HSFPConstants.UIMode.layoutDesignMode)
    );
  }
  
  const propertyBars = flattenedData.filter(item => 
    item.type === HSFPConstants.PropertyBarType.PropertyBar
  );
  
  let firstLevelNodes = flattenedData.filter(item => 
    item.type === HSFPConstants.PropertyBarType.FirstLevelNode
  );
  
  firstLevelNodes = HSApp.LayoutMode.LayoutModeManager.getInstance().filterData({
    data: firstLevelNodes,
    configKey: HSApp.LayoutMode.ConfigKey.propertyBar,
    keyPropertyName: 'label'
  });
  
  const secondLevelNodes = flattenedData.filter(item => 
    item.type === HSFPConstants.PropertyBarType.SecondLevelNode
  );
  
  const thirdLevelNodes = flattenedData.filter(item => 
    item.type === HSFPConstants.PropertyBarType.ThirdLevelNode
  );
  
  const floatItems = flattenedData.filter(item => 
    item.type === HSFPConstants.PropertyBarType.FloatItem
  );
  
  const otherNodes = flattenedData.filter(item => 
    ![
      HSFPConstants.PropertyBarType.PropertyBar,
      HSFPConstants.PropertyBarType.FirstLevelNode,
      HSFPConstants.PropertyBarType.SecondLevelNode,
      HSFPConstants.PropertyBarType.ThirdLevelNode,
      HSFPConstants.PropertyBarType.FloatItem
    ].includes(item.type)
  );
  
  const rootConfig: PropertyBarNodeData = {
    type: HSFPConstants.PropertyBarType.PropertyBar
  };
  
  propertyBars.forEach(bar => {
    mergePropertyBarConfig(rootConfig, bar);
  });
  
  const rootNode = CreatePropertyBarNode(rootConfig) as PropertyBarNode;
  rootNode.initData();
  
  floatItems.forEach(floatItem => {
    if (!floatItem.parentId) {
      rootNode.setFloatItems(floatItem.items || []);
    }
  });
  
  firstLevelNodes.forEach(node => {
    const nodeInstance = CreatePropertyBarNode(node) as PropertyBarNode;
    
    floatItems.forEach(floatItem => {
      if (floatItem.parentId && node.id === floatItem.parentId) {
        nodeInstance.setFloatItems(floatItem.items || []);
      }
    });
    
    rootNode.insert(nodeInstance);
  });
  
  secondLevelNodes.forEach(node => {
    if (node.parentId) {
      rootNode.insert(node, node.parentId);
    }
  });
  
  thirdLevelNodes.forEach(node => {
    if (node.parentId) {
      rootNode.insert(node, node.parentId);
    }
  });
  
  otherNodes.forEach(node => {
    if (node.parentId) {
      rootNode.insert(node, node.parentId);
    }
  });
  
  return rootNode;
}