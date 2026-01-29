import { EntityEventType } from './EntityEventType';
import { RelationshipType, SupportedSignalTypes } from './RelationshipTypes';

interface OptionStep {
  true: number;
  false: number;
}

interface ConfigRegistration {
  targetTypes: any[];
  actionTypes: SupportedSignalTypes[];
  callback: (event: any) => void;
}

interface RelationshipManager {
  registerConfigs(type: RelationshipType, configs: ConfigRegistration[]): void;
}

class StepCalculator {
  private readonly _stepDistance: number;

  constructor(stepDistance: number) {
    this._stepDistance = stepDistance;
  }

  getValue(value: number, step: number): number {
    const offset = step * this._stepDistance;
    const nextOffset = offset + this._stepDistance;
    return (value - ((value >> nextOffset) << nextOffset)) >> offset;
  }

  calcNewTarget(newValue: number, step: number, currentTarget: number = 0): number {
    const extractedValue = this.getValue(currentTarget, step);
    const offset = step * this._stepDistance;
    return currentTarget - (extractedValue << offset) + (newValue << offset);
  }
}

export class ContentInRoomRelation {
  private readonly _type: RelationshipType;
  private readonly _stepDistance: number;
  private readonly _optionStep: OptionStep;
  private readonly _data: Map<string, Map<string, number>>;
  private readonly _manager: RelationshipManager;
  private readonly _calculator: StepCalculator;

  constructor(manager: RelationshipManager) {
    this._type = RelationshipType.IsContentInRoom;
    this._stepDistance = 2;
    this._optionStep = {
      true: 0,
      false: 1
    };
    this._data = new Map();
    this._manager = manager;
    this._calculator = new StepCalculator(this._stepDistance);
    this._init();
  }

  private _init(): void {
    this._manager.registerConfigs(this._type, [
      {
        targetTypes: [HSCore.Model.Floor],
        actionTypes: [SupportedSignalTypes.Dirty],
        callback: (event) => {
          if (event?.data?.type === EntityEventType.Geometry) {
            this.clearByRoom(event.target);
          }
        }
      },
      {
        targetTypes: [HSCore.Model.Layer],
        actionTypes: [SupportedSignalTypes.ChildAdded, SupportedSignalTypes.ChildRemoved],
        callback: (event) => {
          const entity = event?.data?.entity;
          if (entity instanceof HSCore.Model.Floor) {
            this.clearByRoom(entity);
          } else if (entity instanceof HSCore.Model.Content) {
            this.clearByEntity(entity);
          }
        }
      },
      {
        targetTypes: [HSCore.Model.Content, HSCore.Model.CustomizedPMInstanceModel],
        actionTypes: [SupportedSignalTypes.Dirty],
        callback: (event) => {
          this.clearByEntity(event?.target);
        }
      },
      {
        targetTypes: [HSCore.Model.CustomizedPMModel],
        actionTypes: [SupportedSignalTypes.ChildRemoved],
        callback: (event) => {
          this.clearByEntity(event?.data?.entity);
        }
      }
    ]);
  }

  private _convertValueToData(value: number): boolean | undefined {
    switch (value) {
      case 1:
        return true;
      case 2:
        return false;
      default:
        return undefined;
    }
  }

  private _convertDataToValue(data: boolean): number {
    return data ? 1 : 2;
  }

  private _convertOptionToStep(option: boolean): number {
    return option === true ? this._optionStep.true : this._optionStep.false;
  }

  getData(entity: any, room: any, option: boolean): boolean | undefined {
    const roomData = this._data.get(room.id);
    if (roomData) {
      const entityValue = roomData.get(entity.id);
      if (entityValue !== undefined) {
        const step = this._convertOptionToStep(option);
        const value = this._calculator.getValue(entityValue, step);
        return this._convertValueToData(value);
      }
    }
    return undefined;
  }

  setData(data: boolean, entity: any, room: any, option: boolean): void {
    const value = this._convertDataToValue(data);
    const step = this._convertOptionToStep(option);
    
    let roomData = this._data.get(room.id);
    if (roomData) {
      const currentValue = roomData.get(entity.id);
      const newTarget = this._calculator.calcNewTarget(value, step, currentValue);
      roomData.set(entity.id, newTarget);
    } else {
      const newTarget = this._calculator.calcNewTarget(value, step);
      roomData = new Map();
      roomData.set(entity.id, newTarget);
      this._data.set(room.id, roomData);
    }
  }

  clearByRoom(room: any): void {
    this._data.delete(room?.id);
  }

  clearByEntity(entity: any): void {
    this._data.forEach((roomData) => {
      roomData.delete(entity?.id);
    });
  }

  clearAll(): void {
    this._data.clear();
  }
}