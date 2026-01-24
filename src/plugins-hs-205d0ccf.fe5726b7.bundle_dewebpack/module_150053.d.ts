import React from 'react';

/**
 * Props for the RadioToolbarItem component
 */
export interface RadioToolbarItemProps {
  /** Whether the toolbar item is visible */
  visible: boolean;
  /** Whether the toolbar item is enabled/interactive */
  enable: boolean;
  /** Display label text for the item */
  label: string;
  /** Path to the icon image (SVG) */
  icon: string;
  /** Whether the radio button is currently checked */
  isChecked: boolean;
  /** Tooltip text to display on hover */
  tooltip: string;
  /** Radio button group identifier */
  groupId: string;
  /** Click handler callback */
  onclick: () => void;
  /** Unique path identifier for the toolbar item */
  path: string;
  /** Optional signal object for external state changes */
  signalChanged?: HSCore.Util.Signal<{ isChecked: boolean }>;
  /** Keyboard shortcut (string or hotkey object) */
  hotkey?: string | HSCore.Util.HotkeyConfig;
}

/**
 * Internal state for the RadioToolbarItem component
 */
export interface RadioToolbarItemState {
  /** Whether the mouse is currently hovering over the item */
  hover: boolean;
  /** Current checked state of the radio button */
  isChecked: boolean;
}

/**
 * A radio button toolbar item component with icon, label, and hotkey support.
 * Supports external state synchronization via signals and provides hover feedback.
 */
export default class RadioToolbarItem extends React.Component<
  RadioToolbarItemProps,
  RadioToolbarItemState
> {
  /** Reference to the icon image element for SVG injection */
  private _refIconImage: HTMLImageElement | null;
  /** Signal hook for listening to external state changes */
  private _signalHook: HSCore.Util.SignalHook;

  constructor(props: RadioToolbarItemProps);

  /**
   * Checks if the toolbar item is currently enabled
   * @returns True if the item is enabled
   */
  private _isEnabled(): boolean;

  /**
   * Handles mouse enter event - sets hover state to true if enabled
   */
  private _onMouseEnter(): void;

  /**
   * Handles mouse leave event - sets hover state to false if enabled
   */
  private _onMouseLeave(): void;

  /**
   * Handles click event - stops propagation and triggers onclick callback if enabled
   * @param event - The mouse click event
   */
  private _onClick(event: React.MouseEvent): void;

  /**
   * Lifecycle: Injects SVG icon after component mounts
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Cleans up signal listeners before unmount
   */
  componentWillUnmount(): void;

  /**
   * Renders the radio toolbar item with icon, label, and hotkey display
   */
  render(): React.ReactElement;
}

/**
 * Global namespace extensions
 */
declare global {
  namespace HSCore {
    namespace Util {
      /**
       * Signal hook utility for managing event subscriptions
       */
      class SignalHook {
        constructor(component: React.Component);
        listen<T>(signal: Signal<T>, callback: (event: { data: T }) => void): void;
        unlistenAll(): void;
      }

      /**
       * Generic signal object for pub/sub communication
       */
      interface Signal<T> {
        // Signal implementation details
      }

      /**
       * Hotkey configuration object
       */
      interface HotkeyConfig {
        // Hotkey configuration properties
      }
    }
  }

  namespace HSApp {
    namespace Util {
      namespace Hotkey {
        /**
         * Converts a hotkey definition to a human-readable display string
         * @param hotkey - Hotkey string or configuration object
         * @returns Formatted hotkey display string
         */
        function getHotkeyDisplayString(
          hotkey?: string | HSCore.Util.HotkeyConfig
        ): string;
      }
    }
  }

  namespace ResourceManager {
    /**
     * Injects SVG content into an image element
     * @param element - The image element to inject SVG into
     */
    function injectSVGImage(element: HTMLImageElement | null): void;
  }
}