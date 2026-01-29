interface NormalizationData {
  [key: string]: string | undefined;
}

interface FeatureDetection {
  (feature: string, implementation?: unknown): boolean;
  normalize: (feature: string) => string;
  data: NormalizationData;
  NATIVE: string;
  POLYFILL: string;
}

const NATIVE_MARKER = "N";
const POLYFILL_MARKER = "P";
const FEATURE_PATTERN = /#|\.prototype\./;

const normalizationData: NormalizationData = {};

const normalizeFeatureName = (feature: string): string => {
  return String(feature).replace(FEATURE_PATTERN, ".").toLowerCase();
};

const detectFeature: FeatureDetection = (
  feature: string,
  implementation?: unknown
): boolean => {
  const normalizedFeature = normalizeFeatureName(feature);
  const detectionResult = normalizationData[normalizedFeature];

  if (detectionResult === POLYFILL_MARKER) {
    return true;
  }

  if (detectionResult !== NATIVE_MARKER) {
    if (typeof implementation === "function") {
      try {
        implementation();
        return true;
      } catch {
        return false;
      }
    }
    return !!implementation;
  }

  return detectionResult === POLYFILL_MARKER;
};

detectFeature.normalize = normalizeFeatureName;
detectFeature.data = normalizationData;
detectFeature.NATIVE = NATIVE_MARKER;
detectFeature.POLYFILL = POLYFILL_MARKER;

export default detectFeature;