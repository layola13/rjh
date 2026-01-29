import * as CSGModule from './module_177620';

interface T3DMeshNode {
  polygons: any[];
  subtract(other: T3DMeshNode): T3DMeshNode;
  union(other: T3DMeshNode): T3DMeshNode;
  intersect(other: T3DMeshNode): T3DMeshNode;
}

interface T3DMesh {
  polygons: any[];
}

interface PolygonPoint {
  x: number;
  y: number;
  z: number;
}

interface CSGOperations {
  subtract(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode;
  union(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode;
  intersect(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode;
  inverse(mesh: T3DMeshNode): T3DMeshNode;
  subtrctByMeshes(baseMesh: T3DMeshNode, subtractMeshes: T3DMeshNode[]): T3DMeshNode;
  subtrctByCSGs(baseMesh: T3DMeshNode, csgNodes: T3DMeshNode[]): T3DMeshNode;
  subtrctByPolygons(baseMesh: T3DMesh, polygonPoints: PolygonPoint[]): T3DMesh;
  toCsg(mesh: T3DMeshNode): T3DMeshNode;
}

const csgOperations: CSGOperations = {
  subtract(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode {
    const csgA = CSGModule.fromT3DMeshNode(meshA);
    const csgB = CSGModule.fromT3DMeshNode(meshB);
    return CSGModule.toT3DMeshNode(csgA.subtract(csgB));
  },

  union(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode {
    const csgA = CSGModule.fromT3DMeshNode(meshA);
    const csgB = CSGModule.fromT3DMeshNode(meshB);
    return CSGModule.toT3DMeshNode(csgA.union(csgB));
  },

  intersect(meshA: T3DMeshNode, meshB: T3DMeshNode): T3DMeshNode {
    const csgA = CSGModule.fromT3DMeshNode(meshA);
    const csgB = CSGModule.fromT3DMeshNode(meshB);
    return CSGModule.toT3DMeshNode(csgA.intersect(csgB));
  },

  inverse(mesh: T3DMeshNode): T3DMeshNode {
    const csg = CSGModule.fromT3DMeshNode(mesh);
    return CSGModule.toT3DMeshNode(csg);
  },

  subtrctByMeshes(baseMesh: T3DMeshNode, subtractMeshes: T3DMeshNode[]): T3DMeshNode {
    let resultCSG = CSGModule.fromT3DMeshNode(baseMesh);
    
    subtractMeshes.forEach((mesh) => {
      if (resultCSG.polygons.length > 0) {
        const subtractCSG = CSGModule.fromT3DMeshNode(mesh);
        resultCSG = resultCSG.subtract(subtractCSG);
      }
    });
    
    return CSGModule.toT3DMeshNode(resultCSG);
  },

  subtrctByCSGs(baseMesh: T3DMeshNode, csgNodes: T3DMeshNode[]): T3DMeshNode {
    let resultCSG = CSGModule.fromT3DMeshNode(baseMesh);
    
    csgNodes.forEach((csgNode) => {
      if (resultCSG.polygons.length > 0) {
        resultCSG = resultCSG.subtract(csgNode);
      }
    });
    
    return CSGModule.toT3DMeshNode(resultCSG);
  },

  subtrctByPolygons(baseMesh: T3DMesh, polygonPoints: PolygonPoint[]): T3DMesh {
    let resultCSG = CSGModule.fromT3DMesh(baseMesh);
    
    if (resultCSG.polygons.length > 0) {
      const polygonCSG = CSGModule.fromPolygonPoints(polygonPoints);
      resultCSG = resultCSG.subtract(polygonCSG);
    }
    
    return CSGModule.toT3DMesh(resultCSG);
  },

  toCsg(mesh: T3DMeshNode): T3DMeshNode {
    return CSGModule.fromT3DMeshNode(mesh);
  }
};

export default csgOperations;