import { Loop } from './Loop';
import { HSCore } from './HSCore';

enum ENParamRoofType {
  Plane = 'plane',
  Pitched = 'pitched',
  HerringBone = 'herringbone',
  Hip = 'hip',
  SaltBox = 'saltbox',
  BoxGable = 'boxgable',
  Pyramid = 'pyramid'
}

enum EnRoofLoopType {
  RECT = 'rect',
  INCLUDE_ARC = 'include_arc',
  CONVEX_POLY = 'convex_poly'
}

enum GlobalMemberType {
  Pro = 'pro',
  Master = 'master'
}

enum Environment {
  AddRoofEnv = 'add_roof_env'
}

enum PluginType {
  ParametricRoof = 'parametric_roof',
  MarketingBadge = 'marketing_badge'
}

enum CommandType {
  AddRoofByDrawing = 'add_roof_by_drawing'
}

enum EventGroupEnum {
  Roof = 'roof'
}

interface AttributeValue {
  id: string;
  value: string;
}

interface Attribute {
  id: string;
  values?: AttributeValue[];
}

interface RoofMeta {
  name: string;
  attributes: Attribute[];
  model: {
    textureUrlLow: string;
  };
}

interface RoofData {
  roofType: string;
  meta: RoofMeta;
  isRectMainPart?: boolean;
  isNotSupprtArc?: boolean;
  isConvexPoly?: boolean;
}

interface RoofParameters {
  roomLoop: Loop;
  roofType: string;
}

interface Roof {
  parameters: RoofParameters;
  getUniqueParent(): unknown;
}

interface RoofRegion {
  roof: Roof;
  outerLoop: Loop;
}

interface RoofTypeListProps {
  data: RoofData[];
  roof?: Roof;
  roofRegion?: RoofRegion;
}

interface UserInfo {
  memberType: string;
  validMember: boolean;
}

interface BenefitPayload {
  amount: number;
}

interface BenefitCheckResult {
  payload?: BenefitPayload;
}

interface AdskUser {
  memberInfo: UserInfo;
  isEnterprise: boolean;
  apartmentCustomizedUI?: boolean;
  checkBenefit(feature: string): BenefitCheckResult | undefined;
}

interface Plugin {
  handler: {
    closeAddEnv(): void;
    replaceRoof(roof: Roof, meta: RoofMeta): void;
  };
  showMarketModal?(action: string, context: string): void;
}

interface PluginManager {
  getPlugin(type: string): Plugin | undefined;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): unknown;
  execute(command: unknown): void;
}

interface Layer {
  // Layer definition
}

interface Scene {
  activeLayer: Layer;
}

interface Floorplan {
  scene: Scene;
}

interface UserTrackLogger {
  push(event: string, data: Record<string, unknown>, options: { sendNow: boolean }): void;
}

interface App {
  activeEnvironmentId: string;
  pluginManager: PluginManager;
  cmdManager: CommandManager;
  floorplan: Floorplan;
  userTrackLogger: UserTrackLogger;
}

declare global {
  const adskUser: AdskUser;
  const HSApp: {
    App: {
      getApp(): App;
    };
    Config: {
      TENANT: string;
    };
    Util: {
      EventTrack: {
        instance(): {
          track(group: string, event: string, data: Record<string, unknown>): void;
        };
      };
      EventGroupEnum: typeof EventGroupEnum;
    };
  };
  const HSFPConstants: {
    GlobalMemberType: typeof GlobalMemberType;
    Environment: typeof Environment;
    PluginType: typeof PluginType;
    CommandType: {
      RoofsDrawing: {
        AddRoofByDrawing: string;
      };
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
}

const VIP_CROWN_IMAGE_FP = 'data:image/svg+xml;base64,...'; // placeholder
const VIP_CROWN_IMAGE_DEFAULT = 'https://img.alicdn.com/imgextra/i3/O1CN01De3U8e1csV3S1PwWe_!!6000000003656-55-tps-20-16.svg';

class ScrollState {
  scrollTop?: number;
}

const scrollState = new ScrollState();

function hasVipAccess(): boolean {
  const benefitCheck = adskUser?.checkBenefit('roof');
  const hasUnlimitedBenefit = benefitCheck?.payload?.amount === -1;
  
  const isProOrMaster = [
    HSFPConstants.GlobalMemberType.Pro,
    HSFPConstants.GlobalMemberType.Master
  ].includes(adskUser?.memberInfo?.memberType as GlobalMemberType);
  
  const isValidEnterprise = 
    adskUser?.isEnterprise && 
    adskUser?.memberInfo?.validMember;
  
  const hasCustomUI = adskUser?.apartmentCustomizedUI;
  
  return hasUnlimitedBenefit || isProOrMaster || isValidEnterprise || !!hasCustomUI;
}

function showVipModal(): void {
  const app = HSApp.App.getApp();
  
  if (app.activeEnvironmentId === HSFPConstants.Environment.AddRoofEnv) {
    const roofPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ParametricRoof);
    roofPlugin?.handler.closeAddEnv();
  }
  
  if (!hasVipAccess()) {
    const marketingPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.MarketingBadge);
    marketingPlugin?.showMarketModal?.('render', 'roof-type-list');
  }
}

