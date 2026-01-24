/**
 * 遍历场景中的所有图层并对每个图层执行回调函数
 * 
 * 该函数从根图层开始，先向后遍历所有后续图层，
 * 然后从根图层的前一个图层开始向前遍历所有前置图层。
 * 
 * @module module_value
 * @originalId value
 */

/**
 * 图层节点接口，表示场景中的一个图层
 */
interface Layer {
  /** 链表中的下一个图层 */
  next: Layer | null;
  /** 链表中的前一个图层 */
  prev: Layer | null;
}

/**
 * 场景接口，包含根图层
 */
interface Scene {
  /** 场景的根图层 */
  rootLayer: Layer;
}

/**
 * 平面图接口
 */
interface Floorplan {
  /** 平面图的场景对象 */
  scene: Scene;
}

/**
 * 应用程序接口
 */
interface App {
  /** 平面图实例 */
  floorplan: Floorplan;
}

/**
 * HSApp全局对象接口
 */
interface HSApp {
  App: {
    /** 获取应用程序实例 */
    getApp(): App;
  };
}

/**
 * 全局声明
 */
declare global {
  const d: {
    HSApp: HSApp;
  };
}

/**
 * 图层回调函数类型
 * @param layer - 当前遍历到的图层
 */
type LayerCallback = (layer: Layer) => void;

/**
 * 遍历场景中所有图层的函数
 * 
 * 遍历顺序：
 * 1. 从rootLayer开始向后遍历（通过next链接）
 * 2. 从rootLayer.prev开始向前遍历（通过prev链接）
 * 
 * @param callback - 对每个图层执行的回调函数
 */
declare function traverseAllLayers(callback: LayerCallback): void;

export { traverseAllLayers, LayerCallback, Layer, Scene, Floorplan, App, HSApp };