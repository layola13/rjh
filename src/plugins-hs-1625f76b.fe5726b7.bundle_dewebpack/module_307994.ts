interface ResourceConfig {
  maxWidth: number;
  maxHeight: number;
}

interface UploadError {
  errMsg: string;
  isInValid: boolean;
}

interface ReportData {
  assetId: string;
  [key: string]: unknown;
}

interface AppParams {
  t: string;
  l: string;
  [key: string]: unknown;
}

interface ApiResponse<T> {
  data: T;
  ret: string[];
}

interface ReasonDataParams {
  tenant: string;
  lang: string;
  nameFilters: string;
}

interface AttributeResult {
  result: unknown;
  [key: string]: unknown;
}

/**
 * Parse resource URL with appropriate prefix
 */
function parseURL(url: string): string {
  let resourcePath = `res/${url}`;
  
  if (/\.(gif|jpg|jpeg|png|svg|SVG|GIF|JPG|PNG)$/.test(url)) {
    resourcePath = `res/img/${url}`;
  }
  
  return ResourceManager.parseURL(resourcePath, './plugin/catalogpopup/');
}

/**
 * Open file picker dialog for image selection
 */
function openFile(): Promise<File[]> {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('multiple', 'true');
  input.setAttribute('accept', 'image/*');
  input.style.display = 'none';
  document.body.appendChild(input);
  
  return new Promise((resolve, reject) => {
    input.click();
    input.onchange = () => {
      const files = input.files;
      if (files) {
        const fileArray: File[] = [];
        for (let i = 0; i < files.length; i++) {
          fileArray.push(files[i]);
        }
        resolve(fileArray);
      } else {
        reject(null);
      }
    };
  });
}

/**
 * Upload picture to S3 with optional size constraints
 */
async function uploadPictureToS3(assetId: string, config?: Partial<ResourceConfig>): Promise<unknown> {
  const defaultConfig: ResourceConfig = {
    maxWidth: 600,
    maxHeight: 600,
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  let contentType = '';
  
  const files = await openFile();
  const file = files[0];
  
  const maxSizeInMB = 5;
  if (file && file.size / 1048576 > maxSizeInMB) {
    return {
      errMsg: 'upload_picture_fail_size_large',
      isInValid: true,
    };
  }
  
  if (file && !/jpeg|jpg|png/.test(file.type)) {
    return {
      errMsg: 'upload_picture_fail_type_error',
      isInValid: true,
    };
  }
  
  contentType = file.type;
  
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  
  const dataURL = await new Promise<string>((resolve) => {
    fileReader.onload = (event) => {
      resolve((event.target as FileReader).result as string);
    };
  });
  
  if (isUploadError(dataURL)) {
    return dataURL;
  }
  
  const img = document.createElement('img');
  const imageSrc = await new Promise<string>((resolve) => {
    img.onload = (event) => {
      resolve((event.target as HTMLImageElement).src);
    };
  });
  img.src = dataURL;
  
  if (isUploadError(imageSrc)) {
    return imageSrc;
  }
  
  const resizedDataURL = await getCenteredResizedImageDataURL(
    imageSrc,
    finalConfig.maxWidth,
    finalConfig.maxHeight
  );
  
  if (isUploadError(resizedDataURL)) {
    return resizedDataURL;
  }
  
  return NWTK.api.design.uploadReportFile(resizedDataURL, {
    headers: {
      acl: 'public-read',
      'content-type': contentType,
    },
    contentType,
  });
}

/**
 * Type guard for upload error
 */
function isUploadError(value: unknown): value is UploadError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isInValid' in value &&
    (value as UploadError).isInValid === true
  );
}

/**
 * Resize and center image to fit within max dimensions
 */
function getCenteredResizedImageDataURL(
  imageUrl: string,
  maxWidth: number,
  maxHeight: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      
      if (naturalWidth > maxWidth && naturalHeight > maxHeight) {
        const widthRatio = naturalWidth / maxWidth;
        const heightRatio = naturalHeight / maxHeight;
        const scaleFactor = widthRatio < heightRatio ? widthRatio : heightRatio;
        
        const resizedImage = HSApp.Util.Image.resize(
          img,
          naturalWidth / scaleFactor,
          naturalHeight / scaleFactor
        );
        const resizedDataURL = HSApp.Util.Image.toDataURL(resizedImage, 'image/png');
        resizedImage.xRelease();
        resolve(resizedDataURL);
      } else {
        resolve(imageUrl);
      }
    };
    img.src = imageUrl;
  });
}

/**
 * Submit report data for an asset
 */
async function addReportData(assetId: string, additionalData: Record<string, unknown>): Promise<unknown> {
  HSApp.Util.Request.getAppParams();
  
  const reportData: ReportData = {
    assetId,
    ...additionalData,
  };
  
  try {
    const response = await NWTK.mtop.Feedback.submitFeedback({
      data: reportData,
    });
    
    const { data } = response;
    
    if (response?.ret[0]?.includes('SUCCESS') && data) {
      return data || {};
    }
    
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Submit application data
 */
async function addApplyData(data: Record<string, unknown>): Promise<unknown> {
  try {
    const response = await NWTK.mtop.Feedback.submitModel({
      data,
    });
    
    const responseData = response.data;
    
    if (response?.ret[0]?.includes('SUCCESS') && responseData) {
      return responseData || {};
    }
    
    return Promise.reject(responseData);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Fetch reason data by name filters
 */
async function getReasonData(nameFilters: string): Promise<unknown> {
  const appParams = HSApp.Util.Request.getAppParams() as AppParams;
  
  const params: ReasonDataParams = {
    tenant: appParams.t,
    lang: appParams.l,
    nameFilters,
  };
  
  try {
    const response = await NWTK.mtop.Catalog.getAttributes({
      data: params,
    });
    
    const { data } = response;
    
    if (response?.ret[0]?.includes('SUCCESS') && data?.result) {
      return data.result;
    }
    
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  parseURL,
  openFile,
  uploadPictureToS3,
  getCenteredResizedImageDataURL,
  addReportData,
  addApplyData,
  getReasonData,
};