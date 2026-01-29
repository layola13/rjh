interface ContentInfo {
  position: { x: number; y: number; z: number };
  width: number;
  height: number;
  host: any;
  parent: any;
  rotation: number;
  swing?: any;
  anchor?: any;
  anchorAxis?: any;
  angle: number;
  isOpened?: boolean;
  doorstoneMaterialInfo?: {
    isDoorStoneMaterialEnabled: boolean;
    doorstoneMaterial: any;
  };
}

interface SnappingOptions {
  snapOffset: number;
  autoFitEnable: boolean;
}

export default class ReplaceContentRequest extends HSCore.Transaction.Common.CompositeRequest {
  private newContent: any;
  private oldContent: any;
  private oldContentInfo?: ContentInfo;

  constructor(newContent: any, oldContent: any) {
    super();
    this.newContent = newContent;
    this.oldContent = oldContent;
  }

  onCommit(): any {
    const oldContent = this.oldContent;

    if (!this.oldContent) {
      return this.newContent;
    }

    this.append(
      this.mgr.createRequest(HSFPConstants.RequestType.DeleteProduct, [oldContent])
    );

    this.oldContentInfo = this._getOldContentInfo(this.oldContent);
    this._restoreProperty(this.oldContentInfo);

    super.onCommit([]);

    if (this.newContent instanceof HSCore.Model.ParametricOpening) {
      this.newContent.signalValidityChanged.dispatch(false);
    }

    HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
    HSApp.App.getApp().selectionManager.select(this.newContent);

    return this.newContent;
  }

  private _getOldContentInfo(content: any): ContentInfo {
    const info: ContentInfo = {
      position: {
        x: content.x,
        y: content.y,
        z: content.z,
      },
      width: 0,
      height: 0,
      host: content.getHost(),
      parent: content.getUniqueParent(),
      rotation: content.rotation,
      swing: content.swing,
      anchor: content.anchor,
      anchorAxis: content.anchorAxis,
      angle: content.angle,
      isOpened: content.isOpened,
    };

    if (
      this.oldContent.instanceOf(HSConstants.ModelClass.NgCornerWindow) &&
      this.oldContent.parameters
    ) {
      info.width = this.oldContent.parameters.sideB;
      info.height = this.oldContent.parameters.height;
    } else {
      info.width = this.oldContent.XSize;
      info.height = this.oldContent.ZSize;
    }

    if (content.instanceOf(HSConstants.ModelClass.NgOpening)) {
      const doorstoneMaterialInfo = {
        isDoorStoneMaterialEnabled: content.isDoorStoneMaterialEnabled(),
        doorstoneMaterial: content.getBottomFaceMaterial(),
      };
      info.doorstoneMaterialInfo = doorstoneMaterialInfo;
    }

    return info;
  }

