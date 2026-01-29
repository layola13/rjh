import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { MathAlg } from './MathAlg';
import { MiniImagePreviewCtrl } from './MiniImagePreviewCtrl';
import { ResourceManager } from './ResourceManager';

interface DisplayItem {
  isHighlight(): boolean;
  highlightOutlineMesh(highlight: boolean, immediate: boolean): void;
}

interface DisplayList {
  [id: string]: DisplayItem;
}

interface Point3D {
  equals(other: Point3D): boolean;
}

interface Curve3D {
  getStartPt(): Point3D;
  getEndPt(): Point3D;
}

interface TopoPather {
  from: number;
}

interface Material {
  seekId: string;
}

interface Metadata {
  seekId: string;
}

interface Molding {
  id: string;
  sweepPath: Curve3D[];
  parent: { id: string };
  XSize: number;
  YSize: number;
  material: Material;
  metadata: Metadata;
  topoPathers: TopoPather[];
}

interface Baseboard extends Molding {
  offset: number;
}

interface MouseEventData {
  button?: number;
  clientX?: number;
  clientY?: number;
}

interface ReceiveData {
  entity?: Molding;
  event?: MouseEventData;
}

interface TransactionRequest {
  getNewMolding(): Molding;
}

interface TransactionManager {
  createRequest(type: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Context {
  transManager: TransactionManager;
  cursorStatus: {
    setCurrentStatus(cursor: string): void;
  };
}

interface View3D {
  displayList?: DisplayList;
  context: Context;
}

interface App {
  getActive3DView(): View3D;
}

interface CommandManager {
  cancel(): void;
}

const DISTANCE_TOLERANCE = 1e-6;

/**
 * Command for connecting molding segments together.
 * Allows user to click on adjacent molding pieces to merge them into a single continuous molding.
 */
export class CmdConnectMolding extends HSApp.Cmd.Command {
  private app: App;
  private molding: Molding;
  private hoverMolding?: Molding;
  private miniImagePreviewCtrl?: MiniImagePreviewCtrl | null;
  private startPos: Point3D;
  private endPos: Point3D;
  private displayList: DisplayList;
  protected mgr!: CommandManager;
  protected context!: Context;

  constructor(molding: Molding) {
    super();
    this.molding = molding;
    this.app = HSApp.App.getApp();
    const view = this.app.getActive3DView();
    this.displayList = view.displayList ?? {};
    this.getMoldingPos();
  }

  /**
   * Extracts and stores the start and end positions of the molding sweep path.
   */
  private getMoldingPos(): void {
    const sweepPath = this.molding.sweepPath;
    this.startPos = sweepPath[0].getStartPt();
    this.endPos = sweepPath[sweepPath.length - 1].getEndPt();
  }

  onExecute(): void {
    this.updateViewCursor(`cursor: url(${HSConstants.Resources.svgs.cut_wall}) 0 0, auto;`);
  }

  onReceive(eventType: string, data: ReceiveData): boolean {
    const entity = data.entity;
    const event = data.event;
    let result = true;

    switch (eventType) {
      case 'click':
        if (event?.button === 0) {
          if (this.hoverMolding) {
            this.connectMolding(this.hoverMolding);
          }
          return false;
        } else if (event?.button === 2) {
          this.onESC();
          return false;
        }
        break;

      case 'mousemove':
        if (this.hoverMolding && entity?.id !== this.hoverMolding.id) {
          this.highlightOutlineMesh(this.hoverMolding, false, true);
        }

        if (entity?.id !== this.molding.id && this.canConnect(entity)) {
          this.highlightOutlineMesh(entity, true, true);
          this.hoverMolding = entity;
        } else {
          this.hoverMolding = undefined;
        }

        this.renderMiniImagePreview(data);
        break;

      default:
        result = super.onReceive(eventType, data);
    }

    return result;
  }

  /**
   * Highlights or unhighlights the outline mesh of a molding entity.
   */
  private highlightOutlineMesh(entity: Molding, highlight: boolean, immediate = false): void {
    const displayItem = this.displayList[entity.id];
    if (displayItem && displayItem.isHighlight() !== highlight) {
      displayItem.highlightOutlineMesh(highlight, immediate);
    }
  }

  /**
   * Checks if the given entity can be connected to the current molding.
   */
  private canConnect(entity?: Molding): boolean {
    if (!entity) {
      return false;
    }

    return (
      entity instanceof HSCore.Model.Molding &&
      entity.parent.id === this.molding.parent.id &&
      this.isBorderOn(entity) &&
      this.isSameAttributes(entity)
    );
  }

  /**
   * Checks if the entity's borders touch the current molding's borders.
   */
  private isBorderOn(entity: Molding): boolean {
    const sweepPath = entity.sweepPath;
    const entityStart = sweepPath[0].getStartPt();
    const entityEnd = sweepPath[sweepPath.length - 1].getEndPt();

    if (this.startPos.equals(entityEnd) || this.endPos.equals(entityStart)) {
      return true;
    }

    if (
      this.molding instanceof HSCore.Model.Baseboard &&
      entity instanceof HSCore.Model.Baseboard &&
      Math.abs(this.molding.offset - entity.offset) < DISTANCE_TOLERANCE
    ) {
      const moldingSweepPath = this.molding.sweepPath;

      for (const entityCurve of sweepPath) {
        for (const moldingCurve of moldingSweepPath) {
          const intersections = MathAlg.CalculateIntersect.curve3ds(entityCurve, moldingCurve);
          if (intersections.length > 0) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Checks if the entity has the same dimensions, material, and metadata as the current molding.
   */
  private isSameAttributes(entity: Molding): boolean {
    if (
      entity instanceof HSCore.Model.Baseboard &&
      this.molding instanceof HSCore.Model.Baseboard &&
      this.molding.offset !== entity.offset
    ) {
      return false;
    }

    return (
      this.molding.XSize === entity.XSize &&
      this.molding.YSize === entity.YSize &&
      this.molding.material.seekId === entity.material.seekId &&
      this.molding.metadata.seekId === entity.metadata.seekId
    );
  }

  /**
   * Executes the molding connection operation.
   */
  private connectMolding(targetMolding: Molding): void {
    const moldingsToConnect: Molding[] = [];

    if (this.molding.topoPathers[0].from < targetMolding.topoPathers[0].from) {
      moldingsToConnect.push(this.molding, targetMolding);
    } else {
      moldingsToConnect.push(targetMolding, this.molding);
    }

    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ConnectMolding,
      [moldingsToConnect]
    );
    transManager.commit(request);

    const newMolding = request.getNewMolding();
    this.molding = newMolding;
    this.hoverMolding = undefined;
    this.getMoldingPos();
    this.highlightOutlineMesh(this.molding, true, true);
  }

  /**
   * Creates the mini image preview controller.
   */
  private createMiniImagePreview(data: ReceiveData): void {
    this.destroyMiniImagePreview();
    this.miniImagePreviewCtrl = new MiniImagePreviewCtrl(data);
    this.miniImagePreviewCtrl.init();
  }

  /**
   * Renders the mini image preview at the mouse cursor position.
   */
  private renderMiniImagePreview(data: ReceiveData): boolean {
    if (!this.miniImagePreviewCtrl) {
      this.createMiniImagePreview(data);
    }

    if (this.miniImagePreviewCtrl && data.event) {
      this.miniImagePreviewCtrl.title = ResourceManager.getString(
        'plugin_leftmenu_molding_connect_mouse_tip'
      );

      const event = data.event;
      if (event.clientX && event.clientY) {
        const position = {
          x: event.clientX,
          y: event.clientY,
        };
        this.miniImagePreviewCtrl.render(position);
        return true;
      }
    }

    return false;
  }

  /**
   * Destroys the mini image preview controller.
   */
  private destroyMiniImagePreview(): void {
    if (this.miniImagePreviewCtrl) {
      this.miniImagePreviewCtrl.destroy();
      this.miniImagePreviewCtrl = null;
    }
  }

  onCleanup(): void {
    this.destroyMiniImagePreview();
    this.updateViewCursor(HSApp.View.CursorEnum.default);
    this.highlightOutlineMesh(this.molding, false, true);
  }

  onESC(): void {
    this.mgr.cancel();
  }

  /**
   * Updates the 3D view cursor style.
   */
  private updateViewCursor(cursor: string): void {
    const view = this.app.getActive3DView();
    view?.context.cursorStatus.setCurrentStatus(cursor);
  }

  getDescription(): string {
    return '拆分线条';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}