type ConfigCallback = (...args: any[]) => void;

interface ActionConfig {
  targetTypes: Array<new (...args: any[]) => any>;
  actionTypes: string[];
  callback: ConfigCallback;
}

interface MatchedAction {
  actionType: string;
  callbackSet: Set<ConfigCallback>;
}

interface Context {
  manager: {
    getRootNode(): { update(): void } | null | undefined;
  };
}

export class ConfigRegister {
  private readonly CONTAINER_TYPES: Array<new (...args: any[]) => any>;
  private _configs: Map<string, ActionConfig[]>;
  private _availableNodes: Map<new (...args: any[]) => any, Map<string, Set<ConfigCallback>>>;
  private _context: Context;

  constructor(context: Context) {
    this.CONTAINER_TYPES = [
      HSCore.Model.Scene,
      HSCore.Model.Layer,
      HSCore.Model.CustomizedPMModel,
      HSCore.Model.Face
    ];
    this._configs = new Map();
    this._availableNodes = new Map();
    this._context = context;
  }

  private _updateAvailableNodesAndActions(): void {
    const availableNodes = new Map<new (...args: any[]) => any, Map<string, Set<ConfigCallback>>>();

    this._configs.forEach((configs) => {
      configs.forEach((config) => {
        config.targetTypes.forEach((targetType) => {
          this._processTargetType(availableNodes, targetType, config.actionTypes, config.callback);
        });
      });
    });

    this._availableNodes = availableNodes;
  }

  private _processTargetType(
    availableNodes: Map<new (...args: any[]) => any, Map<string, Set<ConfigCallback>>>,
    targetType: new (...args: any[]) => any,
    actionTypes: string[],
    callback: ConfigCallback
  ): void {
    const existingActions = availableNodes.get(targetType);

    if (existingActions) {
      actionTypes.forEach((actionType) => {
        const callbackSet = existingActions.get(actionType);
        if (callbackSet) {
          callbackSet.add(callback);
        } else {
          const newCallbackSet = new Set<ConfigCallback>();
          newCallbackSet.add(callback);
          existingActions.set(actionType, newCallbackSet);
        }
      });
    } else {
      const newActions = new Map<string, Set<ConfigCallback>>();
      actionTypes.forEach((actionType) => {
        const newCallbackSet = new Set<ConfigCallback>();
        newCallbackSet.add(callback);
        newActions.set(actionType, newCallbackSet);
      });
      availableNodes.set(targetType, newActions);
    }
  }

  register(key: string, configs: ActionConfig[]): void {
    if (configs.length > 0 && !this._configs.get(key)) {
      this._configs.set(key, configs);
      this._updateAvailableNodesAndActions();
      this._context.manager.getRootNode()?.update();
    }
  }

  unregister(key: string): void {
    if (this._configs.get(key)) {
      this._configs.delete(key);
      this._updateAvailableNodesAndActions();
      this._context.manager.getRootNode()?.update();
    }
  }

  isAvailableType(instance: any): boolean {
    if (!instance) {
      return false;
    }

    if (this.CONTAINER_TYPES.some((containerType) => instance instanceof containerType)) {
      return true;
    }

    let isAvailable = false;
    this._availableNodes.forEach((_, targetType) => {
      if (!isAvailable && instance instanceof targetType) {
        isAvailable = true;
      }
    });

    return isAvailable;
  }

  getMatchedActionsByType(instance: any): MatchedAction[] {
    if (!instance) {
      return [];
    }

    const matchedActions: MatchedAction[] = [];

    this._availableNodes.forEach((actions, targetType) => {
      if (instance instanceof targetType) {
        actions.forEach((callbackSet, actionType) => {
          matchedActions.push({
            actionType,
            callbackSet
          });
        });
      }
    });

    return matchedActions;
  }
}