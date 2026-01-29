export function invariant(
  condition: boolean,
  format?: string,
  arg1?: unknown,
  arg2?: unknown,
  arg3?: unknown,
  arg4?: unknown,
  arg5?: unknown,
  arg6?: unknown
): asserts condition {
  if (!condition) {
    let error: Error;

    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
      );
    } else {
      const args = [arg1, arg2, arg3, arg4, arg5, arg6];
      let argIndex = 0;

      error = new Error(
        format.replace(/%s/g, () => String(args[argIndex++]))
      );
      error.name = 'Invariant Violation';
    }

    (error as Error & { framesToPop?: number }).framesToPop = 1;
    throw error;
  }
}