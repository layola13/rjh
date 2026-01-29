export const styles = `ul li {
    list-style: none;
}

.common_mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3000;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    text-align: center;
}

.catalog_popup_panel_collection_body {
    width: 788px;
    height: 566px;
    margin: -281px auto 0 -390px;
    background-color: #f7f7f7;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #343a40;
}

.catalog_popup_panel_collection_body .header {
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom: 1px solid #e3e3e3;
    font-size: 18px;
}

.catalog_popup_panel_collection_body .header label {
    color: #333;
    display: block;
    font-weight: 400;
    line-height: 50px;
    text-align: center;
    margin: 0px auto;
    margin-left: 44px;
    width: 50%;
    padding: 0;
    font-weight: normal;
    display: inline-block;
}

.catalog_popup_panel_collection_body .header .closeBtn {
    width: 50px;
    height: 30px;
    float: right;
    margin-top: 3px;
    cursor: pointer;
}

.catalog_popup_panel_collection_body .header .closeBtn img {
    width: 14px;
    height: 14px;
}

.catalog_popup_panel_collection_body .footer {
    position: absolute;
    margin-left: 50%;
    transform: translate(-50%);
    bottom: 30px;
}

.catalog_popup_panel_collection_body .footer input[type="submit"] {
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 213px;
    height: 35px;
    background: #4d9bd6;
    color: white;
    border-radius: 2px;
    border: 1px solid #3085c4 !important;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
}

.catalog_popup_panel_collection_body .footer input[type="submit"]:hover {
    background: #4d9bd6;
    border-color: #204d74;
}

.catalog_popup_panel_collection_body .footer input[disabled] {
    border: 1px solid #d9dbdf !important;
    background-color: #ccc !important;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body {
    width: 900px;
    height: 590px;
    background-color: #fff;
    color: #33353B;
    padding-top: 10px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .header {
    height: 60px;
    border-bottom: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .header label {
    width: auto;
    line-height: 60px;
    margin-left: 40px;
    font-size: 22px;
    font-weight: bolder;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .header .closeBtn {
    margin-top: 0;
    width: auto;
    margin-right: 30px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel {
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    color: #33353B;
    width: calc(100% - 80px);
    padding: 20px 40px;
    font-size: 14px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .report_title {
    text-align: left;
    margin-bottom: 30px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .report_title img {
    margin-right: 8px;
    vertical-align: top;
    margin-top: 2px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table {
    height: 216px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul li.reason_item {
    display: block;
    text-align: left;
    margin-bottom: 18px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul li.reason_item label {
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul li.reason_item input[type="text"] {
    border: none;
    border-bottom: 1px solid;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul li.reason_item .homestyler-ui-components.check-box-container .check-box {
    margin-left: 0;
    margin-right: 8px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul .text_area {
    position: relative;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul .text_area .text_area_text_num {
    display: inline-block;
    position: relative;
    z-index: 10;
    top: -25px;
    right: -235px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul .text_area .otherReasonText {
    display: block;
    width: 306px;
    height: 110px;
    background: white;
    margin-top: 18px;
    padding: 8px 12px;
    border: 1px solid #D4D7E1;
    border-radius: 4px;
    font-size: 14px;
    color: #33353B;
    background-color: #fff;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul .text_area .otherReasonText ::-moz-placeholder {
    color: #D4D7E1;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul .text_area .otherReasonText ::placeholder {
    color: #D4D7E1;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul.reason_items2 {
    margin-left: 200px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture {
    text-align: left;
    position: relative;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture .picture {
    padding-top: 20px;
    display: flex;
    align-items: center;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture .picture img,
#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture .picture .empty-picture {
    width: 65px;
    height: 65px;
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    background: #F2F2F2;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture .picture .empty-picture .hs-iconfont-view {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture .picture img.hasPicture {
    border: 1px solid #D4D7E1;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture .picture .error_info {
    margin-left: 10px;
    display: flex;
    align-items: center;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel .upload_picture .picture .error_info .error-info-icon {
    margin-right: 8px;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .footer {
    margin-left: 0;
    bottom: 25px;
    right: 40px;
    transform: none;
}

#catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .footer .report-panel-btn {
    box-sizing: border-box;
    margin-left: 18px;
    height: 46px;
    width: 160px;
    font-size: 18px;
    font-weight: bolder;
}

.global-en #catalog_popup_panel_collection #report_panel_mask .catalog_popup_panel_collection_body .reportpanel table ul.reason_items2 {
    margin-left: 80px;
}`;