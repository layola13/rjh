/**
 * 图片信息接口
 */
export interface PictureInfo {
  /** 图片唯一标识符 */
  id: string;
  /** 图片URL地址 */
  url: string;
}

/**
 * 图片遮罩状态枚举
 */
export enum PictureMaskEnum {
  /** 无遮罩 */
  None = 'none',
  /** 加载中 */
  Loading = 'loading',
  /** 加载错误 */
  Error = 'error',
  /** 空内容 */
  Empty = 'empty'
}

/**
 * 图片视图组件的属性接口
 */
export interface PictureViewProps {
  /** 自定义样式类名 */
  className?: string;
  /** 初始图片信息 */
  initialPictureInfo?: PictureInfo;
  /** 遮罩图标大小百分比（相对于容器） */
  maskSizePercent?: number;
}

/**
 * 图片视图组件的状态接口
 */
export interface PictureViewState {
  /** 当前遮罩状态 */
  pictureMaskEnum: PictureMaskEnum;
  /** 当前显示的图片信息 */
  pictureInfo: PictureInfo;
}

/**
 * 图片视图组件
 * 
 * 用于显示图片，支持加载状态、错误状态的遮罩显示。
 * 提供图片切换功能，并在切换过程中显示相应的状态提示。
 * 
 * @example
 *