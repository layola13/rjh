import React, { Component, ReactNode, Fragment, ComponentType } from 'react';

export enum MotionStatus {
  STATUS_ADD = 'add',
  STATUS_KEEP = 'keep',
  STATUS_REMOVE = 'remove',
  STATUS_REMOVED = 'removed'
}

export interface KeyEntity {
  key: string | number;
  status: MotionStatus;
  [key: string]: any;
}

export interface MotionEventProps {
  key: string | number;
  [key: string]: any;
}

export interface CSSMotionListProps {
  keys: Array<string | number>;
  component?: ComponentType<any> | string;
  children: (props: any, ref: any) => ReactNode;
  onVisibleChanged?: (visible: boolean, info: { key: string | number }) => void;
  onAllRemoved?: () => void;
  motionName?: string;
  motionAppear?: boolean;
  motionEnter?: boolean;
  motionLeave?: boolean;
  motionLeaveImmediately?: boolean;
  motionDeadline?: number;
  removeOnLeave?: boolean;
  leavedClassName?: string;
  onAppearPrepare?: (element: HTMLElement) => void;
  onAppearStart?: (element: HTMLElement, event: Event) => void;
  onAppearActive?: (element: HTMLElement, event: Event) => void;
  onAppearEnd?: (element: HTMLElement, event: Event) => void;
  onEnterStart?: (element: HTMLElement, event: Event) => void;
  onEnterActive?: (element: HTMLElement, event: Event) => void;
  onEnterEnd?: (element: HTMLElement, event: Event) => void;
  onLeaveStart?: (element: HTMLElement, event: Event) => void;
  onLeaveActive?: (element: HTMLElement, event: Event) => void;
  onLeaveEnd?: (element: HTMLElement, event: Event) => void;
  [key: string]: any;
}

interface CSSMotionListState {
  keyEntities: KeyEntity[];
}

const MOTION_PROP_NAMES = [
  'eventProps',
  'visible',
  'children',
  'motionName',
  'motionAppear',
  'motionEnter',
  'motionLeave',
  'motionLeaveImmediately',
  'motionDeadline',
  'removeOnLeave',
  'leavedClassName',
  'onAppearPrepare',
  'onAppearStart',
  'onAppearActive',
  'onAppearEnd',
  'onEnterStart',
  'onEnterActive',
  'onEnterEnd',
  'onLeaveStart',
  'onLeaveActive',
  'onLeaveEnd'
];

export function parseKeys(keys: Array<string | number>): KeyEntity[] {
  return keys.map(key => ({
    key,
    status: MotionStatus.STATUS_ADD
  }));
}

export function diffKeys(prevEntities: KeyEntity[], nextEntities: KeyEntity[]): KeyEntity[] {
  const prevKeyMap = new Map(prevEntities.map(entity => [entity.key, entity]));
  const nextKeyMap = new Map(nextEntities.map(entity => [entity.key, entity]));
  const result: KeyEntity[] = [];

  nextEntities.forEach(entity => {
    const prevEntity = prevKeyMap.get(entity.key);
    if (prevEntity) {
      result.push({ ...prevEntity, status: MotionStatus.STATUS_KEEP });
    } else {
      result.push({ ...entity, status: MotionStatus.STATUS_ADD });
    }
  });

  prevEntities.forEach(entity => {
    if (!nextKeyMap.has(entity.key) && entity.status !== MotionStatus.STATUS_REMOVED) {
      result.push({ ...entity, status: MotionStatus.STATUS_REMOVE });
    }
  });

  return result;
}

export function genCSSMotionList(
  supportTransition: boolean,
  CSSMotionComponent: ComponentType<any> = Fragment
): ComponentType<CSSMotionListProps> {
  class CSSMotionList extends Component<CSSMotionListProps, CSSMotionListState> {
    static defaultProps = {
      component: 'div'
    };

    state: CSSMotionListState = {
      keyEntities: []
    };

    static getDerivedStateFromProps(
      props: CSSMotionListProps,
      state: CSSMotionListState
    ): Partial<CSSMotionListState> | null {
      const { keys } = props;
      const { keyEntities } = state;
      const parsedKeys = parseKeys(keys);

      return {
        keyEntities: diffKeys(keyEntities, parsedKeys).filter(entity => {
          const prevEntity = keyEntities.find(prev => prev.key === entity.key);
          return (
            !prevEntity ||
            prevEntity.status !== MotionStatus.STATUS_REMOVED ||
            entity.status !== MotionStatus.STATUS_REMOVE
          );
        })
      };
    }

    removeKey = (key: string | number): void => {
      this.setState(
        prevState => ({
          keyEntities: prevState.keyEntities.map(entity =>
            entity.key !== key
              ? entity
              : { ...entity, status: MotionStatus.STATUS_REMOVED }
          )
        }),
        () => {
          const remainingEntities = this.state.keyEntities.filter(
            entity => entity.status !== MotionStatus.STATUS_REMOVED
          );

          if (remainingEntities.length === 0 && this.props.onAllRemoved) {
            this.props.onAllRemoved();
          }
        }
      );
    };

    render(): ReactNode {
      const { keyEntities } = this.state;
      const {
        component,
        children,
        onVisibleChanged,
        onAllRemoved,
        ...restProps
      } = this.props;

      const ContainerComponent = component || Fragment;
      const motionProps: Record<string, any> = {};

      MOTION_PROP_NAMES.forEach(propName => {
        motionProps[propName] = restProps[propName];
        delete restProps[propName];
      });

      delete restProps.keys;

      return React.createElement(
        ContainerComponent,
        restProps,
        keyEntities.map((entity, index) => {
          const { status, ...eventProps } = entity;
          const visible =
            status === MotionStatus.STATUS_ADD ||
            status === MotionStatus.STATUS_KEEP;

          return React.createElement(
            CSSMotionComponent,
            {
              ...motionProps,
              key: eventProps.key,
              visible,
              eventProps,
              onVisibleChanged: (isVisible: boolean) => {
                onVisibleChanged?.(isVisible, { key: eventProps.key });
                if (!isVisible) {
                  this.removeKey(eventProps.key);
                }
              }
            },
            (motionEventProps: any, ref: any) =>
              children({ ...motionEventProps, index }, ref)
          );
        })
      );
    }
  }

  return CSSMotionList;
}

const supportTransition = true;

export default genCSSMotionList(supportTransition);