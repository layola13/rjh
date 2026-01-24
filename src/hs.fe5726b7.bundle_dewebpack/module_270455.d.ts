/**
 * 材质纹理变换扩展模块
 * 为 Three.js 材质类型添加纹理变换支持
 */

import {
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Texture
} from 'three';

/**
 * 扩展的纹理接口，支持材质变换
 */
interface TextureWithTransform extends Texture {
  /**
   * 将纹理变换应用到目标材质
   * @param material - 目标材质对象
   */
  setTransformToMaterial?(material: MaterialWithDiffuseTexture): void;
}

/**
 * 支持漫反射纹理设置的材质接口
 */
interface MaterialWithDiffuseTexture {
  /**
   * 设置漫反射纹理
   * @param texture - 纹理对象
   */
  setDiffuseTexture(texture: TextureWithTransform | null): void;
}

declare module 'three' {
  /**
   * 扩展 MeshBasicMaterial 以支持漫反射纹理设置
   */
  interface MeshBasicMaterial {
    /**
     * 设置漫反射纹理并自动应用纹理变换
     * @param texture - 纹理对象，可能包含变换信息
     */
    setDiffuseTexture(texture: TextureWithTransform | null): void;
  }

  /**
   * 扩展 MeshLambertMaterial 以支持漫反射纹理设置
   */
  interface MeshLambertMaterial {
    /**
     * 设置漫反射纹理并自动应用纹理变换
     * @param texture - 纹理对象，可能包含变换信息
     */
    setDiffuseTexture(texture: TextureWithTransform | null): void;
  }

  /**
   * 扩展 MeshPhongMaterial 以支持漫反射纹理设置
   */
  interface MeshPhongMaterial {
    /**
     * 设置漫反射纹理并自动应用纹理变换
     * @param texture - 纹理对象，可能包含变换信息
     */
    setDiffuseTexture(texture: TextureWithTransform | null): void;
  }
}

export type {
  TextureWithTransform,
  MaterialWithDiffuseTexture
};