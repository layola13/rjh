/**
 * A custom hook that intelligently selects between useLayoutEffect and useEffect
 * based on the execution environment (browser vs server-side).
 * 
 * @remarks
 * - In browser environments (DOM available), uses useLayoutEffect for synchronous updates
 * - In server-side rendering environments, falls back to useEffect to avoid warnings
 * 
 * @example
 *