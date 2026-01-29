const styles = `
.userinfo-button-disabled {
    cursor: not-allowed;
    filter: opacity(0.4);
}

.userinfo-button-disabled > a > span {
    cursor: not-allowed !important;
    cursor: default;
}

.user-info-new-red-icon {
    height: 14px;
    width: 36px;
    background-color: #EB5D46;
    border-radius: 9px 9px 9px 3px;
    margin-left: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-info-new-red-icon .new-red-icon-text {
    height: 12px;
    width: 28px;
    font-family: AlibabaPuHuiTi-Bold !important;
    font-size: 12px;
    color: #FFFFFF !important;
    line-height: 12px;
    font-weight: 500;
}
`;

export default styles;