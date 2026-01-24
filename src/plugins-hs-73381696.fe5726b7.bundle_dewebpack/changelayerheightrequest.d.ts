import { HSCore } from '../core';
import { HSApp } from '../app';
import { HSFPConstants } from '../constants';

/**
 * 修改图层高度请求
 * 用于处理图层整体高度变更，包括关联的模型、梁和结构的位置调整
 */
export class ChangeLayerHeightRequest extends HSApp.Request.LayerStructureEditRequest {
    /** 目标图层 */
    private readonly _layer: HSCore.Layer;
    
    /** 修改前的图层高度 */
    private readonly _oldHeight: number;
    
    /** 修改后的图层高度 */
    private readonly _height: number;

    /**
     * 创建修改图层高度请求
     * @param layer - 要修改高度的图层对象
     * @param height - 新的图层高度值
     */
    constructor(layer: HSCore.Layer, height: number) {
        super(layer);
        this._layer = layer;
        this._oldHeight = this._layer.height;
        this._height = height;
    }

    /**
     * 执行高度修改请求
     * 依次更新图层高度、自定义模型高度、梁位置和结构位置
     */
    doRequest(): void {
        this._layer.height = this._height;
        this.changeCustomizedModelHeight();
        this.changeNCustomizedBeamPosition();
        this.changeNCustomizedStructurePosition();
        super.doRequest([]);
    }

    /**
     * 调整自定义模型的高度位置
     * 遍历图层内容，更新自定义特征模型、自定义吊顶模型及吊顶关联模型的Z坐标
     */
    private changeCustomizedModelHeight(): void {
        const heightDelta = this._height - this._oldHeight;
        
        this._layer.forEachContent((content: HSCore.Model.BaseModel) => {
            const isCustomizedModel = 
                content instanceof HSCore.Model.CustomizedFeatureModel ||
                content instanceof HSCore.Model.NCustomizedCeilingModel ||
                content.getHost() instanceof HSCore.Model.Ceiling;
            
            if (isCustomizedModel) {
                content.z += heightDelta;
            }
        });
    }

    /**
     * 调整未自定义梁的位置
     * 更新图层中所有梁的Z坐标并重建几何体
     */
    private changeNCustomizedBeamPosition(): void {
        const heightDelta = this._height - this._oldHeight;
        
        this._layer.forEachBeam((beam: HSCore.Structure.Beam) => {
            beam.z += heightDelta;
            beam.rebuild();
        });
    }

    /**
     * 调整未自定义结构的位置
     * 同步墙体部件的图层高度并重建（仅处理Z缩放为1的墙体部件）
     */
    private changeNCustomizedStructurePosition(): void {
        this._layer.forEachStructure((structure: HSCore.Structure.BaseStructure) => {
            if (structure.isWallPart() && structure.ZScale === 1) {
                structure.syncLayerHeight();
                structure.rebuild();
            }
        });
    }

    /**
     * 获取几何体发生变化的面集合
     * @returns 受影响的面对象数组，包含自定义吊顶模型的宿主面
     */
    getGeometryChangedFaces(): HSCore.Model.Face[] {
        const changedFaces = super.getGeometryChangedFaces([]);
        
        this._layer.forEachContent((content: HSCore.Model.BaseModel) => {
            if (content instanceof HSCore.Model.CustomizedCeilingModel) {
                changedFaces.push(content.getHost());
            }
        });
        
        return changedFaces;
    }

    /**
     * 获取操作描述
     * @returns 操作的中文描述
     */
    getDescription(): string {
        return "修改全局墙高";
    }

    /**
     * 获取操作分类
     * @returns 日志分组类型：墙体操作
     */
    getCategory(): HSFPConstants.LogGroupTypes {
        return HSFPConstants.LogGroupTypes.WallOperation;
    }
}