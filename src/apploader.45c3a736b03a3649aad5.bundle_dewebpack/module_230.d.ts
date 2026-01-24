/**
 * CSS样式注入模块
 * 用于动态管理和更新页面中的CSS样式
 */

/**
 * 样式元素引用信息
 */
interface StyleReference {
  /** 样式标识符 */
  identifier: string;
  /** 样式更新函数 */
  updater: StyleUpdater;
  /** 引用计数 */
  references: number;
}

/**
 * CSS样式内容
 */
interface StyleContent {
  /** CSS代码字符串 */
  css: string;
  /** 媒体查询条件 */
  media?: string;
  /** Source Map信息 */
  sourceMap?: string | object;
  /** CSS @supports条件 */
  supports?: string;
  /** CSS @layer名称 */
  layer?: string;
}

/**
 * 样式数组项：[标识符, CSS, 媒体查询, SourceMap, Supports, Layer]
 */
type StyleArrayItem = [
  string,
  string,
  string | undefined,
  string | object | undefined,
  string | undefined,
  string | undefined
];

/**
 * 样式注入选项
 */
interface StyleInjectionOptions {
  /** 基础路径前缀 */
  base?: string;
  /** 插入位置索引 */
  byIndex?: number;
  /** DOM操作API */
  domAPI: (options: StyleInjectionOptions) => DOMApi;
}

/**
 * DOM操作API接口
 */
interface DOMApi {
  /** 更新样式 */
  update(content: StyleContent): void;
  /** 移除样式 */
  remove(): void;
}

/**
 * 样式更新函数类型
 */
type StyleUpdater = (content?: StyleContent) => void;

/**
 * 样式注入函数类型
 */
type StyleInjectionFunction = (styles?: StyleArrayItem[]) => void;

/**
 * 存储所有已注入的样式引用
 */
const styleReferences: StyleReference[] = [];

/**
 * 根据标识符查找样式引用的索引
 * @param identifier - 样式标识符
 * @returns 样式在数组中的索引，未找到返回-1
 */
function findStyleIndex(identifier: string): number {
  for (let index = 0; index < styleReferences.length; index++) {
    if (styleReferences[index].identifier === identifier) {
      return index;
    }
  }
  return -1;
}

/**
 * 插入或更新样式列表
 * @param styles - 样式数组
 * @param options - 注入选项
 * @returns 已处理的样式标识符数组
 */
function insertOrUpdateStyles(
  styles: StyleArrayItem[],
  options: StyleInjectionOptions
): string[] {
  const identifierCount: Record<string, number> = {};
  const identifiers: string[] = [];

  for (let i = 0; i < styles.length; i++) {
    const styleItem = styles[i];
    const baseIdentifier = options.base
      ? styleItem[0] + options.base
      : styleItem[0];
    const count = identifierCount[baseIdentifier] ?? 0;
    const uniqueIdentifier = `${baseIdentifier} ${count}`;

    identifierCount[baseIdentifier] = count + 1;

    const existingIndex = findStyleIndex(uniqueIdentifier);
    const styleContent: StyleContent = {
      css: styleItem[1],
      media: styleItem[2],
      sourceMap: styleItem[3],
      supports: styleItem[4],
      layer: styleItem[5],
    };

    if (existingIndex !== -1) {
      // 样式已存在，增加引用计数并更新
      styleReferences[existingIndex].references++;
      styleReferences[existingIndex].updater(styleContent);
    } else {
      // 新样式，创建更新器并插入
      const updater = createStyleUpdater(styleContent, options);
      options.byIndex = i;
      styleReferences.splice(i, 0, {
        identifier: uniqueIdentifier,
        updater,
        references: 1,
      });
    }

    identifiers.push(uniqueIdentifier);
  }

  return identifiers;
}

/**
 * 创建样式更新器函数
 * @param initialContent - 初始样式内容
 * @param options - 注入选项
 * @returns 样式更新器函数
 */
function createStyleUpdater(
  initialContent: StyleContent,
  options: StyleInjectionOptions
): StyleUpdater {
  const domApi = options.domAPI(options);
  domApi.update(initialContent);

  let currentContent = initialContent;

  return function updater(newContent?: StyleContent): void {
    if (newContent) {
      // 检查内容是否有变化
      if (
        newContent.css === currentContent.css &&
        newContent.media === currentContent.media &&
        newContent.sourceMap === currentContent.sourceMap &&
        newContent.supports === currentContent.supports &&
        newContent.layer === currentContent.layer
      ) {
        return;
      }
      domApi.update(newContent);
      currentContent = newContent;
    } else {
      // 无新内容则移除样式
      domApi.remove();
    }
  };
}

/**
 * 导出的样式注入主函数
 * @param initialStyles - 初始样式数组
 * @param options - 注入选项
 * @returns 样式更新函数
 */
declare function injectStyles(
  initialStyles?: StyleArrayItem[],
  options?: StyleInjectionOptions
): StyleInjectionFunction;

export default injectStyles;

export {
  StyleReference,
  StyleContent,
  StyleArrayItem,
  StyleInjectionOptions,
  DOMApi,
  StyleUpdater,
  StyleInjectionFunction,
};