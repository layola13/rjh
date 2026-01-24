/**
 * Validation utilities for attribute type checking
 * Provides runtime validators that warn when invalid values are passed to attributes
 */

/**
 * Validates that a value is a number
 * @param value - The value to validate
 * @param attributeName - The name of the attribute being validated
 * @returns The original value
 */
export function validateNumberAttribute(value: unknown, attributeName: string): unknown;

/**
 * Validates that a value is a number or the string "auto"
 * @param value - The value to validate
 * @param attributeName - The name of the attribute being validated
 * @returns The original value
 */
export function validateNumberOrAutoAttribute(value: unknown, attributeName: string): unknown;

/**
 * Validates that a value is a string
 * @param value - The value to validate
 * @param attributeName - The name of the attribute being validated
 * @returns The original value
 */
export function validateStringAttribute(value: unknown, attributeName: string): unknown;

/**
 * Validates that a value is a string or a canvas gradient
 * @param value - The value to validate
 * @param attributeName - The name of the attribute being validated
 * @returns The original value
 */
export function validateStringOrGradientAttribute(value: unknown, attributeName: string): unknown;

/**
 * Validates that a value is a boolean
 * @param value - The value to validate
 * @param attributeName - The name of the attribute being validated
 * @returns The original value
 */
export function validateBooleanAttribute(value: unknown, attributeName: string): unknown;

/**
 * Creates a validator for object attributes with specific properties
 * @param requiredProperties - Description of the required properties
 * @returns A validation function for object attributes
 */
export function createObjectValidator(requiredProperties: string): (value: unknown, attributeName: string) => unknown;

/**
 * Alias for validateNumberAttribute
 */
export const d: typeof validateNumberAttribute;

/**
 * Alias for validateNumberOrAutoAttribute
 */
export const a: typeof validateNumberOrAutoAttribute;

/**
 * Alias for validateStringAttribute
 */
export const f: typeof validateStringAttribute;

/**
 * Alias for validateStringOrGradientAttribute
 */
export const e: typeof validateStringOrGradientAttribute;

/**
 * Alias for createObjectValidator
 */
export const b: typeof createObjectValidator;