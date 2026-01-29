import { turnEntityToBom3Entity, setObjectParameterValues } from './entity-utils';
import { NCustomizedMoldingPredicate, FacePredicate } from './predicates';
import { B3Entity } from './b3-entity';
import { B3Face } from './b3-face';

export enum NCustomizedModelResultType {
  StructureInfo = "ncustomized structure info",
  SketchMolding = "ncustomized sketch molding info",
  ParametricCeiling = "ncustomized parametric ceiling info",
  DIYModel = "ncustomized diy model info"
}

interface BasicModel {
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

interface Parameters {
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
  basicModel: BasicModel;
  parameters: Parameters;
}

interface EntityWithChildren {
  children: unknown[];
  getId(): string;
}

interface Context {
  dbApi: {
    findAll(children: unknown[], predicate: unknown): EntityWithChildren[];
  };
}

export class B3NCustomizedFeatureModel extends B3Entity {
  protected context!: Context;

  buildBom3Data(entity: EntityWithChildren): Bom3Data {
    const result: Bom3Data = {
      basicModel: {} as BasicModel,
      parameters: {}
    };

    const basicModel: BasicModel = {
      entity: turnEntityToBom3Entity(entity)
    };

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

    const parameters: Parameters = {};

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

  private getMoldingIds(entity: EntityWithChildren): string[] {
    return this.context.dbApi
      .findAll(entity.children, new NCustomizedMoldingPredicate())
      .map((moldingEntity) => moldingEntity.getId());
  }

  private getFaces(entity: EntityWithChildren): unknown[] {
    return this.context.dbApi
      .findAll(entity.children, new FacePredicate())
      .map((faceEntity) => new B3Face(this.context).buildBom3Data(faceEntity));
  }
}