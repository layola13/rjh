interface UnitValue {
  unit: string;
  value: number;
}

interface WindowParameters {
  a?: UnitValue;
  b?: UnitValue;
  c?: UnitValue;
  d?: UnitValue;
  height: UnitValue;
}

interface UserFreeData {
  parameters?: WindowParameters;
}

interface ContentType {
  isTypeOf(type: unknown): boolean;
}

interface WindowContent {
  contentType: ContentType;
  userFreeData: UserFreeData;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
}

interface DimensionData {
  XLength: number;
  YLength: number;
  ZLength: number;
}

class WindowProcessor {
  static process(content: WindowContent, context: unknown): WindowContent {
    const parameters = content.userFreeData.parameters;

    if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerWindow)) {
      if (parameters) {
        const dimensions: DimensionData = {
          XLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.a!.unit,
            parameters.a!.value + parameters.c!.value
          ),
          YLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.b!.unit,
            parameters.b!.value + parameters.d!.value
          ),
          ZLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.height.unit,
            parameters.height.value
          )
        };
        Object.assign(content, dimensions);
      }
    } else if (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow) &&
      HSCore.Util.Content.isCornerWindow(content)
    ) {
      if (parameters) {
        const dimensions: DimensionData = {
          XLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.a!.unit,
            parameters.a!.value
          ),
          YLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.b!.unit,
            parameters.b!.value
          ),
          ZLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.height.unit,
            parameters.height.value
          )
        };
        Object.assign(content, dimensions);
      }
    } else if (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CornerFlatWindow) &&
      HSCore.Util.Content.isCornerWindow(content)
    ) {
      if (parameters) {
        const dimensions: DimensionData = {
          XLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.b!.unit,
            parameters.b!.value
          ),
          YLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.c!.unit,
            parameters.c!.value
          ),
          ZLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.height.unit,
            parameters.height.value
          )
        };
        Object.assign(content, dimensions);
      }
    } else if (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.POrdinaryWindow) &&
      HSCore.Util.Content.isCornerWindow(content)
    ) {
      if (parameters) {
        const DEFAULT_Y_VALUE = 0.24;
        const dimensions: DimensionData = {
          XLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.b!.unit,
            parameters.b!.value
          ),
          YLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.b!.unit,
            DEFAULT_Y_VALUE
          ),
          ZLength: HSCore.Util.Unit.ConvertToMeter(
            parameters.height.unit,
            parameters.height.value
          )
        };
        Object.assign(content, dimensions);
      }
    }

    return content;
  }
}

export default WindowProcessor;