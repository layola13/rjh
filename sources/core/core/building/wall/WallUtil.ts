/**
 * WallUtil - 墙体工具类
 * 提供墙体操作、几何计算、关联管理等核心功能
 */

import { Wall } from '../Wall';
import { Vector3, Line3 } from 'three';

/**
 * 墙体工具类
 * 包含墙体的各种操作和计算方法
 */
export class WallUtil {
    /**
     * 沿路径插入墙体
     * @param layer 图层
     * @param path 路径
     * @param properties 墙体属性
     * @param options 选项
     * @returns 创建的墙体数组
     */
    public static insertWallsByPath(
        layer: any,
        path: any,
        properties: any,
        options?: any
    ): Wall[] {
        return this._executeWallOperation(layer, path, properties, options);
    }

    /**
     * 执行墙体操作（内部实现）
     * @private
     */
    private static _executeWallOperation(
        layer: any,
        path: any,
        properties: any,
        options?: any
    ): Wall[] {
        return [];
    }

    /**
     * 获取墙体几何信息
     * @param wall 墙体对象
     * @returns 几何信息对象
     */
    public static getGeometryInfo(wall: Wall): any {
        if (!wall) return undefined;

        const geometryManager = (global as any).HSCore?.Doc?.getDocManager()?.geometryManager;
        if (!geometryManager) return undefined;

        const geometryData = geometryManager.getGeometry(wall.id);
        if (!geometryData || !geometryData.geometry || !geometryData.indices) {
            return undefined;
        }

        return {
            getPoint: (index: number) => geometryData.geometry[geometryData.indices[index]],
            getRange: (startIndex: number, endIndex: number) => {
                const length = (geometryData.indices[endIndex] - geometryData.indices[startIndex] + 
                    geometryData.geometry.length) % geometryData.geometry.length + 1;
                return geometryData.geometry
                    .concat(geometryData.geometry)
                    .slice(geometryData.indices[startIndex], geometryData.indices[startIndex] + length);
            },
            left: function() {
                return [this.getPoint(0), this.getPoint(1)];
            },
            right: function() {
                return [this.getPoint(2), this.getPoint(3)];
            },
            front: function() {
                return this.getRange(3, 0);
            },
            back: function() {
                return this.getRange(1, 2);
            },
            top: () => geometryData.geometry.filter((pt: any) => !!pt)
        };
    }

    /**
     * 获取点关联的墙体
     * @param point 点对象
     * @returns 关联的墙体
     */
    public static getPointAssociateWall(point: any): Wall | undefined {
        const docManager = (global as any).HSCore?.Doc?.getDocManager();
        if (!docManager) return undefined;

        const entity = docManager.associationManager.getEntityByTarget(point);
        if (entity instanceof Wall) {
            return entity;
        }
        return undefined;
    }

    /**
     * 尝试分配墙体属性
     * @param oldWalls 旧墙体数组
     * @param newWalls 新墙体数组
     * @param priorityWalls 优先墙体数组
     */
    public static tryAssignWallProperties(
        oldWalls: Wall[],
        newWalls: Wall[],
        priorityWalls?: Wall[]
    ): void {
        if (!oldWalls || !newWalls || oldWalls.length === 0 || newWalls.length === 0) {
            return;
        }

        newWalls.forEach(newWall => {
            const matchWall = this._findBestMatchWall(newWall, oldWalls, priorityWalls);
            if (matchWall) {
                newWall.copyProperty(matchWall);
            }
        });
    }

    /**
     * 查找最佳匹配的墙体
     * @private
     */
    private static _findBestMatchWall(
        targetWall: Wall,
        candidateWalls: Wall[],
        priorityWalls?: Wall[]
    ): Wall | undefined {
        const matchingWalls: Wall[] = [];

        for (const wall of candidateWalls) {
            if (this.isSegmentsOverlapped(targetWall, wall)) {
                matchingWalls.push(wall);
            }
        }

        if (matchingWalls.length === 0) return undefined;

        // 优先返回priorityWalls中的墙体
        if (priorityWalls) {
            for (const wall of matchingWalls) {
                if (priorityWalls.includes(wall)) {
                    return wall;
                }
            }
        }

        // 返回长度最接近的墙体
        let bestMatch: Wall | undefined;
        let minDiff = Number.MAX_VALUE;

        for (const wall of matchingWalls) {
            const diff = Math.abs((wall as any).length - (targetWall as any).length);
            if (bestMatch === undefined || diff < minDiff) {
                minDiff = diff;
                bestMatch = wall;
            }
        }

        return bestMatch;
    }

