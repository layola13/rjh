import { getOwnPropertyNamesFiltered } from './module_842139';

const EXCLUDED_PROPERTIES: readonly string[] = [
  'length',
  'prototype'
] as const;

export const getOwnPropertyNames = Object.getOwnPropertyNames || function(obj: any): string[] {
  return getOwnPropertyNamesFiltered(obj, EXCLUDED_PROPERTIES);
};

export const f = getOwnPropertyNames;