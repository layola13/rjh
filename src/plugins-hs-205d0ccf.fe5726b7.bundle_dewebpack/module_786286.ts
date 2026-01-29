const cssContent = `.image-card {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #323232;
    margin: 0 10px 10px 0;
    position: relative;
    cursor: pointer;
}
.image-card.completed {
    background-color: unset;
}
.image-card:hover .img {
    opacity: 0.4;
}
.image-card:hover .check-more {
    display: block;
}
.image-card:hover .tooltip-items {
    display: flex;
}
.image-card .img {
    width: inherit;
    height: inherit;
    object-fit: unset;
    -o-object-fit: unset;
}
.image-card .check-more {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.image-card .tooltip-items {
    display: none;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translate(-50%, 0);
    background: black;
    border-radius: 15px;
    height: 30px;
    align-items: center;
}
.image-card .progress-area {
    width: 80%;
    position: absolute;
    bottom: 20%;
}
.image-card.failed .failed-icon {
    margin-right: 6px;
    background: #EB5D46;
    border-radius: 10px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}`;

export default cssContent;