    /**
     * 判断两个墙体线段是否重叠
     * @param wall1 墙体1
     * @param wall2 墙体2
     * @returns 是否重叠
     */
    public static isSegmentsOverlapped(wall1: Wall, wall2: Wall): boolean {
        const util = (global as any).HSCore?.Util?.Math;
        if (!util) return false;

        return util.isSegmentsOverlapped(
            (wall1 as any).from,
            (wall1 as any).to,
            (wall2 as any).from,
            (wall2 as any).to
        );
    }

    /**
     * 获取墙体所有点
     * @param walls 墙体数组
     * @returns 点数组
     */
    public static getWallsPoints(walls: Wall[]): any[] {
        return this.getAllWallsPoints(walls);
    }

    /**
     * 获取所有墙体的点
     * @param walls 墙体数组
     * @returns 点数组
     */
    public static getAllWallsPoints(walls: Wall[]): any[] {
        const points = new Set<any>();
        for (const wall of walls) {
            points.add((wall as any).from);
            points.add((wall as any).to);
        }
        return Array.from(points);
    }

    /**
     * 判断墙体是否连接
     * @param wall1 墙体1
     * @param wall2 墙体2
     * @returns 是否连接
     */
    public static isWallConnected(wall1: Wall, wall2: Wall): boolean {
        const from1 = (wall1 as any).from;
        const to1 = (wall1 as any).to;
        const from2 = (wall2 as any).from;
        const to2 = (wall2 as any).to;

        return [from1, to1].some(pt => pt === from2 || pt === to2);
    }

    /**
     * 移除墙体
     * @param wall 要移除的墙体
     */
    public static removeWall(wall: Wall): void {
        const parent = (wall as any).getUniqueParent();
        if (!parent) {
            console.assert(false, 'wall does not have unique parent');
            return;
        }
        parent.removeChild(wall);
    }

    /**
     * 清理重复的墙体
     * @param walls 墙体数组
     */
    public static cleanUpDuplicateWalls(walls: Wall[]): void {
        const toRemove = new Set<Wall>();
        const wallCount = walls.length;

        for (let i = 0; i < wallCount - 1; i++) {
            const wall1 = walls[i];
            for (let j = i + 1; j < wallCount; j++) {
                const wall2 = walls[j];
                const from1 = (wall1 as any).from;
                const to1 = (wall1 as any).to;
                const from2 = (wall2 as any).from;
                const to2 = (wall2 as any).to;

                if ((from1 === from2 && to1 === to2) || (from1 === to2 && to1 === from2)) {
                    toRemove.add(wall2);
                }
            }
        }

        toRemove.forEach(wall => {
            this.removeWall(wall);
        });
    }

    /**
     * 判断点是否在墙上
     * @param wall 墙体
     * @param point 点
     * @param adjustZ 是否调整Z坐标
     * @returns 是否在墙上
     */
    public static isPointOnWall(wall: Wall, point: any, adjustZ: boolean = true): boolean {
        const GeLib = (global as any).GeLib;
        if (!GeLib) return false;

        const pt = GeLib.VectorUtils.toTHREEVector3(point);
        if (adjustZ) {
            pt.z = (wall as any).from.z;
        }

        const curve = this.toTHREECurve(wall);
        return GeLib.CurveUtils.isPointOnCurve(pt, curve);
    }

    /**
     * 将墙体转换为THREE曲线
     * @param wall 墙体
     * @returns THREE曲线对象
     */
    public static toTHREECurve(wall: Wall): any {
        const GeLib = (global as any).GeLib;
        if (!GeLib) return null;

        if (this.isArcWall(wall)) {
            const wallData = wall as any;
            const center = wallData.curve.center;
            const from = GeLib.VectorUtils.toTHREEVector3(wallData.from);
            const to = GeLib.VectorUtils.toTHREEVector3(wallData.to);
            return GeLib.ArcUtils.createArcFromPoints(from, to, center, wallData.radius, wallData.clockwise);
        } else {
            const from = GeLib.VectorUtils.toTHREEVector3((wall as any).from);
            const to = GeLib.VectorUtils.toTHREEVector3((wall as any).to);
            return new Line3(from, to);
        }
    }

    /**
     * 判断是否为弧形墙
     * @param wall 墙体
     * @returns 是否为弧形墙
     */
    public static isArcWall(wall: Wall): boolean {
        return wall instanceof Wall && (wall as any).isArcWall && (wall as any).isArcWall();
    }

    /**
     * 复制墙体
     * @param walls 墙体数组
     * @returns 复制的墙体数组
     */
    public static copyWalls(walls: Wall[]): Wall[] {
        const wallMap: { [id: string]: Wall } = {};

        walls.forEach(wall => {
            const clonedWall = (wall as any).clone();
            wallMap[wall.id] = clonedWall;
        });

        return Object.values(wallMap);
    }
}