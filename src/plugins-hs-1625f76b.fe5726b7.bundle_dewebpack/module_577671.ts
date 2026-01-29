interface CssExport {
  push(data: [string, string]): void;
}

const cssContent = `ul li {
            \n list-style: none;
            \n
        }\n.common_mask {
        \n width: 100%;
        \n height: 100%;
        \n position: absolute;
        \n z-index: 3000;
        \n background: rgba(0, 0, 0, 0.3);
        \n top: 0;
        \n left: 0;
        \n text-align: center;
        \n
    }\n.catalog_popup_panel_collection_body {
    \n width: 788px;
    \n height: 566px;
    \n margin: -281px auto 0 -390px;
    \n background-color: #f7f7f7;
    \n border-radius: 4px;
    \n position: absolute;
    \n top: 50%;
    \n left: 50%;
    \n color: #343a40;
    \n
}\n.catalog_popup_panel_collection_body .header {
\n height: 50px;
\n overflow: hidden;
\n line-height: 50px;
\n text-align: center;
\n background-color: #fff;
\n border-top-right-radius: 4px;
\n border-top-left-radius: 4px;
\n border-bottom: 1px solid #e3e3e3;
\n font-size: 18px;
\n
}\n.catalog_popup_panel_collection_body .header label {
\n color: #333;
\n display: block;
\n font-weight: 400;
\n line-height: 50px;
\n text-align: center;
\n margin: 0px auto;
\n margin-left: 44px;
\n width: 50%;
\n padding: 0;
\n font-weight: normal;
\n display: inline-block;
\n
}\n.catalog_popup_panel_collection_body .header .closeBtn {
\n width: 50px;
\n height: 30px;
\n float: right;
\n margin-top: 3px;
\n cursor: pointer;
\n
}\n.catalog_popup_panel_collection_body .header .closeBtn img {
\n width: 14px;
\n height: 14px;
\n
}\n.catalog_popup_panel_collection_body .footer {
\n position: absolute;
\n margin-left: 50%;
\n transform: translate(-50%);
\n bottom: 30px;
\n
}\n.catalog_popup_panel_collection_body .footer input[type="submit"] {
\n cursor: pointer;
\n position: relative;
\n left: 50%;
\n transform: translate(-50%, 0);
\n width: 213px;
\n height: 35px;
\n background: #4d9bd6;
\n color: white;
\n border-radius: 2px;
\n border: 1px solid #3085c4 !important;
\n font-size: 16px;
\n font-weight: normal;
\n line-height: 1.42857143;
\n text-align: center;
\n white-space: nowrap;
\n vertical-align: middle;
\n touch-action: manipulation;
\n
}\n.catalog_popup_panel_collection_body .footer input[type="submit"]:hover {
\n background: #4d9bd6;
\n border-color: #204d74;
\n
}\n.catalog_popup_panel_collection_body .footer input[disabled] {
\n border: 1px solid #d9dbdf !important;
\n background-color: #ccc !important;
\n
}\n@keyframes circle {
\n 0% {
    \n transform: rotate(0deg);
    \n
}\n 100% {
\n transform: rotate(360deg);
\n
}\n
}\n#catalog_popup_panel_collection #model_apply_mask label {
\n font-size: unset;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .header {
\n display: flex;
\n flex-direction: column;
\n align-items: center;
\n position: relative;
\n height: 50px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .header label {
\n display: block;
\n white-space: nowrap;
\n margin: 0;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .header .closeBtn {
\n position: absolute;
\n right: 0.18em;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .subtitle {
\n display: flex;
\n align-items: center;
\n justify-content: center;
\n margin-top: 6px;
\n margin-bottom: 20px;
\n color: #656566;
\n font-size: 14px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .subtitle img {
\n width: 12px;
\n height: 14px;
\n padding-right: 3px;
\n padding-bottom: 1px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content {
\n position: relative;
\n width: 713px;
\n height: 356px;
\n left: 50%;
\n transform: translate(-50%);
\n display: flex;
\n flex-direction: column;
\n align-items: flex-start;
\n text-align: left;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper {
\n margin: 0;
\n position: relative;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper img {
\n width: 6px;
\n height: 7px;
\n position: absolute;
\n left: 0;
\n top: 3px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper label {
\n display: inline-block;
\n font-size: 16px;
\n margin-left: 20px;
\n margin-bottom: 8px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper .userinput {
\n display: block;
\n margin-left: 20px;
\n margin-bottom: 20px;
\n border-radius: 2px;
\n font-size: 14px;
\n padding: 2px;
\n padding-left: 4px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.name input {
\n width: 671px;
\n height: 26px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.describe textarea {
\n width: 672px;
\n height: 58px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.describe img {
\n visibility: hidden;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.connect input {
\n width: 391px;
\n height: 26px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.connect img {
\n visibility: hidden;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture {
\n width: 100%;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_tips {
\n width: 100px;
\n height: 80px;
\n position: relative;
\n top: -2px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_tips img {
\n position: absolute;
\n width: 12.4px;
\n height: 12.4px;
\n cursor: pointer;
\n top: 5px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_tips label {
\n color: #5f5f5f;
\n font-size: 12px;
\n margin-left: 15px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper {
\n font-size: 1em;
\n width: 100%;
\n position: relative;
\n height: 80px;
\n overflow: hidden;
\n margin-bottom: 10px;
\n margin-left: 20px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper {
\n width: 100%;
\n height: 80px;
\n position: absolute;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list {
\n width: 100%;
\n height: 100%;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item {
\n position: relative;
\n width: 100px;
\n height: 80px;
\n float: left;
\n margin-right: 10px;
\n margin-bottom: 10px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item .picture_wrapper {
\n width: 100px;
\n height: 80px;
\n position: relative;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item .picture_wrapper img {
\n width: 100px;
\n height: 80px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item .picture_wrapper img.pciture_info {
\n width: 20px;
\n height: 20px;
\n position: absolute;
\n left: 50%;
\n top: 50%;
\n margin-left: -10px;
\n margin-top: -10px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item .picture_wrapper img.pciture_info.loading {
\n animation: circle 1.1s linear infinite;
\n z-index: 2;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item .picture_wrapper .delete_wrapper {
\n z-index: 10;
\n position: absolute;
\n bottom: 0px;
\n right: 1px;
\n cursor: pointer;
\n width: 17px;
\n height: 17px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item .picture_wrapper .delete_wrapper .delete_wrapper_span {
\n width: 17px;
\n height: 17px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .thumbnail-item .picture_wrapper .delete_wrapper .delete_wrapper_span .clear {
\n clear: both;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .picture_upload {
\n width: 100px;
\n height: 80px;
\n float: left;
\n margin-right: 10px;
\n margin-bottom: 10px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .picture_upload .picture_upload_span {
\n width: 100px;
\n height: 80px;
\n position: relative;
\n cursor: pointer;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .picture_upload .picture_upload_span .hover {
\n display: none;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .picture_upload .picture_upload_span .normal {
\n display: inline-block;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .picture_upload .picture_upload_span:hover .hover {
\n display: inline-block;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper .picture_list .picture_upload .picture_upload_span:hover .normal {
\n display: none;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .picture_list_wrapper.hideUpload .picture_upload {
\n display: none;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .picture_upload_wrapper .clear {
\n clear: both;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .error_tips {
\n position: relative;
\n padding-bottom: 12px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .error_tips img {
\n width: 12px;
\n height: 14px;
\n display: inline-block;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .error_tips span {
\n display: inline-block;
\n position: relative;
\n left: 14px;
\n font-size: 12px;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .error_tips.hide {
\n display: none;
\n
}\n#catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.picture .error_tips.show {
\n display: block;
\n
}\n.global-en #catalog_popup_panel_collection #model_apply_mask .catalog_popup_panel_collection_body .model_apply_content .wrapper.connect input {
\n width: 500px;
\n
}\n`;

export default cssContent;