export interface SelectionInfo {
  ID: string;
  Class: string;
  seekId?: string;
  contentType?: { getTypeString: () => string };
  XSize?: number;
  YSize?: number;
  ZSize?: number;
  x: number;
  y: number;
  z: number;
  rotation?: number;
  swing?: number;
  from?: Point;
  to?: Point;
  _host?: any;
  getHost?: () => any;
  instanceOf?: (classType: string) => boolean;
}

export interface Point {
  x: number;
  y: number;
}

export interface BatchRequest {
  type?: string;
  _subRequests?: BatchRequest[];
  getCategory?: () => string;
  getDescription?: () => string;
}

export interface BatchRequestInfo {
  arg: {
    subRequest?: string[];
  };
  description: string;
  group: string;
}

export interface CategoryEventData {
  id?: string;
  text?: string;
  name?: string;
  logType?: string;
  categoryId?: string;
  searchStatus?: string;
  payIndexFlag?: boolean;
  saleInfo?: any;
  isFav?: boolean;
  targetType?: string;
  filterKeyId?: string;
  filterKeyName?: string;
  filterValueId?: string;
  filterValueName?: string;
  searchType?: string;
  action?: string;
  area?: string;
  pageNum?: number;
  pos?: number;
  subMenuData?: {
    id?: string;
    text?: string;
    name?: string;
  };
  selectedPath?: {
    path?: Array<{ id: string; name: string }>;
  };
}

export interface CategoryInfo {
  id: string;
  text: string;
  name: string;
  type: string;
  categoryId?: string;
  searchStatus?: string;
  seekId: string;
  payIndexFlag?: boolean;
  saleInfo?: any;
  isFav?: boolean;
  targetType?: string;
  filterKeyId?: string;
  filterKeyName?: string;
  filterValueId?: string;
  filterValueName?: string;
  searchType?: string;
  action?: string;
  area?: string;
  pageNum?: number;
  position?: number;
  level?: string;
  path: CategoryPathNode;
}

export interface CategoryPathNode {
  id: string;
  name: string;
  subItem?: CategoryPathNode;
}

declare const HSApp: any;
declare const HSFPConstants: any;
declare const HSCore: any;
declare const HSConstants: any;

const CATEGORY_CONTAINER_CLASSNAMES = [
  'catalogLibContainer',
  'catalogIndependentContainer',
  'hsc-product-page-container'
];

