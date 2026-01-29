interface StylerOptions {
  entire?: boolean;
}

interface ModelEntity {
  Class: string;
}

interface Styler {
  // Add specific styler methods if known
}

class DefaultStyler implements Styler {
  constructor(entity: ModelEntity) {}
}

class EntireStyler implements Styler {
  constructor(entity: ModelEntity) {}
}

class StylerFactory {
  static createStyler(entity: ModelEntity | null | undefined, options?: StylerOptions): Styler | undefined {
    if (!entity) {
      return undefined;
    }

    const opts = options ?? {};
    let styler: Styler | undefined;

    switch (entity.Class) {
      case HSConstants.ModelClass.NgDoor:
      case HSConstants.ModelClass.NgWindow:
      case HSConstants.ModelClass.NgHole:
        styler = opts.entire ? new EntireStyler(entity) : new DefaultStyler(entity);
        break;
    }

    return styler;
  }

  static getStylerEnv(entity: ModelEntity | null | undefined): string | undefined {
    if (!entity) {
      return undefined;
    }

    let environment: string | undefined;

    switch (entity.Class) {
      case HSConstants.ModelClass.NgDoor:
      case HSConstants.ModelClass.NgWindow:
      case HSConstants.ModelClass.NgHole:
        environment = HSFPConstants.Environment.OpeningStyler;
        break;
    }

    return environment;
  }
}

export default StylerFactory;