interface VersionInfo {
  version: string;
  mode: string;
  copyright: string;
  license: string;
  source: string;
}

type SharedStore = Record<string, unknown>;

const IS_PURE_MODE = false; // Replace with actual value from module 700846
const SHARED_STORE: SharedStore = {}; // Replace with actual value from module 497886

function getSharedData<T>(key: string, defaultValue?: T): T {
  if (SHARED_STORE[key] === undefined && defaultValue !== undefined) {
    SHARED_STORE[key] = defaultValue;
  }
  return SHARED_STORE[key] as T;
}

const versions = getSharedData<VersionInfo[]>("versions", []);

versions.push({
  version: "3.29.0",
  mode: IS_PURE_MODE ? "pure" : "global",
  copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.29.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});

export { getSharedData, versions };