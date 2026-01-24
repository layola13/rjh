/**
 * 3D网格生成器模块
 * 用于基于路径和形状生成带状(Ribbon)网格模型
 */

import * as BABYLON from '@babylonjs/core';

/**
 * 形状点坐标
 */
interface ShapePoint {
  x: number;
  y: number;
}

/**
 * 网格生成参数
 */
interface MeshGenerationOptions {
  /** 路径点数组，定义网格的中心线 */
  path: BABYLON.Vector3[];
  /** 形状轮廓点数组，定义截面形状 */
  shape: ShapePoint[];
  /** 是否闭合路径 */
  close?: boolean;
}

/**
 * 网格模型生成器
 * 提供基于路径挤出形状创建3D网格的功能
 */
export default class MeshGenerator {
  /** Babylon.js 场景实例 */
  private static scene: BABYLON.Scene;

  /**
   * 初始化生成器
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: BABYLON.Scene): void {
    this.scene = scene;
  }

  /**
   * 生成网格模型
   * @param path - 路径点数组，默认为垂直线段
   * @param shape - 形状轮廓点数组，默认为矩形截面
   * @returns 生成的平面着色网格对象
   */
  static GenModel(
    path?: BABYLON.Vector3[],
    shape?: ShapePoint[]
  ): BABYLON.Mesh {
    // 默认路径：垂直向下的直线
    const defaultPath = [
      new BABYLON.Vector3(0, 1, 0),
      new BABYLON.Vector3(0, -1, 0),
      new BABYLON.Vector3(-2, -1, 0)
    ];

    // 默认形状：矩形截面
    const defaultShape = [
      new BABYLON.Vector3(-0.1, -0.1, 0),
      new BABYLON.Vector3(0.1, -0.1, 0),
      new BABYLON.Vector3(0.1, 0.3, 0)
    ];

    const mesh = this.createRibbonMesh({
      path: path ?? defaultPath,
      shape: shape ?? defaultShape,
      close: false
    }, this.scene);

    // 转换为平面着色以获得硬边效果
    mesh.convertToFlatShadedMesh();
    return mesh;
  }

  /**
   * 创建带状网格
   * @param options - 网格生成参数
   * @param scene - Babylon.js场景
   * @returns 带状网格对象
   */
  private static createRibbonMesh(
    options: MeshGenerationOptions,
    scene: BABYLON.Scene
  ): BABYLON.Mesh {
    const { shape, path, close = false } = options;
    const pathLength = path.length;
    const pathArray: BABYLON.Vector3[][] = [];

    // 向量缓存，避免重复创建
    const segmentVector = BABYLON.Vector3.Zero();
    const nextSegmentVector = BABYLON.Vector3.Zero();
    const binormal = BABYLON.Vector3.Zero();
    const normal = BABYLON.Vector3.Zero();
    const tangent = BABYLON.Vector3.Zero();
    const nextBinormal = BABYLON.Vector3.Zero();
    const nextNormal = BABYLON.Vector3.Zero();
    const nextTangent = BABYLON.Vector3.Zero();
    const currentPoint = BABYLON.Vector3.Zero();
    const intersectionPoint = BABYLON.Vector3.Zero();
    const vectorDifference = BABYLON.Vector3.Zero();

    let intersectionDistance = 0;

    // 遍历形状的每个点，为每个点生成沿路径的顶点序列
    for (let shapeIndex = 0; shapeIndex < shape.length; shapeIndex++) {
      // 计算第一段的局部坐标系
      path[1].subtractToRef(path[0], segmentVector);
      tangent.copyFrom(segmentVector.normalize());
      binormal.copyFrom(
        BABYLON.Vector3.Cross(scene.activeCamera!.position, tangent).normalize()
      );
      normal.copyFrom(BABYLON.Vector3.Cross(tangent, binormal));

      // 生成当前形状点沿路径的顶点列表
      const shapeVertices: BABYLON.Vector3[] = [];
      currentPoint.copyFrom(
        path[0]
          .add(binormal.scale(shape[shapeIndex].x))
          .add(normal.scale(shape[shapeIndex].y))
      );
      shapeVertices.push(currentPoint.clone());

      // 处理路径中间段
      for (let pathIndex = 0; pathIndex < pathLength - 2; pathIndex++) {
        // 计算下一段的方向向量
        path[pathIndex + 2].subtractToRef(path[pathIndex + 1], nextSegmentVector);
        nextTangent.copyFrom(nextSegmentVector.normalize());
        nextBinormal.copyFrom(
          BABYLON.Vector3.Cross(scene.activeCamera!.position, nextTangent).normalize()
        );
        nextNormal.copyFrom(BABYLON.Vector3.Cross(nextTangent, nextBinormal));

        // 计算两段之间的过渡平面
        nextTangent.subtractToRef(tangent, vectorDifference);
        const crossProduct = BABYLON.Vector3.Cross(nextTangent, tangent);
        const transitionNormal = BABYLON.Vector3.Cross(crossProduct, vectorDifference);
        const transitionPlane = BABYLON.Plane.FromPositionAndNormal(
          path[pathIndex + 1],
          transitionNormal
        );

        // 计算射线与过渡平面的交点
        intersectionDistance = new BABYLON.Ray(currentPoint, tangent)
          .intersectsPlane(transitionPlane)!;
        currentPoint.addToRef(tangent.scale(intersectionDistance), intersectionPoint);
        shapeVertices.push(intersectionPoint.clone());

        // 更新局部坐标系
        binormal.copyFrom(nextBinormal);
        normal.copyFrom(nextNormal);
        tangent.copyFrom(nextTangent);
        currentPoint.copyFrom(intersectionPoint);
      }

      // 处理路径闭合或终点
      if (close) {
        this.handleClosedPath(
          path,
          pathLength,
          scene,
          currentPoint,
          tangent,
          shapeVertices,
          segmentVector,
          nextSegmentVector,
          nextTangent,
          nextBinormal,
          nextNormal,
          vectorDifference
        );
      } else {
        this.handleOpenPath(
          path,
          pathLength,
          currentPoint,
          tangent,
          shapeVertices
        );
      }

      pathArray.push(shapeVertices);
    }

    return BABYLON.MeshBuilder.CreateRibbon(
      'ribbon',
      {
        pathArray,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        closeArray: true,
        closePath: close
      },
      scene
    );
  }

