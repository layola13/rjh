import React, { Component, createRef, RefObject } from 'react';
import raf from 'raf';
import { supportRef, composeRef } from '../_util/ref';
import { cloneElement } from '../_util/reactNode';
import { ConfigConsumer, ConfigContext } from '../config-provider';

interface WaveProps {
  insertExtraNode?: boolean;
  children?: React.ReactElement;
}

interface WaveContext {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

interface CspConfig {
  nonce?: string;
}

interface AnimationInstance {
  cancel: () => void;
}

let styleForPseudo: HTMLStyleElement | undefined;

function isHidden(element: HTMLElement | null): boolean {
  return !element || element.offsetParent === null || element.hidden;
}

class Wave extends Component<WaveProps> {
  static contextType = ConfigContext;
  
  declare context: WaveContext;
  
  private containerRef: RefObject<HTMLElement> = createRef();
  private animationStart: boolean = false;
  private destroyed: boolean = false;
  private extraNode?: HTMLDivElement;
  private csp?: CspConfig;
  private instance?: AnimationInstance;
  private clickWaveTimeoutId?: number;
  private animationStartId?: number;

  componentDidMount(): void {
    const node = this.containerRef.current;
    if (node && node.nodeType === 1) {
      this.instance = this.bindAnimationEvent(node);
    }
  }

  componentWillUnmount(): void {
    if (this.instance) {
      this.instance.cancel();
    }
    if (this.clickWaveTimeoutId) {
      clearTimeout(this.clickWaveTimeoutId);
    }
    this.destroyed = true;
  }

  private onClick = (node: HTMLElement, color: string): void => {
    if (!node || isHidden(node) || node.className.indexOf('-leave') >= 0) {
      return;
    }

    const { insertExtraNode } = this.props;
    this.extraNode = document.createElement('div');
    const extraNode = this.extraNode;
    const { getPrefixCls } = this.context;
    
    extraNode.className = `${getPrefixCls('')}-click-animating-node`;

    const attributeName = this.getAttributeName();
    node.setAttribute(attributeName, 'true');

    if (!styleForPseudo) {
      styleForPseudo = document.createElement('style');
    }

    const isWhiteOrTransparent = 
      !color ||
      color === '#ffffff' ||
      color === 'rgb(255, 255, 255)' ||
      color === 'transparent' ||
      /rgba\((?:\d*, ){3}0\)/.test(color);

    const isGrayscale = (() => {
      const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
      return match && match[1] && match[2] && match[3] && 
             match[1] === match[2] && match[2] === match[3];
    })();

    if (!isWhiteOrTransparent && !isGrayscale) {
      if (this.csp?.nonce) {
        styleForPseudo.nonce = this.csp.nonce;
      }
      extraNode.style.borderColor = color;
      const prefixCls = getPrefixCls('');
      styleForPseudo.innerHTML = `
        [${prefixCls}-click-animating-without-extra-node='true']::after, .${prefixCls}-click-animating-node {
          --antd-wave-shadow-color: ${color};
        }`;
      
      if (!document.body.contains(styleForPseudo)) {
        document.body.appendChild(styleForPseudo);
      }
    }

    if (insertExtraNode) {
      node.appendChild(extraNode);
    }

    ['transition', 'animation'].forEach((eventType) => {
      node.addEventListener(`${eventType}start`, this.onTransitionStart);
      node.addEventListener(`${eventType}end`, this.onTransitionEnd);
    });
  };

  private onTransitionStart = (event: AnimationEvent | TransitionEvent): void => {
    if (this.destroyed) {
      return;
    }

    const node = this.containerRef.current;
    if (event && event.target === node && !this.animationStart) {
      this.resetEffect(node);
    }
  };

  private onTransitionEnd = (event: AnimationEvent): void => {
    if (event && event.animationName === 'fadeEffect') {
      this.resetEffect(event.target as HTMLElement);
    }
  };

  private bindAnimationEvent = (node: HTMLElement): AnimationInstance | undefined => {
    if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
      return undefined;
    }

    const onClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || isHidden(target)) {
        return;
      }

      this.resetEffect(node);

      const computedStyle = getComputedStyle(node);
      const waveColor = 
        computedStyle.getPropertyValue('border-top-color') ||
        computedStyle.getPropertyValue('border-color') ||
        computedStyle.getPropertyValue('background-color');

      this.clickWaveTimeoutId = window.setTimeout(() => {
        this.onClick(node, waveColor);
      }, 0);

      raf.cancel(this.animationStartId!);
      this.animationStart = true;
      this.animationStartId = raf(() => {
        this.animationStart = false;
      }, 10);
    };

    node.addEventListener('click', onClick, true);

    return {
      cancel: () => {
        node.removeEventListener('click', onClick, true);
      },
    };
  };

  private getAttributeName(): string {
    const { getPrefixCls } = this.context;
    const { insertExtraNode } = this.props;
    const prefixCls = getPrefixCls('');
    return `${prefixCls}${insertExtraNode ? '-click-animating' : '-click-animating-without-extra-node'}`;
  }

  private resetEffect(node: HTMLElement | null): void {
    if (!node || node === this.extraNode || !(node instanceof Element)) {
      return;
    }

    const { insertExtraNode } = this.props;
    const attributeName = this.getAttributeName();
    
    node.setAttribute(attributeName, 'false');

    if (styleForPseudo) {
      styleForPseudo.innerHTML = '';
    }

    if (insertExtraNode && this.extraNode && node.contains(this.extraNode)) {
      node.removeChild(this.extraNode);
    }

    ['transition', 'animation'].forEach((eventType) => {
      node.removeEventListener(`${eventType}start`, this.onTransitionStart);
      node.removeEventListener(`${eventType}end`, this.onTransitionEnd);
    });
  }

  private renderWave = (config: { csp?: CspConfig }): React.ReactNode => {
    const { csp } = config;
    const { children } = this.props;
    
    this.csp = csp;

    if (!React.isValidElement(children)) {
      return children;
    }

    let ref = this.containerRef;
    if (supportRef(children)) {
      ref = composeRef((children as any).ref, this.containerRef) as RefObject<HTMLElement>;
    }

    return cloneElement(children, { ref });
  };

  render(): React.ReactNode {
    return <ConfigConsumer>{this.renderWave}</ConfigConsumer>;
  }
}

export default Wave;