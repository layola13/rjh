/**
 * 全局模块声明文件
 * 定义HSCompressWASM、T3D、HSVendor等全局对象的类型
 */

/**
 * WASM模块实例接口
 */
interface WASMModuleInstance {
  /** WASM模块导出的方法和属性 */
  [key: string]: unknown;
}

/**
 * HSCompressWASM返回的Promise类型
 */
interface HSCompressWASMResult {
  /** WASM模块实例 */
  module?: WASMModuleInstance;
}

/**
 * T3D库类型定义（3D图形引擎）
 */
declare namespace T3D {
  // 根据实际T3D库补充具体类型
  export const version: string;
  // 其他T3D导出...
}

/**
 * React富文本编辑器组件库类型
 */
declare namespace ReactWEditor {
  // 根据实际编辑器库补充具体类型
  export interface EditorInstance {
    // 编辑器实例方法...
  }
}

/**
 * Ant Design组件库类型
 */
declare namespace AntD {
  // 引用@types/antd或根据实际版本补充
  export interface ComponentProps {
    // 组件通用属性...
  }
}

/**
 * Ant Design Icons图标库类型
 */
declare namespace AntDIcons {
  // 引用@ant-design/icons类型或补充
  export interface IconComponentProps {
    style?: React.CSSProperties;
    className?: string;
  }
}

/**
 * HSVendor第三方库集合接口
 */
interface HSVendor {
  /** React富文本编辑器 */
  readonly ReactWEditor: typeof ReactWEditor;
  /** Ant Design组件库 */
  readonly AntD: typeof AntD;
  /** Ant Design图标库 */
  readonly AntDIcons: typeof AntDIcons;
}

/**
 * HSEngine引擎全局对象接口
 */
interface HSEngine {
  /** T3D图形引擎实例 */
  T3D: typeof T3D;
  // 其他HSEngine属性和方法...
}

/**
 * 全局作用域扩展
 */
declare global {
  /**
   * 异步加载并初始化WASM压缩模块
   * @returns Promise，resolve时包含已初始化的WASM模块
   * @example
   * const wasm = await HSCompressWASM();
   * wasm.module.compress(data);
   */
  function HSCompressWASM(): Promise<HSCompressWASMResult>;

  interface Window {
    /** T3D图形引擎全局引用 */
    T3D: typeof T3D;
    
    /** 第三方库集合 */
    HSVendor: HSVendor;
    
    /** HSEngine引擎实例（可选，运行时注入） */
    HSEngine?: HSEngine;
  }

  namespace globalThis {
    /** T3D图形引擎全局引用 */
    const T3D: typeof T3D;
    
    /** WASM压缩模块加载器 */
    function HSCompressWASM(): Promise<HSCompressWASMResult>;
  }

  /** HSEngine引擎实例（全局变量，可能未定义） */
  var HSEngine: HSEngine | undefined;
}

export {};