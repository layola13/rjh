/**
 * 材质数据模块
 * 提供默认材质配置信息
 */

/**
 * 材质数据接口
 * 定义材质的完整属性结构
 */
export interface MaterialData {
  /** 材质唯一标识符 */
  id: string;
  
  /** 搜索用标识符 */
  seekId: string;
  
  /** 材质名称 */
  name: string;
  
  /** 产品类型 */
  productType: string;
  
  /** 内容类型描述 */
  contentType: string;
  
  /** 纹理贴图URL地址 */
  textureUrl: string;
  
  /** 小图标URI（160x160） */
  iconSmallURI: string;
  
  /** 大图标URI */
  iconLargeURI: string;
  
  /** 平铺尺寸X轴方向 */
  tileSize_x: number;
  
  /** 平铺尺寸Y轴方向 */
  tileSize_y: number;
}

/**
 * 默认材质数据
 * 灰布纹材质的预设配置
 */
export const defaultMaterialData: MaterialData = {
  id: "be4faa92-8aec-4297-b947-168332ca25e4",
  seekId: "be4faa92-8aec-4297-b947-168332ca25e4",
  name: "灰布纹_JXG09",
  productType: "Wallpapers",
  contentType: "material/wood - matt finish",
  textureUrl: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/be4faa92-8aec-4297-b947-168332ca25e4/wallfloor_mini.jpg",
  iconSmallURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/be4faa92-8aec-4297-b947-168332ca25e4/resized/iso_w160_h160.jpg",
  iconLargeURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/be4faa92-8aec-4297-b947-168332ca25e4/wallfloor.jpg?type=icon",
  tileSize_x: 1,
  tileSize_y: 1
};