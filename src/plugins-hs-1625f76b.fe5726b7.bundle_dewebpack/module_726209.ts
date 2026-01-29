interface Content {
  host?: Content;
  getHost(): Content | null;
  assignTo(host: Content): void;
  getProxyObject(): ProxyObject | null;
}

interface ProxyObject {
  removeFromFloorplan(content: Content): void;
  updateCounterTop(content: Content): void;
}

interface ContentSpec {
  // Define spec structure based on your domain
  [key: string]: unknown;
}

declare const HSCore: {
  Util: {
    Content: {
      removeContent(content: Content): ContentSpec;
    };
  };
  Model: {
    Content: new (...args: unknown[]) => Content;
  };
  Transaction: {
    Common: {
      StateRequest: new (...args: unknown[]) => StateRequest;
    };
  };
};

declare const HSApp: {
  Util: {
    Content: {
      isCustomModel(content: Content): boolean;
    };
  };
};

declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
  };
};

abstract class StateRequest {
  protected tryCreateEntityProxyUndoRedoObject(entity: Content): void {
    // Base implementation
  }
}

export default class DeleteContentTransaction extends StateRequest {
  private _content: Content;
  private _contentHost: Content | null;
  private _spec?: ContentSpec;

  constructor(content: Content) {
    super();
    this._content = content;
    this._contentHost = this._content?.getHost() ?? null;
  }

  onCommit(): Content {
    const content = this._content;
    const host = content.host;

    this.tryCreateEntityProxyUndoRedoObject(content);

    const proxyObject = content.getProxyObject();
    if (proxyObject) {
      proxyObject.removeFromFloorplan(content);
    } else {
      this._spec = HSCore.Util.Content.removeContent(content);
    }

    if (host && HSApp.Util.Content.isCustomModel(host) && host instanceof HSCore.Model.Content) {
      if (HSApp.Util.Content.isCustomModel(content) && proxyObject) {
        proxyObject.updateCounterTop(host);
      } else {
        this.tryCreateEntityProxyUndoRedoObject(host);
        const hostProxyObject = host.getProxyObject();
        hostProxyObject?.updateCounterTop(host);
      }
    }

    super.onCommit?.();
    return this._content;
  }

  onUndo(): void {
    super.onUndo?.();

    if (
      this._content &&
      this._contentHost &&
      this._content.getHost() !== this._contentHost
    ) {
      this._content.assignTo(this._contentHost);
    }
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "删除模型";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}