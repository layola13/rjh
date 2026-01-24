/**
 * 属性栏节点创建与初始化模块
 * 提供属性栏节点的工厂方法和数据模型初始化功能
 */

/**
 * 属性栏节点数据接口
 */
interface PropertyBarNodeData {
  /** 节点唯一标识 */
  id?: string;
  /** 节点类型 */
  type: HSFPConstants.PropertyBarType;
  /** 父节点ID */
  parentId?: string;
  /** 排序值 */
  order?: number;
  /** 子项列表 */
  items?: PropertyBarNodeData[];
  /** UI显示模式 */
  uiMode?: HSFPConstants.UIMode[];
  /** 节点标签 */
  label?: string;
  /** 附加数据 */
  data?: Record<string, unknown>;
}

/**
 * 属性栏节点基类接口
 */
interface IPropertyBarNode {
  /** 初始化节点数据 */
  initData(): void;
  /** 插入子节点 */
  insert(node: PropertyBarNodeData | IPropertyBarNode, parentId?: string): void;
  /** 设置浮动项 */
  setFloatItems?(items: PropertyBarNodeData[]): void;
}

/**
 * 高级墙面装饰插件数据接口
 */
interface WallDecorationAdvancedData {
  /** 获取优惠金额 */
  getBenefitAmount(): number | undefined;
  /** 显示市场弹窗 */
  showMarketModal(): void;
}

/**
 * 根据节点类型创建对应的属性栏节点实例
 * @param nodeData - 节点数据对象
 * @returns 创建的属性栏节点实例或原始数据
 */
export function CreatePropertyBarNode(
  nodeData: PropertyBarNodeData
): IPropertyBarNode | PropertyBarNodeData {
  switch (nodeData.type) {
    case HSFPConstants.PropertyBarType.PropertyBar:
      // 创建属性栏根节点
      return new PropertyBarNode(nodeData);
    case HSFPConstants.PropertyBarType.FirstLevelNode:
      // 创建一级节点
      return new FirstLevelNode(nodeData);
    case HSFPConstants.PropertyBarType.SecondLevelNode:
      // 创建二级节点
      return new SecondLevelNode(nodeData);
    case HSFPConstants.PropertyBarType.ThirdLevelNode:
      // 创建三级节点
      return new ThirdLevelNode(nodeData);
    default:
      // 未知类型返回原始数据
      return nodeData;
  }
}

/**
 * 判断给定类型是否为有效的属性栏节点类型
 * @param type - 待检查的类型值
 * @returns 是否为属性栏节点类型
 */
export function IsPropertyBarType(type: unknown): type is HSFPConstants.PropertyBarType {
  if (!type) {
    return false;
  }

  const validTypes: HSFPConstants.PropertyBarType[] = [
    HSFPConstants.PropertyBarType.PropertyBar,
    HSFPConstants.PropertyBarType.FirstLevelNode,
    HSFPConstants.PropertyBarType.SecondLevelNode,
    HSFPConstants.PropertyBarType.ThirdLevelNode,
  ];

  return validTypes.includes(type as HSFPConstants.PropertyBarType);
}

/**
 * 扁平化节点树结构，提取所有节点到一维数组
 * @param nodes - 节点数组
 * @param parentId - 父节点ID（可选）
 * @returns 扁平化后的节点数组
 */
function flattenNodeTree(
  nodes: PropertyBarNodeData[],
  parentId?: string
): PropertyBarNodeData[] {
  const result: PropertyBarNodeData[] = [];

  if (!nodes.length) {
    return result;
  }

  const clonedNodes = cloneDeep(nodes);

  clonedNodes.forEach((node, index) => {
    if (!node) {
      return;
    }

    // 设置父节点ID
    if (!node.parentId) {
      node.parentId = parentId;
    }

    // 自动计算排序值
    if (!node.order) {
      if (index === 0) {
        node.order = 1;
      } else {
        const prevOrder = clonedNodes[index - 1].order;
        if (prevOrder) {
          node.order = prevOrder + 0.1;
        }
      }
    }

    result.push(node);

    // 递归处理子节点（非浮动项）
    if (node.items) {
      if (node.type !== HSFPConstants.PropertyBarType.FloatItem) {
        result.push(...flattenNodeTree(node.items, node.id));
        node.items = [];
      } else {
        node.parentId = parentId;
      }
    }
  });

  return result;
}

/**
 * 增强墙面装饰高级功能数据
 * @param nodes - 节点列表
 */
