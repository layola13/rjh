import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ParameterNames } from './ParameterNames';
import { CWTubeTreeEntity } from './CWTubeTreeEntity';
import { CWTubeEntity } from './CWTubeEntity';

/**
 * 回路实体类型枚举
 */
export enum CircuitType {
  /** 强电回路 */
  Strong = 'strong',
  /** 弱电回路 */
  Weak = 'weak'
}

/**
 * 断路器类型
 */
export type BreakerType = string;

/**
 * 管线类型
 */
export type TubeType = string;

/**
 * 线缆类型
 */
export type WireType = string;

/**
 * 节点类型
 */
export type NodesType = string;

/**
 * 管线数据接口
 */
interface ITubeData {
  /** 管线唯一标识 */
  id: string;
  [key: string]: unknown;
}

/**
 * 关系数据接口
 */
interface IRelation {
  /** 关联的管线列表 */
  tubes: ITubeData[];
  /** 节点类型 */
  nodesType: NodesType;
  /** 节点ID列表 */
  nodeIds: string[];
}

/**
 * 逻辑控制数据接口
 */
interface ILogic {
  /** 显示名称 */
  displayName: string;
  /** 逻辑类型 */
  logicType: string;
  /** 关系列表 */
  relations: IRelation[];
}

/**
 * 灯光控制配置接口
 */
interface ILightControl {
  /** 逻辑规则列表 */
  logics: ILogic[];
  /** 其他关系列表 */
  otherRelations: IRelation[];
}

/**
 * 回路路由数据接口
 */
interface IRouteData {
  /** 路由唯一标识 */
  id: string;
  [key: string]: unknown;
}

/**
 * 回路实体原始数据接口
 */
interface ICWCircuitData {
  /** 实体唯一标识 */
  id: string;
  /** 父级ID */
  parentId: string;
  /** 显示名称 */
  displayName: string;
  /** 类类型 */
  classType: string;
  /** 回路类型 */
  circuitType: string;
  /** 回路类型编号 */
  circuitTypeNumber: number;
  /** 断路器类型 */
  breakerType: BreakerType;
  /** 管线类型 */
  tubeType: TubeType;
  /** 线缆类型 */
  wireType: WireType;
  /** 房间范围 */
  roomRange: string[];
  /** 路由列表 */
  routes: IRouteData[];
  /** 灯光控制配置（可选） */
  lightControl?: ILightControl;
}

/**
 * 序列化后的关系数据
 */
interface ISerializedRelation {
  /** 管线ID列表 */
  tubes: string[];
  /** 节点类型 */
  nodesType: NodesType;
  /** 节点ID列表 */
  nodeIds: string[];
}

/**
 * 序列化后的逻辑数据
 */
interface ISerializedLogic {
  /** 显示名称 */
  displayName: string;
  /** 逻辑类型 */
  logicType: string;
  /** 关系列表 */
  relations: ISerializedRelation[];
}

/**
 * 序列化后的灯光控制数据
 */
interface ISerializedLightControl {
  /** 逻辑规则列表 */
  logics: ISerializedLogic[];
  /** 其他关系列表 */
  otherRelations: ISerializedRelation[];
}

/**
 * 回路实体类
 * 用于表示电气系统中的回路对象，包含路由、管线、灯光控制等信息
 * 
 * @extends AcceptEntity
 */
export class CWCircuitEntity extends AcceptEntity {
  /**
   * 构建子实体
   * 根据回路数据创建路由树实体和管线实体
   * 
   * @param data - 回路原始数据
   */
  protected buildChildren(data: ICWCircuitData): void {
    // 构建路由树实体
    data.routes.forEach((route: IRouteData) => {
      this.addChild(new CWTubeTreeEntity().accept(route));
    });

    // 如果存在灯光控制配置，构建管线实体
    if (data.lightControl) {
      // 处理逻辑规则中的管线
      data.lightControl.logics.forEach((logic: ILogic) => {
        logic.relations.forEach((relation: IRelation) => {
          relation.tubes.forEach((tube: ITubeData) => {
            this.addChild(new CWTubeEntity().accept(tube));
          });
        });
      });

      // 处理其他关系中的管线
      data.lightControl.otherRelations.forEach((relation: IRelation) => {
        relation.tubes.forEach((tube: ITubeData) => {
          this.addChild(new CWTubeEntity().accept(tube));
        });
      });
    }
  }

  /**
   * 构建实体数据
   * 设置实例数据和类型信息
   * 
   * @param data - 回路原始数据
   */
  protected buildEntityData(data: ICWCircuitData): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: data.classType
    });
  }

  /**
   * 获取实例数据
   * 将回路数据转换为InstanceData格式
   * 
   * @param data - 回路原始数据
   * @returns 实例数据对象
   */
  protected getInstanceData(data: ICWCircuitData): InstanceData {
    const instanceData = new InstanceData(data.id);

    // 添加基础参数
    instanceData.addParameter(
      new Parameter(ParameterNames.parentId, data.parentId, DataType.String),
      new Parameter('displayName', data.displayName, DataType.String),
      new Parameter('circuitType', data.circuitType, DataType.String),
      new Parameter('circuitTypeNumber', data.circuitTypeNumber, DataType.Number),
      new Parameter('breakerType', data.breakerType, DataType.String),
      new Parameter('tubeType', data.tubeType, DataType.String),
      new Parameter('wireType', data.wireType, DataType.String),
      new Parameter('roomRange', data.roomRange, DataType.StringArray),
      new Parameter(
        'routes',
        data.routes.map((route: IRouteData) => route.id),
        DataType.StringArray
      )
    );

    // 如果存在灯光控制配置，序列化并添加参数
    if (data.lightControl) {
      const serializedLightControl: ISerializedLightControl = {
        logics: data.lightControl.logics.map((logic: ILogic) => ({
          displayName: logic.displayName,
          logicType: logic.logicType,
          relations: logic.relations.map((relation: IRelation) => ({
            tubes: relation.tubes.map((tube: ITubeData) => tube.id),
            nodesType: relation.nodesType,
            nodeIds: relation.nodeIds
          }))
        })),
        otherRelations: data.lightControl.otherRelations.map((relation: IRelation) => ({
          tubes: relation.tubes.map((tube: ITubeData) => tube.id),
          nodesType: relation.nodesType,
          nodeIds: relation.nodeIds
        }))
      };

      instanceData.addParameter(
        new Parameter('lightControl', serializedLightControl, DataType.Object)
      );
    }

    return instanceData;
  }
}