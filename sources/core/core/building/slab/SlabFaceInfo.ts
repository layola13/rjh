/**
 * SlabFaceInfo - 楼板面信息
 * 管理楼板的各个面的信息和属性
 */

import { Vector3 } from 'three';

/**
 * 楼板面类型枚举
 */
export enum SlabFaceType {
    /** 顶面 */
    Top = 'Top',
    /** 底面 */
    Bottom = 'Bottom',
    /** 侧面 */
    Side = 'Side',
    /** 开洞面 */
    Opening = 'Opening'
}

/**
 * 楼板面信息接口
 */
export interface ISlabFaceInfo {
    /** 面类型 */
    faceType: SlabFaceType;
    /** 面索引 */
    faceIndex: number;
    /** 面顶点 */
    vertices: Vector3[];
    /** 面法线 */
    normal: Vector3;
    /** 面积 */
    area: number;
    /** 材质ID */
    materialId?: string;
    /** 是否可见 */
    visible?: boolean;
}

/**
 * 楼板面信息类
 * 存储楼板单个面的详细信息
 */
export class SlabFaceInfo implements ISlabFaceInfo {
    /** 面类型 */
    public faceType: SlabFaceType;
    
    /** 面索引 */
    public faceIndex: number;
    
    /** 面顶点 */
    public vertices: Vector3[] = [];
    
    /** 面法线 */
    public normal: Vector3;
    
    /** 面积 */
    public area: number = 0;
    
    /** 材质ID */
    public materialId?: string;
    
    /** 是否可见 */
    public visible: boolean = true;
    
    /** UV坐标 */
    public uvs: Array<{ u: number; v: number }> = [];
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param faceType 面类型
     * @param faceIndex 面索引
     */
    constructor(faceType: SlabFaceType, faceIndex: number) {
        this.faceType = faceType;
        this.faceIndex = faceIndex;
        this.normal = new Vector3(0, 0, 1);
    }

    /**
     * 设置顶点
     * @param vertices 顶点数组
     */
    public setVertices(vertices: Vector3[]): void {
        this.vertices = vertices.map(v => v.clone());
        this.updateNormal();
        this.updateArea();
        this.generateUVs();
    }

    /**
     * 更新法线
     * @private
     */
    private updateNormal(): void {
        if (this.vertices.length < 3) {
            this.normal = new Vector3(0, 0, 1);
            return;
        }

        const v1 = new Vector3().subVectors(this.vertices[1], this.vertices[0]);
        const v2 = new Vector3().subVectors(this.vertices[2], this.vertices[0]);
        this.normal = new Vector3().crossVectors(v1, v2).normalize();
    }

    /**
     * 更新面积
     * @private
     */
    private updateArea(): void {
        if (this.vertices.length < 3) {
            this.area = 0;
            return;
        }

        // 使用三角形面积累加计算多边形面积
        let area = 0;
        const v0 = this.vertices[0];

        for (let i = 1; i < this.vertices.length - 1; i++) {
            const v1 = this.vertices[i];
            const v2 = this.vertices[i + 1];

            const edge1 = new Vector3().subVectors(v1, v0);
            const edge2 = new Vector3().subVectors(v2, v0);
            const cross = new Vector3().crossVectors(edge1, edge2);
            area += cross.length() / 2;
        }

        this.area = area;
    }

    /**
     * 生成UV坐标
     * @private
     */
    private generateUVs(): void {
        this.uvs = [];
        
        if (this.vertices.length === 0) return;

        // 获取包围盒
        const bbox = this.getBoundingBox();
        const width = bbox.max.x - bbox.min.x;
        const height = bbox.max.y - bbox.min.y;

        // 根据面类型选择UV映射方式
        for (const vertex of this.vertices) {
            let u: number, v: number;
            
            if (this.faceType === SlabFaceType.Top || this.faceType === SlabFaceType.Bottom) {
                // 顶面和底面使用XY平面映射
                u = width > 0 ? (vertex.x - bbox.min.x) / width : 0;
                v = height > 0 ? (vertex.y - bbox.min.y) / height : 0;
            } else {
                // 侧面使用其他映射
                u = width > 0 ? (vertex.x - bbox.min.x) / width : 0;
                v = (vertex.z - bbox.min.z) / (bbox.max.z - bbox.min.z || 1);
            }
            
            this.uvs.push({ u, v });
        }
    }

    /**
     * 获取面中心点
     * @returns 中心点坐标
     */
    public getCenter(): Vector3 {
        if (this.vertices.length === 0) {
            return new Vector3(0, 0, 0);
        }

        const sum = this.vertices.reduce(
            (acc, v) => acc.add(v),
            new Vector3(0, 0, 0)
        );

        return sum.divideScalar(this.vertices.length);
    }

    /**
     * 判断点是否在面上
     * @param point 点坐标
     * @param tolerance 容差
     * @returns 是否在面上
     */
    public containsPoint(point: Vector3, tolerance: number = 0.001): boolean {
        if (this.vertices.length < 3) {
            return false;
        }

        // 检查点到面的距离
        const center = this.getCenter();
        const toPoint = new Vector3().subVectors(point, center);
        const distance = Math.abs(toPoint.dot(this.normal));

        if (distance > tolerance) return false;

        // 简化实现：检查点是否在包围盒内
        const bbox = this.getBoundingBox();
        return point.x >= bbox.min.x - tolerance && point.x <= bbox.max.x + tolerance &&
               point.y >= bbox.min.y - tolerance && point.y <= bbox.max.y + tolerance &&
               point.z >= bbox.min.z - tolerance && point.z <= bbox.max.z + tolerance;
    }

