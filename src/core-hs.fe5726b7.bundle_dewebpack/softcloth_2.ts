import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { Signal } from './Signal';
import { nearlyEquals } from './MathUtils';
import { isValidNumber, EntityField } from './Utils';

interface SimulatedContent {
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  jid: string;
  model3d: string;
  modelPosUrl: string;
}

interface SimulatedMeta {
  model3d?: string;
  [key: string]: unknown;
}

interface MetaData {
  id: string;
  seekId: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  model3d: string;
}

interface EntityMetadata {
  contentType?: string;
  [key: string]: unknown;
}

export class SoftCloth_IO extends Content_IO {
  private static _instance?: SoftCloth_IO;

  public static instance(): SoftCloth_IO {
    if (!SoftCloth_IO._instance) {
      SoftCloth_IO._instance = new SoftCloth_IO();
    }
    return SoftCloth_IO._instance;
  }

  public dump(
    entity: SoftCloth,
    callback?: (data: unknown[], entity: SoftCloth) => void,
    includeChildren: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const dumpResult = super.dump(entity, undefined, includeChildren, options);
    const entityData = dumpResult[0] as Record<string, unknown>;

    entity.updateSimulationMeta();
    entityData.simulatedContent = { ...entity.simulatedContent };

    if (callback) {
      callback(dumpResult, entity);
    }

    return dumpResult;
  }

  public load(
    entity: SoftCloth,
    data: Record<string, unknown>,
    context: unknown
  ): void {
    super.load(entity, data, context);
    entity.setSimulationContent(data.simulatedContent as SimulatedContent);
    entity.simulatedMeta = entity.dealMeta(
      (data.simulatedContent as SimulatedContent).jid,
      context
    );
  }
}

function SimulatedFieldDecorator() {
  return (target: unknown, propertyKey: string): void => {
    const descriptor = {
      get(this: SoftCloth): number {
        if (this.isSimulated && isValidNumber(this.simulatedContent[propertyKey as keyof SimulatedContent])) {
          return Number(this.simulatedContent[propertyKey as keyof SimulatedContent]);
        }
        return this[`__${propertyKey}` as keyof SoftCloth] as number;
      },

      partialSet(this: SoftCloth, value: number): void {
        this._setFieldValue(propertyKey, value);
      },

      equals(this: SoftCloth, value: number): boolean {
        return this._fieldValueEquals(propertyKey, value);
      }
    };

    EntityField(descriptor)(target, propertyKey);
  };
}

export class SoftCloth extends Content {
  public hard: number = 1;
  public signalSimulatedContentChanged: Signal<SoftCloth>;
  public simulatedContent: SimulatedContent;
  public simulatedMeta?: SimulatedMeta;

  private __x?: number;
  private __y?: number;
  private __z?: number;
  private __XRotation?: number;
  private __YRotation?: number;
  private __ZRotation?: number;
  private __XScale?: number;
  private __YScale?: number;
  private __ZScale?: number;
  private __XLength?: number;
  private __YLength?: number;
  private __ZLength?: number;

  @SimulatedFieldDecorator()
  public x!: number;

  @SimulatedFieldDecorator()
  public y!: number;

  @SimulatedFieldDecorator()
  public z!: number;

  @SimulatedFieldDecorator()
  public XRotation!: number;

  @SimulatedFieldDecorator()
  public YRotation!: number;

  @SimulatedFieldDecorator()
  public ZRotation!: number;

  @SimulatedFieldDecorator()
  public XScale!: number;

  @SimulatedFieldDecorator()
  public YScale!: number;

  @SimulatedFieldDecorator()
  public ZScale!: number;

  @SimulatedFieldDecorator()
  public XLength!: number;

  @SimulatedFieldDecorator()
  public YLength!: number;

