export function isVip(): boolean {
  const user = (window as any).adskUser;
  
  if (!user) {
    return false;
  }

  const hasStairModelBenefit = user.checkBenefit?.("stairModelUse")?.useful;
  const isProOrMaster = [
    HSFPConstants.GlobalMemberType.Pro,
    HSFPConstants.GlobalMemberType.Master
  ].includes(user.memberInfo?.memberType);
  const isValidEnterprise = user.isEnterprise && user.memberInfo?.validMember;
  const hasApartmentCustomizedUI = user.apartmentCustomizedUI;

  return hasStairModelBenefit || isProOrMaster || isValidEnterprise || hasApartmentCustomizedUI;
}

export function popVip(): void {
  if (isVip()) {
    return;
  }

  const app = HSApp.App.getApp();
  const marketingBadgePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.MarketingBadge);
  
  if (marketingBadgePlugin?.showMarketModal) {
    marketingBadgePlugin.showMarketModal("render", "stair-type-list");
  }
}

export function replaceMaterial(
  model: HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelMolding,
  targetKeys: string[],
  catalogMeta: any,
  skipTransaction: boolean = false
): void {
  const app = HSApp.App.getApp();

  const allFacesSupported = targetKeys.every((key) =>
    model.isFaceSupportPaintMaterialByMeshKey?.(key) || model.isFaceSupportPaintMaterial?.(key)
  );

  if (allFacesSupported) {
    HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getPatternDataAsync(model, targetKeys, catalogMeta)
      .then((patternDataMap: Map<string, any>) => {
        const materialMap = new Map<string, any>();

        patternDataMap.forEach((data, key) => {
          if (data instanceof HSCore.Material.Material) {
            materialMap.set(key, data.mixpaint);
          } else {
            materialMap.set(key, data);
          }
        });

        if (model instanceof HSCore.Model.NCustomizedFeatureModel) {
          const session = skipTransaction ? null : app.transManager.startSession();
          const request = app.transManager.createRequest(
            HSFPConstants.RequestType.ApplyNCustomizedModelMaterial,
            [model, materialMap]
          );
          app.transManager.commit(request, skipTransaction);
          session?.commit();
        } else {
          const request = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getCustomizedModelRequest(
            model,
            materialMap
          );
          app.transManager.commit(request, skipTransaction);
        }

        refreshPlugins();
      })
      .catch(() => {
        refreshPlugins();
      });
    return;
  }

  const clonedCatalogMeta = _.cloneDeep(catalogMeta);
  const materialDataObject = HSCore.Material.Util.getMaterialDataObjectFromCatalogMeta(clonedCatalogMeta);
  const materialConfigMap = new Map<string, any>();

  targetKeys.forEach((key) => {
    const clonedMaterial = materialDataObject.clone();

    if (catalogMeta.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Wallwrap)) {
      const facePaths = model.getFacePaths?.(key);
      const projectionPlane = model.getFaceProjectionPlane?.(key);

      if (projectionPlane && facePaths && facePaths.length > 0) {
        const projectionMatrix = HSCore.Util.Math.getPlaneProjectionMatrix(
          projectionPlane,
          projectionPlane.projectPoint(new THREE.Vector3())
        );

        const projectedPoints = facePaths[0].map((point: { x: number; y: number; z: number }) =>
          new THREE.Vector3(point.x, point.y, point.z).applyMatrix4(projectionMatrix)
        );

        const bounds = HSCore.Util.Math.getBounds(projectedPoints);
        const [, , width, height] = bounds;

        clonedMaterial.tileSize_x = width;
        clonedMaterial.tileSize_y = height;
      }
    }

    materialConfigMap.set(key, clonedMaterial);
  });

  if (model instanceof HSCore.Model.NCustomizedModelMolding) {
    const firstMaterialConfig = materialConfigMap.values().next()?.value || {};
    const request = app.transManager.createRequest(
      HSFPConstants.RequestType.ApplyNCustomizedModelMoldingMaterial,
      [[model], firstMaterialConfig]
    );
    app.transManager.commit(request, skipTransaction);
    refreshPlugins();
    return;
  }

  if (model instanceof HSCore.Model.NCustomizedFeatureModel) {
    const request = app.transManager.createRequest(
      HSFPConstants.RequestType.ApplyNCustomizedModelMaterial,
      [model, materialConfigMap]
    );
    app.transManager.commit(request, skipTransaction);
    refreshPlugins();
  } else {
    const request = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getCustomizedModelRequest(
      model,
      materialConfigMap
    );
    app.transManager.commit(request, skipTransaction);
    refreshPlugins();
  }
}

export function stairLogger(operationId: string, operationName: string): void {
  const app = HSApp.App.getApp();

  app.userTrackLogger.push("hsw.property.stair.change", {
    description: "修改楼梯属性",
    activeSection: "StairStyleReplace",
    activeSectionName: "属性面板替换楼梯操作",
    clicksRatio: {
      id: operationId,
      name: operationName
    }
  }, {});

  HSApp.Util.EventTrack.instance().track(
    HSApp.Util.EventGroupEnum.Propertybar,
    `stair_property_change_${operationId}_event`
  );
}

function refreshPlugins(): void {
  const app = HSApp.App.getApp();
  
  app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools)?.refresh();
  app.pluginManager.getPlugin(HSFPConstants.PluginType.PropertyBar)?.update();
  app.pluginManager.getPlugin(HSFPConstants.PluginType.MaterialImage)?.resetMaterialUrlCache();
}