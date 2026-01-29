interface PreviewValidAreaProps {
  area: number;
  isAreaValid: boolean;
  url: string;
}

/**
 * 显示可设计区域预览弹窗
 * @param props - 包含区域信息和预览图片URL的属性对象
 */
export function PreviewValidArea(props: PreviewValidAreaProps): void {
  const { area, url } = props;

  /**
   * 下载预览图片
   * 优先使用fetch + blob方式，失败时降级为window.open
   */
  const handleDownload = async (): Promise<void> => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = objectUrl;
      downloadLink.download = 
        ResourceManager.getString('store_smart_layout_downloadFileName') || 'layout_area.png';
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error(
        ResourceManager.getString('store_smart_layout_calculatedownloadFailure'),
        error
      );
      
      try {
        window.open(url, '_blank');
      } catch (fallbackError) {
        console.error('备用下载方案也失败了', fallbackError);
        alert('下载失败，请右键点击图片选择"另存为"来下载图片');
      }
    }
  };

  /**
   * 渲染弹窗底部内容（图例 + 操作按钮）
   */
  const renderFooter = (): JSX.Element => {
    return (
      <div className="preview-footer">
        <div className="legend">
          <div className="legend-item">
            <div className="color-block valid" />
            <span>{ResourceManager.getString('store_smart_layout_designableArea')}</span>
          </div>
          <div className="legend-item">
            <div className="color-block invalid" />
            <span>{ResourceManager.getString('store_smart_layout_nonDesignableArea')}</span>
          </div>
        </div>
        
        <div className="buttons">
          <Button className="download-btn" onClick={handleDownload}>
            <IconfontView
              showType="hs_icon_xiazaimingxi"
              customStyle={{
                fontSize: '16px',
                color: '#1C1C1C'
              }}
            />
            {ResourceManager.getString('store_smart_layout_download')}
          </Button>
          
          <Button
            className="confirm-btn"
            onClick={() => Modal.close('basic')}
          >
            {ResourceManager.getString('store_smart_layout_confirm')}
          </Button>
        </div>
      </div>
    );
  };

  Modal.basic({
    className: 'valid-area-preview-modal',
    customIcon: (
      <div className="preview-title">
        <span className="area-text">
          {ResourceManager.getString('store_smart_layout_designableAreaText')
            .replace('{area}', area.toString())}
        </span>
      </div>
    ),
    content: (
      <div className="valid-area-preview-content">
        <div className="preview-content">
          <img
            src={url}
            alt={ResourceManager.getString('store_smart_layout_downloadFileName')}
          />
        </div>
        {renderFooter()}
      </div>
    ),
    enableCheckbox: false,
    hideCancelButton: true,
    hideOkButton: true
  });
}