/**
 * Feedback form component for collecting user bug reports and suggestions
 * @module FeedbackForm
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Radio } from 'antd';
import { AttachmentForm } from './AttachmentForm';
import { RadioButtonCard } from './RadioButtonCard';
import { showLiveHint, sendFeedback, uploadFileToS3 } from './utils/feedback';
import { getAssetId } from './utils/asset';

/**
 * Feedback type enumeration
 */
type FeedbackType = 'BUG' | 'SUGGESTION';

/**
 * Feedback module enumeration keys
 */
type FeedbackModuleKey =
  | 'APARTMENT_DRAW'
  | 'MODEL_MATERIAL'
  | 'WHOLE_HOUSE_HARD_OUTFIT'
  | 'WHOLE_HOUSE_CUSTOM'
  | 'FREE_STYLE'
  | 'RENDER_EFFECT'
  | 'CLIENT_SIDE_PROBLEM'
  | 'SUBSCRIPTION'
  | 'OTHER';

/**
 * Feedback module enum mapping
 */
type FeedbackModuleEnum = Record<FeedbackModuleKey, [string]>;

/**
 * Component state interface
 */
interface FeedbackFormState {
  /** Whether the submit button is disabled */
  isBtnDisable: boolean;
}

/**
 * Component props interface
 */
interface FeedbackFormProps {
  /** Callback function to close the feedback form */
  close?: () => void;
}

/**
 * Attachment file interface
 */
interface AttachmentFile {
  /** Base64 encoded data URL of the file */
  dataUrl: string;
}

/**
 * Attachment form ref interface
 */
interface AttachmentFormRef {
  /** Get the attached file */
  getFile?: () => AttachmentFile | undefined;
}

/**
 * Feedback submission data interface
 */
interface FeedbackSubmissionData {
  /** Feedback object type (10 for general feedback) */
  feedbackObject: number;
  /** Type of feedback (bug or suggestion) */
  feedbackType: FeedbackType;
  /** Selected feedback module */
  feedbackModule: string;
  /** Source environment */
  source: string;
  /** Client information */
  clientInfo: unknown;
  /** Problem description text */
  problemDescription: string;
  /** Array of uploaded image URLs */
  imageUrls: string[];
  /** Associated asset ID */
  assetId: string;
  /** Video replay link if screen recording is included */
  replayLink: string;
}

/**
 * Radio button data interface
 */
interface RadioButtonData {
  /** Button array configuration */
  buttonArr: Array<{
    /** Whether the button is checked */
    isChecked: boolean;
    /** Button display text */
    txt: string;
  }>;
  /** Callback when button is checked */
  onCheck: (index: number) => void;
}

/** Available feedback modules for standard tenant */
const STANDARD_FEEDBACK_MODULES: FeedbackModuleKey[] = [
  'APARTMENT_DRAW',
  'MODEL_MATERIAL',
  'WHOLE_HOUSE_HARD_OUTFIT',
  'WHOLE_HOUSE_CUSTOM',
  'FREE_STYLE',
  'RENDER_EFFECT',
  'OTHER',
];

/** Available feedback modules for FP tenant */
const FP_FEEDBACK_MODULES: FeedbackModuleKey[] = [
  'APARTMENT_DRAW',
  'MODEL_MATERIAL',
  'RENDER_EFFECT',
  'FREE_STYLE',
  'SUBSCRIPTION',
  'OTHER',
];

/** Maximum length for feedback message */
const MAX_FEEDBACK_MESSAGE_LENGTH = 1000;

/** Minimum client version supporting screen recording (4.0.1) */
const MIN_RECORDING_VERSION = 401;

/** Success message display duration in milliseconds */
const SUCCESS_MESSAGE_DURATION = 5000;

/** Global flag indicating if screen recording checkbox should be shown */
let isRecordingSupported = false;

/**
 * Feedback form component for collecting user feedback
 * Supports bug reports and suggestions with optional file attachments and screen recording
 */
export class FeedbackForm extends React.Component<FeedbackFormProps, FeedbackFormState> {
  /** Whether to include screen recording */
  private checked: boolean;
  
  /** Type of feedback being submitted */
  private feedbackType: FeedbackType;
  
  /** Selected feedback module */
  private feedbackModule: string;
  
  /** User's feedback message */
  private feedbackMessage: string;
  
  /** URL of recorded video */
  private videoUrl: string;
  
  /** Mapping of module keys to localized names */
  private feedbackModuleEnum: FeedbackModuleEnum;
  
  /** Cached attachment file */
  private _attachment: AttachmentFile | null | undefined;

  /** Component refs */
  refs: {
    bodymsg: HTMLTextAreaElement;
    usertag: typeof Radio.Group;
    attachment: AttachmentFormRef;
  };

