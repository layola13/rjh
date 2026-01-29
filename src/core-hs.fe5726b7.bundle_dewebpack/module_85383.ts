import { getOwnPropertyNames } from './object-get-own-property-names';
import { global } from './global';
import { uncurryThis } from './function-uncurry-this';
import { isForced } from './is-forced';
import { inheritIfRequired } from './inherit-if-required';
import { createNonEnumerableProperty } from './create-non-enumerable-property';
import { getOwnPropertyDescriptor } from './object-get-own-property-descriptor';
import { isPrototypeOf } from './object-is-prototype-of';
import { isRegExp } from './is-regexp';
import { toString } from './to-string';
import { getRegExpFlags } from './regexp-get-flags';
import { regExpFlags } from './regexp-flags';
import { setSpecies } from './set-species';
import { redefine } from './redefine';
import { fails } from './fails';
import { hasOwn } from './has-own-property';
import { internalStateGetterFor } from './internal-state';
import { setToStringTag } from './set-to-string-tag';
import { wellKnownSymbol } from './well-known-symbol';
import { REGEXP_UNSUPPORTED_DOT_ALL } from './regexp-unsupported-dot-all';
import { REGEXP_UNSUPPORTED_NCG } from './regexp-unsupported-ncg';

const MATCH = wellKnownSymbol('match');
const NativeRegExp = global.RegExp;
const RegExpPrototype = NativeRegExp.prototype;
const NativeSyntaxError = global.SyntaxError;
const exec = uncurryThis(RegExpPrototype.exec);
const charAt = uncurryThis(''.charAt);
const replace = uncurryThis(''.replace);
const stringIndexOf = uncurryThis(''.indexOf);
const stringSlice = uncurryThis(''.slice);
const CAPTURE_GROUP_PATTERN = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
const TEST_REGEXP_1 = /a/g;
const TEST_REGEXP_2 = /a/g;

const CORRECT_NEW = new NativeRegExp(TEST_REGEXP_1) !== TEST_REGEXP_1;
const MISSED_STICKY = regExpFlags.MISSED_STICKY;
const UNSUPPORTED_Y = regExpFlags.UNSUPPORTED_Y;

const BASE_FORCED = isForced(
  'RegExp',
  CORRECT_NEW &&
    (!CORRECT_NEW ||
      MISSED_STICKY ||
      REGEXP_UNSUPPORTED_DOT_ALL ||
      REGEXP_UNSUPPORTED_NCG ||
      fails(() => {
        TEST_REGEXP_2[MATCH] = false;
        return (
          NativeRegExp(TEST_REGEXP_1) != TEST_REGEXP_1 ||
          NativeRegExp(TEST_REGEXP_2) == TEST_REGEXP_2 ||
          NativeRegExp(TEST_REGEXP_1, 'i') != '/a/i'
        );
      }))
);

interface RegExpInternalState {
  dotAll?: boolean;
  raw?: RegExp;
  sticky?: boolean;
  groups?: Array<[string, number]>;
}

interface ParsedRegExpPattern {
  pattern: string;
  groups: Array<[string, number]>;
}

function parseRegExpPattern(pattern: string): [string, Array<[string, number]>] {
  let char: string;
  const patternLength = pattern.length;
  let index = 0;
  let result = '';
  const groups: Array<[string, number]> = [];
  const groupNames: Record<string, boolean> = {};
  let inCharClass = false;
  let inNamedGroup = false;
  let groupCount = 0;
  let currentGroupName = '';

  while (index <= patternLength) {
    char = charAt(pattern, index);

    if (char === '\\') {
      char += charAt(pattern, ++index);
    } else if (char === ']') {
      inCharClass = false;
    } else if (!inCharClass) {
      if (char === '[') {
        inCharClass = true;
      } else if (char === '(') {
        if (exec(CAPTURE_GROUP_PATTERN, stringSlice(pattern, index + 1))) {
          index += 2;
          inNamedGroup = true;
        }
        result += char;
        groupCount++;
        index++;
        continue;
      } else if (char === '>' && inNamedGroup) {
        if (currentGroupName === '' || hasOwn(groupNames, currentGroupName)) {
          throw new NativeSyntaxError('Invalid capture group name');
        }
        groupNames[currentGroupName] = true;
        groups[groups.length] = [currentGroupName, groupCount];
        inNamedGroup = false;
        currentGroupName = '';
        index++;
        continue;
      }
    }

    if (inNamedGroup) {
      currentGroupName += char;
    } else {
      result += char;
    }
    index++;
  }

  return [result, groups];
}

