import CryptoJS from 'crypto-js';
import { loadDesignData, loadJSON } from './designLoader';

interface EncryptedData {
  data: string;
  ext?: string;
  furnishingData?: unknown;
}

interface LiveHintOptions {
  canclose?: boolean;
  status?: string;
}

interface LiveHintAPI {
  show(message: string, duration?: number, _?: undefined, options?: LiveHintOptions): void;
  statusEnum: {
    loading: string;
    completed: string;
    canops: string;
  };
}

interface AjaxAPI {
  get(url: string, options: { dataType: string }): Promise<string>;
}

interface NWTK {
  ajax: AjaxAPI;
}

declare const LiveHint: LiveHintAPI;
declare const NWTK: NWTK;

const AES_IV = CryptoJS.enc.Utf8.parse("KGjnxaXNuU1BLElj");
const AES_KEY = "SHEJIJIAZHIJIuCavYRfRPXArQRrg";
const INTRANET_CHECK_URL = "https://dev.g.alicdn.com/flabfe/foo/0.0.1/a.js";
const INTRANET_CHECK_TIMEOUT = 3000;
const SUCCESS_MESSAGE_DURATION = 4000;

export default class JSONLoader {
  /**
   * Load encrypted JSON data
   * @param encryptedText - Encrypted and URL-encoded JSON string
   */
  async load(encryptedText: string): Promise<void> {
    const isIntranet = await this.isIntranet();
    
    if (!isIntranet) {
      LiveHint.show("请在内网中加载JSON", SUCCESS_MESSAGE_DURATION, undefined, {
        canclose: true,
        status: LiveHint.statusEnum.canops
      });
      return;
    }

    const decryptedData = this.decryptData(encryptedText);
    const parsedData: EncryptedData = JSON.parse(decryptedData);

    if (parsedData.ext) {
      this.loadDesignData(parsedData.data, parsedData.ext);
      return;
    }

    this.loadJSONUrl(parsedData.data, parsedData.furnishingData);
  }

  /**
   * Check if the current environment is within the intranet
   * @returns Promise resolving to true if intranet, false otherwise
   */
  private isIntranet(): Promise<boolean> {
    return Promise.race([
      new Promise<number>((resolve) => 
        setTimeout(() => resolve(0), INTRANET_CHECK_TIMEOUT)
      ),
      fetch(INTRANET_CHECK_URL, { method: "HEAD" })
    ])
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Decrypt AES encrypted data
   * @param encryptedText - URL-encoded encrypted string
   * @returns Decrypted string
   */
  private decryptData(encryptedText: string): string {
    const decodedText = window.decodeURIComponent(encryptedText);
    const decrypted = CryptoJS.AES.decrypt(decodedText, AES_KEY, {
      iv: AES_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Load design data from a remote URL
   * @param url - URL to fetch design data from
   * @param ext - Extension data
   */
  private loadDesignData(url: string, ext: string): void {
    LiveHint.show("正在加载JSON", undefined, undefined, {
      status: LiveHint.statusEnum.loading
    });

    NWTK.ajax.get(url, { dataType: "text" })
      .then((response) => {
        const data = JSON.parse(response);
        return loadDesignData(data, ext);
      })
      .then(() => {
        LiveHint.show("加载JSON成功", SUCCESS_MESSAGE_DURATION, undefined, {
          canclose: true,
          status: LiveHint.statusEnum.completed
        });
      })
      .catch(() => {
        LiveHint.show("加载JSON失败", undefined, undefined, {
          canclose: true,
          status: LiveHint.statusEnum.canops
        });
      });
  }

  /**
   * Load JSON from a remote URL
   * @param url - URL to fetch JSON from
   * @param furnishingData - Additional furnishing data
   */
  private loadJSONUrl(url: string, furnishingData?: unknown): void {
    LiveHint.show("正在加载JSON", undefined, undefined, {
      status: LiveHint.statusEnum.loading
    });

    NWTK.ajax.get(url, { dataType: "text" })
      .then((response) => {
        const data = JSON.parse(response);
        return loadJSON(data, furnishingData);
      })
      .then(() => {
        LiveHint.show("加载JSON成功", SUCCESS_MESSAGE_DURATION, undefined, {
          canclose: true,
          status: LiveHint.statusEnum.completed
        });
      })
      .catch(() => {
        LiveHint.show("加载JSON失败", undefined, undefined, {
          canclose: true,
          status: LiveHint.statusEnum.canops
        });
      });
  }
}