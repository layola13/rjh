interface DraftState {
  [z: symbol]: StateMetadata;
}

interface StateMetadata {
  u: Record<string, unknown>; // base state
  k: Record<string, unknown>; // draft state
  N: Record<string, boolean>; // modified flags
  t: number; // state type
}

interface ArrayStateMetadata {
  u: unknown[];
  k: unknown[];
  N: boolean[];
  t: number;
}

interface ModuleContext {
  o?: boolean;
  p: unknown[];
}

const z = Symbol('draft');

function isDraftable(value: unknown): value is DraftState {
  return value !== null && typeof value === 'object';
}

function hasOwnProperty(obj: object, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function forEachKey(obj: Record<string, unknown>, callback: (key: string) => void): void {
  Object.keys(obj).forEach(callback);
}

function markChanged(metadata: StateMetadata | ArrayStateMetadata): void {
  // Implementation for marking state as changed
}

function isModified(metadata: ArrayStateMetadata): boolean {
  // Check if array has been modified
  return metadata.N.some(flag => flag === true);
}

function processState(draft: unknown): void {
  if (!isDraftable(draft)) {
    return;
  }

  const metadata = draft[z];
  if (!metadata) {
    return;
  }

  const baseState = metadata.u;
  const draftState = metadata.k;
  const modifiedFlags = metadata.N;
  const stateType = metadata.t;

  if (stateType === 4) {
    // Object state type
    forEachKey(draftState as Record<string, unknown>, (key: string) => {
      if (key === z.toString()) {
        return;
      }

      const baseObj = baseState as Record<string, unknown>;
      const draftObj = draftState as Record<string, unknown>;
      const flags = modifiedFlags as Record<string, boolean>;

      if (baseObj[key] !== undefined || hasOwnProperty(baseObj, key)) {
        if (!flags[key]) {
          processState(draftObj[key]);
        }
      } else {
        flags[key] = true;
        markChanged(metadata);
      }
    });

    forEachKey(baseState as Record<string, unknown>, (key: string) => {
      const draftObj = draftState as Record<string, unknown>;
      const flags = modifiedFlags as Record<string, boolean>;

      if (draftObj[key] === undefined && !hasOwnProperty(draftObj, key)) {
        flags[key] = false;
        markChanged(metadata);
      }
    });
  } else if (stateType === 5) {
    // Array state type
    const arrayMetadata = metadata as ArrayStateMetadata;
    const baseArray = arrayMetadata.u;
    const draftArray = arrayMetadata.k;
    const flags = arrayMetadata.N;

    if (isModified(arrayMetadata)) {
      markChanged(arrayMetadata);
      flags.length = true as unknown as boolean;
    }

    if (draftArray.length < baseArray.length) {
      for (let index = draftArray.length; index < baseArray.length; index++) {
        flags[index] = false;
      }
    } else {
      for (let index = baseArray.length; index < draftArray.length; index++) {
        flags[index] = true;
      }
    }

    const minLength = Math.min(draftArray.length, baseArray.length);
    for (let index = 0; index < minLength; index++) {
      if (!draftArray.hasOwnProperty(index)) {
        flags[index] = true;
      }
      if (flags[index] === undefined) {
        processState(draftArray[index]);
      }
    }
  }
}

function finalize(context: ModuleContext): void {
  if (context.p && context.p.length > 0) {
    processState(context.p[0]);
  }
}

export function moduleP(context: ModuleContext, exports: unknown, isProduction: boolean): void {
  if (isProduction) {
    const contextDraft = context as DraftState;
    if (isDraftable(exports) && contextDraft[z]?.A === context) {
      finalize(context);
    }
  } else {
    if (context.o) {
      finalize(context);
    }
  }
}