const styles = `.feedback-list-row-reply, 
.feedback-list-row-description {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.feedback-list-row-reply-header {
    display: flex;
}
.feedback-list-row-reply-header .feedback-list-row-reply-title {
    font-size: 12px;
    color: #33353B;
    font-weight: 600;
}
.feedback-list-row-reply-header .feedback-list-divider {
    top: 4px;
    height: 10px;
    margin: 0px 8px;
    display: inline-block;
    position: relative;
    border-left: 1px solid;
}
.feedback-list-row-reply-header .feedback-list-row-reply-time {
    opacity: 0.5;
    font-size: 10px;
    color: #33353B;
    font-weight: 400;
}
.feedback-list-row-reply-content {
    font-size: 12px;
    color: #33353B;
    font-weight: 200;
    margin-top: 6px;
    word-break: break-all;
    -webkit-user-select: text;
    -moz-user-select: text;
    user-select: text;
}
.feedback-list-row-reply-images {
    display: flex;
    margin-top: 16px;
}
.feedback-list-row-reply-images .feedback-list-row-reply-image {
    width: 33%;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
}
.feedback-list-row-reply-images .feedback-list-row-reply-image + .feedback-list-row-reply-image {
    margin-left: 8px;
}
.feedback-list-row-reply-images .feedback-list-row-reply-image > img {
    -o-object-fit: contain;
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.feedback-list-row-reply-images .feedback-list-row-reply-image-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
}
.feedback-list-row-reply-images .feedback-list-row-reply-image-mask-count {
    font-size: 26px;
    font-weight: 900;
}
.feedback-list-row-reply.feedback-black .feedback-list-row-reply-header .feedback-list-row-reply-title, 
.feedback-list-row-reply.feedback-black .feedback-list-row-reply-header .feedback-list-row-reply-time {
    color: #fff;
}
.feedback-list-row-reply.feedback-black .feedback-list-row-reply-content {
    color: rgba(255, 255, 255, 0.86);
}`;

export default styles;