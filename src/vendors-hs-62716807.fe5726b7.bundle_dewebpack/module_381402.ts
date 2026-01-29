/**
 * Checks if Object.defineProperty is supported and working correctly
 * @returns {PropertyDescriptor | false} The Object.defineProperty function if supported, false otherwise
 */
function checkDefinePropertySupport(): PropertyDescriptor | false {
    let defineProperty: PropertyDescriptor | false = Object.defineProperty || false;
    
    if (defineProperty) {
        try {
            (Object.defineProperty as PropertyDescriptor)({}, "a", {
                value: 1
            });
        } catch (error) {
            defineProperty = false;
        }
    }
    
    return defineProperty;
}

export default checkDefinePropertySupport();