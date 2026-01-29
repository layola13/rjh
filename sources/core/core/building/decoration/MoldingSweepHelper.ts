/**
 * MoldingSweepHelper - 线条扫掠辅助器
 * 用于处理线条（踢脚线、腰线、顶角线等）的扫掠建模
 */

import { Vector2, Vector3, Matrix4, Quaternion } from 'three';

/**
 * 扫掠路径点接口
 */
export interface ISweepPathPoint {
    /** 位置 */
    position: Vector3;
    /** 切线方向 */
    tangent: Vector3;
    /** 法线方向 */
    normal: Vector3;
    /** 副法线方向 */
    binormal: Vector3;
    /** 参数t值 (0-1) */
    t: number;
}

/**
 * 扫掠配置接口
 */
export interface ISweepConfig {
    /** 是否闭合路径 */
    closePath?: boolean;
    /** 是否闭合截面 */
    closeProfile?: boolean;
    /** 路径细分段数 */
    pathSegments?: number;
    /** 截面细分段数 */
    profileSegments?: number;
    /** 是否生成UV坐标 */
    generateUVs?: boolean;
    /** UV缩放 */
    uvScale?: { u: number; v: number };
    /** 是否翻转法线 */
    flipNormals?: boolean;
}

/**
 * 线条扫掠辅助器类
 * 提供线条扫掠建模的核心功能
 */
export class MoldingSweepHelper {
    private static _instance: MoldingSweepHelper;

    /**
     * 获取单例实例
     */
    public static instance(): MoldingSweepHelper {
        if (!MoldingSweepHelper._instance) {
            MoldingSweepHelper._instance = new MoldingSweepHelper();
        }
        return MoldingSweepHelper._instance;
    }

    /**
     * 执行扫掠操作
     * @param profile 截面轮廓（2D点数组）
     * @param path 扫掠路径（3D点数组）
     * @param config 扫掠配置
     * @returns 扫掠结果 {vertices, indices, normals, uvs}
     */
    public sweep(
        profile: Vector2[],
        path: Vector3[],
        config: ISweepConfig = {}
    ): {
        vertices: Vector3[];
        indices: number[];
        normals: Vector3[];
        uvs: Vector2[];
    } {
        // 默认配置
        const cfg: Required<ISweepConfig> = {
            closePath: config.closePath ?? false,
            closeProfile: config.closeProfile ?? false,
            pathSegments: config.pathSegments ?? path.length - 1,
            profileSegments: config.profileSegments ?? profile.length - 1,
            generateUVs: config.generateUVs ?? true,
            uvScale: config.uvScale ?? { u: 1, v: 1 },
            flipNormals: config.flipNormals ?? false
        };

        // 生成路径上的标架
        const frames = this.generateFrenetFrames(path, cfg.pathSegments, cfg.closePath);

        // 生成顶点
        const vertices: Vector3[] = [];
        const uvs: Vector2[] = [];

        for (let i = 0; i < frames.length; i++) {
            const frame = frames[i];
            const pathProgress = i / (frames.length - 1);

            for (let j = 0; j < profile.length; j++) {
                const profilePoint = profile[j];
                const profileProgress = j / (profile.length - 1);

                // 将截面点转换到3D空间
                const vertex = this.transformProfilePoint(
                    profilePoint,
                    frame
                );
                vertices.push(vertex);

                // 生成UV坐标
                if (cfg.generateUVs) {
                    uvs.push(new Vector2(
                        profileProgress * cfg.uvScale.u,
                        pathProgress * cfg.uvScale.v
                    ));
                }
            }
        }

        // 生成索引
        const indices = this.generateIndices(
            frames.length,
            profile.length,
            cfg.closePath,
            cfg.closeProfile
        );

        // 生成法线
        const normals = this.generateNormals(
            vertices,
            indices,
            cfg.flipNormals
        );

        return { vertices, indices, normals, uvs };
    }

