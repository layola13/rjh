import { internalObjectKeys } from './module_34701';

const HIDDEN_PROPERTIES = ['length', 'prototype'];

export const getOwnPropertyNames = Object.getOwnPropertyNames || function (obj: object): string[] {
  const hiddenProps = [...internalObjectKeys, ...HIDDEN_PROPERTIES];
  return internalObjectKeys(obj, hiddenProps);
};

export const f = getOwnPropertyNames;