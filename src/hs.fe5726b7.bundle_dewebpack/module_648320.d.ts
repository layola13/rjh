/**
 * 长度单位输入控件
 * 提供带单位转换的长度值输入功能
 */

import { UnitInputWidget, UnitInputWidgetStateEnum, NaNDisplayString } from './UnitInputWidget';

/**
 * 长度单位输入控件类
 * 继承自 UnitInputWidget，专门处理长度单位的输入和显示
 */
export default class LengthInputWidget extends UnitInputWidget {
  /**
   * 单位类型
   */
  unitType: HSCore.Util.Unit.LengthUnitTypeEnum;

  /**
   * 显示精度（小数位数）
   */
  displayDigits: number;

  /**
   * 文本表达式
   */
  textExpression: string;

  /**
   * 调整步长（数据库单位）
   */
  tunningStep: number;

  /**
   * 输入元素引用
   */
  inputElement: HTMLInputElement;

  /**
   * 控件状态
   */
  state: UnitInputWidgetStateEnum;

  /**
   * 构造函数
   * @param element - DOM元素
   * @param unitType - 单位类型
   * @param displayDigits - 显示精度
   * @param initialValue - 初始值
   * @param onChange - 变化回调
   * @param onBlur - 失焦回调
   */
  constructor(
    element: HTMLElement,
    unitType: HSCore.Util.Unit.LengthUnitTypeEnum,
    displayDigits: number,
    initialValue: number,
    onChange?: (value: number) => void,
    onBlur?: () => void
  );

  /**
   * 将数值转换为显示字符串
   * @param value - 数据库单位的数值
   * @param unitType - 单位类型
   * @param displayDigits - 显示精度
   * @param formatOptions - 格式化选项
   */
  protected _toDisplayString(
    value: number,
    unitType: HSCore.Util.Unit.LengthUnitTypeEnum,
    displayDigits: number,
    formatOptions?: unknown
  ): void;

  /**
   * 根据输入获取数据库值
   * @param inputText - 输入文本
   * @param unitType - 单位类型
   * @returns 数据库单位的数值，解析失败返回 NaN
   */
  protected _getDBValueByInput(
    inputText: string,
    unitType: HSCore.Util.Unit.LengthUnitTypeEnum
  ): number;

  /**
   * 从文档更新显示单位和精度
   * 从当前楼层平面图获取显示单位和精度设置
   */
  protected _updateDisplayUnitAndDigitsFromDoc(): void;

  /**
   * 显示单位或精度变化时的回调
   * 重新计算调整步长并更新输入文本
   */
  protected _onDisplayUnitOrDigitsChanged(): void;

  /**
   * 更新输入文本显示
   */
  protected _updateInputText(): void;

  /**
   * 创建长度输入控件实例的工厂方法
   * @param element - DOM元素
   * @param unitType - 单位类型
   * @param displayDigits - 显示精度
   * @param initialValue - 初始值
   * @param onChange - 变化回调
   * @param onBlur - 失焦回调
   * @returns 新创建的长度输入控件实例
   */
  static create(
    element: HTMLElement,
    unitType: HSCore.Util.Unit.LengthUnitTypeEnum,
    displayDigits: number,
    initialValue: number,
    onChange?: (value: number) => void,
    onBlur?: () => void
  ): LengthInputWidget;
}

/**
 * 全局命名空间声明
 */
declare global {
  namespace HSCore {
    namespace Util {
      namespace Unit {
        /**
         * 长度单位类型枚举
         */
        enum LengthUnitTypeEnum {
          /** 米 */
          meter = 'meter',
          /** 厘米 */
          centimeter = 'centimeter',
          /** 毫米 */
          millimeter = 'millimeter',
          /** 千米 */
          kilometer = 'kilometer',
          /** 英尺 */
          foot = 'foot',
          /** 英寸 */
          inch = 'inch'
        }

        /**
         * 将长度值转换为数据库单位
         * @param value - 原始值
         * @param unitType - 单位类型
         * @returns 数据库单位的值
         */
        function ConvertLengthToDatabaseUnit(
          value: number,
          unitType: LengthUnitTypeEnum
        ): number;
      }
    }
  }

  namespace HSApp {
    namespace Config {
      /** 租户标识 */
      const TENANT: string;
    }

    namespace Util {
      namespace UnitFormater {
        /**
         * 将长度值转换为显示字符串
         * @param value - 数据库单位的值
         * @param unitType - 单位类型
         * @param displayDigits - 显示精度
         * @param formatOptions - 格式化选项
         * @returns 格式化的显示字符串
         */
        function toLengthDisplayString(
          value: number,
          unitType: HSCore.Util.Unit.LengthUnitTypeEnum,
          displayDigits: number,
          formatOptions?: unknown
        ): string;
      }

      namespace ParseUtil {
        /**
         * 尝试获取长度数据库单位值
         * @param inputText - 输入文本
         * @param unitType - 单位类型
         * @returns 数据库单位的值，解析失败返回 NaN
         */
        function tryGetLengthDatabaseUnitValue(
          inputText: string,
          unitType: HSCore.Util.Unit.LengthUnitTypeEnum
        ): number;
      }
    }

    namespace App {
      /**
       * 获取应用实例
       * @returns 应用实例
         */
      function getApp(): {
        /** 楼层平面图 */
        floorplan: {
          /** 显示长度单位 */
          displayLengthUnit: HSCore.Util.Unit.LengthUnitTypeEnum;
          /** 显示长度精度位数 */
          displayLengthPrecisionDigits: number;
        };
      };
    }
  }
}