interface TipTargetDiff {
  left: number;
  top: number;
  bottom: number;
  right: number;
}

interface PopupInfo {
  title: string;
  desc: string;
  src: string;
  mediaType: string;
  moreUrl: string;
}

interface TipConfig {
  target: string;
  targetDiff?: TipTargetDiff;
  popupPlacement: string;
  popupInfo: PopupInfo;
}

interface GuideStepOption {
  id: string;
  pre?: () => Promise<boolean>;
  tip: TipConfig;
  next?: () => Promise<boolean>;
}

interface SpecialTopicConfig {
  poolId: number;
  attributes: {
    COVER: string;
  };
}

interface CategoryConfig {
  categoryId: string;
  menuId: string;
}

declare const HSApp: {
  Config: {
    RES_BASEPATH: string;
    TENANT: string;
  };
  Catalog: {
    Manager: {
      showSpecialTopic(config: SpecialTopicConfig): void;
      showPageByCategoryId(config: CategoryConfig): void;
    };
    DataConfig: {
      MenuIdEnum: {
        styler: string;
      };
    };
  };
  App: {
    getApp(): {
      environmentManager: {
        signalEnvironmentActivated: {
          listen(callback: (event: { data: { newEnvironmentId: number } }) => void): void;
          unlisten(callback: (event: { data: { newEnvironmentId: number } }) => void): void;
        };
      };
    };
  };
};

