type PayloadCreator<TPayload = any, TArgs extends any[] = any[]> = (...args: TArgs) => TPayload;
type MetaCreator<TMeta = any, TArgs extends any[] = any[]> = (...args: TArgs) => TMeta;

interface Action<TPayload = any, TMeta = any> {
  type: string;
  payload?: TPayload;
  error?: boolean;
  meta?: TMeta;
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

function isNull(value: unknown): value is null {
  return value === null;
}

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const defaultPayloadCreator: PayloadCreator = (...args: any[]) => args[0];

export default function createAction<TPayload = any, TMeta = any, TArgs extends any[] = any[]>(
  type: string,
  payloadCreator?: PayloadCreator<TPayload, TArgs> | null,
  metaCreator?: MetaCreator<TMeta, TArgs>
): (...args: TArgs) => Action<TPayload, TMeta> {
  const finalPayloadCreator = payloadCreator ?? defaultPayloadCreator;

  invariant(
    isFunction(finalPayloadCreator) || isUndefined(finalPayloadCreator) || isNull(finalPayloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  );

  const resolvedPayloadCreator = isNull(payloadCreator) ? defaultPayloadCreator : finalPayloadCreator;

  const actionCreator = (...args: TArgs): Action<TPayload, TMeta> => {
    const isErrorArgument = args[0] instanceof Error;
    const action: Action<TPayload, TMeta> = { type };

    const payload = isErrorArgument ? args[0] : resolvedPayloadCreator(...args);

    if (!isUndefined(payload)) {
      action.payload = payload;
    }

    if (isErrorArgument || payload instanceof Error) {
      action.error = true;
    }

    if (isFunction(metaCreator)) {
      action.meta = metaCreator(...args);
    }

    return action;
  };

  actionCreator.toString = (): string => {
    return type.toString();
  };

  return actionCreator;
}