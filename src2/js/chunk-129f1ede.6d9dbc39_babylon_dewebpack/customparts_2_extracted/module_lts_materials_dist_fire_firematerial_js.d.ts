/**
 * 火焰材质模块
 * Babylon.js 火焰材质的 TypeScript 类型定义
 */

import type { Material } from '@babylonjs/core/Materials/material';
import type { PushMaterial } from '@babylonjs/core/Materials/pushMaterial';
import type { MaterialDefines } from '@babylonjs/core/Materials/materialDefines';
import type { Scene } from '@babylonjs/core/scene';
import type { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { Texture } from '@babylonjs/core/Materials/Textures/texture';
import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import type { Color3 } from '@babylonjs/core/Maths/math.color';
import type { Nullable } from '@babylonjs/core/types';
import type { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';

/**
 * 火焰材质的材质定义类
 * 包含着色器所需的所有预处理宏定义
 */
export declare class FireMaterialDefines extends MaterialDefines {
    /** 是否启用漫反射纹理 */
    DIFFUSE: boolean;
    
    /** 是否启用裁剪平面1 */
    CLIPPLANE: boolean;
    
    /** 是否启用裁剪平面2 */
    CLIPPLANE2: boolean;
    
    /** 是否启用裁剪平面3 */
    CLIPPLANE3: boolean;
    
    /** 是否启用裁剪平面4 */
    CLIPPLANE4: boolean;
    
    /** 是否启用裁剪平面5 */
    CLIPPLANE5: boolean;
    
    /** 是否启用裁剪平面6 */
    CLIPPLANE6: boolean;
    
    /** 是否启用 Alpha 测试 */
    ALPHATEST: boolean;
    
    /** 是否启用深度预渲染 */
    DEPTHPREPASS: boolean;
    
    /** 是否使用点云渲染 */
    POINTSIZE: boolean;
    
    /** 是否启用雾效 */
    FOG: boolean;
    
    /** 是否使用 UV1 坐标 */
    UV1: boolean;
    
    /** 是否使用顶点颜色 */
    VERTEXCOLOR: boolean;
    
    /** 是否使用顶点 Alpha */
    VERTEXALPHA: boolean;
    
    /** 每个网格的骨骼数量 */
    BonesPerMesh: number;
    
    /** 骨骼影响数量 */
    NUM_BONE_INFLUENCERS: number;
    
    /** 是否使用实例化渲染 */
    INSTANCES: boolean;
    
    /** 实例化是否包含颜色 */
    INSTANCESCOLOR: boolean;
    
    /** 是否在后处理中应用图像处理 */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** 是否跳过最终颜色限制 */
    SKIPFINALCOLORCLAMP: boolean;
    
    constructor();
}

/**
 * 火焰材质类
 * 用于创建动态火焰效果的材质，支持扭曲和透明度纹理
 * @extends PushMaterial
 */
export declare class FireMaterial extends PushMaterial {
    /**
     * 漫反射颜色
     * 控制火焰的基础色调
     */
    diffuseColor: Color3;
    
    /**
     * 火焰动画速度
     * 值越大，火焰动画越快
     */
    speed: number;
    
    /**
     * 漫反射纹理
     * 火焰的主纹理，通常包含火焰图案
     */
    get diffuseTexture(): Nullable<Texture>;
    set diffuseTexture(value: Nullable<Texture>);
    
    /**
     * 扭曲纹理
     * 用于扭曲火焰效果，模拟热浪效果
     */
    get distortionTexture(): Nullable<Texture>;
    set distortionTexture(value: Nullable<Texture>);
    
    /**
     * 不透明度纹理
     * 控制火焰的透明度分布
     */
    get opacityTexture(): Nullable<Texture>;
    set opacityTexture(value: Nullable<Texture>);
    
    /**
     * 创建火焰材质实例
     * @param name - 材质名称
     * @param scene - 所属场景
     */
    constructor(name: string, scene: Scene);
    
    /**
     * 是否需要 Alpha 混合
     * 火焰材质不需要 Alpha 混合
     * @returns 始终返回 false
     */
    needAlphaBlending(): boolean;
    
    /**
     * 是否需要 Alpha 测试
     * 火焰材质需要 Alpha 测试来实现透明效果
     * @returns 始终返回 true
     */
    needAlphaTesting(): boolean;
    
    /**
     * 获取用于 Alpha 测试的纹理
     * @returns null，因为使用专门的不透明度纹理
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;
    
    /**
     * 检查材质是否准备好为子网格渲染
     * @param mesh - 要渲染的网格
     * @param subMesh - 要渲染的子网格
     * @param useInstances - 是否使用实例化渲染
     * @returns 如果材质准备好则返回 true
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    
    /**
     * 为子网格绑定材质数据
     * @param world - 世界矩阵
     * @param mesh - 网格对象
     * @param subMesh - 子网格对象
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    
    /**
     * 获取可动画对象列表
     * 返回所有包含动画的纹理
     * @returns 可动画对象数组
     */
    getAnimatables(): IAnimatable[];
    
    /**
     * 获取当前激活的纹理列表
     * @returns 激活的纹理数组
     */
    getActiveTextures(): BaseTexture[];
    
    /**
     * 检查材质是否包含指定纹理
     * @param texture - 要检查的纹理
     * @returns 如果包含则返回 true
     */
    hasTexture(texture: BaseTexture): boolean;
    
    /**
     * 获取材质类名
     * @returns 类名字符串 "FireMaterial"
     */
    getClassName(): string;
    
    /**
     * 释放材质资源
     * @param forceDisposeEffect - 是否强制释放效果
     * @param forceDisposeTextures - 是否强制释放纹理
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
    
    /**
     * 克隆材质
     * @param name - 新材质的名称
     * @returns 克隆的材质实例
     */
    clone(name: string): FireMaterial;
    
    /**
     * 序列化材质数据
     * @returns 序列化的 JSON 对象
     */
    serialize(): any;
    
    /**
     * 从序列化数据解析材质
     * @param source - 序列化的源数据
     * @param scene - 目标场景
     * @param rootUrl - 资源根路径
     * @returns 解析得到的火焰材质实例
     */
    static Parse(source: any, scene: Scene, rootUrl: string): FireMaterial;
}