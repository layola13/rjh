const styles = `
.homestyler-ui-components.homestyler-modal-container .feedback-list-modal.homestyler-modal .homestyler-modal-content-wrapper .homestyler-modal-outer {
    width: 900px;
    padding: 0;
}

.homestyler-ui-components.homestyler-modal-container .feedback-list-modal.homestyler-modal .homestyler-modal-content-wrapper .homestyler-modal-outer .homestyler-modal-top-element-container {
    padding: 0 40px;
}

.homestyler-ui-components.homestyler-modal-container .feedback-list-modal.homestyler-modal .homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content {
    padding-bottom: 20px;
}

.feedback-list-wrapper .feedback-list {
    margin: 0 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.03);
}

.feedback-list-wrapper .feedback-list-empty {
    height: 305px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.feedback-list-wrapper .feedback-list-empty-icon {
    font-size: 80px;
    line-height: 0;
}

.feedback-list-wrapper .feedback-list-empty-text {
    font-size: 14px;
    margin-top: 16px;
}

.feedback-list-wrapper .feedback-list-header {
    display: flex;
    font-size: 12px;
    color: #33353B;
    font-weight: 500;
    padding: 14px 24px;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #F2F2F2;
}

.feedback-list-wrapper .feedback-list-header-column {
    flex-grow: 1;
    flex-shrink: 1;
}

.feedback-list-wrapper .feedback-list-header-column + .feedback-list-header-column {
    margin-left: 5%;
}

.feedback-list-wrapper .feedback-list-body {
    height: 260px;
    padding-bottom: 20px;
    overflow-y: auto;
    border-radius: 0 0 8px 8px;
}

.feedback-list-wrapper .feedback-list-body-row {
    display: flex;
    padding: 22px 20px;
}

.feedback-list-wrapper .feedback-list-body-row-item {
    font-size: 12px;
    color: #33353B;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.feedback-list-wrapper .feedback-list-body-row-item + .feedback-list-body-row-item {
    margin-left: 40px;
}

.feedback-list-wrapper .feedback-list-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    margin-top: 40px;
}

.feedback-list-wrapper .feedback-list-footer-entry {
    color: #396efe;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.feedback-list-wrapper .feedback-list-footer-entry-icon {
    font-size: 16px;
    margin-right: 8px;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-prev:focus-visible .ant-pagination-item-link,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-next:focus-visible .ant-pagination-item-link,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-prev:hover .ant-pagination-item-link,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-next:hover .ant-pagination-item-link {
    color: #396EFE;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-prev,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-next {
    height: 14px;
    line-height: 24px;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager .hs-iconfont-view,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-prev .hs-iconfont-view,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-next .hs-iconfont-view {
    margin-top: 3px;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager .ant-pagination-item-link,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-prev .ant-pagination-item-link,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-next .ant-pagination-item-link {
    height: 18px;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-prev,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-next {
    min-width: auto;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager {
    color: #33353B;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager .ant-pagination-slash {
    margin: 0;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager input {
    padding: 0;
}

.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager input:hover,
.feedback-list-wrapper .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager input:focus {
    border-color: #396EFE;
    box-shadow: none;
}

.feedback-list-wrapper.feedback-black .feedback-list {
    background: #343538;
}

.feedback-list-wrapper.feedback-black .feedback-list-header {
    background: rgba(255, 255, 255, 0.06);
}

.feedback-list-wrapper.feedback-black .feedback-list-header-column {
    color: #F7F7F7;
}

.feedback-list-wrapper.feedback-black .feedback-list-body {
    background: rgba(255, 255, 255, 0.1);
}

.feedback-list-wrapper.feedback-black .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-item-link {
    color: #C3C6D1;
}

.feedback-list-wrapper.feedback-black .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager input {
    background-color: transparent;
    border-color: #C3C6D1;
    color: #C3C6D1;
}

.feedback-list-wrapper.feedback-black .feedback-list-footer-pagination .ant-pagination-simple .ant-pagination-simple-pager {
    color: #C3C6D1;
}
`;

export default styles;