function convertDotAllPattern(pattern: string): string {
  let char: string;
  const patternLength = pattern.length;
  let index = 0;
  let result = '';
  let inCharClass = false;

  while (index <= patternLength) {
    char = charAt(pattern, index);

    if (char !== '\\') {
      if (inCharClass || char !== '.') {
        if (char === '[') {
          inCharClass = true;
        } else if (char === ']') {
          inCharClass = false;
        }
        result += char;
      } else {
        result += '[\\s\\S]';
      }
    } else {
      result += char + charAt(pattern, ++index);
    }
    index++;
  }

  return result;
}

if (BASE_FORCED) {
  const PolyfillRegExp = function RegExp(
    pattern: RegExp | string,
    flags?: string
  ): RegExp {
    const isPrototypeOfResult = isPrototypeOf(RegExpPrototype, this);
    const isRegExpPattern = isRegExp(pattern);
    const isFlagsUndefined = flags === undefined;
    let parsedGroups: Array<[string, number]> = [];
    let actualPattern: string | RegExp = pattern;

    if (
      !isPrototypeOfResult &&
      isRegExpPattern &&
      isFlagsUndefined &&
      pattern.constructor === PolyfillRegExp
    ) {
      return pattern as RegExp;
    }

    if (isRegExpPattern || isPrototypeOf(RegExpPrototype, pattern)) {
      actualPattern = (pattern as RegExp).source;
      if (isFlagsUndefined) {
        flags = getRegExpFlags(pattern as RegExp);
      }
    }

    const normalizedPattern =
      actualPattern === undefined ? '' : toString(actualPattern);
    let normalizedFlags = flags === undefined ? '' : toString(flags);
    const originalPattern = actualPattern;

    let hasDotAll = false;
    let hasSticky = false;

    if (REGEXP_UNSUPPORTED_DOT_ALL && 'dotAll' in TEST_REGEXP_1) {
      hasDotAll = !!normalizedFlags && stringIndexOf(normalizedFlags, 's') > -1;
      if (hasDotAll) {
        normalizedFlags = replace(normalizedFlags, /s/g, '');
      }
    }

    const originalFlags = normalizedFlags;

    if (MISSED_STICKY && 'sticky' in TEST_REGEXP_1) {
      hasSticky = !!normalizedFlags && stringIndexOf(normalizedFlags, 'y') > -1;
      if (hasSticky && UNSUPPORTED_Y) {
        normalizedFlags = replace(normalizedFlags, /y/g, '');
      }
    }

    let processedPattern: string;
    if (REGEXP_UNSUPPORTED_NCG) {
      const parsed = parseRegExpPattern(normalizedPattern);
      processedPattern = parsed[0];
      parsedGroups = parsed[1];
    } else {
      processedPattern = normalizedPattern;
    }

    const result = inheritIfRequired(
      NativeRegExp(processedPattern, normalizedFlags),
      isPrototypeOfResult ? this : RegExpPrototype,
      PolyfillRegExp
    );

    if (hasDotAll || hasSticky || parsedGroups.length) {
      const state = internalStateGetterFor<RegExpInternalState>(result);

      if (hasDotAll) {
        state.dotAll = true;
        state.raw = PolyfillRegExp(
          convertDotAllPattern(processedPattern),
          originalFlags
        );
      }

      if (hasSticky) {
        state.sticky = true;
      }

      if (parsedGroups.length) {
        state.groups = parsedGroups;
      }
    }

    if (processedPattern !== originalPattern) {
      try {
        createNonEnumerableProperty(
          result,
          'source',
          originalPattern === '' ? '(?:)' : originalPattern
        );
      } catch (error) {
        // Ignore errors
      }
    }

    return result;
  } as unknown as RegExpConstructor;

  const propertyNames = getOwnPropertyNames(NativeRegExp);
  let propertyIndex = 0;

  while (propertyNames.length > propertyIndex) {
    setSpecies(PolyfillRegExp, NativeRegExp, propertyNames[propertyIndex++]);
  }

  RegExpPrototype.constructor = PolyfillRegExp;
  PolyfillRegExp.prototype = RegExpPrototype;
  redefine(global, 'RegExp', PolyfillRegExp, { constructor: true });
}

setToStringTag('RegExp');