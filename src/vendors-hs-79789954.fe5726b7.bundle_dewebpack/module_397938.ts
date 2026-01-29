type Unit = 'm' | 'cm';

class Tolerance {
  EQUAL_TOLERANCE!: number;
  DISTANCE_TOLERENCE!: number;
  PLANE_DISTANCE_TOLERENCE!: number;
  DISTANCE_SQ_TOLERENCE!: number;
  VECTOR_EQUAL_TOLERANCE!: number;
  CLIPPER_MINI_AREA!: number;
  CLIPPER_SCALE_FACTOR!: number;
  CLIPPER_MINI_AREA_SCALE!: number;
  KDTREE_SQ_NEAREST_TOL!: number;

  static global: Tolerance = new Tolerance();

  constructor() {
    this.setByUnit('m');
  }

  /**
   * Set tolerance values based on unit
   */
  setByUnit(unit: Unit): void {
    switch (unit) {
      case 'cm':
        this._setByCentiMeter();
        break;
      case 'm':
      default:
        this._setByMeter();
        break;
    }
  }

  private _setByMeter(): void {
    this.EQUAL_TOLERANCE = 1e-7;
    this.DISTANCE_TOLERENCE = 1e-7;
    this.PLANE_DISTANCE_TOLERENCE = 1e-6;
    this.DISTANCE_SQ_TOLERENCE = 1e-14;
    this.VECTOR_EQUAL_TOLERANCE = 1e-5;
    this.CLIPPER_MINI_AREA = 1e-7;
    this.CLIPPER_SCALE_FACTOR = 1e7;
    this.CLIPPER_MINI_AREA_SCALE = this.CLIPPER_MINI_AREA * this.CLIPPER_SCALE_FACTOR * this.CLIPPER_SCALE_FACTOR;
    this.KDTREE_SQ_NEAREST_TOL = 1e-10;
  }

  private _setByCentiMeter(): void {
    this.EQUAL_TOLERANCE = 1e-5;
    this.DISTANCE_TOLERENCE = 1e-5;
    this.PLANE_DISTANCE_TOLERENCE = 1e-4;
    this.DISTANCE_SQ_TOLERENCE = 1e-10;
    this.VECTOR_EQUAL_TOLERANCE = 1e-5;
    this.CLIPPER_MINI_AREA = 0.001;
    this.CLIPPER_SCALE_FACTOR = 1e5;
    this.CLIPPER_MINI_AREA_SCALE = this.CLIPPER_MINI_AREA * this.CLIPPER_SCALE_FACTOR * this.CLIPPER_SCALE_FACTOR;
    this.KDTREE_SQ_NEAREST_TOL = 1e-6;
  }
}

export default Tolerance;