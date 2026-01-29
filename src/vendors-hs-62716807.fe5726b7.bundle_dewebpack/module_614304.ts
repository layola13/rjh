export interface FileItem {
  uid: string | number;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  lastModifiedDate: Date;
  percent: number;
  originFileObj: File;
  thumbUrl?: string;
  url?: string;
}

export function T(): boolean {
  return true;
}

export function fileToObject(file: File & { uid?: string | number }): FileItem {
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: new Date(file.lastModified),
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid ?? file.name,
    percent: 0,
    originFileObj: file
  };
}

export function getFileItem(targetFile: Partial<FileItem>, fileList: FileItem[]): FileItem | undefined {
  const key = targetFile.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(file => file[key] === targetFile[key])[0];
}

export function removeFileItem(targetFile: Partial<FileItem>, fileList: FileItem[]): FileItem[] | null {
  const key = targetFile.uid !== undefined ? 'uid' : 'name';
  const filteredList = fileList.filter(file => file[key] !== targetFile[key]);
  
  if (filteredList.length === fileList.length) {
    return null;
  }
  
  return filteredList;
}

function isImageMimeType(mimeType: string): boolean {
  return mimeType.indexOf('image/') === 0;
}

function getFileExtension(url: string = ''): string {
  const pathSegments = url.split('/');
  const fileName = pathSegments[pathSegments.length - 1].split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(fileName) || [''])[0];
}

export function isImageUrl(file: Partial<FileItem>): boolean {
  if (file.type && !file.thumbUrl) {
    return isImageMimeType(file.type);
  }
  
  const url = file.thumbUrl || file.url || '';
  const extension = getFileExtension(url);
  
  const hasImageDataUrl = /^data:image\//.test(url);
  const hasImageExtension = /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension);
  
  if (hasImageDataUrl || hasImageExtension) {
    return true;
  }
  
  const isDataUrl = /^data:/.test(url);
  
  return !isDataUrl && !extension;
}

const PREVIEW_SIZE = 200;

export function previewImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    if (!file.type || !isImageMimeType(file.type)) {
      resolve('');
      return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = PREVIEW_SIZE;
    canvas.height = PREVIEW_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${PREVIEW_SIZE}px; height: ${PREVIEW_SIZE}px; z-index: 9999; display: none;`;
    
    document.body.appendChild(canvas);
    
    const context = canvas.getContext('2d');
    if (!context) {
      document.body.removeChild(canvas);
      resolve('');
      return;
    }
    
    const image = new Image();
    
    image.onload = () => {
      const imageWidth = image.width;
      const imageHeight = image.height;
      
      let drawWidth = PREVIEW_SIZE;
      let drawHeight = PREVIEW_SIZE;
      let offsetX = 0;
      let offsetY = 0;
      
      if (imageWidth > imageHeight) {
        drawHeight = imageHeight * (PREVIEW_SIZE / imageWidth);
        offsetY = -((drawHeight - PREVIEW_SIZE) / 2);
      } else {
        drawWidth = imageWidth * (PREVIEW_SIZE / imageHeight);
        offsetX = -((drawWidth - PREVIEW_SIZE) / 2);
      }
      
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      
      const dataUrl = canvas.toDataURL();
      document.body.removeChild(canvas);
      resolve(dataUrl);
    };
    
    image.src = window.URL.createObjectURL(file);
  });
}