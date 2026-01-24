/**
 * Privacy Module
 * Handles document privacy settings and sharing functionality
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Radio, RadioGroup } from 'antd';
import { Icons } from './Icons';
import { CommunityShare } from './CommunityShare';
import { HSCore, HSApp } from './HSApp';
import { getString } from './i18n';

/** Document status enumeration */
enum DocumentStatus {
  Private = 0,
  Public = 1,
  Readonly = 2,
}

/** Privacy component props */
interface PrivacyProps {
  /** UI theme name */
  theme?: string;
  /** Header height in CSS units */
  headerHeight?: string;
  /** Whether menus align to right */
  menusRight?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Callback when data changes */
  onDataChange?: (key: string, value: unknown) => void;
  /** Current document status */
  documentStatus?: DocumentStatus;
  /** Owner user ID */
  userId?: string;
  /** Signal for state changes */
  signalChanged?: HSCore.Util.Signal<PrivacyState>;
  /** Callback when community sharing is triggered */
  onCommunitySharing?: () => void;
}

/** Privacy component state */
interface PrivacyState {
  /** Current document status */
  documentStatus?: DocumentStatus;
  /** Owner user ID */
  userId?: string;
  /** Whether dropdown is hovered */
  isHover: boolean;
  /** Loading state for public share page button */
  publicSharePageBtnLoading: boolean;
  /** Whether first login flow has loaded */
  firstLoginLoaded: boolean;
}

/** Document status menu item configuration */
interface DocumentStatusItem {
  /** Icon component */
  icon: React.ComponentType;
  /** Short text label */
  short_text: string;
  /** Full text label */
  text: string;
  /** CSS class name */
  className?: string;
  /** Description text */
  description?: string;
  /** Callback when status is selected */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Function to get submenu items */
  getSubItems?: (currentStatus: DocumentStatus) => SubMenuItem[] | null;
}

/** Submenu item configuration */
interface SubMenuItem {
  /** Display label */
  label: React.ReactNode;
  /** Unique key */
  key: string;
  /** Click handler */
  onClick: (link?: string) => void;
  /** Optional external link */
  link?: string;
}

/** Privacy data structure */
interface PrivacyData {
  /** Current document status */
  documentStatus?: DocumentStatus;
  /** Owner user ID */
  userId?: string;
  /** First login loaded flag */
  firstLoginLoaded?: boolean;
}

/** Plugin initialization parameters */
interface PrivacyPluginParams {
  /** UI theme */
  theme?: string;
  /** Header height */
  headerHeight?: string;
  /** Right-align menus */
  menusRight?: boolean;
}

/** Metadata change event data */
interface MetadataChangedEvent {
  /** Changed properties */
  data: Record<string, unknown>;
}

/** White label configuration */
interface WhiteLabelConfig {
  /** Whether to hide the feature */
  hide?: boolean;
  /** Description configuration */
  description?: {
    useful: boolean;
  };
  /** Footer configuration */
  footer?: {
    useful: boolean;
  };
  /** Menu items configuration */
  menus?: Array<{
    key: string;
    link?: string;
  }>;
}

/** White label share viewer URL config */
interface ShareViewerUrlConfig {
  /** Whether to default to public */
  defaultPublic?: boolean;
}

/**
 * Privacy Component
 * Displays document privacy controls and sharing options
 */
declare class PrivacyComponent extends React.Component<PrivacyProps, PrivacyState> {
  /** Dropdown DOM reference */
  private dropDownDom: HTMLElement | null;
  
  /** Design info DOM reference */
  private hsdesignInfoDom: HTMLElement | null;
  
  /** First print flag */
  private firstPrint: boolean;
  
  /** Map of document status to menu item configuration */
  private _documentStatusList: Map<DocumentStatus, DocumentStatusItem>;

  /**
   * Constructor
   * @param props - Component props
   */
  constructor(props: PrivacyProps);

