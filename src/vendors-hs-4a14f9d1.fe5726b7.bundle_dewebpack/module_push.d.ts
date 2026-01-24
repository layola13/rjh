/**
 * Pushes a value onto the virtual stack and returns the generated code string.
 * Manages stack pointer (sp) and tracks maximum stack depth (maxSp).
 * 
 * @param value - The value or expression to push onto the stack
 * @returns Generated code string representing the push operation
 */
function push(value: string): string {
    const code = `${s(++this.sp)} = ${value};\n`;
    
    if (this.sp > this.maxSp) {
        this.maxSp = this.sp;
    }
    
    return code;
}

/**
 * Type definition for the context object containing stack management state.
 */
interface StackContext {
    /** Current stack pointer position */
    sp: number;
    
    /** Maximum stack pointer value reached during execution */
    maxSp: number;
    
    /**
     * Pushes a value onto the virtual stack
     * @param value - The value to push
     * @returns Generated code string
     */
    push(value: string): string;
}

/**
 * Helper function to generate stack slot identifier.
 * Should be defined in the containing scope.
 * 
 * @param index - Stack slot index
 * @returns Stack slot identifier (e.g., "s0", "stack[0]", etc.)
 */
declare function s(index: number): string;