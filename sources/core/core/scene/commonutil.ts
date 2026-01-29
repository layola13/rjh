export interface MassProperty {
  x?: number;
  y?: number;
}

export interface Logger {
  console: {
    assert(condition: boolean, message: string): void;
  };
}

export class CommonUtil {
  /**
   * Parses mass property coordinates into a unique key string
   * @param massProperty - Object containing x and y coordinates
   * @param blockLocalId - Local identifier for the block
   * @returns Formatted key string in the format "blockLocalId-x-y" or empty string
   */
  static parseMassPropertyToKey(
    massProperty: MassProperty | undefined,
    blockLocalId: string
  ): string {
    if (!massProperty) {
      // Logger.console.assert(false, "massProperty is undefined");
      return "";
    }

    if (!blockLocalId) {
      // Logger.console.assert(false, "block localid should not be empty");
    }

    let key = "";

    if (massProperty.x !== undefined && massProperty.y !== undefined) {
      key = `${blockLocalId}-${Number(massProperty.x)}-${Number(massProperty.y)}`;
    }

    return key;
  }
}