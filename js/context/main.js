// here be the main functions of contextmenu

function cm_write(button, click) {

    console.log(click);

    var buttons = document.querySelectorAll(".cm-button");
    var i;
    for (i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "";
    } 

    click.style.backgroundColor = "#00AE9D";

    if (button == 'story') {
        console.log("button is story");

        // do stuff
        
    }

}