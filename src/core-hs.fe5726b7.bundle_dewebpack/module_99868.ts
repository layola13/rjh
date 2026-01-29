import { call } from './47730';
import { functionBind } from './61259';
import { toString } from './24200';
import { regExpFlags } from './35710';
import { regExpStickyHelpers } from './69278';
import { getInternalState } from './80880';
import { objectCreate } from './50179';
import { get as getRegExpState } from './86812';
import { regExpUnsupportedDotAll } from './88318';
import { regExpUnsupportedNCG } from './60715';

interface RegExpState {
  raw?: RegExp;
  groups?: Array<[string, number]>;
}

interface RegExpExecResult extends RegExpExecArray {
  groups?: Record<string, string | undefined>;
}

const nativeStringReplace = getInternalState<typeof String.prototype.replace>(
  'native-string-replace',
  String.prototype.replace
);

const regExpPrototypeExec = RegExp.prototype.exec;
const charAt = functionBind.call(String.prototype.charAt);
const indexOf = functionBind.call(String.prototype.indexOf);
const replace = functionBind.call(String.prototype.replace);
const slice = functionBind.call(String.prototype.slice);

const testRegExp1 = /a/;
const testRegExp2 = /b*/g;

call(regExpPrototypeExec, testRegExp1, 'a');
call(regExpPrototypeExec, testRegExp2, 'a');

const UPDATES_LAST_INDEX_WRONG = 
  testRegExp1.lastIndex !== 0 || testRegExp2.lastIndex !== 0;

const BROKEN_CARET = regExpStickyHelpers.BROKEN_CARET;
const NPCG_INCLUDED = /()??/.exec('')?.[1] !== undefined;

let patchedExec = regExpPrototypeExec;

if (UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || BROKEN_CARET || regExpUnsupportedDotAll || regExpUnsupportedNCG) {
  patchedExec = function exec(this: RegExp, string: unknown): RegExpExecResult | null {
    const regexp = this;
    const state = getRegExpState(regexp);
    const stringValue = toString(string);
    const raw = state.raw;

    if (raw) {
      raw.lastIndex = regexp.lastIndex;
      const result = call(patchedExec, raw, stringValue);
      regexp.lastIndex = raw.lastIndex;
      return result;
    }

    const groups = state.groups;
    const sticky = BROKEN_CARET && regexp.sticky;
    let flags = call(regExpFlags, regexp);
    let source = regexp.source;
    let charsAdded = 0;
    let strCopy = stringValue;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = slice(stringValue, regexp.lastIndex);

      if (
        regexp.lastIndex > 0 &&
        (!regexp.multiline || (regexp.multiline && charAt(stringValue, regexp.lastIndex - 1) !== '\n'))
      ) {
        source = '(?:' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }

      var stickyRegExp = new RegExp('^(?:' + source + ')', flags);
    }

    let npcgRegExp: RegExp | undefined;
    if (NPCG_INCLUDED) {
      npcgRegExp = new RegExp('^' + source + '$(?!\\s)', flags);
    }

    let previousLastIndex: number | undefined;
    if (UPDATES_LAST_INDEX_WRONG) {
      previousLastIndex = regexp.lastIndex;
    }

    const result = call(
      regExpPrototypeExec,
      sticky ? stickyRegExp! : regexp,
      strCopy
    ) as RegExpExecResult | null;

    if (sticky) {
      if (result) {
        result.input = slice(result.input, charsAdded);
        result[0] = slice(result[0], charsAdded);
        result.index = regexp.lastIndex;
        regexp.lastIndex += result[0].length;
      } else {
        regexp.lastIndex = 0;
      }
    } else if (UPDATES_LAST_INDEX_WRONG && result) {
      regexp.lastIndex = regexp.global ? result.index + result[0].length : previousLastIndex!;
    }

    if (NPCG_INCLUDED && result && result.length > 1) {
      call(nativeStringReplace, result[0], npcgRegExp!, (...args: unknown[]) => {
        for (let groupIndex = 1; groupIndex < args.length - 2; groupIndex++) {
          if (args[groupIndex] === undefined) {
            result[groupIndex] = undefined;
          }
        }
      });
    }

    if (result && groups) {
      result.groups = objectCreate(null) as Record<string, string | undefined>;
      for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
        const group = groups[groupIndex];
        result.groups[group[0]] = result[group[1]];
      }
    }

    return result;
  };
}

export default patchedExec;