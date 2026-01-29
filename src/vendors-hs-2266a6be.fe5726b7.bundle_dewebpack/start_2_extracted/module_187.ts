import BaseCollector from './BaseCollector';
import { getGraphicsCard, getMemory } from './utils';

interface GraphicsCardInfo {
  graphicsCard?: string;
  webglVersion?: string;
}

interface PlatformLogParams {
  platform?: string;
  browserVersion?: string;
  resolution?: string;
  devicePixelRatio?: number;
  graphicsCard?: string;
  webglVersion?: string;
  memory?: number;
}

class PlatformInfoCollector extends BaseCollector {
  static readonly collecterName = "platformInfo";
  private static graphicsCard: GraphicsCardInfo = getGraphicsCard();

  getLogParams(): PlatformLogParams {
    if (!window) {
      return {};
    }

    PlatformInfoCollector.graphicsCard = PlatformInfoCollector.graphicsCard || getGraphicsCard();

    return {
      platform: window.navigator?.platform,
      browserVersion: window.navigator?.appVersion,
      resolution: `${window.screen.width}*${window.screen.height}`,
      devicePixelRatio: window.devicePixelRatio,
      graphicsCard: PlatformInfoCollector.graphicsCard?.graphicsCard,
      webglVersion: PlatformInfoCollector.graphicsCard?.webglVersion,
      memory: getMemory()
    };
  }
}

export default PlatformInfoCollector;