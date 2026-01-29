const styles = `.overlayer {
    position: absolute;
    background-color: transparent;
    border: 1px solid rgba(250, 250, 250, 0.6);
    z-index: 1000;
    top: 0px;
    left: 0px;
}
.paginationgroup .paginationlist {
    position: absolute;
    left: 0px;
    bottom: 250px;
    z-index: 1001;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.paginationgroup .paginationlist .pageitem {
    padding: 10px;
}
.paginationgroup .paginationlist .pageitem a {
    width: 8px;
    height: 8px;
    background-color: #808080;
    border-radius: 10px;
    display: block;
    cursor: pointer;
}
.paginationgroup .paginationlist .pageitem a.actived {
    background-color: transparent;
    border: 2px solid #3085c4;
}
.paginationgroup .paginationlist .pageitem a:hover {
    background-color: #3085c4;
}
.cardcontainer {
    position: absolute;
    top: 0px;
    left: 0px;
}`;

export default styles;