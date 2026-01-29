enum DesignMode {
  Main = "mainDesign",
  Original = "originalDesign",
  New = "newDesign",
  Removed = "removedDesign"
}

type Entity = unknown;
type Environment = { id: string | number } | undefined;
type Mode = string | undefined;

type ConditionEvaluator = (entity: Entity, environment: Environment, mode?: Mode) => boolean;

interface ConditionMap {
  [key: string]: ConditionEvaluator;
}

class DesignConditionEvaluator {
  private readonly _conditionMap: ConditionMap;
  private readonly _initConditionMap: ConditionMap;

  constructor() {
    this._conditionMap = {
      isRoomAndDefault: this._isRoomAndDefault.bind(this),
      isRoomAndHouseRemodeling: this._isRoomAndHouseRemodeling.bind(this),
      isDefaultEnvironment: this._isDefaultEnvironment.bind(this),
      isHouseRemodelingEnvironment: this._isHouseRemodelingEnvironment.bind(this),
      isArchitecturalInfoPlanMode: this._isArchitecturalInfoPlanMode.bind(this),
      isArchitecturalInfoPlanOrDefaultMode: this._isArchitecturalInfoPlanOrDefaultMode.bind(this),
      isOrignalDemolitionPlanMode: this._isOrignalDemolitionPlanMode.bind(this),
      isHoleAndHouseRemodelingEnvironment: this._isHoleAndHouseRemodelingEnvironment.bind(this),
      isRoomAndDoorAndHouseRemodelingAndDemolitionMode: this._isRoomAndDoorAndHouseRemodelingAndDemolitionMode.bind(this),
      isWindowAndHouseRemodelingAndDemolitionMode: this._isWindowAndHouseRemodelingAndDemolitionMode.bind(this),
      isRoomAndHouseRemodelingAndArchInfoMode: this._isRoomAndHouseRemodelingAndArchInfoMode.bind(this),
      isWallAndHouseRemodelingAndArchInfoOrDefaultMode: this._isWallAndHouseRemodelingAndArchInfoOrDefaultMode.bind(this)
    };

    this._initConditionMap = {
      isRoomAndDefault: this._isRoomAndDefaultForInit.bind(this),
      isRoomAndHouseRemodeling: this._isRoomAndHouseRemodelingForInit.bind(this),
      isDefaultEnvironment: this._isDefaultEnvironmentForInit.bind(this),
      isHouseRemodelingEnvironment: this._isHouseRemodelingEnvironmentForInit.bind(this),
      isArchitecturalInfoPlanMode: this._isArchitecturalInfoPlanModeForInit.bind(this),
      isArchitecturalInfoPlanOrDefaultMode: this._isArchitecturalInfoPlanOrDefaultModeForInit.bind(this),
      isOrignalDemolitionPlanMode: this._isOrignalDemolitionPlanModeForInit.bind(this),
      isHoleAndHouseRemodelingEnvironment: this._isHoleAndHouseRemodelingEnvironmentForInit.bind(this)
    };
  }

  private _isDefaultEnvironment(entity: Entity, environment: Environment): boolean {
    return environment?.id === (HSApp.App.getApp() as any).defaultEnvironmentId;
  }

  private _isDefaultEnvironmentForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return !isHouseRemodeling;
  }

  private _isRoom(entity: Entity, environment: Environment): boolean {
    return false;
  }

  private _isWall(entity: Entity, environment: Environment): boolean {
    return (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Wall, [entity]) || 
           (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Wall, [entity]);
  }

  private _isRoomAndDefault(entity: Entity, environment: Environment): boolean {
    return this._isRoom(entity, environment) && this._isDefaultEnvironment(entity, environment);
  }

  private _isRoomAndDefaultForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return this._isRoom(entity, undefined) && !isHouseRemodeling;
  }

  private _isHouseRemodelingEnvironment(entity: Entity, environment: Environment): boolean {
    return environment?.id === (HSFPConstants.Environment as any).HouseRemodeling;
  }

  private _isHouseRemodelingEnvironmentForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return isHouseRemodeling;
  }

  private _isRoomAndHouseRemodeling(entity: Entity, environment: Environment): boolean {
    return this._isRoom(entity, environment) && this._isHouseRemodelingEnvironment(entity, environment);
  }

  private _isRoomAndHouseRemodelingAndArchInfoMode(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return this._isRoom(entity, environment) && 
           this._isHouseRemodelingEnvironment(entity, environment) && 
           this._isArchitecturalInfoPlanMode(entity, environment, mode);
  }

  private _isWallAndHouseRemodelingAndArchInfoOrDefaultMode(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return this._isWall(entity, environment) && 
           (this._isHouseRemodelingEnvironment(entity, environment) && 
            this._isArchitecturalInfoPlanMode(entity, environment, mode) || 
            this._isDefaultEnvironment(entity, environment));
  }

  private _isRoomAndHouseRemodelingForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return this._isRoom(entity, undefined) && isHouseRemodeling;
  }

  private _isArchitecturalInfoPlanOrDefaultMode(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return mode === DesignMode.New || this._isDefaultEnvironment(entity, environment);
  }

  private _isArchitecturalInfoPlanOrDefaultModeForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return mode === DesignMode.Removed || !isHouseRemodeling;
  }

  private _isArchitecturalInfoPlanMode(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return mode === DesignMode.New;
  }

  private _isArchitecturalInfoPlanModeForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return mode === DesignMode.New;
  }

  private _isOrignalDemolitionPlanMode(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return mode === DesignMode.Removed;
  }

  private _isOrignalDemolitionPlanModeForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return mode === DesignMode.Removed;
  }

  private _isHoleAndHouseRemodelingEnvironment(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return ((HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Hole, [entity]) || 
            (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Door, [entity])) && 
           this._isHouseRemodelingEnvironment(entity, environment);
  }

  private _isHoleAndHouseRemodelingEnvironmentForInit(entity: Entity, isHouseRemodeling: boolean, mode?: Mode): boolean {
    return ((HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Hole, [entity]) || 
            (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Door, [entity])) && 
           isHouseRemodeling;
  }

  private _isRoomAndDoorAndHouseRemodelingAndDemolitionMode(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return (this._isRoom(entity, environment) || 
            (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Door, [entity]) || 
            (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Window, [entity]) || 
            (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Hole, [entity])) && 
           this._isHouseRemodelingEnvironment(entity, environment) && 
           this._isOrignalDemolitionPlanMode(entity, environment, mode);
  }

  private _isWindowAndHouseRemodelingAndDemolitionMode(entity: Entity, environment: Environment, mode?: Mode): boolean {
    return (HSApp.Util.Entity as any).isTypeOf((HSCore.Model as any).Window, [entity]) && 
           this._isHouseRemodelingEnvironment(entity, environment) && 
           this._isOrignalDemolitionPlanMode(entity, environment, mode);
  }

  public evalCondition(
    conditionName: string, 
    entity: Entity, 
    environment: Environment, 
    mode: Mode, 
    skipEval: boolean
  ): boolean {
    if (skipEval) {
      return false;
    }
    return !!this._conditionMap[conditionName] && this._conditionMap[conditionName](entity, environment, mode);
  }

  public evalInitCondition(
    conditionName: string, 
    entity: Entity, 
    isHouseRemodeling: boolean, 
    mode: Mode
  ): boolean {
    return !!this._initConditionMap[conditionName] && this._initConditionMap[conditionName](entity, isHouseRemodeling, mode);
  }
}

export default DesignConditionEvaluator;