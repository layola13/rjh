import React, { useState, useEffect } from 'react';

/**
 * Viewer dimensions constants
 */
export const VIEWER_WIDTH = 800;
export const VIEWER_HEIGHT = 600;

/**
 * Image metadata interface
 */
interface ImageData {
  /** The URL of the image to display */
  imageUrl: string;
}

/**
 * Props for the SimpleViewer component
 */
interface SimpleViewerProps {
  /** Image data containing the URL to display */
  img: ImageData;
}

/**
 * Tuple representing width and height dimensions
 */
type Dimensions = [width: number, height: number];

/**
 * Utility: Get the original image URL without resize parameters
 */
export function getOriginImgUrl(url: string): string {
  // Implementation would parse and clean URL
  return url;
}

/**
 * Utility: Get the resized image URL
 */
export function getResizeImgUrl(url: string, width: number, height: number): string {
  // Implementation would append resize parameters
  return `${url}?w=${width}&h=${height}`;
}

/**
 * Utility: Fetch original image dimensions
 */
export async function getOriginImgSize(url: string): Promise<Dimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve([img.naturalWidth, img.naturalHeight]);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Utility: Calculate dimensions to fit image within container while maintaining aspect ratio
 */
export function fitImg2Container(
  containerWidth: number,
  containerHeight: number,
  imgWidth: number,
  imgHeight: number
): Dimensions {
  const containerRatio = containerWidth / containerHeight;
  const imgRatio = imgWidth / imgHeight;

  let width: number;
  let height: number;

  if (imgRatio > containerRatio) {
    // Image is wider than container
    width = Math.min(imgWidth, containerWidth);
    height = width / imgRatio;
  } else {
    // Image is taller than container
    height = Math.min(imgHeight, containerHeight);
    width = height * imgRatio;
  }

  return [width, height];
}

/**
 * SimpleViewer Component
 * 
 * A React component that displays an image with automatic sizing to fit within
 * a fixed viewport while maintaining aspect ratio. Shows a dark background overlay
 * when the image doesn't fill the entire viewer area.
 * 
 * @param props - Component properties
 * @returns Rendered image viewer component
 * 
 * @example
 *