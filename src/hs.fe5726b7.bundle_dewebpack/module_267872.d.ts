/**
 * 模块加载器类型定义
 * 用于动态加载事件模块的Webpack上下文模块
 */

/**
 * 模块ID映射表
 * 将模块路径映射到对应的数字ID
 */
interface ModuleMap {
  './autorecommend.event.ts': 537210;
  './camera.event.ts': 740734;
  './category.event.ts': 873797;
  './command.event.ts': 109788;
  './environment/environment.event.ts': 316766;
  './guide.event.ts': 243629;
  './hotkey.event.ts': 635483;
  './leftmenu.event.ts': 140655;
  './markingsystem.event.ts': 567683;
  './opendesign.event.ts': 474395;
  './recommendaccessories.event.ts': 966229;
  './request.event.ts': 333304;
  './save.event.ts': 975128;
  './templatedesign.event.ts': 743013;
  './undoredo.event.ts': 7223;
  './usersetting.event.ts': 409556;
  './viewswitch.event.ts': 600740;
}

/**
 * 模块路径类型
 * 所有可用的事件模块路径
 */
type ModulePath = keyof ModuleMap;

/**
 * 模块ID类型
 * 所有可能的模块ID值
 */
type ModuleId = ModuleMap[ModulePath];

/**
 * Webpack上下文加载函数接口
 * 用于动态require模块
 */
interface WebpackContext {
  /**
   * 加载指定路径的模块
   * @param modulePath - 模块相对路径
   * @returns 加载的模块导出对象
   * @throws {Error} 当模块不存在时抛出MODULE_NOT_FOUND错误
   */
  (modulePath: ModulePath): unknown;

  /**
   * 获取所有可用的模块路径
   * @returns 模块路径数组
   */
  keys(): ModulePath[];

  /**
   * 解析模块路径为模块ID
   * @param modulePath - 模块相对路径
   * @returns 模块的数字ID
   * @throws {Error} 当模块不存在时抛出MODULE_NOT_FOUND错误
   */
  resolve(modulePath: ModulePath): ModuleId;

  /**
   * 当前上下文模块的ID
   */
  id: 267872;
}

/**
 * 导出的上下文加载器
 * 用于动态加载事件模块系统中的各个事件处理器
 */
declare const webpackContext: WebpackContext;

export default webpackContext;