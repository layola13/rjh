/**
 * WindowHole - 窗洞
 * 管理墙体上的窗洞口开孔
 */

import { Vector3, Vector2 } from 'three';
import { Wall } from '../Wall';

/**
 * 窗洞类型枚举
 */
export enum WindowHoleType {
    /** 标准窗洞 */
    Standard = 'Standard',
    /** 带窗台的窗洞 */
    WithSill = 'WithSill',
    /** 带过梁的窗洞 */
    WithLintel = 'WithLintel',
    /** 完整窗洞（带窗台和过梁） */
    Complete = 'Complete',
    /** 落地窗洞 */
    FloorToTop = 'FloorToTop'
}

/**
 * 窗洞接口
 */
export interface IWindowHole {
    /** 窗洞ID */
    id: string;
    /** 窗洞类型 */
    type: WindowHoleType;
    /** 所在墙体 */
    wall: Wall;
    /** 窗洞宽度 */
    width: number;
    /** 窗洞高度 */
    height: number;
    /** 窗洞底部高度（从地面） */
    sillHeight: number;
    /** 窗洞在墙上的位置 */
    position: number;
}

/**
 * 窗洞类
 * 表示墙体上的窗户开孔
 */
export class WindowHole implements IWindowHole {
    /** 窗洞ID */
    public id: string;
    
    /** 窗洞类型 */
    public type: WindowHoleType;
    
    /** 所在墙体 */
    public wall: Wall;
    
    /** 窗洞宽度 */
    public width: number;
    
    /** 窗洞高度 */
    public height: number;
    
    /** 窗洞底部高度（从地面） */
    public sillHeight: number;
    
    /** 窗洞在墙上的位置（从墙起点的距离） */
    public position: number;
    
    /** 窗洞轮廓（2D） */
    public contour: Vector2[] = [];
    
    /** 窗洞轮廓（3D） */
    public contour3D: Vector3[] = [];
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param id 窗洞ID
     * @param wall 所在墙体
     * @param width 宽度
     * @param height 高度
     * @param sillHeight 窗台高度
     * @param position 位置
     */
    constructor(
        id: string,
        wall: Wall,
        width: number,
        height: number,
        sillHeight: number = 900,
        position: number = 0
    ) {
        this.id = id;
        this.wall = wall;
        this.width = width;
        this.height = height;
        this.sillHeight = sillHeight;
        this.position = position;
        this.type = WindowHoleType.Standard;
        this.updateContour();
    }

    /**
     * 更新窗洞轮廓
     */
    public updateContour(): void {
        // 生成2D轮廓（在墙体局部坐标系中）
        this.contour = [
            new Vector2(this.position, this.sillHeight),
            new Vector2(this.position + this.width, this.sillHeight),
            new Vector2(this.position + this.width, this.sillHeight + this.height),
            new Vector2(this.position, this.sillHeight + this.height)
        ];

        // 转换为3D轮廓（在世界坐标系中）
        this.update3DContour();
    }

    /**
     * 更新3D轮廓
     * @private
     */
    private update3DContour(): void {
        const wallStart = (this.wall as any).from as Vector3;
        const wallEnd = (this.wall as any).to as Vector3;
        const wallDir = new Vector3().subVectors(wallEnd, wallStart).normalize();
        const wallNormal = new Vector3(-wallDir.y, wallDir.x, 0);

        this.contour3D = this.contour.map(p => {
            const pointOnWall = new Vector3()
                .copy(wallStart)
                .addScaledVector(wallDir, p.x);
            pointOnWall.z = p.y;
            return pointOnWall;
        });
    }

