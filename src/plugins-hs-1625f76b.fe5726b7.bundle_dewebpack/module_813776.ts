import { HSCore } from '../HSCore';
import { getTargetSize, calculateOffsetToKeepSnap } from '../utils/ResizeUtils';
import { ClipTaskIntergration } from '../integration/ClipTaskIntergration';

interface Size3D {
  x: number;
  y: number;
  z: number;
}

interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface BeginSizeData extends Size3D, Position3D {
  xposition: number;
  yposition: number;
  zposition: number;
}

interface TargetSize {
  x?: number;
  y?: number;
  z?: number;
}

interface SliderEventData {
  value?: number;
  type?: 'x' | 'y' | 'z';
}

interface TransactionSession {
  commit(): void;
  abort(): void;
}

interface TransactionManager {
  startSession(options: { undoRedo: boolean }): TransactionSession;
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown, mergePrevious?: boolean): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: ResizeCommand): void;
}

type ResizableContent = 
  | HSCore.Model.Content 
  | HSCore.Model.CustomizedModel 
  | HSCore.Model.SoftCloth 
  | HSCore.Model.CustomizedPMInstanceModel 
  | HSCore.Model.Opening
  | HSCore.Model.NCustomizedStructure
  | HSCore.Model.NCustomizedBeam
  | HSCore.Model.NCustomizedParametricModel
  | HSCore.Model.NCustomizedParametricStairs
  | HSCore.Model.NCPBackgroundWallBase;

type RequestCreator = (content: ResizableContent) => string;

export default class ResizeCommand extends HSApp.Cmd.Command {
  private _contents?: ResizableContent[];
  private _targetSize?: TargetSize;
  private _requestCreator?: RequestCreator;
  private _session?: TransactionSession;
  private _resizeType: 'x' | 'y' | 'z' | null = null;
  
  public output: ResizableContent[];
  public isMergePervious: boolean;
  public beginSizes!: Map<string, BeginSizeData>;
  
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  constructor(
    contents: ResizableContent[],
    targetSize: TargetSize,
    requestCreator: RequestCreator,
    mergePrevious?: boolean
  ) {
    super();
    
    this._contents = contents;
    this._targetSize = targetSize;
    this._requestCreator = requestCreator;
    this.output = this._contents;
    this.isMergePervious = mergePrevious !== false;
    this._resizeType = null;
    this._getBeginSize(contents);
  }

  private _getBeginSize(contents: ResizableContent[]): void {
    this.beginSizes = new Map();
    
    contents.forEach((content) => {
      if (content instanceof HSCore.Model.Content) {
        const sizeData: BeginSizeData = {
          x: content.XSize,
          y: content.YSize,
          z: content.ZSize,
          xposition: content.x,
          yposition: content.y,
          zposition: content.z
        };
        this.beginSizes.set(content.id, sizeData);
      }
    });
  }

  private _doResize(transManager: TransactionManager): void {
    if (!transManager || this._targetSize == null) {
      return;
    }

    const contents = this._contents;
    if (!contents) {
      return;
    }

    contents.forEach((content) => {
      if (content instanceof HSCore.Model.CustomizedModel) {
        content.dirtyGeometry();
      }
      
      if (content instanceof HSCore.Model.SoftCloth) {
        content.resizeRestoreSimulatedSoftCloth();
        content.dirtyGeometry();
      }

      const requestType = this._requestCreator!(content);
      const targetSize = getTargetSize(content, this._targetSize!);
      let offset: Position3D = { x: 0, y: 0, z: 0 };

      if (!(content instanceof HSCore.Model.CustomizedPMInstanceModel)) {
        offset = calculateOffsetToKeepSnap(content, targetSize);
      }

      const request = transManager.createRequest(requestType, [content, targetSize, offset]);
      transManager.commit(request, this.isMergePervious);

      if (content instanceof HSCore.Model.Opening) {
        content.refreshBothWallFaceGeometry();
      }
    });
  }

  public onExecute(): void {
    const transManager = this.context.transManager;
    this._session = transManager.startSession({ undoRedo: false });

    if (this._targetSize == null) {
      this._contents?.forEach((content) => {
        if (content.isSimulated) {
          const request = transManager.createRequest(
            HSFPConstants.RequestType.RestoreSoftCloth,
            [content]
          );
          transManager.commit(request);
        }
      });
    } else {
      this._doResize(transManager);
    }
  }

  public canUndoRedo(): boolean {
    return false;
  }

  public onCleanup(): void {
    if (this._session) {
      this._session.abort();
    }
    
    this._session = undefined;
    this._contents = undefined;
    this._targetSize = undefined;
    this._requestCreator = undefined;
  }

  public onComplete(): void {
    if (this._session) {
      this._session.commit();
    }

    this._contents?.forEach((content) => {
      if (
        content instanceof HSCore.Model.NCustomizedStructure ||
        content instanceof HSCore.Model.NCustomizedBeam
      ) {
        content.rebuild();
      }
    });
  }

  public onReceive(eventType: string, data?: SliderEventData): void {
    const value = data?.value;
    const type = data?.type;

    switch (eventType) {
      case 'sliderdragmove':
        if (value == null || type == null) {
          return;
        }
        
        if (!this._targetSize) {
          this._targetSize = {};
        }
        
        this._targetSize[type] = value;
        this._resizeType = type;

        const transManager = this.context.transManager;
        this._doResize(transManager);
        break;

      case 'sliderdragend':
        this.resizeParametricModel(data);
        this._session!.commit();
        this.mgr.complete(this);
        break;
    }
  }

  public getDescription(): string {
    let dimensionLabel = '尺寸';

    switch (this._resizeType) {
      case 'x':
        dimensionLabel = '长度';
        break;
      case 'y':
        dimensionLabel = '宽度';
        break;
      case 'z':
        dimensionLabel = '高度';
        break;
    }

    return `编辑模型${dimensionLabel}`;
  }

  private resizeParametricModel(eventData?: SliderEventData): void {
    const contents = this._contents;
    if (!contents) {
      return;
    }

    const transManager = this.context.transManager;

    contents.forEach((content) => {
      if (!(content instanceof HSCore.Model.NCustomizedParametricModel)) {
        return;
      }

      const beginSize = this.beginSizes.get(content.id);
      if (!beginSize) {
        return;
      }

      let request = transManager.createRequest(
        HSFPConstants.RequestType.ResizeNCustomizedParametricModel,
        [content, { x: beginSize.x, y: beginSize.y, z: beginSize.z }]
      );

      if (content instanceof HSCore.Model.NCustomizedParametricStairs) {
        request = transManager.createRequest(
          HSFPConstants.RequestType.ResizeNCustomizedParametricStairs,
          [
            content,
            {
              x: beginSize.xposition,
              y: beginSize.yposition,
              z: beginSize.zposition
            },
            eventData
          ]
        );
      }

      if (content instanceof HSCore.Model.NCPBackgroundWallBase) {
        const clipTaskIntegration = ClipTaskIntergration.getInstance();
        clipTaskIntegration.listenClipTaskSignal();
        clipTaskIntegration.runClipTaskDefer(
          () => transManager.commit(request, true),
          clipTaskIntegration.isNeedShowUI(content)
        );
      } else {
        transManager.commit(request, true);
      }
    });
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}