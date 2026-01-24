/**
 * WebGL渲染器性能统计面板
 * 用于显示Three.js WebGLRenderer的内存和渲染统计信息
 */
declare module 'RendererStats' {
  /**
   * Three.js WebGLRenderer信息接口
   */
  interface WebGLRendererInfo {
    /** 内存相关统计 */
    memory: {
      /** 着色器程序数量 */
      programs: number;
      /** 几何体数量 */
      geometries: number;
      /** 纹理数量 */
      textures: number;
    };
    /** 渲染相关统计 */
    render: {
      /** 渲染调用次数 */
      calls: number;
      /** 顶点数量 */
      vertices: number;
      /** 面数量 */
      faces: number;
      /** 点数量 */
      points: number;
    };
  }

  /**
   * Three.js WebGLRenderer接口（简化版）
   */
  interface WebGLRenderer {
    /** 渲染器信息统计 */
    info: WebGLRendererInfo;
  }

  /**
   * 渲染器统计面板类
   * 提供实时监控WebGL渲染器性能的可视化界面
   */
  class RendererStats {
    /**
     * 统计面板的DOM元素
     * 可以直接添加到页面中显示统计信息
     */
    readonly domElement: HTMLDivElement;

    /**
     * 更新统计信息显示
     * @param renderer - Three.js WebGLRenderer实例
     * @remarks
     * - 更新频率限制为30fps（每秒最多30次）
     * - 显示内存统计：程序、几何体、纹理数量
     * - 显示渲染统计：调用次数、顶点、面、点数量
     */
    update(renderer: WebGLRenderer): void;
  }

  export = RendererStats;
}