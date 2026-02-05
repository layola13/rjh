// @ts-nocheck
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface MaterialMeta {
  seekId: string;
}

interface PropertyTreeNode {
  onEnter?: (node: PropertyTreeNode, seekId: string) => void;
}

interface Entity {
  parameters: {
    propertytree: PropertyTreeNode;
  };
  constructBrep(): void;
  dirtyChildModels(dirty: boolean): void;
}

export class ApplyNCustomizedParametricBackgroundWallRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _entity: Entity;
  private readonly _faceIds: string[];
  private readonly _materialMeta: MaterialMeta;
  private readonly _content: HSCore.Model.ParametricModelContent | undefined;

  constructor(
    entity: Entity,
    faceIds: string[],
    materialMeta: MaterialMeta,
    content?: HSCore.Model.ParametricModelContent
  ) {
    super();
    this._entity = entity;
    this._faceIds = faceIds;
    this._materialMeta = materialMeta;
    this._content = content;
  }

  onCommit(): void {
    if (this._faceIds) {
      const backgroundWallHelper = HSApp.Util.ParametricBackgroundWallHelper.getInstance();
      
      let variableName: string;
      if (this._content && this._content instanceof HSCore.Model.ParametricModelContent) {
        variableName = backgroundWallHelper.getVariableNameByNCPBackgroundwallContent(
          this._entity,
          this._content,
          this._faceIds[0]
        );
      } else {
        variableName = HSCore.Util.NCustomizedFeatureModel.getVariableNameByMeshName(
          this._entity,
          this._faceIds[0]
        );
      }

      const node = HSApp.Util.ParametricModelHelper.getInstance().getNodeByName(
        this._entity.parameters.propertytree,
        variableName
      );

      if (node?.onEnter) {
        node.onEnter(node, this._materialMeta.seekId);
        super.onCommit([]);
      }
    }
  }

  onUndo(): void {
    super.onUndo([]);
    this._entity.constructBrep();
    this._entity.dirtyChildModels(true);
  }

  onRedo(): void {
    super.onRedo([]);
    this._entity.constructBrep();
    this._entity.dirtyChildModels(true);
  }

  canTransactField(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWall;
  }

  getDescription(): string {
    return "参数化背景墙赋材质";
  }
}