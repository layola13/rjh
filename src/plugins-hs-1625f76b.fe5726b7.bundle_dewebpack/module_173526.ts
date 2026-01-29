class FlipOpeningCommand extends HSApp.Cmd.Command {
  private opening: any;
  private readonly defaultSwingOrder: Map<number, number>;
  private readonly AdoubeSwingOrderMap: Map<number, number>;
  private readonly doubeSwingOrderMap: Map<number, number>;
  private readonly swingAnchorMap: Map<number, [number, number]>;

  constructor(opening: any) {
    super();
    this.opening = opening;
    
    this.defaultSwingOrder = new Map([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0]
    ]);
    
    this.AdoubeSwingOrderMap = new Map([
      [0, 3],
      [3, 2],
      [2, 1],
      [1, 0]
    ]);
    
    this.doubeSwingOrderMap = new Map([
      [0, 1],
      [1, 0],
      [2, 3],
      [3, 2]
    ]);
    
    this.swingAnchorMap = new Map([
      [0, [-1, 1]],
      [1, [1, -1]],
      [2, [-1, 1]],
      [3, [1, -1]]
    ]);
  }

  onExecute(): void {
    if (!this.opening) {
      this.mgr.cancel(this);
      return;
    }

    let swingOrder = this.defaultSwingOrder;

    if (
      this.opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.AdoubleSwingDoor) ||
      this.opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.FoldingDoor)
    ) {
      swingOrder = this.AdoubeSwingOrderMap;
    } else if (this.opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.DoubleSwingDoor)) {
      swingOrder = this.doubeSwingOrderMap;
    }

    const targetSwing = swingOrder.get(this.opening.swing);
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.FlipOpeningRequest,
      [this.opening, targetSwing]
    );
    
    transManager.commit(request);
    this.mgr.complete(this);
  }

  getDescription(): string {
    return "翻转操作";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default FlipOpeningCommand;