    /**
     * 生成Frenet标架
     * @param path 路径点
     * @param segments 段数
     * @param closed 是否闭合
     * @returns 标架数组
     */
    private generateFrenetFrames(
        path: Vector3[],
        segments: number,
        closed: boolean
    ): ISweepPathPoint[] {
        const frames: ISweepPathPoint[] = [];
        
        // 对路径进行重采样
        const resampledPath = this.resamplePath(path, segments, closed);

        for (let i = 0; i < resampledPath.length; i++) {
            const t = i / (resampledPath.length - 1);
            
            // 计算切线
            const tangent = this.calculateTangent(resampledPath, i, closed);
            
            // 计算法线和副法线
            const { normal, binormal } = this.calculateNormalBinormal(
                resampledPath,
                i,
                tangent,
                frames.length > 0 ? frames[frames.length - 1].normal : undefined
            );

            frames.push({
                position: resampledPath[i].clone(),
                tangent: tangent.normalize(),
                normal: normal.normalize(),
                binormal: binormal.normalize(),
                t
            });
        }

        return frames;
    }

    /**
     * 重采样路径
     * @param path 原始路径
     * @param segments 段数
     * @param closed 是否闭合
     * @returns 重采样后的路径
     */
    private resamplePath(
        path: Vector3[],
        segments: number,
        closed: boolean
    ): Vector3[] {
        if (path.length === segments + 1) {
            return path.map(p => p.clone());
        }

        const resampled: Vector3[] = [];
        const totalLength = this.calculatePathLength(path, closed);
        const segmentLength = totalLength / segments;

        let currentLength = 0;
        let currentIndex = 0;
        resampled.push(path[0].clone());

        for (let i = 1; i <= segments; i++) {
            const targetLength = i * segmentLength;

            while (currentIndex < path.length - 1 && currentLength < targetLength) {
                const segLen = path[currentIndex].distanceTo(path[currentIndex + 1]);
                
                if (currentLength + segLen >= targetLength) {
                    // 在当前段内插值
                    const t = (targetLength - currentLength) / segLen;
                    const point = new Vector3().lerpVectors(
                        path[currentIndex],
                        path[currentIndex + 1],
                        t
                    );
                    resampled.push(point);
                    break;
                } else {
                    currentLength += segLen;
                    currentIndex++;
                }
            }
        }

        return resampled;
    }

    /**
     * 计算路径长度
     * @param path 路径
     * @param closed 是否闭合
     * @returns 总长度
     */
    private calculatePathLength(path: Vector3[], closed: boolean): number {
        let length = 0;
        for (let i = 0; i < path.length - 1; i++) {
            length += path[i].distanceTo(path[i + 1]);
        }
        if (closed && path.length > 0) {
            length += path[path.length - 1].distanceTo(path[0]);
        }
        return length;
    }

    /**
     * 计算切线
     * @param path 路径
     * @param index 索引
     * @param closed 是否闭合
     * @returns 切线向量
     */
    private calculateTangent(
        path: Vector3[],
        index: number,
        closed: boolean
    ): Vector3 {
        const prev = index > 0 ? path[index - 1] : 
                     (closed ? path[path.length - 1] : path[index]);
        const next = index < path.length - 1 ? path[index + 1] : 
                     (closed ? path[0] : path[index]);
        
        return new Vector3().subVectors(next, prev);
    }

    /**
     * 计算法线和副法线
     * @param path 路径
     * @param index 索引
     * @param tangent 切线
     * @param prevNormal 前一个法线
     * @returns 法线和副法线
     */
    private calculateNormalBinormal(
        path: Vector3[],
        index: number,
        tangent: Vector3,
        prevNormal?: Vector3
    ): { normal: Vector3; binormal: Vector3 } {
        let normal: Vector3;

        if (index === 0 || !prevNormal) {
            // 第一个点，选择一个合适的初始法线
            const up = Math.abs(tangent.y) > 0.99 ? 
                      new Vector3(1, 0, 0) : 
                      new Vector3(0, 1, 0);
            normal = new Vector3().crossVectors(tangent, up).normalize();
        } else {
            // 使用前一个法线旋转到当前切线
            normal = prevNormal.clone();
            
            // 确保法线垂直于切线
            const proj = tangent.clone().multiplyScalar(
                normal.dot(tangent) / tangent.lengthSq()
            );
            normal.sub(proj).normalize();
        }

        const binormal = new Vector3().crossVectors(tangent, normal).normalize();

        return { normal, binormal };
    }

