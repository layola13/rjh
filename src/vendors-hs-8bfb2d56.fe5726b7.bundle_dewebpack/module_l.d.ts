/**
 * 引用计数条目接口
 */
interface RefCountedEntry {
  /** 当前引用计数 */
  refcount: number;
  // 可能还有其他属性，如 data、type 等
}

/**
 * 引用计数表
 * 索引 0-4 可能为保留/内置条目，不参与引用计数
 */
declare const referenceTable: RefCountedEntry[];

/**
 * 增加指定资源的引用计数
 * 
 * @param resourceId - 资源ID/索引
 * @remarks
 * - 仅处理 ID > 4 的资源（0-4 可能为静态/保留资源）
 * - 自动递增目标资源的 refcount
 * 
 * @example
 *