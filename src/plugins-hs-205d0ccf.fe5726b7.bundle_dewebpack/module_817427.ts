const css = `.imagebutton-wrapper {
    position: relative;
    height: 30px;
    width: 30px;
    margin: 0 7px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.imagebutton-wrapper .imagebutton-center {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.imagebutton-wrapper .imagebutton-center .statusbar-new-func-dot {
    position: absolute;
    right: 0;
    top: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #eb5d46;
}
.imagebutton-wrapper .imagebutton-center .imagebutton-triangle {
    width: 0;
    height: 0px;
    display: block;
    margin-top: -7px;
    margin-left: 20px;
}`;

export default css;