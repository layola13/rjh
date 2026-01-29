/**
 * SlabProfile - 楼板轮廓
 * 管理楼板的边缘轮廓和形状定义
 */

import { Vector2, Vector3 } from 'three';

/**
 * 楼板轮廓类型枚举
 */
export enum SlabProfileType {
    /** 矩形轮廓 */
    Rectangle = 'Rectangle',
    /** L型轮廓 */
    LShape = 'LShape',
    /** U型轮廓 */
    UShape = 'UShape',
    /** 多边形轮廓 */
    Polygon = 'Polygon',
    /** 自定义轮廓 */
    Custom = 'Custom'
}

/**
 * 楼板轮廓类
 * 定义楼板的平面形状
 */
export class SlabProfile {
    /** 轮廓ID */
    public id: string;
    
    /** 轮廓类型 */
    public type: SlabProfileType;
    
    /** 轮廓外边界 */
    public outerContour: Vector2[] = [];
    
    /** 轮廓内边界（孔洞） */
    public innerContours: Vector2[][] = [];
    
    /** 是否闭合 */
    public closed: boolean = true;
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param id 轮廓ID
     * @param type 轮廓类型
     */
    constructor(id: string, type: SlabProfileType = SlabProfileType.Rectangle) {
        this.id = id;
        this.type = type;
    }

    /**
     * 创建矩形轮廓
     * @param width 宽度
     * @param length 长度
     * @returns 楼板轮廓对象
     */
    public static createRectangle(width: number, length: number): SlabProfile {
        const profile = new SlabProfile('rect', SlabProfileType.Rectangle);
        profile.outerContour = [
            new Vector2(0, 0),
            new Vector2(width, 0),
            new Vector2(width, length),
            new Vector2(0, length)
        ];
        return profile;
    }

    /**
     * 创建L型轮廓
     * @param width1 第一段宽度
     * @param length1 第一段长度
     * @param width2 第二段宽度
     * @param length2 第二段长度
     * @returns 楼板轮廓对象
     */
    public static createLShape(
        width1: number,
        length1: number,
        width2: number,
        length2: number
    ): SlabProfile {
        const profile = new SlabProfile('lshape', SlabProfileType.LShape);
        profile.outerContour = [
            new Vector2(0, 0),
            new Vector2(width1, 0),
            new Vector2(width1, length1 - length2),
            new Vector2(width1 + width2, length1 - length2),
            new Vector2(width1 + width2, length1),
            new Vector2(0, length1)
        ];
        return profile;
    }

    /**
     * 创建多边形轮廓
     * @param id 轮廓ID
     * @param contour 轮廓点
     * @returns 楼板轮廓对象
     */
    public static createPolygon(id: string, contour: Vector2[]): SlabProfile {
        const profile = new SlabProfile(id, SlabProfileType.Polygon);
        profile.outerContour = contour.map(p => p.clone());
        return profile;
    }

    /**
     * 设置外轮廓
     * @param contour 轮廓点
     */
    public setOuterContour(contour: Vector2[]): void {
        this.outerContour = contour.map(p => p.clone());
    }

    /**
     * 添加内轮廓（孔洞）
     * @param contour 内轮廓点
     */
    public addInnerContour(contour: Vector2[]): void {
        this.innerContours.push(contour.map(p => p.clone()));
    }

    /**
     * 移除内轮廓
     * @param index 内轮廓索引
     */
    public removeInnerContour(index: number): void {
        if (index >= 0 && index < this.innerContours.length) {
            this.innerContours.splice(index, 1);
        }
    }

    /**
     * 清空所有内轮廓
     */
    public clearInnerContours(): void {
        this.innerContours = [];
    }

    /**
     * 获取轮廓面积
     * @returns 面积
     */
    public getArea(): number {
        const outerArea = this.calculatePolygonArea(this.outerContour);
        const innerArea = this.innerContours.reduce(
            (sum, contour) => sum + this.calculatePolygonArea(contour),
            0
        );
        return outerArea - innerArea;
    }

    /**
     * 计算多边形面积
     * @private
     */
    private calculatePolygonArea(contour: Vector2[]): number {
        if (contour.length < 3) {
            return 0;
        }

        let area = 0;
        const n = contour.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += contour[i].x * contour[j].y;
            area -= contour[j].x * contour[i].y;
        }

