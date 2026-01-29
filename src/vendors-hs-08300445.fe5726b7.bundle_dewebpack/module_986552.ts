import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef, ReactElement, RefObject } from 'react';
import { alignElement, alignPoint } from './alignUtils';
import { addEventListener } from './eventUtils';
import { isElementVisible } from './domUtils';
import { isDeepEqual } from './objectUtils';
import { useBuffer } from './useBuffer';
import { useLayoutEffect } from './useLayoutEffect';
import { composeRef } from './refUtils';
import { restoreFocus, isSamePoint, monitorResize } from './monitorUtils';

interface Point {
  pageX: number;
  pageY: number;
}

interface AlignConfig {
  points?: string[];
  offset?: number[];
  targetOffset?: number[];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
}

interface AlignResult {
  points: string[];
  offset: number[];
  targetOffset: number[];
  overflow: {
    adjustX: boolean;
    adjustY: boolean;
  };
}

type TargetType = (() => HTMLElement | null) | Point | null;

interface AlignProps {
  children: ReactElement;
  disabled?: boolean;
  target: TargetType;
  align?: AlignConfig;
  onAlign?: (source: HTMLElement, result: AlignResult) => void;
  monitorWindowResize?: boolean;
  monitorBufferTime?: number;
}

interface AlignHandle {
  forceAlign: () => boolean;
}

interface CachedData {
  element?: HTMLElement | null;
  point?: Point | null;
  align?: AlignConfig;
}

interface AlignState {
  disabled?: boolean;
  target: TargetType;
  align?: AlignConfig;
  onAlign?: (source: HTMLElement, result: AlignResult) => void;
}

function getTargetElement(target: TargetType): HTMLElement | null {
  return typeof target !== 'function' ? null : target();
}

function getTargetPoint(target: TargetType): Point | null {
  return typeof target === 'object' && target ? target : null;
}

const Align = forwardRef<AlignHandle, AlignProps>((props, ref) => {
  const {
    children,
    disabled,
    target,
    align,
    onAlign,
    monitorWindowResize,
    monitorBufferTime = 0
  } = props;

  const cacheRef = useRef<CachedData>({});
  const nodeRef = useRef<HTMLElement>();
  const childNode = React.Children.only(children);
  const stateRef = useRef<AlignState>({
    disabled,
    target,
    align,
    onAlign
  });

  stateRef.current.disabled = disabled;
  stateRef.current.target = target;
  stateRef.current.align = align;
  stateRef.current.onAlign = onAlign;

  const [triggerAlign, cancelAlign] = useBuffer(() => {
    const state = stateRef.current;
    const currentDisabled = state.disabled;
    const currentTarget = state.target;
    const currentAlign = state.align;
    const currentOnAlign = state.onAlign;
    const sourceNode = nodeRef.current;

    if (!currentDisabled && currentTarget && sourceNode) {
      let alignResult: AlignResult | null = null;
      const targetElement = getTargetElement(currentTarget);
      const targetPoint = getTargetPoint(currentTarget);

      cacheRef.current.element = targetElement;
      cacheRef.current.point = targetPoint;
      cacheRef.current.align = currentAlign;

      const activeElement = document.activeElement;

      if (targetElement && isElementVisible(targetElement)) {
        alignResult = alignElement(sourceNode, targetElement, currentAlign);
      } else if (targetPoint) {
        alignResult = alignPoint(sourceNode, targetPoint, currentAlign);
      }

      restoreFocus(activeElement, sourceNode);

      if (currentOnAlign && alignResult) {
        currentOnAlign(sourceNode, alignResult);
      }

      return true;
    }

    return false;
  }, monitorBufferTime);

  const [targetElement, setTargetElement] = useState<HTMLElement | null>();
  const [targetPoint, setTargetPoint] = useState<Point | null>();

  useLayoutEffect(() => {
    setTargetElement(getTargetElement(target));
    setTargetPoint(getTargetPoint(target));
  });

  useEffect(() => {
    if (
      cacheRef.current.element !== targetElement ||
      !isSamePoint(cacheRef.current.point, targetPoint) ||
      !isDeepEqual(cacheRef.current.align, align)
    ) {
      triggerAlign();
    }
  });

  useEffect(() => {
    return monitorResize(nodeRef.current, triggerAlign);
  }, [nodeRef.current]);

  useEffect(() => {
    return monitorResize(targetElement, triggerAlign);
  }, [targetElement]);

  useEffect(() => {
    if (disabled) {
      cancelAlign();
    } else {
      triggerAlign();
    }
  }, [disabled]);

  useEffect(() => {
    if (monitorWindowResize) {
      return addEventListener(window, 'resize', triggerAlign).remove;
    }
  }, [monitorWindowResize]);

  useEffect(() => {
    return () => {
      cancelAlign();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    forceAlign: () => triggerAlign(true)
  }));

  let clonedChild = childNode;
  if (React.isValidElement(childNode)) {
    clonedChild = React.cloneElement(childNode, {
      ref: composeRef(childNode.ref, nodeRef)
    } as any);
  }

  return clonedChild;
});

Align.displayName = 'Align';

export default Align;