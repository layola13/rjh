interface App {
  floorplan: {
    forEachContent(callback: (entity: any) => void): void;
  };
  getActive3DView(): Active3DView;
  transManager: {
    signalUndoRedoStateChanged: {
      listen(callback: () => void): void;
    };
  };
}

interface Active3DView {
  displayList: Record<string, DisplayEntity>;
  selector: {
    picker?: Picker;
  };
}

interface DisplayEntity {
  id: string;
}

interface Picker {
  sortTolerance: number;
}

namespace HSCore.Model {
  export enum EntityFlagEnum {
    freezed = 'freezed'
  }
  
  export enum MoldingTypeEnum {
    Mitre = 'Mitre'
  }
  
  export class NCustomizedFeatureModel {
    id: string;
    isFlagOn(flag: EntityFlagEnum): boolean {
      return false;
    }
  }
  
  export class NCustomizedModelLightSlot {
    id: string;
    isFlagOn(flag: EntityFlagEnum): boolean {
      return false;
    }
  }
}

class MoldingStrategy {
  private app: App;
  private _customizedEntities: DisplayEntity[] = [];
  private _isLineSelecting: boolean = false;
  public isStrategyInit: boolean = false;

  constructor(
    entity: any,
    moldingType: HSCore.Model.MoldingTypeEnum,
    options: any
  ) {
    this._initializeStrategy(entity, moldingType, options);
    this._updateViewCursor();

    const customizedEntities = this._collectCustomizedEntities();

    if (customizedEntities.length !== 0) {
      this._setupCustomizedEntitiesDisplay(customizedEntities);
    }

    if (moldingType === HSCore.Model.MoldingTypeEnum.Mitre) {
      this._isLineSelecting = true;
      this._updateViewCursor();
    }

    this._startPreviewMolding();
    this._setBackgroundNormal();
    this.app.transManager.signalUndoRedoStateChanged.listen(
      this._updateGraphicsDatasMap
    );
    this.isStrategyInit = true;
  }

  private _initializeStrategy(
    entity: any,
    moldingType: HSCore.Model.MoldingTypeEnum,
    options: any
  ): void {
    // Initialize strategy with provided parameters
  }

  private _updateViewCursor(): void {
    // Update view cursor state
  }

  private _collectCustomizedEntities(): Array<
    HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot
  > {
    const entities: Array<
      HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot
    > = [];

    this.app.floorplan.forEachContent((entity: any) => {
      const isCustomizedEntity =
        entity instanceof HSCore.Model.NCustomizedFeatureModel ||
        entity instanceof HSCore.Model.NCustomizedModelLightSlot;
      const isNotFreezed = !entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed);

      if (isCustomizedEntity && isNotFreezed) {
        entities.push(entity);
      }
    });

    return entities;
  }

  private _setupCustomizedEntitiesDisplay(
    entities: Array<
      HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot
    >
  ): void {
    const PICKER_SORT_TOLERANCE = 0.012;
    const activeView = this.app.getActive3DView();

    entities.forEach((entity) => {
      const displayEntity = activeView.displayList[entity.id];
      if (displayEntity) {
        this._customizedEntities.push(displayEntity);
      }
    });

    const picker = activeView.selector.picker;
    if (picker) {
      picker.sortTolerance = PICKER_SORT_TOLERANCE;
    }
  }

  private _startPreviewMolding(): void {
    // Start molding preview
  }

  private _setBackgroundNormal(): void {
    // Set background to normal state
  }

  private _updateGraphicsDatasMap = (): void => {
    // Update graphics data map
  };
}

export { MoldingStrategy, HSCore };