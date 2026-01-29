interface BeginnerGuideQueryData {
  scene: string;
  fromType: string;
}

interface NewUserGuideRecord {
  process: string;
  finishStatus: number;
}

interface ResourceContent {
  newUserGuideRecords?: string;
}

interface BeginnerGuideDataItem {
  resourceContent?: ResourceContent;
}

interface BeginnerGuideResponse {
  data?: {
    data?: BeginnerGuideDataItem[];
  };
}

interface MtopBeginnerGuide {
  query(params: { data: BeginnerGuideQueryData }): Promise<BeginnerGuideResponse>;
}

interface NWTK {
  mtop: {
    beginnerGuide: MtopBeginnerGuide;
  };
}

declare const NWTK: NWTK;
declare const React: any;
declare const ReactDOM: any;

const USER_GUIDE_FINISH_POPUP_CONTAINER = "user-guide-finish-popup-container";

/**
 * Show the user guide finish popup
 */
export function showUserGuideFinishPopup(): void {
  let container = document.querySelector(`.${USER_GUIDE_FINISH_POPUP_CONTAINER}`);
  
  if (!container) {
    container = document.createElement("div");
    container.className = USER_GUIDE_FINISH_POPUP_CONTAINER;
  }
  
  document.body.appendChild(container);
  
  ReactDOM.render(
    React.createElement("UserGuideFinisPopup", {
      exitGuide: hideUserGuideFinishPopup
    }),
    container
  );
}

/**
 * Show userguide popup with gift package check
 */
export async function showUserguidePopup(): Promise<void> {
  const hasReceivedGift = await checkUserGuideGiftStatus();
  
  if (hasReceivedGift) {
    return showUserGuideFinishPopup();
  }
  
  alert("礼包未领取，跳转网站弹窗");
}

/**
 * Check if user has received the new user gift
 */
async function checkUserGuideGiftStatus(): Promise<boolean> {
  const response = await NWTK.mtop.beginnerGuide.query({
    data: {
      scene: "newUserGuide",
      fromType: "tool"
    }
  });
  
  const dataItem = response.data?.data?.[0];
  const resourceContent = dataItem?.resourceContent;
  
  if (!resourceContent?.newUserGuideRecords) {
    return false;
  }
  
  const records: NewUserGuideRecord[] = JSON.parse(resourceContent.newUserGuideRecords);
  
  if (!records || records.length === 0) {
    return false;
  }
  
  const giftRecord = records.find(record => record.process === "NewUserGift");
  
  return giftRecord?.finishStatus === 1;
}

/**
 * Hide and unmount the user guide finish popup
 */
export function hideUserGuideFinishPopup(): void {
  const container = document.querySelector(`.${USER_GUIDE_FINISH_POPUP_CONTAINER}`);
  
  if (container) {
    ReactDOM.unmountComponentAtNode(container);
  }
}

if (typeof window !== "undefined") {
  (window as any).showUserGuideFinishPopup = showUserGuideFinishPopup;
}