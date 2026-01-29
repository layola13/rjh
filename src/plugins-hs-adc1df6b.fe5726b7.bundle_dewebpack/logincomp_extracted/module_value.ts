interface MtopResponse<T> {
  data: T;
  ret: string[];
}

interface EnterpriseInfo {
  [key: string]: unknown;
}

interface ComponentState {
  enterpriseInfo: EnterpriseInfo | null;
}

interface Component {
  setState(state: Partial<ComponentState>): void;
}

async function fetchAndSetEnterpriseInfo(this: Component): Promise<void> {
  try {
    const response: MtopResponse<EnterpriseInfo> = await NWTK.mtop.User.getEnterpriseInfo();
    
    if (response?.data && response.ret[0]?.includes("SUCCESS")) {
      this.setState({
        enterpriseInfo: response.data
      });
    }
  } catch (error) {
    console.error("Failed to fetch enterprise info:", error);
  }
}

declare const NWTK: {
  mtop: {
    User: {
      getEnterpriseInfo(): Promise<MtopResponse<EnterpriseInfo>>;
    };
  };
};