import React, { useState } from 'react';
import { PositionTooltip } from './PositionTooltip';
import { RemindContent } from './RemindContent';
import { ThemeContext, useTheme } from './ThemeContext';
import { RemindModalContext } from './RemindModalContext';

export type ThemeType = 'teaching-light' | 'teaching-dark';
export type RemindType = string;

export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom?: number;
  right?: number;
}

export interface RemindData {
  [key: string]: unknown;
}

interface ContentConfigItem {
  Component?: React.ComponentType<unknown>;
  arrowClassName?: string;
  arrowSize?: number;
  transitionDuration?: number;
}

interface ContentConfigMap {
  [key: string]: ContentConfigItem;
}

declare const contentConfig: ContentConfigMap;

interface CloseState {
  closeState?: 'close' | 'noRemind';
}

interface RemindCompProps {
  visible: boolean;
  type: RemindType;
  data: RemindData;
  targetRect: TargetRect;
  hideArrow?: boolean;
  onClosed?: () => void;
}

interface RemindMainProps {
  targetRect: TargetRect;
  data: RemindData;
  theme?: ThemeType;
  close?: () => void;
  noRemind?: () => void;
  checkTeaching?: () => void;
  type: RemindType;
  hideArrow?: boolean;
}

export function RemindComp(props: RemindCompProps): React.ReactElement | null {
  const { visible, type, data, targetRect, hideArrow, onClosed } = props;
  const theme = useTheme();
  const config = contentConfig[type];

  if (!config || !config.Component) {
    return null;
  }

  const arrowClassName = config.arrowClassName;
  const arrowSize = config.arrowSize;

  return (
    <PositionTooltip
      className={`remind-tooltip-wrapper ${theme}`}
      arrowClassName={`remind-arrow ${arrowClassName || ''} ${theme}`}
      targetRect={targetRect}
      visible={visible}
      arrowWidth={arrowSize}
      hideArrow={hideArrow}
      onClosed={onClosed}
      transitionDuration={config.transitionDuration}
    >
      <RemindContent type={type} data={data} />
    </PositionTooltip>
  );
}

export function RemindMain(props: RemindMainProps): React.ReactElement {
  const {
    targetRect,
    data,
    theme = 'teaching-light',
    close,
    noRemind,
    checkTeaching,
    type,
    hideArrow,
  } = props;

  const [visible, setVisible] = useState<boolean>(true);
  const [closeStateRef] = useState<CloseState>({});

  const handleClose = (): void => {
    closeStateRef.closeState = 'close';
    setVisible(false);
  };

  const handleNoRemind = (): void => {
    closeStateRef.closeState = 'noRemind';
    setVisible(false);
  };

  const handleClosed = (): void => {
    if (closeStateRef.closeState === 'close') {
      close?.();
    } else if (closeStateRef.closeState === 'noRemind') {
      noRemind?.();
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <RemindModalContext.Provider
        value={{
          close: handleClose,
          noRemind: handleNoRemind,
          checkTeaching,
        }}
      >
        <RemindComp
          type={type}
          data={data}
          visible={visible}
          hideArrow={hideArrow}
          targetRect={targetRect}
          onClosed={handleClosed}
        />
      </RemindModalContext.Provider>
    </ThemeContext.Provider>
  );
}