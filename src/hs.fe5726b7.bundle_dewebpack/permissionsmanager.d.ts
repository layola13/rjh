/**
 * 权限管理器模块
 * 负责管理用户权限的查询、更新和重置
 */

/**
 * 权限查询请求参数
 */
interface PermissionQueryRequest {
  /** 权限映射字符串 */
  permissionMapStr: Record<string, string[]>;
}

/**
 * 权限项
 */
interface PermissionItem {
  /** 权限是否可访问 */
  accessible: boolean;
  /** 权限名称 */
  permissionName: string;
  /** 权限附加数据 */
  payload?: {
    /** 团队ID */
    teamId?: string;
    /** 团队名称 */
    teamName?: string;
  };
}

/**
 * 权限查询响应结果
 */
interface PermissionQueryResult {
  /** 权限结果映射表，key为权限分类，value为权限项数组 */
  resultMap: Record<string, PermissionItem[]>;
}

/**
 * MTOP用户权限接口响应
 */
interface MtopUserPermissionsResponse {
  resultMap: Record<string, PermissionItem[]>;
}

/**
 * 权限管理器类
 * 提供用户权限的查询、更新和重置功能
 */
export class PermissionsManager {
  constructor() {}

  /**
   * 获取灯光模板权限键列表
   * @returns 灯光模板权限键数组
   */
  getLightTemplateKeys(): string[] {
    const temperatureName = HSConstants.Render.TEMPERATURE_NAME;
    const emptyTemplate = HSConstants.Render.EMPTY_TEMPLATE;
    
    // 需要Intel变体的温度名称
    const intelVariantNames = [
      temperatureName.NATURE,
      temperatureName.WARM,
      temperatureName.WARMWHITE,
      temperatureName.CHILLY,
      temperatureName.NIGHT_WARM,
      temperatureName.NIGHT_WARMWHITE,
      temperatureName.NIGHT_CHILLY,
      temperatureName.NIGHT_COLD,
      temperatureName.NATURE_2,
    ];
    
    const permissionKeys: string[] = [];
    const baseKeyPrefix = 'Common.Render.LT';
    
    // 合并所有温度名称和空模板值
    const allTemplateValues = [
      ...Object.values(temperatureName),
      ...Object.values(emptyTemplate),
    ];
    
    allTemplateValues.forEach((templateValue) => {
      // 如果需要Intel变体，添加Intel版本的权限键
      if (intelVariantNames.includes(templateValue)) {
        permissionKeys.push(`${baseKeyPrefix}.INTEL.${templateValue}`);
      }
      // 添加标准权限键
      permissionKeys.push(`${baseKeyPrefix}.${templateValue}`);
    });
    
    return permissionKeys;
  }

  /**
   * 重置用户权限标志位到默认值
   * 将全局adskUser对象的所有权限标志设置为false或空字符串
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
   * 查询用户权限
   * @param permissionMap - 权限映射配置，key为权限分类，value为权限名称数组
   * @returns 权限查询结果映射表
   */
  async queryPermissions(
    permissionMap: Record<string, string[]>
  ): Promise<Record<string, PermissionItem[]>> {
    const response = await handleMtopResult<MtopUserPermissionsResponse>(
      NWTK.mtop.User.getUserPermissionsV2({
        data: {
          permissionMapStr: permissionMap,
        },
      })
    );
    
    return response.resultMap;
  }

  /**
   * 更新用户权限
   * 从服务器获取最新的权限配置并更新全局adskUser对象
   */
  async updatePermissions(): Promise<void> {
    // 先重置所有权限
    this.resetUserPermissions();
    
    // 默认权限列表
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
      'smart_layout_apple',
    ];
    
    // 灯光模板权限列表
    const lightTemplateKeys = this.getLightTemplateKeys();
    
    // 构建权限查询配置
    const permissionConfig = {
      default: defaultPermissions,
      light_template: lightTemplateKeys,
    };
    
    // 查询权限
    const permissionResult = await this.queryPermissions(permissionConfig);
    
    // 处理默认权限结果
    permissionResult.default.forEach((permission) => {
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
    
    // 存储所有权限到adskUser.permissions对象
    Object.keys(permissionConfig).forEach((category) => {
      permissionResult[category].forEach((permission) => {
        const { permissionName, accessible } = permission;
        
        if (!adskUser.permissions[category]) {
          adskUser.permissions[category] = {};
        }
        
        adskUser.permissions[category][permissionName] = accessible;
      });
    });
  }
}