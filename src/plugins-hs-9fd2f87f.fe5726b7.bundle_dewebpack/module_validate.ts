/**
 * Validates if a number is within the acceptable range (0 to 7000 inclusive)
 * @param value - The number to validate
 * @returns True if the value is between 0 and 7000, false otherwise
 */
function validate(value: number): boolean {
    const MAX_VALUE = 7000;
    const MIN_VALUE = 0;
    
    return value >= MIN_VALUE && value <= MAX_VALUE;
}

export { validate };