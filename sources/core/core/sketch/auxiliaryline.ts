import { Line2d } from './Line2d';
import { EntityField } from './decorators';
import { Entity, Entity_IO } from './Entity';

export const AuxiliaryLineFlagEnum = {
  active: 256
} as const;

export class AuxiliaryLine_IO extends Entity_IO {
  dump(
    entity: AuxiliaryLine,
    callback?: (result: unknown, entity: AuxiliaryLine) => void,
    includeGeometry: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown {
    const result = super.dump(entity, undefined, includeGeometry, options);
    (result as any)[0].line = entity.line.dump();
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(
    entity: AuxiliaryLine,
    data: any,
    loader: any
  ): void {
    super.load(entity, data, loader);
    entity.line = Line2d.load(data.line);
  }
}

export class AuxiliaryLine extends Entity {
  @EntityField()
  line: Line2d;

  constructor(id: string = "", parent?: any) {
    super(id, parent);
    this.line = new Line2d();
  }

  static create(sourceLine?: Line2d): AuxiliaryLine {
    const auxiliaryLine = new AuxiliaryLine();
    
    if (sourceLine) {
      auxiliaryLine.line = sourceLine.clone();
      auxiliaryLine.line.extendDouble(100);
    }
    
    return auxiliaryLine;
  }

  mirror(transformation: { matrix3: any }): void {
    this.line = this.line.clone().transformed(transformation.matrix3);
    this.dirtyGeometry();
  }

  translate(offset: any): void {
    this.line = this.line.clone().translate(offset);
    this.dirtyGeometry();
  }

  getIO(): AuxiliaryLine_IO {
    return AuxiliaryLine_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.AuxiliaryLine, AuxiliaryLine);