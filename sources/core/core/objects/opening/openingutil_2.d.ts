/**
 * 开口工具模块
 * 提供开口（门窗等）相关的捕捉面和宿主面查询功能
 */

import { ContentUtil } from './ContentUtil';
import { Wall, WallFaceType } from './Wall';
import { WallUtil } from './WallUtil';
import { Slab, SlabFaceType, SlabFace } from './Slab';
import { DocManager } from './DocManager';

/**
 * 三维坐标点
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 开口对象接口
 */
interface Opening {
  /** 开口在宿主上的X坐标 */
  x: number;
  /** 开口在宿主上的Y坐标 */
  y: number;
  /** 开口在宿主上的Z坐标 */
  z: number;
  /** 开启方向：0-内开，1-外开 */
  swing: 0 | 1;
  /** 开口轮廓（用于壁龛等特殊开口） */
  outline?: Point3D[];
  /** 获取开口所在的宿主对象（墙体或楼板） */
  getHost(): Wall | Slab | null;
}

/**
 * 楼板提供者接口
 */
interface SlabProvider {
  /**
   * 获取楼板面的路径点集
   * @param face 楼板面对象
   * @returns 路径点数组
   */
  getFacePath(face: SlabFace): Point3D[];
}

/**
 * 开口工具类
 * 提供开口相关的几何计算和查询功能
 */
export const OpeningUtil = {
  /**
   * 获取开口的捕捉面类型
   * 根据开口的开启方向和宿主类型，确定应该捕捉到哪个面
   * 
   * @param opening 开口对象
   * @returns 捕捉面类型（墙面类型或楼板面类型），如果无法确定则返回undefined
   */
  getSnapFaceType(opening: Opening): WallFaceType | SlabFaceType | undefined {
    const host = opening.getHost();
    let snapFaceType: WallFaceType | SlabFaceType | undefined;

    if (ContentUtil.isValidWallOpeningHost(host, opening)) {
      // 墙体开口处理
      const wall = host as Wall;
      const wallInfo = WallUtil.getWallInfo(wall);

      switch (opening.swing) {
        case 1: // 外开
          snapFaceType = wallInfo.outerWallSide === WallFaceType.left 
            ? WallFaceType.left 
            : WallFaceType.right;
          break;
        case 0: // 内开
          snapFaceType = wallInfo.outerWallSide === WallFaceType.left 
            ? WallFaceType.right 
            : WallFaceType.left;
          break;
      }
    } else if (ContentUtil.isValidSlabOpeningHost(host, opening)) {
      // 楼板开口处理
      switch (opening.swing) {
        case 1: // 外开（向下）
          snapFaceType = SlabFaceType.bottom;
          break;
        case 0: // 内开（向上）
          snapFaceType = SlabFaceType.top;
          break;
      }
    }

    return snapFaceType;
  },

  /**
   * 获取开口所在宿主的相关面
   * 根据开口位置查找其所在的墙面或楼板面
   * 
   * @param opening 开口对象
   * @returns 宿主面数组，如果找不到则返回空数组
   */
  getHostFaces(opening: Opening): SlabFace[] | Wall[] {
    const host = opening.getHost();
    if (!host) {
      return [];
    }

    const openingPosition: Point3D = {
      x: opening.x,
      y: opening.y,
      z: opening.z
    };

    // 处理墙体宿主
    if (host instanceof Wall) {
      let nicheOutline: Point3D[] | undefined;
      
      if (ContentUtil.isWallNiche(opening)) {
        nicheOutline = opening.outline;
      }
      
      return WallUtil.findNearestWallFaces(host, openingPosition, nicheOutline);
    }

    // 处理楼板宿主
    if (host instanceof Slab) {
      const slabProvider = DocManager.instance().slabProviderMap.get(host.id);
      if (!slabProvider) {
        return [];
      }

      // 查找顶面
      const topFaces = Object.values(host.getFaces(SlabFaceType.top));
      const facePathCache = new Map<string, Point3D[]>();
      let matchingTopFaces: SlabFace[] = [];

      // 找出包含开口位置的顶面
      topFaces.forEach((face) => {
        const facePath = slabProvider.getFacePath(face);
        facePathCache.set(face.id, facePath);
        
        if (HSCore.Util.Math.isPointInPolygon(openingPosition, facePath)) {
          matchingTopFaces.push(face);
        }
      });

      // 如果有多个面包含该点，选择最内层的面
      if (matchingTopFaces.length > 1) {
        let innermostFace = matchingTopFaces[0];
        let innermostPath = facePathCache.get(innermostFace.id)!;

        for (let i = 1; i < matchingTopFaces.length; i++) {
          const currentFace = matchingTopFaces[i];
          const currentPath = facePathCache.get(currentFace.id)!;
          
          if (HSCore.Util.Math.isPolygonInPolygon(currentPath, innermostPath)) {
            innermostFace = currentFace;
            innermostPath = currentPath;
          }
        }
        
        matchingTopFaces = [innermostFace];
      }

      // 如果是楼板壁龛，只返回顶面
      if (ContentUtil.isSlabNiche(opening)) {
        return matchingTopFaces;
      }

      // 查找底面
      const bottomFaces = Object.values(host.getFaces(SlabFaceType.bottom));
      let matchingBottomFaces: SlabFace[] = [];

      bottomFaces.forEach((face) => {
        const facePath = slabProvider.getFacePath(face);
        facePathCache.set(face.id, facePath);
        
        if (HSCore.Util.Math.isPointInPolygon(openingPosition, facePath)) {
          matchingBottomFaces.push(face);
        }
      });

      // 如果有多个底面包含该点，选择最内层的面
      if (matchingBottomFaces.length > 1) {
        let innermostFace = matchingBottomFaces[0];
        let innermostPath = facePathCache.get(innermostFace.id)!;

        for (let i = 1; i < matchingBottomFaces.length; i++) {
          const currentFace = matchingBottomFaces[i];
          const currentPath = facePathCache.get(currentFace.id)!;
          
          if (HSCore.Util.Math.isPolygonInPolygon(currentPath, innermostPath)) {
            innermostFace = currentFace;
            innermostPath = currentPath;
          }
        }
        
        matchingBottomFaces = [innermostFace];
      }

      // 返回顶面和底面的合集
      return matchingTopFaces.concat(matchingBottomFaces);
    }

    return [];
  }
};