function isVipModel(roofData: RoofData): boolean {
  const vipAttribute = roofData.meta.attributes.find(
    attr => attr.id === 'attr-vip-model'
  );
  
  if (!vipAttribute?.values || vipAttribute.values.length === 0) {
    return false;
  }
  
  const trueValue = vipAttribute.values.find(
    val => val.id === 'attr-vip-model-true'
  );
  
  return trueValue?.value === 'true';
}

export function getNameByType(roofData: RoofData): string {
  const typeNameMap: Record<string, string> = {
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

function isNameShort(name: string): boolean {
  return !name || name.length <= 10;
}

function renderVipCrown(roofData: RoofData): JSX.Element | undefined {
  if (!isVipModel(roofData) || hasVipAccess()) {
    return undefined;
  }
  
  const imageSrc = HSApp.Config.TENANT === 'fp' 
    ? VIP_CROWN_IMAGE_FP 
    : VIP_CROWN_IMAGE_DEFAULT;
  
  return (
    <div 
      className="crown roof-vip"
      onClick={() => {
        if (!hasVipAccess()) {
          showVipModal();
        }
      }}
    >
      <img src={imageSrc} />
    </div>
  );
}

function canApplyRoofType(roofData: RoofData, loop?: Loop): boolean {
  if (!loop) {
    return false;
  }
  
  if (roofData.isRectMainPart) {
    const loopType = HSCore.Util.Roof.getLoopType(loop.getAllCurves());
    return loopType === HSCore.Util.EnRoofLoopType.RECT;
  }
  
  if (roofData.isNotSupprtArc) {
    const loopType = HSCore.Util.Roof.getLoopType(loop.getAllCurves());
    if (loopType === HSCore.Util.EnRoofLoopType.INCLUDE_ARC) {
      return false;
    }
    
    if (roofData.roofType === ENParamRoofType.Pitched) {
      const initialCurves = HSCore.Util.Roof.getInitialCurves(loop.getAllCurves());
      return initialCurves.length > 0;
    }
    
    return true;
  }
  
  if (roofData.isConvexPoly) {
    const loopType = HSCore.Util.Roof.getLoopType(loop.getAllCurves());
    return loopType === HSCore.Util.EnRoofLoopType.RECT || 
           loopType === HSCore.Util.EnRoofLoopType.CONVEX_POLY;
  }
  
  return true;
}

function addRoofByDrawing(region: RoofRegion, roofData: RoofData): void {
  if (isVipModel(roofData) && !hasVipAccess()) {
    showVipModal();
    return;
  }
  
  const app = HSApp.App.getApp();
  const commandData = {
    roofs: [{
      drawingRegion: region,
      meta: roofData.meta,
      layer: app.floorplan.scene.activeLayer
    }]
  };
  
  const command = app.cmdManager.createCommand(
    HSFPConstants.CommandType.RoofsDrawing.AddRoofByDrawing,
    [commandData]
  );
  
  app.cmdManager.execute(command);
}

function replaceRoof(roof: Roof, roofData: RoofData): void {
  if (roofData.roofType === roof.parameters.roofType) {
    return;
  }
  
  if (isVipModel(roofData) && !hasVipAccess()) {
    showVipModal();
    return;
  }
  
  const roofPlugin = HSApp.App.getApp().pluginManager.getPlugin(
    HSFPConstants.PluginType.ParametricRoof
  );
  
  if (!roof.getUniqueParent()) {
    return;
  }
  
  const wrapperElement = document.getElementsByClassName('property-bar-rooftypes-wrapper')[0];
  if (wrapperElement) {
    scrollState.scrollTop = (wrapperElement as HTMLElement).scrollTop;
  }
  
  HSApp.App.getApp().userTrackLogger.push(
    'hsw.property.roof.replace',
    {
      description: '属性面板修改屋顶样式',
      activeSection: 'roofStyleReplace',
      activeSectionName: '屋顶替换操作',
      clicksRatio: {
        id: 'roof-type-list',
        name: roofData.meta?.name
      }
    },
    { sendNow: false }
  );
  
  roofPlugin?.handler.replaceRoof(roof, roofData.meta);
}

function getTooltipContent(roofData: RoofData, index: number): JSX.Element {
  const position = (index + 1) % 3;
  let message = '';
  
  if (roofData.isRectMainPart) {
    message = ResourceManager.getString('plugin_right_propertybar_roof_tooltip_rect');
  } else if (roofData.isNotSupprtArc) {
    message = ResourceManager.getString('plugin_right_propertybar_roof_tooltip_poly');
  } else if (roofData.isConvexPoly) {
    message = ResourceManager.getString('plugin_right_propertybar_roof_tooltip_convex_poly');
  }
  
  return (
    <div className={`roof-type-tip-txt-warp-${position}`}>
      {message}
    </div>
  );
}

function handleRoofTypeClick(
  roofData: RoofData,
  roof: Roof | undefined,
  roofRegion: RoofRegion | undefined
): void {
  HSApp.Util.EventTrack.instance().track(
    HSApp.Util.EventGroupEnum.Roof,
    'propertybar_type_choose_event',
    {
      IF_env: HSApp.App.getApp().activeEnvironmentId,
      type: roofData.roofType
    }
  );
  
  if (roofRegion) {
    addRoofByDrawing(roofRegion, roofData);
  } else if (roof) {
    replaceRoof(roof, roofData);
  }
}

function renderRoofName(roofData: RoofData, isMasked: boolean = false): JSX.Element {
  const name = getNameByType(roofData);
  const className = isMasked ? 'roof-name text-ellipsis roof-name-mask' : 'roof-name text-ellipsis';
  
  if (isNameShort(name)) {
    return (
      <div className={isMasked ? 'roof-name roof-name-mask' : 'roof-name'}>
        {name}
      </div>
    );
  }
  
  return (
    <Tooltip placement="bottom" title={name} color="light">
      <div className={className}>
        {name}
      </div>
    </Tooltip>
  );
}

function renderDisabledRoofType(roofData: RoofData, index: number): JSX.Element {
  return (
    <>
      <Tooltip
        placement="top"
        title={getTooltipContent(roofData, index)}
        color="dark"
      >
        <div className="mask" />
      </Tooltip>
      <div className="roof-img">
        <img src={roofData.meta.model.textureUrlLow} />
        {renderRoofName(roofData, true)}
      </div>
      {renderVipCrown(roofData)}
    </>
  );
}

function renderEnabledRoofType(
  roofData: RoofData,
  roof: Roof | undefined,
  roofRegion: RoofRegion | undefined
): JSX.Element {
  return (
    <>
      <div className="roof-img">
        <img
          src={roofData.meta.model.textureUrlLow}
          onClick={() => handleRoofTypeClick(roofData, roof, roofRegion)}
        />
        {renderRoofName(roofData)}
      </div>
      {renderVipCrown(roofData)}
    </>
  );
}

export default function RoofTypeList(props: RoofTypeListProps): JSX.Element {
  const { data, roof: propsRoof, roofRegion } = props;
  
  if (!propsRoof && !roofRegion) {
    return <span />;
  }
  
  const roof = propsRoof ?? roofRegion?.roof;
  
  const roomLoop = roof
    ? roof.parameters.roomLoop
    : new Loop(HSCore.Util.Roof.mergeCurves(roofRegion!.outerLoop.getAllCurves()));
  
  const currentRoofType = roof?.parameters.roofType ?? '';
  
  React.useEffect(() => {
    const currentIndex = propsRoof
      ? data.findIndex(item => item.roofType === propsRoof.parameters.roofType)
      : -1;
    
    const scrollTop = currentIndex < 6 ? 0 : 70;
    const wrapperElement = document.getElementsByClassName('property-bar-rooftypes-wrapper')[0] as HTMLElement;
    
    if (wrapperElement) {
      if (scrollState.scrollTop === undefined) {
        wrapperElement.scrollTop = scrollTop;
      } else {
        wrapperElement.scrollTop = scrollState.scrollTop;
        scrollState.scrollTop = undefined;
      }
    }
  }, []);
  
  return (
    <div className="property-bar-rooftypes-wrapper">
      <div className="property-bar-rooftypes-container">
        {data.map((roofData, index) => {
          const isActive = roofData.roofType === currentRoofType;
          const canApply = canApplyRoofType(roofData, roomLoop);
          
          return (
            <div key={index} className={isActive ? 'active' : ''}>
              {canApply
                ? renderEnabledRoofType(roofData, roof, roofRegion)
                : renderDisabledRoofType(roofData, index)
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}