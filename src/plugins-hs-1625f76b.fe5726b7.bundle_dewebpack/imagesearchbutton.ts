import React, { useRef, useState } from 'react';
import { Modal, IconfontView, Tooltip } from 'somewhere/ui-components';
import defaultImage from './default-image';
import './styles.css';

interface ImageSearchResult {
  imgSearchUrl: string;
  [key: string]: unknown;
}

interface ImageSearchButtonProps {
  showPicture: (result: ImageSearchResult) => void;
  isReUpLoadButton?: boolean;
  type?: 0 | 1;
}

interface CheckboxConfig {
  checkboxText: string;
  callback: () => void;
}

interface ModalConfig {
  title: string;
  content: React.ReactNode;
  onOk: () => void;
  okButtonContent: string;
  closeByOkButton: boolean;
  disableCancelButton: boolean;
  checkbox: CheckboxConfig;
  className: string;
}

declare global {
  const ResourceManager: {
    getString: (key: string) => string;
  };
  
  namespace HSApp {
    namespace Catalog {
      class EventManager {
        handleSearchPictureFile: (files: FileList) => Promise<ImageSearchResult> | null;
      }
    }
    
    namespace App {
      function getApp(): {
        userTrackLogger: {
          push: (event: string, data: Record<string, string>, extra: Record<string, unknown>) => void;
        };
      };
    }
  }
}

const IMAGE_SEARCH_MODAL_KEY = 'image-search-modal';
const ACCEPTED_IMAGE_TYPES = 'image/jpg, image/png, image/jpeg, image/bmp, image/jfif';

export const ImageSearchButton: React.FC<ImageSearchButtonProps> = ({
  showPicture,
  isReUpLoadButton = false,
  type = 0
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [modalDismissed, setModalDismissed] = useState<string>(
    localStorage.getItem(IMAGE_SEARCH_MODAL_KEY) ?? 'true'
  );

  const triggerFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = (): void => {
    if (modalDismissed === 'false') {
      triggerFileInput();
    } else {
      Modal.basic({
        title: ResourceManager.getString('inspiration_image_search_image_search'),
        content: renderModalContent(),
        onOk: triggerFileInput,
        okButtonContent: ResourceManager.getString('render_ribp_next_step'),
        closeByOkButton: true,
        disableCancelButton: true,
        checkbox: {
          checkboxText: ResourceManager.getString('hot_key_duplicate_content_no_tip'),
          callback: () => {
            setModalDismissed('false');
            localStorage.setItem(IMAGE_SEARCH_MODAL_KEY, 'false');
          }
        },
        className: 'aigc-modal'
      } as ModalConfig);
    }
  };

  const renderModalContent = (): React.ReactNode => (
    <div className="aigc-upload-picture-popover">
      <img
        className="aigc-upload-picture-popover-img"
        src={defaultImage}
        alt=""
      />
      <div className="aigc-upload-picture-popover-title">
        {ResourceManager.getString('inspiration_image_search_upload_image')}
      </div>
      <div>
        {ResourceManager.getString('inspiration_image_search_upload_image_format')}
      </div>
      <div>
        {ResourceManager.getString('inspiration_image_search_upload_image_size')}
      </div>
    </div>
  );

  const renderSparkButton = (): React.ReactNode => (
    <div className="aigc-upload-picture-icon spark" onClick={handleUploadClick}>
      <IconfontView
        showType="hs_mian_shangchuantupian"
        customStyle={{
          color: '#1C1C1C',
          fontSize: '15px'
        }}
      />
      <div className="aigc-upload-icon-text">
        {ResourceManager.getString('inspiration_image_search_image_search')}
      </div>
    </div>
  );

  const renderDefaultButton = (): React.ReactNode => (
    <Tooltip
      placement="top"
      title={ResourceManager.getString('inspiration_image_search_image_search')}
      trigger="hover"
      color="dark"
      getPopupContainer={(element: HTMLElement) => element.parentElement!}
      overlayClassName="aigc-upload-picture-tooltip"
    >
      <div className="aigc-upload-picture-icon" onClick={handleUploadClick}>
        <IconfontView
          showType="hs_mian_shangchuantupian"
          hoverColor="#396efe"
          customStyle={{
            color: '#9B9FAB',
            fontSize: '16px'
          }}
        />
      </div>
    </Tooltip>
  );

  const renderReUploadButton = (): React.ReactNode => (
    <Tooltip
      placement="top"
      title={ResourceManager.getString('inspiration_image_search_reupload_image')}
      trigger="hover"
      color="dark"
      getPopupContainer={() => containerRef.current?.parentElement!}
      overlayClassName="aigc-reupload-tooltip"
    >
      <div>
        <IconfontView
          showType="hs_mian_shangchuantupian"
          customClass="aigc-reupload-icon"
          customStyle={{
            color: '#1C1C1C',
            fontSize: '20px'
          }}
          iconOnclick={triggerFileInput}
        />
      </div>
    </Tooltip>
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.target.files;
    
    if (files) {
      const eventManager = new HSApp.Catalog.EventManager();
      const searchResult = eventManager.handleSearchPictureFile(files);
      
      if (searchResult) {
        searchResult.then((result: ImageSearchResult) => {
          if (result.imgSearchUrl) {
            showPicture(result);
          }
        });
      }
    }

    HSApp.App.getApp().userTrackLogger.push(
      'inspiration.imagesearch',
      { description: '灵感图搜' },
      {}
    );
  };

  const getButtonContent = (): React.ReactNode => {
    if (isReUpLoadButton) {
      return renderReUploadButton();
    }
    if (type === 0) {
      return renderDefaultButton();
    }
    return renderSparkButton();
  };

  const containerClassName = `aigc-picture${type === 1 || isReUpLoadButton ? ' spark' : ''}`;

  return (
    <div ref={containerRef} className={containerClassName}>
      <input
        ref={fileInputRef}
        type="file"
        name="upload"
        id="upload-aigc"
        style={{ display: 'none' }}
        accept={ACCEPTED_IMAGE_TYPES}
        onChange={handleFileChange}
      />
      {getButtonContent()}
    </div>
  );
};