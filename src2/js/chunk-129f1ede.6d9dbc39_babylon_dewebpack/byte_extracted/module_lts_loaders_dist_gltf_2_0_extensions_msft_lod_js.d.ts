/**
 * glTF扩展：MSFT_lod
 * 用于支持glTF模型的多细节层次(LOD)加载
 */

import type { Observable } from 'core/Misc/observable';
import type { GLTFLoader, IGLTFLoaderExtension } from '../../../lts/loaders/dist/glTF/2.0/glTFLoader';
import type { INode, IMaterial, IBufferView } from '../../../lts/loaders/dist/glTF/2.0/glTFLoaderInterfaces';
import type { TransformNode } from 'core/Meshes/transformNode';
import type { Material } from 'core/Materials/material';
import type { Texture } from 'core/Materials/Textures/texture';
import type { Mesh } from 'core/Meshes/mesh';

/**
 * 扩展名称常量
 */
export declare const EXTENSION_NAME = "MSFT_lod";

/**
 * LOD缓冲区范围信息
 */
export interface IBufferLOD {
    /** 起始字节偏移 */
    start: number;
    /** 结束字节偏移 */
    end: number;
    /** 加载完成的Promise */
    loaded: Deferred<ArrayBufferView>;
}

/**
 * MSFT_lod扩展定义
 */
export interface IMSFT_lod {
    /** LOD的索引ID数组 */
    ids: number[];
}

/**
 * Deferred Promise包装器
 */
export interface Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason?: unknown) => void;
}

/**
 * glTF MSFT_lod扩展加载器
 * 支持按需加载不同细节级别的节点和材质
 */
export declare class MSFT_lod implements IGLTFLoaderExtension {
    /** 扩展名称 */
    readonly name: string;

    /** 加载顺序优先级 */
    readonly order: number;

    /** 是否启用扩展 */
    enabled: boolean;

    /** 最大加载的LOD层级数，必须大于0 */
    maxLODsToLoad: number;

    /** 节点LOD加载完成事件 */
    readonly onNodeLODsLoadedObservable: Observable<number>;

    /** 材质LOD加载完成事件 */
    readonly onMaterialLODsLoadedObservable: Observable<number>;

    /** 通用缓冲区LOD数组 */
    private readonly _bufferLODs: IBufferLOD[];

    /** 当前加载的节点LOD索引 */
    private _nodeIndexLOD: number | null;

    /** 节点LOD信号Deferred数组 */
    private readonly _nodeSignalLODs: Deferred<void>[];

    /** 节点LOD Promise数组 */
    private readonly _nodePromiseLODs: Promise<unknown>[][];

    /** 节点缓冲区LOD数组 */
    private readonly _nodeBufferLODs: IBufferLOD[];

    /** 当前加载的材质LOD索引 */
    private _materialIndexLOD: number | null;

    /** 材质LOD信号Deferred数组 */
    private readonly _materialSignalLODs: Deferred<void>[];

    /** 材质LOD Promise数组 */
    private readonly _materialPromiseLODs: Promise<unknown>[][];

    /** 材质缓冲区LOD数组 */
    private readonly _materialBufferLODs: IBufferLOD[];

    /** glTF加载器实例 */
    private _loader: GLTFLoader;

    /**
     * 构造函数
     * @param loader - glTF加载器实例
     */
    constructor(loader: GLTFLoader);

    /**
     * 释放扩展资源
     */
    dispose(): void;

    /**
     * 当加载器准备就绪时调用
     * 设置所有LOD层级的加载链和回调
     */
    onReady(): void;

    /**
     * 加载场景（异步）
     * @param context - 上下文路径
     * @param scene - glTF场景对象
     * @returns 加载Promise
     */
    loadSceneAsync(context: string, scene: unknown): Promise<void>;

    /**
     * 加载节点（异步）
     * @param context - 上下文路径
     * @param node - glTF节点对象
     * @param assign - 节点赋值回调函数
     * @returns 加载的TransformNode Promise
     */
    loadNodeAsync(
        context: string,
        node: INode,
        assign: (babylonTransformNode: TransformNode) => void
    ): Promise<TransformNode> | null;

    /**
     * 加载材质（异步）
     * @param context - 上下文路径
     * @param material - glTF材质对象
     * @param mesh - Babylon网格对象
     * @param babylonDrawMode - Babylon绘制模式
     * @param assign - 材质赋值回调函数
     * @returns 加载的Material Promise
     */
    _loadMaterialAsync(
        context: string,
        material: IMaterial,
        mesh: Mesh,
        babylonDrawMode: number,
        assign: (babylonMaterial: Material) => void
    ): Promise<Material> | null;

    /**
     * 加载URI资源（异步）
     * @param context - 上下文路径
     * @param property - 属性对象
     * @param uri - 资源URI
     * @returns 加载的ArrayBufferView Promise
     */
    _loadUriAsync(
        context: string,
        property: unknown,
        uri: string
    ): Promise<ArrayBufferView> | null;

    /**
     * 加载缓冲区（异步）
     * @param context - 上下文路径
     * @param buffer - glTF缓冲区对象
     * @param byteOffset - 字节偏移
     * @param byteLength - 字节长度
     * @returns 加载的ArrayBufferView Promise
     */
    loadBufferAsync(
        context: string,
        buffer: unknown,
        byteOffset: number,
        byteLength: number
    ): Promise<ArrayBufferView> | null;

    /**
     * 加载指定LOD层级的缓冲区范围
     * @param bufferLODs - 缓冲区LOD数组
     * @param lodIndex - LOD层级索引
     */
    private _loadBufferLOD(bufferLODs: IBufferLOD[], lodIndex: number): void;

    /**
     * 获取LOD层级对象数组
     * @param context - 上下文路径
     * @param property - 属性对象
     * @param array - 源数组
     * @param ids - LOD ID数组
     * @returns LOD对象数组
     */
    private _getLODs<T>(
        context: string,
        property: T,
        array: T[],
        ids: number[]
    ): T[];

    /**
     * 释放TransformNode及其相关资源
     * @param transformNode - 要释放的TransformNode
     */
    private _disposeTransformNode(transformNode: TransformNode): void;

    /**
     * 释放材质数组
     * @param materials - 要释放的材质数组
     */
    private _disposeMaterials(materials: Material[]): void;
}

/**
 * 注册MSFT_lod扩展到GLTFLoader
 */
declare function registerExtension(): void;