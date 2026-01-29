interface FeatureDetectionData {
  [key: string]: string;
}

interface FeatureDetection {
  (feature: string, implementation?: unknown): boolean;
  normalize: (feature: string) => string;
  data: FeatureDetectionData;
  NATIVE: string;
  POLYFILL: string;
}

const NATIVE = "N";
const POLYFILL = "P";

const featureData: FeatureDetectionData = {};

const HASH_OR_PROTOTYPE_REGEX = /#|\.prototype\./;

function normalizeFeatureName(feature: string): string {
  return String(feature).replace(HASH_OR_PROTOTYPE_REGEX, ".").toLowerCase();
}

function isFeatureSupported(
  feature: string,
  implementation?: unknown
): boolean {
  const normalizedFeature = normalizeFeatureName(feature);
  const detectionResult = featureData[normalizedFeature];

  if (detectionResult === POLYFILL) {
    return true;
  }

  if (detectionResult !== NATIVE) {
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

  return true;
}

const featureDetection = isFeatureSupported as FeatureDetection;
featureDetection.normalize = normalizeFeatureName;
featureDetection.data = featureData;
featureDetection.NATIVE = NATIVE;
featureDetection.POLYFILL = POLYFILL;

export default featureDetection;