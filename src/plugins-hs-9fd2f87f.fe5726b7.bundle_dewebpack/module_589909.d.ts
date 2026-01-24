/**
 * 拖拽导入处理器
 * 支持导入Assembly、PAssembly、PAssemblyPackage和Floorplan等多种类型的JSON文件
 */
export default class DragDropImportHandler {
  /**
   * 构造函数
   * 绑定事件处理器的this上下文
   */
  constructor();

  /**
   * 导入Assembly类型的产品
   * @param assemblyData - Assembly数据对象
   * @param assemblyData.boundingBox - 包围盒信息
   * @param assemblyData.boundingBox.xLen - X轴长度
   * @param assemblyData.boundingBox.yLen - Y轴长度
   * @param assemblyData.boundingBox.zLen - Z轴长度
   * @param assemblyData.Products - 产品列表
   */
  importAssembly(assemblyData: {
    boundingBox: {
      xLen: number;
      yLen: number;
      zLen: number;
    };
    Products: Array<{
      id: string;
      position: {
        x: number;
        y: number;
        z: number;
      };
      [key: string]: any;
    }>;
  }): void;

  /**
   * 导入PAssembly类型的产品
   * @param pAssemblyData - PAssembly数据对象
   * @param pAssemblyData.meta - 元数据信息
   * @param pAssemblyData.meta.contentType - 内容类型
   * @param pAssemblyData.children - 子元素列表
   * @param pAssemblyData.resources - 资源列表
   */
  importPAssembly(pAssemblyData: {
    meta: {
      contentType: string;
    };
    children: Array<{
      type: string;
      seekId: string;
      [key: string]: any;
    }>;
    resources: string[];
    [key: string]: any;
  }): void;

  /**
   * 导入PAssemblyPackage类型的产品包
   * @param packageData - PAssemblyPackage数据对象
   * @param packageData.meta - 元数据信息
   * @param packageData.meta.contentType - 内容类型
   * @param packageData.assemblies - Assembly列表
   */
  importPAssemblyPackage(packageData: {
    meta: {
      contentType: string;
    };
    assemblies: Array<{
      json: {
        children: Array<{
          type: string;
          seekId: string;
        }>;
        resources: string[];
      };
      defaultValues?: Array<{
        material?: string;
        [key: string]: any;
      }>;
      [key: string]: any;
    }>;
    [key: string]: any;
  }): void;

  /**
   * 加载并解析JSON文件
   * 根据文件内容的magic标识判断类型并执行相应的导入逻辑
   * @param file - 要加载的文件对象
   */
  loadJSON(file: File): void;

  /**
   * 注册拖拽事件监听器
   * 在document.body上注册dragover、dragleave和drop事件
   */
  register(): void;

  /**
   * 注销拖拽事件监听器
   * 移除document.body上的dragover、dragleave和drop事件监听
   */
  unregister(): void;

  /**
   * 拖拽悬停事件处理器
   * @param event - 拖拽事件对象
   */
  onDragOver(event: DragEvent): void;

  /**
   * 拖拽离开事件处理器
   * @param event - 拖拽事件对象
   */
  onDragLeave(event: DragEvent): void;

  /**
   * 拖拽放置事件处理器
   * 提取文件并调用loadJSON进行处理
   * @param event - 拖拽事件对象
   */
  onDrop(event: DragEvent): void;
}