    /**
     * 设置窗洞尺寸
     * @param width 宽度
     * @param height 高度
     */
    public setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.updateContour();
    }

    /**
     * 设置窗台高度
     * @param sillHeight 窗台高度
     */
    public setSillHeight(sillHeight: number): void {
        this.sillHeight = sillHeight;
        this.updateContour();
    }

    /**
     * 设置位置
     * @param position 位置
     */
    public setPosition(position: number): void {
        this.position = position;
        this.updateContour();
    }

    /**
     * 获取窗洞面积
     * @returns 面积
     */
    public getArea(): number {
        return this.width * this.height;
    }

    /**
     * 获取窗洞周长
     * @returns 周长
     */
    public getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    /**
     * 获取窗洞中心点（3D）
     * @returns 中心点坐标
     */
    public getCenter(): Vector3 {
        if (this.contour3D.length === 0) {
            return new Vector3(0, 0, 0);
        }

        const sum = this.contour3D.reduce(
            (acc, p) => acc.add(p),
            new Vector3(0, 0, 0)
        );

        return sum.divideScalar(this.contour3D.length);
    }

    /**
     * 判断点是否在窗洞内
     * @param point 点坐标（墙体局部坐标）
     * @returns 是否在窗洞内
     */
    public containsPoint(point: Vector2): boolean {
        return point.x >= this.position &&
               point.x <= this.position + this.width &&
               point.y >= this.sillHeight &&
               point.y <= this.sillHeight + this.height;
    }

    /**
     * 判断窗洞是否与另一个窗洞相交
     * @param other 另一个窗洞
     * @returns 是否相交
     */
    public intersects(other: WindowHole): boolean {
        // 检查是否在同一墙体上
        if (this.wall !== other.wall) {
            return false;
        }

        // 检查水平方向是否重叠
        const horizontalOverlap = !(
            this.position + this.width < other.position ||
            this.position > other.position + other.width
        );

        // 检查垂直方向是否重叠
        const verticalOverlap = !(
            this.sillHeight + this.height < other.sillHeight ||
            this.sillHeight > other.sillHeight + other.height
        );

        return horizontalOverlap && verticalOverlap;
    }

    /**
     * 获取边界框
     * @returns 边界框 {min, max}
     */
    public getBoundingBox(): { min: Vector3; max: Vector3 } {
        if (this.contour3D.length === 0) {
            return {
                min: new Vector3(0, 0, 0),
                max: new Vector3(0, 0, 0)
            };
        }

        const min = new Vector3(
            Math.min(...this.contour3D.map(p => p.x)),
            Math.min(...this.contour3D.map(p => p.y)),
            Math.min(...this.contour3D.map(p => p.z))
        );

        const max = new Vector3(
            Math.max(...this.contour3D.map(p => p.x)),
            Math.max(...this.contour3D.map(p => p.y)),
            Math.max(...this.contour3D.map(p => p.z))
        );

        return { min, max };
    }

    /**
     * 验证窗洞是否有效
     * @returns 是否有效
     */
    public isValid(): boolean {
        if (this.width <= 0 || this.height <= 0) {
            return false;
        }

        if (this.sillHeight < 0) {
            return false;
        }

        if (this.position < 0) {
            return false;
        }

        // 检查窗洞是否超出墙体范围
        const wallLength = (this.wall as any).length || 0;
        if (this.position + this.width > wallLength) {
            return false;
        }

        return true;
    }

    /**
     * 克隆窗洞
     * @returns 新的窗洞对象
     */
    public clone(): WindowHole {
        const newHole = new WindowHole(
            this.id,
            this.wall,
            this.width,
            this.height,
            this.sillHeight,
            this.position
        );
        newHole.type = this.type;
        newHole.userData = { ...this.userData };
        return newHole;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            id: this.id,
            type: this.type,
            wallId: this.wall.id,
            width: this.width,
            height: this.height,
            sillHeight: this.sillHeight,
            position: this.position,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @param wallMap 墙体映射表
     * @returns 窗洞对象
     */
    public static fromJSON(json: any, wallMap: Map<string, Wall>): WindowHole | null {
        const wall = wallMap.get(json.wallId);
        if (!wall) {
            return null;
        }

        const hole = new WindowHole(
            json.id,
            wall,
            json.width,
            json.height,
            json.sillHeight,
            json.position
        );
        hole.type = json.type;
        hole.userData = json.userData || {};
        return hole;
    }

    /**
     * 计算窗洞对墙体的削弱率
     * @returns 削弱率（0-1）
     */
    public getWeakeningRatio(): number {
        const wallHeight = (this.wall as any).height || 2800;
        const wallLength = (this.wall as any).length || 1000;
        const wallArea = wallHeight * wallLength;
        
        if (wallArea === 0) {
            return 0;
        }

        return this.getArea() / wallArea;
    }

    /**
     * 判断是否为落地窗
     * @returns 是否为落地窗
     */
    public isFloorToTopWindow(): boolean {
        return this.type === WindowHoleType.FloorToTop || this.sillHeight < 100;
    }

    /**
     * 获取窗洞顶部高度
     * @returns 顶部高度
     */
    public getTopHeight(): number {
        return this.sillHeight + this.height;
    }

    /**
     * 获取窗洞底部高度
     * @returns 底部高度
     */
    public getBottomHeight(): number {
        return this.sillHeight;
    }
}

/**
 * 窗洞管理器
 * 管理墙体上的所有窗洞
 */
export class WindowHoleManager {
    /** 窗洞映射表 */
    private holes: Map<string, WindowHole> = new Map();

    /**
     * 添加窗洞
     * @param hole 窗洞对象
     */
    public addHole(hole: WindowHole): void {
        this.holes.set(hole.id, hole);
    }

    /**
     * 移除窗洞
     * @param holeId 窗洞ID
     */
    public removeHole(holeId: string): void {
        this.holes.delete(holeId);
    }

    /**
     * 获取窗洞
     * @param holeId 窗洞ID
     * @returns 窗洞对象或undefined
     */
    public getHole(holeId: string): WindowHole | undefined {
        return this.holes.get(holeId);
    }

    /**
     * 获取所有窗洞
     * @returns 窗洞数组
     */
    public getAllHoles(): WindowHole[] {
        return Array.from(this.holes.values());
    }

    /**
     * 获取指定墙体上的窗洞
     * @param wall 墙体对象
     * @returns 窗洞数组
     */
    public getHolesByWall(wall: Wall): WindowHole[] {
        return this.getAllHoles().filter(hole => hole.wall === wall);
    }

    /**
     * 检查窗洞冲突
     * @returns 冲突的窗洞对数组
     */
    public checkConflicts(): [WindowHole, WindowHole][] {
        const conflicts: [WindowHole, WindowHole][] = [];
        const holes = this.getAllHoles();

        for (let i = 0; i < holes.length - 1; i++) {
            for (let j = i + 1; j < holes.length; j++) {
                if (holes[i].intersects(holes[j])) {
                    conflicts.push([holes[i], holes[j]]);
                }
            }
        }

        return conflicts;
    }

    /**
     * 清空所有窗洞
     */
    public clear(): void {
        this.holes.clear();
    }

    /**
     * 获取窗洞数量
     * @returns 窗洞数量
     */
    public getCount(): number {
        return this.holes.size;
    }
}