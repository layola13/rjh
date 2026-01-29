import { Tolerance } from './Tolerance';
import { SnapResultType } from './SnapResultType';

interface GeoObject {
  isParallelTo(other: GeoObject): boolean;
  getDirection(): Vector;
}

interface Vector {
  cross(other: Vector): number;
}

interface ClientObject {
  geo: GeoObject;
}

interface ConstraintData {
  type: SnapResultType;
  client: ClientObject;
  dx?: number;
  dy?: number;
  drotation?: number;
  center?: unknown;
  getJSON(): ConstraintJSON;
}

interface ConstraintJSON {
  dx?: number;
  dy?: number;
  drotation?: number;
  center?: unknown;
}

export class ConstraintHelper {
  private static _instance?: ConstraintHelper;

  private constructor() {}

  public static getInstance(): ConstraintHelper {
    if (!this._instance) {
      this._instance = new ConstraintHelper();
    }
    return this._instance;
  }

  public getRelatedConstraint(
    constraint: ConstraintData,
    constraints: ConstraintData[]
  ): ConstraintData | undefined {
    const relatedConstraints: ConstraintData[] = [];

    for (const candidateConstraint of constraints) {
      if (this._isUnique(constraint, candidateConstraint)) {
        relatedConstraints.push(candidateConstraint);
      }
    }

    if (relatedConstraints.length === 0) {
      return undefined;
    }

    if (constraint.type === SnapResultType.Colline) {
      const nonParallelConstraints = relatedConstraints.filter((item) => {
        if (item.type !== SnapResultType.Colline) {
          return true;
        }
        const constraintGeo = constraint.client.geo;
        const itemGeo = item.client.geo;
        return !constraintGeo.isParallelTo(itemGeo);
      });

      const collineConstraints = nonParallelConstraints.filter(
        (item) => item.type === SnapResultType.Colline
      );

      if (collineConstraints.length === 0) {
        return nonParallelConstraints[0];
      }

      const constraintGeo = constraint.client.geo;
      const parallelDirectionConstraints = collineConstraints.filter((item) => {
        const crossProduct = item.client.geo
          .getDirection()
          .cross(constraintGeo.getDirection());
        return crossProduct < 0.001;
      });

      if (parallelDirectionConstraints.length === 0) {
        return nonParallelConstraints[0];
      }

      return parallelDirectionConstraints[0];
    }

    return relatedConstraints[0];
  }

  public execute(
    primaryConstraint?: ConstraintData,
    secondaryConstraint?: ConstraintData
  ): ConstraintJSON | undefined {
    if (!primaryConstraint) {
      return undefined;
    }

    let result: ConstraintJSON = Object.assign({}, primaryConstraint.getJSON());

    if (!secondaryConstraint) {
      return result;
    }

    const EPSILON = 1e-6;

    if ((!result.dx || Math.abs(result.dx) < EPSILON) && secondaryConstraint.dx) {
      result = Object.assign(result, { dx: secondaryConstraint.dx });
    }

    if ((!result.dy || Math.abs(result.dy) < EPSILON) && secondaryConstraint.dy) {
      result = Object.assign(result, { dy: secondaryConstraint.dy });
    }

    if (!result.drotation && secondaryConstraint.drotation) {
      result = Object.assign(result, {
        drotation: secondaryConstraint.drotation,
        center: secondaryConstraint.center,
      });
    }

    return result;
  }

  private _isUnique(
    constraint1: ConstraintData,
    constraint2: ConstraintData
  ): boolean {
    const DELTA_EPSILON = 1e-4;
    const edgeLengthEps = Tolerance.EDGE_LENGTH_EPS;

    if (
      constraint1.dx &&
      Math.abs(constraint1.dx) > DELTA_EPSILON &&
      constraint2.dx &&
      Math.abs(constraint2.dx) > DELTA_EPSILON &&
      Math.abs(constraint1.dx - constraint2.dx) > edgeLengthEps
    ) {
      return false;
    }

    if (
      constraint1.dy &&
      Math.abs(constraint1.dy) > DELTA_EPSILON &&
      constraint2.dy &&
      Math.abs(constraint2.dy) > DELTA_EPSILON &&
      Math.abs(constraint1.dy - constraint2.dy) > edgeLengthEps
    ) {
      return false;
    }

    if (
      constraint1.drotation &&
      Math.abs(constraint1.drotation) > DELTA_EPSILON &&
      constraint2.drotation &&
      Math.abs(constraint2.drotation) > DELTA_EPSILON &&
      Math.abs(constraint1.drotation - constraint2.drotation) > edgeLengthEps
    ) {
      return false;
    }

    return true;
  }
}