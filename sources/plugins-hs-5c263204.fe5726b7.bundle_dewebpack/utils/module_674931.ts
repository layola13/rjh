const cssContent = `.feedback-list-row .feedback-list-row-container {
    display: flex;
    padding: 22px 20px;
}
.feedback-list-row-item {
    font-size: 12px;
    color: #33353b;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.feedback-list-row-item + .feedback-list-row-item {
    margin-left: 5%;
}
.feedback-list-row-item .feedback-list-row-show-reply {
    cursor: pointer;
    color: #396efe;
    font-size: 12px;
    position: relative;
}
.feedback-list-row-item .feedback-list-row-show-reply-dot {
    display: inline-block;
    position: absolute;
    top: -2px;
    right: -7px;
    border-radius: 50%;
    border: none;
    background-color: #eb5d46;
    width: 6px;
    height: 6px;
}
.feedback-list-row .feedback-list-extended-row {
    padding: 0 20px;
    display: flex;
    opacity: 0;
    width: 100%;
    max-height: 0;
    transition: all 0.3s ease-out;
}
.feedback-list-row .feedback-list-extended-row-content {
    position: relative;
    background: rgba(242, 242, 242, 0.66);
    width: 100%;
    padding: 22px 0;
    display: flex;
    align-items: center;
    border-radius: 8px;
}
.feedback-list-row .feedback-list-extended-row-content::before {
    content: '';
    position: absolute;
    left: 40px;
    top: -16px;
    width: 16px;
    height: 16px;
    background: inherit;
    clip-path: polygon(8px 8px, 16px 16px, 0 16px);
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-container,
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-desc-container {
    height: 100%;
    width: 50%;
    max-width: 50%;
    flex: 1;
    overflow: hidden;
    position: relative;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-desc-container {
    padding: 0 40px;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-list {
    display: flex;
    transition: transform 0.3s;
    min-height: 10px;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-list .feedback-list-row-reply-item {
    flex: 1;
}
.feedback-list-row .feedback-list-extended-row-content .ant-carousel {
    padding: 0 40px;
}
.feedback-list-row .feedback-list-extended-row-content .ant-carousel .slick-slider {
    padding-bottom: 8px;
}
.feedback-list-row .feedback-list-extended-row-content .ant-carousel .slick-dots.feedback-reply-list-dots {
    display: none !important;
    bottom: 0;
}
.feedback-list-row .feedback-list-extended-row-content .ant-carousel .slick-dots.feedback-reply-list-dots > li {
    background: rgba(28, 28, 28, 0.2);
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin: 0 4px;
}
.feedback-list-row .feedback-list-extended-row-content .ant-carousel .slick-dots.feedback-reply-list-dots > li > button {
    background: transparent;
}
.feedback-list-row .feedback-list-extended-row-content .ant-carousel .slick-dots.feedback-reply-list-dots > li.slick-active {
    width: 12px;
    background: #1c1c1c;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-btn {
    position: absolute;
    top: 50%;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: table;
    text-align: center;
    background: rgba(0, 0, 0, 0.06);
    opacity: 0;
    transition: opacity 0.3s;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-btn .anticon {
    display: table-cell;
    vertical-align: middle;
    font-size: 12px;
    color: #1c1c1c;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-btn:hover {
    cursor: pointer;
    background: #1c1c1c;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-btn:hover .anticon {
    color: #fff;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-btn--disabled {
    background: rgba(0, 0, 0, 0.06) !important;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-btn--disabled .anticon {
    cursor: not-allowed;
    color: rgba(28, 28, 28, 0.4) !important;
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-prev {
    left: 20px;
    transform: translate(-50%, -50%);
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-next {
    right: 20px;
    transform: translate(50%, -50%);
}
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-container:hover .feedback-list-row-reply-prev,
.feedback-list-row .feedback-list-extended-row-content .feedback-list-row-reply-container:hover .feedback-list-row-reply-next {
    opacity: 1;
}
.feedback-list-row.feedback-list-row-extended .feedback-list-extended-row {
    height: auto;
    opacity: 1;
    max-height: 400px;
}
.feedback-list-row.feedback-black .feedback-list-row-item {
    color: rgba(255, 255, 255, 0.86);
}
.feedback-list-row.feedback-black .feedback-list-extended-row-content {
    background: rgba(255, 255, 255, 0.08);
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .carousel-wrap .carousel-imgs-slider .carousel-imgs-list {
    height: 442px;
    width: 100%;
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .carousel-wrap .carousel-imgs-slider {
    align-items: center;
    position: relative;
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .carousel-wrap .carousel-imgs-slider .carousel-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .carousel-wrap .carousel-imgs-slider .carousel-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .homestyler-modal-content-wrapper .homestyler-modal-outer {
    width: 900px;
    padding: 0;
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .homestyler-modal-content-wrapper .homestyler-modal-outer .homestyler-modal-top-element-container {
    padding: 0 40px;
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .homestyler-modal-content-wrapper .homestyler-modal-outer .homestyler-modal-content .feedback-carousel-wrapper {
    padding: 0 20px;
}
.homestyler-ui-components.homestyler-modal-container .feedback-carousel-modal.homestyler-modal .homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content {
    padding-bottom: 20px;
}`;

export default cssContent;