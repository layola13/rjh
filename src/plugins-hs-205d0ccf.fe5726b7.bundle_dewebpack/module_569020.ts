const styles = `.left_panel {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 1;
    padding-bottom: 10px;
    background-size: 280px 248px;
    background-repeat: no-repeat;
    font-size: 12px;
}
.left_panel .icon {
    width: 100%;
    height: 44px;
    padding: 0 18px;
}
.left_panel .icon img {
    height: 44px;
}
.left_panel .content {
    height: calc(100% - 52px);
    overflow: auto;
    overflow-x: hidden;
}
.left_panel .content::-webkit-scrollbar {
    width: 5px;
    height: 6px;
}
.left_panel .content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
}
.left_panel .content .content_item {
    width: 100%;
    margin: 8px 0 18px 0;
    padding-left: 18px;
}
.left_panel .content .content_item .title {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}
.left_panel .content .content_item .detail {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
}
.left_panel .content .content_item .detail .label_item {
    width: 54px;
    height: 24px;
    text-align: center;
    font-size: 12px;
    line-height: 24px;
    background: rgba(255, 255, 255, 0.14);
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-right: 10px;
}
.left_panel .content .content_item .detail .label_item:hover {
    background: #396EFE;
}
.left_panel .content .content_item .detail .label_item_selected {
    background: #396EFE;
}
.left_panel .content .content_item .detail .label_item_disable {
    opacity: 0.25;
    pointer-events: none;
}
.left_panel .content .content_item .detail .label_item_disable:hover {
    background: rgba(255, 255, 255, 0.14);
}
.left_panel .content .content_item .detail .credits_item {
    width: 100%;
    margin-right: 20px;
    padding: 0 16px;
    height: 40px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
}
.left_panel .content .content_item .detail .credits_item.cursor_on_hover:hover {
    border-color: rgba(255, 255, 255, 0.33);
    background-color: rgba(45, 45, 45, 0.2);
    cursor: pointer;
}
.left_panel .content .content_item .detail .credits_item .text {
    font-size: 12px;
    opacity: 0.86;
}
.left_panel .content .content_item .detail .proportion_item {
    width: 75px;
    margin-bottom: 10px;
    margin-right: 10px;
}
.left_panel .content .content_item .detail .resolution_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
}
.left_panel .content .content_item .detail .resolution_item .left_area {
    width: 180px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.14);
    cursor: pointer;
    border-radius: 4px;
    padding: 0 8px;
}
.left_panel .content .content_item .detail .resolution_item .left_area .area_title {
    display: flex;
}
.left_panel .content .content_item .detail .resolution_item .left_area .area_title .benefit_img {
    width: 50px;
    height: 12px;
    margin-left: 4px;
}
.left_panel .content .content_item .detail .resolution_item .left_area .area_title .free {
    width: auto;
}
.left_panel .content .content_item .detail .resolution_item .left_area:hover {
    background: #396EFE;
}
.left_panel .content .content_item .detail .resolution_item .right_area {
    margin-right: 18px;
}
.left_panel .content .content_item .detail .resolution_item .count_red {
    color: red;
}
.left_panel .content .content_item .detail .resolution_item_forbid span {
    opacity: 0.3;
}
.left_panel .content .content_item .detail .resolution_item_selected .left_area {
    background: #396EFE;
}
.left_panel .content .content_item .detail .image_count {
    position: relative;
}
.left_panel .content .content_item .detail .image_count .image_count_item_selected {
    background: #396EFE;
}
.left_panel .content .content_item .detail .image_count .benefit_img {
    position: absolute;
    top: 0;
    right: 10px;
    width: 16px;
    height: 10px;
}
.left_panel .content .resolution .title {
    margin-bottom: 0;
}
.left_panel .content .resolution .more_credits {
    max-width: 92px;
    max-height: 16px;
    cursor: pointer;
}
.left_panel .content .image_reference_strength .title {
    justify-content: flex-start;
}
.left_panel .content .image_reference_strength .title .hs-iconfont-view {
    margin-left: 6px;
}
.left_panel .content .image_reference_strength .slider-outer {
    width: 244px;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider {
    width: 100%;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider .ant-slider-track {
    background-color: #396EFE;
    border-radius: 1.5px;
    z-index: 1;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider .ant-slider-step {
    background: #6B6C6D;
    border-radius: 1.5px;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider .ant-slider-step .ant-slider-dot {
    border: none;
    background-color: #6B6C6D;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider .ant-slider-step .ant-slider-dot.ant-slider-dot-active {
    background-color: #396EFE;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider .ant-slider-handle {
    background: #000;
    box-shadow: none;
    border: 2px solid #396EFE;
    z-index: 2;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider .ant-slider-handle::before {
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: -4px;
    right: -4px;
    z-index: -1;
    pointer-events: none;
    border: 2px solid #000;
    border-radius: 50%;
}
.left_panel .content .image_reference_strength .slider-outer .ant-slider .ant-slider-mark {
    font-size: 12px;
}
.left_panel .content .styler .image_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid transparent;
    width: 117px;
    border-radius: 8px;
    margin-bottom: 10px;
    margin-right: 10px;
    cursor: pointer;
    position: relative;
}
.left_panel .content .styler .image_item .tag_type {
    position: absolute;
    top: 0;
    left: 0;
    width: 37px;
    height: 16px;
    background-color: #EB5D46;
    font-size: 12px;
    border-radius: 8px 2px 8px 2px;
    text-align: center;
    line-height: 16px;
}
.left_panel .content .styler .image_item img {
    width: 117px;
    height: 75px;
    -o-object-fit: fill;
    object-fit: fill;
    -webkit-user-drag: none;
    border-radius: 8px;
}
.left_panel .content .styler .image_item .image_name {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    width: 100%;
    margin-top: 6px;
    margin-left: 4px;
    margin-bottom: 6px;
    font-size: 12px;
}
.left_panel .content .styler .image_item:hover {
    background: #396efe;
    border: 1px solid #396efe;
}
.left_panel .content .styler .image_item_selected {
    background: #396efe;
    border: 1px solid #396efe;
}
.left_panel .content .styler .image_item_disable {
    pointer-events: none;
    opacity: 0.25;
}
.spark-pic-popover-overwrap-dark .ant-popover-content .ant-popover-arrow {
    border-color: rgba(52, 52, 52);
}
.spark-pic-popover-overwrap-dark .ant-popover-content .ant-popover-arrow .ant-popover-arrow-content {
    background: rgba(52, 52, 52);
}
.spark-pic-popover-overwrap-dark .ant-popover-inner {
    background: rgba(52, 52, 52);
    border-radius: 8px;
}
.spark-pic-popover-overwrap-dark .ant-popover-inner .ant-popover-inner-content {
    border-radius: 8px;
    color: white;
}
.spark-pic-popover-overwrap-dark .ant-popover-inner .ant-popover-inner-content .popover_content {
    max-width: 178px;
}
.model_container {
    background-color: #343538;
    border-radius: 10px;
}
.model_container .ant-modal-content {
    background-color: #343538;
    border-radius: 10px;
}
.model_container .ant-modal-content .ant-modal-close .ant-modal-close-x {
    color: #fff;
}
.model_container .ant-modal-content .ant-modal-body {
    background-color: #343538;
    border-radius: 10px;
}
.model_container .ant-modal-content .ant-modal-confirm-title {
    color: #fff;
}
.model_container .ant-modal-content .ant-modal-confirm-content {
    color: #fff;
}
.model_container .ant-modal-content .ant-modal-confirm-btns {
    display: flex;
    justify-content: flex-end;
}
.model_container .ant-modal-content .ant-modal-confirm-btns .ant-btn {
    min-width: 80px;
    height: 32px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    border: none;
}
.model_container .ant-modal-content .ant-modal-confirm-btns .ant-btn.ant-btn-primary {
    color: white;
    background: #396efe;
    margin-left: 18px;
}`;

export default styles;