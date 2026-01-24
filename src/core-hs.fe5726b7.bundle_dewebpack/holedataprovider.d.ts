import { IDataProvider } from './IDataProvider';
import { OpeningFaceType } from './OpeningFaceType';

/**
 * 提供洞口数据的数据提供器
 * 处理洞口实体的面几何数据转换和空间坐标变换
 */
export declare class HoleDataProvider extends IDataProvider {
    /**
     * 关联的洞口实体对象
     */
    private readonly entity: HSCore.Model.Hole | HSCore.Model.Door | HSCore.Model.Window | HSCore.Model.Niche;

    /**
     * 构造函数
     * @param entity - 洞口实体对象（Hole、Door、Window或Niche）
     */
    constructor(entity: HSCore.Model.Hole | HSCore.Model.Door | HSCore.Model.Window | HSCore.Model.Niche);

    /**
     * 获取指定面的路径坐标（世界坐标系）
     * @param face - 面对象
     * @returns 面的顶点坐标数组（世界坐标系）
     */
    getFacePath(face: HSCore.Model.Face): THREE.Vector3[];

    /**
     * 将局部坐标转换为世界坐标
     * @param vertices - 局部坐标顶点数组
     * @returns 世界坐标顶点数组
     */
    private _convertToWorldSpace(vertices: THREE.Vector3[]): THREE.Vector3[];

    /**
     * 获取顶面或底面的路径坐标
     * @param face - 面对象
     * @returns 面的顶点坐标数组
     */
    getTopOrBottomFacePath(face: HSCore.Model.Face): THREE.Vector3[];

    /**
     * 获取顶面几何数据
     * @param face - 面对象
     * @returns 顶面的顶点坐标数组，若不存在则返回undefined
     */
    getTopFaceGeometry(face: HSCore.Model.Face): THREE.Vector3[] | undefined;

    /**
     * 获取底面几何数据
     * @param face - 面对象
     * @returns 底面的顶点坐标数组，若不存在则返回undefined或空数组
     */
    getBottomFaceGeometry(face: HSCore.Model.Face): THREE.Vector3[] | undefined | [];

    /**
     * 获取侧面几何数据
     * @param face - 面对象
     * @returns 侧面的顶点坐标数组，若不存在则返回null或空数组
     */
    getSideFaceGeometry(face: HSCore.Model.Face): THREE.Vector3[] | null | [];

    /**
     * 判断楼板中的侧面是否被隐藏
     * @param slab - 楼板对象
     * @param vertices - 侧面顶点数组
     * @returns 如果侧面被隐藏返回true，否则返回false
     */
    private _isSideFaceHiddenInSlab(slab: HSCore.Model.Slab, vertices: THREE.Vector3[]): boolean;
}