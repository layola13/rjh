const cssContent = `.spark-pic-image-detail {
            \n width: 100vw;
            \n height: 100vh;
            \n position: fixed;
            \n top: 0;
            \n left: 0;
            \n z-index: 1005;
            \n
        }\n.spark-pic-image-detail .mask {
        \n width: 100%;
        \n height: 100%;
        \n position: absolute;
        \n background: rgba(0, 0, 0, 0.95);
        \n
    }\n.spark-pic-image-detail .queue-card-tip {
    \n position: absolute;
    \n width: 100%;
    \n top: 50%;
    \n text-align: center;
    \n color: #fff;
    \n font-size: 14px;
    \n
}\n.spark-pic-image-detail .process_area {
\n width: 300px;
\n position: absolute;
\n top: 50%;
\n left: calc(50% - 150px);
\n
}\n.spark-pic-image-detail .icons {
\n display: flex;
\n flex-direction: column;
\n justify-content: space-between;
\n position: absolute;
\n width: 100%;
\n height: 100%;
\n color: white;
\n pointer-events: none;
\n
}\n.spark-pic-image-detail .icons .header {
\n display: flex;
\n height: 30px;
\n align-items: center;
\n justify-content: space-between;
\n margin: 38px 30px 0 30px;
\n
}\n.spark-pic-image-detail .icons .header .left {
\n display: flex;
\n align-items: center;
\n pointer-events: fill;
\n
}\n.spark-pic-image-detail .icons .header .left .name {
\n font-size: 18px;
\n margin-right: 20px;
\n opacity: 0.9;
\n text-overflow: ellipsis;
\n overflow: hidden;
\n white-space: nowrap;
\n
}\n.spark-pic-image-detail .icons .header .left .ai-params {
\n position: relative;
\n margin-right: 10px;
\n font-size: 14px;
\n opacity: 0.8;
\n
}\n.spark-pic-image-detail .icons .header .left .ai-params .text {
\n border-left: 0.5px white solid;
\n padding-left: 10px;
\n
}\n.spark-pic-image-detail .icons .header .left .ai-params:hover .detail-container-wrap {
\n display: block;
\n
}\n.spark-pic-image-detail .icons .header .left .ai-params .expand-arrow {
\n border: 4px solid transparent;
\n position: absolute;
\n border-left: 4px solid white;
\n transform: rotate(45deg);
\n top: 10px;
\n right: -15px;
\n
}\n.spark-pic-image-detail .icons .header .left .ai-params .detail-container-wrap {
\n background: rgba(43, 44, 46, 0.9);
\n border-radius: 8px;
\n padding: 4px 14px;
\n position: absolute;
\n top: 18px;
\n width: -moz-max-content;
\n width: max-content;
\n z-index: 1;
\n display: none;
\n
}\n.spark-pic-image-detail .icons .header .left .ai-params .detail-container-wrap .item {
\n height: 36px;
\n line-height: 36px;
\n font-size: 12px;
\n display: flex;
\n align-items: center;
\n
}\n.spark-pic-image-detail .icons .header .right {
\n pointer-events: fill;
\n display: flex;
\n align-items: center;
\n justify-content: center;
\n width: 40px;
\n height: 40px;
\n border-radius: 20px;
\n cursor: pointer;
\n opacity: 0.86;
\n background: rgba(0, 0, 0, 0.4);
\n
}\n.spark-pic-image-detail .icons .header .right:hover {
\n opacity: 1;
\n
}\n.spark-pic-image-detail .icons .header .complain-button {
\n position: absolute;
\n right: 330px;
\n border-color: rgba(255, 255, 255, 0.2);
\n border-radius: 15px 4px 15px 15px;
\n font-size: 12px;
\n color: rgba(255, 255, 255, 0.86);
\n display: flex;
\n align-items: center;
\n background: rgba(0, 0, 0, 0.2);
\n z-index: 5;
\n pointer-events: fill;
\n height: 22px;
\n
}\n.spark-pic-image-detail .icons .header .complain-button .hs-iconfont-view {
\n margin-right: 4px;
\n
}\n.spark-pic-image-detail .icons .header .complain-button:hover, \n.spark-pic-image-detail .icons .header .complain-button:focus {
\n color: white;
\n border-color: rgba(255, 255, 255, 0.2);
\n background: rgba(0, 0, 0, 0.2);
\n
}\n.spark-pic-image-detail .icons .header .complain-button:hover span, \n.spark-pic-image-detail .icons .header .complain-button:focus span {
\n font-weight: 600;
\n
}\n.spark-pic-image-detail .icons .arrow {
\n display: flex;
\n justify-content: space-between;
\n margin: 0 30px;
\n margin-top: 100px;
\n
}\n.spark-pic-image-detail .icons .arrow .right {
\n transform: rotate(180deg);
\n
}\n.spark-pic-image-detail .icons .arrow .icon-container {
\n pointer-events: fill;
\n
}\n.spark-pic-image-detail .icons .arrow_disable .icon-container {
\n opacity: 0.3;
\n pointer-events: none;
\n
}\n.spark-pic-image-detail .icons .bottom {
\n background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), transparent);
\n padding: 0 30px 25px 30px;
\n
}\n.spark-pic-image-detail .icons .bottom_disable .action_container .action_item {
\n opacity: 0.3;
\n pointer-events: none;
\n
}\n.spark-pic-image-detail .zoom_disable {
\n pointer-events: none;
\n opacity: 0.6;
\n
}\n`;

export default cssContent;