import { hasNativeDefineProperty } from './module_907253';
import { hasError } from './module_679594';
import { createElement } from './module_957118';

/**
 * Checks if Object.defineProperty works correctly on DOM elements
 * by attempting to define a getter that returns 7
 */
const supportsDefinePropertyOnDOM: boolean = !hasNativeDefineProperty && !hasError(() => {
    return Object.defineProperty(createElement("div"), "a", {
        get(): number {
            return 7;
        }
    }).a !== 7;
});

export default supportsDefinePropertyOnDOM;