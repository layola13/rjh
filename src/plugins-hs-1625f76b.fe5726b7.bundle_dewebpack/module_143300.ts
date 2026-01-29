export const styles = `.ant-modal-confirm.imageViewerModal {
  border-radius: 10px;
  overflow: hidden;
}
.ant-modal-confirm.imageViewerModal .ant-modal-content {
  border-radius: 10px;
  overflow: hidden;
}
.ant-modal-confirm.imageViewerModal .ant-modal-body {
  padding: 0;
}
.ant-modal-confirm.imageViewerModal .ant-modal-body .image-viewer-content {
  height: 550px;
  position: relative;
}
.ant-modal-confirm.imageViewerModal .ant-modal-body .image-viewer-action {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
  height: 36px;
  border-radius: 18px;
  color: #fff;
  font-size: 16px;
  line-height: 16px;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ant-modal-confirm.imageViewerModal .ant-modal-body .image-viewer-action:hover {
  background-color: #333333;
}
.ant-modal-confirm.imageViewerModal .ant-modal-body .ant-modal-confirm-body .ant-modal-confirm-content {
  margin: 0;
}
.ant-modal-confirm.imageViewerModal .ant-modal-body .ant-modal-confirm-btns {
  display: none;
}`;

export default styles;