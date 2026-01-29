/**
 * WallLoopInfo - 墙体环路信息
 * 管理墙体形成的闭合环路信息
 */

import { Wall } from '../Wall';
import { Vector3 } from 'three';

/**
 * 环路方向枚举
 */
export enum LoopDirection {
    /** 顺时针 */
    Clockwise = 'Clockwise',
    /** 逆时针 */
    CounterClockwise = 'CounterClockwise'
}

/**
 * 墙体环路信息类
 * 用于表示由多个墙体形成的闭合环路
 */
export class WallLoopInfo {
    /** 环路ID */
    public id: string;
    
    /** 环路中的墙体列表 */
    public walls: Wall[] = [];
    
    /** 环路中的点列表（有序） */
    public points: Vector3[] = [];
    
    /** 环路方向 */
    public direction: LoopDirection = LoopDirection.Clockwise;
    
    /** 是否闭合 */
    public closed: boolean = false;
    
    /** 环路面积 */
    public area: number = 0;
    
    /** 环路周长 */
    public perimeter: number = 0;
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param id 环路ID
     * @param walls 墙体列表
     */
    constructor(id: string, walls: Wall[] = []) {
        this.id = id;
        this.walls = [...walls];
        this.updateLoopInfo();
    }

    /**
     * 添加墙体到环路
     * @param wall 要添加的墙体
     */
    public addWall(wall: Wall): void {
        if (!this.walls.includes(wall)) {
            this.walls.push(wall);
            this.updateLoopInfo();
        }
    }

    /**
     * 从环路中移除墙体
     * @param wall 要移除的墙体
     */
    public removeWall(wall: Wall): void {
        const index = this.walls.indexOf(wall);
        if (index !== -1) {
            this.walls.splice(index, 1);
            this.updateLoopInfo();
        }
    }

    /**
     * 更新环路信息
     */
    public updateLoopInfo(): void {
        this.updatePoints();
        this.updateClosed();
        this.updateDirection();
        this.updateArea();
        this.updatePerimeter();
    }

    /**
     * 更新环路点列表
     * @private
     */
    private updatePoints(): void {
        this.points = [];
        
        if (this.walls.length === 0) {
            return;
        }

        // 尝试排序墙体形成连续路径
        const sortedWalls = this.sortWallsInOrder();
        
        for (const wall of sortedWalls) {
            const from = (wall as any).from as Vector3;
            this.points.push(from.clone());
        }

        // 如果闭合，最后一个点应该接近第一个点
        if (this.points.length > 0) {
            const lastWall = sortedWalls[sortedWalls.length - 1];
            const to = (lastWall as any).to as Vector3;
            const firstPoint = this.points[0];
            
            if (to.distanceTo(firstPoint) > 0.001) {
                this.points.push(to.clone());
            }
        }
    }

    /**
     * 排序墙体形成连续路径
     * @private
     */
    private sortWallsInOrder(): Wall[] {
        if (this.walls.length === 0) {
            return [];
        }

        const sorted: Wall[] = [this.walls[0]];
        const remaining = [...this.walls.slice(1)];

        while (remaining.length > 0) {
            const lastWall = sorted[sorted.length - 1];
            const lastTo = (lastWall as any).to as Vector3;

            let foundNext = false;
            for (let i = 0; i < remaining.length; i++) {
                const wall = remaining[i];
                const from = (wall as any).from as Vector3;
                const to = (wall as any).to as Vector3;

                if (lastTo.distanceTo(from) < 0.001) {
                    sorted.push(wall);
                    remaining.splice(i, 1);
                    foundNext = true;
                    break;
                } else if (lastTo.distanceTo(to) < 0.001) {
                    // 需要反转墙体方向
                    sorted.push(wall);
                    remaining.splice(i, 1);
                    foundNext = true;
                    break;
                }
            }

            if (!foundNext) {
                // 无法形成连续路径，添加剩余墙体
                sorted.push(...remaining);
                break;
            }
        }

        return sorted;
    }

    /**
     * 更新闭合状态
     * @private
     */
    private updateClosed(): void {
        if (this.points.length < 3) {
            this.closed = false;
            return;
        }

        const firstPoint = this.points[0];
        const lastPoint = this.points[this.points.length - 1];
        this.closed = firstPoint.distanceTo(lastPoint) < 0.001;
    }

    /**
     * 更新环路方向
     * @private
     */
    private updateDirection(): void {
        if (this.points.length < 3) {
            return;
        }

        // 使用有向面积判断方向
        let signedArea = 0;
        const n = this.points.length;

        for (let i = 0; i < n - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];
            signedArea += (p2.x - p1.x) * (p2.y + p1.y);
        }

        this.direction = signedArea > 0 ? LoopDirection.Clockwise : LoopDirection.CounterClockwise;
    }

    /**
     * 更新环路面积
     * @private
     */
    private updateArea(): void {
        if (this.points.length < 3 || !this.closed) {
            this.area = 0;
            return;
        }

        // 使用鞋带公式计算多边形面积
        let area = 0;
        const n = this.points.length;

        for (let i = 0; i < n - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];
            area += p1.x * p2.y - p2.x * p1.y;
        }

        this.area = Math.abs(area) / 2;
    }

    /**
     * 更新环路周长
     * @private
     */
    private updatePerimeter(): void {
        if (this.points.length < 2) {
            this.perimeter = 0;
            return;
        }

        let perimeter = 0;
        const n = this.points.length;

        for (let i = 0; i < n - 1; i++) {
            perimeter += this.points[i].distanceTo(this.points[i + 1]);
        }

        this.perimeter = perimeter;
    }

    /**
     * 判断点是否在环路内
     * @param point 点坐标
     * @param ignoreZ 是否忽略Z坐标
     * @returns 是否在环路内
     */
    public containsPoint(point: Vector3, ignoreZ: boolean = true): boolean {
        if (!this.closed || this.points.length < 3) {
            return false;
        }

        // 使用射线法判断点是否在多边形内
        let inside = false;
        const n = this.points.length - 1; // 排除最后一个重复点

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = this.points[i].x;
            const yi = this.points[i].y;
            const xj = this.points[j].x;
            const yj = this.points[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

            if (intersect) {
                inside = !inside;
            }
        }

        return inside;
    }

    /**
     * 获取环路中心点
     * @returns 中心点坐标
     */
    public getCenter(): Vector3 {
        if (this.points.length === 0) {
            return new Vector3(0, 0, 0);
        }

        const sum = this.points.reduce(
            (acc, p) => acc.add(p),
            new Vector3(0, 0, 0)
        );

        return sum.divideScalar(this.points.length);
    }

    /**
     * 反转环路方向
     */
    public reverse(): void {
        this.walls.reverse();
        this.points.reverse();
        this.direction = this.direction === LoopDirection.Clockwise 
            ? LoopDirection.CounterClockwise 
            : LoopDirection.Clockwise;
    }

    /**
     * 判断环路是否有效
     * @returns 是否有效
     */
    public isValid(): boolean {
        return this.walls.length >= 3 && this.closed;
    }

    /**
     * 获取墙体数量
     * @returns 墙体数量
     */
    public getWallCount(): number {
        return this.walls.length;
    }

    /**
     * 判断墙体是否在环路中
     * @param wall 墙体
     * @returns 是否在环路中
     */
    public hasWall(wall: Wall): boolean {
        return this.walls.includes(wall);
    }

    /**
     * 克隆环路信息
     * @returns 新的环路信息对象
     */
    public clone(): WallLoopInfo {
        const newLoop = new WallLoopInfo(this.id, this.walls);
        newLoop.direction = this.direction;
        newLoop.userData = { ...this.userData };
        return newLoop;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            id: this.id,
            wallIds: this.walls.map(w => w.id),
            points: this.points.map(p => ({ x: p.x, y: p.y, z: p.z })),
            direction: this.direction,
            closed: this.closed,
            area: this.area,
            perimeter: this.perimeter,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @param wallMap 墙体映射表
     * @returns 墙体环路信息对象
     */
    public static fromJSON(json: any, wallMap: Map<string, Wall>): WallLoopInfo {
        const walls = json.wallIds
            .map((id: string) => wallMap.get(id))
            .filter((w: Wall | undefined) => w !== undefined) as Wall[];
        
        const loop = new WallLoopInfo(json.id, walls);
        loop.direction = json.direction;
        loop.closed = json.closed;
        loop.area = json.area;
        loop.perimeter = json.perimeter;
        loop.userData = json.userData || {};
        return loop;
    }

    /**
     * 获取环路的边界框
     * @returns 边界框 {min, max}
     */
    public getBoundingBox(): { min: Vector3; max: Vector3 } {
        if (this.points.length === 0) {
            return {
                min: new Vector3(0, 0, 0),
                max: new Vector3(0, 0, 0)
            };
        }

        const min = new Vector3(
            Math.min(...this.points.map(p => p.x)),
            Math.min(...this.points.map(p => p.y)),
            Math.min(...this.points.map(p => p.z))
        );

        const max = new Vector3(
            Math.max(...this.points.map(p => p.x)),
            Math.max(...this.points.map(p => p.y)),
            Math.max(...this.points.map(p => p.z))
        );

        return { min, max };
    }
}