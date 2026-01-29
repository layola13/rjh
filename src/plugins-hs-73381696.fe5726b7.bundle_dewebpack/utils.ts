export enum CustomizationContentType {
  RoomDoor = 'RoomDoor'
}

export enum EN_SERIES_ID {
  Random = 'random',
  White = 'white',
  Medium = 'medium',
  Dark = 'dark'
}

interface Entity {
  materialsMap?: Map<string, unknown>;
  customizationContentType?: string[];
  contentType?: {
    isTypeOf(types: string[]): boolean;
  };
  metadata?: unknown;
  Class?: string;
  members?: Entity[];
}

interface FavoriteInfo {
  materialChanged: boolean;
  hasSeekId: boolean;
  favAddFlag: boolean;
}

interface SmartLayoutMenuItem {
  label: string;
  onClick: () => void;
}

interface LiveHintOptions {
  status: string;
  canclose: boolean;
  append: string;
}

declare const HSApp: any;
declare const HSCore: any;
declare const HSFPConstants: any;
declare const HSCatalog: any;
declare const HSConstants: any;
declare const adskUser: any;
declare const ResourceManager: any;
declare const LiveHint: any;

export const Utils = {
  /**
   * Check if entity material has been changed
   */
  isEntityMaterialChanged(entity: Entity | null | undefined): boolean {
    const materialsMap = entity?.materialsMap;
    return !!(
      entity &&
      this.isFurnish([entity]) &&
      materialsMap &&
      materialsMap.size > 0
    );
  },

  /**
   * Get favorite information for entity
   */
  getFavoriteInfo(entity: Entity | null | undefined, seekId: string): FavoriteInfo {
    const favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Favorite
    );
    const hasSeekId = favoritePlugin.getFavoritesData().has(seekId);
    const materialChanged = entity && this.isEntityMaterialChanged(entity);

    return {
      materialChanged,
      hasSeekId,
      favAddFlag: !!(adskUser.sid && !materialChanged && hasSeekId)
    };
  },

  /**
   * Track soft cloth events
   */
  softClothTrack(modelId: string, windSpeed?: string): void {
    const eventTrack = HSApp.Util.EventTrack.instance();

    if (HSApp.Config.TENANT === 'fp') {
      let eventName = 'cloth_drop_button_event';
      const eventData: Record<string, string> = { model_id: modelId };

      if (windSpeed) {
        eventName = 'curtain_blow_button_event';
        eventData.wind_speed = windSpeed;
      }

      eventTrack.track(HSApp.Util.EventGroupEnum.SoftCloth, eventName, eventData);
    } else {
      const eventMap: Record<string, string> = {
        light: 'curtain_soft',
        moderate: 'curtain_medium',
        strong: 'curtain_strong',
        place: 'leftmenu_click_event'
      };

      eventTrack.track(
        HSApp.Util.EventGroupEnum.SoftCloth,
        eventMap[windSpeed ?? 'place'],
        {}
      );
    }
  },

  /**
   * Check if entities can be favorited
   */
  canFav(entities: Entity | Entity[]): boolean {
    const flattenedEntities: Entity[] = [];

    const flatten = (item: Entity | Entity[]): void => {
      if (item instanceof HSCore.Model.Group) {
        flattenedEntities.push(...item.toFlatMemberList());
      } else if (Array.isArray(item)) {
        item.forEach(flatten);
      } else {
        flattenedEntities.push(item);
      }
    };

    flatten(entities);

    if (entities instanceof HSCore.Model.Group) {
      return !flattenedEntities.some(
        (entity) => entity.customizationContentType?.includes(CustomizationContentType.RoomDoor)
      );
    }

    return !flattenedEntities.some(
      (entity) =>
        this.isMolding(entity) ||
        entity.customizationContentType?.includes(CustomizationContentType.RoomDoor)
    );
  },

  /**
   * Check if smart accessory layout is enabled for entities
   */
  smartAccessoryLayoutEnable(entities: Entity[]): boolean {
    if (HSApp.Config.TENANT === 'fp') {
      return false;
    }

    const customizedProducts = entities.filter((entity) =>
      HSApp.Util.SmartLayoutUtil?.isTopLevelCustomizedProduct(entity)
    );

    const furnishItems = entities.filter((entity) => this.isFurnish([entity]));

    if (furnishItems.length === 1 && customizedProducts.length === 0) {
      return HSApp.Util.SmartLayoutUtil?.isSmartLayoutContent(furnishItems[0]) ?? false;
    }

    return !!(customizedProducts.length > 0 && furnishItems.length === 0);
  },

  /**
   * Execute smart accessory layout
   */
  smartAccessoryLayout(entities: Entity[], seriesId: string = ''): void {
    const smartLayoutPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.SmartLayoutAccessories
    );

    smartLayoutPlugin?.startSmartLayoutProcess(entities, seriesId);
  },

  /**
   * Get smart layout menu items
   */
  smartLayoutChildItems(entities: Entity[]): SmartLayoutMenuItem[] {
    const menuItems: SmartLayoutMenuItem[] = [
      {
        label: ResourceManager.getString('smart_layout_random_color'),
        onClick: () => this.smartAccessoryLayout(entities, EN_SERIES_ID.Random)
      },
      {
        label: ResourceManager.getString('smart_layout_white_color'),
        onClick: () => this.smartAccessoryLayout(entities, EN_SERIES_ID.White)
      },
      {
        label: ResourceManager.getString('smart_layout_medium_color'),
        onClick: () => this.smartAccessoryLayout(entities, EN_SERIES_ID.Medium)
      },
      {
        label: ResourceManager.getString('smart_layout_dark_color'),
        onClick: () => this.smartAccessoryLayout(entities, EN_SERIES_ID.Dark)
      }
    ];

    return this.isAllCustomIzedProducts(entities) ? menuItems : [];
  },

  /**
   * Check if all entities are customized products
   */
  isAllCustomIzedProducts(entities: Entity[]): boolean {
    return entities.every((entity) =>
      HSApp.Util.SmartLayoutUtil?.isTopLevelCustomizedProduct(entity)
    );
  },

  /**
   * Check if entity is a customized product
   */
  isCustomizedProduct(entity: Entity): boolean {
    const customizedTypes = [
      HSCore.Model.DAssembly,
      HSCore.Model.DContent,
      HSCore.Model.DExtruding,
      HSCore.Model.DSweep,
      HSCore.Model.DMolding
    ];

    const isDirectCustomized = customizedTypes.some((type) => entity instanceof type);

    if (isDirectCustomized) {
      return true;
    }

    if (entity instanceof HSCore.Model.Group && entity.members) {
      return entity.members.some((member) => this.isCustomizedProduct(member));
    }

    return false;
  },

  /**
   * Check if entities are furnish items
   */
  isFurnish(entities: Entity[]): boolean {
    if (entities.length > 1) {
      return false;
    }

    const entity = entities[0];

    if (!(entity instanceof HSCore.Model.Content)) {
      return false;
    }

    if (HSCore.Util.Content.isFurnitureLight(entity)) {
      return true;
    }

    if (
      entity instanceof HSCore.Model.PModel ||
      entity instanceof HSCore.Model.PAssembly
    ) {
      return false;
    }

    if (this.isCustomizedProduct(entity) || entity instanceof HSCore.Model.MeshContent) {
      return false;
    }

    if (
      entity.contentType?.isTypeOf([
        HSCatalog.ContentTypeEnum.BuildElement,
        HSCatalog.ContentTypeEnum.ext_ncustomized,
        HSCatalog.ContentTypeEnum.ext_customized
      ])
    ) {
      return false;
    }

    if (entity instanceof HSCore.Model.ParametricContentBase) {
      return false;
    }

    const excludedContentTypes = [
      HSCore.Util.Content.isDiy1Content,
      HSCore.Util.Content.isConcealedWorkContent,
      HSCore.Util.Content.isCustomizedFeatureModel,
      HSCore.Util.Content.isOpening,
      HSCore.Util.Content.isWindow,
      HSCore.Util.Content.isKnob,
      HSCore.Util.Content.isStructure
    ];

    if (excludedContentTypes.some((checkFn) => checkFn(entity))) {
      return false;
    }

    if (HSCore.Util.Content.isParametricOpening(entity?.metadata)) {
      return false;
    }

    return true;
  },

  /**
   * Check if entities could be aligned
   */
  couldAlign(entities: Entity[]): boolean {
    const activeEnvironmentId = HSApp.App.getApp().activeEnvironment.id;

    if (['MoldingEnv'].includes(activeEnvironmentId)) {
      return false;
    }

    if (entities.length >= 2) {
      const alignableClasses = [
        HSConstants.ModelClass.DAssembly,
        HSConstants.ModelClass.DExtruding,
        HSConstants.ModelClass.DContent,
        HSConstants.ModelClass.NgGroup,
        HSConstants.ModelClass.NgContent
      ];

      return entities.every((entity) => alignableClasses.includes(entity.Class ?? ''));
    }

    return false;
  },

  /**
   * Check if molding is selected
   */
  isMoldingSelected(): boolean {
    const selectedEntities = HSApp.App.getApp().selectionManager.selected(true);
    return (
      selectedEntities.length > 0 &&
      selectedEntities[0] instanceof HSCore.Model.CustomizedModelMolding
    );
  },

  /**
   * Check if parametric opening is selected
   */
  isParametricopeningSelected(): boolean {
    const selectedEntities = HSApp.App.getApp().selectionManager.selected(true);
    return (
      selectedEntities.length > 0 &&
      selectedEntities[0] instanceof HSCore.Model.ParametricOpening
    );
  },

  /**
   * Check if entity is molding
   */
  isMolding(entity: Entity): boolean {
    const contentType = entity.contentType;

    if (!contentType) {
      return false;
    }

    return contentType.isTypeOf([
      HSCatalog.ContentTypeEnum.BaseMolding,
      HSCatalog.ContentTypeEnum.CrownMolding,
      HSCatalog.ContentTypeEnum.Countertop,
      HSCatalog.ContentTypeEnum.LightMolding
    ]);
  },

  /**
   * Show duplicate tip message
   */
  showDuplicateTip(): void {
    const storage = new HSApp.Util.Storage('hsw.plugin.gizmo.contentselection');

    if (!storage.get('show_tip')) {
      const actionText = `<span class='action'>${ResourceManager.getString(
        'hot_key_duplicate_content_no_tip'
      )}</span>`;

      const hintOptions: LiveHintOptions = {
        status: LiveHint.statusEnum.canops,
        canclose: true,
        append: actionText
      };

      const viewSuffix = HSApp.App.getApp().is3DViewActive() ? '_3d' : '_2d';
      const platformPrefix = HSApp.Util.UserAgent.isMAC()
        ? 'hot_key_duplicate_content_tip_mac'
        : 'hot_key_duplicate_content_tip_win';

      const tipMessage = ResourceManager.getString(platformPrefix + viewSuffix);
      const displayDuration = 3000;

      LiveHint.show(
        tipMessage,
        displayDuration,
        () => {
          storage.set('show_tip', 'noShow');
          LiveHint.hide();
        },
        hintOptions
      );
    }
  }
};