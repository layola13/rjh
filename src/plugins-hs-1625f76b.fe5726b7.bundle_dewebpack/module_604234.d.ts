/**
 * 图片掩码状态枚举
 */
export enum PictureMaskState {
  /** 无掩码 */
  none = "none",
  /** 错误状态 */
  error = "error",
  /** 加载中状态 */
  loading = "loading"
}

/**
 * 图片对象接口
 */
export interface Picture {
  /** 图片唯一标识 */
  id?: string | number;
  /** 图片URL地址 */
  url: string;
  /** 是否正在加载 */
  loading?: boolean;
  /** 是否加载失败 */
  error?: boolean;
}

/**
 * 组件属性接口
 */
export interface ModelImageWrapperProps {
  /** 图片数据 */
  picture: Picture;
  /** 是否使用默认加载状态 */
  isDefault?: boolean;
}

/**
 * 组件状态接口
 */
export interface ModelImageWrapperState {
  /** 当前图片掩码状态 */
  pictureMask: PictureMaskState | string;
}

/**
 * 图片展示组件
 * 支持加载状态、错误状态的显示，并提供默认图片占位符
 */
export default class ModelImageWrapper extends React.Component<
  ModelImageWrapperProps,
  ModelImageWrapperState
> {
  /**
   * 默认属性值
   */
  static defaultProps: Partial<ModelImageWrapperProps>;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: ModelImageWrapperProps);

  /**
   * 组件状态
   */
  state: ModelImageWrapperState;

  /**
   * 渲染图片掩码层
   * @param maskState - 掩码状态
   * @returns React元素或undefined
   */
  private _renderPictureMask(
    maskState: PictureMaskState | string
  ): React.ReactElement | undefined;

  /**
   * 图片加载完成回调
   * @param pictureId - 图片ID
   * @param pictureUrl - 图片URL
   * @param event - 加载事件对象
   */
  handleOnload(
    pictureId: string | number | undefined,
    pictureUrl: string,
    event: React.SyntheticEvent<HTMLImageElement>
  ): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}