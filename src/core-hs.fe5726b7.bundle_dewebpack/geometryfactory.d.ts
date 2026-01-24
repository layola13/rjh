/**
 * 几何体工厂模块
 * 负责根据模型类型创建对应的视图模型实例
 */

import { Layer } from './Layer';
import { Scene } from './Scene';
import { Hole } from './Hole';
import { WallMolding } from './WallMolding';
import { Pocket } from './Pocket';
import { CornerWindow } from './CornerWindow';
import { Window } from './Window';
import { Content } from './Content';
import { CustomizedModel } from './CustomizedModel';
import { CustomizedPMModel } from './CustomizedPMModel';
import { PMolding } from './PMolding';
import { PSegmentLoft } from './PSegmentLoft';
import { PExtruding } from './PExtruding';
import { PBox } from './PBox';
import { PContent } from './PContent';
import { PAssembly } from './PAssembly';
import { SoftCloth } from './SoftCloth';
import { DContent } from './DContent';
import { DExtruding } from './DExtruding';
import { DHole } from './DHole';
import { GussetGroup } from './GussetGroup';
import { TgFaceGeometry } from './TgFaceGeometry';
import { DSweep } from './DSweep';
import { DWindow } from './DWindow';
import { WindowSill } from './WindowSill';
import { NCustomizedFeatureModel } from './NCustomizedFeatureModel';
import { ParametricOpening } from './ParametricOpening';
import { ConcealedWork } from './ConcealedWork';
import { ConcealedWorkTubeTree } from './ConcealedWorkTubeTree';
import { ConcealedWorkTube } from './ConcealedWorkTube';
import { JunctionBox } from './JunctionBox';
import { NCPContent } from './NCPContent';
import { MeshContent } from './MeshContent';

/**
 * 模型数据接口
 * 描述传入createViewModel的模型数据结构
 */
export interface IModelData {
  /** 模型类型标识 */
  Class: string;
  /** 其他模型属性 */
  [key: string]: unknown;
}

/**
 * 视图模型基类型
 * 所有具体视图模型的联合类型
 */
export type ViewModel =
  | Layer
  | Scene
  | Hole
  | WallMolding
  | Pocket
  | CornerWindow
  | Window
  | Content
  | CustomizedModel
  | CustomizedPMModel
  | PMolding
  | PSegmentLoft
  | PExtruding
  | PBox
  | PContent
  | PAssembly
  | SoftCloth
  | DContent
  | DExtruding
  | DHole
  | GussetGroup
  | TgFaceGeometry
  | DSweep
  | DWindow
  | WindowSill
  | NCustomizedFeatureModel
  | ParametricOpening
  | ConcealedWork
  | ConcealedWorkTubeTree
  | ConcealedWorkTube
  | JunctionBox
  | NCPContent
  | MeshContent;

/**
 * 几何体工厂类
 * 根据模型类型创建对应的视图模型实例
 */
export declare class GeometryFactory {
  /**
   * 创建视图模型
   * @param modelData - 模型数据对象，包含Class字段标识模型类型
   * @param contextParam1 - 上下文参数1（具体类型取决于业务逻辑）
   * @param contextParam2 - 上下文参数2（具体类型取决于业务逻辑）
   * @returns 对应类型的视图模型实例，如果类型不匹配则返回null
   * 
   * @example
   *