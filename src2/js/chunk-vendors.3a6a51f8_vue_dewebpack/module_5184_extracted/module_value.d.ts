/**
 * GraphQL Source Location
 * 表示 GraphQL 文档中的位置信息
 */
interface SourceLocation {
  /** 行号（从1开始） */
  line: number;
  /** 列号（从1开始） */
  column: number;
}

/**
 * GraphQL Source Document
 * 表示 GraphQL 源文档
 */
interface Source {
  /** 源代码内容 */
  body: string;
  /** 源文件名称（可选） */
  name?: string;
}

/**
 * GraphQL Node with Location
 * 带有位置信息的 GraphQL AST 节点
 */
interface GraphQLNode {
  /** 节点类型 */
  kind: string;
  /** 节点在源文档中的位置信息 */
  loc?: {
    /** 起始位置 */
    start: number;
    /** 结束位置 */
    end: number;
    /** 源文档引用 */
    source: Source;
  };
}

/**
 * GraphQL Error Options
 * GraphQL 错误对象的输入参数
 */
interface GraphQLErrorOptions {
  /** 错误消息 */
  message: string;
  /** 关联的 AST 节点数组（可选） */
  nodes?: ReadonlyArray<GraphQLNode>;
  /** 源文档（可选） */
  source?: Source;
  /** 错误位置数组（可选） */
  locations?: ReadonlyArray<SourceLocation>;
}

/**
 * 格式化 GraphQL 错误消息
 * 
 * 将 GraphQL 错误对象转换为包含源代码上下文的详细错误消息。
 * 如果错误包含节点信息或位置信息，会自动附加源代码片段和错误位置。
 * 
 * @param error - GraphQL 错误对象
 * @returns 格式化后的错误消息字符串
 * 
 * @example
 *