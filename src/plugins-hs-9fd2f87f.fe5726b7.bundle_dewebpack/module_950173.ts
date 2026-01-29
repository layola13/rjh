import { DiffCWViewController } from './DiffCWViewController';
import { HSApp } from './HSApp';
import { BaseDiffToolPlugin } from './BaseDiffToolPlugin';
import { DiffToolGizmoUtil } from './DiffToolGizmoUtil';
import { ExposedCornerGizmo } from './ExposedCornerGizmo';
import { HSFPConstants } from './HSFPConstants';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface Scene {
  activeLayer: unknown;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

class DiffToolPlugin extends BaseDiffToolPlugin {
  private _diffCWViewController: DiffCWViewController;

  constructor() {
    const config: PluginConfig = {
      name: "DiffTool Plugin",
      description: "Diff Tool mode",
      dependencies: [HSFPConstants.PluginType.SpaceRebuild]
    };
    
    super(config);
    this._diffCWViewController = new DiffCWViewController();
  }

  createDiffToolHighLightGizmo(
    firstParam: unknown,
    secondParam: unknown,
    thirdParam: unknown,
    fourthParam: unknown
  ): unknown {
    return DiffToolGizmoUtil.getDiffToolHighLightGizmo(
      firstParam,
      secondParam,
      thirdParam,
      fourthParam
    );
  }

  createExposedCornerGizmo(
    firstParam: unknown,
    secondParam: unknown,
    thirdParam: unknown,
    fourthParam: unknown,
    fifthParam: unknown
  ): ExposedCornerGizmo {
    return new ExposedCornerGizmo(
      firstParam,
      secondParam,
      thirdParam,
      fourthParam,
      fifthParam
    );
  }

  createDiffCWView(viewParam: unknown): void {
    this._diffCWViewController.init(this.diffTool, viewParam);
  }

  setDiffCWViewVisibility(isVisible: boolean, layer?: unknown): void {
    const targetLayer = layer ?? HSApp.App.getApp().floorplan.scene.activeLayer;
    this._diffCWViewController.setVisibility(targetLayer, isVisible);
  }

  destroyDiffCW(destroyParam: unknown): void {
    super.destroyDiffCW?.(destroyParam);
    this._diffCWViewController.cleanUp();
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.difftool.Plugin", DiffToolPlugin);