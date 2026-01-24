/**
 * Vue render function module for WeChat Mini Program QR code hover component
 * @module module_fn
 * @originalId fn
 */

import { VNode, CreateElement, RenderContext } from 'vue';
import { DirectiveOptions } from 'vue/types/options';

/**
 * Component props interface
 */
interface ComponentProps {
  /** Whether the application is running in app mode */
  isApp: boolean;
  /** Whether the device is an Apple device */
  isAppleDevice: boolean;
  /** Hover state */
  hover: boolean;
}

/**
 * Component instance interface with Vue i18n support
 */
interface ComponentInstance {
  /** Application mode flag */
  isApp: boolean;
  /** Apple device detection flag */
  isAppleDevice: boolean;
  /** Internationalization translate function */
  $t: (key: string) => string;
  /** Vue internal render helper for text nodes */
  _v: (text: string) => VNode;
  /** Vue internal render helper for toString conversion */
  _s: (value: any) => string;
}

/**
 * Directive binding interface
 */
interface DirectiveBinding {
  /** Directive name */
  name: string;
  /** Raw directive name with modifiers */
  rawName: string;
  /** Directive bound value */
  value: boolean;
  /** Original expression string */
  expression: string;
}

/**
 * Style object for hover state
 */
interface HoverStyle {
  color: string;
}

/**
 * Image attributes interface
 */
interface ImageAttributes {
  /** Image source URL */
  src: string;
  /** Image width in pixels */
  width: string;
  /** Image height in pixels */
  height: string;
}

/**
 * Render function for WeChat Mini Program QR code display component
 * Shows a hoverable element that displays a QR code for the WeChat Mini Program
 * 
 * @param this - Component instance context
 * @param createElement - Vue's createElement function
 * @returns Virtual DOM node array
 */
declare function renderMiniProgramQRCode(
  this: ComponentInstance,
  createElement: CreateElement
): VNode[];

/**
 * Main render function type definition
 * @param componentInstance - The Vue component instance
 * @returns Array of VNodes representing the rendered component
 */
type RenderFunction = (componentInstance: ComponentInstance) => VNode[];

/**
 * QR code image URL constant
 */
declare const QR_CODE_IMAGE_URL = "https://webcc-pro.obs.cn-east-3.myhuaweicloud.com:443/imge/mpcode.jpg";

/**
 * QR code dimensions constant
 */
declare const QR_CODE_SIZE = "150";

/**
 * Hover color constant for active state
 */
declare const HOVER_COLOR_ACTIVE = "#da4c3e";

/**
 * Hover color constant for inactive state
 */
declare const HOVER_COLOR_INACTIVE = "#666";

export {
  ComponentProps,
  ComponentInstance,
  DirectiveBinding,
  HoverStyle,
  ImageAttributes,
  RenderFunction,
  renderMiniProgramQRCode,
  QR_CODE_IMAGE_URL,
  QR_CODE_SIZE,
  HOVER_COLOR_ACTIVE,
  HOVER_COLOR_INACTIVE
};