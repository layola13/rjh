/**
 * ClosestPoint 算法单元测试
 */

import { describe, it, expect } from 'vitest';
import { ClosestPoint } from '../../../source/core/algorithms/ClosestPoint';
import { Point2D, IPoint2D } from '../../../source/core/geometry/Point2D';
import { LineSegment2D } from '../../../source/core/geometry/LineSegment2D';
import { Circle2D } from '../../../source/core/geometry/Circle2D';
import { Rectangle2D } from '../../../source/core/geometry/Rectangle2D';

describe('ClosestPoint', () => {
    describe('findNearest', () => {
        it('应该找到最近的点', () => {
            const target: IPoint2D = { x: 0, y: 0 };
            const points: IPoint2D[] = [
                { x: 1, y: 1 },
                { x: 0.5, y: 0.5 },
                { x: 2, y: 2 }
            ];

            const result = ClosestPoint.findNearest(target, points);

            expect(result).not.toBeNull();
            expect(result!.point).toEqual({ x: 0.5, y: 0.5 });
            expect(result!.index).toBe(1);
            expect(result!.distance).toBeCloseTo(Math.sqrt(0.5), 5);
        });

        it('点集为空时应返回null', () => {
            const target: IPoint2D = { x: 0, y: 0 };
            const result = ClosestPoint.findNearest(target, []);
            expect(result).toBeNull();
        });

        it('应该处理目标点在点集中的情况', () => {
            const target: IPoint2D = { x: 1, y: 1 };
            const points: IPoint2D[] = [
                { x: 1, y: 1 },
                { x: 2, y: 2 }
            ];

            const result = ClosestPoint.findNearest(target, points);

            expect(result).not.toBeNull();
            expect(result!.distance).toBeCloseTo(0, 5);
        });
    });

    describe('findKNearest', () => {
        it('应该找到K个最近点', () => {
            const target: IPoint2D = { x: 0, y: 0 };
            const points: IPoint2D[] = [
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 0.5, y: 0 },
                { x: 3, y: 0 }
            ];

            const results = ClosestPoint.findKNearest(target, points, 2);

            expect(results).toHaveLength(2);
            expect(results[0].point).toEqual({ x: 0.5, y: 0 });
            expect(results[1].point).toEqual({ x: 1, y: 0 });
        });

        it('K大于点集长度时应返回所有点', () => {
            const target: IPoint2D = { x: 0, y: 0 };
            const points: IPoint2D[] = [
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ];

            const results = ClosestPoint.findKNearest(target, points, 5);

            expect(results).toHaveLength(2);
        });

        it('K为0时应返回空数组', () => {
            const target: IPoint2D = { x: 0, y: 0 };
            const points: IPoint2D[] = [{ x: 1, y: 0 }];

            const results = ClosestPoint.findKNearest(target, points, 0);

            expect(results).toHaveLength(0);
        });
    });

    describe('findInRadius', () => {
        it('应该找到半径内的所有点', () => {
            const target: IPoint2D = { x: 0, y: 0 };
            const points: IPoint2D[] = [
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 0.5, y: 0 },
                { x: 5, y: 0 }
            ];

            const results = ClosestPoint.findInRadius(target, points, 2);

            expect(results).toHaveLength(3);
            expect(results.every(r => r.distance <= 2)).toBe(true);
        });

        it('半径为0时应该只找到重合点', () => {
            const target: IPoint2D = { x: 1, y: 1 };
            const points: IPoint2D[] = [
                { x: 1, y: 1 },
                { x: 2, y: 2 }
            ];

            const results = ClosestPoint.findInRadius(target, points, 0);

            expect(results).toHaveLength(1);
            expect(results[0].distance).toBeCloseTo(0, 5);
        });
    });

    describe('onSegment', () => {
        it('应该找到线段上的最近点', () => {
            const target: IPoint2D = { x: 0, y: 1 };
            const segment = new LineSegment2D(
                new Point2D(0, 0),
                new Point2D(2, 0)
            );

            const result = ClosestPoint.onSegment(target, segment);

            expect(result.x).toBeCloseTo(0, 5);
            expect(result.y).toBeCloseTo(0, 5);
        });

        it('最近点应该在线段内部', () => {
            const target: IPoint2D = { x: 1, y: 1 };
            const segment = new LineSegment2D(
                new Point2D(0, 0),
                new Point2D(2, 0)
            );

            const result = ClosestPoint.onSegment(target, segment);

            expect(result.x).toBeCloseTo(1, 5);
            expect(result.y).toBeCloseTo(0, 5);
        });
    });

    describe('onCircle', () => {
        it('应该找到圆上的最近点', () => {
            const target: IPoint2D = { x: 2, y: 0 };
            const circle = new Circle2D(new Point2D(0, 0), 1);

            const result = ClosestPoint.onCircle(target, circle);

            expect(result.x).toBeCloseTo(1, 5);
            expect(result.y).toBeCloseTo(0, 5);
        });

        it('目标点在圆心时应返回圆上任意点', () => {
            const target: IPoint2D = { x: 0, y: 0 };
            const circle = new Circle2D(new Point2D(0, 0), 1);

            const result = ClosestPoint.onCircle(target, circle);

            // 距离圆心的距离应该等于半径
            const dist = Math.sqrt(result.x * result.x + result.y * result.y);
            expect(dist).toBeCloseTo(1, 5);
        });
    });

    describe('snapToGrid', () => {
        it('应该吸附到最近的网格点', () => {
            const point: IPoint2D = { x: 1.3, y: 2.7 };
            const gridSize = 1;

            const result = ClosestPoint.snapToGrid(point, gridSize);

            expect(result).toEqual({ x: 1, y: 3 });
        });

        it('应该处理不同的网格大小', () => {
            const point: IPoint2D = { x: 7, y: 13 };
            const gridSize = 5;

            const result = ClosestPoint.snapToGrid(point, gridSize);

            expect(result).toEqual({ x: 5, y: 15 });
        });
    });

    describe('snapToAngle', () => {
        it('应该吸附到最近的角度', () => {
            const angle = Math.PI / 6; // 30度
            const snapAngle = Math.PI / 4; // 45度吸附

            const result = ClosestPoint.snapToAngle(angle, snapAngle);

            expect(result).toBeCloseTo(0, 5); // 最近的是0度
        });

        it('应该吸附到90度倍数', () => {
            const angle = Math.PI / 3; // 60度
            const snapAngle = Math.PI / 2; // 90度吸附

            const result = ClosestPoint.snapToAngle(angle, snapAngle);

            expect(result).toBeCloseTo(Math.PI / 2, 5); // 最近的是90度
        });
    });

    describe('snapToVertex', () => {
        it('应该吸附到阈值内的顶点', () => {
            const point: IPoint2D = { x: 1.05, y: 1.05 };
            const vertices: IPoint2D[] = [
                { x: 1, y: 1 },
                { x: 2, y: 2 }
            ];
            const threshold = 0.1;

            const result = ClosestPoint.snapToVertex(point, vertices, threshold);

            expect(result).toEqual({ x: 1, y: 1 });
        });

        it('超出阈值时应返回原点', () => {
            const point: IPoint2D = { x: 1.5, y: 1.5 };
            const vertices: IPoint2D[] = [
                { x: 1, y: 1 },
                { x: 2, y: 2 }
            ];
            const threshold = 0.1;

            const result = ClosestPoint.snapToVertex(point, vertices, threshold);

            expect(result).toEqual(point);
        });
    });

    describe('closestPairInSet', () => {
        it('应该找到点集中的最近点对', () => {
            const points: IPoint2D[] = [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 5, y: 5 },
                { x: 0.2, y: 0 }
            ];

            const result = ClosestPoint.closestPairInSet(points);

            expect(result).not.toBeNull();
            expect(result!.distance).toBeCloseTo(0.2, 5);
        });

        it('点数少于2时应返回null', () => {
            const points: IPoint2D[] = [{ x: 0, y: 0 }];

            const result = ClosestPoint.closestPairInSet(points);

            expect(result).toBeNull();
        });
    });
});