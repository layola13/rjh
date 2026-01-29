interface ResourceContent {
  linkNameMdsKeyValue: string;
  linkUrlMdsKeyValue: string;
  contentMdsKeyValue: string;
  templateId: string;
}

interface ResourceRule {
  bgColor?: string;
  bgImage?: string;
  fontColor?: string;
}

interface ResourceData {
  resourceContent: ResourceContent;
  resourceCode: string;
  resourceRule?: ResourceRule;
}

interface APIResponse<T> {
  ret: string[];
  data: {
    data: T[];
  };
}

interface UserMemberInfo {
  memberType: number;
  groupUser: boolean;
  stylerMember: boolean;
}

interface TrackingParams {
  resourceCode: string;
}

type BizType = string;
type EnvType = string;
type TrackingCallback = (eventName: string, params: TrackingParams) => void;

interface MemberAdParams {
  linkNameMdsKeyValue: string;
  linkUrlMdsKeyValue: string;
  contentMdsKeyValue: string;
  resourceRule?: ResourceRule;
  resourceCode: string;
}

interface GlobalClientUser {
  messageListener: unknown;
}

declare global {
  interface Window {
    open(url: string, target: string): void;
    adsbygoogle: unknown[];
    globalClientUser?: GlobalClientUser;
  }
}

import { getAPIPromise } from './module_734';
import { loginMessageListener } from './module_564';
import './module_444';

const MEMBER_TYPE_LABELS: Record<number, string> = {
  1: 'Basic',
  2: 'Pro',
  3: 'Master'
};

const AD_CLIENT_ID = 'ca-pub-7767741762729915';
const AD_SLOT_ID = '2319331646';
const TEMPLATE_ID_GOOGLE_ADS = '2';

/**
 * Opens a URL in a new tab and tracks the action
 */
function openUrlAndTrack(
  url: string,
  eventName: string,
  resourceCode: string,
  trackingCallback: TrackingCallback
): void {
  if (url) {
    window.open(url, '_blank');
  }
  trackingCallback(eventName, { resourceCode });
}

/**
 * Loads Google AdSense script dynamically
 */
function loadAdSenseScript(): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.setAttribute('src', `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT_ID}`);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('async', 'async');
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = () => {
      resolve(true);
    };
    document.body.appendChild(script);
  });
}

/**
 * Renders Google AdSense ads in the loading page
 */
function renderGoogleAds(
  linkUrl: string,
  resourceCode: string,
  trackingCallback: TrackingCallback
): void {
  const loadingSvgElement = document.querySelector('.loadingsvg');
  if (!loadingSvgElement) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'adsenseWrapper';
  wrapper.className = 'member-ad-wrapper';
  wrapper.innerHTML = `<ins class="adsbygoogle"
     id="loading-ads"
     data-ad-client="${AD_CLIENT_ID}"
     data-ad-slot="${AD_SLOT_ID}"
     ></ins>
 <a id="closeAds" class="ads-close-btn">Subscribe & Remove Ads</a>`;
  
  loadingSvgElement.append(wrapper);

  loadAdSenseScript().then(() => {
    const loadingAds = document.getElementById('loading-ads');
    const closeButton = document.getElementById('closeAds');
    
    if (!loadingAds || !closeButton) return;

    loadingAds.style.display = 'block';
    wrapper.style.display = 'flex';

    const adsbygoogle = window.adsbygoogle || [];
    adsbygoogle.push({});

    if (linkUrl) {
      closeButton.style.display = 'block';
      closeButton.addEventListener('click', () => {
        openUrlAndTrack(linkUrl, 'loadingPageAds_clickRemove', resourceCode, trackingCallback);
      });
    }
  });
}

/**
 * Renders custom member ad in the loading page
 */
