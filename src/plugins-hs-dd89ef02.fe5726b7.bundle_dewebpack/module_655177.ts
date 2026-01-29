import { useState, createElement, Fragment } from 'react';
import { IconfontView, Scroll, Button, SmartText } from './components';

interface FailedFilesDialogProps {
  onCommit?: () => void;
  failedFileNames: string[];
  errorTitle?: string;
  errorMessage?: string;
  onCancel?: () => void;
}

const WORD_BREAK_STYLE = {
  wordBreak: 'break-all' as const
};

const TENANT_FP = 'fp';
const ICON_FP = 'hs_icon_datang21';
const ICON_DEFAULT = 'hs_icon_datang2';

const FORUM_URL_FP = 'https://www.homestyler.com/forum/view/1635960405562134529';
const FORUM_URL_DEFAULT = 'https://www.yuque.com/tuvgqa/ro7fc0/bo14t2';

const ICON_CLOSE = 'hs_xian_guanbi';
const ICON_WARNING = 'hs_icon_tishi';

const CLICK_COLOR = '#396EFE';
const HOVER_BG_COLOR = '#f5f5f5';
const WARNING_COLOR = '#ffcc3e';

const BG_EXTEND_SIZE = 10;
const ICON_SIZE_LARGE = '66px';
const ICON_SIZE_MEDIUM = '26px';

export default function FailedFilesDialog(props: FailedFilesDialogProps): JSX.Element | null {
  const { onCommit, failedFileNames, errorTitle, errorMessage, onCancel } = props;
  
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleClose = (): void => {
    setIsVisible(false);
    onCancel?.();
  };

  const handleCommit = (): void => {
    setIsVisible(false);
    onCommit?.();
  };

  const handleHelpClick = (): void => {
    const isFpTenant = HSApp.Config.TENANT === TENANT_FP;
    const helpUrl = isFpTenant ? FORUM_URL_FP : FORUM_URL_DEFAULT;
    window.open(helpUrl, '_blank', 'noopener=yes, noreferrer=yes');
  };

  if (!isVisible) {
    return null;
  }

  const isFpTenant = HSApp.Config.TENANT === TENANT_FP;
  const mainIcon = isFpTenant ? ICON_FP : ICON_DEFAULT;

  const dialogTitle = errorTitle || ResourceManager.getString('plugin_cadunderlay_faildfilesdialog_title');
  const partialFailedText = ResourceManager.getString('plugin_cadunderlay_faildfilesdialog_partial_files_failed');
  const checkRetryText = ResourceManager.getString('plugin_cadunderlay_faildfilesdialog_check_and_retry');
  const confirmOkText = ResourceManager.getString('plugin_imageunderlay_confirmok');
  const nextStepText = ResourceManager.getString('plugin_cadunderlay_faildfilesdialog_next_step');
  const howToImproveText = ResourceManager.getString('plugin_cadunderlay_faildfilesdialog_how_to_improve');

  return createElement('div', { className: 'failed-files-dialog-wrapper' },
    createElement('div', { className: 'failed-files-dialog-overLay' }),
    createElement('div', { className: 'failed-files-dialog-main' },
      createElement('div', { className: 'failed-files-dialog-head' },
        createElement('span', { className: 'failed-files-dialog-title' }, dialogTitle),
        createElement('span', { onClick: handleClose },
          createElement(IconfontView, {
            customClass: 'failed-files-dialog-close-btn',
            showType: ICON_CLOSE,
            clickColor: CLICK_COLOR,
            hoverBgColor: HOVER_BG_COLOR,
            bgExtendSize: BG_EXTEND_SIZE
          })
        )
      ),
      createElement('div', { className: 'failed-files-dialog-content' },
        errorMessage 
          ? createElement('div', { className: 'failed-files-content-all-failed' }, errorMessage)
          : createElement(Fragment, null,
              createElement('div', { className: 'failed-files-content-header' },
                createElement(IconfontView, {
                  customClass: 'f-f-c-h-icon',
                  showType: mainIcon,
                  customStyle: { fontSize: ICON_SIZE_LARGE }
                }),
                createElement('div', { className: 'f-f-c-h-content' },
                  createElement('div', { className: 'f-f-c-h-title' }, partialFailedText),
                  createElement('div', { className: 'f-f-c-h-subtitle' }, checkRetryText)
                )
              ),
              createElement(Scroll, {
                option: { suppressScrollX: true },
                className: 'failed-files-scrollbar'
              },
                failedFileNames.map((fileName: string, index: number) =>
                  createElement('div', { className: 'failed-files-dialog-items', key: index },
                    createElement(IconfontView, {
                      customClass: 'f-f-d-i-icon',
                      showType: ICON_WARNING,
                      customStyle: {
                        fontSize: ICON_SIZE_MEDIUM,
                        color: WARNING_COLOR
                      }
                    }),
                    createElement(SmartText, {
                      className: 'f-f-d-i-item',
                      popoverStyle: WORD_BREAK_STYLE
                    }, fileName)
                  )
                )
              )
            )
      ),
      createElement('div', { className: 'failed-files-dialog-bottom' },
        errorMessage
          ? createElement(Button, {
              className: 'failed-files-dialog-button failed-files-dialog-button-save',
              type: 'primary',
              onClick: handleClose
            }, confirmOkText)
          : createElement(Button, {
              className: 'failed-files-dialog-button failed-files-dialog-button-save',
              type: 'primary',
              onClick: handleCommit
            }, nextStepText),
        createElement(Button, {
          className: 'failed-files-dialog-button failed-files-dialog-button-cancel',
          type: 'text',
          onClick: handleHelpClick
        }, howToImproveText)
      )
    )
  );
}