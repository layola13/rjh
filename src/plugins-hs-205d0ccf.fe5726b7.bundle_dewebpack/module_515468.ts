interface CSSExport {
  push(item: [string, string, string]): void;
}

const cssImageUrl: string = require('./path/to/image-773870');

const cssFactory: (sourceMap: boolean) => CSSExport = require('./css-factory-986380');

const cssExports: CSSExport = cssFactory(false);

cssExports.push([
  'module_515468',
  `.header_area {
    flex: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    height: 56px;
    background-color: #000;
    z-index: 111;
    padding: 0 12px 14px;
  }
  .header_area .left_area .ai_pic_back_btn {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 32px;
    cursor: pointer;
    border-radius: 16px;
    border: 1px solid #ffffff;
  }
  .header_area .left_area .ai_pic_back_btn .btn_content {
    font-size: 14px;
    margin-left: 6px;
    font-family: AlibabaPuHuiTi-Bold !important;
  }
  .header_area .left_area .ai_pic_back_btn:hover {
    background: #396EFE;
    border-color: #396EFE;
  }
  .header_area .right_area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header_area .right_area .ant-dropdown-trigger.global-ddmenu.user-info {
    margin: 0;
  }
  .header_area .right_area .right_item {
    margin-left: 14px;
  }
  .header_area .right_area .right_item .teaching-ability-button-container.teaching-ability-button-wrapper.button {
    padding: 0;
  }
  .spark_pic {
    background-image: url(${cssImageUrl});
    background-size: 332px 100%;
    background-repeat: no-repeat;
  }`,
  ''
]);

export default cssExports;