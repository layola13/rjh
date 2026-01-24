/**
 * Verb - NURBS Geometry Library
 * @see https://github.com/pboyer/verb
 */

declare module 'verb' {
  // Core geometric types
  export namespace geom {
    /** Base interface for serializable objects */
    interface ISerializable {
      serialize(): string;
    }

    /** Base interface for curves */
    interface ICurve extends ISerializable {
      degree(): number;
      domain(): core.Interval;
      point(u: number): number[];
      tangent(u: number): number[];
      length(): number;
    }

    /** NURBS curve class */
    export class NurbsCurve implements ICurve {
      constructor(data: core.NurbsCurveData);
      
      static byKnotsControlPointsWeights(
        degree: number,
        knots: number[],
        controlPoints: number[][],
        weights: number[]
      ): NurbsCurve;
      
      static byPoints(points: number[][], degree?: number): NurbsCurve;
      
      degree(): number;
      knots(): number[];
      controlPoints(): number[][];
      weights(): number[];
      domain(): core.Interval;
      point(u: number): number[];
      tangent(u: number): number[];
      derivatives(u: number, numDerivs?: number): number[][];
      length(): number;
      split(u: number): [NurbsCurve, NurbsCurve];
    }

    /** Base interface for surfaces */
    interface ISurface extends ISerializable {
      degreeU(): number;
      degreeV(): number;
      domainU(): core.Interval;
      domainV(): core.Interval;
      point(u: number, v: number): number[];
    }

    /** NURBS surface class */
    export class NurbsSurface implements ISurface {
      constructor(data: core.NurbsSurfaceData);
      
      degreeU(): number;
      degreeV(): number;
      domainU(): core.Interval;
      domainV(): core.Interval;
      point(u: number, v: number): number[];
      normal(u: number, v: number): number[];
    }
  }

  // Core data structures
  export namespace core {
    /** Curve data structure */
    export class NurbsCurveData {
      constructor(degree: number, knots: number[], controlPoints: number[][]);
      degree: number;
      knots: number[];
      controlPoints: number[][];
    }

    /** Surface data structure */
    export class NurbsSurfaceData {
      constructor(
        degreeU: number,
        degreeV: number,
        knotsU: number[],
        knotsV: number[],
        controlPoints: number[][][]
      );
    }

    /** Interval [min, max] */
    export class Interval {
      constructor(min: number, max: number);
      min: number;
      max: number;
    }

    /** 3D Vector operations */
    export namespace Vec {
      export function add(a: number[], b: number[]): number[];
      export function sub(a: number[], b: number[]): number[];
      export function mul(scalar: number, vec: number[]): number[];
      export function dot(a: number[], b: number[]): number[];
      export function cross(a: number[], b: number[]): number[];
      export function norm(v: number[]): number;
      export function normalized(v: number[]): number[];
    }
  }

  // Evaluation functions
  export namespace eval {
    export namespace Eval {
      export function rationalCurvePoint(curve: core.NurbsCurveData, u: number): number[];
      export function rationalSurfacePoint(surf: core.NurbsSurfaceData, u: number, v: number): number[];
    }
  }
}