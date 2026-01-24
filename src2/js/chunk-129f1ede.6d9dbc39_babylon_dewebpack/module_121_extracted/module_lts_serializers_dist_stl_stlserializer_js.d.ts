/**
 * STL文件导出模块
 * 提供将3D网格导出为STL格式（ASCII或二进制）的功能
 */

import { Mesh, InstancedMesh, Vector3, VertexBuffer } from '@babylonjs/core';

/**
 * 顶点和法线数据结构
 */
interface VertexNormalData {
  /** 三角形的三个顶点 */
  v: [Vector3, Vector3, Vector3];
  /** 三角形的法向量 */
  n: Vector3;
}

/**
 * STL导出配置选项
 */
interface STLExportOptions {
  /** 是否自动下载生成的文件 */
  download?: boolean;
  /** 导出的文件名（不含扩展名） */
  fileName?: string;
  /** 是否导出为二进制格式（false为ASCII格式） */
  binary?: boolean;
  /** 字节序：true为小端序，false为大端序 */
  littleEndian?: boolean;
  /** 是否保持网格的世界变换矩阵 */
  keepTransform?: boolean;
  /** 是否强制应用实例化网格的变换 */
  forceInstanceTransform?: boolean;
}

/**
 * STL导出类
 * 负责将Babylon.js网格导出为STL格式文件
 */
export declare class STLExport {
  /**
   * 创建STL文件数据
   * 
   * @param meshes - 要导出的网格数组
   * @param download - 是否自动触发浏览器下载，默认true
   * @param fileName - 导出文件名（不含扩展名），默认"stlmesh"
   * @param binary - 是否使用二进制格式，默认false（ASCII格式）
   * @param littleEndian - 二进制模式下的字节序，true为小端序，默认true
   * @param keepTransform - 是否保持网格变换（不烘焙到顶点），默认false
   * @param forceInstanceTransform - 是否强制处理实例化网格的变换，默认undefined
   * @returns 返回STL数据（二进制格式返回ArrayBuffer，ASCII格式返回字符串）
   * 
   * @example
   *