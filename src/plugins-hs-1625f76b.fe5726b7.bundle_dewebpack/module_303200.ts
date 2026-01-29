interface MoveSpec {
  x: number;
  y: number;
  z: number;
  rotation: number;
  host: unknown;
}

interface Content {
  x: number;
  y: number;
  z: number;
  rotation: number;
  getHost(): unknown;
  assignTo(host: unknown): void;
  dirtyGeometry?(): void;
  hostFace?: {
    dirtyGeometry(): void;
  };
  refreshFloorGeometry?(): void;
  refreshBothWallFaceGeometry?(): void;
}

interface ComposeEvent {
  type: string;
  data: Content[][];
}

/**
 * 移动内容请求事务
 * 用于处理模型移动操作的撤销/重做功能
 */
export default class MoveContentRequest extends HSCore.Transaction.Common.StateRequest {
  private _contents: Content[];
  private _moveSpecs: MoveSpec[];

  constructor(contents: Content[], moveSpecs: MoveSpec[]) {
    super();
    this._contents = contents;

    for (let i = 0; i < contents.length; i++) {
      const spec = moveSpecs[i];
      const content = contents[i];

      ['x', 'y', 'z', 'rotation'].forEach((property: string) => {
        if (spec[property as keyof MoveSpec] === undefined) {
          spec[property as keyof MoveSpec] = content[property as keyof Content] as never;
        }
      });

      if (spec.host === undefined) {
        spec.host = content.getHost();
      }
    }

    this._moveSpecs = moveSpecs;
  }

  onCommit(): void {
    this._applyMoveSpec();
  }

  onUndo(): void {
    this._applyMoveSpec();
    this.updateGeometry();
  }

  onRedo(): void {
    this._applyMoveSpec();
    this.updateGeometry();
  }

  onCompose(event: ComposeEvent): boolean {
    return (
      event.type === HSFPConstants.RequestType.MoveContent &&
      event.data[0].every((content: Content) =>
        this._contents.some((thisContent: Content) => content === thisContent)
      )
    );
  }

  private _applyMoveSpec(): void {
    const previousSpecs: MoveSpec[] = [];

    this._contents.forEach((content: Content) => {
      previousSpecs.push({
        x: content.x,
        y: content.y,
        z: content.z,
        rotation: content.rotation,
        host: content.getHost()
      });
    });

    for (let i = 0; i < this._contents.length; i++) {
      const spec = this._moveSpecs[i];
      const content = this._contents[i];

      content.x = spec.x;
      content.y = spec.y;
      content.z = spec.z;
      content.rotation = spec.rotation;
      content.assignTo(spec.host);
    }

    this._moveSpecs = previousSpecs;
  }

  updateGeometry(): void {
    this._contents.forEach((content: Content) => {
      if (HSApp.Util.Opening.isOpening(content)) {
        content.dirtyGeometry?.();
        content.hostFace?.dirtyGeometry();
        content.refreshFloorGeometry?.();
        content.refreshBothWallFaceGeometry?.();
      }
    });
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "移动模型";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}