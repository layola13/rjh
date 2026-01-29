/**
 * Module: ContentInRoomRelation
 * Manages the relationship between content entities and rooms using bit manipulation for efficient storage.
 */

import { EntityEventType } from './EntityEventType';
import { RelationshipType, SupportedSignalTypes } from './RelationshipTypes';

/**
 * Calculator for bit manipulation operations to store multiple boolean values in a single number.
 */
class BitFieldCalculator {
  /**
   * @param stepDistance - Number of bits allocated for each stored value
   */
  constructor(private readonly _stepDistance: number) {}

  /**
   * Extracts a value from a specific step position in the bit field.
   * @param value - The bit field value
   * @param step - The step index to extract
   * @returns The extracted value at the specified step
   */
  getValue(value: number, step: number): number {
    const offset = step * this._stepDistance;
    const nextOffset = offset + this._stepDistance;
    return (value - ((value >> nextOffset) << nextOffset)) >> offset;
  }

  /**
   * Calculates a new bit field value with updated data at a specific step.
   * @param newValue - The new value to insert
   * @param step - The step index to update
   * @param currentValue - The current bit field value (default: 0)
   * @returns The updated bit field value
   */
  calcNewTarget(newValue: number, step: number, currentValue: number = 0): number {
    const currentStepValue = this.getValue(currentValue, step);
    const offset = step * this._stepDistance;
    return currentValue - (currentStepValue << offset) + (newValue << offset);
  }
}

/**
 * Configuration object for relationship manager callbacks.
 */
interface RelationConfig {
  targetTypes: Array<typeof HSCore.Model.Floor | typeof HSCore.Model.Layer | typeof HSCore.Model.Content | typeof HSCore.Model.CustomizedPMModel | typeof HSCore.Model.CustomizedPMInstanceModel>;
  actionTypes: SupportedSignalTypes[];
  callback: (event: RelationEvent) => void;
}

/**
 * Event data structure for relationship signals.
 */
interface RelationEvent {
  target?: HSCore.Model.Floor | HSCore.Model.Layer | HSCore.Model.Content | HSCore.Model.CustomizedPMInstanceModel;
  data?: {
    type?: EntityEventType;
    entity?: HSCore.Model.Floor | HSCore.Model.Content | HSCore.Model.CustomizedPMInstanceModel;
  };
}

/**
 * Manager interface for registering relationship configurations.
 */
interface RelationManager {
  registerConfigs(type: RelationshipType, configs: RelationConfig[]): void;
}

/**
 * Option step mapping for boolean values.
 */
interface OptionStepMap {
  true: number;
  false: number;
}

/**
 * Manages the relationship between content entities and rooms.
 * Uses bit manipulation to efficiently store multiple boolean states per entity-room pair.
 */
export class ContentInRoomRelation {
  private readonly _type: RelationshipType;
  private readonly _stepDistance: number;
  private readonly _optionStep: OptionStepMap;
  private readonly _data: Map<string, Map<string, number>>;
  private readonly _manager: RelationManager;
  private readonly _calculator: BitFieldCalculator;

  /**
   * @param manager - The relationship manager instance
   */
  constructor(manager: RelationManager) {
    this._type = RelationshipType.IsContentInRoom;
    this._stepDistance = 2;
    this._optionStep = {
      true: 0,
      false: 1
    };
    this._data = new Map();
    this._manager = manager;
    this._calculator = new BitFieldCalculator(this._stepDistance);
    this._init();
  }

  /**
   * Initializes the relationship by registering event callbacks.
   * @private
   */
  private _init(): void {
    this._manager.registerConfigs(this._type, [
      {
        targetTypes: [HSCore.Model.Floor],
        actionTypes: [SupportedSignalTypes.Dirty],
        callback: (event: RelationEvent) => {
          if (event?.data?.type === EntityEventType.Geometry) {
            this.clearByRoom(event.target as HSCore.Model.Floor);
          }
        }
      },
      {
        targetTypes: [HSCore.Model.Layer],
        actionTypes: [SupportedSignalTypes.ChildAdded, SupportedSignalTypes.ChildRemoved],
        callback: (event: RelationEvent) => {
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
        callback: (event: RelationEvent) => {
          this.clearByEntity(event?.target);
        }
      },
      {
        targetTypes: [HSCore.Model.CustomizedPMModel],
        actionTypes: [SupportedSignalTypes.ChildRemoved],
        callback: (event: RelationEvent) => {
          this.clearByEntity(event?.data?.entity);
        }
      }
    ]);
  }

  /**
   * Converts a bit field value to a boolean result.
   * @param value - The bit field value (1 = true, 2 = false)
   * @returns The boolean value or undefined if invalid
   * @private
   */
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

  /**
   * Converts a boolean to a bit field value.
   * @param data - The boolean value
   * @returns The bit field value (1 for true, 2 for false)
   * @private
   */
  private _convertDataToValue(data: boolean): number {
    return data ? 1 : 2;
  }

  /**
   * Converts an option boolean to a step index.
   * @param option - The option value
   * @returns The corresponding step index
   * @private
   */
  private _convertOptionToStep(option: boolean): number {
    return option === true ? this._optionStep.true : this._optionStep.false;
  }

  /**
   * Retrieves the relationship data for an entity in a room.
   * @param entity - The content entity
   * @param room - The room entity
   * @param option - The option flag to determine which stored value to retrieve
   * @returns True if the entity is in the room, false otherwise, or undefined if no data exists
   */
  getData(
    entity: { id: string },
    room: { id: string },
    option: boolean
  ): boolean | undefined {
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

  /**
   * Sets the relationship data for an entity in a room.
   * @param data - True if the entity is in the room, false otherwise
   * @param entity - The content entity
   * @param room - The room entity
   * @param option - The option flag to determine which stored value to update
   */
  setData(
    data: boolean,
    entity: { id: string },
    room: { id: string },
    option: boolean
  ): void {
    const value = this._convertDataToValue(data);
    const step = this._convertOptionToStep(option);
    
    let roomData = this._data.get(room.id);
    if (roomData) {
      const currentValue = roomData.get(entity.id);
      const newValue = this._calculator.calcNewTarget(value, step, currentValue);
      roomData.set(entity.id, newValue);
    } else {
      const newValue = this._calculator.calcNewTarget(value, step);
      roomData = new Map();
      roomData.set(entity.id, newValue);
      this._data.set(room.id, roomData);
    }
  }

  /**
   * Clears all relationship data for a specific room.
   * @param room - The room entity to clear
   */
  clearByRoom(room?: { id: string }): void {
    if (room?.id) {
      this._data.delete(room.id);
    }
  }

  /**
   * Clears all relationship data for a specific entity across all rooms.
   * @param entity - The content entity to clear
   */
  clearByEntity(entity?: { id: string }): void {
    if (entity?.id) {
      this._data.forEach((roomData) => {
        roomData.delete(entity.id);
      });
    }
  }

  /**
   * Clears all relationship data.
   */
  clearAll(): void {
    this._data.clear();
  }
}