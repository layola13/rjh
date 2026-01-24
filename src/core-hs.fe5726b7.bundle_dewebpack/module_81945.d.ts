/**
 * 模型工具类型定义
 * 提供用于判断和操作HSCore模型对象的工具函数
 */

/**
 * 判断对象是否为DModel类型
 * DModel包括：DAssembly（装配体）、DContent（内容）、DExtruding（拉伸）、DMolding（造型）、DSweep（扫掠）
 * 
 * @param entity - 待检查的实体对象
 * @returns 如果是DModel类型返回true，否则返回false
 */
export declare function isDModel(entity: any): entity is (
  HSCore.Model.DAssembly | 
  HSCore.Model.DContent | 
  HSCore.Model.DExtruding | 
  HSCore.Model.DMolding | 
  HSCore.Model.DSweep
);

/**
 * 追溯父级路径检查标志位
 * 检查实体本身或其所有父级路径中是否存在指定标志
 * 
 * @param entity - 待检查的实体对象
 * @param flag - 要检查的标志位
 * @returns 如果实体或其任意父级存在该标志返回true，否则返回false
 */
export declare function isFlagOnTraceParents(
  entity: any, 
  flag: unknown
): boolean;

/**
 * 追溯组件父级路径检查标志位
 * 从第一个DModel父级之后开始检查，判断后续父级路径中是否存在指定标志
 * 
 * @param entity - 待检查的实体对象
 * @param flag - 要检查的标志位
 * @returns 如果实体本身有标志或组件父级路径中存在该标志返回true，否则返回false
 */
export declare function isFlagOnTraceComponentParents(
  entity: any, 
  flag: unknown
): boolean;

/**
 * 获取DModel中的所有DHole（孔洞）对象
 * 仅对DAssembly类型有效，返回其子对象中所有的DHole实例
 * 
 * @param model - DModel实例（通常为DAssembly）
 * @returns DHole对象数组，如果不是DAssembly或无孔洞则返回空数组
 */
export declare function getDHolesOfDModel(
  model: any
): HSCore.Model.DHole[];

/**
 * 判断是否为合金门窗产品
 * 检查DAssembly的内容类型是否为定制产品-合金门窗类型
 * 
 * @param assembly - 待检查的装配体对象
 * @returns 如果是合金门窗产品返回true，否则返回false或undefined
 */
export declare function isAlloyDoorWindow(
  assembly: any
): boolean | undefined;