  constructor(props: FeedbackFormProps) {
    super(props);

    this.state = {
      isBtnDisable: true,
    };

    this.checked = false;
    this.feedbackType = 'BUG';
    this.feedbackModule = '';
    this.feedbackMessage = '';
    this.videoUrl = '';
    this.feedbackModuleEnum = {
      APARTMENT_DRAW: [ResourceManager.getString('plugin_feedback_tag_apartment_drawing')],
      MODEL_MATERIAL: [ResourceManager.getString('plugin_feedback_tag_model_material')],
      WHOLE_HOUSE_HARD_OUTFIT: [ResourceManager.getString('plugin_feedback_tag_hard')],
      WHOLE_HOUSE_CUSTOM: [ResourceManager.getString('plugin_feedback_tag_custom')],
      FREE_STYLE: [ResourceManager.getString('plugin_feedback_tag_diy')],
      RENDER_EFFECT: [ResourceManager.getString('plugin_feedback_tag_render')],
      CLIENT_SIDE_PROBLEM: [ResourceManager.getString('plugin_feedback_tag_client')],
      SUBSCRIPTION: [ResourceManager.getString('plugin_feedback_tag_subscription')],
      OTHER: [ResourceManager.getString('plugin_feedback_tag_others')],
    };

    this._attachment = null;

    // Bind event handlers
    this.handleKeyupFeedback = this.handleKeyupFeedback.bind(this);
    this.handleSendFeedback = this.handleSendFeedback.bind(this);
    this.handleModuleChange = this.handleModuleChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
  }

  /**
   * Get the attached file from the attachment form
   * @returns The attached file or undefined
   */
  private getAttachment(): AttachmentFile | undefined {
    if (!this.refs.attachment) {
      return undefined;
    }
    return this.refs.attachment.getFile?.call(this.refs.attachment);
  }

  /**
   * Handle feedback submission
   * Triggers screen recording if enabled, then sends feedback
   */
  private handleSendFeedback(): void {
    this._attachment = this.getAttachment();

    if (window.electron && this.checked === true) {
      const ipcChannel = 'ClientRecording';
      const ipcRenderer = window.electron.ipcRenderer;

      showLiveHint(
        ResourceManager.getString('plugin_feedback_send_success'),
        SUCCESS_MESSAGE_DURATION
      );

      ipcRenderer.send(ipcChannel);
      ipcRenderer.once(ipcChannel, (_event: unknown, videoPath: string) => {
        if (videoPath) {
          this.videoUrl = videoPath;
        }
        this.sendFeedback();
      });
    } else {
      showLiveHint(
        ResourceManager.getString('plugin_feedback_sending'),
        SUCCESS_MESSAGE_DURATION,
        LiveHint.statusEnum.loading
      );
      this.sendFeedback();
    }

    // Track submission event
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Feedback,
      'submit_event',
      {
        sUploadingClipTicked: this.checked,
      }
    );

