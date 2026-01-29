type CSSProperties = Record<string, string | number | undefined>;
type StyleObject = Record<string, CSSProperties>;

interface PrefixFunctions {
  borderRadius: (value: string | number) => CSSProperties;
  boxShadow: (value: string) => CSSProperties;
  userSelect: (value: string) => CSSProperties;
  flex: (value: string | number) => CSSProperties;
  flexBasis: (value: string) => CSSProperties;
  justifyContent: (value: string) => CSSProperties;
  transition: (value: string) => CSSProperties;
  transform: (value: string) => CSSProperties;
  absolute: (value?: string) => CSSProperties;
  extend: (value: string, styles: StyleObject) => CSSProperties;
}

const prefixHandlers: PrefixFunctions = {
  borderRadius(value: string | number): CSSProperties {
    return {
      msBorderRadius: value,
      MozBorderRadius: value,
      OBorderRadius: value,
      WebkitBorderRadius: value,
      borderRadius: value,
    };
  },

  boxShadow(value: string): CSSProperties {
    return {
      msBoxShadow: value,
      MozBoxShadow: value,
      OBoxShadow: value,
      WebkitBoxShadow: value,
      boxShadow: value,
    };
  },

  userSelect(value: string): CSSProperties {
    return {
      WebkitTouchCallout: value,
      KhtmlUserSelect: value,
      MozUserSelect: value,
      msUserSelect: value,
      WebkitUserSelect: value,
      userSelect: value,
    };
  },

  flex(value: string | number): CSSProperties {
    return {
      WebkitBoxFlex: value,
      MozBoxFlex: value,
      WebkitFlex: value,
      msFlex: value,
      flex: value,
    };
  },

  flexBasis(value: string): CSSProperties {
    return {
      WebkitFlexBasis: value,
      flexBasis: value,
    };
  },

  justifyContent(value: string): CSSProperties {
    return {
      WebkitJustifyContent: value,
      justifyContent: value,
    };
  },

  transition(value: string): CSSProperties {
    return {
      msTransition: value,
      MozTransition: value,
      OTransition: value,
      WebkitTransition: value,
      transition: value,
    };
  },

  transform(value: string): CSSProperties {
    return {
      msTransform: value,
      MozTransform: value,
      OTransform: value,
      WebkitTransform: value,
      transform: value,
    };
  },

  absolute(value?: string): CSSProperties {
    const parts = value?.split(' ');
    return {
      position: 'absolute',
      top: parts?.[0],
      right: parts?.[1],
      bottom: parts?.[2],
      left: parts?.[3],
    };
  },

  extend(value: string, styles: StyleObject): CSSProperties {
    const result = styles[value];
    return result ?? { extend: value };
  },
};

/**
 * Automatically adds vendor prefixes to CSS properties
 * @param styles - Object containing CSS styles organized by selector
 * @returns Transformed styles with vendor prefixes applied
 */
export function autoprefix(styles: StyleObject): StyleObject {
  const result: StyleObject = {};

  for (const [selector, properties] of Object.entries(styles)) {
    let prefixedProperties: CSSProperties = {};

    for (const [property, value] of Object.entries(properties)) {
      const handler = prefixHandlers[property as keyof PrefixFunctions];
      
      if (handler) {
        prefixedProperties = {
          ...prefixedProperties,
          ...handler(value as any),
        };
      } else {
        prefixedProperties[property] = value;
      }
    }

    result[selector] = prefixedProperties;
  }

  return result;
}

export default autoprefix;