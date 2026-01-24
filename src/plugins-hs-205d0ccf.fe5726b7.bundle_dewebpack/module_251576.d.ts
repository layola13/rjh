/**
 * 单设备登录锁管理模块
 * 提供设备锁的检查、获取和强制获取功能
 */

/**
 * NWTK全局对象接口定义
 */
interface NWTK {
  mtop: {
    SingleDeviceLogin: {
      checkDeviceLock: (params: DeviceLockParams) => Promise<MtopResponse>;
      getDeviceLock: (params: DeviceLockParams) => Promise<MtopResponse>;
    };
  };
}

/**
 * 设备锁请求参数接口
 */
interface DeviceLockParams {
  data: {
    unitId: string;
    force?: boolean;
  };
}

/**
 * Mtop API响应接口
 */
interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret?: string[];
  /** 响应数据 */
  data?: T;
}

/**
 * 检查设备锁状态
 * @param unitId - 设备唯一标识符
 * @returns Promise，成功时返回响应数据，失败时拒绝并返回错误响应
 */
export function checkLoginLock(unitId: string): Promise<unknown>;

/**
 * 获取设备锁（非强制模式）
 * @param unitId - 设备唯一标识符
 * @returns Promise，成功时返回响应数据，失败时拒绝并返回错误响应
 */
export function getLoginLock(unitId: string): Promise<unknown>;

/**
 * 尝试获取设备锁（强制模式）
 * 强制模式下会尝试抢占其他设备的锁
 * @param unitId - 设备唯一标识符
 * @returns Promise，成功时返回响应数据，失败时拒绝并返回错误响应
 */
export function tryLoginLock(unitId: string): Promise<unknown>;