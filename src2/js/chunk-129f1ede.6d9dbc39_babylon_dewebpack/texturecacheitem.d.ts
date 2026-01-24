/**
 * 纹理缓存项模块
 * 提供纹理资源的缓存管理和加载功能
 */

import { Texture, Scene } from '@babylonjs/core';

/**
 * 配置文件类型枚举
 * 定义了各种硬件、材质和场景元素的类型标识
 */
export enum ProfileTypesEnum {
  /** 标准型材 */
  LXC = 'LXC',
  /** 内侧型材 */
  LXCIN = 'LXCIN',
  /** 外侧型材 */
  LXCOUT = 'LXCOUT',
  /** 锁具硬件 */
  HardwareLock = 'HardwareLock',
  /** 铰链硬件 */
  HardwareHinge = 'HardwareHinge',
  /** 专业铰链硬件 */
  HardwareHingePro = 'HardwareHingePro',
  /** 钩锁硬件 */
  HardwareLockHookLock = 'HardwareLockHookLock',
  /** 钩锁手柄硬件 */
  HardwareLockHookLockHandle = 'HardwareLockHookLockHandle',
  /** 月牙锁硬件 */
  HardwareCrecentLock = 'HardwareCrecentLock',
  /** KFC左手柄 */
  HardwareKfcHandleLeft = 'HardwareKfcHandleLeft',
  /** KFC右手柄 */
  HardwareKfcHandleRight = 'HardwareKfcHandleRight',
  /** 商业手柄2左侧 */
  CommercialHandle2Left = 'CommercialHandle2Left',
  /** 商业手柄2右侧 */
  CommercialHandle2Right = 'CommercialHandle2Right',
  /** 纱窗 */
  Flyscreen = 'Flyscreen',
  /** 背景 */
  Background = 'Background',
  /** 透明材质 */
  Transparent = 'Transparent',
  /** 外墙砖墙 */
  BrickWallOut = 'BrickWallOut',
  /** 内墙砖墙 */
  BrickWallIn = 'BrickWallIn'
}

/**
 * 纹理缓存项
 * 存储单个纹理的完整信息，包括文件名、路径和纹理对象
 */
export interface TextureCacheItem {
  /** 纹理文件名（大写） */
  fileName: string;
  /** 纹理文件完整路径URL */
  filePath: string;
  /** Babylon.js纹理对象 */
  fileTexture: Texture;
  /** 纹理U方向缩放系数 */
  fileU: number;
  /** 纹理V方向缩放系数 */
  fileV: number;
}

/**
 * 地板配置接口
 * 定义地板渲染相关的尺寸参数
 */
interface FloorConfig {
  /** 地板项尺寸 */
  FloorItemSize: number;
}

/**
 * 纹理缓存管理器
 * 提供纹理资源的统一加载、缓存和查询功能
 */
export default class TextureCacheManager {
  /** Babylon.js场景实例 */
  private static Scene: Scene;
  
  /** 纹理缓存数组 */
  private static CacheTextures: TextureCacheItem[] = [];

  /**
   * 初始化纹理缓存管理器
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: Scene): void {
    this.Scene = scene;
    this.CacheTextures = [];
  }

  /**
   * 清空纹理缓存
   * 释放所有已缓存的纹理资源
   */
  static Clean(): void {
    this.CacheTextures.length = 0;
  }

  /**
   * 根据名称获取纹理
   * 若缓存中不存在，则根据预定义规则加载对应纹理
   * @param textureName - 纹理名称（对应ProfileTypesEnum枚举值）
   * @returns 纹理缓存项，加载失败时返回undefined
   */
  static GetTextureFromName(textureName: string): TextureCacheItem | undefined {
    // 尝试从缓存中查找（不区分大小写）
    const cachedTexture = this.CacheTextures.find(
      item => item.fileName.toLowerCase() === textureName.toLowerCase()
    );
    
    if (cachedTexture) {
      return cachedTexture;
    }

    // 根据纹理名称映射到对应的URL
    let textureUrl: string | undefined;

    switch (textureName) {
      case ProfileTypesEnum.LXC:
      case ProfileTypesEnum.LXCIN:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Profiles/in.jpg';
        break;

      case ProfileTypesEnum.LXCOUT:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Profiles/out.jpg';
        break;

      case ProfileTypesEnum.HardwareLock:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/Locks/0.png';
        break;

      case ProfileTypesEnum.HardwareHinge:
      case ProfileTypesEnum.HardwareHingePro:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/Hinges/0.png';
        break;

      case ProfileTypesEnum.HardwareLockHookLock:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/HookLocks/2.png';
        break;

      case ProfileTypesEnum.HardwareLockHookLockHandle:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/HookLockHandles/1.png';
        break;

      case ProfileTypesEnum.HardwareCrecentLock:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/CrescentLocks/0.png';
        break;

      case ProfileTypesEnum.HardwareKfcHandleLeft:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/KFC/ls_left.png';
        break;

      case ProfileTypesEnum.HardwareKfcHandleRight:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/KFC/ls_right.png';
        break;

      case ProfileTypesEnum.CommercialHandle2Left:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/CommercialHandle2_left.png';
        break;

      case ProfileTypesEnum.CommercialHandle2Right:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Hardware/CommercialHandle2_right.png';
        break;

      case ProfileTypesEnum.Flyscreen:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/flyscreen.png';
        break;

      case ProfileTypesEnum.Background:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Floors/00.jpg';
        break;

      case ProfileTypesEnum.Transparent:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/transparent.png';
        break;

      case ProfileTypesEnum.BrickWallOut:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Walls/00.jpg';
        break;

      case ProfileTypesEnum.BrickWallIn:
        textureUrl = 'https://mobilecctokshow.oss-cn-qingdao.aliyuncs.com/BabylonJS/Texture/Walls/04.jpg';
        break;
    }

    // 如果未找到对应的纹理URL，输出错误并返回undefined
    if (!textureUrl) {
      console.error(`TextureExtension --- error name: ${textureName} undefined`);
      return undefined;
    }

    // 创建新的纹理缓存项
    const newCacheItem: TextureCacheItem = {
      fileName: textureName.toUpperCase(),
      filePath: textureUrl,
      fileTexture: new Texture(textureUrl, this.Scene),
      fileU: 1,
      fileV: 1
    };

    // 根据纹理类型设置UV缩放
    const texture = newCacheItem.fileTexture;

    if (textureName === ProfileTypesEnum.Background) {
      // 背景纹理：根据地板尺寸和宽高比动态缩放
      texture.onLoadObservable.add((loadedTexture: Texture) => {
        const floorConfig: FloorConfig = require('./FloorConfig').default;
        const baseSize = loadedTexture.getBaseSize();
        loadedTexture.uScale = floorConfig.FloorItemSize;
        loadedTexture.vScale = floorConfig.FloorItemSize * baseSize.width / baseSize.height;
      });
    } else if (
      textureName === ProfileTypesEnum.BrickWallOut ||
      textureName === ProfileTypesEnum.BrickWallIn
    ) {
      // 砖墙纹理：使用0.5倍缩放
      texture.uScale = 0.5;
      texture.vScale = 0.5;
    } else {
      // 其他纹理：使用1:1缩放
      texture.uScale = 1;
      texture.vScale = 1;
    }

    newCacheItem.fileU = texture.uScale;
    newCacheItem.fileV = texture.vScale;

    // 加入缓存并返回
    this.CacheTextures.push(newCacheItem);
    return newCacheItem;
  }
}