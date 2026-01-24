/**
 * Icon font CSS module
 * Provides iconfont styles and icon classes for the application
 * 
 * @module IconFontStyles
 */
declare module '*.css' {
  const content: string;
  export default content;
}

/**
 * Available icon class names in the iconfont
 */
export type IconClassName =
  | 'icon-fullscreen'
  | 'icon-delete-o'
  | 'icon-share-o'
  | 'icon-aerial'
  | 'icon-quanjing-o-uncheck'
  | 'icon-quanwu-o-uncheck'
  | 'icon-back-o-top'
  | 'icon-redact-o'
  | 'icon-open-o'
  | 'icon-vr-o'
  | 'icon-xuanzhuan-o'
  | 'icon-phone-o'
  | 'icon-qiehuanfangjian-o'
  | 'icon-user-o'
  | 'icon-fanzhuan-o'
  | 'icon-jingao-o'
  | 'icon-bofang-o-checked'
  | 'icon-date-o'
  | 'icon-desigan-o'
  | 'icon-huxingdaolan-o'
  | 'icon-shangpinbiaoqianactive'
  | 'icon-bofang-o-uncheck'
  | 'icon-shangpinbiaoqian-o'
  | 'icon-time-o'
  | 'icon-music-o'
  | 'icon-maodian-o'
  | 'icon-tuoluoyi-o'
  | 'icon-xiala-o'
  | 'icon-shangla-o'
  | 'icon-help-o'
  | 'icon-close-o'
  | 'icon-helpmanyou-o'
  | 'icon-manyou-o'
  | 'icon-close1-o'
  | 'icon-huxingdaolanactive'
  | 'icon-qiehuanfangjianactive'
  | 'icon-selected'
  | 'icon-huabanfuben'
  | 'icon-huabanfuben1'
  | 'icon-openInShop';

/**
 * Icon unicode mapping
 */
export const ICON_UNICODE: Record<IconClassName, string>;