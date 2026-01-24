/**
 * 预装配体(PAssembly)主体工具模块
 * 提供柜体类型判断、骨架识别、坐标计算等功能
 */

/**
 * 五角柜标准ID列表
 * 包含标准柜体和衣柜的五角造型
 */
const FIVE_CORNER_CABINET_IDS: readonly string[] = [
  "id_cabinet_std_3",
  "id_cabinet_std_9",
  "id_cabinet_std_3",
  "id_wardrobe_std_6"
] as const;

/**
 * 直角转角柜标准ID列表
 */
const STRAIGHT_CORNER_CABINET_IDS: readonly string[] = [
  "id_cabinet_std_2",
  "id_cabinet_std_2a",
  "id_wardrobe_std_7",
  "id_wardrobe_std_8"
] as const;

/**
 * 转角衣柜标准ID列表
 */
const CORNER_WARDROBE_IDS: readonly string[] = [
  "id_wardrobe_ymj_01",
  "id_wardrobe_ymj_02",
  "id_wardrobe_ymj_03",
  "id_wardrobe_ymj_04",
  "id_wardrobe_ymj_05",
  "id_wardrobe_ymj_06"
] as const;

/**
 * 骨架板件映射表
 * 键: 柜体/装配体本地ID
 * 值: 该柜体包含的骨架板件ID数组
 */
const SKELETON_BOARD_MAP: Readonly<Record<string, readonly string[]>> = {
  id_cabinet_std_1: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_1a: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_2: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_cabinet_std_2a: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_cabinet_std_3: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_4: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_5: ["id_bd1", "id_bd2", "id_bd4", "id_bd5"],
  id_cabinet_std_6: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_7: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6"],
  id_cabinet_std_8: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6"],
  id_cabinet_std_9: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd8", "id_bd9"],
  id_cabinet_std_11: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_cabinet_std_12: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd8", "id_bd9", "id_bd10"],
  id_wardrobe_std_1: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_fronttoekick", "id_bd_backtoekick", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_2: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_fronttoekick", "id_bd_backtoekick", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_3: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd_fronttoekick"],
  id_wardrobe_std_4: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_5: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_6: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_wardrobe_std_7: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd_frontlefttoekick", "id_bd_frontrighttoekick", "id_bd_backtoekick"],
  id_passembly_bar_counter_c: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_r: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_hc: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_l: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_n: ["id_horizontal_board", "id_vertical_support_l", "id_vertical_support_r"],
  id_wardrobe_frame: ["id_bd_left", "id_bd_right", "id_bd_left", "id_bd_right", "id_bd_back", "id_bd_fronttoekick", "id_bd_backtoekick", "id_bd_bottom", "id_bd_top"]
} as const;

/**
 * 检查预装配体是否属于指定ID列表
 * @param entity - 待检查的实体对象
 * @param targetIds - 目标ID列表
 * @returns 是否匹配
 */
function checkPAssemblyType(entity: unknown, targetIds: readonly string[]): boolean {
  if (!(entity instanceof HSCore.Model.PAssembly)) {
    return false;
  }

  const topPAssembly = entity.getTopPAssembly();
  if (topPAssembly?.metadata?.userFreeData) {
    const userFreeData = topPAssembly.metadata.userFreeData;
    return targetIds.indexOf(userFreeData.localId) !== -1;
  }

  return false;
}

/**
 * 预装配体主体工具集
 */
export const PAssemblyBody = {
  /**
   * 判断是否为五角柜
   * @param entity - 待检查的实体
   * @returns 是否为五角柜
   */
  isFiveCornerCabinet: (entity: unknown): boolean => 
    checkPAssemblyType(entity, FIVE_CORNER_CABINET_IDS),

  /**
   * 判断是否为直角转角柜
   * @param entity - 待检查的实体
   * @returns 是否为直角转角柜
   */
  isStrightCornerCabinet: (entity: unknown): boolean => 
    checkPAssemblyType(entity, STRAIGHT_CORNER_CABINET_IDS),

  /**
   * 判断是否为转角衣柜
   * @param entity - 待检查的实体
   * @returns 是否为转角衣柜
   */
  isCornerWardrobe: (entity: unknown): boolean => 
    checkPAssemblyType(entity, CORNER_WARDROBE_IDS),

  /**
   * 判断实体是否为骨架板件
   * 通过检查实体的父级装配体类型及本地ID匹配骨架映射表
   * @param entity - 待检查的实体
   * @returns 是否为骨架板件
   */
  isSkeleton(entity: HSCore.Model.Entity | null | undefined): boolean {
    if (!entity?.localId) {
      return false;
    }

    const parentsInPath = entity.getParentsInPath();
    let parentPAssembly: HSCore.Model.PAssembly | undefined;

    for (let i = 0; i < parentsInPath.length; i++) {
      if (parentsInPath[i] instanceof HSCore.Model.PAssembly) {
        parentPAssembly = parentsInPath[i] as HSCore.Model.PAssembly;
        break;
      }
    }

    if (!parentPAssembly?.metadata?.userFreeData) {
      return false;
    }

    const parentLocalId = parentPAssembly.metadata.userFreeData.localId;
    if (!parentLocalId) {
      return false;
    }

    const entityLocalId = entity.localId;
    const skeletonBoards = SKELETON_BOARD_MAP[parentLocalId];
    
    return Array.isArray(skeletonBoards) && skeletonBoards.includes(entityLocalId);
  },

  /**
   * 判断实体是否有预装配体父级
   * @param entity - 待检查的实体
   * @returns 是否存在PAssembly父级
   */
  isContentHasPAssemblyParent: (entity: unknown): boolean =>
    entity instanceof HSCore.Model.Entity &&
    !!entity.getParentsInPath().find((parent) => parent instanceof HSCore.Model.PAssembly),

  /**
   * 获取实体的Z坐标
   * 对于预装配体,如果是顶线类型则返回顶线路径的Z坐标,否则返回实体自身的Z坐标
   * @param entity - 实体对象
   * @returns Z轴坐标值
   */
  getZ(entity: HSCore.Model.Entity | HSCore.Model.PAssembly): number {
    if (!(entity instanceof HSCore.Model.PAssembly)) {
      return entity.z;
    }

    if (!entity) {
      return 0;
    }

    let toplineChild: HSCore.Model.Entity | undefined;

    if (entity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CrownMolding)) {
      toplineChild = entity.getChild("topline");
    }

    if (toplineChild?.paths && Array.isArray(toplineChild.paths) && toplineChild.paths.length !== 0) {
      return toplineChild.paths[0][0].z;
    }

    return entity.z;
  },

  /**
   * 获取轮廓路径的Y坐标
   * 从路径数组末尾向前查找第一个Y坐标不为0的点
   * @param profilePath - 轮廓路径点数组
   * @returns Y轴坐标值
   */
  getProfileY(profilePath: Array<{ y: number }>): number {
    let yCoordinate = 0;

    for (let i = profilePath.length - 1; i >= 0; i--) {
      const point = profilePath[i];
      if (!HSCore.Util.Math.nearlyEquals(point.y, 0) && yCoordinate === 0) {
        yCoordinate = point.y;
        break;
      }
    }

    return yCoordinate;
  }
} as const;