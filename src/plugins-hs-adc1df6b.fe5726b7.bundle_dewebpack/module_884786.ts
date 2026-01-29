import { HSCore, HSCatalog, HSPaveSDK } from './HSCore';
import HSApp from './HSApp';
import HSFPConstants from './HSFPConstants';
import HSConstants from './HSConstants';
import ResourceManager from './ResourceManager';

interface PropertyBarConfig {
  enableDetailsInfo?: boolean;
  floatItems?: FloatItem[];
  infoData?: InfoData;
  editable?: boolean;
  maxLength?: number;
  onTitleChange?: (title: string) => void;
  customizedLargeViewData?: unknown;
  getCustomizedLargeViewData?: () => unknown;
}

interface InfoData {
  metadata?: Metadata;
  [key: string]: unknown;
}

interface FloatItem {
  [key: string]: unknown;
}

interface Metadata {
  name?: string;
  images?: string[];
  contentType?: HSCatalog.ContentType;
  [key: string]: unknown;
}

interface CustomizedProductPlugin {
  getSelectedEntity(): unknown;
  getContentPartIds(): string[];
  getSelectedMeshName(): string;
}

interface BasePropertyBar {
  id?: string;
  label?: string;
}

const DEFAULT_PLACEHOLDER_IMAGE = 'default-placeholder-image-url';

export default class PropertyBar implements BasePropertyBar {
  id?: string;
  label?: string;
  infoData: InfoData;
  moreData?: unknown;
  enableDetailsInfo: boolean;
  customizedLargeViewData?: unknown;
  getCustomizedLargeViewData?: () => unknown;
  floatItems: FloatItem[];
  type: string;
  maxLength: number;
  editable: boolean;
  onTitleChange?: (title: string) => void;
  customizedProductPlugin: CustomizedProductPlugin;

  constructor(config: PropertyBarConfig) {
    this.type = HSFPConstants.PropertyBarType.PropertyBar;
    this.enableDetailsInfo = config.enableDetailsInfo || false;
    this.floatItems = config.floatItems || [];
    this.infoData = config.infoData || {};
    this.editable = config.editable || false;
    this.maxLength = config.maxLength || Infinity;
    this.onTitleChange = config.onTitleChange;
    this.customizedProductPlugin = HSApp.App.getApp().pluginManager.plugins[
      HSFPConstants.PluginType.CustomizedProductPlugin
    ];
    this.customizedLargeViewData = config.customizedLargeViewData;
    this.getCustomizedLargeViewData = config.getCustomizedLargeViewData;
  }

  setFloatItems(items: FloatItem[]): void {
    this.floatItems = items;
  }

  initData(): void {
    this.initId();
    this.initLabel();
    if (this.enableDetailsInfo) {
      this.initDetailsInfo();
    }
  }

  initId(): void {
    const selected = HSApp.App.getApp().selectionManager.selected();
    let idValue = this.id || 'propertybar';
    if (selected.length === 1 && selected[0].id) {
      idValue += selected[0].id;
    }
    this.id = idValue;
  }

  initLabel(): void {
    if (!this.label) {
      const selectedEntity = HSApp.App.getApp().selectionManager.selected()[0];
      if (selectedEntity) {
        let labelText: string | undefined;

        if (
          selectedEntity instanceof HSCore.Model.CustomizedCeilingModel ||
          selectedEntity instanceof HSCore.Model.NCustomizedCeilingModel
        ) {
          labelText = ResourceManager.getString('plugin_catalog_diyceilings_mycustome');
        } else if (
          selectedEntity instanceof HSCore.Model.CustomizedBackgroundWall ||
          selectedEntity instanceof HSCore.Model.NCustomizedBackgroundWall
        ) {
          labelText = ResourceManager.getString('catalog_feature_wall_advanced');
        } else if (
          selectedEntity instanceof HSCore.Model.CustomizedPlatform ||
          selectedEntity instanceof HSCore.Model.NCustomizedPlatform
        ) {
          labelText = ResourceManager.getString('catalog_platform_advanced');
        } else if (
          selectedEntity instanceof HSCore.Model.Group &&
          selectedEntity.displayName
        ) {
          labelText = selectedEntity.displayName;
        } else if (selectedEntity.metadata?.name) {
          labelText = selectedEntity.metadata.name;
        }

        if (
          !labelText &&
          (selectedEntity instanceof HSCore.Model.CustomizedModel ||
            selectedEntity instanceof HSCore.Model.CustomizedPMInstanceModel)
        ) {
          labelText = ResourceManager.getString('catalog_customized_model');
        }

        this.label = labelText;
      }
    }

    if (!this.label) {
      this.label = ResourceManager.getString('plugin_right_propertybar_attribute_bar');
    }
  }

