/**
 * 门窗类型枚举
 * 定义了三种窗户类型：普通窗、L型窗和U型窗
 */
export enum KJLWindowType {
  /** 普通窗户 */
  window_normal = "window_normal",
  /** L型窗户 */
  window_l = "window_l",
  /** U型窗户 */
  window_u = "window_u"
}

/**
 * 窗户数据结构
 * 描述窗户的角度和框架信息
 */
interface WindowData {
  /** 窗户的角点信息 */
  corners?: Array<{
    /** 角点的角度值 */
    angle: number;
  }>;
  /** 窗户的框架信息 */
  frames?: unknown[];
}

/**
 * KJL管理器类
 * 负责窗户类型识别、初始化、纹理设置、锁定设置以及WebCC数据转换
 */
export declare class KJLMgr {
  /**
   * 根据JSON数据判断窗户类型
   * @param jsonData - 窗户数据的JSON字符串
   * @returns 返回窗户类型枚举值
   * 
   * 判断逻辑：
   * - L型窗：1个角点(90度) + 2个框架
   * - U型窗：2个角点(均为90度) + 3个框架
   * - 普通窗：其他情况
   */
  GetWindowType(jsonData?: string): KJLWindowType;

  /**
   * 初始化KJL系统
   * 调用底层初始化方法
   */
  DoInitKJL(): void;

  /**
   * 设置KJL对象的纹理
   * @param id - 对象标识符
   * @param texture - 纹理数据，为null时不执行操作
   */
  DoSetKJLTexture(id: string, texture: unknown): void;

  /**
   * 设置KJL对象的锁定状态
   * @param lockId - 锁定标识符
   * @param lockType - 锁定类型，默认为0
   */
  DoSetKJLLock(lockId: string, lockType?: number): void;

  /**
   * 从远程路径异步获取并转换WebCC数据为KJL格式
   * @param url - WebCC数据的URL地址
   * @param options - 转换选项参数
   * @returns Promise，成功时返回转换结果，失败时reject "fail"
   */
  AsyncWebCCToKJLFromPath(url: string, options: unknown): Promise<unknown>;

  /**
   * 从JSON字符串异步转换WebCC数据为KJL格式
   * @param jsonData - WebCC格式的JSON字符串
   * @param options - 转换选项参数
   * @returns Promise，成功时返回转换结果，失败时reject "fail"
   * 
   * 注意：转换期间会临时禁用圆形模式(isCircle = false)，完成后恢复
   */
  AsyncWebCCToKJLFromJson(jsonData: string, options: unknown): Promise<unknown>;
}