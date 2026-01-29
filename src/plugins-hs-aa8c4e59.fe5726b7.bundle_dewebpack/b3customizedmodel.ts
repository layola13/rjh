import { turnEntityToBom3Entity, setObjectParameterValues } from './entityUtils';
import { CustomizedMoldingPredicate, FacePredicate } from './predicates';
import { B3Entity } from './B3Entity';
import { B3Face } from './B3Face';

export enum CuztomizedMoadlResultType {
  StructureInfo = "structure info",
  SketchMolding = "sketch molding info",
  ParametricCeiling = "parametric ceiling info",
  DIYModel = "diy model info"
}

interface BasicModelData {
  entity: unknown;
  surfaceArea?: number;
  projectionArea?: number;
  projectionLength?: number;
  cornerRadius?: number;
  hostFace?: unknown;
  bottomFaces?: unknown[];
  defaultFaceArea?: number;
  moldings?: string[];
  faces?: unknown[];
}

interface ParametersData {
  customizedType?: string;
  ceilingType?: string;
  ceilingHeight?: number;
  ceilingWidth?: number;
  ceilingOutArcRadius?: number;
  cornerRectWidth?: number;
  innerCeilingHeight?: number;
  innerDistance?: number;
  cornerSize?: number;
  arcRadius?: number;
  arcStep?: number;
  cascadeWidth?: number;
  cascadeHeight?: number;
  intervalWidth?: number;
  w1?: number;
  h1?: number;
  w2?: number;
  h2?: number;
  w3?: number;
  h3?: number;
  beamWidth?: number;
  beamHeight?: number;
  beamLength?: number;
  beamCount?: number;
  beamSurfaceArea?: number;
}

interface Bom3Data {
  basicModel: BasicModelData;
  parameters: ParametersData;
}

interface Entity {
  children: unknown[];
  getId(): string;
}

export class B3CustomizedModel extends B3Entity {
  buildBom3Data(entity: Entity): Bom3Data {
    const result: Bom3Data = {} as Bom3Data;
    const basicModel: BasicModelData = {} as BasicModelData;

    basicModel.entity = turnEntityToBom3Entity(entity);
    
    setObjectParameterValues(basicModel, entity, {
      surfaceArea: "surfaceArea",
      projectionArea: "projectionArea",
      projectionLength: "projectionLength",
      cornerRadius: "cornerRadius",
      hostFace: "hostFace",
      bottomFaces: "bottomFaces",
      defaultFaceArea: "defaultFaceArea"
    });

    result.basicModel = basicModel;

    const parameters: ParametersData = {};

    setObjectParameterValues(parameters, entity, {
      customizedType: "customizedType"
    });

    setObjectParameterValues(parameters, entity, {
      ceilingType: "ceilingType",
      ceilingHeight: "ceilingHeight",
      ceilingWidth: "ceilingWidth",
      ceilingOutArcRadius: "ceilingOutArcRadius",
      cornerRectWidth: "cornerRectWidth",
      innerCeilingHeight: "innerCeilingHeight",
      innerDistance: "innerDistance",
      cornerSize: "cornerSize",
      arcRadius: "arcRadius",
      arcStep: "arcStep",
      cascadeWidth: "cascadeWidth",
      cascadeHeight: "cascadeHeight",
      intervalWidth: "intervalWidth",
      w1: "w1",
      h1: "h1",
      w2: "w2",
      h2: "h2",
      w3: "w3",
      h3: "h3",
      beamWidth: "beamWidth",
      beamHeight: "beamHeight",
      beamLength: "beamLength",
      beamCount: "beamCount",
      beamSurfaceArea: "beamSurfaceArea"
    });

    result.parameters = parameters;
    basicModel.moldings = this.getMoldingIds(entity);
    basicModel.faces = this.getFaces(entity);

    return result;
  }

  getMoldingIds(entity: Entity): string[] {
    return this.context.dbApi
      .findAll(entity.children, new CustomizedMoldingPredicate())
      .map((molding: Entity) => molding.getId());
  }

  getFaces(entity: Entity): unknown[] {
    return this.context.dbApi
      .findAll(entity.children, new FacePredicate())
      .map((face: Entity) => new B3Face(this.context).buildBom3Data(face));
  }
}