import React, { Component, ReactElement, ReactNode, ComponentType } from 'react';
import { getChildMapping, mergeChildMappings } from './childMapping';

interface TransitionGroupProps {
  children?: ReactNode;
  component?: string | ComponentType<any>;
  childFactory?: (child: ReactElement) => ReactElement;
  transitionLeave?: boolean;
  transitionName?: string;
  transitionAppear?: boolean;
  transitionEnter?: boolean;
  transitionLeaveTimeout?: number;
  transitionEnterTimeout?: number;
  transitionAppearTimeout?: number;
  [key: string]: any;
}

interface TransitionGroupState {
  children: Record<string, ReactElement>;
}

interface TransitionComponent {
  componentWillAppear?: (callback: () => void) => void;
  componentDidAppear?: () => void;
  componentWillEnter?: (callback: () => void) => void;
  componentDidEnter?: () => void;
  componentWillLeave?: (callback: () => void) => void;
  componentDidLeave?: () => void;
}

class TransitionGroup extends Component<TransitionGroupProps, TransitionGroupState> {
  static displayName = 'TransitionGroup';

  static defaultProps = {
    component: 'span',
    childFactory: (child: ReactElement) => child,
  };

  private currentlyTransitioningKeys: Record<string, boolean> = {};
  private keysToEnter: string[] = [];
  private keysToLeave: string[] = [];
  private childRefs: Record<string, TransitionComponent | null> = Object.create(null);

  constructor(props: TransitionGroupProps, context: any) {
    super(props, context);
    this.state = {
      children: getChildMapping(props.children),
    };
  }

  componentWillMount(): void {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  }

  componentDidMount(): void {
    const children = this.state.children;
    for (const key in children) {
      if (children[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  }

  componentWillReceiveProps(nextProps: TransitionGroupProps): void {
    const nextChildMapping = getChildMapping(nextProps.children);
    const prevChildMapping = this.state.children;

    this.setState({
      children: mergeChildMappings(prevChildMapping, nextChildMapping),
    });

    for (const key in nextChildMapping) {
      const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (const key in prevChildMapping) {
      const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
      if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
        this.keysToLeave.push(key);
      }
    }
  }

  componentDidUpdate(): void {
    const keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach((key) => this.performEnter(key, this.childRefs[key]));

    const keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach((key) => this.performLeave(key, this.childRefs[key]));
  }

  performAppear = (key: string, component: TransitionComponent | null): void => {
    this.currentlyTransitioningKeys[key] = true;

    if (component?.componentWillAppear) {
      component.componentWillAppear(this._handleDoneAppearing.bind(this, key, component));
    } else {
      this._handleDoneAppearing(key, component);
    }
  };

  private _handleDoneAppearing = (key: string, component: TransitionComponent | null): void => {
    component?.componentDidAppear?.();
    delete this.currentlyTransitioningKeys[key];

    const currentChildMapping = getChildMapping(this.props.children);
    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      this.performLeave(key, component);
    }
  };

  performEnter = (key: string, component: TransitionComponent | null): void => {
    this.currentlyTransitioningKeys[key] = true;

    if (component?.componentWillEnter) {
      component.componentWillEnter(this._handleDoneEntering.bind(this, key, component));
    } else {
      this._handleDoneEntering(key, component);
    }
  };

  private _handleDoneEntering = (key: string, component: TransitionComponent | null): void => {
    component?.componentDidEnter?.();
    delete this.currentlyTransitioningKeys[key];

    const currentChildMapping = getChildMapping(this.props.children);
    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      this.performLeave(key, component);
    }
  };

  performLeave = (key: string, component: TransitionComponent | null): void => {
    this.currentlyTransitioningKeys[key] = true;

    if (component?.componentWillLeave) {
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key, component));
    } else {
      this._handleDoneLeaving(key, component);
    }
  };

  private _handleDoneLeaving = (key: string, component: TransitionComponent | null): void => {
    component?.componentDidLeave?.();
    delete this.currentlyTransitioningKeys[key];

    const currentChildMapping = getChildMapping(this.props.children);
    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
      this.keysToEnter.push(key);
    } else {
      this.setState((prevState) => {
        const newChildren = { ...prevState.children };
        delete newChildren[key];
        return { children: newChildren };
      });
    }
  };

  render(): ReactElement {
    const childrenToRender: ReactElement[] = [];

    for (const key in this.state.children) {
      const child = this.state.children[key];
      if (child) {
        const isValidRef = typeof child.ref !== 'string';
        const clonedChild = this.props.childFactory!(child);
        
        let ref = (component: TransitionComponent | null) => {
          this.childRefs[key] = component;
        };

        if (clonedChild === child && isValidRef) {
          ref = this.composeRefs(child.ref, ref);
        }

        childrenToRender.push(
          React.cloneElement(clonedChild, {
            key,
            ref,
          })
        );
      }
    }

    const props = { ...this.props };
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return React.createElement(this.props.component!, props, childrenToRender);
  }

  private composeRefs(originalRef: any, newRef: (component: TransitionComponent | null) => void): (component: TransitionComponent | null) => void {
    return (component: TransitionComponent | null) => {
      if (typeof originalRef === 'function') {
        originalRef(component);
      }
      newRef(component);
    };
  }
}

export default TransitionGroup;