function renderMemberAd(params: MemberAdParams, trackingCallback: TrackingCallback): void {
  const { linkNameMdsKeyValue, linkUrlMdsKeyValue, contentMdsKeyValue, resourceCode, resourceRule } = params;
  
  const loadingSvgElement = document.querySelector('.loadingsvg');
  if (!loadingSvgElement) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'memberAdWrapper';
  wrapper.className = 'member-ad-wrapper';
  wrapper.innerHTML = `<p id="memberAdText" class="member-ad-text">
 ${contentMdsKeyValue}
 </p>
 <a id="memberAdBtn" class="member-ad-btn">${linkNameMdsKeyValue}</a>`;
  
  loadingSvgElement.append(wrapper);

  const adButton = document.getElementById('memberAdBtn');
  if (linkNameMdsKeyValue && adButton) {
    adButton.style.display = 'block';
  }

  if (resourceRule) {
    const { bgColor, bgImage, fontColor } = resourceRule;
    if (bgColor) {
      wrapper.style.backgroundColor = bgColor;
    }
    if (bgImage) {
      wrapper.style.backgroundImage = bgImage;
    }
    if (fontColor) {
      wrapper.style.color = fontColor;
    }
  }

  wrapper.style.display = 'flex';
  wrapper.addEventListener('click', () => {
    openUrlAndTrack(linkUrlMdsKeyValue, 'loadingPageAds_clickContent', resourceCode, trackingCallback);
  });
}

/**
 * Fetches and displays resource configurations for loading page ads
 */
function loadResourceConfigs(biz: BizType, env: EnvType, trackingCallback: TrackingCallback): void {
  getAPIPromise<ResourceData>('resourceConfigs', biz, env, { scene: 'toolLoading' })
    .then((response) => {
      if (!response?.ret?.[0]?.includes('SUCCESS') || !response.data) {
        return;
      }

      const resourceData = response.data.data?.[0];
      if (!resourceData) return;

      const { resourceContent, resourceCode, resourceRule } = resourceData;
      if (!resourceContent) return;

      const { linkNameMdsKeyValue, linkUrlMdsKeyValue, contentMdsKeyValue, templateId } = resourceContent;

      if (templateId === TEMPLATE_ID_GOOGLE_ADS) {
        renderGoogleAds(linkUrlMdsKeyValue, resourceCode, trackingCallback);
      } else {
        renderMemberAd(
          {
            linkNameMdsKeyValue,
            linkUrlMdsKeyValue,
            contentMdsKeyValue,
            resourceRule,
            resourceCode
          },
          trackingCallback
        );
      }

      trackingCallback('loadingPageAds_expose', { resourceCode });
    });
}

/**
 * Fetches and displays user member information
 */
function loadUserMemberInfo(biz: BizType, env: EnvType): void {
  getAPIPromise<UserMemberInfo>('getUserMemberInfo', biz, env)
    .then((response) => {
      if (!response?.ret?.[0]?.includes('SUCCESS') || !response.data) {
        return;
      }

      const { memberType, groupUser, stylerMember } = response.data.data[0];
      const memberLevelElement = document.getElementById('memberLevel');
      
      if (!memberLevelElement) return;

      memberLevelElement.innerHTML = groupUser ? 'Team' : MEMBER_TYPE_LABELS[memberType];

      if (!groupUser && memberType > 1) {
        memberLevelElement.classList.add('dark');
      }

      if (groupUser || memberType > 1 || !stylerMember) {
        memberLevelElement.style.display = 'block';
      }

      if (!groupUser && stylerMember) {
        const stylerMemberElement = document.getElementById('stylerMember');
        if (stylerMemberElement) {
          stylerMemberElement.style.display = 'block';
        }
      }
    });
}

/**
 * Initializes loading page ads and member info display
 */
export default function initializeLoadingPage(
  biz: BizType,
  env: EnvType,
  trackingCallback: TrackingCallback
): void {
  try {
    loadResourceConfigs(biz, env, trackingCallback);

    if (biz === 'global') {
      loadUserMemberInfo(biz, env);
      window.globalClientUser = {
        messageListener: loginMessageListener(biz)
      };
    }
  } catch (error) {
    console.log(error);
  }
}