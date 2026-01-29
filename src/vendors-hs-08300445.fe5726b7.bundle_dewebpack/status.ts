export const STATUS_ADD = "add";
export const STATUS_KEEP = "keep";
export const STATUS_REMOVE = "remove";
export const STATUS_REMOVED = "removed";

type Status = typeof STATUS_ADD | typeof STATUS_KEEP | typeof STATUS_REMOVE | typeof STATUS_REMOVED;

interface KeyObject {
  key: string;
  [key: string]: unknown;
}

interface KeyObjectWithStatus extends KeyObject {
  status: Status;
}

export function wrapKeyToObject(item: unknown): KeyObject {
  const baseObject: KeyObject = item && typeof item === "object" && "key" in item 
    ? (item as KeyObject) 
    : { key: item as string | number };
  
  return {
    ...baseObject,
    key: String(baseObject.key)
  };
}

export function parseKeys(keys: unknown[] = []): KeyObject[] {
  return keys.map(wrapKeyToObject);
}

export function diffKeys(
  prevKeys: unknown[] = [], 
  currentKeys: unknown[] = []
): KeyObjectWithStatus[] {
  let result: KeyObjectWithStatus[] = [];
  let startIndex = 0;
  const currentLength = currentKeys.length;
  const parsedPrevKeys = parseKeys(prevKeys);
  const parsedCurrentKeys = parseKeys(currentKeys);

  parsedPrevKeys.forEach((prevKey) => {
    let found = false;

    for (let i = startIndex; i < currentLength; i += 1) {
      const currentKey = parsedCurrentKeys[i];

      if (currentKey.key === prevKey.key) {
        if (startIndex < i) {
          result = result.concat(
            parsedCurrentKeys.slice(startIndex, i).map((key) => ({
              ...key,
              status: STATUS_ADD
            }))
          );
        }

        startIndex = i;
        result.push({
          ...currentKey,
          status: STATUS_KEEP
        });
        startIndex += 1;
        found = true;
        break;
      }
    }

    if (!found) {
      result.push({
        ...prevKey,
        status: STATUS_REMOVE
      });
    }
  });

  if (startIndex < currentLength) {
    result = result.concat(
      parsedCurrentKeys.slice(startIndex).map((key) => ({
        ...key,
        status: STATUS_ADD
      }))
    );
  }

  const keyCountMap: Record<string, number> = {};
  result.forEach((item) => {
    const { key } = item;
    keyCountMap[key] = (keyCountMap[key] || 0) + 1;
  });

  const duplicateKeys = Object.keys(keyCountMap).filter((key) => keyCountMap[key] > 1);

  duplicateKeys.forEach((duplicateKey) => {
    result = result.filter((item) => {
      const { key, status } = item;
      return key !== duplicateKey || status !== STATUS_REMOVE;
    });

    result.forEach((item) => {
      if (item.key === duplicateKey) {
        item.status = STATUS_KEEP;
      }
    });
  });

  return result;
}