    this.props.close?.();
  }

  /**
   * Send feedback to server
   * Uploads attachment if present, then submits feedback data
   */
  private sendFeedback(): void {
    let imageUrl = '';

    HSApp.Util.Feedback.collectFeedbackInfo().then((clientInfo: unknown) => {
      const submitFeedback = (): void => {
        const feedbackData: FeedbackSubmissionData = {
          feedbackObject: 10,
          feedbackType: this.feedbackType,
          feedbackModule: this.feedbackModule,
          source: HSApp.Util.Url.getQueryStrings().env || 'sjj',
          clientInfo,
          problemDescription:
            this.feedbackMessage.length >= MAX_FEEDBACK_MESSAGE_LENGTH
              ? this.feedbackMessage.slice(0, MAX_FEEDBACK_MESSAGE_LENGTH)
              : this.feedbackMessage,
          imageUrls: [imageUrl],
          assetId: getAssetId(),
          replayLink: this.videoUrl,
        };

        sendFeedback(feedbackData)
          .then(() => {
            if (this.checked && this.videoUrl) {
              showLiveHint(
                ResourceManager.getString('plugin_feedback_video_send_success'),
                SUCCESS_MESSAGE_DURATION
              );
            }
            if (!this.checked) {
              showLiveHint(
                ResourceManager.getString('plugin_feedback_send_success'),
                SUCCESS_MESSAGE_DURATION
              );
            }
          })
          .catch(() => {
            showLiveHint(
              ResourceManager.getString('plugin_feedback_send_failed'),
              SUCCESS_MESSAGE_DURATION
            );
          });
      };

      if (this._attachment) {
        uploadFileToS3(this._attachment.dataUrl).then((url: string) => {
          imageUrl = url;
          submitFeedback();
        });
      } else {
        submitFeedback();
      }
    });
  }

  /**
   * Verify form validity and update submit button state
   */
  private verify(): void {
    if (this.feedbackModule === '' || this.feedbackMessage === '') {
      this.setState({ isBtnDisable: true });
    } else {
      this.setState({ isBtnDisable: false });
    }
  }

  /**
   * Handle feedback message input change
   */
  private handleKeyupFeedback(): void {
    this.feedbackMessage = ReactDOM.findDOMNode(this.refs.bodymsg).value;
    this.verify();
  }

  /**
   * Handle feedback module selection change
   */
  private handleModuleChange(e: { target: { value: string } }): void {
    this.feedbackModule = e.target.value;
    this.verify();
  }

  /**
   * Handle screen recording checkbox change
   */
  private onCheckboxChange(e: { target: { checked: boolean } }): void {
    this.checked = e.target.checked;
  }

  /**
   * Create screen recording checkbox if supported
   * @returns JSX element or null if not supported
   */
  private createCheckbox(): JSX.Element | null {
    try {
      // Not available for FP tenant or non-electron environment
      if (!window.electron || HSApp.Config.TENANT === 'fp') {
        return null;
      }

      const clientVersion = HSApp.Util.Url.getQueryStrings().clientVersion;
      if (!clientVersion) {
        return null;
      }

      // Parse version and check if it meets minimum requirement
      const versionNumber = parseInt(clientVersion.replace(/\./g, ''));
      if (versionNumber <= MIN_RECORDING_VERSION || isNaN(versionNumber)) {
        return null;
      }
    } catch (error) {
      return null;
    }

    return (
      <div className="form-title form-row">
        <label className="form-label form-labal-feedback">
          <span className="label-required"></span>
          {ResourceManager.getString('plugin_feedback_video_attachment')}
        </label>
        <div className="form-row-content">
          <Checkbox
            onChange={this.onCheckboxChange}
            className="include-video"
            disabled={!isRecordingSupported}
          >
            {ResourceManager.getString('plugin_feedback_video_hint')}
          </Checkbox>
          {!isRecordingSupported && (
            <div className="include-video-tips-row-disabled">
              <span className="include-video-tips-content">
                您尚未支持录屏功能，可在客户端右上角
              </span>
              <img className="include-video-tips-image" src={require('./settings-icon.png')} />
              <span className="include-video-tips-content">中开启</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const radioButtonData: RadioButtonData = {
      buttonArr: [
        {
          isChecked: this.feedbackType === 'BUG',
          txt: ResourceManager.getString('plugin_feedback_selector_bug'),
        },
        {
          isChecked: this.feedbackType === 'SUGGESTION',
          txt: ResourceManager.getString('plugin_feedback_selector_advice'),
        },
      ],
      onCheck: (index: number) => {
        this.feedbackType = index === 0 ? 'BUG' : 'SUGGESTION';
      },
    };

    const feedbackModules =
      HSApp.Config.TENANT === 'fp' ? FP_FEEDBACK_MODULES : STANDARD_FEEDBACK_MODULES;

    return (
      <div className="feedbackform noselect">
        <div className="mainfields">
          {/* Feedback Type Selection */}
          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required">*</span>
              {ResourceManager.getString('plugin_feedback_type')}
            </label>
            <div className="form-row-content">
              <RadioButtonCard
                className="radio-button-card-wrapper-feedback"
                data={radioButtonData}
              />
            </div>
          </div>

          {/* Feedback Module Selection */}
          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required">*</span>
              {ResourceManager.getString('plugin_feedback_module')}
            </label>
            <div className="form-row-content">
              <Radio.Group onChange={this.handleModuleChange} ref="usertag">
                {feedbackModules.map((moduleKey) => (
                  <Radio.Button key={moduleKey} value={moduleKey}>
                    {this.feedbackModuleEnum[moduleKey]}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          </div>

          {/* Feedback Description */}
          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required">*</span>
              {ResourceManager.getString('plugin_feedback_describe')}
            </label>
            <div className="form-row-content">
              <textarea
                ref="bodymsg"
                onKeyUp={this.handleKeyupFeedback}
                style={{ width: 316, height: 80, padding: '12px 18px' }}
                placeholder={ResourceManager.getString('plugin_feedback_text_placeholder')}
              />
            </div>
          </div>

          {/* File Attachment */}
          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required"></span>
              {ResourceManager.getString('plugin_feedback_attachment')}
            </label>
            <div className="form-row-content">
              <AttachmentForm ref="attachment" />
            </div>
          </div>
        </div>

        {/* Communication Group / Help Link */}
        {HSApp.Config.TENANT !== 'fp' ? (
          <div className="join">
            <i className="dingding"></i>
            <div style={{ lineHeight: '14px' }}>
              {ResourceManager.getString('plugin_feedback_join_communication_group')}
            </div>
          </div>
        ) : (
          <div className="feedback-form-link-wrapper">
            <a
              className="feedback-form-link"
              href={`${HSApp.PartnerConfig.USERCENTER_URL}/learn-help`}
              target="_blank"
            >
              Find an answer or start a discussion in Homestyler community.
            </a>
          </div>
        )}

        {/* Screen Recording Checkbox */}
        {this.createCheckbox()}

        {/* Submit Button */}
        <div className="actionbuttons">
          <button
            type="button"
            onClick={this.handleSendFeedback}
            className="btn btn-primary sendfeedback"
            disabled={this.state.isBtnDisable ? 'disabled' : ''}
          >
            {ResourceManager.getString('plugin_feedback_send')}
          </button>
        </div>
      </div>
    );
  }
}

// Listen for screen recording support updates from Electron
if (window.electron) {
  window.electron.ipcRenderer.on('showCheckbox', (_event: unknown, value: string) => {
    if (value === 'true') {
      isRecordingSupported = true;
    }
    if (value === 'false') {
      isRecordingSupported = false;
    }
  });
}