  @SimulatedFieldDecorator()
  public ZLength!: number;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
    this.hard = 1;
    this.signalSimulatedContentChanged = new Signal(this);
    this.simulatedContent = {
      x: 0,
      y: 0,
      z: 0,
      XLength: 1,
      YLength: 1,
      ZLength: 1,
      XScale: 1,
      YScale: 1,
      ZScale: 1,
      XRotation: 0,
      YRotation: 0,
      ZRotation: 0,
      jid: "",
      model3d: "",
      modelPosUrl: ""
    };
  }

  public static create(metadata: EntityMetadata | null): SoftCloth | null {
    if (!metadata || !metadata.contentType) {
      log.error(
        `SoftCloth.create: invalid input metadata '${JSON.stringify(metadata)}'.`,
        "HSCore.CreateEntity.Error"
      );
      return null;
    }

    const softCloth = new SoftCloth();
    if (metadata) {
      softCloth.initByMeta(metadata);
      softCloth.setDefaultMaterial();
    }

    return softCloth;
  }

  public get isSimulated(): boolean {
    return !!this.simulatedContent && !!this.simulatedContent.jid;
  }

  public get XSize(): number {
    const length = this.isSimulated ? this.simulatedContent.XLength : this.XLength;
    return length * this.XScale;
  }

  public get YSize(): number {
    const length = this.isSimulated ? this.simulatedContent.YLength : this.YLength;
    return length * this.YScale;
  }

  public get ZSize(): number {
    const length = this.isSimulated ? this.simulatedContent.ZLength : this.ZLength;
    return length * this.ZScale;
  }

  public _setFieldValue(fieldName: string, value: number): void {
    let actualValue = value;

    if (this.isSimulated) {
      const simContent = this.simulatedContent;
      const delta = value - simContent[fieldName as keyof SimulatedContent];
      simContent[fieldName as keyof SimulatedContent] = value as never;
      actualValue = (this[`__${fieldName}` as keyof SoftCloth] as number) + delta;
    }

    (this as Record<string, unknown>)[`__${fieldName}`] = actualValue;
  }

  public _fieldValueEquals(fieldName: string, value: number): boolean {
    let actualValue = value;

    if (this.isSimulated) {
      const simContent = this.simulatedContent;
      const delta = value - (simContent[fieldName as keyof SimulatedContent] as number);
      simContent[fieldName as keyof SimulatedContent] = value as never;
      actualValue = (this[`__${fieldName}` as keyof SoftCloth] as number) + delta;
    }

    return nearlyEquals(this[`__${fieldName}` as keyof SoftCloth] as number, actualValue);
  }

  public restoreSoftCloth(): void {
    if (this.isSimulated) {
      this.setSimulationContent({
        x: this.x,
        y: this.y,
        z: this.z,
        XScale: this.XScale,
        YScale: this.YScale,
        ZScale: this.ZScale,
        XRotation: this.XRotation,
        YRotation: this.YRotation,
        ZRotation: this.ZRotation,
        XLength: this.XLength,
        YLength: this.YLength,
        ZLength: this.ZLength,
        jid: "",
        model3d: "",
        modelPosUrl: ""
      });
    }

    this.forEachContent((content: Content) => {
      content.assignTo(null);
    });
  }

  public resizeRestoreSimulatedSoftCloth(): void {
    if (this.isSimulated) {
      this.setSimulationContent({
        x: this.x,
        y: this.y,
        z: this.z,
        XRotation: this.XRotation,
        YRotation: this.YRotation,
        ZRotation: this.ZRotation,
        XLength: this.XLength,
        YLength: this.YLength,
        ZLength: this.ZLength,
        jid: "",
        model3d: "",
        modelPosUrl: ""
      });
    }

    this.forEachContent((content: Content) => {
      this.removeContent(content.id);
      content.assignTo(null);
    });
  }

  public setSimulationContent(content: Partial<SimulatedContent> | undefined): void {
    if (!content) return;

    const simContent = this.simulatedContent;
    simContent.x = content.x ?? simContent.x;
    simContent.y = content.y ?? simContent.y;
    simContent.z = content.z ?? simContent.z;
    simContent.XScale = content.XScale ?? simContent.XScale;
    simContent.YScale = content.YScale ?? simContent.YScale;
    simContent.ZScale = content.ZScale ?? simContent.ZScale;
    simContent.XRotation = content.XRotation ?? simContent.XRotation;
    simContent.YRotation = content.YRotation ?? simContent.YRotation;
    simContent.ZRotation = content.ZRotation ?? simContent.ZRotation;
    simContent.XLength = content.XLength ?? simContent.XLength;
    simContent.YLength = content.YLength ?? simContent.YLength;
    simContent.ZLength = content.ZLength ?? simContent.ZLength;
    simContent.jid = content.jid ?? simContent.jid;
    simContent.model3d = content.model3d ?? simContent.model3d;
    simContent.modelPosUrl = content.modelPosUrl ?? simContent.modelPosUrl;

    this.signalSimulatedContentChanged.dispatch();
    this.dirtyGeometry();
  }

  public updateSimulationMeta(): void {
    if (!this.isSimulated) return;

    const meta = this.simulatedMeta;
    if (meta?.model3d) {
      this.simulatedContent.model3d = meta.model3d;
    }
  }

  public getRelatedMetaDatas(): MetaData[] {
    if (!this.isSimulated) return [];

    const simContent = this.simulatedContent;
    return [{
      id: simContent.jid,
      seekId: simContent.jid,
      XLength: simContent.XLength,
      YLength: simContent.YLength,
      ZLength: simContent.ZLength,
      model3d: simContent.model3d
    }];
  }

  public moveAlongAxis(axis: unknown, distance: number): void {
    super.moveAlongAxis(axis, distance);
    this.forEachContent(function(content: Content) {
      content.moveAlongAxis(axis, distance);
    }, this);
  }

  public rotateAround(pivot: { x: number; y: number }, angle: number): void {
    if (!this.isSimulated) {
      super.rotateAround(pivot, angle);
      return;
    }

    const rotatedPoint = HSCore.Util.Math.rotatePointCW(pivot, this.simulatedContent, angle);
    this.ZRotation = (this.simulatedContent.ZRotation + angle) % 360;
    this.x = rotatedPoint.x;
    this.y = rotatedPoint.y;
  }

  public getIO(): SoftCloth_IO {
    return SoftCloth_IO.instance();
  }

  public destroy(): void {
    if (this._disposed) return;

    this.signalSimulatedContentChanged.dispose();
    (this.signalSimulatedContentChanged as unknown) = undefined;
    super.destroy();
  }

  public dealMeta(jid: string, context: unknown): SimulatedMeta | undefined {
    return undefined;
  }

  public initByMeta(metadata: EntityMetadata): void {}

  public setDefaultMaterial(): void {}

  public forEachContent(callback: (content: Content) => void, context?: unknown): void {}

  public removeContent(id: string): void {}

  public dirtyGeometry(): void {}

  protected _disposed: boolean = false;
}

Entity.registerClass(HSConstants.ModelClass.NgSoftCloth, SoftCloth);

export { XScale, YScale, ZScale, XRotation, YRotation, ZRotation, XLength, YLength, ZLength };