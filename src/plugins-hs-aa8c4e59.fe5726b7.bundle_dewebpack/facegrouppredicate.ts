import { Predicate } from './Predicate';
import { DataType } from './DataType';
import { getCompareByDataType } from './utils';
import { ParameterNames } from './ParameterNames';

type CompareFunction<T = unknown> = (currentValue: T, targetValue: T) => boolean;

interface ParameterInstance {
  type: DataType;
  value: unknown;
}

interface ExecuteContext {
  instance: {
    getParameter(name: string): ParameterInstance | null | undefined;
  };
}

export class ParameterPredicate extends Predicate {
  protected paramName: string;
  protected targetValue: unknown;
  protected compare: CompareFunction;

  constructor(paramName: string, targetValue: unknown, compare: CompareFunction) {
    super();
    this.paramName = paramName;
    this.targetValue = targetValue;
    this.compare = compare;
  }

  execute(context: ExecuteContext): boolean {
    const parameter = context.instance.getParameter(this.paramName);
    
    if (!parameter) {
      return false;
    }

    const compareFunc = this.compare ?? getCompareByDataType(parameter.type);
    return compareFunc(parameter.value, this.targetValue);
  }
}

export class HostRoomPredicate extends ParameterPredicate {
  readonly roomId: unknown;

  constructor(roomId: unknown) {
    super(
      ParameterNames.roomId,
      roomId,
      getCompareByDataType(DataType.String)
    );
    this.roomId = roomId;
  }
}

export class HostLayerPredicate extends ParameterPredicate {
  readonly layerId: unknown;

  constructor(layerId: unknown) {
    super(
      ParameterNames.layerId,
      layerId,
      getCompareByDataType(DataType.String)
    );
    this.layerId = layerId;
  }
}

export class FaceGroupPredicate extends ParameterPredicate {
  constructor() {
    super(
      'faceGroupId',
      undefined,
      (currentValue: unknown, _targetValue: unknown): boolean => {
        return !!currentValue;
      }
    );
  }
}