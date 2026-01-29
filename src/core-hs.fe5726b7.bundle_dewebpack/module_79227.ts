import { global } from './81482';
import { getOwnPropertyDescriptor } from './1726';
import { createNonEnumerableProperty } from './71154';
import { redefine } from './13327';
import { createGlobalProperty } from './58588';
import { copyConstructorProperties } from './22451';
import { isForced } from './32111';

interface ExportOptions {
  target: string;
  global?: boolean;
  stat?: boolean;
  dontCallGetSet?: boolean;
  forced?: boolean;
  sham?: boolean;
}

interface PropertyDescriptor {
  value?: unknown;
  sham?: boolean;
}

type ExportDefinitions = Record<string, unknown>;

export function exportModule(
  options: ExportOptions,
  definitions: ExportDefinitions
): void {
  let targetObject: Record<string, unknown> | undefined;
  let propertyName: string;
  let existingValue: unknown;
  let newValue: unknown;
  let descriptor: PropertyDescriptor | undefined;

  const { target, global: isGlobal, stat: isStatic, dontCallGetSet, forced, sham } = options;

  if (isGlobal) {
    targetObject = global;
  } else if (isStatic) {
    targetObject = (global as Record<string, unknown>)[target] ?? createGlobalProperty(target, {});
  } else {
    const targetConstructor = (global as Record<string, unknown>)[target];
    targetObject = (targetConstructor as { prototype?: Record<string, unknown> } | undefined)?.prototype;
  }

  if (!targetObject) {
    return;
  }

  for (propertyName in definitions) {
    newValue = definitions[propertyName];

    if (dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(targetObject, propertyName);
      existingValue = descriptor?.value;
    } else {
      existingValue = targetObject[propertyName];
    }

    const key = isGlobal 
      ? propertyName 
      : `${target}${isStatic ? '.' : '#'}${propertyName}`;

    if (!isForced(key, forced) && existingValue !== undefined) {
      if (typeof newValue === typeof existingValue) {
        continue;
      }
      copyConstructorProperties(newValue, existingValue);
    }

    if (sham || (descriptor?.sham ?? (existingValue as PropertyDescriptor | undefined)?.sham)) {
      createNonEnumerableProperty(newValue, 'sham', true);
    }

    redefine(targetObject, propertyName, newValue, options);
  }
}