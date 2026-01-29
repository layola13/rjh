import { ServiceManager, ColorMode, PaveMetaPrefix, ClipMode, FloorUnionTolerance } from './ServiceManager';
import { Line2d, Vector2, Matrix3, Tolerance } from './Math';
import { PaintService } from './PaintService';
import { PaintHandler } from './PaintHandler';

interface MixPaveData {
  material: MaterialData;
  indices: number[];
  vertices: number[];
  dimension: number;
  normals: number[];
  uvs: number[];
  customAttrs?: unknown;
}

interface MaterialData {
  seekId: string;
  colorMode: ColorMode;
  color: number;
  blendColor?: number;
  textureUrl: string;
  uvTransform: { toArray: () => number[] };
  isTransparent: boolean;
  customized3D?: {
    textureUrl: string;
    uvTransform: { toArray: () => number[] };
  };
}

interface MeshDef {
  indices: number[];
  indexCount: number;
  meshKey?: string;
  vertexCount: number;
  vertexNormals: number[];
  vertexPositions: number[];
  vertexUVs: number[];
}

interface GraphicsData {
  id?: string;
  dataType?: string;
  bound?: unknown;
  customAttrs?: unknown;
  dimension?: number;
  material: {
    seekId: string;
    color: number;
    colorMode: ColorMode;
    textureURI: string;
    normalTexture: string;
    uvTransform: THREE.Matrix3;
    normalUvTransform: THREE.Matrix3;
    absoluteUseUVTransform: boolean;
    isTransparent: boolean;
  };
  meshDef: MeshDef;
}

interface BackgroundGeometry {
  outer: Vector2[];
  holes?: Vector2[][];
}

interface FaceGroup {
  bg: BackgroundGeometry;
  segments?: Segment[];
  bottomFaceGeometries?: Vector2[][];
  transform?: Matrix3;
  left?: number;
  bottom?: number;
}

interface Segment {
  planePath: Vector2[];
}

interface MaterialInput {
  mixpaint?: {
    mixPave?: MixPaveData;
  };
}

interface Path {
  outer: Line2d[];
  holes?: Line2d[][];
}

interface MergeOptions {
  mergePaths?: { outer: Line2d[] }[];
}

export class MixPaveIntegration {
  static ins = new MixPaveIntegration();

  getMeshs(
    material: MaterialInput,
    faceGroup: FaceGroup,
    param1: unknown,
    param2: unknown
  ): GraphicsData[] {
    let meshes: GraphicsData[] = [];

    this._preFaceGroupOffset(faceGroup);

    if (material?.mixpaint?.mixPave) {
      const rawMeshes = this._getMeshs(material.mixpaint.mixPave, faceGroup);
      meshes = this.convertMesh(rawMeshes);
    } else {
      meshes = PaintService.instance().getFaceGraphicsDataFromMaterial(faceGroup, param1, param2);
      meshes.forEach(data => this._reverseMeshDef(data.meshDef));
    }

    this._endFaceGroupOffset(faceGroup, meshes);

    return meshes;
  }

  async getMeshsAsync(
    material: MaterialInput,
    faceGroup: FaceGroup,
    param1: unknown,
    param2: unknown
  ): Promise<GraphicsData[]> {
    let meshes: GraphicsData[] = [];

    if (material?.mixpaint?.mixPave) {
      meshes = this.getMeshs(material, faceGroup, param1, param2);
    } else {
      meshes = await PaintService.instance().getFaceGraphicsDataFromMaterialAsync(faceGroup, param1, param2);
      meshes.forEach(data => this._reverseMeshDef(data.meshDef));
    }

    return meshes;
  }

