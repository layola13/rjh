import { unsafeStringify } from './stringify';
import v6ToV1 from './v6ToV1';
import nativeRandomUUID from './nativeRandomUUID';

interface V7Options {
  msecs?: number;
  seq?: number;
  random?: Uint8Array;
  _v6?: boolean;
}

type UUIDBuffer = Uint8Array;

export default function v7(
  options: V7Options = {},
  buffer?: UUIDBuffer,
  offset: number = 0
): string | UUIDBuffer {
  const mergedOptions: V7Options = {
    ...options,
    _v6: true
  };

  let uuid = v6ToV1(mergedOptions, new Uint8Array(16));
  uuid = nativeRandomUUID(uuid);

  if (buffer) {
    for (let index = 0; index < 16; index++) {
      buffer[offset + index] = uuid[index];
    }
    return buffer;
  }

  return unsafeStringify(uuid);
}