export function dumpSelectionInfo(): string {
  const formatNumber = (value: number): string => value.toFixed(5);
  
  const formatBasicInfo = (obj: SelectionInfo): string => 
    `ID: ${obj.ID} ClassName: ${obj.Class}`;
  
  const formatModelInfo = (model: SelectionInfo): string => 
    `${formatBasicInfo(model)} seekid: ${model.seekId} contentType: ${model.contentType?.getTypeString()} bounding size: [${formatNumber(model.XSize ?? 0)}, ${formatNumber(model.YSize ?? 0)}, ${formatNumber(model.ZSize ?? 0)}] x=${formatNumber(model.x)}; y=${formatNumber(model.y)}; z=${formatNumber(model.z)}`;
  
  const formatContent = (content: SelectionInfo): string => 
    `[Content] ${formatModelInfo(content)} rotation=${content.rotation}`;
  
  const formatHostedModel = (model: SelectionInfo): string => {
    const onHost = model.getHost?.() instanceof HSCore.Model.Wall;
    return `${formatModelInfo(model)} onHost: ${onHost} swing=${model.swing}`;
  };
  
  const formatPoint = (point: Point): string => 
    `(${formatNumber(point.x)}, ${formatNumber(point.y)})`;
  
  const modelClass = HSConstants.ModelClass;
  
  const formatters = new Map<string, (obj: SelectionInfo) => string>([
    [modelClass.NgContent, formatContent],
    [modelClass.NgCurtain, formatContent],
    [modelClass.NgSoftCloth, formatContent],
    [modelClass.NgWindow, (model) => `[Window] ${formatHostedModel(model)}`],
    [modelClass.NgDoor, (model) => `[Door] ${formatHostedModel(model)}`],
    [modelClass.NgHole, (model) => `[Hole] ${formatHostedModel(model)}`],
    [modelClass.NgGroup, (model) => `[Group] ${formatModelInfo(model)}`],
    [modelClass.NgFloor, (model) => `[Floor] ${formatBasicInfo(model)} `],
    [modelClass.NgCeiling, (model) => `[Ceiling] ${formatBasicInfo(model)} `],
    [modelClass.NgWall, (wall) => `[Wall] ${formatBasicInfo(wall)} from: ${formatPoint(wall.from!)} to: ${formatPoint(wall.to!)}`],
    [modelClass.NgVertex, (vertex) => `[Vertex] ${formatBasicInfo(vertex)} ${formatPoint(vertex)}`],
    [modelClass.NgPAssembly, (assembly) => {
      let hostInfo = 'null';
      if (assembly._host) {
        const hostClass = assembly._host.Class ?? 'unknown';
        hostInfo = `${formatBasicInfo(assembly._host)}(${hostClass})`;
      }
      return `[PAssembly] ${formatModelInfo(assembly)} host: ${hostInfo}`;
    }]
  ]);
  
  const selected = HSApp.App.getApp().selectionManager.selected();
  const results: string[] = [];
  
  selected.forEach((item: SelectionInfo) => {
    const itemClass = typeof item === 'object' && item.Class;
    const formatter = formatters.get(itemClass);
    
    let info: string;
    if (formatter) {
      info = formatter(item);
    } else if (item?.instanceOf?.(HSConstants.ModelClass.NgContent)) {
      info = formatContent(item);
    } else {
      info = formatBasicInfo(item);
    }
    
    results.push(info);
  });
  
  const result = results.join(' ').trim();
  return result || selected;
}

export function getBatchRequestInfo(request: BatchRequest): BatchRequestInfo {
  const arg: { subRequest?: string[] } = {};
  let description = '';
  let group = '';
  
  if (request.type) {
    const subRequests = request._subRequests;
    
    if (subRequests && Array.isArray(subRequests) && subRequests.length > 0) {
      const flattenedRequests: BatchRequest[] = [];
      
      subRequests.forEach((subReq) => {
        if ([HSConstants.RequestType.Composite, HSConstants.RequestType.Composite].includes(subReq.type)) {
          flattenedRequests.push(...(subReq._subRequests ?? []));
        } else {
          flattenedRequests.push(subReq);
        }
      });
      
      const info = extractRequestInfo(flattenedRequests);
      arg.subRequest = flattenedRequests.slice(0, 20).map((req) => req?.type).filter(Boolean) as string[];
      group = info.group;
      description = info.description;
    } else {
      group = request.getCategory?.() ?? '';
      description = request.getDescription?.() ?? '';
    }
  }
  
  return { arg, description, group };
}

function extractRequestInfo(requests: BatchRequest[]): { group: string; description: string } {
  const categories = requests
    .map((req) => req?.getCategory?.())
    .filter((cat): cat is string => !!cat);
  
  const descriptions = requests
    .slice(0, 20)
    .map((req) => req?.getDescription?.())
    .filter((desc): desc is string => !!desc);
  
  const group = findMostFrequent(categories) || categories[0] || '';
  
  const description = descriptions.length < 2
    ? descriptions[0] || ''
    : descriptions.reduce((acc, desc) => `request: ${acc} --> request: ${desc}`);
  
  return { group, description };
}

function findMostFrequent(items: string[]): string | undefined {
  const countMap: Record<string, number> = {};
  let maxCount = 1;
  let mostFrequent: string | undefined;
  
  items.forEach((item) => {
    countMap[item] = (countMap[item] || 0) + 1;
    if (countMap[item] > maxCount) {
      maxCount = countMap[item];
      mostFrequent = item;
    }
  });
  
  return mostFrequent;
}