  getMeshsByArc(
    material: MaterialInput,
    faceGroup: FaceGroup,
    param1: unknown,
    param2: unknown
  ): GraphicsData[] {
    let result: GraphicsData[] = [];

    if (material.mixpaint?.mixPave) {
      this._preFaceGroupOffset(faceGroup);

      const rawMeshes = this._getMeshs(material.mixpaint.mixPave, faceGroup);
      this._endFaceGroupOffset(faceGroup, undefined, rawMeshes);

      faceGroup.segments?.forEach(segment => {
        const planePath = segment.planePath;
        const cutLines = [
          new Line2d(planePath[3], planePath[0]),
          new Line2d(planePath[1], planePath[2])
        ];

        let segmentMeshes: MixPaveData[] = [];
        rawMeshes.forEach(mesh => {
          const cutMesh = ServiceManager.getFGIService().cutMesh2D(mesh, cutLines);
          if (cutMesh) {
            segmentMeshes.push(cutMesh);
          }
        });

        if (segmentMeshes.length) {
          const convertedMeshes = this.convertMesh(segmentMeshes);
          PaintHandler.convertSegmentMesh(convertedMeshes, segment);
          convertedMeshes.forEach(mesh => result.push(mesh));
        }
      });
    } else {
      this._preFaceGroupOffset(faceGroup);
      result = PaintService.instance().getSurfaceGraphicsDataFromMaterial(faceGroup, param1, param2);
      result.forEach(data => this._reverseMeshDef(data.meshDef));
      this._endFaceGroupOffset(faceGroup, result);
    }

    return result;
  }

  async getMeshsByArcAsync(
    material: MaterialInput,
    faceGroup: FaceGroup,
    param1: unknown,
    param2: unknown
  ): Promise<GraphicsData[]> {
    let meshes: GraphicsData[] = [];

    if (material.mixpaint?.mixPave) {
      meshes = this.getMeshsByArc(material, faceGroup, param1, param2);
    } else {
      meshes = await PaintService.instance().getSurfaceGraphicsDataFromMaterialAsync(faceGroup, param1, param2);
      meshes.forEach(data => this._reverseMeshDef(data.meshDef));
    }

    return meshes;
  }

  private _getMeshs(mixPaveData: MixPaveData, faceGroup: FaceGroup): MixPaveData[] {
    const outerLines = ServiceManager.getMathService().getLinesFromVectors(faceGroup.bg.outer);
    const holeLines: Line2d[][] = [];

    if (faceGroup.bg.holes?.length) {
      faceGroup.bg.holes.forEach(hole => {
        const isClockwise = ServiceManager.getMathService().isClockWise(hole);
        const vectors = isClockwise ? hole : hole.slice().reverse();
        holeLines.push(ServiceManager.getMathService().getLinesFromVectors(vectors));
      });
    }

    let paths: Path[] = [{
      outer: outerLines,
      holes: holeLines
    }];

    let options: MergeOptions | undefined;

    if (faceGroup.bottomFaceGeometries?.length) {
      const mergePaths = faceGroup.bottomFaceGeometries.map(geometry => ({
        outer: ServiceManager.getMathService().getLinesFromVectors(geometry)
      }));

      paths = ServiceManager.getClipperService().clip(
        paths,
        mergePaths,
        ClipMode.Union,
        new Tolerance(FloorUnionTolerance)
      );

      options = { mergePaths };
    }

    return ServiceManager.getFGIService().toMesh3D(mixPaveData, paths, options);
  }