    /**
     * 获取边界框
     * @returns 边界框 {min, max}
     */
    public getBoundingBox(): { min: Vector3; max: Vector3 } {
        if (this.vertices.length === 0) {
            return {
                min: new Vector3(0, 0, 0),
                max: new Vector3(0, 0, 0)
            };
        }

        const min = new Vector3(
            Math.min(...this.vertices.map(v => v.x)),
            Math.min(...this.vertices.map(v => v.y)),
            Math.min(...this.vertices.map(v => v.z))
        );

        const max = new Vector3(
            Math.max(...this.vertices.map(v => v.x)),
            Math.max(...this.vertices.map(v => v.y)),
            Math.max(...this.vertices.map(v => v.z))
        );

        return { min, max };
    }

    /**
     * 设置材质
     * @param materialId 材质ID
     */
    public setMaterial(materialId: string): void {
        this.materialId = materialId;
    }

    /**
     * 设置可见性
     * @param visible 是否可见
     */
    public setVisible(visible: boolean): void {
        this.visible = visible;
    }

    /**
     * 翻转法线
     */
    public flipNormal(): void {
        this.normal.negate();
        this.vertices.reverse();
        this.uvs.reverse();
    }

    /**
     * 克隆面信息
     * @returns 新的面信息对象
     */
    public clone(): SlabFaceInfo {
        const newFace = new SlabFaceInfo(this.faceType, this.faceIndex);
        newFace.vertices = this.vertices.map(v => v.clone());
        newFace.normal = this.normal.clone();
        newFace.area = this.area;
        newFace.materialId = this.materialId;
        newFace.visible = this.visible;
        newFace.uvs = this.uvs.map(uv => ({ ...uv }));
        newFace.userData = { ...this.userData };
        return newFace;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            faceType: this.faceType,
            faceIndex: this.faceIndex,
            vertices: this.vertices.map(v => ({ x: v.x, y: v.y, z: v.z })),
            normal: { x: this.normal.x, y: this.normal.y, z: this.normal.z },
            area: this.area,
            materialId: this.materialId,
            visible: this.visible,
            uvs: this.uvs,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 楼板面信息对象
     */
    public static fromJSON(json: any): SlabFaceInfo {
        const face = new SlabFaceInfo(json.faceType, json.faceIndex);
        face.vertices = json.vertices.map((v: any) => new Vector3(v.x, v.y, v.z));
        face.normal = new Vector3(json.normal.x, json.normal.y, json.normal.z);
        face.area = json.area;
        face.materialId = json.materialId;
        face.visible = json.visible !== undefined ? json.visible : true;
        face.uvs = json.uvs || [];
        face.userData = json.userData || {};
        return face;
    }
}

/**
 * 楼板面集合类
 * 管理楼板的所有面信息
 */
export class SlabFaceCollection {
    /** 面信息数组 */
    private faces: SlabFaceInfo[] = [];

    /**
     * 添加面信息
     * @param faceInfo 面信息
     */
    public addFace(faceInfo: SlabFaceInfo): void {
        this.faces.push(faceInfo);
    }

    /**
     * 获取面信息
     * @param index 面索引
     * @returns 面信息或undefined
     */
    public getFace(index: number): SlabFaceInfo | undefined {
        return this.faces[index];
    }

    /**
     * 根据类型获取面信息
     * @param faceType 面类型
     * @returns 面信息数组
     */
    public getFacesByType(faceType: SlabFaceType): SlabFaceInfo[] {
        return this.faces.filter(f => f.faceType === faceType);
    }

    /**
     * 移除面信息
     * @param index 面索引
     */
    public removeFace(index: number): void {
        this.faces.splice(index, 1);
    }

    /**
     * 获取所有面信息
     * @returns 面信息数组
     */
    public getAllFaces(): SlabFaceInfo[] {
        return [...this.faces];
    }

    /**
     * 获取可见面信息
     * @returns 可见面信息数组
     */
    public getVisibleFaces(): SlabFaceInfo[] {
        return this.faces.filter(f => f.visible);
    }

    /**
     * 获取面数量
     * @returns 面数量
     */
    public getFaceCount(): number {
        return this.faces.length;
    }

    /**
     * 清空所有面
     */
    public clear(): void {
        this.faces = [];
    }

    /**
     * 计算总面积
     * @returns 总面积
     */
    public getTotalArea(): number {
        return this.faces.reduce((sum, face) => sum + face.area, 0);
    }

    /**
     * 计算可见面积
     * @returns 可见面积
     */
    public getVisibleArea(): number {
        return this.faces
            .filter(f => f.visible)
            .reduce((sum, face) => sum + face.area, 0);
    }

    /**
     * 根据材质分组
     * @returns 材质分组映射表
     */
    public groupByMaterial(): Map<string, SlabFaceInfo[]> {
        const groups = new Map<string, SlabFaceInfo[]>();
        
        for (const face of this.faces) {
            const materialId = face.materialId || 'default';
            if (!groups.has(materialId)) {
                groups.set(materialId, []);
            }
            groups.get(materialId)!.push(face);
        }
        
        return groups;
    }

    /**
     * 克隆面集合
     * @returns 新的面集合对象
     */
    public clone(): SlabFaceCollection {
        const newCollection = new SlabFaceCollection();
        this.faces.forEach(face => {
            newCollection.addFace(face.clone());
        });
        return newCollection;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            faces: this.faces.map(f => f.toJSON())
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 楼板面集合对象
     */
    public static fromJSON(json: any): SlabFaceCollection {
        const collection = new SlabFaceCollection();
        if (json.faces) {
            json.faces.forEach((faceJson: any) => {
                collection.addFace(SlabFaceInfo.fromJSON(faceJson));
            });
        }
        return collection;
    }
}