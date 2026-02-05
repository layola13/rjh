// @ts-nocheck
import { FurnitureDimension } from './282597';

interface PrecisionConfig {
  isIntType: boolean;
  dimUnitType?: string;
  dimPrecisionDigits?: number;
}

interface DimensionRules {
  intOnly: boolean;
  fixedUnitType?: string;
  fixedDisplayDigits?: number;
}

interface DimensionData {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

interface ValueChangeData {
  value: number;
  oldValue: number;
  dim: DimensionData;
}

interface ValueChangeEvent {
  data: ValueChangeData;
}

interface EntityTransform {
  x: number;
  y: number;
  z: number;
  groupPosition?: {
    x: number;
    y: number;
    z: number;
  };
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Entity {
  id: string;
  signalDirty: unknown;
}

interface Room {
  isFlagOn(flag: number): boolean;
}

export default class CustomFurnitureDimension extends FurnitureDimension {
  private contents: Entity[];
  private transformContent: Entity[];
  private target: EntityTransform;
  private room?: Room;
  private signalHook: {
    listen(signal: unknown, handler: Function): void;
  };

  constructor(
    entity: unknown,
    context: unknown,
    contents: Entity | Entity[],
    room?: Room,
    additionalContents: Entity[] = []
  ) {
    super(entity, context, undefined, room);

    this.contents = Array.isArray(contents) ? contents : [contents];
    this.getRules();
    this.transformContent = this.contents;

    if (additionalContents.length) {
      this.transformContent = [...this.contents, ...additionalContents];
    }

    const contentTransform = this._getContentTransform(this.transformContent);
    this.init(contentTransform);
  }

  protected getRules(entity?: { getPrecisionConfig(): PrecisionConfig }): void {
    const rules: DimensionRules = {
      intOnly: false
    };

    if (entity) {
      const precisionConfig = entity.getPrecisionConfig();
      rules.intOnly = precisionConfig.isIntType;
      rules.fixedUnitType = precisionConfig.dimUnitType;
      rules.fixedDisplayDigits = precisionConfig.dimPrecisionDigits;
      this.setConfig(precisionConfig);
    }

    this.setRules(rules);
  }

  protected getRoomContentIn(): Room | undefined {
    const entityLayer = HSCore.Util.Layer.getEntityLayer(this.contents[0]);
    const roomContent = HSCore.Util.Room.getRoomContentIn(this.contents[0], entityLayer);

    if (!roomContent || !roomContent.isFlagOn(HSCore.Model.RoomFlagEnum.dimensionOff)) {
      return roomContent;
    }

    return undefined;
  }

  protected onActivate(): void {
    super.onActivate();

    this.contents.forEach((content) => {
      this.signalHook.listen(content.signalDirty, this._entityDirtied);
    });
  }

  protected onValueChanged(event: ValueChangeEvent): void {
    this._applyValueChange(event);
  }

  protected updateDimensionData(): void {
    this.target = this._getContentTransform(this.transformContent);
    
    if (this.room) {
      super.updateDimensionData();
    }
  }

  protected updateDimensionDataByContent(): void {
    this.target = this._getContentTransform(this.contents);
    
    if (this.room) {
      super.updateDimensionData();
    }
  }

  private _checkContentValid(entity: Entity): boolean {
    return this.contents.every((content) => entity.id !== content.id);
  }

  private _getContentTransform(entities: Entity[]): EntityTransform {
    if (entities.length === 1) {
      return HSApp.Util.Entity.getEntityTransform(entities[0]);
    }
    
    return HSApp.Util.Entity.getEntityTransform(entities);
  }

  private _applyValueChange(event: ValueChangeEvent): void {
    if (HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    const dimension = event.data.dim;
    const originalLength = new THREE.Vector3()
      .subVectors(dimension.end, dimension.start)
      .length();

    this.updateDimensionDataByContent();

    const newLength = new THREE.Vector3()
      .subVectors(dimension.end, dimension.start)
      .length();
    const lengthDelta = newLength - originalLength;
    const newValue = event.data.value;

    if (!dimension) {
      return;
    }

    const calculateNewPosition = (
      dim: DimensionData,
      value: number
    ): Position => {
      const direction = new THREE.Vector3().subVectors(dim.end, dim.start);
      const newDirection = direction.clone().setLength(value + lengthDelta);
      const offset = new THREE.Vector3().subVectors(direction, newDirection);
      const basePosition = this.target.groupPosition || this.target;

      return {
        x: basePosition.x + offset.x,
        y: basePosition.y + offset.y,
        z: basePosition.z + offset.z
      };
    };

    const newPosition = calculateNewPosition(dimension, newValue);

    const applyPositionChange = (position: Position): void => {
      const commandManager = this.context.application.cmdManager;

      if (this.contents.length === 1) {
        const command = commandManager.createCommand(
          HSFPConstants.CommandType.MoveContent,
          [this.contents[0]]
        );
        commandManager.execute(command);
        commandManager.receive('moveto', { position });
      } else if (this.contents.length > 1) {
        const command = commandManager.createCommand(
          HSFPConstants.CommandType.MoveContents,
          [this.contents]
        );
        commandManager.execute(command);
        commandManager.receive('moveto', { position });
      }
    };

    applyPositionChange(newPosition);
  }

  private setConfig(config: PrecisionConfig): void {
    // Implementation from parent class
  }

  private setRules(rules: DimensionRules): void {
    // Implementation from parent class
  }

  private init(transform: EntityTransform): void {
    // Implementation from parent class
  }

  private _entityDirtied: () => void;
}