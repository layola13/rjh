abstract class Command {
  protected mgr: any;
}

interface TransactionManager {
  createRequest(requestType: string, args: any[]): any;
  commit(request: any): void;
}

interface Context3d {
  transManager: TransactionManager;
}

interface Layer3d {
  // Add specific layer properties as needed
}

declare const HSFPConstants: {
  RequestType: {
    ChangeLayerVisibility: string;
  };
};

/**
 * Command to change layer visibility in 3D view
 */
export class CmdChangeLayerVisibility3d extends Command {
  private readonly context: Context3d;
  private readonly layer: Layer3d;
  private readonly visible: boolean;
  private readonly singleLayerMode: boolean;
  private _request: any;

  /**
   * @param context - The 3D context
   * @param layer - The layer to change visibility
   * @param visible - Whether the layer should be visible (default: true)
   * @param singleLayerMode - Whether to use single layer mode (default: false)
   */
  constructor(
    context: Context3d,
    layer: Layer3d,
    visible: boolean = true,
    singleLayerMode: boolean = false
  ) {
    super();
    this.context = context;
    this.layer = layer;
    this.visible = visible;
    this.singleLayerMode = singleLayerMode;
  }

  onExecute(): void {
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ChangeLayerVisibility,
      [this.layer, this.visible, this.singleLayerMode]
    );
    this.context.transManager.commit(this._request);
    this.mgr.complete(this);
  }

  onCleanup(): void {
    // Cleanup logic if needed
  }

  canUndoRedo(): boolean {
    return true;
  }
}