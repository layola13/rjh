import { getObjectClassName } from './module_97303';
import { toIndexedObject } from './module_2918';
import { getOwnPropertyNamesModule } from './module_66547';
import { arraySlice } from './module_90762';

const WINDOW_PROPERTY_NAMES: PropertyKey[] = 
  typeof window === 'object' && window && Object.getOwnPropertyNames 
    ? Object.getOwnPropertyNames(window) 
    : [];

/**
 * Gets own property names of an object, with special handling for Window objects.
 * Falls back to a cached array copy if accessing Window properties throws an error.
 * 
 * @param target - The object to get property names from
 * @returns Array of property names
 */
function getOwnPropertyNamesWithWindowFallback(target: unknown): PropertyKey[] {
  const isWindowObject = WINDOW_PROPERTY_NAMES && getObjectClassName(target) === 'Window';
  
  if (isWindowObject) {
    try {
      return getOwnPropertyNamesModule.f(target);
    } catch (error) {
      return arraySlice(WINDOW_PROPERTY_NAMES);
    }
  }
  
  return getOwnPropertyNamesModule.f(toIndexedObject(target));
}

export const f = getOwnPropertyNamesWithWindowFallback;