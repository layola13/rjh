import * as CSGLib from './module_177620';

interface Mesh {
  // Define based on your mesh structure
  polygons?: unknown[];
  [key: string]: unknown;
}

interface Geometry {
  [key: string]: unknown;
}

interface CSG {
  polygons: unknown[];
  subtract(other: CSG): CSG;
  union(other: CSG): CSG;
  intersect(other: CSG): CSG;
}

interface MeshData {
  [key: string]: unknown;
}

type PolygonPoint = unknown[];

export const CSGOperations = {
  subtract(meshA: Mesh, meshB: Mesh): Mesh {
    const csgA = CSGLib.fromMesh(meshA);
    const csgB = CSGLib.fromMesh(meshB);
    return CSGLib.toMesh(csgA.subtract(csgB));
  },

  union(meshA: Mesh, meshB: Mesh): Mesh {
    const csgA = CSGLib.fromMesh(meshA);
    const csgB = CSGLib.fromMesh(meshB);
    return CSGLib.toMesh(csgA.union(csgB));
  },

  intersect(meshA: Mesh, meshB: Mesh): Mesh {
    const csgA = CSGLib.fromMesh(meshA);
    const csgB = CSGLib.fromMesh(meshB);
    return CSGLib.toMesh(csgA.intersect(csgB));
  },

  inverse(mesh: Mesh): Mesh {
    const csg = CSGLib.fromMesh(mesh);
    return CSGLib.toMesh(csg);
  },

  subtrctByMeshes(baseMesh: Mesh, subtractMeshes: Mesh[]): Mesh {
    let resultCSG = CSGLib.fromMesh(baseMesh);
    
    subtractMeshes.forEach((mesh) => {
      if (resultCSG.polygons.length > 0) {
        const subtractCSG = CSGLib.fromMesh(mesh);
        resultCSG = resultCSG.subtract(subtractCSG);
      }
    });
    
    return CSGLib.toMesh(resultCSG);
  },

  subtrctByCSGs(baseMesh: Mesh, subtractCSGs: CSG[]): Mesh {
    let resultCSG = CSGLib.fromMesh(baseMesh);
    
    subtractCSGs.forEach((csg) => {
      if (resultCSG.polygons.length > 0) {
        resultCSG = resultCSG.subtract(csg);
      }
    });
    
    return CSGLib.toMesh(resultCSG);
  },

  subtrctByPolygons(geometry: Geometry, polygonPoints: PolygonPoint): Geometry {
    let resultCSG = CSGLib.fromGeometry(geometry);
    
    if (resultCSG.polygons.length > 0) {
      const polygonCSG = CSGLib.fromPolygonPoints(polygonPoints);
      resultCSG = resultCSG.subtract(polygonCSG);
    }
    
    return CSGLib.toGeometry(resultCSG);
  },

  toCsg(mesh: Mesh): CSG {
    return CSGLib.fromMesh(mesh);
  },

  InitCSGFromMeshData(meshData: MeshData): CSG {
    return CSGLib.setFromMeshData(meshData);
  }
};

export default CSGOperations;