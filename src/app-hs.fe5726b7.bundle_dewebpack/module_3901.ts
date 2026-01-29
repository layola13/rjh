export enum ModeTypeEnum {
  normal = "normal",
  iframe = "iframe",
  readonly = "readonly"
}

interface RegionLang {
  code: string;
  displayName: string;
}

interface Region {
  code: string;
  displayName: string;
  defaultLang: string;
  langs: RegionLang[];
}

interface RegionConfig {
  items: Region[];
  defaultRegioncode: string;
}

interface QueryStrings {
  [key: string]: string;
}

interface SetRegionParams {
  region?: string;
  locale?: string;
}

interface URLParamSchema {
  key: string;
  alias: string;
}

interface ParamResult {
  key: string;
  value: string;
}

enum LogLevel {
  info = "info",
  debug = "debug",
  warn = "warn",
  error = "error"
}

const toBoolean = (value: string, defaultValue: boolean): boolean => {
  try {
    const ret = eval(value.toLowerCase());
    if (typeof ret === "boolean") {
      return ret;
    }
  } catch (e) {
    // Ignore error
  }
  return defaultValue ?? false;
};

export class Params {
  mode: ModeTypeEnum = ModeTypeEnum.normal;
  locale: string = "zh_CN";
  assetId?: string;
  tenant: string = "ezhome";
  ismodeller: boolean = false;
  svgCanvas: boolean = true;
  webglCanvas: boolean = true;
  debug: boolean = false;
  level: LogLevel = LogLevel.info;
  sessionkey?: string;
  usenativesignin: boolean = false;
  defaultRegion: Region;
  allRegions: Region[];
  region: Region;
  ngm: boolean = false;
  ngmui: boolean = false;
  frametask: boolean = true;
  diymaterial: boolean = false;
  paintworker: boolean = true;
  polygontool: boolean = true;
  multiLayer: boolean = true;
  parseFgiInWorker: boolean = false;
  nativeuv: boolean = true;
  env: string = "default";
  biz: string = "";
  langSwitch: boolean = false;
  isPreProdEnv: boolean = false;
  newPropertyBar: boolean = true;
  hardupgrade: boolean = false;
  mtlSubEnv: string = "default_sub_env";
  aux3d?: boolean;
  aux2d?: boolean;
  seekid?: string;
  coupontype?: string;
  
  private _queryStrings?: QueryStrings;
  [key: string]: unknown;

  constructor() {
    this.defaultRegion = {
      code: "global",
      displayName: "Chinese",
      defaultLang: "zh_CN",
      langs: [
        {
          code: "en_US",
          displayName: "English"
        },
        {
          code: "zh_CN",
          displayName: "中文"
        },
        {
          code: "fr_FR",
          displayName: "Français"
        }
      ]
    };
    this.allRegions = [this.defaultRegion];
    this.region = { ...this.defaultRegion };
    this.reset();
  }

  reset(): void {
    this.mode = ModeTypeEnum.normal;
    this.locale = "zh_CN";
    this.assetId = undefined;
    this.tenant = "ezhome";
    this.ismodeller = false;
    this.svgCanvas = true;
    this.webglCanvas = true;
    this.debug = false;
    this.level = LogLevel.info;
    this.sessionkey = undefined;
    this.usenativesignin = false;
    this.defaultRegion = {
      code: "global",
      displayName: "Chinese",
      defaultLang: "zh_CN",
      langs: [
        {
          code: "en_US",
          displayName: "English"
        },
        {
          code: "zh_CN",
          displayName: "中文"
        },
        {
          code: "fr_FR",
          displayName: "Français"
        }
      ]
    };
    this.allRegions = [this.defaultRegion];
    this.region = { ...this.defaultRegion };
    this.ngm = false;
    this.ngmui = false;
    this.frametask = true;
    this.diymaterial = false;
    this.paintworker = true;
    this.polygontool = true;
    this.multiLayer = true;
    this.parseFgiInWorker = false;
    this.nativeuv = true;
    this.env = "default";
    this.biz = "";
    this.langSwitch = false;
    this.isPreProdEnv = false;
    this.newPropertyBar = true;
    this.hardupgrade = false;
    this.mtlSubEnv = "default_sub_env";
  }

  set(queryStrings: QueryStrings): void {
    this._queryStrings = { ...queryStrings };
    
    for (const key in queryStrings) {
      const value = queryStrings[key].trim();
      
      if (!queryStrings.hasOwnProperty(key) || value === "") {
        continue;
      }

      switch (key) {
        case "ngm":
          break;
        case "ngmui":
          this.ngmui = toBoolean(value, false);
          break;
        case "mode":
          if (Object.values(ModeTypeEnum).includes(value as ModeTypeEnum)) {
            this.mode = value as ModeTypeEnum;
          }
          break;
        case "level":
          this.level = value as LogLevel;
          break;
        case "brand":
          this.tenant = value.toLowerCase();
          break;
        case "lang":
        case "locale":
          this.locale = value;
          break;
        case "svg":
          this.svgCanvas = toBoolean(value, this.svgCanvas);
          break;
        case "webgl3d":
          this.webglCanvas = toBoolean(value, this.webglCanvas);
          break;
        case "aux3d":
          this.aux3d = toBoolean(value, this.aux3d ?? false);
          break;
        case "aux2d":
          this.aux2d = toBoolean(value, this.aux2d ?? false);
          break;
        case "fcdbg":
          this.debug = toBoolean(value, this.debug);
          break;
        case "frametask":
          this.frametask = toBoolean(value, true);
          break;
        case "diymaterial":
          this.diymaterial = toBoolean(value, false);
          break;
        case "paintworker":
          this.paintworker = toBoolean(value, false);
          break;
        case "polygontool":
          this.polygontool = toBoolean(value, false);
          break;
        case "parseFgiInWorker":
          this.parseFgiInWorker = toBoolean(value, false);
          break;
        case "multiLayer":
          this.multiLayer = toBoolean(value, true);
          break;
        case "seekid":
        case "assetId":
        case "sessionkey":
        case "coupontype":
          (this as any)[key] = value;
          break;
        case "hs_design_id":
          this.assetId = value;
          break;
        case "modeller":
          this.ismodeller = toBoolean(value, this.ismodeller);
          break;
        case "usenativesignin":
          this.usenativesignin = toBoolean(value, this.usenativesignin);
          break;
        case "env":
          this.env = value.toLowerCase();
          break;
        case "biz":
          this.biz = value.toLowerCase();
          break;
        case "langSwitch":
          this.langSwitch = toBoolean(value, false);
          break;
        case "newPropertyBar":
          this.newPropertyBar = toBoolean(value, true);
          break;
        case "hardupgrade":
          this.hardupgrade = toBoolean(value, false);
          break;
        default:
          this["_" + key] = value;
      }
    }

    this.setRegion({
      region: queryStrings.region,
      locale: this.locale
    });
  }

  getParam(paramKey: string): unknown | ParamResult | undefined {
    if (this.hasOwnProperty(paramKey)) {
      return (this as any)[paramKey];
    }

    let paramValue = (this as any)["_" + paramKey];
    const urlParamSchema = (globalThis as any).HSApp?.Config?.URL_PARAM_SCHEMA as URLParamSchema[] | undefined;
    let schemaMatch: URLParamSchema | undefined;
    let result: ParamResult | undefined;

    if (urlParamSchema) {
      if (paramKey === "coupon" && !paramValue && this.env === "ihome") {
        paramValue = "ysjj";
      }
      schemaMatch = urlParamSchema.find(
        (schema) => schema.key === paramKey && schema.alias === paramValue
      );
    }

    if (paramKey && (this as any)["_" + paramKey] && paramValue) {
      result = {
        key: (this as any)["_" + paramKey],
        value: paramValue
      };
    }

    return schemaMatch ?? result;
  }

  setRegion(params: SetRegionParams, config?: RegionConfig): void {
    if (config?.items) {
      this.allRegions = config.items;
      this.defaultRegion = this.allRegions.find(
        (region) => region.code.toLowerCase() === config.defaultRegioncode.toLowerCase()
      ) ?? this.defaultRegion;
    }

    this.region = this.allRegions.find(
      (region) => region.code.toLowerCase() === (params.region ?? this.defaultRegion.code).toLowerCase()
    ) ?? this.defaultRegion;

    const matchedLang = this.region.langs.find(
      (lang) => lang.code.toLowerCase() === (params.locale ?? this.locale).toLowerCase()
    );
    this.locale = matchedLang ? matchedLang.code : this.region.defaultLang;
  }

  setLocale(localeCode?: string): void {
    const matchedLang = this.region.langs.find(
      (lang) => lang.code.toLowerCase() === (localeCode ?? this.region.defaultLang).toLowerCase()
    );
    this.locale = matchedLang ? matchedLang.code : this.region.defaultLang;
  }

  setQS(queryStrings: QueryStrings): void {
    this._queryStrings = { ...queryStrings };
  }
}