declare const HSFPConstants: {
  Environment: {
    Render: number;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const adskUser: {
  userIdentity: string;
};

import completeGuideOption from './complete-guide-option';

export function getOptions(): GuideStepOption[] {
  const createRoomStep: GuideStepOption = {
    id: "create-room",
    pre: async () => {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2800);
      });
    },
    tip: {
      target: ".house-type-panel",
      targetDiff: {
        left: 8,
        top: -6,
        bottom: 8,
        right: 2
      },
      popupPlacement: "RightTop",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_create_room_title"),
        desc: ResourceManager.getString("new_guide_step_create_room_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/create_room.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1658385306287579137"
      }
    }
  };

  const modelLibraryStep: GuideStepOption = {
    id: "modelLibrary",
    pre: async () => {
      HSApp.Catalog.Manager.showSpecialTopic({
        poolId: 19,
        attributes: {
          COVER: "https://hs-designs.homestyler.com/production/upload/images/500e7a9b-ca2e-47c2-ba33-1347a846c992i.png"
        }
      });
      return true;
    },
    tip: {
      target: ".modelLibrary.hsc-sub-menu-container .hsc-menu-content",
      targetDiff: {
        left: 2,
        top: -4,
        bottom: 8,
        right: 2
      },
      popupPlacement: "RightTop",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_model_title"),
        desc: ResourceManager.getString("new_guide_step_model_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/model_library.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1658388753577648130"
      }
    }
  };

  const switchViewStep: GuideStepOption = {
    id: "switch-view",
    pre: async () => {
      return true;
    },
    tip: {
      target: ".status-bar-plugin-container .viewswitch .views",
      popupPlacement: "TopLeft",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_switch_view_title"),
        desc: ResourceManager.getString("new_guide_step_switch_view_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/switch_view.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1658375651582631937"
      }
    }
  };

  const toolRenderStep: GuideStepOption = {
    id: "toolrender",
    pre: async () => {
      return true;
    },
    tip: {
      target: ".toolitem.toolrender .tool-item-inner",
      popupPlacement: "BottomRight",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_to_render_env_title"),
        desc: ResourceManager.getString("new_guide_step_to_render_env_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/render.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1658386400598122497"
      }
    },
    next: async () => {
      return new Promise<boolean>((resolve) => {
        const toolRenderElement = document.querySelector<HTMLElement>(".toolitem.toolrender .tool-item-inner");
        
        HSApp.App.getApp().environmentManager.signalEnvironmentActivated.listen(function listener(event) {
          if (event.data.newEnvironmentId === HSFPConstants.Environment.Render) {
            HSApp.App.getApp().environmentManager.signalEnvironmentActivated.unlisten(listener);
            resolve(true);
          }
        });
        
        toolRenderElement?.click();
      });
    }
  };

  const renderImageStep: GuideStepOption = {
    id: "toRenderImage",
    pre: async () => {
      return true;
    },
    tip: {
      target: ".render-submit-container .submit-render-label",
      popupPlacement: "TopLeft",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_to_render_image_title"),
        desc: ResourceManager.getString("new_guide_step_to_render_image_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/render-image.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1658386400598122497"
      }
    },
    next: async () => {
      const submitRenderElement = document.querySelector<HTMLElement>(".render-submit-container .submit-render-label");
      submitRenderElement?.click();
      return true;
    }
  };

  const selectUploadTemplateStep: GuideStepOption = {
    id: "select-upload-template",
    tip: {
      target: ".draw-area .house-type-button-group",
      targetDiff: {
        left: 6,
        top: -8,
        bottom: 8,
        right: 8
      },
      popupPlacement: "RightTop",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_select_upload_template_title"),
        desc: ResourceManager.getString("new_guide_step_select_upload_template_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/select_upload_template.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1681934800681689090"
      }
    }
  };

  const aiDecorateStep: GuideStepOption = {
    id: "AI-decorate",
    pre: async () => {
      HSApp.Catalog.Manager.showPageByCategoryId({
        categoryId: "public_styler_template",
        menuId: HSApp.Catalog.DataConfig.MenuIdEnum.styler
      });
      return true;
    },
    tip: {
      target: ".styler.hsc-sub-menu-container .hsc-menu-content",
      targetDiff: {
        left: 2,
        top: -4,
        bottom: 8,
        right: 0
      },
      popupPlacement: "RightTop",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_AI_decorate_title"),
        desc: ResourceManager.getString("new_guide_step_AI_decorate_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/AI_Decor.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1615549251821891586"
      }
    }
  };

  const exportConstructionStep: GuideStepOption = {
    id: "export-construction",
    pre: async () => {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          const exportFloorplanElement = document.querySelector<HTMLElement>(".toolBar_export_floorplan");
          const dropMenusElement = document.querySelector<HTMLElement>(".toolBar_export_floorplan .dropmenus");
          
          if (exportFloorplanElement && dropMenusElement) {
            exportFloorplanElement.className += " hover";
            dropMenusElement.className += " dropmenusshow";
          }
          
          resolve(true);
        }, 100);
      });
    },
    tip: {
      target: ".toolbar_whole_export1_item",
      popupPlacement: "BottomRight",
      popupInfo: {
        title: ResourceManager.getString("new_guide_step_export_construction_drawings_title"),
        desc: ResourceManager.getString("new_guide_step_export_construction_drawings_desc"),
        src: `${HSApp.Config.RES_BASEPATH}v2/image/newuserguide/Export_Construction_Drawings.gif`,
        mediaType: "image",
        moreUrl: "https://www.homestyler.com/forum/view/1640998543632289794"
      }
    }
  };

  const defaultSteps: GuideStepOption[] = [
    createRoomStep,
    modelLibraryStep,
    switchViewStep,
    toolRenderStep,
    renderImageStep,
    completeGuideOption
  ];

  if (HSApp.Config.TENANT === "ezhome") {
    return [
      selectUploadTemplateStep,
      aiDecorateStep,
      switchViewStep,
      toolRenderStep,
      renderImageStep,
      completeGuideOption
    ];
  }

  if (adskUser.userIdentity === "homeowner") {
    return [
      selectUploadTemplateStep,
      aiDecorateStep,
      switchViewStep,
      exportConstructionStep,
      toolRenderStep,
      renderImageStep,
      completeGuideOption
    ];
  }

  return defaultSteps;
}