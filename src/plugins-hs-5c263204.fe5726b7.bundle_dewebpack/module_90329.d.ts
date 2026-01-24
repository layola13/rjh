/**
 * 用户引导完成弹窗模块
 * 用于显示和管理新用户引导完成后的奖励弹窗
 */

/**
 * 新用户引导记录接口
 */
interface NewUserGuideRecord {
  /** 流程名称 */
  process: string;
  /** 完成状态：0-未完成，1-已完成 */
  finishStatus: number;
}

/**
 * 资源内容接口
 */
interface ResourceContent {
  /** 新用户引导记录的JSON字符串 */
  newUserGuideRecords?: string;
}

/**
 * 引导数据项接口
 */
interface GuideDataItem {
  /** 资源内容 */
  resourceContent?: ResourceContent;
}

/**
 * MTOP查询响应接口
 */
interface MtopQueryResponse {
  data?: {
    data?: GuideDataItem[];
  };
}

/**
 * NWTK全局对象接口
 */
interface NWTK {
  mtop: {
    beginnerGuide: {
      query(params: {
        data: {
          scene: string;
          fromType: string;
        };
      }): Promise<MtopQueryResponse>;
    };
  };
}

declare global {
  const NWTK: NWTK;
  const React: any;
  const ReactDOM: any;
  
  interface Window {
    /** 显示用户引导完成弹窗 */
    showUserGuideFinishPopup: () => void;
  }
}

/** 弹窗容器的CSS类名 */
const USER_GUIDE_FINISH_POPUP_CONTAINER = 'user-guide-finish-popup-container';

/**
 * 显示用户引导完成弹窗
 * 在页面中创建并渲染引导完成弹窗组件
 */
export function showUserGuideFinishPopup(): void {
  let container = document.querySelector<HTMLDivElement>(`.${USER_GUIDE_FINISH_POPUP_CONTAINER}`);
  
  if (!container) {
    container = document.createElement('div');
    container.className = USER_GUIDE_FINISH_POPUP_CONTAINER;
  }
  
  document.body.appendChild(container);
  
  ReactDOM.render(
    React.createElement(UserGuideFinisPopup, {
      exitGuide: hideUserGuideFinishPopup
    }),
    container
  );
}

/**
 * 隐藏用户引导完成弹窗
 * 卸载并移除引导完成弹窗组件
 */
export function hideUserGuideFinishPopup(): void {
  const container = document.querySelector(`.${USER_GUIDE_FINISH_POPUP_CONTAINER}`);
  
  if (container) {
    ReactDOM.unmountComponentAtNode(container);
  }
}

/**
 * 显示用户引导弹窗（主入口）
 * 根据用户礼包领取状态决定显示引导完成弹窗或跳转提示
 */
export async function showUserguidePopup(): Promise<void> {
  const hasReceivedGift = await checkIfUserReceivedNewUserGift();
  
  if (hasReceivedGift) {
    return showUserGuideFinishPopup();
  }
  
  alert('礼包未领取，跳转网站弹窗');
}

/**
 * 检查用户是否已领取新用户礼包
 * @returns 如果已领取返回true，否则返回false
 */
async function checkIfUserReceivedNewUserGift(): Promise<boolean> {
  const response = await NWTK.mtop.beginnerGuide.query({
    data: {
      scene: 'newUserGuide',
      fromType: 'tool'
    }
  });
  
  const guideDataItem = response?.data?.data?.[0];
  const recordsJson = guideDataItem?.resourceContent?.newUserGuideRecords;
  
  if (!recordsJson) {
    return false;
  }
  
  const records: NewUserGuideRecord[] = JSON.parse(recordsJson);
  
  if (!records || records.length === 0) {
    return false;
  }
  
  const newUserGiftRecord = records.find(record => record.process === 'NewUserGift');
  
  return newUserGiftRecord?.finishStatus === 1;
}

// 将函数挂载到全局window对象
window.showUserGuideFinishPopup = showUserGuideFinishPopup;

// 导入的组件（需要从其他模块导入）
import { UserGuideFinisPopup } from './UserGuideFinishPopup';