/**
 * 房间类型下拉列表组件模块
 * 用于选择和编辑房间类型及房间名称
 */

/**
 * 房间类型选项接口
 */
export interface RoomTypeOption {
  /** 房间类型唯一标识符 */
  id: string;
  /** 房间类型显示标签 */
  label: string;
}

/**
 * 房间状态接口
 */
export interface RoomState {
  /** 房间类型ID */
  id: string;
  /** 房间名称 */
  label: string;
}

/**
 * 组件数据配置接口
 */
export interface DropdownRoomTypeListData {
  /** 可选的房间类型列表 */
  options: RoomTypeOption[];
  /** 默认选中的房间类型ID */
  defaultKey: string;
  /** 是否展开显示 */
  isSpread?: boolean;
  /** 默认房间名称 */
  defaultRoomName: string;
  /** 房间名称输入框标题 */
  roomNameTitle?: string;
  /** 房间类型变化回调函数 */
  onchange?: (roomTypeId: string, roomName: string) => void;
  /** 房间名称变化回调函数 */
  onchangeroomname?: (roomTypeId: string, roomName: string) => void;
  /** 组件标题 */
  title?: string;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 组件属性接口
 */
export interface DropdownRoomTypeListProps {
  /** 组件数据配置 */
  data: DropdownRoomTypeListData;
}

/**
 * 房间类型下拉列表组件
 * 
 * @description 提供房间类型选择和房间名称编辑功能的复合组件
 * 支持实时统计同类型房间数量，支持房间名称长度限制（30字符）
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *