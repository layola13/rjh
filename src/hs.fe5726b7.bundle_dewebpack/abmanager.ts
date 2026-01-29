interface ABTestItem {
  scene: string;
  default: string;
  notFetch?: boolean;
  onLoad: (result: ABTestResult) => void;
}

interface ABTestResult {
  scene: string;
  bucket: string;
}

interface MTOPResponse<T = unknown> {
  ret: string[];
  data?: T;
}

interface ABMultyData {
  data: ABTestResult[];
}

interface ABSingleData {
  data: ABTestResult;
}

interface CookieOptions {
  expires: Date;
  domain: string;
}

interface CookieManager {
  set(key: string, value: string, options: CookieOptions): void;
  get(key: string): string | undefined;
}

type ABManagerStatus = 'unload' | 'loading' | 'loaded';

const TIMEZONE_OFFSET = 288e5;
const COOKIE_EXPIRY_OFFSET = 94608e7;

const cookieExpiryDate = new Date(Date.now() + COOKIE_EXPIRY_OFFSET);

export const getDateString = (): string => {
  return new Date(new Date().getTime() + TIMEZONE_OFFSET)
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '');
};

function setCookie(key: string, value: string, options: CookieOptions): void {
  (window as any).Cookies.set(key, value, options);
}

function getCookie(key: string): string | undefined {
  return (window as any).Cookies.get(key);
}

export const initServerHSI = (): string => {
  let hsi = getCookie('hsi');
  
  if (!hsi || hsi === 'undefined') {
    const domain = (window as any).HSApp.Config.AB_MANAGER_DOMAIN;
    const uuid = (window as any).uuid();
    const newHSI = `${getDateString()}-${uuid}`;
    
    hsi = newHSI;
    setCookie('hsi', newHSI, {
      expires: cookieExpiryDate,
      domain
    });
  }
  
  return hsi;
};

function handleMTOPResponse<T>(promise: Promise<MTOPResponse<T>>): Promise<T | undefined> {
  return promise.then((response) => {
    if (response?.ret?.[0]?.includes('SUCCESS')) {
      return Promise.resolve(response.data?.result ?? response.data);
    }
    return Promise.reject(response);
  });
}

async function fetchMultipleABTests(items: ABTestItem[]): Promise<ABTestResult[]> {
  const cna = initServerHSI();
  const requestData = {
    scenes: items.map((item) => item.scene),
    cna
  };
  
  const response = await handleMTOPResponse<ABMultyData>(
    (window as any).NWTK.mtop.ABManager.newAbMulty({ data: requestData })
  ).catch(() => ({ data: [] }));
  
  return response?.data || [];
}

async function fetchSingleABTest(item: ABTestItem): Promise<ABTestResult | undefined> {
  const cna = initServerHSI();
  const requestData = {
    scene: item.scene,
    cna
  };
  
  const response = await handleMTOPResponse<ABSingleData>(
    (window as any).NWTK.mtop.ABManager.newAbSingle({ data: requestData })
  ).catch(() => ({}));
  
  return response?.data;
}

function saveBucketsToStorage(results: ABTestResult[]): void {
  const storedBuckets = getCookie('hsb');
  const bucketMap: Record<string, string> = storedBuckets ? JSON.parse(storedBuckets) : {};
  
  results.forEach((result) => {
    bucketMap[result.scene] = result.bucket;
  });
  
  const domain = (window as any).HSApp.Config.AB_MANAGER_DOMAIN;
  setCookie('hsb', JSON.stringify(bucketMap), {
    expires: cookieExpiryDate,
    domain
  });
}

export class ABManager {
  private static instance?: ABManager;
  
  private status: ABManagerStatus = 'unload';
  private items: ABTestItem[] = [];
  private statusMap: Map<string, ABTestResult> = new Map();
  private onSceneLoadCallMap: Map<string, Array<(result: ABTestResult) => void>> = new Map();
  
  static getABManager(): ABManager {
    if (!ABManager.instance) {
      ABManager.instance = new ABManager();
    }
    return ABManager.instance;
  }
  
  getBucket(scene: string): string | undefined {
    const result = this.statusMap.get(scene);
    return result?.bucket;
  }
  
  onSceneLoad(scene: string, callback: (result: ABTestResult) => void): void {
    if (!this.onSceneLoadCallMap.get(scene)) {
      this.onSceneLoadCallMap.set(scene, []);
    }
    
    this.onSceneLoadCallMap.get(scene)!.push(callback);
    
    const sceneResult = this.statusMap.get(scene);
    if (sceneResult) {
      this.onSceneLoadCallMap.get(scene)!.forEach((cb) => {
        cb(sceneResult);
      });
    }
  }
  
  offSceneLoad(scene: string, callback: (result: ABTestResult) => void): void {
    const callbacks = this.onSceneLoadCallMap.get(scene);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  
  register(item: ABTestItem): void {
    this.items.push(item);
    if (this.status !== 'unload') {
      this.loadItems([item]);
    }
  }
  
  batchRegister(items: ABTestItem[]): void {
    this.items.push(...items);
    if (this.status !== 'unload') {
      this.loadItems(items);
    }
  }
  
  async load(): Promise<boolean> {
    this.status = 'loading';
    const result = await this.loadItems(this.items);
    this.status = 'loaded';
    return result;
  }
  
  async loadItems(items: ABTestItem[]): Promise<boolean> {
    const itemsToLoad = [...items];
    const itemsToFetch = itemsToLoad.filter((item) => item.notFetch !== true);
    
    let fetchedResults: ABTestResult[] = [];
    if (itemsToFetch.length > 0) {
      fetchedResults = await fetchMultipleABTests(itemsToFetch);
    }
    
    const resultsToSave: ABTestResult[] = [];
    
    itemsToLoad.forEach((item) => {
      const fetchedResult = fetchedResults.find((result) => result.scene === item.scene);
      const testResult: ABTestResult = {
        scene: item.scene,
        bucket: fetchedResult?.bucket || item.default
      };
      
      this.statusMap.set(item.scene, testResult);
      item.onLoad(testResult);
      resultsToSave.push(testResult);
      
      this.onSceneLoadCallMap.get(item.scene)?.forEach((callback) => {
        callback(testResult);
      });
    });
    
    saveBucketsToStorage(resultsToSave);
    return true;
  }
  
  async loadItem(item: ABTestItem): Promise<boolean> {
    let testResult: ABTestResult;
    
    if (item.notFetch) {
      testResult = {
        scene: item.scene,
        bucket: item.default
      };
    } else {
      const fetchedResult = await fetchSingleABTest(item);
      testResult = {
        scene: item.scene,
        bucket: fetchedResult?.bucket || item.default
      };
    }
    
    this.statusMap.set(item.scene, testResult);
    item.onLoad?.(testResult);
    
    this.onSceneLoadCallMap.get(item.scene)?.forEach((callback) => {
      callback(testResult);
    });
    
    saveBucketsToStorage([testResult]);
    return true;
  }
}