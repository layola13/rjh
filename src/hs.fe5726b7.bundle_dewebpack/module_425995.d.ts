/**
 * 面积单位输入控件模块
 * 提供面积数值的输入、显示和单位转换功能
 */

import { UnitInputWidget, UnitInputWidgetStateEnum, NaNDisplayString } from './UnitInputWidget';

/**
 * 面积单位输入控件类
 * 继承自基础单位输入控件，专门用于处理面积单位的输入和显示
 */
export default class AreaUnitInputWidget extends UnitInputWidget {
  /**
   * 构造函数
   * @param element - 输入元素的DOM引用
   * @param initialValue - 初始数值（数据库单位）
   * @param unitType - 单位类型
   * @param displayDigits - 显示精度（小数位数）
   */
  constructor(
    element: HTMLElement,
    initialValue: number,
    unitType: HSCore.Util.Unit.AreaUnitTypeEnum,
    displayDigits: number
  );

  /**
   * 将数据库单位值转换为显示字符串
   * @param value - 数据库单位的数值
   * @param unitType - 面积单位类型
   * @param displayDigits - 显示精度（小数位数）
   * @param shouldFormat - 是否格式化显示
   * @remarks 如果值为NaN，则显示NaN字符串；否则格式化为面积单位字符串
   */
  protected _toDisplayString(
    value: number,
    unitType: HSCore.Util.Unit.AreaUnitTypeEnum,
    displayDigits: number,
    shouldFormat: boolean
  ): void;

  /**
   * 根据输入文本获取数据库单位值
   * @param inputText - 用户输入的文本
   * @param unitType - 当前使用的面积单位类型
   * @returns 转换后的数据库单位值，如果输入为NaN字符串则返回NaN
   */
  protected _getDBValueByInput(
    inputText: string,
    unitType: HSCore.Util.Unit.AreaUnitTypeEnum
  ): number;

  /**
   * 从文档配置更新显示单位和精度
   * @remarks 从全局应用的平面图配置中读取面积单位和精度设置
   */
  protected _updateDisplayUnitAndDigitsFromDoc(): void;

  /**
   * 当显示单位或精度改变时的回调
   * @remarks 
   * - 更新单位类型和显示精度
   * - 根据单位系统（公制/英制）计算微调步长
   * - 公制单位（米/厘米/毫米/千米）使用10进制
   * - 英制单位（英尺/英寸）使用2进制
   * - 更新输入框显示文本
   */
  protected _onDisplayUnitOrDigitsChanged(): void;

  /**
   * 静态工厂方法
   * 创建面积单位输入控件实例
   * @param element - 输入元素的DOM引用
   * @param initialValue - 初始数值（数据库单位）
   * @param unitType - 单位类型
   * @param displayDigits - 显示精度（小数位数）
   * @returns 新创建的AreaUnitInputWidget实例
   */
  static create(
    element: HTMLElement,
    initialValue: number,
    unitType: HSCore.Util.Unit.AreaUnitTypeEnum,
    displayDigits: number
  ): AreaUnitInputWidget;
}

/**
 * 全局命名空间声明
 */
declare global {
  namespace HSApp {
    namespace App {
      /**
       * 获取应用程序实例
       * @returns 包含平面图配置的应用实例
       */
      function getApp(): {
        floorplan: {
          /** 显示面积单位 */
          displayAreaUnit: HSCore.Util.Unit.AreaUnitTypeEnum;
          /** 显示面积精度位数 */
          displayAreaPrecisionDigits: number;
        };
      };
    }

    namespace Util {
      namespace UnitFormater {
        /**
         * 将数值转换为面积显示字符串
         * @param value - 数据库单位的数值
         * @param unitType - 面积单位类型
         * @param precision - 精度
         * @param shouldFormat - 是否格式化
         * @returns 格式化后的面积字符串
         */
        function toAreaDisplayString(
          value: number,
          unitType: HSCore.Util.Unit.AreaUnitTypeEnum,
          precision: number,
          shouldFormat: boolean
        ): string;
      }

      namespace ParseUtil {
        /**
         * 尝试将面积输入字符串转换为数据库单位值
         * @param inputText - 输入的文本
         * @param unitType - 当前使用的面积单位类型
         * @returns 数据库单位的数值，解析失败返回NaN
         */
        function tryGetAreaDatabaseUnitValue(
          inputText: string,
          unitType: HSCore.Util.Unit.AreaUnitTypeEnum
        ): number;
      }
    }
  }

  namespace HSCore {
    namespace Util {
      namespace Unit {
        /**
         * 面积单位类型枚举
         */
        enum AreaUnitTypeEnum {
          /** 平方米 */
          meter = 'meter',
          /** 平方厘米 */
          centimeter = 'centimeter',
          /** 平方毫米 */
          millimeter = 'millimeter',
          /** 平方千米 */
          kilometer = 'kilometer',
          /** 平方英尺 */
          foot = 'foot',
          /** 平方英寸 */
          inch = 'inch'
        }

        /**
         * 将面积值转换为数据库单位
         * @param value - 指定单位的面积值
         * @param unitType - 面积单位类型
         * @returns 数据库单位的面积值
         */
        function ConvertAreaToDatabaseUnit(
          value: number,
          unitType: AreaUnitTypeEnum
        ): number;
      }
    }
  }
}