  /**
   * Log user tracking event
   * @param event - Event information
   */
  private log(event: {
    id: string;
    description: string;
    triggerType?: string;
  }): void;

  /**
   * Switch document to public status
   */
  private _switchToPublic(): void;

  /**
   * Copy design link to clipboard
   */
  private _onCopyDesignLink(): void;

  /**
   * Handle sharing page button click
   */
  private _onSharingPageClick(): void;

  /**
   * Handle submit to AIDA
   */
  private _onSubmitAIDA(): void;

  /**
   * Handle publish to community click
   * @param link - Optional external link
   */
  private _onPublishToCommunityClick(link?: string): void;

  /**
   * Show share viewer loading modal
   */
  private toShareViewerLoading(): Promise<void>;

  /**
   * Component unmount cleanup
   */
  componentWillUnmount(): void;

  /**
   * Handle document click for closing dropdown
   * @param event - Mouse event
   */
  private documentClicked(event: MouseEvent): void;

  /**
   * Handle dropdown click
   * @param event - React mouse event
   */
  private onHandleClick(event: React.MouseEvent<HTMLElement>): void;

  /**
   * Handle mouse over
   */
  private onMouseOver(): void;

  /**
   * Handle mouse leave
   */
  private onMouseLeave(): void;

  /**
   * Handle status selection
   * @param status - Selected document status
   */
  private onSelect(status: DocumentStatus): void;

  /**
   * Render component
   */
  render(): React.ReactNode;
}

/**
 * Privacy Plugin
 * Manages document privacy settings and sharing workflows
 */
export declare class Privacy {
  /** Application instance */
  private readonly app: HSApp.App;
  
  /** Whether the plugin is disabled */
  private readonly disabled: boolean;
  
  /** Sign-in plugin reference */
  private readonly signInPlugin: unknown;
  
  /** Signal hook for event handling */
  private readonly SignalHook: HSCore.Util.SignalHook;
  
  /** Signal for state changes */
  readonly signalChanged: HSCore.Util.Signal<PrivacyData>;
  
  /** Current privacy data */
  private data: PrivacyData;
  
  /** Plugin parameters */
  private readonly _params?: PrivacyPluginParams;
  
  /** Whether community sharing is in progress */
  private isCommunitySharing: boolean;
  
  /** Status selection callback */
  onSelect: (status: DocumentStatus) => void;
  
  /** Data change callback */
  onDataChange: (key: string, value: unknown) => void;

  /**
   * Constructor
   * @param app - Application instance
   * @param plugins - Plugin map
   * @param disabled - Whether disabled
   * @param params - Plugin parameters
   */
  constructor(
    app: HSApp.App,
    plugins: Record<string, unknown>,
    disabled?: boolean,
    params?: PrivacyPluginParams
  );

  /**
   * Handle design metadata changes
   * @param event - Metadata changed event
   */
  private _onDesignMetadataChanged(event: MetadataChangedEvent): void;

  /**
   * Handle design opened event
   */
  private _onDesignOpened(): void;

  /**
   * Handle white label configuration changes
   */
  private _onWhitelabelChanged(): void;

  /**
   * Handle user sign out
   * @param event - Sign out event
   */
  private _onSignOut(event: unknown): void;

  /**
   * Handle user sign in
   * @param event - Sign in event with user data
   */
  private _onSignIn(event: { data: { uid: string } }): void;

  /**
   * Get React component for rendering
   * @returns Privacy component
   */
  getRenderItem(): React.ReactElement<PrivacyProps>;

  /**
   * Update component state
   * @param state - Partial state to update
   */
  setState(state: Partial<PrivacyState>): void;

  /**
   * Create or retrieve share container DOM element
   * @returns Container element or null
   */
  private createShareContainer(): HTMLElement | null;

  /**
   * Open community sharing modal
   */
  onCommunitySharing(): void;

  /**
   * Switch document to public status
   */
  switchToPublic(): void;

  /**
   * Handle share to community workflow
   */
  handleShareToCommunity(): void;
}