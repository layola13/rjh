import { PureComponent } from 'react';
import { List } from 'immutable';

/**
 * 相机位置对象接口
 */
interface CameraPosition {
  /** 相机位置的唯一标识符 */
  id: string | number;
  /** 相机位置名称 */
  name?: string;
  /** 其他相机位置相关属性 */
  [key: string]: unknown;
}

/**
 * 相机列表组件的属性接口
 */
interface CameraListProps {
  /** 当前选中的相机ID */
  selectedCamera: number;
  
  /** 相机位置列表（Immutable List） */
  positions: List<CameraPosition>;
  
  /** 点击相机时的回调函数 */
  clickCameraHandler: (camera: CameraPosition) => void;
  
  /** 删除相机位置的回调函数 */
  deleteHandler: (cameraId: string | number) => void;
  
  /** 窗口大小调整时的回调函数 */
  resizeWindowHandler: () => void;
  
  /** 点击上一页/下一页按钮的回调函数 */
  onClickNextPrevHandler: (direction: 'prev' | 'next') => void;
  
  /** 页面按钮点击处理函数 */
  pageButtonHandler: (pageIndex: number) => void;
  
  /** 当前页的起始索引 */
  startIndex: number;
  
  /** 每页显示的数量 */
  pageSize: number;
  
  /** 是否为只读模式 */
  isReadonly?: boolean;
}

/**
 * 相机列表组件
 * 用于展示和管理相机位置列表，支持分页、编辑和删除操作
 */
export default class CameraList extends PureComponent<CameraListProps> {
  /**
   * 点击上一页/下一页按钮的处理函数
   * @param currentIndex - 当前页面索引
   * @param pageSize - 每页大小
   * @param isNext - 是否为下一页（true为下一页，false为上一页）
   */
  onClickPrevNextButton(
    currentIndex: number,
    pageSize: number,
    isNext: boolean
  ): void;

  /**
   * 修改相机位置名称
   * @param camera - 相机位置对象（Immutable Map）
   * @param newName - 新的名称
   */
  onNameChange(camera: CameraPosition, newName: string): void;

  /**
   * 组件挂载时添加窗口大小调整监听器
   */
  componentDidMount(): void;

  /**
   * 组件卸载时移除窗口大小调整监听器
   */
  componentWillUnmount(): void;

  /**
   * 渲染相机列表组件
   * 包含空状态提示、相机位置列表和分页控制按钮
   */
  render(): JSX.Element;
}