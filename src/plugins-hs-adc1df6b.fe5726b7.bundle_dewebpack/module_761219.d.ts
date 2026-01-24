import React from 'react';

/**
 * 地址信息接口
 */
export interface AddressInfo {
  /** 小区/社区名称 */
  neighbor?: string;
  /** 省份ID */
  provinceId?: string;
  /** 省份名称 */
  provinceName?: string;
  /** 城市ID */
  cityId?: string;
  /** 城市名称 */
  cityName?: string;
  /** 区/县ID */
  districtId?: string;
  /** 区/县名称 */
  districtName?: string;
}

/**
 * 基础属性接口
 */
export interface BasicAttributes {
  /** 卧室数量 */
  bedroomNum?: number | string;
  /** 客厅数量 */
  livingroomNum?: number | string;
  /** 浴室数量 */
  bathroomNum?: number | string;
  /** 风格信息 */
  style?: StyleItem;
  /** 面积 */
  area?: number;
  /** 建筑面积 */
  grossFloorArea?: number;
  /** 室内面积 */
  grossInternalArea?: number;
}

/**
 * 地区项接口
 */
export interface LocationItem {
  /** 地区ID */
  id: string;
  /** 地区名称 */
  name: string;
}

/**
 * 风格项接口
 */
export interface StyleItem {
  /** 风格代码 */
  code: string;
  /** 风格名称 */
  name: string;
}

/**
 * 地址数据结构接口
 */
export interface AddressData {
  /** 省份列表 */
  provinces: LocationItem[];
  /** 城市映射表 (省份ID -> 城市列表) */
  cityMap: Record<string, LocationItem[]>;
  /** 区县映射表 (城市ID -> 区县列表) */
  districtMap: Record<string, LocationItem[]>;
}

/**
 * 项目信息接口
 */
export interface ProjectInfo {
  /** 项目ID */
  id: string;
  /** 项目名称 */
  name: string;
}

/**
 * 文档状态枚举
 */
export enum DocumentStatus {
  /** 公开 */
  Public = 'public',
  /** 私有 */
  Private = 'private'
}

/**
 * 表单数据接口
 */
export interface FormData {
  /** 设计名称 */
  designName: string;
  /** 文档状态 */
  documentStatus: DocumentStatus;
  /** 附加属性 */
  attributes: Record<string, unknown>;
  /** 地址信息 */
  address: AddressInfo;
  /** 基础属性 */
  basicAttributes: BasicAttributes;
}

/**
 * 下拉框配置接口
 */
export interface DropdownConfig {
  /** 引用名称 */
  refname: React.RefObject<unknown>;
  /** 数据源 */
  data: unknown[];
  /** 标题 */
  title: string;
  /** 名称 */
  name: string;
  /** 样式类名 */
  classname: string;
  /** 变化回调 */
  onchanged: (type: string, item: unknown) => void;
}

/**
 * 单选组配置接口
 */
export interface RadioGroupData {
  /** 按钮数组 */
  buttonArr: Array<{
    /** 是否选中 */
    isChecked: boolean;
    /** 显示文本 */
    txt: string;
  }>;
  /** 选中回调 */
  onCheck: (index: number) => void;
}

/**
 * 设计表单组件的属性接口
 */
export interface DesignFormProps {
  /** 设计名称 */
  designName?: string;
  /** 地址信息 */
  address?: AddressInfo;
  /** 基础属性 */
  basicAttributes?: BasicAttributes;
  /** 文档状态 */
  documentStatus?: DocumentStatus;
  /** ACS项目ID */
  acsprojectid?: string;
  /** ACS资产ID */
  acsassetid?: string;
  /** 下拉框渲染函数 */
  dropdown: (config: DropdownConfig) => React.ReactElement;
  /** 保存回调 */
  onSave: (data: FormData) => void;
  /** 取消回调 */
  onCancel: () => void;
}

/**
 * 设计表单组件的状态接口
 */
export interface DesignFormState {
  /** 是否加载中 */
  isLoading: boolean;
  /** 设计名称是否有效 */
  checkDesignName: boolean;
  /** 描述是否有效 */
  checkDescription: boolean;
  /** 当前设计名称长度 */
  currentDesignNameLength: number;
  /** 名称长度提示消息 */
  nameLengthMessage: string;
  /** 地址是否有效 */
  checkAddress: boolean;
  /** 当前地址长度 */
  currentAddressLength: number;
  /** 地址长度提示消息 */
  addressLengthMessage: string;
  /** 文档状态 */
  documentStatus: DocumentStatus;
}

/**
 * 设计表单 React 组件类
 * 用于收集和验证设计相关的表单信息，包括设计名称、地址、房屋属性等
 */
export default class DesignForm extends React.Component<DesignFormProps, DesignFormState> {
  /** 省份下拉框引用 */
  provincefield: React.RefObject<unknown>;
  /** 城市下拉框引用 */
  cityfield: React.RefObject<unknown>;
  /** 区县下拉框引用 */
  districtfield: React.RefObject<unknown>;
  /** 风格下拉框引用 */
  style: React.RefObject<unknown>;
  /** 小区输入框引用 */
  neighborhoodfield: React.RefObject<HTMLInputElement>;
  /** 小区提示引用 */
  neighborhoodHints: React.RefObject<HTMLDivElement>;
  /** 卧室数量输入框引用 */
  bedroomnum: React.RefObject<HTMLInputElement>;
  /** 客厅数量输入框引用 */
  livingroom: React.RefObject<HTMLInputElement>;
  /** 浴室数量输入框引用 */
  bathroom: React.RefObject<HTMLInputElement>;
  /** 设计名称输入框引用 */
  designName: React.RefObject<HTMLInputElement>;
  /** 设计名称提示引用 */
  designNameHints: React.RefObject<HTMLDivElement>;
  
  /** Promise结果数组 */
  result: Array<Promise<unknown>>;
  /** 项目列表 */
  projects: ProjectInfo[];
  /** 是否首次输入设计名称 */
  firstInputDesignName: boolean;
  /** ACS项目ID */
  acsprojectid?: string;
  /** ACS资产ID */
  acsassetid?: string;
  /** 地址数据 */
  addressData?: AddressData;
  /** 风格列表 */
  styles: StyleItem[];
  /** 清除加载状态定时器 */
  clearLoadingStatusTimer: number | null;
  /** 城市列表 */
  cities: LocationItem[];
  /** 区县列表 */
  districts: LocationItem[];
  /** 省份列表 */
  provinces: LocationItem[];

  /**
   * 构造函数
   * @param props 组件属性
   */
  constructor(props: DesignFormProps);

  /**
   * 组件挂载后的生命周期方法
   * 加载地址数据、风格数据和项目列表
   */
  componentDidMount(): void;

  /**
   * 组件卸载前的生命周期方法
   * 清理定时器
   */
  componentWillUnmount(): void;

  /**
   * 计算字符串的字节长度
   * 中文字符和特殊字符计为2个字节，其他字符计为1个字节
   * @param value 要计算的字符串
   * @returns 字符串的字节长度
   */
  computedNameLength(value: string): number;

  /**
   * 地区项点击事件处理
   * @param type 类型 (province/city/district)
   * @param item 选中的项
   */
  onItemClicked(type: string, item: LocationItem): void;

  /**
   * 检查字符串是否包含首尾空格
   * @param value 要检查的字符串
   * @returns 是否包含首尾空格
   */
  _hasSpace(value: string): boolean;

  /**
   * 设计名称变化事件处理
   * 验证设计名称的有效性
   */
  onDesignNameChanged(): void;

  /**
   * 标题提示变化处理
   * @param length 当前长度
   * @param hasSpace 是否有空格
   */
  onTitleTipsChanged(length: number, hasSpace: boolean): void;

  /**
   * 表单字段变化事件处理
   * @param event 输入事件
   */
  handleFieldsChange(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 地址变化事件处理
   * 验证地址的有效性
   */
  onAddressChanged(): void;

  /**
   * 地址提示变化处理
   * @param length 当前长度
   * @param hasSpace 是否有空格
   */
  onAddressTipsChanged(length: number, hasSpace: boolean): void;

  /**
   * 地址字段变化事件处理
   * @param event 输入事件
   */
  handleAddressFieldsChange(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 根据值获取对应的项
   * @param value 值（ID或名称）
   * @param type 类型 (province/city/district/style)
   * @returns 匹配的项
   */
  getItemByValue(value: string, type: string): LocationItem | StyleItem | undefined;

  /**
   * 从API数据设置表单值
   * @param data API返回的数据
   */
  setValueFromApi(data: unknown): void;

  /**
   * 获取表单数据
   * @returns 表单数据对象
   */
  getFormData(): FormData;

  /**
   * 禁用地址相关输入
   */
  disableLocation(): void;

  /**
   * 启用表单所有输入
   */
  enabledForm(): void;

  /**
   * 检查必填项是否有效
   * @returns 表单是否有效
   */
  checkRequired(): boolean;

  /**
   * 保存设计处理函数
   * 验证表单并触发保存回调
   */
  saveDesignHandler(): void;

  /**
   * 获取组件的DOM节点
   * @returns DOM节点
   */
  domNode(): Element | Text | null;

  /**
   * 隐私单选框变化处理
   * @param status 文档状态
   */
  onChangeRadioPrivacy(status: DocumentStatus): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement | false;
}