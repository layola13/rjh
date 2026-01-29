type TrimMode = 1 | 2 | 3;

interface TrimFunctions {
  start: (value: unknown) => string;
  end: (value: unknown) => string;
  trim: (value: unknown) => string;
}

const WHITESPACE_CHARS = " \n\r\t\f\v\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";

const TRIM_START_REGEX = new RegExp(`^[${WHITESPACE_CHARS}]+`);
const TRIM_END_REGEX = new RegExp(`(^|[^${WHITESPACE_CHARS}])[${WHITESPACE_CHARS}]+$`);

const TRIM_START_MODE: TrimMode = 1;
const TRIM_END_MODE: TrimMode = 2;
const TRIM_BOTH_MODE: TrimMode = 3;

function createTrimFunction(mode: TrimMode): (value: unknown) => string {
  return (value: unknown): string => {
    const stringValue = String(value ?? '');
    let result = stringValue;

    if ((mode & TRIM_START_MODE) !== 0) {
      result = result.replace(TRIM_START_REGEX, '');
    }

    if ((mode & TRIM_END_MODE) !== 0) {
      result = result.replace(TRIM_END_REGEX, '$1');
    }

    return result;
  };
}

const trimFunctions: TrimFunctions = {
  start: createTrimFunction(TRIM_START_MODE),
  end: createTrimFunction(TRIM_END_MODE),
  trim: createTrimFunction(TRIM_BOTH_MODE)
};

export default trimFunctions;
export const { start, end, trim } = trimFunctions;