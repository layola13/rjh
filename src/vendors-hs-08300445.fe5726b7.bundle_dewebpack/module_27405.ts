import React, { createContext, useState, ReactNode, useContext } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface PreviewIcons {
  rotateLeft?: ReactNode;
  rotateRight?: ReactNode;
  zoomIn?: ReactNode;
  zoomOut?: ReactNode;
  close?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

interface PreviewContextValue {
  isPreviewGroup?: boolean;
  previewUrls: Map<number, string>;
  setPreviewUrls: (urls: Map<number, string> | ((prev: Map<number, string>) => Map<number, string>)) => void;
  current: number | null | undefined;
  setCurrent: (id: number | undefined) => void;
  setShowPreview: (show: boolean) => void;
  setMousePosition: (position: MousePosition | null) => void;
  registerImage: ((id: number, url: string) => () => void) | null;
}

export const context = createContext<PreviewContextValue>({
  previewUrls: new Map(),
  setPreviewUrls: () => null,
  current: null,
  setCurrent: () => null,
  setShowPreview: () => null,
  setMousePosition: () => null,
  registerImage: null,
});

const PreviewContextProvider = context.Provider;

interface PreviewComponentProps {
  'aria-hidden': boolean;
  visible: boolean;
  prefixCls: string;
  onClose: (event: React.MouseEvent) => void;
  mousePosition: MousePosition | null;
  src: string | undefined;
  icons: PreviewIcons;
}

declare const PreviewComponent: React.ComponentType<PreviewComponentProps>;

interface PreviewGroupProps {
  previewPrefixCls?: string;
  children: ReactNode;
  icons?: PreviewIcons;
}

/**
 * Image Preview Group Component
 * Provides context for managing multiple image previews
 */
export default function PreviewGroup(props: PreviewGroupProps): JSX.Element {
  const {
    previewPrefixCls = 'rc-image-preview',
    children,
    icons = {},
  } = props;

  const [previewUrls, setPreviewUrls] = useState<Map<number, string>>(new Map());
  const [current, setCurrent] = useState<number | undefined>();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);

  const registerImage = (id: number, url: string): (() => void) => {
    setPreviewUrls((prevUrls) => {
      return new Map(prevUrls).set(id, url);
    });

    return () => {
      setPreviewUrls((prevUrls) => {
        const newUrls = new Map(prevUrls);
        return newUrls.delete(id) ? newUrls : prevUrls;
      });
    };
  };

  const handleClose = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setShowPreview(false);
    setMousePosition(null);
  };

  const contextValue: PreviewContextValue = {
    isPreviewGroup: true,
    previewUrls,
    setPreviewUrls,
    current,
    setCurrent,
    setShowPreview,
    setMousePosition,
    registerImage,
  };

  return (
    <PreviewContextProvider value={contextValue}>
      {children}
      <PreviewComponent
        aria-hidden={!showPreview}
        visible={showPreview}
        prefixCls={previewPrefixCls}
        onClose={handleClose}
        mousePosition={mousePosition}
        src={previewUrls.get(current!)}
        icons={icons}
      />
    </PreviewContextProvider>
  );
}