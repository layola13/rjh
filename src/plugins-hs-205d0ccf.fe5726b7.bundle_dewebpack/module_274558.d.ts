/**
 * Polyfill Module Loader
 * 
 * This module imports a collection of polyfills and compatibility shims
 * to ensure cross-browser support for modern JavaScript features.
 * 
 * @module PolyfillLoader
 * @description Aggregates and loads various polyfills for ES6+, DOM APIs, and other runtime features
 */

/**
 * Type definition for webpack module factory function
 * @internal
 */
type WebpackModuleFactory = (
  exports: Record<string, unknown>,
  module: { exports: Record<string, unknown> },
  require: (moduleId: number) => unknown
) => void;

/**
 * Polyfill loader module that ensures all required compatibility shims are loaded
 * 
 * This module depends on the following polyfill modules (imported by ID):
 * - 641563: Core ES6+ polyfills
 * - 665765: Array methods polyfills
 * - 702507: Object methods polyfills
 * - 695524: String methods polyfills
 * - 561685: Promise polyfills
 * - 701874: Symbol polyfills
 * - 346928: Iterator protocol polyfills
 * - 536690: Collection types (Map, Set, WeakMap, WeakSet)
 * - 62095: Typed arrays polyfills
 * - 980894: Reflect API polyfills
 * - 28093: Proxy polyfills
 * - 620684: Function methods polyfills
 * - 26129: Number methods polyfills
 * - 918909: Math methods polyfills
 * - 126669: Date polyfills
 * - 481328: RegExp polyfills
 * - 525129: JSON polyfills
 * - 109592: Console polyfills
 * - 677837: DOM polyfills
 * - 271380: Event polyfills
 * - 494049: Fetch API polyfills
 * - 847940: URL API polyfills
 * - 204423: FormData polyfills
 * - 939737: Blob polyfills
 * - 879036: FileReader polyfills
 * - 44822: Web Workers polyfills
 * - 43834: WebSocket polyfills
 * - 305537: Storage API polyfills
 * - 399846: IndexedDB polyfills
 * - 887855: MutationObserver polyfills
 * - 757611: IntersectionObserver polyfills
 * - 347913: ResizeObserver polyfills
 * - 699247: PerformanceObserver polyfills
 * - 309849: RequestAnimationFrame polyfills
 * - 471313: CustomEvent polyfills
 * - 350879: AbortController polyfills
 * - 950173: Intl polyfills
 * - 578262: Crypto API polyfills
 * - 831545: TextEncoder/TextDecoder polyfills
 * - 460731: Base64 polyfills
 * - 939267: Streams API polyfills
 * - 688448: Web Animations API polyfills
 * - 379354: Clipboard API polyfills
 * - 307097: Notification API polyfills
 * - 599073: Geolocation API polyfills
 * - 137761: WebRTC polyfills
 * - 576827: MediaStream polyfills
 * - 22835: Audio/Video API polyfills
 * - 810323: Canvas API polyfills
 * - 196031: WebGL polyfills
 * - 455967: SVG polyfills
 * - 554660: Pointer Events polyfills
 * - 432076: Touch Events polyfills
 * - 322347: Drag and Drop polyfills
 * - 299833: Fullscreen API polyfills
 * - 866116: Page Visibility API polyfills
 * - 369587: Service Worker polyfills
 * 
 * @param exports - Module exports object
 * @param module - Module object with exports property
 * @param require - Webpack require function for loading dependencies
 */
declare const polyfillLoader: WebpackModuleFactory;

export { polyfillLoader as default };
export type { WebpackModuleFactory };