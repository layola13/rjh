const styles = `.statusbar-float-right {
    position: relative;
    margin-right: 7px;
    padding: 0px 10px;
    height: 100%;
    float: right;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    align-items: center;
    pointer-events: auto;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 30px;
    font-size: 19px;
    cursor: pointer;
}
.statusbar-float-right .statusbar-new-func-dot {
    position: absolute;
    right: 8px;
    top: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #eb5d46;
}`;

export default styles;