export interface ClassStyles {
  [className: string]: React.CSSProperties | undefined;
}

export interface StylesMap {
  default?: ClassStyles;
  [variant: string]: ClassStyles | undefined;
}

/**
 * Merges CSS-in-JS class styles based on selected variants
 * @param styles - Object containing default and variant-specific styles
 * @param variants - Array of variant names to merge
 * @returns Merged styles object
 */
export function mergeClasses(
  styles: StylesMap,
  variants: string[] = []
): ClassStyles {
  const mergedStyles: ClassStyles = 
    (styles.default && { ...styles.default }) || {};

  variants.forEach((variantName) => {
    const variantStyles = styles[variantName];
    
    if (variantStyles) {
      Object.keys(variantStyles).forEach((className) => {
        if (!mergedStyles[className]) {
          mergedStyles[className] = {};
        }
        
        mergedStyles[className] = {
          ...mergedStyles[className],
          ...variantStyles[className]
        };
      });
    }
  });

  return mergedStyles;
}

export default mergeClasses;