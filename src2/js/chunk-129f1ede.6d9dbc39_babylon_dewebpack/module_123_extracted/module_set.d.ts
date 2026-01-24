/**
 * Module: module_set
 * Original ID: set
 * 
 * 设置砖块高度相关的配置模块
 */

/**
 * 设置砖块的高度数量
 * @param numberOfBricksHeight - 砖块的高度数量
 * @remarks
 * 此方法会更新内部的砖块高度属性，并触发着色器uniform变量的更新
 */
declare function setBricksHeight(numberOfBricksHeight: number): void;

/**
 * 或者如果这是类的方法：
 */
declare class BrickModule {
  /**
   * 砖块的高度数量（内部属性）
   * @private
   */
  private _numberOfBricksHeight: number;

  /**
   * 设置砖块的高度数量
   * @param numberOfBricksHeight - 砖块的高度数量
   * @remarks
   * 更新砖块高度并同步更新着色器uniform变量
   */
  setBricksHeight(numberOfBricksHeight: number): void;

  /**
   * 更新着色器的uniform变量
   * @private
   */
  private updateShaderUniforms(): void;
}