export function getOriginImgUrl(imageUrl: string): string {
  return `${imageUrl}?x-oss-process=image/info`;
}

export function getResizeImgUrl(imageUrl: string, width: number, height: number): string {
  return `${imageUrl}?x-oss-process=image/resize,limit_0,m_fill,w_${width},h_${height}/quality,Q_100`;
}

export async function getOriginImgSize(infoUrl: string): Promise<[number, number]> {
  const response = await fetch(infoUrl);
  const data = await response.json();
  const imageWidth = data.ImageWidth;
  const imageHeight = data.ImageHeight;
  
  return [imageWidth.value, imageHeight.value].map((value: string) => parseInt(value)) as [number, number];
}

export function fitImg2Container(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number
): [number, number] {
  if (imageWidth === 0 || imageHeight === 0) {
    throw new Error("图片尺寸错误");
  }
  
  const scaledHeight = (imageHeight / imageWidth) * containerWidth;
  
  if (scaledHeight <= containerHeight) {
    return [containerWidth, scaledHeight].map(Math.floor) as [number, number];
  }
  
  return [(imageWidth / imageHeight) * containerHeight, containerHeight].map(Math.floor) as [number, number];
}