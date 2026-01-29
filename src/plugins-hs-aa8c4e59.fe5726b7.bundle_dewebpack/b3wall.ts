import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity, setObjectParameterValues } from './utils';

interface Arc {
  [key: string]: unknown;
}

interface B3WallBom3Data {
  entity: unknown;
  location?: unknown;
  wallType?: unknown;
  thickness?: number;
  height?: number;
  innerLength?: number;
  bBearing?: boolean;
  arc?: Arc;
  bFullHeight?: boolean;
  isInnerWall?: boolean;
  sectionArea?: number;
}

export class B3Wall extends B3Entity {
  public buildBom3Data(entity: unknown): B3WallBom3Data {
    const data: B3WallBom3Data = {
      entity: turnEntityToBom3Entity(entity)
    };

    setObjectParameterValues(data, entity, {
      location: "location",
      wallType: "wallType",
      thickness: "thickness",
      height: "height",
      innerLength: "innerLength",
      bBearing: "bBearing",
      arc: "arc",
      bFullHeight: "bFullHeight",
      isInnerWall: "isInnerWall",
      sectionArea: "sectionArea"
    });

    if (!data.arc) {
      data.arc = {};
    }

    return data;
  }
}