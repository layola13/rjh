/**
 * Roof type selection component and related utilities
 * Handles roof type selection, VIP model checking, and roof manipulation operations
 */

import type { Loop } from './geometryTypes';
import type { RoofMeta, RoofRegion, ParametricRoof } from './roofTypes';

/**
 * Enum representing different parametric roof types
 */
export enum ENParamRoofType {
  Plane = 'plane',
  Pitched = 'pitched',
  HerringBone = 'herringbone',
  Hip = 'hip',
  SaltBox = 'saltbox',
  BoxGable = 'boxgable',
  Pyramid = 'pyramid'
}

/**
 * Metadata attribute structure for roof models
 */
interface RoofAttribute {
  id: string;
  values?: Array<{ id: string; value: string }>;
}

/**
 * Roof type metadata with model information
 */
interface RoofTypeData {
  roofType: ENParamRoofType;
  meta: RoofMeta & {
    name: string;
    model: {
      textureUrlLow: string;
    };
    attributes: RoofAttribute[];
  };
  isRectMainPart?: boolean;
  isNotSupprtArc?: boolean;
  isConvexPoly?: boolean;
}

/**
 * Component props for RoofTypeSelector
 */
interface RoofTypeSelectorProps {
  /** Available roof type configurations */
  data: RoofTypeData[];
  /** Currently selected roof (optional) */
  roof?: ParametricRoof | null;
  /** Currently selected roof region (optional) */
  roofRegion?: RoofRegion | null;
}

/**
 * Checks if user has premium access to roof features
 * @returns True if user has premium access (Pro/Master membership, enterprise account, or unlimited roof benefit)
 */
export function hasRoofPremiumAccess(): boolean {
  const roofBenefit = adskUser?.checkBenefit?.('roof')?.payload?.amount;
  const isPremiumMember = [
    HSFPConstants.GlobalMemberType.Pro,
    HSFPConstants.GlobalMemberType.Master
  ].includes(adskUser?.memberInfo?.memberType);
  const isValidEnterprise = adskUser?.isEnterprise && adskUser?.memberInfo?.validMember;
  const hasCustomizedUI = adskUser?.apartmentCustomizedUI;

  return roofBenefit === -1 || isPremiumMember || isValidEnterprise || hasCustomizedUI;
}

/**
 * Shows marketing modal for roof premium features
 * Closes any active roof environment and displays upgrade prompt
 */
export function showRoofMarketingModal(): void {
  const app = HSApp.App.getApp();
  
  // Close active roof environment if open
  if (app.activeEnvironmentId === HSFPConstants.Environment.AddRoofEnv) {
    const roofPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ParametricRoof);
    roofPlugin?.handler?.closeAddEnv?.();
  }

  // Show marketing modal if user doesn't have premium access
  if (!hasRoofPremiumAccess()) {
    const marketingBadge = app.pluginManager.getPlugin(HSFPConstants.PluginType.MarketingBadge);
    marketingBadge?.showMarketModal?.('render', 'roof-type-list');
  }
}

/**
 * Checks if a roof type is a VIP-only model
 * @param roofData - Roof type data to check
 * @returns True if this is a VIP-exclusive model
 */
export function isVipModel(roofData: RoofTypeData): boolean {
  const vipAttribute = roofData.meta.attributes.find(
    attr => attr.id === 'attr-vip-model'
  );

  if (!vipAttribute?.values || vipAttribute.values.length === 0) {
    return false;
  }

  const vipValue = vipAttribute.values.find(
    val => val.id === 'attr-vip-model-true'
  );

  return vipValue?.value === 'true';
}

/**
 * Gets localized display name for a roof type
 * @param roofData - Roof type data
 * @returns Localized name string
 */
export function getNameByType(roofData: RoofTypeData): string {
  const typeNameMap: Record<ENParamRoofType, string> = {
    [ENParamRoofType.Plane]: ResourceManager.getString('roof_type_flat'),
    [ENParamRoofType.Pitched]: ResourceManager.getString('roof_type_shed'),
    [ENParamRoofType.HerringBone]: ResourceManager.getString('roof_type_gable'),
    [ENParamRoofType.Hip]: ResourceManager.getString('roof_type_hip'),
    [ENParamRoofType.SaltBox]: ResourceManager.getString('roof_type_salt_box'),
    [ENParamRoofType.BoxGable]: ResourceManager.getString('roof_type_box_gable'),
    [ENParamRoofType.Pyramid]: ResourceManager.getString('roof_type_pyramid')
  };

  return typeNameMap[roofData.roofType] ?? roofData.meta.name;
}

/**
 * Checks if roof name is short enough to display without truncation
 * @param name - Roof type name
 * @returns True if name length is 10 characters or less
 */
