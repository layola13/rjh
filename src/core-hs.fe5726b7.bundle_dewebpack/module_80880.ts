interface VersionInfo {
  version: string;
  mode: string;
  copyright: string;
  license: string;
  source: string;
}

interface SharedStore {
  [key: string]: unknown;
}

const IS_PURE: boolean = false; // Replace with actual value from module 28808
const sharedStore: SharedStore = {}; // Replace with actual value from module 65144

function getSharedData<T>(key: string, defaultValue?: T): T {
  if (!sharedStore[key]) {
    sharedStore[key] = defaultValue !== undefined ? defaultValue : {};
  }
  return sharedStore[key] as T;
}

const versions: VersionInfo[] = getSharedData<VersionInfo[]>("versions", []);

versions.push({
  version: "3.29.0",
  mode: IS_PURE ? "pure" : "global",
  copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.29.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});

export { getSharedData, versions };