export function isInCategoryArea(event: Event): boolean {
  const composedPath = event.composedPath();
  
  for (const element of composedPath) {
    const htmlElement = element as HTMLElement;
    const identifier = htmlElement?.className || htmlElement?.id;
    
    if (CATEGORY_CONTAINER_CLASSNAMES.includes(identifier)) {
      return true;
    }
  }
  
  return false;
}

export function getCategoryInfo(data: CategoryEventData): CategoryInfo {
  const info: CategoryInfo = {
    id: data.subMenuData?.id || data.id || '',
    text: data.subMenuData?.text || data.text || '',
    name: data.subMenuData?.name || data.name || '',
    type: data.logType || 'clickCategoryPanel',
    categoryId: data.categoryId,
    searchStatus: data.searchStatus,
    seekId: data.id || '',
    payIndexFlag: data.payIndexFlag,
    saleInfo: data.saleInfo,
    path: {
      id: '',
      name: ''
    }
  };
  
  if (data.text !== undefined) info.text = data.text;
  if (data.isFav !== undefined) info.isFav = data.isFav;
  if (data.targetType !== undefined) info.targetType = data.targetType;
  if (data.filterKeyId !== undefined) info.filterKeyId = data.filterKeyId;
  if (data.filterKeyName !== undefined) info.filterKeyName = data.filterKeyName;
  if (data.filterValueId !== undefined) info.filterValueId = data.filterValueId;
  if (data.filterValueName !== undefined) info.filterValueName = data.filterValueName;
  if (data.searchType !== undefined) info.searchType = data.searchType;
  if (data.action !== undefined) info.action = data.action;
  if (data.area !== undefined) info.area = data.area;
  if (data.pageNum !== undefined) info.pageNum = data.pageNum;
  if (data.pos !== undefined) info.position = data.pos;
  
  const pathNode: CategoryPathNode = {
    id: info.id,
    name: info.text
  };
  
  if (data.selectedPath?.path && data.selectedPath.path.length > 0) {
    const pathItems = data.selectedPath.path.map((item) => ({
      id: item.id,
      name: item.name
    }));
    
    const pathLength = pathItems.length;
    
    for (let i = pathLength - 1; i > 0 && i < pathLength; i--) {
      if (i > 0) {
        pathItems[i - 1].subItem = pathItems[i];
      }
    }
    
    pathNode.subItem = pathItems[0];
    info.level = `目录第${pathLength}级`;
  }
  
  info.path = pathNode;
  return info;
}

export function validOperation(commandName: string): any {
  let validationResult: any;
  
  if (wallCmdNames.includes(commandName)) {
    const persistencePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Persistence
    );
    
    if (persistencePlugin) {
      validationResult = persistencePlugin.checkRoomClosed(true);
    }
  }
  
  return validationResult;
}

export function operationClassify(commandName: string): string | undefined {
  if (contentCmdNames.includes(commandName)) {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
  
  if (lightPositionCmdNames.includes(commandName)) {
    return HSFPConstants.LogGroupTypes.LightPositionOperation;
  }
  
  if (lightPropertyCmdNames.includes(commandName)) {
    return HSFPConstants.LogGroupTypes.LightPropertyOperation;
  }
  
  return undefined;
}

export function isSingleRoomModeEnd(commandType: string): void {
  const app = HSApp.App.getApp();
  
  if (commandType !== HSFPConstants.CommandType.EnterSingleRoomMode) {
    return;
  }
  
  const selectedItems = app.selectionManager.selected();
  
  if (!selectedItems[0]) {
    app.userTrackLogger.push(
      'enter.SingleRoomMode',
      {
        description: '退出单房间模式',
        validOperation: false,
        group: HSFPConstants.LogGroupTypes.ViewOperation
      },
      {
        sendNow: true,
        triggerType: 'end'
      }
    );
  }
}

// These should be imported from the actual modules (932193, 635589)
// Placeholder declarations for the converted code to be valid
declare const wallCmdNames: string[];
declare const contentCmdNames: string[];
declare const lightPositionCmdNames: string[];
declare const lightPropertyCmdNames: string[];