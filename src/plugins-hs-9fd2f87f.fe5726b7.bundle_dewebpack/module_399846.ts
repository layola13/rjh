interface AppParams {
  debug?: boolean;
}

interface App {
  selectionManager: SelectionManager;
  floorplan: Floorplan;
  appParams: AppParams;
  hotkey: HotkeyManager;
}

interface SelectionManager {
  unselectAll(): void;
}

interface Floorplan {
  forEachContent(callback: (content: unknown) => void): void;
}

interface HotkeyManager {
  registerHotkey(config: { win: string; mac: string }, callback: () => void): void;
}

interface PluginMetadata {
  name: string;
  description: string;
}

interface PluginActivationEvent {
  app: App;
}

abstract class IPlugin {
  constructor(metadata: PluginMetadata) {}
  abstract onActive(event: PluginActivationEvent): void;
  abstract onDeactive(): void;
}

class AssemblyBuilder {
  buildAssemblyData(contents: unknown[]): string {
    return JSON.stringify(contents);
  }
}

class ExportAssemblyPlugin extends IPlugin {
  private builder: AssemblyBuilder;

  constructor() {
    super({
      name: "File drop plugin",
      description: "Drag and drop a design data json into canvas and open the given disign"
    });
    this.builder = new AssemblyBuilder();
  }

  exportAssembly(): void {
    const app = HSApp.App.getApp() as App;
    app.selectionManager.unselectAll();

    const contents: unknown[] = [];
    app.floorplan.forEachContent((content: unknown) => {
      if (!contents.includes(content)) {
        contents.push(content);
      }
    });

    const assemblyData = this.builder.buildAssemblyData(contents);
    const fileName = `assembly-${new Date().toUTCString()}.json`;

    if (fileName) {
      const blob = new Blob([assemblyData], {
        type: `text/plain;charset=${document.characterSet}`
      });
      saveAs(blob, fileName);
    }
  }

  onActive(event: PluginActivationEvent): void {
    super.onActive(event);

    if (event.app.appParams.debug) {
      event.app.hotkey.registerHotkey(
        {
          win: "ctrl+alt+e",
          mac: "meta+alt+e"
        },
        this.exportAssembly.bind(this)
      );
    }
  }

  onDeactive(): void {}
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Plugin: {
    IPlugin: typeof IPlugin;
    registerPlugin(name: string, pluginClass: typeof ExportAssemblyPlugin): void;
  };
};

declare function saveAs(blob: Blob, filename: string): void;

HSApp.Plugin.registerPlugin("hsw.plugin.exportassembly.Plugin", ExportAssemblyPlugin);