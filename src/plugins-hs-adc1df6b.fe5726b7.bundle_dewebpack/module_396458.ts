interface LoadPictureOptions {
  maxWidth: number;
  maxHeight: number;
  beforeSendingToServerCallback?: () => void;
}

interface HSAppUtil {
  File: {
    load: (accept: string, readAs: string) => Promise<string>;
  };
  Image: {
    resize: (image: HTMLImageElement, width: number, height: number) => HTMLCanvasElement;
    toDataURL: (canvas: HTMLCanvasElement, mimeType: string) => string;
  };
}

declare global {
  interface Window {
    HSApp: {
      Util: HSAppUtil;
    };
    WebKitBlobBuilder?: new () => BlobBuilder;
    MozBlobBuilder?: new () => BlobBuilder;
  }
  const HSApp: {
    Util: HSAppUtil;
  };
}

interface BlobBuilder {
  append(data: ArrayBuffer): void;
  getBlob(type: string): Blob;
}

async function takeModelCapture(model: unknown): Promise<unknown> {
  const { takeModelCapture } = await import('./model-capture-utils');
  const result = await takeModelCapture(model);
  return result;
}

export default class ImageUtility {
  static async takeModelCapture(model: unknown): Promise<unknown> {
    const result = await takeModelCapture(model);
    return result;
  }

  static dataURItoBlob(dataURI: string): Blob {
    const base64Data = window.atob(dataURI.split(', ')[1]);
    const mimeType = dataURI.split(', ')[0].split(':')[1].split(';')[0];
    const buffer = new ArrayBuffer(base64Data.length);
    const uint8Array = new Uint8Array(buffer);

    for (let i = 0; i < base64Data.length; i += 1) {
      uint8Array[i] = base64Data.charCodeAt(i);
    }

    try {
      return new Blob([buffer], { type: mimeType });
    } catch (error) {
      const blobBuilder = new (window.WebKitBlobBuilder || window.MozBlobBuilder)!();
      blobBuilder.append(buffer);
      return blobBuilder.getBlob(mimeType);
    }
  }

  static dataURLtoFile(dataURL: string, fileName: string = 'file'): File {
    const parts = dataURL.split(', ');
    const mimeType = parts[0].match(/:(.*?);/)![1];
    const extension = mimeType.split('/')[1];
    const base64Data = atob(parts[1]);
    let byteLength = base64Data.length;
    const uint8Array = new Uint8Array(byteLength);

    while (byteLength--) {
      uint8Array[byteLength] = base64Data.charCodeAt(byteLength);
    }

    return new File([uint8Array], `${fileName}.${extension}`, { type: mimeType });
  }

  static loadPictureFile(options?: Partial<LoadPictureOptions>): Promise<string> {
    const defaultOptions: LoadPictureOptions = {
      maxWidth: 1000,
      maxHeight: 1000,
      beforeSendingToServerCallback: undefined,
    };

    const mergedOptions = Object.assign(defaultOptions, options);

    return HSApp.Util.File.load('image/png, image/jpeg', 'dataURL').then((dataURL: string) => {
      if (mergedOptions.beforeSendingToServerCallback) {
        mergedOptions.beforeSendingToServerCallback();
      }
      return ImageUtility.getCenteredResizedImageDataURL_(
        dataURL,
        mergedOptions.maxWidth,
        mergedOptions.maxHeight
      );
    });
  }

  static uploadPictureToS3_(targetUrl: string, options?: Partial<LoadPictureOptions>): Promise<string> {
    return ImageUtility.loadPictureFile(options).then((dataURL: string) => {
      if (options?.beforeSendingToServerCallback) {
        options.beforeSendingToServerCallback();
      }
      return ImageUtility.getCenteredResizedImageDataURL_(
        dataURL,
        options?.maxWidth ?? 1000,
        options?.maxHeight ?? 1000
      );
    });
  }

  private static getCenteredResizedImageDataURL_(
    dataURL: string,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;

        if (naturalWidth > maxWidth && naturalHeight > maxHeight) {
          const widthRatio = naturalWidth / maxWidth;
          const heightRatio = naturalHeight / maxHeight;
          const scaleFactor = widthRatio < heightRatio ? widthRatio : heightRatio;
          const resizedCanvas = HSApp.Util.Image.resize(
            image,
            naturalWidth / scaleFactor,
            naturalHeight / scaleFactor
          );
          const resizedDataURL = HSApp.Util.Image.toDataURL(resizedCanvas, 'image/png');
          (resizedCanvas as any).xRelease?.();
          resolve(resizedDataURL);
        } else {
          resolve(dataURL);
        }
      };
      image.src = dataURL;
    });
  }
}