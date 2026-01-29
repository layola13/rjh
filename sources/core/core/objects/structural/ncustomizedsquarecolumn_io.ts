import { Line2d } from './Line2d';
import { NCustomizedStructure, NCustomizedStructre_IO } from './NCustomizedStructure';
import { Entity } from './Entity';

interface UserData {
  curveid: 'right' | 'front' | 'left' | 'back';
  index: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

type DumpCallback = (dumped: unknown, entity: unknown) => void;

class NCustomizedSquareColumn_IO extends NCustomizedStructre_IO {
  dump(
    entity: unknown,
    callback?: DumpCallback,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const dumped = super.dump(entity, undefined, includeMetadata, options);
    if (callback) {
      callback(dumped, entity);
    }
    return dumped;
  }

  load(data: unknown, target: unknown, options: LoadOptions = {}): void {
    super.load(data, target, options);
  }

  static instance(): NCustomizedSquareColumn_IO {
    return new NCustomizedSquareColumn_IO();
  }
}

class NCustomizedSquareColumn extends NCustomizedStructure {
  constructor(identifier: string = '') {
    super(identifier);
  }

  initByMeta(metadata: unknown): void {
    super.initByMeta(metadata);
  }

  /**
   * Get the path profile
   */
  get path(): Line2d[] {
    const profile = this.calcProfile();
    return profile ? profile[0] : [];
  }

  /**
   * Get 3D height
   */
  get height3d(): number {
    return this.ZLength * this.ZScale;
  }

  /**
   * Set 3D height
   */
  set height3d(value: number) {
    this.ZLength = value / this.ZScale;
  }

  /**
   * Get the center curve
   */
  get curve(): Line2d {
    const line = new Line2d(
      { x: -this.XSize / 2, y: 0 },
      { x: this.XSize / 2, y: 0 }
    );
    const transform = this.get2DTransform();
    line.transform(transform);
    return line;
  }

  /**
   * Calculate the profile paths
   */
  calcProfile(applyTransform: boolean = true): Line2d[][] | undefined {
    const rightLine = new Line2d(
      { x: -this.XSize / 2, y: -this.YSize / 2 },
      { x: this.XSize / 2, y: -this.YSize / 2 }
    );
    rightLine.userData = { curveid: 'right', index: 0 } as UserData;

    const frontLine = new Line2d(
      { x: this.XSize / 2, y: -this.YSize / 2 },
      { x: this.XSize / 2, y: this.YSize / 2 }
    );
    frontLine.userData = { curveid: 'front', index: 0 } as UserData;

    const leftLine = new Line2d(
      { x: this.XSize / 2, y: this.YSize / 2 },
      { x: -this.XSize / 2, y: this.YSize / 2 }
    );
    leftLine.userData = { curveid: 'left', index: 0 } as UserData;

    const backLine = new Line2d(
      { x: -this.XSize / 2, y: this.YSize / 2 },
      { x: -this.XSize / 2, y: -this.YSize / 2 }
    );
    backLine.userData = { curveid: 'back', index: 0 } as UserData;

    if (applyTransform) {
      const transform = this.get2DTransform();
      rightLine.transform(transform);
      frontLine.transform(transform);
      leftLine.transform(transform);
      backLine.transform(transform);
    }

    return [[rightLine, frontLine, leftLine, backLine]];
  }

  /**
   * Get the left path
   */
  get leftPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const filtered = profile[0].filter(
      (line) => line.userData && (line.userData as UserData).curveid === 'left'
    );
    return filtered.length > 0 ? filtered[0] : undefined;
  }

  /**
   * Get the right path
   */
  get rightPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const filtered = profile[0].filter(
      (line) => line.userData && (line.userData as UserData).curveid === 'right'
    );
    return filtered.length > 0 ? filtered[0] : undefined;
  }

  newSelf(): NCustomizedSquareColumn {
    return new NCustomizedSquareColumn();
  }

  getIO(): NCustomizedSquareColumn_IO {
    return NCustomizedSquareColumn_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedSquareColumn, NCustomizedSquareColumn);

export { NCustomizedSquareColumn, NCustomizedSquareColumn_IO };