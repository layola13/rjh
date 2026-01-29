/**
 * WallProfile - 墙体轮廓
 * 管理墙体的截面轮廓和扫掠路径
 */

import { Vector2, Vector3, Shape, Path } from 'three';

/**
 * 轮廓类型枚举
 */
export enum WallProfileType {
    /** 矩形轮廓 */
    Rectangle = 'Rectangle',
    /** 自定义轮廓 */
    Custom = 'Custom',
    /** 复合轮廓 */
    Compound = 'Compound'
}

/**
 * 墙体轮廓类
 * 定义墙体的截面形状
 */
export class WallProfile {
    /** 轮廓ID */
    public id: string;
    
    /** 轮廓类型 */
    public type: WallProfileType;
    
    /** 轮廓路径 */
    public path: Vector2[] = [];
    
    /** 轮廓形状（THREE.Shape） */
    public shape?: Shape;
    
    /** 轮廓宽度 */
    public width: number = 0;
    
    /** 轮廓高度 */
    public height: number = 0;
    
    /** 是否闭合 */
    public closed: boolean = true;
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param id 轮廓ID
     * @param type 轮廓类型
     */
    constructor(id: string, type: WallProfileType = WallProfileType.Rectangle) {
        this.id = id;
        this.type = type;
    }

    /**
     * 创建矩形轮廓
     * @param width 宽度
     * @param height 高度
     * @returns 墙体轮廓对象
     */
    public static createRectangle(width: number, height: number): WallProfile {
        const profile = new WallProfile('rect', WallProfileType.Rectangle);
        profile.width = width;
        profile.height = height;
        
        profile.path = [
            new Vector2(0, 0),
            new Vector2(width, 0),
            new Vector2(width, height),
            new Vector2(0, height)
        ];
        
        profile.updateShape();
        return profile;
    }

    /**
     * 创建自定义轮廓
     * @param id 轮廓ID
     * @param path 轮廓路径
     * @param closed 是否闭合
     * @returns 墙体轮廓对象
     */
    public static createCustom(id: string, path: Vector2[], closed: boolean = true): WallProfile {
        const profile = new WallProfile(id, WallProfileType.Custom);
        profile.path = path.map(p => p.clone());
        profile.closed = closed;
        profile.updateDimensions();
        profile.updateShape();
        return profile;
    }

    /**
     * 更新轮廓形状
     */
    public updateShape(): void {
        if (this.path.length < 3) {
            this.shape = undefined;
            return;
        }

        this.shape = new Shape();
        this.shape.moveTo(this.path[0].x, this.path[0].y);

        for (let i = 1; i < this.path.length; i++) {
            this.shape.lineTo(this.path[i].x, this.path[i].y);
        }

        if (this.closed) {
            this.shape.closePath();
        }
    }

    /**
     * 更新尺寸信息
     */
    private updateDimensions(): void {
        if (this.path.length === 0) {
            this.width = 0;
            this.height = 0;
            return;
        }

        const minX = Math.min(...this.path.map(p => p.x));
        const maxX = Math.max(...this.path.map(p => p.x));
        const minY = Math.min(...this.path.map(p => p.y));
        const maxY = Math.max(...this.path.map(p => p.y));

        this.width = maxX - minX;
        this.height = maxY - minY;
    }

    /**
     * 设置轮廓路径
     * @param path 新的路径
     */
    public setPath(path: Vector2[]): void {
        this.path = path.map(p => p.clone());
        this.updateDimensions();
        this.updateShape();
    }

    /**
     * 添加点到轮廓
     * @param point 要添加的点
     */
    public addPoint(point: Vector2): void {
        this.path.push(point.clone());
        this.updateDimensions();
        this.updateShape();
    }

    /**
     * 在指定索引处插入点
     * @param index 索引
     * @param point 要插入的点
     */
    public insertPoint(index: number, point: Vector2): void {
        this.path.splice(index, 0, point.clone());
        this.updateDimensions();
        this.updateShape();
    }

    /**
     * 移除指定索引的点
     * @param index 索引
     */
    public removePoint(index: number): void {
        if (index >= 0 && index < this.path.length) {
            this.path.splice(index, 1);
            this.updateDimensions();
            this.updateShape();
        }
    }

