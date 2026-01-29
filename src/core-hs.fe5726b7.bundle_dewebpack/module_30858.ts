const STACK_TRACE_PATTERN = /\n\s*at [^:]*:[^\n]*/;

const errorStack = String(new Error("zxcasd").stack);
const hasStackTraceSupport = STACK_TRACE_PATTERN.test(errorStack);

/**
 * Removes stack trace lines from an error stack string
 * @param stack - The error stack string to clean
 * @param linesToRemove - Number of stack trace lines to remove
 * @returns The cleaned stack string
 */
export function removeStackTraceLines(stack: string, linesToRemove: number): string {
    if (hasStackTraceSupport && typeof stack === "string" && !(Error as any).prepareStackTrace) {
        let cleanedStack = stack;
        for (let i = 0; i < linesToRemove; i++) {
            cleanedStack = cleanedStack.replace(STACK_TRACE_PATTERN, "");
        }
        return cleanedStack;
    }
    return stack;
}