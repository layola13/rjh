import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { Utils } from './Utils';
import { BedRoomList, LivingRoomList, BathRoomList } from './RoomConstants';

/**
 * 设计实体数据接口
 */
interface DesignEntityDataParams {
  /** 设计元数据 */
  designMetadata: DesignMetadata;
  /** 户型平面图 */
  floorplan: Floorplan;
}

/**
 * 设计元数据接口
 */
interface DesignMetadata {
  /**
   * 获取元数据属性值
   * @param key - 属性键名
   */
  get(key: string): any;
  get(key: 'designId'): string;
  get(key: 'designName'): string;
  get(key: 'designVersion'): string;
  get(key: 'basicAttributes'): BasicAttributes | undefined;
}

/**
 * 基础属性接口
 */
interface BasicAttributes {
  /** 样式信息 */
  style?: {
    /** 样式名称 */
    name?: string;
  };
}

/**
 * 户型平面图接口
 */
interface Floorplan {
  /**
   * 遍历所有房间
   * @param callback - 房间遍历回调函数
   */
  forEachRoom(callback: (room: Room) => void): void;
}

/**
 * 房间接口
 */
interface Room {
  /** 房间类型 */
  roomType: string;
  /** 房间信息列表 */
  roomInfos: RoomInfo[];
}

/**
 * 房间信息接口（占位，具体结构根据实际业务定义）
 */
interface RoomInfo {
  [key: string]: unknown;
}

/**
 * 设计统计信息接口
 */
interface DesignStatistics {
  /** 设计ID */
  designId: string;
  /** 设计名称 */
  designName: string;
  /** 版本ID */
  versionId: string;
  /** 设计风格 */
  designStyle: string | undefined;
  /** 设计面积（可用面积） */
  designArea: number;
  /** 建筑面积 */
  grossFloorArea: number;
  /** 套内面积 */
  innerArea: number;
  /** 卧室数量 */
  bedroom: number;
  /** 客厅数量 */
  livingroom: number;
  /** 卫生间数量 */
  bathroom: number;
}

/**
 * HSApp全局工具类接口声明
 */
declare namespace HSApp {
  namespace Util {
    namespace Floorplan {
      /**
       * 获取户型建筑面积
       * @param floorplan - 户型平面图
       */
      function getFloorplanGrossFloorArea(floorplan: Floorplan): number;
      
      /**
       * 获取户型套内面积
       * @param floorplan - 户型平面图
       */
      function getFloorplanGrossInternalArea(floorplan: Floorplan): number;
      
      /**
       * 获取户型可用面积
       * @param floorplan - 户型平面图
       */
      function getFloorplanUsableArea(floorplan: Floorplan): number;
    }
  }
}

/**
 * 设计实体类
 * 用于构建和管理设计数据实体，继承自AcceptEntity
 */
export class DesignEntity extends AcceptEntity {
  /**
   * 构建子实体（空实现，由子类覆盖）
   */
  protected buildChildren(): void {
    // 空实现
  }

  /**
   * 构建设计实体数据
   * 从设计元数据和户型平面图中提取关键信息，生成实例数据
   * @param params - 包含设计元数据和户型平面图的参数对象
   */
  protected buildEntityData(params: DesignEntityDataParams): void {
    const { designMetadata, floorplan } = params;

    // 创建设计类型的实例数据
    const instanceData = new InstanceData('Design');

    // 计算户型面积数据
    const grossFloorArea = HSApp.Util.Floorplan.getFloorplanGrossFloorArea(floorplan);
    const grossInternalArea = HSApp.Util.Floorplan.getFloorplanGrossInternalArea(floorplan);
    const usableArea = HSApp.Util.Floorplan.getFloorplanUsableArea(floorplan);

    // 获取基础属性
    const basicAttributes = designMetadata.get('basicAttributes');
    const designStyle = basicAttributes?.style?.name;

    // 构建设计统计信息
    const statistics: DesignStatistics = {
      designId: designMetadata.get('designId'),
      designName: designMetadata.get('designName'),
      versionId: designMetadata.get('designVersion'),
      designStyle,
      designArea: Utils.formatNumberPoints(usableArea),
      grossFloorArea: Utils.formatNumberPoints(grossFloorArea),
      innerArea: Utils.formatNumberPoints(grossInternalArea),
      bedroom: 0,
      livingroom: 0,
      bathroom: 0,
    };

    // 统计各类房间数量
    floorplan.forEachRoom((room: Room) => {
      if (room.roomInfos.length > 0) {
        if (BedRoomList.includes(room.roomType)) {
          statistics.bedroom++;
        } else if (LivingRoomList.includes(room.roomType)) {
          statistics.livingroom++;
        } else if (BathRoomList.includes(room.roomType)) {
          statistics.bathroom++;
        }
      }
    });

    // 添加参数到实例数据
    instanceData.addParameter(
      new Parameter('designId', statistics.designId, DataType.String),
      new Parameter('designName', statistics.designName, DataType.String),
      new Parameter('versionId', statistics.versionId, DataType.String),
      new Parameter('designArea', statistics.designArea, DataType.Number),
      new Parameter('grossFloorArea', statistics.grossFloorArea, DataType.Number),
      new Parameter('innerArea', statistics.innerArea, DataType.Number),
      new Parameter('bedroom', statistics.bedroom, DataType.Int),
      new Parameter('livingroom', statistics.livingroom, DataType.Int),
      new Parameter('bathroom', statistics.bathroom, DataType.Int),
      new Parameter('designStyle', statistics.designStyle, DataType.String)
    );

    // 设置实例数据和类型
    this.setInstanceData(instanceData);
    this.setType({ classType: 'Design' });
  }
}