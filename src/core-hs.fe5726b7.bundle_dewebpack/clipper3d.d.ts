/**
 * 3D布尔运算裁剪器模块
 * 提供对3D几何体的布尔运算功能（并集、交集、差集、异或等）
 */

import type { ClipMode } from './clip-mode';
import type { BodyEdit } from './body-edit';
import type { Shell } from './shell';
import type { Face } from './face';
import type { BuilderUtil } from './builder-util';
import type { Logger } from './logger';
import type { Log } from './log';

/**
 * 布尔运算类型枚举
 */
export enum BooleanOperationType {
    /** 并集运算 */
    union = 0,
    /** 交集运算 */
    intersect = 1,
    /** 差集运算 */
    difference = 2,
    /** 异或运算 */
    xor = 3,
    /** 分割运算 */
    split = 4
}

/**
 * 操作类型字符串标识
 */
export enum OperationTypeLabel {
    /** 并集标签 */
    Union = "union",
    /** 交集标签 */
    Inter = "inter",
    /** 差集标签 */
    Diff = "diff"
}

/**
 * 布尔运算结果接口
 */
export interface BooleanOperationResult {
    /** 生成的几何体数组 */
    bodies: Shell[];
    /** 面映射关系：新面 -> 原始面列表 */
    oldFace: Map<Face, Face[]>;
}

/**
 * 裁剪结果接口
 */
export interface ClipResult {
    /** 生成的几何体数组的数组 */
    bodys: Shell[][];
    /** 原始面映射关系 */
    originalFace: Map<Face, Face[]>;
}

/**
 * 面映射信息接口
 */
export interface FacesMapInfo {
    /** 面的源映射关系 */
    faceSources: Map<Face, Face[]>;
}

/**
 * 布尔运算返回结构
 */
export interface BooleanReturnValue {
    /** 结果几何体列表 */
    bodies: Shell[];
    /** 面映射信息 */
    facesMap: FacesMapInfo;
}

/**
 * 操作历史记录项
 */
interface OperationHistoryItem {
    /** 第一个操作体 */
    b1: Shell;
    /** 第二个操作体 */
    b2: Shell;
    /** 操作类型 */
    type: OperationTypeLabel;
    /** 操作结果 */
    ret: Shell;
}

/**
 * 3D裁剪器类
 * 实现3D几何体的布尔运算功能
 */
export declare class Clipper3D {
    /** 操作历史记录数组 */
    private static array: OperationHistoryItem[];

    /**
     * 记录错误日志
     * @param error - 错误对象
     * @param shell1Description - 第一个壳体的描述信息
     * @param shell2Description - 第二个壳体的描述信息
     * @param operationType - 操作类型
     * @param description - 错误描述
     */
    private static _log(
        error: Error,
        shell1Description: string,
        shell2Description: string,
        operationType: string | undefined,
        description: string
    ): void;

    /**
     * 执行两组几何体的裁剪操作
     * @param shells1 - 第一组几何体数组
     * @param shells2 - 第二组几何体数组
     * @param clipMode - 裁剪模式
     * @param enableSnapping - 是否启用捕捉对齐（默认false）
     * @returns 裁剪结果，包含生成的几何体和面映射关系
     */
    public static clip2(
        shells1: Shell[],
        shells2: Shell[],
        clipMode: ClipMode,
        enableSnapping?: boolean
    ): ClipResult;

    /**
     * 执行差集运算
     * @param shells1 - 被减几何体数组
     * @param shells2 - 减去的几何体数组
     * @param enableSnapping - 是否启用捕捉对齐
     * @returns 差集运算结果
     */
    private static clipDiff(
        shells1: Shell[],
        shells2: Shell[],
        enableSnapping: boolean
    ): BooleanOperationResult;

    /**
     * 执行交集运算
     * @param shells1 - 第一组几何体数组
     * @param shells2 - 第二组几何体数组
     * @param enableSnapping - 是否启用捕捉对齐
     * @returns 交集运算结果
     */
    private static clipInter(
        shells1: Shell[],
        shells2: Shell[],
        enableSnapping: boolean
    ): BooleanOperationResult;

    /**
     * 执行并集运算
     * @param shells1 - 第一组几何体数组
     * @param shells2 - 第二组几何体数组
     * @param enableSnapping - 是否启用捕捉对齐
     * @returns 并集运算结果
     */
    private static clipUnion(
        shells1: Shell[],
        shells2: Shell[],
        enableSnapping: boolean
    ): BooleanOperationResult;

    /**
     * 执行异或运算
     * @param shells1 - 第一组几何体数组
     * @param shells2 - 第二组几何体数组
     * @param enableSnapping - 是否启用捕捉对齐
     * @returns 异或运算结果
     * @throws 当前不支持异或运算
     */
    private static clipXor(
        shells1: Shell[],
        shells2: Shell[],
        enableSnapping: boolean
    ): BooleanOperationResult;

    /**
     * 修复面映射关系（方法2）
     * @param faces - 需要修复的面数组
     * @param faceMapping - 面映射关系
     */
    private static _fixMapping2(
        faces: Face[],
        faceMapping: Map<Face, Face[]>
    ): void;

    /**
     * 修复面映射关系
     * @param shell1 - 第一个壳体
     * @param shell2 - 第二个壳体
     * @param faceMapping - 面映射关系
     */
    private static _fixMapping(
        shell1: Shell,
        shell2: Shell,
        faceMapping: Map<Face, Face[]>
    ): void;

    /**
     * 当几何体有效时记录日志
     * @param error - 错误对象
     * @param shell1 - 第一个壳体
     * @param shell2 - 第二个壳体
     * @param operationType - 操作类型
     */
    private static _logWhenValid(
        error: Error,
        shell1: Shell,
        shell2: Shell,
        operationType: string
    ): void;

    /**
     * 生成新的面映射关系
     * @param faces - 面数组
     * @param sourceShell - 源壳体
     * @param faceMapping - 可选的现有面映射
     * @param existingMap - 可选的已存在映射表
     * @returns 新的面映射关系
     */
    private static _getNewMap(
        faces: Face[],
        sourceShell: Shell,
        faceMapping?: Map<Face, Face[]>,
        existingMap?: Map<Face, Face[]>
    ): Map<Face, Face[]>;

    /**
     * 合并多个几何体的面映射关系
     * @param shells - 几何体数组
     * @param faceMappings - 对应的面映射数组
     * @returns 合并后的面映射关系
     */
    private static _mergeMap(
        shells: Shell[],
        faceMappings: Map<Face, Face[]>[]
    ): Map<Face, Face[]>;
}