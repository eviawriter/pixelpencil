// dragging and dropping subchapters

//------ Well, we need to start dragging first. This is what we do with the dragging part. 
function subdragstart(ev) {
    // console.log("dragStart");

    // dragstart is the event target. 
    dragstart = ev.target;
    // console.log(dragstart);
    ev.dataTransfer.setData("text", ev.target.id);

}

//------ Hi element. We're moving over you. And we're moving past you.   
function subdragover(ev) {

    // add a drop-effect when moving over an element
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

//------ Oh, you wanna drop your stuff? Let's do that here. This is what we need to do in the event of subdrop.
//------ First we create the function subdrop in which we change the visible suborder in the application
//------ Next we call a second function 'preparesavesuborder' to change the suborders of the subids 
//------ between the dragstart and dragdrop event.
//------ Third we evoke a third function to save the new suborder of the dragstart.
//------ Last we compare the current suborders with the new suborders in the database and change them
//------ if necessary. 

function subdragdrop(ev) {
    ev.preventDefault();

    // create a variabele with the chapid of the drop-target
    var dropchapid = ev.target.dataset.chapid;

    // create a variable with the suborder of the drop-target
    var dropsuborder = ev.target.dataset.suborder;
    // console.log("variable dropsuborder: " + dropsuborder);

    // create a variable of the chapcontainer which contains the chapid of the drop-target
    var container = document.getElementById('subnav-writing').querySelector('.sn-subitems[data-chapid="' + dropchapid + '"]');

    // create a variable containing the chapid of the initial event-start called dragstart
    var dragchapid = dragstart.dataset.chapid;
    // console.log("variabele chapid of dragstart: " + dragchapid);

    // create a variable containing the dragsuborder of the event-start called dragstart
    var dragstartsuborder = dragstart.dataset.suborder;

    // Compare startchapid with dropchapid. 
    if (dropchapid != dragchapid) {

        // Are they not the same? Alert the user. 
        alert('It \'s not possible to drag subchapters to a different chapter.');

        return;
    }

    // Check if dropsuborder is higher than startsuborder. If so, insert the stuff after the dropelement... 
    else if (Number(dropsuborder) > Number(dragstartsuborder)) {

        // get the chapcontainer and insert dragstart (event-start) before event.target (event-drop)
        container.insertBefore(dragstart, event.target.nextSibling);

        // set style of dropelement back to original
        event.target.style.backgroundColor = "";
        ev.target.style.borderTop = "";
        ev.target.style.borderBottom = "";

        // Now we've dropped the stuff in the program, it's time to save the new order of things into 
        // the database. We call a new function into life. 
        preparesavesuborder(dragstartsuborder, dropsuborder);
    }

    // if the suborders are equal, there's something gone wrong. Fix it by ending the  function. 
    else if (Number(dropsuborder) == Number(dragstartsuborder)) {
        console.log("impossible to change, dropsuborder and dragstartsuborder are the same");
        return;
    }

    // if dropsuborder is lower than startsuborder, insert your stuff before the dropelement... 
    else {

        // get the chapcontainer and insert dragstart (event-start) before event.target (event-drop)
        container.insertBefore(dragstart, event.target);

        // set style of dropelement back to original
        event.target.style.backgroundColor = "";
        ev.target.style.borderTop = "";
        ev.target.style.borderBottom = "";

        // Now we've dropped the stuff in the program, it's time to save the new order of things into 
        // the database. We call a new function into life. 
        preparesavesuborder(dragstartsuborder, dropsuborder);
    }
};


//------ First we need to prepare the database for the saving of the new suborder.

function preparesavesuborder(dragstartsuborder, dropsuborder) {

    // create a variabele with the subid of the event-start 
    var startsubid = dragstart.dataset.subid;

    // Now we need to know if the dragstartsuborder is higher than the dropsuborder.
    if (Number(dragstartsuborder) > Number(dropsuborder)) {
        console.log("if " + dragstartsuborder + " is bigger than " + dropsuborder);

        // now we have basically everything we need to know to change the order in the database.
        // Suborder +1 if dropsuborder is higher to or equal to dropsuborder AND lower than or equal to dragstartsuborder
        // Necessary when we move up the chain.
        db.run("UPDATE Subchapters SET suborder=suborder+1 WHERE suborder >= " + dropsuborder + " AND suborder <= " + dragstartsuborder + "", function (err) {
            if (err) {
                console.log(err);
                return;
            }

            else {
                // console.log("Row(s) updated: " + this.changes);

                // Call a new function to save the new suborder of the dragstart element to the database.  
                savesuborder(dropsuborder, startsubid);
            }
        })
    }

    // Well, it's not necessary to do anything if they are the same.
    else if (Number(dragstartsuborder) == Number(dropsuborder)) {
        //    alert("nope, there hasn't changed anything.");
        return;
    }

    // Necessary when we move down the chain. 
    else {

        // Suborder -1 (MINUS ONE) if dropsuborder is higher to or equal to dropsuborder AND lower than or equal to dragstartsuborder
        // console.log("if " + dragstartsuborder + " is smaller than " + dropsuborder);

        db.run("UPDATE Subchapters SET suborder=suborder-1 WHERE suborder >= " + dragstartsuborder + " AND suborder <= " + dropsuborder + "", function (err) {
            if (err) {
                console.log(err);
                return;
            }

            else {
                // console.log("Row(s) updated: " + this.changes);

                // Call a new function to save the new suborder of the dragstart element to the database.  
                savesuborder(dropsuborder, startsubid);
            }
        })
    }
};

//------ everything above has to run first before we can execute the next few steps.         
function savesuborder(dropsuborder, startsubid) {
    // console.log(dropsuborder, startsubid);      

    // setTimeout(() => { 

    // Update the suborder of the startsubid with the dropsuborder.
    db.run("UPDATE Subchapters SET suborder=" + dropsuborder + " WHERE subid=" + startsubid + "", function (err) {
        if (err) {
            console.log(err);
        }

        else {
            // console.log(finished);
            // call a new function to fix incorrect suborders in the application. 
            checksuborder();
        }
    })
    // }, 500)
};


//------ We've changed a bunch of order-records in the database. This needs to be checked and fixed in 
//------ the software, or else we eventually will receive an error message because of the unique contstraint that isn't met. 
//------ I actually turned the unique contraint off in the database. It's not really necessary. 
//------ that reminds me that I need to change the suborder when it's being created. 

function checksuborder() {

    // First create a local variable with all the subchaptertitles.
    let dropchapid = dragstart.dataset.chapid;
    // console.log(dropchapid);

    let subchaptertitles = document.querySelectorAll('.sn-subitem.writing');

    console.log(subchaptertitles);

    // Iterate over it checking if the data-suborder correspondents with the suborder-records and
    // change it if neccesary. 
    subchaptertitles.forEach(subchaptertitles => {

        // first make some variables with suborder and subid of subchaptertitles.
        let suborder = subchaptertitles.dataset.suborder;
        let subid = subchaptertitles.dataset.subid;
        let chapid = subchaptertitles.dataset.chapid;

        if (Number(chapid) == Number(dropchapid)) {

            // console.log("Chapid " + chapid + " is gelijk aan dropid " + dropchapid)
            // Next, query the database based on subid and select subid and suborder from it. 
            db.each("SELECT subid, suborder FROM Subchapters WHERE (subid='" + subid + "')", function (err, row) {
                if (err) {
                    console.log(err);
                    return;
                }

                // If all goes well, create variable suborder1 with the suborder from the database.
                // Create variable suborder2 with data from the suborder we made earlier. 
                else {
                    let suborder1 = row.suborder;
                    let suborder2 = suborder;
                    console.log("Subid: " + row.subid + " - Database: " + suborder1 + " - current suborder: " + suborder2);

                    // Compare both with each other. 
                    if (suborder1 == suborder2) {
                        console.log("No change necessary for subid " + row.subid + "");
                        return;
                    }

                    else {
                        console.log("change necessary for subid " + row.subid);
                        let suborderfix = document.querySelector('.sn-subitem.writing[data-subid="' + subid + '"]');
                        console.log(suborderfix);
                        suborderfix.dataset.suborder = suborder1;
                    }
                }
            })
        }

        else {
            //   console.log("change not necessary");
            return;
        }
    })
};


//------ What will happen when we drag a section over another section in the program.   

function subdragenter(ev) {
    ev.preventDefault();

    // have no idea why this is necessary, but without it, it won't work. 
    subel = ev.target;
    ev.dataTransfer.setData("text", ev.target.id);

    // Check if subid of dragstart element = larger or smaller than dragenter. 
    startsuborder = dragstart.dataset.suborder;
    entersuborder = subel.dataset.suborder;

    // classname should always be subchaptertitle. Or there is something seriously wrong. 
    if (ev.target.className == "sn-subitem writing") {

        // Check if startsuborder is lager than entersuborder. If so, style borderTop.
        if (Number(startsuborder) > Number(entersuborder)) {
            // console.log("Startsuborder is groter dan Entersuborder");
            ev.target.style.backgroundColor = "#00AE9D";
            ev.target.style.borderTop = "4px solid #282828";
        }

        // If not, than it's broken and should return nothing. 
        else if (Number(startsuborder) == Number(entersuborder)) {
            return;
        }

        // If startsuborder is smaller than entersuborder, style the borderBottom.
        else {
            ev.target.style.backgroundColor = "#00AE9D";
            ev.target.style.borderBottom = "4px solid #282828";
        }
    }

    else {
        console.log("error with changing border")
    }

};

//------ Sometimes we like to leave the area. We need to leave it clean. So, we clean it.
function subdragleave(ev) {
    ev.preventDefault();

    if (ev.target.className == "sn-subitem writing") {
        ev.target.style.backgroundColor = "";
        ev.target.style.borderTop = "";
        ev.target.style.borderBottom = "";
    }
}