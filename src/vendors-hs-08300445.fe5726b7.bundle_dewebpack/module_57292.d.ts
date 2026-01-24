/**
 * A cross-platform hook that uses useLayoutEffect on the client and useEffect on the server.
 * This prevents warnings during server-side rendering while maintaining synchronous layout
 * effects in the browser.
 * 
 * @module useIsomorphicLayoutEffect
 */

import { useEffect, useLayoutEffect } from 'react';

/**
 * Hook that safely uses useLayoutEffect in browser environments and useEffect in SSR.
 * 
 * - In browser environments (client-side): uses `useLayoutEffect` for synchronous DOM updates
 * - In server environments (SSR/Node.js): uses `useEffect` to avoid React warnings
 * 
 * @example
 *