  setLabel(label: string): void {
    if (label) {
      this.label = label;
    }
  }

  setEnableDetailsInfo(enabled: boolean = true): void {
    this.enableDetailsInfo = enabled;
  }

  initDetailsInfo(): void {
    const metadata = this.setSelectedMeta();
    Object.assign(this.infoData, { metadata });
  }

  setSelectedMeta(): Metadata | undefined {
    const app = HSApp.App.getApp();
    const selected = app.selectionManager.selected();
    const activeEnvironmentId = app.activeEnvironmentId;
    let selectedEntity = selected?.[0];

    if (activeEnvironmentId === HSFPConstants.Environment.ContentPartMaterialReplace) {
      selectedEntity = this.customizedProductPlugin.getSelectedEntity();
    }

    if (!selectedEntity) {
      return undefined;
    }

    if (
      [
        HSFPConstants.Environment.ContentMaterialReplace,
        HSFPConstants.Environment.ContentPartMaterialReplace
      ].includes(activeEnvironmentId) &&
      selectedEntity.getMaterial
    ) {
      const meshName = this.getHightMeshName();
      const material = selectedEntity.getMaterial(meshName);
      return this.setMaterialMeta(material);
    }

    if (selectedEntity instanceof HSCore.Model.CustomizedModelMolding) {
      const parameters = selectedEntity.getParameters();
      const profileData = parameters.profileData;
      if (profileData && !(profileData.contentType instanceof HSCatalog.ContentType)) {
        profileData.contentType = new HSCatalog.ContentType(profileData.contentType);
      }
      return parameters.profileData;
    }

    if (selectedEntity.metadata) {
      if (
        (selectedEntity instanceof HSCore.Model.Group ||
          selectedEntity instanceof HSCore.Model.CustomizedModel) &&
        (!selectedEntity.metadata.images ||
          (Array.isArray(selectedEntity.metadata.images) &&
            selectedEntity.metadata.images.length === 0))
      ) {
        selectedEntity.metadata.images = [DEFAULT_PLACEHOLDER_IMAGE];
      }

      if (selectedEntity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CrownMolding)) {
        return Object.values(selectedEntity.children)[0].metadata;
      }

      if (selectedEntity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamSwingDoorLeaf)) {
        const firstChild = Object.values(selectedEntity.children)[0];
        return Object.values(firstChild.children)[0].metadata;
      }

      return selectedEntity.metadata;
    }

    if (selectedEntity.instanceOf(HSConstants.ModelClass.NgWall)) {
      const material = selectedEntity.getMaterial(HSCore.Model.WallFaceType.right);
      return this.setMaterialMeta(material);
    }

    if (selectedEntity.getMaterial) {
      const material = selectedEntity.getMaterial();
      return this.setMaterialMeta(material);
    }

    return undefined;
  }

  setMaterialMeta(material: unknown): Metadata | undefined {
    const app = HSApp.App.getApp();
    if (!material) {
      return undefined;
    }

    let seekId: string | null = null;
    if (material && (material as any).seekId) {
      seekId = (material as any).seekId;
    }

    if (HSCore.Util.PaintMaterial.isMixPaintMaterial(material)) {
      const pattern = (material as any).mixpaint.mixPave.regions[0].pattern;
      if (pattern instanceof HSPaveSDK.PavePattern) {
        seekId = pattern.templateSeekId;
      } else if (pattern instanceof HSPaveSDK.DefaultPattern) {
        seekId = pattern.material.seekId;
      }
    }

    if (seekId && seekId !== 'generated') {
      const metadata = app.materialManager.getMetaData(seekId);
      return metadata || undefined;
    }

    return undefined;
  }

  getHightMeshName(): string | undefined {
    const app = HSApp.App.getApp();
    let meshName = app.selectionManager.selected(false)[0]?.meshName;

    if (app.activeEnvironmentId !== HSFPConstants.Environment.ContentPartMaterialReplace) {
      return meshName;
    }

    const contentPartIds = this.customizedProductPlugin.getContentPartIds();
    if (!meshName || !contentPartIds.includes(meshName)) {
      meshName = this.customizedProductPlugin.getSelectedMeshName();
    }

    return meshName;
  }
}