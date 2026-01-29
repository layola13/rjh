import { IPlugin } from './IPlugin';
import { FileOpener } from './FileOpener';

interface PluginMetadata {
  name: string;
  description: string;
}

interface PluginContext {
  app: {
    appParams: {
      debug: boolean;
    };
    hotkey: {
      registerHotkey(keys: HotkeyConfig, callback: () => void): void;
    };
  };
}

interface HotkeyConfig {
  win: string;
  mac: string;
}

class FileDropPlugin extends IPlugin {
  private opener: FileOpener;

  constructor() {
    super({
      name: "File drop plugin",
      description: "Drag and drop a design data json into canvas and open the given design"
    });
    
    this.opener = new FileOpener();
  }

  async loadLocalfile(): Promise<void> {
    const files = await HSApp.Util.File.pick(".json");
    const selectedFile = files[0];
    this.opener.loadJSON(selectedFile);
  }

  onActive(context: PluginContext): void {
    super.onActive(context);
    
    this.opener.register();
    
    if (context.app.appParams.debug) {
      context.app.hotkey.registerHotkey(
        {
          win: "ctrl+alt+o",
          mac: "meta+alt+o"
        },
        this.loadLocalfile.bind(this)
      );
    }
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.filedrop.Plugin", FileDropPlugin);