        return Math.abs(area) / 2;
    }

    /**
     * 获取轮廓周长
     * @returns 周长
     */
    public getPerimeter(): number {
        const outerPerimeter = this.calculatePolygonPerimeter(this.outerContour);
        const innerPerimeter = this.innerContours.reduce(
            (sum, contour) => sum + this.calculatePolygonPerimeter(contour),
            0
        );
        return outerPerimeter + innerPerimeter;
    }

    /**
     * 计算多边形周长
     * @private
     */
    private calculatePolygonPerimeter(contour: Vector2[]): number {
        if (contour.length < 2) {
            return 0;
        }

        let perimeter = 0;
        const n = contour.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            perimeter += contour[i].distanceTo(contour[j]);
        }

        return perimeter;
    }

    /**
     * 判断点是否在轮廓内
     * @param point 点坐标
     * @returns 是否在轮廓内
     */
    public containsPoint(point: Vector2): boolean {
        // 点必须在外轮廓内
        if (!this.isPointInPolygon(point, this.outerContour)) {
            return false;
        }

        // 点不能在任何内轮廓内
        for (const innerContour of this.innerContours) {
            if (this.isPointInPolygon(point, innerContour)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 判断点是否在多边形内
     * @private
     */
    private isPointInPolygon(point: Vector2, polygon: Vector2[]): boolean {
        if (polygon.length < 3) {
            return false;
        }

        let inside = false;
        const n = polygon.length;

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = polygon[i].x;
            const yi = polygon[i].y;
            const xj = polygon[j].x;
            const yj = polygon[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

            if (intersect) {
                inside = !inside;
            }
        }

        return inside;
    }

    /**
     * 获取边界框
     * @returns 边界框 {min, max}
     */
    public getBounds(): { min: Vector2; max: Vector2 } {
        if (this.outerContour.length === 0) {
            return {
                min: new Vector2(0, 0),
                max: new Vector2(0, 0)
            };
        }

        const min = new Vector2(
            Math.min(...this.outerContour.map(p => p.x)),
            Math.min(...this.outerContour.map(p => p.y))
        );

        const max = new Vector2(
            Math.max(...this.outerContour.map(p => p.x)),
            Math.max(...this.outerContour.map(p => p.y))
        );

        return { min, max };
    }

    /**
     * 偏移轮廓
     * @param offset 偏移量（正值向外，负值向内）
     * @returns 偏移后的轮廓
     */
    public offset(offset: number): SlabProfile {
        const newProfile = this.clone();
        // 简化实现：实际需要复杂的多边形偏移算法
        return newProfile;
    }

    /**
     * 简化轮廓
     * @param tolerance 容差
     */
    public simplify(tolerance: number = 0.01): void {
        this.outerContour = this.simplifyPolygon(this.outerContour, tolerance);
        this.innerContours = this.innerContours.map(contour => 
            this.simplifyPolygon(contour, tolerance)
        );
    }

    /**
     * 简化多边形
     * @private
     */
    private simplifyPolygon(polygon: Vector2[], tolerance: number): Vector2[] {
        if (polygon.length < 4) {
            return polygon;
        }

        const simplified: Vector2[] = [polygon[0]];

        for (let i = 1; i < polygon.length - 1; i++) {
            const prev = polygon[i - 1];
            const curr = polygon[i];
            const next = polygon[i + 1];

            const dist = this.pointToSegmentDistance(curr, prev, next);

            if (dist > tolerance) {
                simplified.push(curr);
            }
        }

        simplified.push(polygon[polygon.length - 1]);
        return simplified;
    }

    /**
     * 计算点到线段的距离
     * @private
     */
    private pointToSegmentDistance(point: Vector2, lineStart: Vector2, lineEnd: Vector2): number {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const lengthSquared = dx * dx + dy * dy;

        if (lengthSquared === 0) {
            return point.distanceTo(lineStart);
        }

        let t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lengthSquared;
        t = Math.max(0, Math.min(1, t));

        const projection = new Vector2(
            lineStart.x + t * dx,
            lineStart.y + t * dy
        );

        return point.distanceTo(projection);
    }

    /**
     * 转换为3D轮廓
     * @param baseZ Z坐标
     * @returns 3D轮廓
     */
    public toContour3D(baseZ: number = 0): {
        outer: Vector3[];
        inner: Vector3[][];
    } {
        return {
            outer: this.outerContour.map(p => new Vector3(p.x, p.y, baseZ)),
            inner: this.innerContours.map(contour =>
                contour.map(p => new Vector3(p.x, p.y, baseZ))
            )
        };
    }

    /**
     * 克隆轮廓
     * @returns 新的轮廓对象
     */
    public clone(): SlabProfile {
        const newProfile = new SlabProfile(this.id, this.type);
        newProfile.outerContour = this.outerContour.map(p => p.clone());
        newProfile.innerContours = this.innerContours.map(contour =>
            contour.map(p => p.clone())
        );
        newProfile.closed = this.closed;
        newProfile.userData = { ...this.userData };
        return newProfile;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            id: this.id,
            type: this.type,
            outerContour: this.outerContour.map(p => ({ x: p.x, y: p.y })),
            innerContours: this.innerContours.map(contour =>
                contour.map(p => ({ x: p.x, y: p.y }))
            ),
            closed: this.closed,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 楼板轮廓对象
     */
    public static fromJSON(json: any): SlabProfile {
        const profile = new SlabProfile(json.id, json.type);
        profile.outerContour = json.outerContour.map((p: any) => new Vector2(p.x, p.y));
        profile.innerContours = json.innerContours.map((contour: any[]) =>
            contour.map((p: any) => new Vector2(p.x, p.y))
        );
        profile.closed = json.closed;
        profile.userData = json.userData || {};
        return profile;
    }

    /**
     * 验证轮廓是否有效
     * @returns 是否有效
     */
    public isValid(): boolean {
        if (this.outerContour.length < 3) {
            return false;
        }

        // 检查所有内轮廓
        for (const innerContour of this.innerContours) {
            if (innerContour.length < 3) {
                return false;
            }
        }

        return true;
    }

    /**
     * 获取中心点
     * @returns 中心点坐标
     */
    public getCenter(): Vector2 {
        if (this.outerContour.length === 0) {
            return new Vector2(0, 0);
        }

        const sum = this.outerContour.reduce(
            (acc, p) => acc.add(p),
            new Vector2(0, 0)
        );

        return sum.divideScalar(this.outerContour.length);
    }
}