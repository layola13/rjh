const styles = `.none-search-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.none-search-wrapper .none-search-icon {
    font-size: 80px;
}
.none-search-wrapper .none-search-text {
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: PingFangSC-Light !important;
    font-size: 12px;
}
.none-search-wrapper.teaching-light .none-search-text {
    color: #33353b;
}
.none-search-wrapper.teaching-black .none-search-text {
    color: #fff;
}`;

export default styles;