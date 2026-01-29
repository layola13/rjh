type SideChannelKey = object;
type SideChannelValue = unknown;

interface SideChannel {
  assert(key: SideChannelKey): void;
  delete(key: SideChannelKey): boolean;
  get(key: SideChannelKey): SideChannelValue | undefined;
  has(key: SideChannelKey): boolean;
  set(key: SideChannelKey, value: SideChannelValue): void;
}

type MapConstructor = () => Map<SideChannelKey, SideChannelValue>;

function createInspect(value: unknown): string {
  // Placeholder for inspect functionality
  return String(value);
}

function createError(message: string): Error {
  return new Error(message);
}

function createWeakMap(): Map<SideChannelKey, SideChannelValue> {
  return new Map<SideChannelKey, SideChannelValue>();
}

export default function createSideChannel(): SideChannel {
  let storage: Map<SideChannelKey, SideChannelValue> | undefined;

  const sideChannel: SideChannel = {
    assert(key: SideChannelKey): void {
      if (!sideChannel.has(key)) {
        throw createError(`Side channel does not contain ${createInspect(key)}`);
      }
    },

    delete(key: SideChannelKey): boolean {
      return storage ? storage.delete(key) : false;
    },

    get(key: SideChannelKey): SideChannelValue | undefined {
      return storage?.get(key);
    },

    has(key: SideChannelKey): boolean {
      return storage ? storage.has(key) : false;
    },

    set(key: SideChannelKey, value: SideChannelValue): void {
      if (!storage) {
        storage = createWeakMap();
      }
      storage.set(key, value);
    }
  };

  return sideChannel;
}