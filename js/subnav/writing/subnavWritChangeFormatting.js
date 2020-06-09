// method
function subnavWritRemoveFormatting() {

    let sel;
    let range;
    let text;
    if (window.getSelection) {
        sel = window.getSelection();
        text = window.getSelection().getRangeAt(0).toString();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = text;
    }
}