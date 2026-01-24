/**
 * HomeGPT自动化状态管理模块
 * 用于跟踪和记录HomeGPT（AI家居设计助手）的运行状态、布局信息和模板匹配结果
 */

/**
 * HomeGPT状态枚举
 * 表示AI设计流程的各个阶段
 */
export enum HomeGptStateEnum {
  /** 未开始状态 */
  None = 0,
  /** 运行中 */
  Running = 1,
  /** 单次任务完成 */
  Finished = 2,
  /** 全部任务完成 */
  AllFinished = 3
}

/**
 * 布局类型
 * - singleRoom: 单个房间布局
 * - whole: 整体户型布局
 */
export type LayoutType = 'singleRoom' | 'whole';

/**
 * 房间信息接口
 */
export interface RoomInfo {
  /** 房间唯一标识符，整体布局时为 "whole" */
  roomId: string;
  /** 房间类型（如：卧室、客厅等），整体布局时为 "whole" */
  roomType: string;
  /** 房间面积（平方单位） */
  area: number;
}

/**
 * 设计模板信息接口
 */
export interface TemplateInfo {
  /** 模板唯一标识符 */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板预览图URL */
  image: string;
  /** 关联的设计ID */
  designId: string;
  /** 自定义房间配置 */
  customizedRoom?: unknown;
}

/**
 * 布局信息接口
 * 包含房间和应用的模板详细信息
 */
export interface LayoutInfo {
  /** 布局类型 */
  layoutType: LayoutType;
  /** 房间信息 */
  roomInfo: RoomInfo;
  /** 应用的模板信息 */
  templateInfo: TemplateInfo;
}

/**
 * 输入的布局模板匹配参数
 */
export interface InputLayoutTemplates {
  /** 布局类型 */
  layoutType: string;
  /** 用户查询/需求描述 */
  query: string;
  /** 候选模板列表 */
  templates: TemplateInfo[];
}

/**
 * 外部扩展参数接口
 * 存储创建URL、模板匹配输入输出等信息
 */
export interface ExternalParams {
  /** 创建设计的URL */
  createUrl?: string;
  /** 输入：模板匹配参数 */
  inputLayoutTemplates?: InputLayoutTemplates;
  /** 输出：当前选中的布局 */
  outputCurrentLayout?: LayoutInfo | null;
  /** 输出：所有生成的布局信息列表 */
  outputLayoutInfos?: LayoutInfo[] | null;
}

/**
 * HomeGPT自动化测试信息接口
 * 全局状态对象，用于自动化测试和调试
 */
export interface HomeGptAutomatedInfo {
  /** 当前状态 */
  state: HomeGptStateEnum;
  /** 结果JSON字符串 */
  resultJson: string;
  /** 扩展参数 */
  externalParams: ExternalParams;
  /** 当前操作的房间ID */
  roomId: string;
  /** 相机移动到房间的回调函数 */
  cameraMoveToRoom: () => void;
}

/**
 * 全局Window接口扩展
 */
declare global {
  interface Window {
    /** HomeGPT自动化测试信息 */
    homeGptAutomatedInfo?: HomeGptAutomatedInfo;
    /** 获取HomeGPT当前状态 */
    getHomeGptState?: () => HomeGptStateEnum | undefined;
    /** 获取HomeGPT结果JSON */
    getHomeGptResult?: () => string | undefined;
  }
}

/**
 * 标记自动化测试开始
 * 重置所有状态到初始值
 */
export function markAutomatedStart(): void;

/**
 * 更新自动化测试状态和信息
 * @param state - 新的状态枚举值
 * @param params - 任意参数对象，将与外部参数合并后序列化
 */
export function markAutomatedInfo(state: HomeGptStateEnum, params: unknown): void;

/**
 * 记录创建信息
 * @param createUrl - 创建设计的URL地址
 */
export function markAutomatedCreateInfo(createUrl: string): void;

/**
 * 记录模板匹配的输入信息
 * @param layoutType - 布局类型
 * @param templates - 候选模板列表
 * @param query - 用户查询/需求描述
 */
export function markAutomatedMatchTemplate(
  layoutType: string,
  templates: TemplateInfo[],
  query: string
): void;

/**
 * 房间布局配置接口（内部使用）
 */
export interface RoomLayoutConfig {
  /** 房间对象，null表示整体布局 */
  room: {
    id: string;
    roomType: string;
    getArea: () => number;
  } | null;
  /** 应用的风格模板 */
  stylerTemplate: TemplateInfo;
}

/**
 * 记录布局信息
 * @param layoutConfigs - 布局配置数组
 */
export function markAutomatedLayoutInfo(layoutConfigs: RoomLayoutConfig[]): void;

/**
 * 记录当前操作的房间ID
 * @param roomId - 房间唯一标识符
 */
export function markAutomatedRoomId(roomId: string): void;