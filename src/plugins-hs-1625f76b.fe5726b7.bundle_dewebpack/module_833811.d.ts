/**
 * 图片搜索功能模块
 * 提供图片搜索按钮和页面组件的访问器
 */

import { ImageSearchButton } from './759438';
import { ImageSearchPage } from './645587';
import BaseClass from './9038';

/**
 * 图片搜索类
 * 继承自基类，提供图片搜索相关组件的访问接口
 */
export default class ImageSearch extends BaseClass {
  /**
   * 构造函数
   * 创建图片搜索实例
   */
  constructor();

  /**
   * 获取图片搜索按钮组件
   * @returns 图片搜索按钮组件类或实例
   */
  get imageSearchIcon(): typeof ImageSearchButton;

  /**
   * 获取图片搜索页面组件
   * @returns 图片搜索页面组件类或实例
   */
  get imageSearchPage(): typeof ImageSearchPage;
}

/**
 * 类型导出
 */
export type ImageSearchConstructor = typeof ImageSearch;
export type ImageSearchInstance = InstanceType<typeof ImageSearch>;