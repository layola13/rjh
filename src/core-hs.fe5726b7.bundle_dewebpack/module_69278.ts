interface RegExpFlags {
  BROKEN_CARET: boolean;
  MISSED_STICKY: boolean;
  UNSUPPORTED_Y: boolean;
}

/**
 * Detects RegExp 'y' (sticky) flag support and known implementation issues
 */
function detectRegExpIssues(): RegExpFlags {
  /**
   * Check if browser fails basic 'y' flag functionality
   */
  const isUnsupportedY = fails(() => {
    const regex = new RegExp("a", "y");
    regex.lastIndex = 2;
    return regex.exec("abcd") !== null;
  });

  /**
   * Check if 'sticky' property is missing
   */
  const isMissedSticky = isUnsupportedY || fails(() => {
    return !new RegExp("a", "y").sticky;
  });

  /**
   * Check if caret (^) anchor is broken with 'gy' flags
   */
  const isBrokenCaret = isUnsupportedY || fails(() => {
    const regex = new RegExp("^r", "gy");
    regex.lastIndex = 2;
    return regex.exec("str") !== null;
  });

  return {
    BROKEN_CARET: isBrokenCaret,
    MISSED_STICKY: isMissedSticky,
    UNSUPPORTED_Y: isUnsupportedY
  };
}

/**
 * Executes a function and returns true if it throws an error
 */
function fails(testFn: () => boolean): boolean {
  try {
    return testFn();
  } catch {
    return true;
  }
}

export const { BROKEN_CARET, MISSED_STICKY, UNSUPPORTED_Y } = detectRegExpIssues();