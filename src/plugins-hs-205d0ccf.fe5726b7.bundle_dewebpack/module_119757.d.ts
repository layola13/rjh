/**
 * CSS模块样式定义
 * 
 * 此模块导出图片模态框组件的样式表
 * 包含亮色和暗色两种主题样式
 */

/**
 * 模态框包装器样式接口
 */
interface ImageModalStyles {
  /** 模态框外层容器 */
  wrapper: string;
  /** 模态框顶部区域 */
  top: string;
  /** 模态框标题 */
  title: string;
  /** 星标图标容器 */
  xingWrapper: string;
  /** 关闭按钮 */
  closeButton: string;
  /** 单个条目容器 */
  oneItemWrapper: string;
  /** 模态框条目 */
  item: string;
  /** 播放器容器 */
  player: string;
  /** 图片渲染区域 */
  picRender: string;
  /** 文字描述区域 */
  word: string;
  /** 文字标题 */
  wordTitle: string;
  /** 文字介绍 */
  wordIntroduction: string;
  /** 跳转链接容器 */
  gotoWrapper: string;
}

/**
 * 主题变体类型
 */
type ThemeVariant = 'teaching-light' | 'teaching-black';

/**
 * CSS样式表内容
 * 
 * 定义了图片模态框的完整样式规则，包括：
 * - 基础布局样式
 * - 亮色主题 (teaching-light)
 * - 暗色主题 (teaching-black)
 */
const styles: string = `
.image-modal-wrapper {
  width: 500px;
  padding: 12px 18px 12px 18px;
  box-sizing: border-box;
}

.image-modal-wrapper .image-modal-top {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.image-modal-wrapper .image-modal-top .image-modal-title {
  font-family: AlibabaPuHuiTi-Bold !important;
  font-size: 18px;
  transform: skew(-12deg);
}

.image-modal-wrapper .image-modal-top .image-modal-xing-wrapper {
  display: flex;
  align-items: center;
  margin: 8px;
}

.image-modal-wrapper .image-modal-top .top-close {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(0, -50%);
}

.image-modal-wrapper .one-item-wrapper {
  padding-bottom: 6px;
}

.image-modal-wrapper .image-modal-item {
  padding-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
}

.image-modal-wrapper .image-modal-item .image-modal-player {
  width: 462px;
  height: 260px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #cecece;
}

.image-modal-wrapper .image-modal-item .image-modal-player .pic-render {
  width: 100%;
  height: 100%;
}

.image-modal-wrapper .image-modal-item .image-modal-word {
  position: relative;
  margin: 14px 14px 0 14px;
}

.image-modal-wrapper .image-modal-item .image-modal-word .image-modal-word-title {
  height: 24px;
  line-height: 24px;
  margin-bottom: 7px;
  font-size: 16px;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
}

.image-modal-wrapper .image-modal-item .image-modal-word .image-modal-word-introduction {
  font-family: PingFangSC-Regular !important;
  font-size: 14px;
  height: 72px;
  line-height: 24px;
  word-wrap: break-word;
  overflow: hidden;
}

.image-modal-wrapper .image-modal-item .image-modal-word .goto-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
  line-height: 24px;
}

/* 亮色主题 */
.image-modal-wrapper.teaching-light .image-modal-item {
  background-color: #f5f5f5;
}

.image-modal-wrapper.teaching-light .image-modal-title {
  color: #33353b;
}

.image-modal-wrapper.teaching-light .image-modal-word-title {
  color: #33353b;
}

.image-modal-wrapper.teaching-light .image-modal-word-introduction {
  color: #60646f;
}

/* 暗色主题 */
.image-modal-wrapper.teaching-black .image-modal-item {
  background-color: #434447;
}

.image-modal-wrapper.teaching-black .image-modal-title {
  color: #fff;
}

.image-modal-wrapper.teaching-black .image-modal-word-title {
  color: #fff;
}

.image-modal-wrapper.teaching-black .image-modal-word-introduction {
  color: #BEBFC0;
}
`;

/**
 * 导出样式模块
 * 
 * @returns CSS样式字符串数组，格式为 [模块ID, 样式内容]
 */
export default styles;

/**
 * 样式类名常量
 */
export const IMAGE_MODAL_CLASSES = {
  WRAPPER: 'image-modal-wrapper',
  TOP: 'image-modal-top',
  TITLE: 'image-modal-title',
  XING_WRAPPER: 'image-modal-xing-wrapper',
  CLOSE: 'top-close',
  ONE_ITEM_WRAPPER: 'one-item-wrapper',
  ITEM: 'image-modal-item',
  PLAYER: 'image-modal-player',
  PIC_RENDER: 'pic-render',
  WORD: 'image-modal-word',
  WORD_TITLE: 'image-modal-word-title',
  WORD_INTRODUCTION: 'image-modal-word-introduction',
  GOTO_WRAPPER: 'goto-wrapper',
  THEME_LIGHT: 'teaching-light',
  THEME_BLACK: 'teaching-black',
} as const;

/**
 * 样式类名类型
 */
export type ImageModalClass = typeof IMAGE_MODAL_CLASSES[keyof typeof IMAGE_MODAL_CLASSES];