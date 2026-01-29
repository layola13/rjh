import * as React from 'react';

export function getChildMapping(children: React.ReactNode): Record<string, React.ReactElement> {
  if (!children) {
    return children as any;
  }

  const result: Record<string, React.ReactElement> = {};

  React.Children.map(children, (child) => child)?.forEach((child) => {
    if (React.isValidElement(child) && child.key !== null) {
      result[child.key] = child;
    }
  });

  return result;
}

export function mergeChildMappings(
  prev: Record<string, React.ReactElement> | undefined,
  next: Record<string, React.ReactElement> | undefined
): Record<string, React.ReactElement> {
  const prevMapping = prev || {};
  const nextMapping = next || {};

  function getValueForKey(key: string): React.ReactElement {
    return nextMapping.hasOwnProperty(key) ? nextMapping[key] : prevMapping[key];
  }

  const pendingKeys: Record<string, string[]> = {};
  const pendingKeyBuffer: string[] = [];

  for (const prevKey in prevMapping) {
    if (nextMapping.hasOwnProperty(prevKey)) {
      if (pendingKeyBuffer.length) {
        pendingKeys[prevKey] = pendingKeyBuffer;
        pendingKeyBuffer.length = 0;
      }
    } else {
      pendingKeyBuffer.push(prevKey);
    }
  }

  const mergedMapping: Record<string, React.ReactElement> = {};

  for (const nextKey in nextMapping) {
    if (pendingKeys.hasOwnProperty(nextKey)) {
      for (let i = 0; i < pendingKeys[nextKey].length; i++) {
        const pendingKey = pendingKeys[nextKey][i];
        mergedMapping[pendingKey] = getValueForKey(pendingKey);
      }
    }
    mergedMapping[nextKey] = getValueForKey(nextKey);
  }

  for (let i = 0; i < pendingKeyBuffer.length; i++) {
    mergedMapping[pendingKeyBuffer[i]] = getValueForKey(pendingKeyBuffer[i]);
  }

  return mergedMapping;
}