  convertMesh(meshes: MixPaveData[]): GraphicsData[] {
    return meshes.map(mesh => {
      const { material, indices, vertices, dimension, normals, uvs } = mesh;
      
      const uvTransformArray = material.uvTransform.toArray();
      const uvTransform = new THREE.Matrix3().fromArray(uvTransformArray);

      let normalUvTransform = new THREE.Matrix3();
      if (material.customized3D) {
        const normalUvTransformArray = material.customized3D.uvTransform.toArray();
        normalUvTransform = normalUvTransform.fromArray(normalUvTransformArray);
      }

      let colorMode = material.colorMode !== ColorMode.Texture || material.textureUrl
        ? material.colorMode
        : ColorMode.Color;

      const color = material.colorMode === ColorMode.Blend ? material.blendColor : material.color;

      const productMeta = HSCatalog.Manager.instance().getBuildingProductMeta(material.seekId);
      if (productMeta?.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Paint)) {
        colorMode = ColorMode.Color;
      }

      const defaultColor = 16777215;

      return {
        id: undefined,
        dataType: undefined,
        bound: undefined,
        customAttrs: mesh.customAttrs,
        material: {
          seekId: !material.seekId || material.seekId.includes(PaveMetaPrefix)
            ? HSCore.Material.MaterialIdEnum.generated
            : material.seekId,
          color: color ?? defaultColor,
          colorMode,
          textureURI: material.textureUrl,
          normalTexture: material.customized3D ? material.customized3D.textureUrl : "",
          uvTransform,
          normalUvTransform,
          absoluteUseUVTransform: true,
          isTransparent: material.isTransparent
        },
        meshDef: {
          indices,
          indexCount: indices.length / 3,
          meshKey: undefined,
          vertexCount: vertices.length / dimension,
          vertexNormals: normals,
          vertexPositions: vertices,
          vertexUVs: uvs
        }
      };
    });
  }

  private _reverseMeshDef(meshDef: MeshDef): void {
    const normalCount = meshDef.vertexNormals.length;
    for (let i = 0; i < normalCount; i++) {
      meshDef.vertexNormals[i] = -meshDef.vertexNormals[i];
    }

    const indexCount = meshDef.indices.length;
    for (let i = 0; i < indexCount; i += 3) {
      const temp = meshDef.indices[i + 2];
      meshDef.indices[i + 2] = meshDef.indices[i];
      meshDef.indices[i] = temp;
    }
  }

  private _preFaceGroupOffset(faceGroup: FaceGroup): void {
    const transform = faceGroup.transform ??
      (faceGroup.left !== undefined && faceGroup.bottom !== undefined
        ? Matrix3.makeTranslate({ x: faceGroup.left, y: faceGroup.bottom })
        : undefined);

    if (!transform || transform.isIdentity()) {
      return;
    }

    const tempVector = new Vector2();
    const transformPoint = (point: Vector2): Vector2 => {
      tempVector.copy(point);
      const transformed = tempVector.transform(transform);
      point.x = transformed.x;
      point.y = transformed.y;
      return point;
    };

    faceGroup.bg.outer.forEach(point => transformPoint(point));
    faceGroup.bg.holes?.forEach(hole => {
      hole.forEach(point => transformPoint(point));
    });

    if (faceGroup.bottomFaceGeometries) {
      faceGroup.bottomFaceGeometries = faceGroup.bottomFaceGeometries.map(geometry =>
        geometry.map(point => transformPoint(point))
      );
    }
  }

  private _endFaceGroupOffset(
    faceGroup: FaceGroup,
    meshes?: GraphicsData[],
    rawMeshes?: MixPaveData[]
  ): void {
    const inverseTransform = faceGroup.transform?.inversed() ??
      (faceGroup.left !== undefined && faceGroup.bottom !== undefined
        ? Matrix3.makeTranslate({ x: -faceGroup.left, y: -faceGroup.bottom })
        : undefined);

    if (!inverseTransform || inverseTransform.isIdentity()) {
      return;
    }

    const tempVector = new Vector2();
    const transformPoint = (x: number, y: number): Vector2 => {
      tempVector.x = x;
      tempVector.y = y;
      return tempVector.transform(inverseTransform);
    };

    meshes?.forEach(mesh => {
      const positions = mesh.meshDef.vertexPositions;
      const positionCount = positions.length;
      const stride = mesh.dimension ?? positionCount / mesh.meshDef.vertexCount;

      for (let i = 0; i < positionCount; i += stride) {
        const transformed = transformPoint(positions[i], positions[i + 1]);
        positions[i] = transformed.x;
        positions[i + 1] = transformed.y;
      }
    });

    rawMeshes?.forEach(mesh => {
      const vertices = mesh.vertices;
      const vertexCount = vertices.length;
      const stride = mesh.dimension;

      for (let i = 0; i < vertexCount; i += stride) {
        const transformed = transformPoint(vertices[i], vertices[i + 1]);
        vertices[i] = transformed.x;
        vertices[i + 1] = transformed.y;
      }
    });
  }
}