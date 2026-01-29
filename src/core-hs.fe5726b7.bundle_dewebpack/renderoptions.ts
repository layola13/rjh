import { DomeLightOption } from './DomeLightOption';

const VALID_TEMPERATURE_NAMES = new Set(Object.values(HSConstants.Render.TEMPERATURE_NAME));

interface TemplateInfo {
  name: string;
  intelligent: boolean;
  isNight: boolean;
  renderBindingType: HSConstants.Render.TemplateRenderBinding;
}

interface DomeLightData {
  brightness: number;
  reflection: number;
  toneIndex: number;
  toneTemperature: number;
}

interface RenderOptionsSnapshot {
  currentTemplate: {
    name: string;
    intelligent: boolean;
    enable: boolean;
    isNight: boolean;
    renderBindingType: HSConstants.Render.TemplateRenderBinding;
  };
  currentGroup?: string;
  domeLight: DomeLightData;
  seniorParams?: unknown;
}

interface TemplateCache {
  removeAllMembers(): void;
}

export class RenderOptions {
  static readonly AlternateTemplateName = HSConstants.Render.TEMPERATURE_NAME.REALISTIC;

  private _templateRenderBinding: HSConstants.Render.TemplateRenderBinding;
  private _templateName: string;
  private _templateIntelligent: boolean;
  private _templateEnabled: boolean;
  private _templateIsNight: boolean;
  private _currentGroup?: string;
  private _seniorParams?: unknown;
  private _domeLightData: DomeLightOption;
  private _templateCache?: TemplateCache;

  constructor() {
    this._templateRenderBinding = HSConstants.Render.TemplateRenderBinding.Common;
    this._templateName = '';
    this._templateIntelligent = true;
    this._templateEnabled = true;
    this._templateIsNight = false;
    this._currentGroup = undefined;
    this._seniorParams = undefined;
    this._domeLightData = new DomeLightOption();
  }

  setCurrentTemplate(
    name: string,
    intelligent: boolean,
    isNight: boolean,
    renderBindingType: HSConstants.Render.TemplateRenderBinding = HSConstants.Render.TemplateRenderBinding.Common
  ): void {
    if (VALID_TEMPERATURE_NAMES.has(name)) {
      this._templateName = name;
      this._templateRenderBinding = renderBindingType;
      this._templateIntelligent = intelligent;
      this._templateIsNight = isNight;
    }
  }

  get currentTemplate(): TemplateInfo {
    return {
      name: this._templateName,
      intelligent: this._templateIntelligent,
      isNight: this._templateIsNight,
      renderBindingType: this._templateRenderBinding
    };
  }

  get templateRenderBindingType(): HSConstants.Render.TemplateRenderBinding {
    return this._templateRenderBinding;
  }

  setTemplateCache(cache: TemplateCache): void {
    this.clearTemplateCache();
    this._templateCache = cache;
  }

  get currentTemplateCache(): TemplateCache | undefined {
    return this._templateCache;
  }

  clearTemplateCache(): void {
    this._templateCache?.removeAllMembers();
    this._templateCache = undefined;
  }

  setDomeLight(brightness: number, reflection: number, toneIndex: number, toneTemperature?: number): void {
    this._domeLightData.brightness = brightness;
    this._domeLightData.reflection = reflection;
    this._domeLightData.toneIndex = toneIndex;
    this._domeLightData.toneTemperature = toneTemperature ?? 6500;
  }

  get domeLightData(): DomeLightOption {
    return this._domeLightData;
  }

  resetDomeLight(): void {
    this._domeLightData.reset();
  }

  setCurrentGroup(group: string): void {
    this._currentGroup = group;
  }

  get currentGroup(): string | undefined {
    if (!this._templateEnabled) {
      return this._currentGroup;
    }
    return undefined;
  }

  get temperature(): number | undefined {
    if (this._templateEnabled) {
      const template = HSConstants.Render.RenderTemplate[this._templateName];
      return template?.value;
    }
    if (this._currentGroup) {
      return -1;
    }
    return undefined;
  }

  disableTemplate(): void {
    this._templateEnabled = false;
  }

  enableTemplate(): void {
    this._templateEnabled = true;
  }

  get isTemplateEnabled(): boolean {
    return this._templateEnabled;
  }

  get templateIsNight(): boolean {
    return this._templateIsNight;
  }

  setSeniorParams(params: unknown): void {
    this._seniorParams = params;
  }

  get seniorParams(): unknown {
    return this._seniorParams;
  }

  reset(): void {
    this._templateName = RenderOptions.AlternateTemplateName;
    this._templateIntelligent = true;
    this._templateEnabled = true;
    this._templateIsNight = false;
    this._currentGroup = undefined;
    this._seniorParams = undefined;
    this._domeLightData = new DomeLightOption();
    this.clearTemplateCache();
  }

  verify(groupMap: Record<string, unknown>): boolean {
    if (this.isTemplateEnabled) {
      return true;
    }
    return !!(this.currentGroup && groupMap.hasOwnProperty(this.currentGroup));
  }

  dump(): RenderOptionsSnapshot {
    return {
      currentTemplate: {
        name: this._templateName,
        intelligent: this._templateIntelligent,
        enable: this._templateEnabled,
        isNight: this._templateIsNight,
        renderBindingType: this._templateRenderBinding
      },
      currentGroup: this._currentGroup,
      domeLight: this._domeLightData.get(),
      seniorParams: this._seniorParams
    };
  }

  load(snapshot: Partial<RenderOptionsSnapshot>): void {
    if (snapshot.currentTemplate) {
      this._templateName = snapshot.currentTemplate.name ?? RenderOptions.AlternateTemplateName;
      this._templateIntelligent = snapshot.currentTemplate.intelligent ?? true;
      this._templateEnabled = snapshot.currentTemplate.enable ?? true;
      this._templateIsNight = snapshot.currentTemplate.isNight ?? false;
      if (snapshot.currentTemplate.renderBindingType !== undefined) {
        this._templateRenderBinding = snapshot.currentTemplate.renderBindingType;
      }
    }
    if (snapshot.currentGroup) {
      this._currentGroup = snapshot.currentGroup;
    }
    if (snapshot.domeLight) {
      this._domeLightData.set(
        snapshot.domeLight.brightness,
        snapshot.domeLight.reflection,
        snapshot.domeLight.toneIndex,
        snapshot.domeLight.toneTemperature
      );
    }
    if (snapshot.seniorParams) {
      this._seniorParams = snapshot.seniorParams;
    }
  }
}