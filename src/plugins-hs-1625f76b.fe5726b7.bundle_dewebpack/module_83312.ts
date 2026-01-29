import { Vector3 } from 'three';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { HSFPConstants } from './HSFPConstants';

interface AlignProcessStrategy {
  priority: number;
  condition: (entity: HSCore.Model.Entity) => boolean;
  getProcessRequests: (
    target: HSCore.Model.Entity,
    benchmark: HSCore.Model.Entity,
    alignType: HSFPConstants.AlignType
  ) => Array<HSCore.Transaction.Request>;
}

interface Position3D {
  x: number;
  y: number;
  z: number;
}

export default class CmdModelAlign extends HSApp.Cmd.Implement.CmdBaseAlign {
  private _signalHook?: HSCore.Util.SignalHook;
  private alignProcessStrategies: AlignProcessStrategy[] = [];
  private benchmarkEntity!: HSCore.Model.Entity;
  private selected!: HSCore.Model.Entity[];
  private alignType!: HSFPConstants.AlignType;

  constructor(
    entity: HSCore.Model.Entity,
    selectedEntities: HSCore.Model.Entity[],
    alignType: HSFPConstants.AlignType
  ) {
    super(entity, selectedEntities, alignType);
  }

  onExecute(): void {
    super.onExecute();

    const app = HSApp.App.getApp();
    const contextualToolsPlugin = app.pluginManager.getPlugin(
      HSFPConstants.PluginType.ContextualTools
    );

    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(
      contextualToolsPlugin.signalPopulateStatusBar,
      this.onPopulateStatusBar
    );
  }

  onCleanup(): void {
    super.onCleanup();
    this._signalHook?.dispose();
  }

  getDescription(): string {
    return '模型对齐';
  }

  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  private _doAlign(): void {
    const benchmark = this.benchmarkEntity;
    const targetEntities = this.selected.filter(
      (entity) => benchmark.ID !== entity.ID
    );

    if (targetEntities.length === 0) {
      return;
    }

    const transactionManager = HSApp.App.getApp().transManager;
    const requests: HSCore.Transaction.Request[] = [];

    targetEntities.forEach((entity) => {
      if (
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.locked) ||
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)
      ) {
        const entityName = entity.metadata.name;
        LiveHint.show(
          `${entityName} ${ResourceManager.getString('content_locked_align_tip')}`,
          3000,
          undefined,
          { canclose: true }
        );
        return;
      }

      const adaptAlignTypes = [
        HSFPConstants.Align.AdaptFrontBack,
        HSFPConstants.Align.AdaptLeftRight,
        HSFPConstants.Align.AdaptBottomTop,
      ];

      if (
        !entity.isScalable &&
        adaptAlignTypes.includes(this.alignType)
      ) {
        LiveHint.show(
          ResourceManager.getString('content_locked_size_align_tip'),
          3000,
          undefined,
          { canclose: true }
        );
        return;
      }

      const matchingStrategies = this.alignProcessStrategies
        .filter((strategy) => strategy.condition(entity))
        .sort((a, b) => b.priority - a.priority);

      if (matchingStrategies.length > 0) {
        const strategyRequests = matchingStrategies[0].getProcessRequests(
          entity,
          benchmark,
          this.alignType
        );
        requests.push(...strategyRequests);
      }
    });

    if (requests.length > 1) {
      const compositeRequest = transactionManager.createRequest(
        HSConstants.RequestType.Composite,
        [requests]
      );
      transactionManager.commitAsync(compositeRequest);
    } else if (requests.length === 1) {
      transactionManager.commitAsync(requests[0]);
    }
  }

  initProcessStrategies(): void {
    const assemblyModelClasses = [
      HSConstants.ModelClass.DAssembly,
      HSConstants.ModelClass.DExtruding,
      HSConstants.ModelClass.DContent,
      HSConstants.ModelClass.DMolding,
    ];

    this.alignProcessStrategies.push({
      priority: 1,
      condition: (entity: HSCore.Model.Entity): boolean => {
        if (entity.Class === HSConstants.ModelClass.NgContent) {
          return true;
        }
        if (entity.Class === HSConstants.ModelClass.NgGroup) {
          const hasAssemblyMember = entity.members.find((member) =>
            assemblyModelClasses.includes(member.Class)
          );
          return !hasAssemblyMember;
        }
        return false;
      },
      getProcessRequests: (
        target: HSCore.Model.Entity,
        benchmark: HSCore.Model.Entity,
        alignType: HSFPConstants.AlignType
      ): Array<HSCore.Transaction.Request> => {
        return this._handleNormalContent(target, benchmark, alignType);
      },
    });
  }

  private _handleNormalContent(
    targetEntity: HSCore.Model.Entity,
    benchmarkEntity: HSCore.Model.Entity,
    alignType: HSFPConstants.AlignType
  ): Array<HSCore.Transaction.Request> {
    const requests: HSCore.Transaction.Request[] = [];
    const transactionManager = HSApp.App.getApp().transManager;

    const currentSize = new Vector3(
      targetEntity.XSize,
      targetEntity.YSize,
      targetEntity.ZSize
    );

    const adaptedProperties = HSApp.Util.AlignUtil.adaptTo(
      benchmarkEntity,
      targetEntity,
      alignType,
      true
    );

    const newSize = this._getSizeFromPropertyMap(
      adaptedProperties,
      targetEntity
    );

    if (!HSCore.Util.Math.isSamePoint3(currentSize, newSize)) {
      const resizeRequest = transactionManager.createRequest(
        HSFPConstants.RequestType.ResizeContent,
        [targetEntity, newSize]
      );
      if (resizeRequest) {
        requests.push(resizeRequest);
      }
    }

    const alignOffset = HSApp.Util.AlignUtil.alignTo(
      benchmarkEntity,
      targetEntity,
      alignType,
      newSize
    );

    const currentPosition: Position3D = {
      x: targetEntity.x,
      y: targetEntity.y,
      z: targetEntity.z,
    };

    const newPosition: Position3D = {
      x: currentPosition.x + alignOffset.x,
      y: currentPosition.y + alignOffset.y,
      z: currentPosition.z + alignOffset.z,
    };

    if (!HSCore.Util.Math.isSamePoint3(newPosition, currentPosition)) {
      const moveRequest = transactionManager.createRequest(
        HSFPConstants.RequestType.MoveContentRequest,
        [targetEntity, currentPosition, newPosition]
      );
      if (moveRequest) {
        requests.push(moveRequest);
      }
    }

    return requests;
  }

  private _getSizeFromPropertyMap(
    propertyMap: Map<string, number>,
    entity: HSCore.Model.Entity
  ): Vector3 {
    const size = new Vector3(entity.XSize, entity.YSize, entity.ZSize).clone();

    propertyMap.forEach((value, key) => {
      if (key === 'width') {
        size.x = value;
      } else if (key === 'depth') {
        size.y = value;
      } else if (key === 'height') {
        size.z = value;
      }
    });

    return size;
  }
}