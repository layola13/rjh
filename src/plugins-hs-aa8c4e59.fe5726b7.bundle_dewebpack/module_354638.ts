import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { CmdCreateAuxiliaryLine, CmdRemoveAuxiliaryLines } from './commands';
import { CreateAuxiliaryLineRequest, RemoveAuxiliaryLinesRequest } from './requests';

/**
 * Auxiliary line plugin for handling auxiliary lines in the floor plan
 */
class AuxiliaryLinePlugin extends HSApp.Plugin.IPlugin {
  private _signalHook?: HSCore.Util.SignalHook;

  constructor() {
    super({
      name: "Auxiliary line plugin",
      description: "auxiliary line handler",
      dependencies: [HSFPConstants.PluginType.Toolbar]
    });
  }

  /**
   * Called when the plugin is activated
   * @param context - The plugin context containing app instance
   */
  onActive(context: HSApp.Plugin.IPluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.CreateAuxiliaryLine, CmdCreateAuxiliaryLine],
      [HSFPConstants.CommandType.RemoveAuxiliaryLines, CmdRemoveAuxiliaryLines]
    ]);

    context.app.transManager.register([
      [HSFPConstants.RequestType.CreateAuxiliaryLine, CreateAuxiliaryLineRequest],
      [HSFPConstants.RequestType.RemoveAuxiliaryLines, RemoveAuxiliaryLinesRequest]
    ]);

    this._signalHook = new HSCore.Util.SignalHook(this);
    
    this._signalHook.listen(
      context.app.signalEnvironmentActivated,
      (signalData: HSCore.Signal.ISignalData) => {
        const auxiliaryLines = Object.values(
          context.app.floorplan.scene.activeLayer.auxiliaryLines
        );

        auxiliaryLines.forEach((auxiliaryLine: HSCore.Model.Entity) => {
          if (signalData.data.newEnvironmentId === HSFPConstants.Environment.Default) {
            auxiliaryLine.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
          } else {
            auxiliaryLine.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
          }
          auxiliaryLine.dirty();
        });
      }
    );
  }

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void {
    this._signalHook?.unlistenAll();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.AuxiliaryLine,
  AuxiliaryLinePlugin,
  () => {}
);