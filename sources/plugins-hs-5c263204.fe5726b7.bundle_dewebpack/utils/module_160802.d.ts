/**
 * 户型库搜索组件的 TypeScript 类型定义文件
 * Module: module_160802
 * Original ID: 160802
 */

import React from 'react';

/**
 * 对话框状态类型
 */
type DialogStatus = 'init' | 'result';

/**
 * 范围筛选类型（用于户型和面积）
 */
type RangeFilter = 'to' | string;

/**
 * 地址信息子项（城市或区域）
 */
interface AddressChild {
  /** 地址项唯一标识 */
  id: string | number;
  /** 地址名称 */
  name: string;
  /** 子级地址列表 */
  children: AddressChild[];
}

/**
 * 地址信息（省级）
 */
interface AddressInfo {
  /** 地址项唯一标识 */
  id: string | number;
  /** 地址名称 */
  name: string;
  /** 子级地址列表（市/区） */
  children: AddressChild[];
}

/**
 * 用户行为追踪数据
 */
interface TrackData {
  /** 追踪项唯一标识 */
  id: string;
  /** 追踪项描述信息 */
  description: string;
}

/**
 * 组件属性接口
 */
interface FloorPlanCollectionProps {
  /** 关闭弹窗的回调函数 */
  onCloseHandler?: (event?: React.MouseEvent) => void;
  /** 用户行为追踪数据 */
  trackData: TrackData;
}

/**
 * 组件状态接口
 */
interface FloorPlanCollectionState {
  /** 实时搜索文本（输入框当前值） */
  realTimeSearchText: string;
  /** 最终搜索文本（执行搜索时的文本） */
  finalSearchText: string;
  /** 是否执行搜索操作 */
  doSearch: boolean;
  /** 是否显示搜索建议列表 */
  showSearchList: boolean;
  /** 初始化时是否显示搜索历史 */
  showSearchHistoryOnInit: boolean;
  /** 结果页是否显示搜索历史 */
  showSearchHistoryOnResult: boolean;
  /** 是否显示城市选择视图 */
  showAddressView: boolean;
  /** 是否显示搜索结果 */
  showSearchResult: boolean;
  /** 是否显示清除按钮 */
  showClearUp: boolean;
  /** 地址信息数据 */
  addressInfo: AddressInfo[] | null;
  /** 是否完全匹配搜索 */
  isFullyMatching: boolean;
  /** 输入框是否获得焦点 */
  isFocus: boolean;
  /** 对话框当前状态 */
  dialogStatus: DialogStatus;
  /** 当前选中的城市名称 */
  cityName: string;
  /** 是否点击了省份 */
  clickProvice: boolean;
  /** 目标城市ID */
  targetCityId: string;
  /** 城市名称到ID的映射表 */
  cityIdMap: Map<string, string>;
  /** 省份ID到子城市列表的映射表 */
  provinceIdMap: Map<string | number, AddressChild[]>;
  /** 卧室数量范围筛选 */
  bedRoomRange: RangeFilter;
  /** 建筑面积范围筛选 */
  grossAreaRange: RangeFilter;
  /** IP定位城市（可选） */
  ipLocationCity?: string;
}

/**
 * 户型库搜索主组件
 * 提供小区搜索、城市切换、户型筛选、面积筛选等功能
 */
declare class FloorPlanCollection extends React.Component<
  FloorPlanCollectionProps,
  FloorPlanCollectionState
