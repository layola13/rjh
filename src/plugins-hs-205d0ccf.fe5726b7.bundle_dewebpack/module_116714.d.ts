/**
 * CSS模块导出类型定义
 * @module GridViewerStyles
 * @description 网格查看器组件的样式定义，包含卡片布局、滚动区域和动画效果
 */

/**
 * Webpack CSS加载器模块导出函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleLoader;

/**
 * CSS模块加载器接口
 */
interface CSSModuleLoader {
  /**
   * 添加CSS样式规则
   * @param rule - CSS规则数组，包含模块ID和CSS内容
   */
  push(rule: [string, string]): void;
}

/**
 * Webpack模块导出接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: CSSModuleLoader;
}

/**
 * 网格查看器样式类名映射
 * @description 定义组件中使用的所有CSS类名
 */
interface GridViewerStyleClasses {
  /** 网格容器区域 - 使用flex布局，带滚动条 */
  'grid-area': string;
  
  /** Ant Design徽章圆点样式 */
  'ant-badge-dot': string;
  
  /** 网格卡片包装器 - 控制卡片间距 */
  'grid-viewer-card-wrapper': string;
  
  /** 网格卡片主容器 */
  'grid-viewer-card': string;
  
  /** 卡片包装层 - 定义卡片背景和圆角 */
  'card-wrapper': string;
  
  /** 卡片图片容器 - 使用背景图片cover模式 */
  'card-img': string;
  
  /** 卡片角标签 - 左上角显示的标记 */
  'card-corner-sign': string;
  
  /** 卡片底部区域 - 包含渐变遮罩和名称 */
  'card-bottom': string;
  
  /** 卡片名称文本 - 支持文本溢出省略 */
  'card-name': string;
}

/**
 * CSS样式内容常量
 * @description 包含所有样式规则的完整CSS字符串
 */
declare const CSS_CONTENT: `
.grid-area {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  height: calc(100% - 134px);
  overflow-y: scroll;
  align-content: flex-start;
}
.grid-area::-webkit-scrollbar {
  display: none;
}
.ant-badge-dot {
  background: #3DFFC5 !important;
}
.grid-viewer-card-wrapper {
  padding-right: 24px;
  padding-bottom: 35px;
}
.grid-viewer-card-wrapper .ant-badge .ant-badge-dot {
  box-shadow: none;
}
.grid-viewer-card {
  position: relative;
  display: inline-block;
  width: 300px;
}
.grid-viewer-card .card-wrapper {
  position: relative;
  background-color: #323232;
  color: white;
  border-radius: 8px;
  width: 300px;
  margin: 0 8px 8px 0;
}
.grid-viewer-card .card-wrapper .card-img {
  width: 100%;
  height: 169px;
  border-radius: 6px;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.grid-viewer-card .card-wrapper .card-corner-sign {
  background: #1c1c1c;
  padding: 6px 8px;
  color: rgba(255, 255, 255, 0.86);
  border-radius: 6px 2px 10px 0;
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 12px;
  opacity: 0;
}
.grid-viewer-card .card-wrapper .card-bottom {
  position: absolute;
  width: 100%;
  right: 0;
  bottom: 0;
  border-radius: 0 0 6px 6px;
  display: inline-flex;
  justify-content: space-between;
  height: 40px;
  align-items: flex-end;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
}
.grid-viewer-card .card-wrapper .card-bottom .card-name {
  margin: 0 10px 2px 6px;
  display: block;
  color: rgba(255, 255, 255, 0.86);
  width: 155px;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.grid-viewer-card .card-wrapper .card-bottom .card-name:hover {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
@keyframes rotateit {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

/**
 * 模块默认导出
 * @description 导出CSS模块加载器实例
 */
export default GridViewerStyleClasses;

/**
 * 样式模块元数据
 */
export interface StyleModuleMetadata {
  /** 原始模块ID */
  readonly moduleId: '116714';
  /** 样式类型 */
  readonly type: 'css-module';
  /** 是否包含source map */
  readonly hasSourceMap: false;
}