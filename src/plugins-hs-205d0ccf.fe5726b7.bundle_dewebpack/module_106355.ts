interface CSSModule {
  id: string;
  push: (content: [string, string]) => void;
}

interface WebpackRequire {
  (moduleId: number): unknown;
}

const cssContent = `
.ant-layout.spark_pic_image_Layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1002;
  color: #fff;
  background-color: #000;
  background-size: 468px 112px;
  background-position: top center;
  background-repeat: no-repeat;
}

.ant-layout.spark_pic_image_Layout .ant-layout {
  background: transparent;
}

.ant-layout.spark_pic_image_Layout .ant-layout .ant-layout-content {
  position: relative;
  padding: 0 30px;
}

.ant-layout.spark_pic_image_Layout .header_area {
  background-color: transparent;
}

.ant-layout.spark_pic_image_Layout .content-header {
  display: flex;
  margin-bottom: 17px;
  align-items: center;
  justify-content: space-between;
  height: 30px;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part {
  display: flex;
  align-items: center;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .tabs {
  width: 196px;
  margin-right: 10px;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .tabs.homestyler-tabs-web.homestyler-ui-components .homestyler-tabs-web-list-mask {
  border-radius: 4px;
  background-color: #494A4C;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .tabs .homestyler-tabs-tab.homestyler-ui-components .homestyler-tabs-tab-label {
  color: white;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .tabs.homestyler-tabs-web.homestyler-ui-components .homestyler-tabs-web-list .homestyler-tabs-web-bar-inner {
  border-radius: 4px;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .coupon-left-tips {
  color: rgba(255, 255, 255, 0.96);
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .coupon-left-tips .number {
  color: white;
  font-weight: bold;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .left {
  display: flex;
  align-items: center;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .left .pic-count {
  text-align: left;
  color: rgba(255, 255, 255, 0.66);
  font-size: 14px;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .left .ant-checkbox-wrapper {
  color: white;
  align-items: center;
  margin-left: 20px;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .left .ant-checkbox-wrapper .ant-checkbox {
  top: 0;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .left .ant-checkbox-wrapper span {
  font-size: 12px !important;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .left .ant-checkbox-wrapper .ant-checkbox-inner {
  background-color: #323232;
}

.ant-layout.spark_pic_image_Layout .content-header .left-part .left .ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner {
  background-color: #1890ff;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal {
  display: flex;
  align-items: center;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images {
  margin-left: 20px;
  display: inline-flex;
  align-items: center;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .images-btn {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 0 12px;
  height: 30px;
  line-height: 30px;
  background-color: #222222;
  font-size: 13px;
  font-weight: bold;
  border-radius: 15px;
  text-align: center;
  color: white;
  cursor: pointer;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .images-btn.watermark-btn .tag {
  width: -moz-fit-content;
  width: fit-content;
  padding: 0 6px;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .images-btn:hover {
  background: #396efe;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .images-btn .loading {
  margin-right: 4px;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: bottom;
  animation: rotateit 1.5s linear infinite;
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .images-btn.disable {
  color: rgba(255, 255, 255, 0.1);
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .tag {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: black;
  line-height: 18px;
  font-size: 12px;
  right: 0;
  top: -12px;
  width: 80px;
  height: 18px;
  border-top-left-radius: 9px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 9px;
  border-bottom-left-radius: 2px;
  background-image: linear-gradient(to right, #FEDE9D, #81ADFF);
}

.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .tag .hs-iconfont-view {
  margin-right: 2px;
}

.ant-layout.spark_pic_image_Layout .content-header .coupon-left-tips {
  color: rgba(255, 255, 255, 0.96);
}

.ant-layout.spark_pic_image_Layout .content-header .coupon-left-tips .number {
  color: white;
  font-weight: bold;
}

.spark_pic_image_Layout.layout_disable {
  display: none;
}

.spark_pic_album_logo {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 206px;
  height: 37px;
  transform: translateX(-50%);
}
`;

export default cssContent;