function enhanceWallDecorationData(nodes: PropertyBarNodeData[]): void {
  const wallDecorationNode = nodes.find(
    (node) => node.id === 'walldecorationAdvanced'
  );

  if (!wallDecorationNode) {
    return;
  }

  const ngmmixpaintPlugin = HSApp.App.getApp().pluginManager.getPlugin(
    HSFPConstants.PluginType.Ngmmixpaint
  );

  const enhancedData: WallDecorationAdvancedData = {
    getBenefitAmount(): number | undefined {
      return ngmmixpaintPlugin?.getBenefitAmount?.call(ngmmixpaintPlugin);
    },
    showMarketModal(): void {
      ngmmixpaintPlugin?.showMarketModal?.call(ngmmixpaintPlugin);
    },
  };

  wallDecorationNode.data = {
    ...(wallDecorationNode.data ?? {}),
    ...enhancedData,
  };
}

/**
 * 合并节点数据（深度合并）
 * @param target - 目标节点
 * @param source - 源节点
 */
function mergeNodeData(
  target: PropertyBarNodeData,
  source: PropertyBarNodeData
): void {
  if (!target || !source) {
    return;
  }

  const items = source.items ?? [];
  delete source.items;

  Object.assign(target, source);

  if (!target.items) {
    target.items = [];
  }

  // 在索引1位置批量插入子项
  target.items.xInsertCollection(1, items);
}

/**
 * 初始化属性栏数据模型
 * @param rawNodes - 原始节点数据数组
 * @returns 初始化完成的属性栏根节点
 */
export function initPropertyBarDataModel(
  rawNodes: PropertyBarNodeData[]
): IPropertyBarNode {
  // 扁平化节点树
  let flattenedNodes = flattenNodeTree(rawNodes);

  // 增强特定功能数据
  enhanceWallDecorationData(flattenedNodes);

  // 根据布局设计模式过滤节点
  if (HSApp.App.getApp().appSettings.layoutDesignMode) {
    flattenedNodes = flattenedNodes.filter((node) =>
      node.uiMode?.includes(HSFPConstants.UIMode.layoutDesignMode)
    );
  }

  // 按类型分类节点
  const propertyBarNodes = flattenedNodes.filter(
    (node) => node.type === HSFPConstants.PropertyBarType.PropertyBar
  );

  let firstLevelNodes = flattenedNodes.filter(
    (node) => node.type === HSFPConstants.PropertyBarType.FirstLevelNode
  );

  // 应用布局模式过滤
  firstLevelNodes = HSApp.LayoutMode.LayoutModeManager.getInstance().filterData({
    data: firstLevelNodes,
    configKey: HSApp.LayoutMode.ConfigKey.propertyBar,
    keyPropertyName: 'label',
  });

  const secondLevelNodes = flattenedNodes.filter(
    (node) => node.type === HSFPConstants.PropertyBarType.SecondLevelNode
  );

  const thirdLevelNodes = flattenedNodes.filter(
    (node) => node.type === HSFPConstants.PropertyBarType.ThirdLevelNode
  );

  const floatItems = flattenedNodes.filter(
    (node) => node.type === HSFPConstants.PropertyBarType.FloatItem
  );

  const otherNodes = flattenedNodes.filter(
    (node) =>
      ![
        HSFPConstants.PropertyBarType.PropertyBar,
        HSFPConstants.PropertyBarType.FirstLevelNode,
        HSFPConstants.PropertyBarType.SecondLevelNode,
        HSFPConstants.PropertyBarType.ThirdLevelNode,
        HSFPConstants.PropertyBarType.FloatItem,
      ].includes(node.type)
  );

  // 创建根节点
  const rootNodeData: PropertyBarNodeData = {
    type: HSFPConstants.PropertyBarType.PropertyBar,
  };

  // 合并所有属性栏节点数据
  propertyBarNodes.forEach((node) => {
    mergeNodeData(rootNodeData, node);
  });

  const rootNode = CreatePropertyBarNode(rootNodeData) as IPropertyBarNode;
  rootNode.initData();

  // 设置根级浮动项
  floatItems.forEach((floatItem) => {
    if (!floatItem.parentId) {
      rootNode.setFloatItems?.(floatItem.items ?? []);
    }
  });

  // 插入一级节点及其浮动项
  firstLevelNodes.forEach((firstLevel) => {
    const firstLevelNode = CreatePropertyBarNode(firstLevel) as IPropertyBarNode;

    floatItems.forEach((floatItem) => {
      if (floatItem.parentId && firstLevel.id === floatItem.parentId) {
        firstLevelNode.setFloatItems?.(floatItem.items ?? []);
      }
    });

    rootNode.insert(firstLevelNode);
  });

  // 插入二级节点
  secondLevelNodes.forEach((secondLevel) => {
    if (secondLevel.parentId) {
      rootNode.insert(secondLevel, secondLevel.parentId);
    }
  });

  // 插入三级节点
  thirdLevelNodes.forEach((thirdLevel) => {
    if (thirdLevel.parentId) {
      rootNode.insert(thirdLevel, thirdLevel.parentId);
    }
  });

  // 插入其他类型节点
  otherNodes.forEach((otherNode) => {
    if (otherNode.parentId) {
      rootNode.insert(otherNode, otherNode.parentId);
    }
  });

  return rootNode;
}