  private _restoreProperty(contentInfo: ContentInfo): void {
    const newContent = this.newContent;
    const host = contentInfo.host;

    newContent.x = contentInfo.position.x;
    newContent.y = contentInfo.position.y;
    newContent.z = contentInfo.position.z;

    if (newContent instanceof HSCore.Model.ParametricOpening) {
      if (this.oldContent instanceof HSCore.Model.ParametricOpening) {
        const params: Record<string, any> = {};

        this.oldContent.storeProperty.forEach((value: any, key: string) => {
          if (!key.includes('#')) {
            params[key] = value;

            const dependentMeta = this.oldContent.metaInfo.dependentMetaDates.find(
              (meta: any) => meta.id === value
            );

            if (dependentMeta) {
              newContent.metaInfo.dependentMetaDates.push(dependentMeta);
            }
          }
        });

        newContent.setParams(params);
      }

      new HSCore.Util.OpeningSnapHelper(
        newContent,
        newContent.getUniqueParent(),
        true
      ).snapToWall();
    } else {
      if (newContent.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
        if (newContent.parameters) {
          const clonedParams = _.cloneDeep(newContent.parameters);
          newContent.parameters.sideB = contentInfo.width;
          newContent.parameters.height = contentInfo.height;
          newContent.parameters.elevation = contentInfo.position.z;
          newContent.parameters = clonedParams;
        }
      } else if (newContent.resize) {
        newContent.resize(contentInfo.width, newContent.YSize, contentInfo.height);
      }

      if (host && host.instanceOf(HSConstants.ModelClass.NgWall)) {
        if (
          this._getDefAutofit(newContent) ||
          newContent.instanceOf(HSConstants.ModelClass.NgOpening)
        ) {
          host.instanceOf(HSConstants.ModelClass.NgWall);
          HSCore.Util.Content.autoFitToWall(host, newContent);
        }

        newContent.assignTo(host);
        newContent.refreshBoundInternal();

        if (
          !newContent.instanceOf(HSConstants.ModelClass.NgOpening) &&
          !newContent.instanceOf(HSConstants.ModelClass.DOpening) &&
          HSApp.Snapping &&
          typeof HSApp.Snapping.Helper !== 'undefined'
        ) {
          const moveVector = this._getMinMoveVecToWall(newContent, host);
          newContent.x += moveVector.x;
          newContent.y += moveVector.y;

          const snappingHelper = new HSApp.Snapping.Helper(newContent);
          const strategies = this._getSnappingStrategies(snappingHelper, newContent);
          snappingHelper.strategies = strategies;

          snappingHelper.doSnapping({
            snapOffset: 0.1,
            autoFitEnable: this._getDefAutofit(newContent),
          });
        }

        newContent.angle = contentInfo.angle;

        if (newContent.instanceOf(HSConstants.ModelClass.NgOpening)) {
          newContent.isOpened = contentInfo.isOpened;

          if (contentInfo.swing) {
            newContent.swing = contentInfo.swing;
          }

          if (contentInfo.doorstoneMaterialInfo) {
            newContent.setDoorStoneMaterialStatus(
              contentInfo.doorstoneMaterialInfo.isDoorStoneMaterialEnabled
            );
            newContent.setBottomFaceMaterial(
              contentInfo.doorstoneMaterialInfo.doorstoneMaterial
            );
          }
        }
      }
    }
  }

  private _getMinMoveVecToWall(content: any, wall: any): { x: number; y: number } {
    const getClosestVector = (point: any): HSCore.Util.Math.Vec2 => {
      const closestPoint = HSCore.Util.Math.getClosestSegmentPoint(
        point,
        wall.from,
        wall.to
      );
      return new HSCore.Util.Math.Vec2(
        closestPoint.x - point.x,
        closestPoint.y - point.y
      );
    };

    const contentVector = getClosestVector(content);

    if (HSCore.Util.Math.isZero(contentVector.magnitude())) {
      return { x: 0, y: 0 };
    }

    let minVector: HSCore.Util.Math.Vec2 | undefined;
    let minDotProduct: number = Number.MAX_VALUE;

    content.outline.forEach((outlinePoint: any) => {
      const vector = getClosestVector(outlinePoint);
      const dotProduct = HSCore.Util.Math.Vec2.dot(vector, contentVector);

      if (!minVector || dotProduct < minDotProduct) {
        minDotProduct = dotProduct;
        minVector = vector;
      }
    });

    const offsetVector = contentVector.normalize().scale(wall.width / 2);
    return minVector!.subtract(offsetVector);
  }

  private _getDefAutofit(content: any): boolean {
    if (content.instanceOf(HSConstants.ModelClass.NgCustomizedModel)) {
      return true;
    }

    const contentType = content.contentType;
    return contentType && contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_AutoRotate);
  }

  private _getSnappingStrategies(helper: any, content: any): any[] {
    const strategyMap: Record<string, any> = {};

    return HSApp.Snapping.getContentSnappingStrategies(content).map(
      (StrategyClass: any) => {
        const doSnappingCallback = strategyMap[StrategyClass.ClassName]
          ?.doSnappingCallback;
        const validatorCallback = strategyMap[StrategyClass.ClassName]
          ?.vialidatorCallback;

        return new StrategyClass(content, helper, doSnappingCallback, validatorCallback);
      }
    );
  }
}