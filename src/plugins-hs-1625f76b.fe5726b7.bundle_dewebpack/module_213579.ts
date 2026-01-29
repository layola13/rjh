interface Content {
  contentType: ContentType;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface RequestManager {
  createRequest(type: string, args: [Content, boolean]): unknown;
}

abstract class CompositeRequest {
  protected mgr: RequestManager;
  
  protected append(request: unknown): void;
  
  abstract onCommit(): unknown;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class DeleteContentRequest extends CompositeRequest {
  private readonly _content: Content;
  private readonly _autoBuild: boolean;

  constructor(content: Content, autoBuild: boolean) {
    super();
    this._content = content;
    this._autoBuild = autoBuild;
  }

  onCommit(): unknown[] {
    const requestType = HSFPConstants.RequestType;
    const content = this._content;
    const contentType = content.contentType;
    let requestTypeValue = requestType.DeleteContent;

    if (content instanceof HSCore.Model.CornerWindow) {
      requestTypeValue = requestType.DeleteCornerWindow;
    } else if (content instanceof HSCore.Model.Group) {
      requestTypeValue = requestType.DeleteAssembly;
    } else if (content instanceof HSCore.Model.PAssembly) {
      requestTypeValue = requestType.DeletePAssembly;
    } else if (content instanceof HSCore.Model.NCustomizedParametricRoof) {
      requestTypeValue = requestType.DeleteRoof;
    } else if (
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedCeiling) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.ExtrusionCustomizedCeilingModel) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.ExtrusionCustomizedBackgroundWall) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.ExtrusionCustomizedPlatform) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedContent)
    ) {
      requestTypeValue = requestType.DeleteCustomizedModel;
    } else if (
      content instanceof HSCore.Model.Opening ||
      content instanceof HSCore.Model.ParametricOpening
    ) {
      requestTypeValue = requestType.DeleteNgmOpening;
    } else if (
      content instanceof HSCore.Model.DAssembly ||
      content instanceof HSCore.Model.DMolding ||
      content instanceof HSCore.Model.DContent
    ) {
      requestTypeValue = requestType.DeleteDAssembly;
    }

    this.append(this.mgr.createRequest(requestTypeValue, [content, this._autoBuild]));
    
    return super.onCommit();
  }

  getDescription(): string {
    return "删除物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default DeleteContentRequest;