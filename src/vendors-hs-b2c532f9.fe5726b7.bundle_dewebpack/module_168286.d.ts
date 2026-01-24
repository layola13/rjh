/**
 * React secret token used internally to validate React elements.
 * This constant is used by React to mark and validate elements created by React.createElement.
 * 
 * @internal
 * @see https://github.com/facebook/react/blob/main/packages/shared/ReactSymbols.js
 */
export const SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

/**
 * Type definition for the React secret validation token.
 * This string literal type ensures type safety when checking React internal markers.
 */
export type ReactSecretToken = typeof SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED;

export default SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED;