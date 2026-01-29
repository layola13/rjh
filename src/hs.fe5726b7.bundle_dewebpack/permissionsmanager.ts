interface PermissionItem {
  accessible: boolean;
  permissionName: string;
  payload?: {
    teamName?: string;
    teamId?: string;
  };
}

interface PermissionMap {
  default: PermissionItem[];
  light_template?: PermissionItem[];
  [key: string]: PermissionItem[] | undefined;
}

interface UserPermissionsResponse {
  resultMap: PermissionMap;
}

interface PermissionQueryMap {
  default: string[];
  light_template: string[];
}

interface HSConstants {
  Render: {
    TEMPERATURE_NAME: {
      NATURE: string;
      WARM: string;
      WARMWHITE: string;
      CHILLY: string;
      NIGHT_WARM: string;
      NIGHT_WARMWHITE: string;
      NIGHT_CHILLY: string;
      NIGHT_COLD: string;
      NATURE_2: string;
      [key: string]: string;
    };
    EMPTY_TEMPLATE: {
      [key: string]: string;
    };
  };
}

interface AdskUser {
  is3dGeneralWhitelist: boolean;
  isRenderWhitelist: boolean;
  enable3dFurnishing: boolean;
  hasRate: boolean;
  isEnterprise: boolean;
  isEnterpriseAgent: boolean;
  removeToIndividual: boolean;
  removeTemplates: boolean;
  removeContactSupport: boolean;
  keepDIY1InCatalog: boolean;
  isSmartAccessories: boolean;
  isHardUpGrade: boolean;
  showClientDownloadEntry: boolean;
  isVifaAccount: boolean;
  isPersonalUserOfCW: boolean;
  isEnterpriseUserOfCW: boolean;
  enablenewfptip: boolean;
  exportPicColorOffline: boolean;
  agentTeamName?: string;
  agentTeamId?: string;
  isEnterpriseOfCad?: boolean;
  isEmployeeOfCad?: boolean;
  isPersonOfCad?: boolean;
  newfpCreateDocumentTipInBlackList?: boolean;
  isLowResolutionMovement?: boolean;
  apartmentCustomizedUI?: boolean;
  kanfangCustomizedUI?: boolean;
  enableExpertTemplate?: boolean;
  liveDesignOperation?: boolean;
  storeSmartLayout?: boolean;
  permissions: {
    [key: string]: {
      [permissionName: string]: boolean;
    };
  };
}

declare const HSConstants: HSConstants;
declare const adskUser: AdskUser;
declare const NWTK: {
  mtop: {
    User: {
      getUserPermissionsV2(params: { data: { permissionMapStr: PermissionQueryMap } }): Promise<unknown>;
    };
  };
};

export class PermissionsManager {
  /**
   * Get light template permission keys
   */
  getLightTemplateKeys(): string[] {
    const temperatureName = HSConstants.Render.TEMPERATURE_NAME;
    const emptyTemplate = HSConstants.Render.EMPTY_TEMPLATE;
    const includedNames = [
      temperatureName.NATURE,
      temperatureName.WARM,
      temperatureName.WARMWHITE,
      temperatureName.CHILLY,
      temperatureName.NIGHT_WARM,
      temperatureName.NIGHT_WARMWHITE,
      temperatureName.NIGHT_CHILLY,
      temperatureName.NIGHT_COLD,
      temperatureName.NATURE_2
    ];
    const keys: string[] = [];
    const prefix = 'Common.Render.LT';

    const allTemplateNames = [
      ...Object.values(temperatureName),
      ...Object.values(emptyTemplate)
    ];

    allTemplateNames.forEach((templateName) => {
      if (includedNames.includes(templateName)) {
        keys.push(`${prefix}.INTEL.${templateName}`);
      }
      keys.push(`${prefix}.${templateName}`);
    });

    return keys;
  }

  /**
   * Reset all user permissions to default values
   */
  resetUserPermissions(): void {
    adskUser.is3dGeneralWhitelist = false;
    adskUser.isRenderWhitelist = false;
    adskUser.enable3dFurnishing = false;
    adskUser.hasRate = false;
    adskUser.isEnterprise = false;
    adskUser.isEnterpriseAgent = false;
    adskUser.removeToIndividual = false;
    adskUser.removeTemplates = false;
    adskUser.removeContactSupport = false;
    adskUser.keepDIY1InCatalog = false;
    adskUser.isSmartAccessories = false;
    adskUser.isHardUpGrade = false;
    adskUser.showClientDownloadEntry = false;
    adskUser.isVifaAccount = false;
    adskUser.isPersonalUserOfCW = false;
    adskUser.isEnterpriseUserOfCW = false;
    adskUser.enablenewfptip = false;
    adskUser.exportPicColorOffline = false;
  }

  /**
   * Query user permissions from server
   */
  async queryPermissions(permissionMapStr: PermissionQueryMap): Promise<PermissionMap> {
    const result = await handleMtopResult<UserPermissionsResponse>(
      NWTK.mtop.User.getUserPermissionsV2({
        data: { permissionMapStr }
      })
    );
    return result.resultMap;
  }

  /**
   * Update user permissions by querying server and applying results
   */
  async updatePermissions(): Promise<void> {
    this.resetUserPermissions();

    const defaultPermissions = [
      '3d_general',
      '4k_hd_rendering',
      '3d_furnishing',
      'commission',
      'enterprise_user',
      'diy1.0_offline',
      'smart_accessories',
      'hardupgrade',
      'live_design_operation',
      'vifa_light_template',
      'hard_model_upgrade',
      'v2_homecad_enterprise',
      'v2_homecad_employee',
      'concealed_work_personal',
      'concealed_work_enterprise',
      'newfp_create_document_tip_inBlackList',
      'keyboard_move_opti_enterprise',
      '3d_apartment_customize',
      '3d_apartment_customize_enterprise',
      'expert_template_person',
      'custom_remove_templates',
      'panorama_preview_offline',
      'export_pic_color_offline',
      '3d_apartment_customize_enterprise_kanfang',
      'enterprise_agent_team',
      'smart_layout_apple'
    ];

    const lightTemplateKeys = this.getLightTemplateKeys();

    const permissionQueryMap: PermissionQueryMap = {
      default: defaultPermissions,
      light_template: lightTemplateKeys
    };

    const permissionMap = await this.queryPermissions(permissionQueryMap);

    permissionMap.default.forEach((permission) => {
      const { accessible, permissionName, payload } = permission;

      switch (permissionName) {
        case '3d_general':
          adskUser.is3dGeneralWhitelist = accessible;
          break;
        case '4k_hd_rendering':
          adskUser.isRenderWhitelist = accessible;
          break;
        case '3d_furnishing':
          adskUser.enable3dFurnishing = accessible;
          break;
        case 'commission':
          adskUser.hasRate = accessible;
          break;
        case 'custom_remove_to_individual':
          adskUser.removeToIndividual = accessible;
          break;
        case 'custom_remove_templates':
          adskUser.removeTemplates = accessible;
          break;
        case 'custom_remove_contact_support':
          adskUser.removeContactSupport = accessible;
          break;
        case 'diy1.0_offline':
          adskUser.keepDIY1InCatalog = accessible;
          break;
        case 'smart_accessories':
          adskUser.isSmartAccessories = accessible;
          break;
        case 'hardupgrade':
        case 'hard_model_upgrade':
          adskUser.isHardUpGrade = adskUser.isHardUpGrade || accessible;
          break;
        case 'vifa_light_template':
          adskUser.isVifaAccount = accessible;
          break;
        case 'v2_homecad_enterprise':
          adskUser.isEnterpriseOfCad = accessible;
          break;
        case 'v2_homecad_employee':
          adskUser.isEmployeeOfCad = accessible;
          break;
        case 'v2_homecad_havana':
          adskUser.isPersonOfCad = accessible;
          break;
        case 'concealed_work_personal':
          adskUser.isPersonalUserOfCW = accessible;
          break;
        case 'concealed_work_enterprise':
          adskUser.isEnterpriseUserOfCW = accessible;
          break;
        case 'newfp_create_document_tip_inBlackList':
          adskUser.newfpCreateDocumentTipInBlackList = accessible;
          break;
        case 'keyboard_move_opti_enterprise':
          adskUser.isLowResolutionMovement = accessible;
          break;
        case '3d_apartment_customize_enterprise':
        case '3d_apartment_customize':
          adskUser.apartmentCustomizedUI = adskUser.apartmentCustomizedUI || accessible;
          break;
        case '3d_apartment_customize_enterprise_kanfang':
          adskUser.kanfangCustomizedUI = accessible;
          break;
        case 'expert_template_person':
          adskUser.enableExpertTemplate = accessible;
          break;
        case 'live_design_operation':
          adskUser.liveDesignOperation = accessible;
          break;
        case 'export_pic_color_offline':
          adskUser.exportPicColorOffline = accessible;
          break;
        case 'enterprise_user':
          if (accessible) {
            adskUser.agentTeamName = payload?.teamName ?? '';
          }
          adskUser.isEnterprise = accessible;
          break;
        case 'enterprise_agent_team':
          if (accessible) {
            adskUser.agentTeamId = payload?.teamId;
            adskUser.agentTeamName = payload?.teamName ?? '';
          }
          adskUser.isEnterpriseAgent = accessible;
          break;
        case 'smart_layout_apple':
          adskUser.storeSmartLayout = accessible;
          break;
      }
    });

    Object.keys(permissionQueryMap).forEach((category) => {
      permissionMap[category]?.forEach((permission) => {
        const { permissionName, accessible } = permission;
        if (!adskUser.permissions[category]) {
          adskUser.permissions[category] = {};
        }
        adskUser.permissions[category][permissionName] = accessible;
      });
    });
  }
}

async function handleMtopResult<T>(promise: Promise<unknown>): Promise<T> {
  return promise as Promise<T>;
}