> {
  /**
   * 关闭弹窗处理函数
   * @param event - 鼠标事件对象
   */
  onCloseHandler(event?: React.MouseEvent): void;

  /**
   * 获取地址信息映射表
   * 从后端获取省市区数据并构建映射关系
   */
  getAddressMap(): void;

  /**
   * 通过高德地图IP定位获取当前城市
   * @returns 定位到的城市名称，失败时返回"北京城区"
   */
  getIpLocationCity(): Promise<string>;

  /**
   * 更新目标城市
   * 优先使用本地存储的城市，否则使用IP定位城市
   */
  updateTargetCity(): Promise<void>;

  /**
   * 根据行政区划代码获取正确的城市名称
   * @param addressInfo - 地址信息数组
   * @param adcode - 行政区划代码
   * @returns 城市名称，未找到时返回null
   */
  getCorrectCityName(addressInfo: AddressInfo[] | null, adcode: string): string | null;

  /**
   * 根据城市名称获取正确的城市名称（用于名称标准化）
   * @param addressInfo - 地址信息数组
   * @param cityName - 城市名称
   * @returns 标准化后的城市名称，未找到时返回null
   */
  getCorrectCityNameByName(addressInfo: AddressInfo[] | null, cityName: string): string | null;

  /**
   * 从本地存储获取搜索历史列表
   * @returns 搜索历史数组，最多10条
   */
  getListFromLocalStorage(): string[];

  /**
   * 搜索框获得焦点时的处理函数
   */
  searchTextOnFocus(): void;

  /**
   * 搜索框失去焦点时的处理函数
   * @param event - 焦点事件对象
   */
  searchTextOnBlur(event: React.FocusEvent<HTMLInputElement>): void;

  /**
   * 搜索框内容变化时的处理函数
   * @param event - 输入变化事件对象
   */
  searchTextOnChange(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 搜索框按键抬起时的处理函数
   * @param event - 键盘事件对象
   */
  searchTextOnKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * 搜索框粘贴内容时的处理函数
   * @param event - 粘贴事件对象
   */
  searchTextOnPaste(event: React.ClipboardEvent<HTMLInputElement>): void;

  /**
   * 点击搜索按钮的处理函数
   */
  clickSearchButton(): void;

  /**
   * 点击搜索建议列表项的处理函数
   * @param cityId - 城市ID
   * @param cityName - 城市名称
   * @param searchText - 搜索文本
   */
  searchListOnClick(cityId: string, cityName: string, searchText: string): void;

  /**
   * 点击搜索历史列表项的处理函数
   * @param cityId - 城市ID
   * @param cityName - 城市名称
   * @param searchText - 搜索文本
   */
  searchHistoryOnClick(cityId: string, cityName: string, searchText: string): void;

  /**
   * 点击城市选择区域的处理函数
   */
  cityZoneOnclick(): void;

  /**
   * 从地址视图获取点击项的处理函数
   * @param event - 鼠标事件对象
   * @param type - 点击类型，默认为"city"
   */
  getClickItemFromAddress(event: React.MouseEvent, type?: 'city' | 'province'): void;

  /**
   * 用户行为追踪日志记录
   * @param params - 追踪参数
   * @param params.id - 行为唯一标识
   * @param params.name - 行为名称
   */
  _trackLogger(params: { id: string; name: string }): void;

  /**
   * 格式化本地存储的搜索历史
   * 更新历史记录中的城市名称，移除无效数据
   * @param addressInfo - 地址信息数组
   * @param cityIdMap - 城市名称到ID的映射表
   */
  formatLocalStorage(addressInfo: AddressInfo[], cityIdMap: Map<string, string>): void;

  /**
   * 更新本地存储的搜索历史
   * @param searchItem - 搜索项（格式：城市名+小区名）
   * @returns 更新后的搜索历史数组
   */
  updateLocalStorage(searchItem: string): string[] | undefined;

  /**
   * 点击面积筛选按钮的处理函数
   * @param event - 鼠标事件对象
   */
  handleClickFilterHouseArea(event: React.MouseEvent): void;

  /**
   * 点击户型筛选按钮的处理函数
   * @param event - 鼠标事件对象
   */
  handleClickFilterHouseStyle(event: React.MouseEvent): void;

  /**
   * 清空搜索框的处理函数
   */
  handleClearUp(): void;

  /**
   * 组件挂载前的生命周期函数（已废弃）
   */
  UNSAFE_componentWillMount(): void;

  /**
   * 组件挂载后的生命周期函数
   */
  componentDidMount(): void;

  /**
   * 渲染组件
   */
  render(): JSX.Element;
}

export default FloorPlanCollection;