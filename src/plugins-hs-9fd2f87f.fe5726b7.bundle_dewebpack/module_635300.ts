import { HSApp } from './HSApp';

interface Entity {
  seekId: string;
  id: string;
}

interface TemplateEntity extends Entity {
  // Add other properties as needed
}

interface Layer {
  forEachContent(callback: (content: Entity) => void): void;
}

interface Scene {
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface FloorPlan {
  scene: Scene;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown): void;
}

interface Application {
  floorplan: FloorPlan;
  transManager: TransactionManager;
}

/**
 * Command to apply parameters to all corner windows
 */
export default class ApplyParamsToAllWindowCommand extends HSApp.Cmd.Command {
  private templateEntity?: TemplateEntity;
  private entities: Entity[];
  private transMgr: TransactionManager;

  constructor(templateEntity: TemplateEntity) {
    super();
    this.templateEntity = templateEntity;
    this.entities = [];
    this.transMgr = HSApp.App.getApp().transManager;
  }

  /**
   * Execute the command to apply parameters to all matching windows
   */
  onExecute(): void {
    if (!this.templateEntity) {
      return;
    }

    this.loadAllCornerWindowExcludeSelf();
    const request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ApplyParamsToAllWindow,
      [this.templateEntity, this.entities]
    );
    this.transMgr.commit(request);
  }

  /**
   * Load all corner windows with same seekId except the template itself
   */
  private loadAllCornerWindowExcludeSelf(): void {
    const app = HSApp.App.getApp();
    
    app.floorplan.scene.forEachLayer((layer: Layer) => {
      layer.forEachContent((content: Entity) => {
        if (
          this.templateEntity?.seekId === content.seekId &&
          this.templateEntity?.id !== content.id
        ) {
          this.entities.push(content);
        }
      });
    });
  }

  /**
   * Get command description
   */
  getDescription(): string {
    return "应用离地高度到所有参数化窗";
  }
}