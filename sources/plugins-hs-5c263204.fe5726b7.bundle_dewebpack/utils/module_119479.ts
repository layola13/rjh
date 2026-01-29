import { HSApp } from './518193';

interface GuideStep {
  id: string;
  pre: (callback?: () => void) => Promise<boolean>;
  next: () => Promise<boolean>;
  tip: () => TipConfig;
}

interface TipConfig {
  target: string;
  targetDiff: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  targetEnableClick: boolean;
  listenTargetChange: boolean;
  type: string;
  tooltipPlacement: string;
  tooltipInfo: {
    title: string;
  };
}

declare const ResourceManager: {
  getString(key: string): string;
};

const ELEMENT_Z_INDEX_HIGH = '4100';
const ELEMENT_Z_INDEX_MEDIUM = '2';
const ELEMENT_Z_INDEX_LOW = '1';
const DEFAULT_DELAY_MS = 3000;
const CLEANUP_INTERVAL_MS = 1000;
const PRE_STEP_DELAY_MS = 10;

function setupRenderImageHighlight(callback?: () => void): void {
  HSApp.App.getApp().hotkey.disable();

  const dashboardButton = document.querySelector<HTMLElement>('#showResultDashboard');
  if (dashboardButton) {
    dashboardButton.style.zIndex = ELEMENT_Z_INDEX_MEDIUM;
    
    const handleDashboardClick = (): void => {
      callback?.();
      dashboardButton.removeEventListener('click', handleDashboardClick);
    };
    
    dashboardButton.addEventListener('click', handleDashboardClick);
  }

  const pictureGroup = document.querySelector<HTMLElement>('#render_tab #picture-group');
  if (pictureGroup) {
    pictureGroup.style.zIndex = ELEMENT_Z_INDEX_MEDIUM;
  }

  const visibilityContainer = document.querySelector<HTMLElement>('.visibility-container');
  if (visibilityContainer) {
    visibilityContainer.style.opacity = '1';
    visibilityContainer.style.left = 'unset';
    visibilityContainer.style.right = '0';
    visibilityContainer.classList.add('hovered');
    
    visibilityContainer.querySelectorAll<HTMLElement>('.delete-btn').forEach((deleteButton) => {
      deleteButton.style.display = 'none';
      deleteButton.classList.add('display-none-seted');
    });

    const handleViewMoreClick = (): void => {
      callback?.();
      visibilityContainer.querySelectorAll('.click-view-more').forEach((viewMoreButton) => {
        viewMoreButton.removeEventListener('click', handleViewMoreClick);
      });
    };

    visibilityContainer.querySelectorAll<HTMLElement>('.click-view-more').forEach((viewMoreButton) => {
      viewMoreButton.addEventListener('click', handleViewMoreClick);
      viewMoreButton.classList.add('click-event-added');
    });

    const cleanupIntervalId = setInterval(() => {
      visibilityContainer.querySelectorAll<HTMLElement>('.delete-btn').forEach((deleteButton) => {
        if (!deleteButton.classList.contains('display-none-seted')) {
          deleteButton.style.display = 'none';
        }
      });

      visibilityContainer.querySelectorAll<HTMLElement>('.click-view-more').forEach((viewMoreButton) => {
        if (!viewMoreButton.classList.contains('click-event-added')) {
          viewMoreButton.addEventListener('click', handleViewMoreClick);
          clearInterval(cleanupIntervalId);
        }
      });
    }, CLEANUP_INTERVAL_MS);
  }

  const renderImageLite = document.querySelector<HTMLElement>('#renderImageLite');
  if (renderImageLite) {
    renderImageLite.style.zIndex = ELEMENT_Z_INDEX_HIGH;
  }
}

function cleanupRenderImageHighlight(): void {
  HSApp.App.getApp().hotkey.enable();

  const pictureGroup = document.querySelector<HTMLElement>('#picture-group');
  if (pictureGroup) {
    pictureGroup.style.border = 'unset';
  }

  const renderTabPictureGroup = document.querySelector<HTMLElement>('#render_tab #picture-group');
  if (renderTabPictureGroup) {
    renderTabPictureGroup.style.zIndex = ELEMENT_Z_INDEX_LOW;
  }

  const visibilityContainer = document.querySelector<HTMLElement>('.visibility-container');
  if (visibilityContainer) {
    visibilityContainer.style.removeProperty('opacity');
    visibilityContainer.style.left = '0';
    visibilityContainer.style.right = 'unset';
    visibilityContainer.classList.remove('hovered');
    
    visibilityContainer.querySelectorAll<HTMLElement>('.delete-btn').forEach((deleteButton) => {
      deleteButton.style.display = 'flex';
    });
  }

  const renderImageLite = document.querySelector<HTMLElement>('#renderImageLite');
  if (renderImageLite) {
    renderImageLite.style.zIndex = '';
  }

  const feedbackEntry = document.querySelector<HTMLElement>('.feedbackEntry');
  if (feedbackEntry) {
    feedbackEntry.style.pointerEvents = 'auto';
  }

  const tabsContent = document.querySelector<HTMLElement>('.render-panel-tab .ant-tabs-content');
  if (tabsContent) {
    tabsContent.style.height = 'calc(100vh - 90px)';
  }
}

function delay(milliseconds: number = DEFAULT_DELAY_MS): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}

const checkRenderImageStep: GuideStep = {
  id: 'checkRenderImage',
  
  pre: async (callback?: () => void): Promise<boolean> => {
    setupRenderImageHighlight(callback);
    await delay(PRE_STEP_DELAY_MS);
    return true;
  },
  
  next: async (): Promise<boolean> => {
    cleanupRenderImageHighlight();
    return true;
  },
  
  tip: (): TipConfig => {
    return {
      target: '#renderImageLite .render-image-lite-main',
      targetDiff: {
        left: 0,
        right: -2,
        top: 0,
        bottom: 0
      },
      targetEnableClick: true,
      listenTargetChange: true,
      type: 'tooltip',
      tooltipPlacement: 'bottom',
      tooltipInfo: {
        title: ResourceManager.getString('plugin_guide_step_18_text')
      }
    };
  }
};

export default checkRenderImageStep;