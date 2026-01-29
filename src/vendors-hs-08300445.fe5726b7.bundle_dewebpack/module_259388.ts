import React, { useRef, useCallback, useContext, forwardRef, isValidElement, cloneElement, ReactElement, CSSProperties } from 'react';
import classNames from 'classnames';
import { fillRef, supportRef, getNodeRef } from './ref-utils';
import { Context } from './context';
import { useStatus } from './hooks/useStatus';
import { findDOMNode } from './dom-utils';
import DomWrapper from './DomWrapper';

export const STATUS_NONE = 'none';
export const STATUS_APPEAR = 'appear';
export const STATUS_ENTER = 'enter';
export const STATUS_LEAVE = 'leave';

export const STEP_NONE = 'none';
export const STEP_PREPARE = 'prepare';
export const STEP_START = 'start';
export const STEP_ACTIVE = 'active';
export const STEP_ACTIVATED = 'end';

type MotionStatus = typeof STATUS_NONE | typeof STATUS_APPEAR | typeof STATUS_ENTER | typeof STATUS_LEAVE;
type StepStatus = typeof STEP_NONE | typeof STEP_PREPARE | typeof STEP_START | typeof STEP_ACTIVE | typeof STEP_ACTIVATED;

export function isActive(step: StepStatus): boolean {
  return step === STEP_ACTIVE || step === STEP_ACTIVATED;
}

export function getTransitionName(motionName: string | Record<string, string> | undefined, status: string): string | undefined {
  if (!motionName) return undefined;
  
  if (typeof motionName === 'string') {
    return `${motionName}-${status}`;
  }
  
  return motionName[status];
}

export const supportTransition = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement &&
  ('transition' in document.createElement('div').style ||
    'webkitTransition' in document.createElement('div').style)
);

interface MotionEventProps {
  onAppearStart?: (element: HTMLElement) => CSSProperties | void;
  onAppearActive?: (element: HTMLElement) => CSSProperties | void;
  onAppearEnd?: (element: HTMLElement) => boolean | void;
  onEnterStart?: (element: HTMLElement) => CSSProperties | void;
  onEnterActive?: (element: HTMLElement) => CSSProperties | void;
  onEnterEnd?: (element: HTMLElement) => boolean | void;
  onLeaveStart?: (element: HTMLElement) => CSSProperties | void;
  onLeaveActive?: (element: HTMLElement) => CSSProperties | void;
  onLeaveEnd?: (element: HTMLElement) => boolean | void;
}

interface CSSMotionProps extends MotionEventProps {
  visible?: boolean;
  removeOnLeave?: boolean;
  forceRender?: boolean;
  motionName?: string | Record<string, string>;
  leavedClassName?: string;
  eventProps?: Record<string, unknown>;
  children?: (props: Record<string, unknown> & { className?: string; style?: CSSProperties }, ref: React.Ref<unknown>) => ReactElement;
}

interface MotionConfig {
  transitionSupport?: boolean;
  motion?: boolean;
}

export function genCSSMotion(config: boolean | MotionConfig): React.ForwardRefExoticComponent<CSSMotionProps & React.RefAttributes<unknown>> {
  const transitionSupport = typeof config === 'object' ? config.transitionSupport : config;

  const CSSMotion = forwardRef<unknown, CSSMotionProps>((props, ref) => {
    const {
      visible = true,
      removeOnLeave = true,
      forceRender,
      children,
      motionName,
      leavedClassName,
      eventProps,
      ...restProps
    } = props;

    const contextMotion = useContext(Context).motion;
    const shouldMotion = Boolean(motionName && transitionSupport && contextMotion !== false);

    const elementRef = useRef<HTMLElement | null>(null);
    const wrapperRef = useRef<unknown>(null);

    const getElement = useCallback((): HTMLElement | null => {
      try {
        if (elementRef.current instanceof HTMLElement) {
          return elementRef.current;
        }
        return findDOMNode(wrapperRef.current);
      } catch (error) {
        return null;
      }
    }, []);

    const [status, step, style, isMotionActive] = useStatus(
      shouldMotion,
      visible,
      getElement,
      props
    );

    const statusActiveRef = useRef(isMotionActive);
    if (isMotionActive) {
      statusActiveRef.current = true;
    }

    const setNodeRef = useCallback(
      (node: unknown) => {
        elementRef.current = node as HTMLElement;
        fillRef(ref, node);
      },
      [ref]
    );

    const childProps: Record<string, unknown> = {
      ...eventProps,
      visible
    };

    let motionChildren: ReactElement | null = null;

    if (children) {
      if (status === STATUS_NONE) {
        if (isMotionActive) {
          motionChildren = children(childProps, setNodeRef);
        } else if (!removeOnLeave && statusActiveRef.current && leavedClassName) {
          motionChildren = children(
            {
              ...childProps,
              className: leavedClassName
            },
            setNodeRef
          );
        } else if (forceRender || (!removeOnLeave && !leavedClassName)) {
          motionChildren = children(
            {
              ...childProps,
              style: { display: 'none' }
            },
            setNodeRef
          );
        } else {
          motionChildren = null;
        }
      } else {
        let statusStep: string | undefined;
        
        if (step === STEP_PREPARE) {
          statusStep = 'prepare';
        } else if (isActive(step)) {
          statusStep = 'active';
        } else if (step === STEP_START) {
          statusStep = 'start';
        }

        const motionCls = getTransitionName(motionName, `${status}-${statusStep}`);

        motionChildren = children(
          {
            ...childProps,
            className: classNames(
              getTransitionName(motionName, status),
              {
                [motionCls as string]: motionCls && statusStep
              },
              typeof motionName === 'string' ? motionName : undefined
            ),
            style
          },
          setNodeRef
        );
      }
    } else {
      motionChildren = null;
    }

    if (isValidElement(motionChildren) && supportRef(motionChildren)) {
      if (!getNodeRef(motionChildren)) {
        motionChildren = cloneElement(motionChildren, {
          ref: setNodeRef
        });
      }
    }

    return (
      <DomWrapper ref={wrapperRef}>
        {motionChildren}
      </DomWrapper>
    );
  });

  CSSMotion.displayName = 'CSSMotion';

  return CSSMotion;
}

const CSSMotionComponent = genCSSMotion(supportTransition);

export default CSSMotionComponent;