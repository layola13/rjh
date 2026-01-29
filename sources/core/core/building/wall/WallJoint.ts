/**
 * WallJoint - 墙体连接
 * 管理墙体之间的连接关系和连接处理
 */

import { Wall } from '../Wall';
import { Vector3 } from 'three';

/**
 * 连接类型枚举
 */
export enum WallJointType {
    /** T型连接 */
    T = 'T',
    /** L型连接 */
    L = 'L',
    /** 十字连接 */
    Cross = 'Cross',
    /** 直线连接 */
    Straight = 'Straight',
    /** 未知连接 */
    Unknown = 'Unknown'
}

/**
 * 墙体连接信息接口
 */
export interface WallJointInfo {
    /** 连接点 */
    point: Vector3;
    /** 连接的墙体列表 */
    walls: Wall[];
    /** 连接类型 */
    type: WallJointType;
    /** 连接角度 */
    angle?: number;
}

/**
 * 墙体连接类
 * 处理墙体在连接点的关系和几何处理
 */
export class WallJoint {
    /** 连接点 */
    public point: Vector3;
    
    /** 连接的墙体列表 */
    public walls: Wall[] = [];
    
    /** 连接类型 */
    public type: WallJointType = WallJointType.Unknown;
    
    /** 连接角度（弧度） */
    public angle: number = 0;

    /**
     * 构造函数
     * @param point 连接点
     * @param walls 连接的墙体列表
     */
    constructor(point: Vector3, walls: Wall[] = []) {
        this.point = point.clone();
        this.walls = [...walls];
        this.updateJointType();
    }

    /**
     * 添加墙体到连接
     * @param wall 要添加的墙体
     */
    public addWall(wall: Wall): void {
        if (!this.walls.includes(wall)) {
            this.walls.push(wall);
            this.updateJointType();
        }
    }

    /**
     * 从连接中移除墙体
     * @param wall 要移除的墙体
     */
    public removeWall(wall: Wall): void {
        const index = this.walls.indexOf(wall);
        if (index !== -1) {
            this.walls.splice(index, 1);
            this.updateJointType();
        }
    }

    /**
     * 更新连接类型
     */
    public updateJointType(): void {
        const wallCount = this.walls.length;

        if (wallCount === 0) {
            this.type = WallJointType.Unknown;
            return;
        }

        if (wallCount === 1) {
            this.type = WallJointType.Unknown;
            return;
        }

        if (wallCount === 2) {
            // 判断是否为直线连接或L型连接
            const angle = this.calculateAngleBetweenWalls(this.walls[0], this.walls[1]);
            this.angle = angle;

            if (Math.abs(angle) < 0.01 || Math.abs(angle - Math.PI) < 0.01) {
                this.type = WallJointType.Straight;
            } else {
                this.type = WallJointType.L;
            }
            return;
        }

        if (wallCount === 3) {
            this.type = WallJointType.T;
            return;
        }

        if (wallCount === 4) {
            this.type = WallJointType.Cross;
            return;
        }

        this.type = WallJointType.Unknown;
    }

    /**
     * 计算两墙体之间的角度
     * @param wall1 墙体1
     * @param wall2 墙体2
     * @returns 角度（弧度）
     */
    private calculateAngleBetweenWalls(wall1: Wall, wall2: Wall): number {
        const dir1 = this.getWallDirectionAtPoint(wall1, this.point);
        const dir2 = this.getWallDirectionAtPoint(wall2, this.point);

        if (!dir1 || !dir2) {
            return 0;
        }

        const dot = dir1.dot(dir2);
        const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
        return angle;
    }

    /**
     * 获取墙体在指定点的方向
     * @param wall 墙体
     * @param point 点
     * @returns 方向向量
     */
    private getWallDirectionAtPoint(wall: Wall, point: Vector3): Vector3 | null {
        const from = (wall as any).from as Vector3;
        const to = (wall as any).to as Vector3;

        const distToFrom = point.distanceTo(from);
        const distToTo = point.distanceTo(to);

        if (distToFrom < 0.001) {
            // 点在起点，方向为终点方向
            return new Vector3().subVectors(to, from).normalize();
        } else if (distToTo < 0.001) {
            // 点在终点，方向为起点方向
            return new Vector3().subVectors(from, to).normalize();
        }

        return null;
    }

    /**
     * 获取连接信息
     * @returns 连接信息对象
     */
    public getJointInfo(): WallJointInfo {
        return {
            point: this.point.clone(),
            walls: [...this.walls],
            type: this.type,
            angle: this.angle
        };
    }

    /**
     * 判断连接是否有效
     * @returns 是否有效
     */
    public isValid(): boolean {
        return this.walls.length >= 2;
    }

    /**
     * 获取墙体数量
     * @returns 墙体数量
     */
    public getWallCount(): number {
        return this.walls.length;
    }

    /**
     * 判断墙体是否在连接中
     * @param wall 墙体
     * @returns 是否在连接中
     */
    public hasWall(wall: Wall): boolean {
        return this.walls.includes(wall);
    }

    /**
     * 克隆连接
     * @returns 新的连接对象
     */
    public clone(): WallJoint {
        return new WallJoint(this.point, this.walls);
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            point: {
                x: this.point.x,
                y: this.point.y,
                z: this.point.z
            },
            wallIds: this.walls.map(w => w.id),
            type: this.type,
            angle: this.angle
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @param wallMap 墙体映射表
     * @returns 墙体连接对象
     */
    public static fromJSON(json: any, wallMap: Map<string, Wall>): WallJoint {
        const point = new Vector3(json.point.x, json.point.y, json.point.z);
        const walls = json.wallIds
            .map((id: string) => wallMap.get(id))
            .filter((w: Wall | undefined) => w !== undefined) as Wall[];
        
        const joint = new WallJoint(point, walls);
        joint.type = json.type;
        joint.angle = json.angle;
        return joint;
    }

    /**
     * 计算连接处的修剪几何
     * @returns 修剪几何数据
     */
    public calculateTrimGeometry(): any {
        // 根据连接类型计算修剪几何
        switch (this.type) {
            case WallJointType.L:
                return this.calculateLJointTrim();
            case WallJointType.T:
                return this.calculateTJointTrim();
            case WallJointType.Cross:
                return this.calculateCrossJointTrim();
            case WallJointType.Straight:
                return this.calculateStraightJointTrim();
            default:
                return null;
        }
    }

    /**
     * 计算L型连接的修剪
     * @private
     */
    private calculateLJointTrim(): any {
        if (this.walls.length !== 2) return null;

        const wall1 = this.walls[0];
        const wall2 = this.walls[1];

        return {
            type: 'L',
            walls: [wall1.id, wall2.id],
            angle: this.angle
        };
    }

    /**
     * 计算T型连接的修剪
     * @private
     */
    private calculateTJointTrim(): any {
        if (this.walls.length !== 3) return null;

        return {
            type: 'T',
            walls: this.walls.map(w => w.id),
            point: this.point
        };
    }

    /**
     * 计算十字连接的修剪
     * @private
     */
    private calculateCrossJointTrim(): any {
        if (this.walls.length !== 4) return null;

        return {
            type: 'Cross',
            walls: this.walls.map(w => w.id),
            point: this.point
        };
    }

    /**
     * 计算直线连接的修剪
     * @private
     */
    private calculateStraightJointTrim(): any {
        if (this.walls.length !== 2) return null;

        return {
            type: 'Straight',
            walls: this.walls.map(w => w.id),
            point: this.point
        };
    }
}