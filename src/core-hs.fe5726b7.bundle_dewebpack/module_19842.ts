export interface MaterialData {
  id: string;
  seekId: string;
  name: string;
  productType: string;
  contentType: string;
  textureUrl: string;
  iconSmallURI: string;
  iconLargeURI: string;
  tileSize_x: number;
  tileSize_y: number;
}

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