  /**
   * 处理闭合路径的端点连接
   */
  private static handleClosedPath(
    path: BABYLON.Vector3[],
    pathLength: number,
    scene: BABYLON.Scene,
    currentPoint: BABYLON.Vector3,
    tangent: BABYLON.Vector3,
    shapeVertices: BABYLON.Vector3[],
    segmentVector: BABYLON.Vector3,
    nextSegmentVector: BABYLON.Vector3,
    nextTangent: BABYLON.Vector3,
    nextBinormal: BABYLON.Vector3,
    nextNormal: BABYLON.Vector3,
    vectorDifference: BABYLON.Vector3
  ): void {
    const intersectionPoint = BABYLON.Vector3.Zero();

    // 处理最后一段到第一个点的连接
    path[0].subtractToRef(path[pathLength - 1], nextSegmentVector);
    nextTangent.copyFrom(nextSegmentVector.normalize());
    nextBinormal.copyFrom(
      BABYLON.Vector3.Cross(scene.activeCamera!.position, nextTangent).normalize()
    );
    nextNormal.copyFrom(BABYLON.Vector3.Cross(nextTangent, nextBinormal));

    nextTangent.subtractToRef(tangent, vectorDifference);
    const crossProduct1 = BABYLON.Vector3.Cross(nextTangent, tangent);
    const transitionNormal1 = BABYLON.Vector3.Cross(crossProduct1, vectorDifference);
    const transitionPlane1 = BABYLON.Plane.FromPositionAndNormal(
      path[pathLength - 1],
      transitionNormal1
    );

    const distance1 = new BABYLON.Ray(currentPoint, tangent).intersectsPlane(transitionPlane1)!;
    currentPoint.addToRef(tangent.scale(distance1), intersectionPoint);
    shapeVertices.push(intersectionPoint.clone());

    // 更新坐标系
    tangent.copyFrom(nextTangent);
    currentPoint.copyFrom(intersectionPoint);

    // 处理第一段的起点
    path[1].subtractToRef(path[0], nextSegmentVector);
    nextTangent.copyFrom(nextSegmentVector.normalize());
    nextBinormal.copyFrom(
      BABYLON.Vector3.Cross(scene.activeCamera!.position, nextTangent).normalize()
    );
    nextNormal.copyFrom(BABYLON.Vector3.Cross(nextTangent, nextBinormal));

    nextTangent.subtractToRef(tangent, vectorDifference);
    const crossProduct2 = BABYLON.Vector3.Cross(nextTangent, tangent);
    const transitionNormal2 = BABYLON.Vector3.Cross(crossProduct2, vectorDifference);
    const transitionPlane2 = BABYLON.Plane.FromPositionAndNormal(
      path[0],
      transitionNormal2
    );

    const distance2 = new BABYLON.Ray(currentPoint, tangent).intersectsPlane(transitionPlane2)!;
    currentPoint.addToRef(tangent.scale(distance2), intersectionPoint);

    shapeVertices.shift();
    shapeVertices.unshift(intersectionPoint.clone());
  }

  /**
   * 处理开放路径的终点
   */
  private static handleOpenPath(
    path: BABYLON.Vector3[],
    pathLength: number,
    currentPoint: BABYLON.Vector3,
    tangent: BABYLON.Vector3,
    shapeVertices: BABYLON.Vector3[]
  ): void {
    const intersectionPoint = BABYLON.Vector3.Zero();
    const endPlane = BABYLON.Plane.FromPositionAndNormal(path[pathLength - 1], tangent);
    const distance = new BABYLON.Ray(currentPoint, tangent).intersectsPlane(endPlane)!;
    currentPoint.addToRef(tangent.scale(distance), intersectionPoint);
    shapeVertices.push(intersectionPoint.clone());
  }
}