/**
 * Module: module_84086
 * Original ID: 84086
 * 
 * Base iterator factory that converts various input types into iterator functions.
 * Handles functions, null/undefined, arrays, objects, and property accessors.
 */

import { TypeOf } from './type-of'; // module 194243
import { MatchesProperty } from './matches-property'; // module 7774
import { BaseIteratee } from './base-iteratee'; // module 166183
import { Identity } from './identity'; // module 843509
import { IsArray } from './is-array'; // module 962726
import { Property } from './property'; // module 804162

/**
 * Creates an iterator function based on the input value type.
 * 
 * @param value - The value to convert into an iterator function:
 *   - Function: Returns as-is
 *   - null/undefined: Returns identity function
 *   - Array: Creates property matcher [key, value]
 *   - Object: Creates property matcher
 *   - String/Number: Creates property accessor
 * @returns An iterator function that can be used for collection operations
 * 
 * @example
 *