interface UIConfig {
  context: Context;
  signalImportSucceeded: () => void;
}

interface Context {
  app: {
    floorplan: {
      selectionManager: SelectionManager;
    };
    signalDocumentOpened: Signal;
    designMetadata: {
      get(key: string): unknown;
    };
  };
}

interface PluginMap {
  [key: string]: Plugin;
}

interface Plugin {
  // Define plugin interface based on actual usage
}

interface SelectionManager {
  // Define selection manager interface
}

interface Signal {
  // Define signal interface
}

class ModuleValue {
  private welcomePlugin: Plugin;
  private _signalHook: SignalHook;
  
  constructor(
    context: Context,
    plugins: PluginMap,
    private signalImportSucceeded: () => void
  ) {
    D.UI.init({
      context,
      signalImportSucceeded: this.signalImportSucceeded
    });

    D.UI.selectionMgr = context.app.floorplan.selectionManager;

    this.welcomePlugin = plugins[HSFPConstants.PluginType.Welcome];

    const queryStrings = P.HSApp.Util.Url.getQueryStrings();
    
    if (queryStrings.assetId) {
      this._signalHook.listen(context.app.signalDocumentOpened, () => {
        const designId = context.app.designMetadata.get("designId");
        if (designId) {
          this.autoImportImageToFP();
        }
      });
    } else {
      this.autoImportImageToFP();
    }
  }

  private autoImportImageToFP(): void {
    // Implementation
  }
}

interface SignalHook {
  listen(signal: Signal, callback: () => void): void;
}

// Global namespaces (assuming these exist in the codebase)
declare namespace D {
  namespace UI {
    function init(config: UIConfig): void;
    let selectionMgr: SelectionManager;
  }
}

declare namespace P {
  namespace HSApp {
    namespace Util {
      namespace Url {
        function getQueryStrings(): Record<string, string>;
      }
    }
  }
}

declare namespace HSFPConstants {
  enum PluginType {
    Welcome = "Welcome"
  }
}