    /**
     * 将截面点转换到3D空间
     * @param profilePoint 截面点（2D）
     * @param frame 标架
     * @returns 3D点
     */
    private transformProfilePoint(
        profilePoint: Vector2,
        frame: ISweepPathPoint
    ): Vector3 {
        const vertex = new Vector3(
            profilePoint.x * frame.normal.x + profilePoint.y * frame.binormal.x,
            profilePoint.x * frame.normal.y + profilePoint.y * frame.binormal.y,
            profilePoint.x * frame.normal.z + profilePoint.y * frame.binormal.z
        );
        
        vertex.add(frame.position);
        return vertex;
    }

    /**
     * 生成三角形索引
     * @param pathLength 路径长度
     * @param profileLength 截面长度
     * @param closePath 是否闭合路径
     * @param closeProfile 是否闭合截面
     * @returns 索引数组
     */
    private generateIndices(
        pathLength: number,
        profileLength: number,
        closePath: boolean,
        closeProfile: boolean
    ): number[] {
        const indices: number[] = [];

        const pathSteps = closePath ? pathLength : pathLength - 1;
        const profileSteps = closeProfile ? profileLength : profileLength - 1;

        for (let i = 0; i < pathSteps; i++) {
            for (let j = 0; j < profileSteps; j++) {
                const a = i * profileLength + j;
                const b = i * profileLength + ((j + 1) % profileLength);
                const c = ((i + 1) % pathLength) * profileLength + ((j + 1) % profileLength);
                const d = ((i + 1) % pathLength) * profileLength + j;

                // 第一个三角形
                indices.push(a, b, c);
                // 第二个三角形
                indices.push(a, c, d);
            }
        }

        return indices;
    }

    /**
     * 生成法线
     * @param vertices 顶点数组
     * @param indices 索引数组
     * @param flip 是否翻转法线
     * @returns 法线数组
     */
    private generateNormals(
        vertices: Vector3[],
        indices: number[],
        flip: boolean
    ): Vector3[] {
        // 初始化法线数组
        const normals: Vector3[] = new Array(vertices.length);
        for (let i = 0; i < normals.length; i++) {
            normals[i] = new Vector3(0, 0, 0);
        }

        // 计算每个三角形的法线并累加
        for (let i = 0; i < indices.length; i += 3) {
            const ia = indices[i];
            const ib = indices[i + 1];
            const ic = indices[i + 2];

            const va = vertices[ia];
            const vb = vertices[ib];
            const vc = vertices[ic];

            const edge1 = new Vector3().subVectors(vb, va);
            const edge2 = new Vector3().subVectors(vc, va);
            const faceNormal = new Vector3().crossVectors(edge1, edge2);

            if (flip) {
                faceNormal.negate();
            }

            normals[ia].add(faceNormal);
            normals[ib].add(faceNormal);
            normals[ic].add(faceNormal);
        }

        // 归一化
        for (const normal of normals) {
            normal.normalize();
        }

        return normals;
    }

    /**
     * 创建矩形截面
     * @param width 宽度
     * @param height 高度
     * @returns 截面点数组
     */
    public createRectangleProfile(width: number, height: number): Vector2[] {
        const hw = width / 2;
        const hh = height / 2;
        return [
            new Vector2(-hw, -hh),
            new Vector2(hw, -hh),
            new Vector2(hw, hh),
            new Vector2(-hw, hh),
            new Vector2(-hw, -hh) // 闭合
        ];
    }

    /**
     * 创建圆形截面
     * @param radius 半径
     * @param segments 段数
     * @returns 截面点数组
     */
    public createCircleProfile(radius: number, segments: number = 16): Vector2[] {
        const profile: Vector2[] = [];
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            profile.push(new Vector2(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius
            ));
        }
        return profile;
    }

    /**
     * 创建自定义踢脚线截面
     * @param width 宽度
     * @param height 高度
     * @returns 截面点数组
     */
    public createBaseBoardProfile(width: number, height: number): Vector2[] {
        return [
            new Vector2(0, 0),
            new Vector2(width * 0.2, 0),
            new Vector2(width * 0.3, height * 0.3),
            new Vector2(width * 0.7, height * 0.7),
            new Vector2(width, height),
            new Vector2(0, height),
            new Vector2(0, 0) // 闭合
        ];
    }
}