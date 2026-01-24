/**
 * SVG图标模块映射
 * 提供动态导入SVG资源的类型定义
 */

/**
 * SVG模块路径到模块ID的映射表
 * 键为相对路径，值为Webpack模块ID
 */
interface SvgModuleMap {
  './Dimensions.svg': 761384;
  './Dimensions_doubleline.svg': 937662;
  './add_my_group.svg': 422657;
  './add_to_my_tiles.svg': 437571;
  './add_towishlist.svg': 668533;
  './arrow.svg': 304282;
  './arrow_triangle.svg': 738141;
  './back.svg': 998662;
  './btn_expand.svg': 466728;
  './btn_shrink.svg': 419451;
  './catalog_large.svg': 560092;
  './catalog_share_modeling_icon.svg': 538126;
  './close.svg': 157769;
  './close_hover.svg': 27578;
  './contactus.svg': 419785;
  './create.svg': 120911;
  './create_centerline.svg': 37011;
  './create_innerline.svg': 609188;
  './delete.svg': 585998;
  './edit_material.svg': 319541;
  './editable.svg': 428547;
  './editdesigncase.svg': 177757;
  './endpoint.svg': 280628;
  './favorite-add.svg': 968457;
  './favorite-added.svg': 347462;
  './favorite-remove.svg': 526400;
  './favorite.svg': 536287;
  './favorite_add_v2.svg': 151602;
  './favorite_added_v2.svg': 5455;
  './favorite_remove_v2.svg': 394953;
  './filterexpand.svg': 799485;
  './filterhover.svg': 320765;
  './fitscreen.svg': 633488;
  './flatlight_normal.svg': 181604;
  './fold.svg': 455454;
  './freedrawwall.svg': 665267;
  './front_page.svg': 919930;
  './front_page_v2.svg': 743717;
  './go_to_brand.svg': 434921;
  './grid.svg': 237523;
  './help.svg': 329262;
  './hide.svg': 752735;
  './icon_clear_input.svg': 88383;
  './info.svg': 973703;
  './info_icon.svg': 165185;
  './info_propertybar.svg': 725740;
  './intersectionPoint.svg': 84994;
  './leftpanel_build.svg': 328571;
  './leftpanel_catalog.svg': 728642;
  './leftpanel_style.svg': 367340;
  './light_white.svg': 955455;
  './list.svg': 864723;
  './logo.svg': 812222;
  './mail.svg': 921778;
  './more_items.svg': 723901;
  './new.svg': 882915;
  './new_fav_icon.svg': 401407;
  './new_fav_icon_active.svg': 322568;
  './next_page.svg': 977818;
  './next_page_v2.svg': 63173;
  './pagination.svg': 414763;
  './panorama_view.svg': 406374;
  './pin.svg': 826972;
  './previewlist.svg': 266565;
  './print.svg': 255696;
  './private.svg': 523844;
  './product_list.svg': 179111;
  './property.svg': 939104;
  './public.svg': 676408;
  './question.svg': 606247;
  './question2.svg': 841223;
  './readonly.svg': 835133;
  './recent.svg': 781026;
  './render_failed.svg': 946829;
  './replace.svg': 438041;
  './return_all.svg': 508905;
  './save.svg': 109920;
  './share.svg': 437552;
  './social_facebook.svg': 275769;
  './social_google_plus.svg': 157719;
  './social_pinterest.svg': 283401;
  './social_twitter.svg': 698102;
  './solidPoint.svg': 775326;
  './spotlight_normal.svg': 781713;
  './style_rotation_1.svg': 579679;
  './style_rotation_2.svg': 824332;
  './tiles_copy.svg': 181326;
  './tiles_delete.svg': 594776;
  './tiles_edit.svg': 372517;
  './tiles_modify.svg': 853339;
  './timeControl.svg': 602747;
  './upload.svg': 955124;
  './upload_cloud.svg': 37406;
  './upload_cloud_blue.svg': 133505;
  './upload_hover.svg': 379427;
  './zoomin.svg': 262159;
  './zoomout.svg': 746426;
}

/**
 * SVG模块路径类型
 */
type SvgModulePath = keyof SvgModuleMap;

/**
 * SVG模块ID类型
 */
type SvgModuleId = SvgModuleMap[SvgModulePath];

/**
 * SVG资源加载器接口
 */
interface SvgResourceLoader {
  /**
   * 动态加载SVG模块
   * @param modulePath - SVG文件的相对路径
   * @returns 加载的SVG模块
   * @throws {Error} 当模块路径不存在时抛出 MODULE_NOT_FOUND 错误
   */
  (modulePath: SvgModulePath): unknown;

  /**
   * 获取所有可用的SVG模块路径
   * @returns 所有SVG文件路径的数组
   */
  keys(): SvgModulePath[];

  /**
   * 解析SVG模块路径为模块ID
   * @param modulePath - SVG文件的相对路径
   * @returns 对应的模块ID
   * @throws {Error} 当模块路径不存在时抛出 MODULE_NOT_FOUND 错误
   */
  resolve(modulePath: SvgModulePath): SvgModuleId;

  /**
   * 当前加载器的唯一标识符
   */
  id: 98866;
}

/**
 * SVG资源加载器实例
 */
declare const svgLoader: SvgResourceLoader;

export default svgLoader;
export type { SvgModuleMap, SvgModulePath, SvgModuleId, SvgResourceLoader };