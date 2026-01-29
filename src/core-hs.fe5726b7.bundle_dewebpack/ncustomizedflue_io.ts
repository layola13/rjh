import { Line2d } from './geometry';
import { NCustomizedStructre_IO, NCustomizedStructure, StructureMode } from './customized-structure';
import { Entity } from './entity';

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

type TransformCallback = (dumped: unknown, entity: NCustomizedFlue) => void;

export class NCustomizedFlue_IO extends NCustomizedStructre_IO {
  private static _instance: NCustomizedFlue_IO;

  public static instance(): NCustomizedFlue_IO {
    if (!this._instance) {
      this._instance = new NCustomizedFlue_IO();
    }
    return this._instance;
  }

  public dump(
    entity: NCustomizedFlue,
    callback?: TransformCallback,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const result = super.dump(entity, undefined, includeDefaults, options);
    if (callback) {
      callback(result, entity);
    }
    return result;
  }

  public load(
    data: unknown,
    entity: NCustomizedFlue,
    options: LoadOptions = {}
  ): void {
    super.load(data, entity, options);
  }
}

export class NCustomizedFlue extends NCustomizedStructure {
  public structureMode: StructureMode;

  constructor(id: string = "") {
    super(id);
    this.structureMode = StructureMode.wallpart;
  }

  public initByMeta(meta: unknown): void {
    super.initByMeta(meta);
  }

  public get path(): Line2d[] {
    const profile = this.calcProfile();
    return profile ? profile[0] : [];
  }

  public get height3d(): number {
    return this.ZLength * this.ZScale;
  }

  public set height3d(value: number) {
    this.ZLength = value / this.ZScale;
  }

  public get curve(): Line2d {
    const line = new Line2d(
      { x: -this.XSize / 2, y: 0 },
      { x: this.XSize / 2, y: 0 }
    );
    const transform = this.get2DTransform();
    line.transform(transform);
    return line;
  }

  public setStructureMode(mode: StructureMode): void {
    // Implementation placeholder
  }

  public calcProfile(applyTransform: boolean = true): Line2d[][] | undefined {
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

  public get leftPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const leftLines = profile[0].filter(
      (line) => line.userData && (line.userData as UserData).curveid === 'left'
    );
    return leftLines.length > 0 ? leftLines[0] : undefined;
  }

  public get rightPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const rightLines = profile[0].filter(
      (line) => line.userData && (line.userData as UserData).curveid === 'right'
    );
    return rightLines.length > 0 ? rightLines[0] : undefined;
  }

  public newSelf(): NCustomizedFlue {
    return new NCustomizedFlue();
  }

  public getIO(): NCustomizedFlue_IO {
    return NCustomizedFlue_IO.instance();
  }
}

declare const HSConstants: {
  ModelClass: {
    NCustomizedFlue: string;
  };
};

Entity.registerClass(HSConstants.ModelClass.NCustomizedFlue, NCustomizedFlue);