export function isShortName(name: string | undefined): boolean {
  return !name || name.length <= 10;
}

/**
 * Validates if a roof type is compatible with the given roof loop geometry
 * @param roofData - Roof type data with constraints
 * @param roofLoop - The roof boundary loop to validate against
 * @returns True if the roof type is compatible with the geometry
 */
export function isRoofTypeCompatible(
  roofData: RoofTypeData,
  roofLoop: Loop | undefined
): boolean {
  if (!roofLoop) {
    return false;
  }

  const curves = roofLoop.getAllCurves();
  const loopType = HSCore.Util.Roof.getLoopType(curves);

  if (roofData.isRectMainPart) {
    return loopType === HSCore.Util.EnRoofLoopType.RECT;
  }

  if (roofData.isNotSupprtArc) {
    if (loopType === HSCore.Util.EnRoofLoopType.INCLUDE_ARC) {
      return false;
    }
    // Pitched roofs require initial curves
    return (
      roofData.roofType !== ENParamRoofType.Pitched ||
      HSCore.Util.Roof.getInitialCurves(curves).length > 0
    );
  }

  if (roofData.isConvexPoly) {
    return (
      loopType === HSCore.Util.EnRoofLoopType.RECT ||
      loopType === HSCore.Util.EnRoofLoopType.CONVEX_POLY
    );
  }

  return true;
}

/**
 * Adds a new roof to a drawing region
 * @param region - The drawing region to add the roof to
 * @param roofData - The roof type data to create
 */
export function addRoofByDrawing(region: RoofRegion, roofData: RoofTypeData): void {
  if (isVipModel(roofData) && !hasRoofPremiumAccess()) {
    showRoofMarketingModal();
    return;
  }

  const app = HSApp.App.getApp();
  const commandParams = {
    roofs: [{
      drawingRegion: region,
      meta: roofData.meta,
      layer: app.floorplan.scene.activeLayer
    }]
  };

  const command = app.cmdManager.createCommand(
    HSFPConstants.CommandType.RoofsDrawing.AddRoofByDrawing,
    [commandParams]
  );
  app.cmdManager.execute(command);
}

/**
 * Replaces an existing roof with a new roof type
 * @param roof - The existing roof to replace
 * @param roofData - The new roof type data
 */
export function replaceRoofType(roof: ParametricRoof, roofData: RoofTypeData): void {
  if (roofData.roofType === roof.parameters.roofType) {
    return;
  }

  if (isVipModel(roofData) && !hasRoofPremiumAccess()) {
    showRoofMarketingModal();
    return;
  }

  const roofPlugin = HSApp.App.getApp().pluginManager.getPlugin(
    HSFPConstants.PluginType.ParametricRoof
  );

  if (!roof.getUniqueParent()) {
    return;
  }

  // Save scroll position
  const scrollContainer = document.getElementsByClassName('property-bar-rooftypes-wrapper')[0] as HTMLElement;
  if (scrollContainer) {
    RoofTypeSelector.scrollTop = scrollContainer.scrollTop;
  }

  // Track user action
  HSApp.App.getApp().userTrackLogger.push(
    'hsw.property.roof.replace',
    {
      description: '属性面板修改屋顶样式',
      activeSection: 'roofStyleReplace',
      activeSectionName: '屋顶替换操作',
      clicksRatio: {
        id: 'roof-type-list',
        name: roofData.meta.name
      }
    },
    { sendNow: false }
  );

  roofPlugin?.handler?.replaceRoof?.(roof, roofData.meta);
}

/**
 * Renders VIP badge overlay for premium roof types
 * @param roofData - Roof type data
 * @returns React element with crown icon or null
 */
export function renderVipBadge(roofData: RoofTypeData): React.ReactElement | null {
  if (!isVipModel(roofData) || hasRoofPremiumAccess()) {
    return null;
  }

  const crownIconUrl = HSApp.Config.TENANT === 'fp'
    ? '/assets/crown-icon.svg'
    : 'https://img.alicdn.com/imgextra/i3/O1CN01De3U8e1csV3S1PwWe_!!6000000003656-55-tps-20-16.svg';

  return (
    <div className="crown roof-vip" onClick={() => showRoofMarketingModal()}>
      <img src={crownIconUrl} alt="VIP" />
    </div>
  );
}

/**
 * Main component for roof type selection interface
 * Displays available roof types with preview images and handles selection
 */
declare function RoofTypeSelector(props: RoofTypeSelectorProps): React.ReactElement;

export namespace RoofTypeSelector {
  /** Stores scroll position for restoration after roof replacement */
  export let scrollTop: number | undefined;
}

export default RoofTypeSelector;