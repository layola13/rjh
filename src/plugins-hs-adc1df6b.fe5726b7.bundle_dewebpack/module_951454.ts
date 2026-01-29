import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import MoveOpeningHandler from './MoveOpeningHandler';
import MoveOpeningCommand from './MoveOpeningCommand';
import EditParametricOpeningCommand from './EditParametricOpeningCommand';
import { ChangeParametricOpeningMetaAdapter } from './ChangeParametricOpeningMetaAdapter';
import EditParametricOpeningHoleCommand from './EditParametricOpeningHoleCommand';
import { MoveOpeningRequest } from './MoveOpeningRequest';
import EditParametricOpeningRequest from './EditParametricOpeningRequest';
import AddParametricOpeningRequest from './AddParametricOpeningRequest';
import { AddOpeningRequest } from './AddOpeningRequest';
import { ParametricopeingCommandType, ParametricopeingRequestType } from './ParametricOpeningConstants';
import EditParametricOpeningHoleRequest from './EditParametricOpeningHoleRequest';
import { CmdRotateHole } from './CmdRotateHole';
import { RotateHoleRequest } from './RotateHoleRequest';
import { MoveRoofOpeningRequest } from './MoveRoofOpeningRequest';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  app: HSApp.Application;
}

interface PropertyBarPlugin {
  signalPopulatePropertyBar: HSCore.Util.Signal<PropertyBarEvent>;
}

interface PropertyBarEvent {
  target: unknown;
  data: unknown;
}

interface PluginMap {
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
  [key: string]: unknown;
}

/**
 * Customized Parametric Modeling Plugin
 * Supports parametric opening modeling with contextual tools and property bar integration
 */
class ParametricOpeningPlugin extends HSApp.Plugin.IPlugin {
  private signalHook: HSCore.Util.SignalHook;
  private propertyBarPlugin?: PropertyBarPlugin;
  private handler?: MoveOpeningHandler;

  constructor() {
    const config: PluginConfig = {
      name: 'Customized parametric modeling plugin',
      description: 'support Customized parametric modeling',
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.DoorStone,
        'hsw.plugin.userguide.Plugin',
        'hsw.brand.ezhome.feedback.Plugin'
      ]
    };

    super(config);
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  onActive(context: PluginContext, plugins: PluginMap): void {
    const { app } = context;

    this.handler = new MoveOpeningHandler(context);
    this.propertyBarPlugin = plugins[HSFPConstants.PluginType.PropertyBar];

    this.signalHook.listen(
      this.propertyBarPlugin.signalPopulatePropertyBar,
      this.onPopulatePropertyBar
    );

    app.cmdManager.register([
      [HSFPConstants.CommandType.MoveOpening, MoveOpeningCommand],
      [HSFPConstants.CommandType.EditParametricOpening, EditParametricOpeningCommand],
      [
        'hsw.cmd.customizemodel.CmdChangeParametricOpeningMeta',
        HSFPConstants.CommandType.OpenIndependentPanel,
        ChangeParametricOpeningMetaAdapter
      ],
      [ParametricopeingCommandType.CmdEditParametricopeningHole, EditParametricOpeningHoleCommand],
      [HSFPConstants.CommandType.RotateHole, CmdRotateHole]
    ]);

    app.transManager.register([
      [HSFPConstants.RequestType.MoveRoofOpening, MoveRoofOpeningRequest],
      [HSFPConstants.RequestType.MoveOpening, MoveOpeningRequest],
      [HSFPConstants.RequestType.AddOpening, AddOpeningRequest],
      [HSFPConstants.RequestType.EditParametricOpening, EditParametricOpeningRequest],
      [HSFPConstants.RequestType.AddParametricOpening, AddParametricOpeningRequest],
      [ParametricopeingRequestType.EditParametricOpeningHoleRequest, EditParametricOpeningHoleRequest],
      [HSFPConstants.RequestType.RotateHole, RotateHoleRequest]
    ]);
  }

  onPopulatePropertyBar(event: PropertyBarEvent): void {
    this.handler?.onPopulatePropertyBar(event);
  }

  onDeactive(): void {
    if (this.propertyBarPlugin) {
      this.signalHook.unlisten(
        this.propertyBarPlugin.signalPopulatePropertyBar,
        this.onPopulatePropertyBar
      );
    }
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ParametricOpening, ParametricOpeningPlugin);