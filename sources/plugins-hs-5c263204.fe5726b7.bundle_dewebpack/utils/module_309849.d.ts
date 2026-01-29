/**
 * EZHome Feedback Plugin for FloorPlan
 * Provides feedback functionality including toolbar integration, feedback forms, and AliXiaoMi support
 */

import { IPlugin, PluginDependency } from './IPlugin';
import { CommonUIPlugin } from './CommonUIPlugin';
import { PersistencePlugin } from './PersistencePlugin';
import { ToolbarPlugin } from './ToolbarPlugin';
import { PageHeaderPlugin } from './PageHeaderPlugin';
import { FeedbackV2Plugin } from './FeedbackV2Plugin';
import { HSApp, HSCore, HSFPConstants, ResourceManager } from './HSApp';
import { FeedbackForm } from './FeedbackForm';
import { FeedbackEntry } from './FeedbackEntry';
import { AliXiaoMi } from './AliXiaoMi';

/**
 * Plugin dependency map interface
 */
interface PluginDependencyMap {
  [HSFPConstants.PluginType.CommonUI]: CommonUIPlugin;
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.PageHeader]: PageHeaderPlugin;
  [HSFPConstants.PluginType.Feedback]: FeedbackV2Plugin;
  'hsw.plugin.persistence.Plugin': PersistencePlugin;
  'hsw.brand.ezhome.firstlogin.Plugin': IPlugin;
}

/**
 * Feedback style configuration
 */
interface FeedbackStyleConfig {
  /** Whether to use black theme */
  isBlack: boolean;
}

/**
 * Feedback entry display options
 */
interface FeedbackEntryOptions {
  /** Style configuration */
  style: FeedbackStyleConfig;
  /** Module identifier (e.g., 'render', 'SparkPicEnv') */
  module: string;
  /** Whether to log the feedback action */
  isLog: boolean;
}

/**
 * Environment change event data
 */
interface EnvironmentChangeEventData {
  /** New environment ID */
  newEnvironmentId: string;
  /** Previous environment ID */
  oldEnvironmentId: string;
}

/**
 * Environment activation event
 */
interface EnvironmentActivationEvent {
  /** Event data payload */
  data: EnvironmentChangeEventData;
}

/**
 * Popup window configuration
 */
interface PopupWindowConfig {
  /** Window identifier */
  windowname: string;
  /** Window title */
  title: string;
  /** React content element */
  contents: React.ReactElement;
  /** Window width in pixels */
  width: number;
  /** Submit callback */
  submitcall: () => void;
  /** Cancel callback */
  cancelcall: () => void;
}

/**
 * User tracking click ratio data
 */
interface ClickRatioData {
  /** Element ID */
  id: string;
  /** Display name */
  name: string;
}

/**
 * User tracking log parameters
 */
interface UserTrackLogParams {
  /** Action description */
  description: string;
  /** Active section name */
  activeSectionName: string;
  /** Active section enum */
  activeSection: string;
  /** Click ratio tracking data */
  clicksRatio: ClickRatioData;
}

/**
 * URL query string parameters
 */
interface QueryStringParams {
  /** Environment identifier */
  env?: string;
  /** Enable XiaoMi feature flag */
  enableXiaoMi?: string;
}

/**
 * EZHome Feedback Plugin
 * Manages feedback collection, display, and submission across different environments
 */
declare class EZHomeFeedbackPlugin extends IPlugin {
  /** Common UI plugin instance */
  private commonUI: CommonUIPlugin | undefined;

  /** Application instance */
  private app: HSApp.App | undefined;

  /** Currently active popup window */
  private activeWindow: React.Component | null | undefined;

  /** Local storage handler */
  private _localStorage: HSApp.Util.Storage | undefined;

  /** Persistence plugin instance */
  private _persistencePlugin: PersistencePlugin | undefined;

  /** Toolbar plugin instance */
  private _toolbarPlugin: ToolbarPlugin | undefined;

  /** Page header plugin instance */
  private _pageheaderPlugin: PageHeaderPlugin | undefined;

  /** Feedback V2 plugin instance */
  private _feedbackV2Plugin: FeedbackV2Plugin | undefined;

  /** AliXiaoMi integration instance */
  private _aliXiaoMi: AliXiaoMi | undefined;

  /** Feedback entry React component instance */
  private FeedBackEntry: FeedbackEntry | undefined;

  /**
   * Plugin activation lifecycle hook
   * @param pluginManager - Plugin manager instance
   * @param dependencies - Map of loaded plugin dependencies
   */
  onActive(pluginManager: unknown, dependencies: PluginDependencyMap): void;

  /**
   * Plugin deactivation lifecycle hook
   * @param pluginManager - Plugin manager instance
   */
  onDeactive(pluginManager: unknown): void;

  /**
   * Close the active feedback window
   * Unlocks feedback in electron context and unmounts React components
   */
  close(): void;

  /**
   * Show feedback UI
   * @param isFromToolbar - True if triggered from toolbar, false if from feedback entry button
   */
  show(isFromToolbar?: boolean | object): void;

  /**
   * Initialize feedback entry button
   * @param surveyUrl - Optional survey URL for specific environments
   */
  initEntryBtn(surveyUrl?: string): void;

  /**
   * Remove feedback entry button from DOM
   */
  removeEntryBtn(): void;

  /**
   * Show AliXiaoMi feedback widget
   */
  showAliXiaomi(): void;

  /**
   * Hide AliXiaoMi feedback widget
   */
  hideAliXiaomi(): void;

  /**
   * Initialize AliXiaoMi integration
   */
  initAliXiaomi(): void;

  /**
   * Set whether feedback entry should be shown based on UI level
   * @param canShow - Whether feedback entry can be displayed
   */
  setShowStageInUILevel(canShow: boolean): void;

  /**
   * Update survey URL and reinitialize entry button
   * @param surveyUrl - New survey URL
   */
  setSurvey(surveyUrl?: string): void;

  /**
   * Handle environment change events
   * @param event - Environment activation event
   */
  onActiveEnvironmentChanged(event: EnvironmentActivationEvent): void;

  /**
   * Inject feedback button into toolbar for specific business types
   */
  injectToolbar(): void;
}

/**
 * Register the EZHome Feedback Plugin with the application
 */
export function registerPlugin(): void;

export default EZHomeFeedbackPlugin;