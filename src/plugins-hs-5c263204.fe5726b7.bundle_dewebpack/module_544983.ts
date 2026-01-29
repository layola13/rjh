const styles = `.block-options {
  display: flex;
  flex-wrap: wrap;
  margin: -3px;
  cursor: pointer;
}

.block-options .block-option-item {
  position: relative;
  width: 83px;
  height: 83px;
  margin: 3px;
  padding: 10px;
  flex: 0 0 calc(50% - 6px);
  background: white;
  box-sizing: border-box;
  border-radius: 4px;
}

.block-options .block-option-item .homestyler-ui-components.radio-container {
  position: absolute;
  top: 3px;
  left: 3px;
}

.block-options .block-option-item img {
  width: 64px;
  height: 64px;
}

.block-options .block-option-item .block-option-zoom-image {
  position: absolute;
  bottom: 3px;
  right: 3px;
  background: rgba(0, 0, 0, 0.5);
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.block-options .block-option-item .block-option-zoom-image .zoom-icon {
  margin-top: 2px;
  margin-left: 2px;
}

.block-options .block-option-item .block-option-zoom-image:hover {
  background: rgba(0, 0, 0, 0.7);
}

.block-options .block-option-item-checked {
  border: 2px solid #396efe;
}

.block-options .block-options-pagination {
  height: 20px;
  margin-left: 55px;
}

.block-options .block-options-pagination .ant-pagination {
  font-size: 12px;
}

.block-options .block-options-pagination .ant-pagination.mini .ant-pagination-prev,
.block-options .block-options-pagination .ant-pagination.mini .ant-pagination-next {
  min-width: 12px;
  height: 6px;
  margin: 0;
  line-height: 6px;
}

.block-options .block-options-pagination .anticon svg {
  width: 8px;
  height: 8px;
}

.block-options .block-options-pagination .ant-pagination-simple-pager {
  margin-right: 0px;
}

.block-options .block-options-pagination .ant-pagination-simple-pager input {
  height: 16px;
  padding: 0px;
  margin-right: 0px;
}

.block-options .block-options-pagination .ant-pagination-simple-pager input:focus {
  border-color: #396EFE;
  box-shadow: 0 0 0 2px rgba(57, 110, 254, 0.2);
}

.block-options .block-options-pagination .ant-pagination-simple-pager input:hover {
  border-color: #396EFE;
}

.block-options .block-options-pagination .ant-pagination-slash {
  margin: 0px 3px;
}

.block-options-zoom-image-content .block-override-logo {
  position: absolute;
  width: 91%;
  height: 40px;
  background-color: #ffffff;
  bottom: 20px;
}

.block-options-override-watermark .homestyler-modal-content-wrapper-content {
  padding: 22px 12px 0px 12px !important;
}

.block-options-override-watermark .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-outer .homestyler-modal-bottom-container {
  margin-top: 12px;
}`;

export default styles;