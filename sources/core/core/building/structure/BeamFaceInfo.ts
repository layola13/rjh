/**
 * BeamFaceInfo - 梁面信息
 * 管理梁的各个面的信息和属性
 */

import { Vector3 } from 'three';

/**
 * 梁面类型枚举
 */
export enum BeamFaceType {
    /** 顶面 */
    Top = 'Top',
    /** 底面 */
    Bottom = 'Bottom',
    /** 左侧面 */
    Left = 'Left',
    /** 右侧面 */
    Right = 'Right',
    /** 前端面 */
    Front = 'Front',
    /** 后端面 */
    Back = 'Back'
}

/**
 * 梁面信息接口
 */
export interface IBeamFaceInfo {
    /** 面类型 */
    faceType: BeamFaceType;
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
}

/**
 * 梁面信息类
 * 存储梁的单个面的详细信息
 */
export class BeamFaceInfo implements IBeamFaceInfo {
    /** 面类型 */
    public faceType: BeamFaceType;
    
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
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param faceType 面类型
     * @param faceIndex 面索引
     */
    constructor(faceType: BeamFaceType, faceIndex: number) {
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

        // 简化实现：检查点到面的距离
        const center = this.getCenter();
        const toPoint = new Vector3().subVectors(point, center);
        const distance = Math.abs(toPoint.dot(this.normal));

        return distance < tolerance;
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
     * 克隆面信息
     * @returns 新的面信息对象
     */
    public clone(): BeamFaceInfo {
        const newFace = new BeamFaceInfo(this.faceType, this.faceIndex);
        newFace.vertices = this.vertices.map(v => v.clone());
        newFace.normal = this.normal.clone();
        newFace.area = this.area;
        newFace.materialId = this.materialId;
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
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 梁面信息对象
     */
    public static fromJSON(json: any): BeamFaceInfo {
        const face = new BeamFaceInfo(json.faceType, json.faceIndex);
        face.vertices = json.vertices.map((v: any) => new Vector3(v.x, v.y, v.z));
        face.normal = new Vector3(json.normal.x, json.normal.y, json.normal.z);
        face.area = json.area;
        face.materialId = json.materialId;
        face.userData = json.userData || {};
        return face;
    }
}

/**
 * 梁面集合类
 * 管理梁的所有面信息
 */
export class BeamFaceCollection {
    /** 面信息映射表 */
    private faces: Map<BeamFaceType, BeamFaceInfo> = new Map();

    /**
     * 添加面信息
     * @param faceInfo 面信息
     */
    public addFace(faceInfo: BeamFaceInfo): void {
        this.faces.set(faceInfo.faceType, faceInfo);
    }

    /**
     * 获取面信息
     * @param faceType 面类型
     * @returns 面信息或undefined
     */
    public getFace(faceType: BeamFaceType): BeamFaceInfo | undefined {
        return this.faces.get(faceType);
    }

    /**
     * 移除面信息
     * @param faceType 面类型
     */
    public removeFace(faceType: BeamFaceType): void {
        this.faces.delete(faceType);
    }

    /**
     * 获取所有面信息
     * @returns 面信息数组
     */
    public getAllFaces(): BeamFaceInfo[] {
        return Array.from(this.faces.values());
    }

    /**
     * 获取面数量
     * @returns 面数量
     */
    public getFaceCount(): number {
        return this.faces.size;
    }

    /**
     * 清空所有面
     */
    public clear(): void {
        this.faces.clear();
    }

    /**
     * 判断是否包含指定面
     * @param faceType 面类型
     * @returns 是否包含
     */
    public hasFace(faceType: BeamFaceType): boolean {
        return this.faces.has(faceType);
    }

    /**
     * 计算总面积
     * @returns 总面积
     */
    public getTotalArea(): number {
        return Array.from(this.faces.values()).reduce(
            (sum, face) => sum + face.area,
            0
        );
    }

    /**
     * 克隆面集合
     * @returns 新的面集合对象
     */
    public clone(): BeamFaceCollection {
        const newCollection = new BeamFaceCollection();
        this.faces.forEach((face, type) => {
            newCollection.addFace(face.clone());
        });
        return newCollection;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        const facesArray: any[] = [];
        this.faces.forEach(face => {
            facesArray.push(face.toJSON());
        });
        return { faces: facesArray };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 梁面集合对象
     */
    public static fromJSON(json: any): BeamFaceCollection {
        const collection = new BeamFaceCollection();
        if (json.faces) {
            json.faces.forEach((faceJson: any) => {
                collection.addFace(BeamFaceInfo.fromJSON(faceJson));
            });
        }
        return collection;
    }
}