    /**
     * 获取轮廓面积
     * @returns 面积
     */
    public getArea(): number {
        if (this.path.length < 3) {
            return 0;
        }

        // 使用鞋带公式
        let area = 0;
        const n = this.path.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += this.path[i].x * this.path[j].y;
            area -= this.path[j].x * this.path[i].y;
        }

        return Math.abs(area) / 2;
    }

    /**
     * 获取轮廓周长
     * @returns 周长
     */
    public getPerimeter(): number {
        if (this.path.length < 2) {
            return 0;
        }

        let perimeter = 0;
        const n = this.path.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            perimeter += this.path[i].distanceTo(this.path[j]);
        }

        if (!this.closed && n > 0) {
            // 如果不闭合，减去最后一段
            perimeter -= this.path[n - 1].distanceTo(this.path[0]);
        }

        return perimeter;
    }

    /**
     * 缩放轮廓
     * @param scaleX X方向缩放
     * @param scaleY Y方向缩放
     */
    public scale(scaleX: number, scaleY: number): void {
        this.path = this.path.map(p => new Vector2(p.x * scaleX, p.y * scaleY));
        this.width *= scaleX;
        this.height *= scaleY;
        this.updateShape();
    }

    /**
     * 偏移轮廓
     * @param offsetX X方向偏移
     * @param offsetY Y方向偏移
     */
    public offset(offsetX: number, offsetY: number): void {
        this.path = this.path.map(p => new Vector2(p.x + offsetX, p.y + offsetY));
        this.updateShape();
    }

    /**
     * 旋转轮廓
     * @param angle 旋转角度（弧度）
     * @param center 旋转中心（默认为原点）
     */
    public rotate(angle: number, center: Vector2 = new Vector2(0, 0)): void {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        this.path = this.path.map(p => {
            const dx = p.x - center.x;
            const dy = p.y - center.y;
            return new Vector2(
                center.x + dx * cos - dy * sin,
                center.y + dx * sin + dy * cos
            );
        });

        this.updateShape();
    }

    /**
     * 翻转轮廓
     * @param horizontal 是否水平翻转
     * @param vertical 是否垂直翻转
     */
    public flip(horizontal: boolean = false, vertical: boolean = false): void {
        if (!horizontal && !vertical) {
            return;
        }

        this.path = this.path.map(p => new Vector2(
            horizontal ? -p.x : p.x,
            vertical ? -p.y : p.y
        ));

        this.updateShape();
    }

    /**
     * 反转轮廓点的顺序
     */
    public reverse(): void {
        this.path.reverse();
        this.updateShape();
    }

    /**
     * 简化轮廓（移除冗余点）
     * @param tolerance 容差
     */
    public simplify(tolerance: number = 0.01): void {
        if (this.path.length < 3) {
            return;
        }

        const simplified: Vector2[] = [this.path[0]];

        for (let i = 1; i < this.path.length - 1; i++) {
            const prev = this.path[i - 1];
            const curr = this.path[i];
            const next = this.path[i + 1];

            // 计算点到线段的距离
            const dist = this.pointToSegmentDistance(curr, prev, next);

            if (dist > tolerance) {
                simplified.push(curr);
            }
        }

        simplified.push(this.path[this.path.length - 1]);

        this.path = simplified;
        this.updateShape();
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
     * 克隆轮廓
     * @returns 新的轮廓对象
     */
    public clone(): WallProfile {
        const newProfile = new WallProfile(this.id, this.type);
        newProfile.path = this.path.map(p => p.clone());
        newProfile.width = this.width;
        newProfile.height = this.height;
        newProfile.closed = this.closed;
        newProfile.userData = { ...this.userData };
        newProfile.updateShape();
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
            path: this.path.map(p => ({ x: p.x, y: p.y })),
            width: this.width,
            height: this.height,
            closed: this.closed,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 墙体轮廓对象
     */
    public static fromJSON(json: any): WallProfile {
        const profile = new WallProfile(json.id, json.type);
        profile.path = json.path.map((p: any) => new Vector2(p.x, p.y));
        profile.width = json.width;
        profile.height = json.height;
        profile.closed = json.closed;
        profile.userData = json.userData || {};
        profile.updateShape();
        return profile;
    }

    /**
     * 转换为3D路径
     * @param baseZ Z坐标
     * @returns 3D路径点
     */
    public toPath3D(baseZ: number = 0): Vector3[] {
        return this.path.map(p => new Vector3(p.x, p.y, baseZ));
    }
}