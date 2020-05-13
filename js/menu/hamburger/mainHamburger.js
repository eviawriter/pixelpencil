// creates the popup-nav modal
function mainHamburgerModal() {

    let markup = `
    <div class="hamcontainer" id="hamburger">
        <button class="cm-button active" id="hamburger_create" onclick="menuHamburger(this, 'fry')">Create new project</button>
        <button class="cm-button" id="hamburger_open" onclick="menuHamburger(this, 'topping')">Open project</button>
        <button class="cm-button" id="hamburger_export" onclick="menuHamburger(this, 'eat')">Export project</button>
        <!-- <button class="cm-button" id="hamburger_settings" onclick="menuHamburger(this, 'cheese')">Settings</button> -->
    </div>

    <div id="hamcontent">
        <div class="hamcreate">
        <form id="createproject" action="javascript:create_project(this);">
        <div class="form-box-input">
            <h3 class="form-input-header">Project name *</h3>
            <input name="form-name" type="text" class="form-input" required="">

            <h3 class="form-input-header">Short description</h3>
            <textarea name="form-desc" class="form-input" rows="4"></textarea>

            <h3 class="form-input-header">Total words</h3>
            <input name="form-words" type="number" class="form-input">

            <h3 class="form-input-header">Project deadline</h3>
            <input name="form-dead" type="date" class="form-input">

        <div class="form-input-button">
            <button class="create_close_button" type="button" onclick="close_mainHamburgerModal()">Close</button>
            <button class="create_save_button" type="button" onclick="javascript:createProject(this)">Create project</button>
        </div>
    </form>
    </div>
    </div>

    `

    let modal = document.getElementById('modal_hamburger');
    modal.innerHTML = markup;
    modal.showModal();

}

function close_mainHamburgerModal() {

    let modal = document.getElementById('modal_hamburger');
    modal.close();

}

function menuHamburger(burger, whopper) {

    console.log(burger);

    let btns = document.getElementById('hamburger').querySelectorAll('.cm-button');
    console.log(btns);

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }

    burger.classList.toggle('active')        


    // fry = create
    if (whopper == 'fry') {
        var markup = get_hamburger_parts('medium');
    }

    // topping = open
    if (whopper == 'topping') {
        var markup = get_hamburger_parts('rare');
    }

    if (whopper == 'eat') {
        get_hamburger_parts('baked');
    }

    if (whopper == 'cheese') {
        var markup = get_hamburger_parts('melt');
    }

    document.getElementById('hamcontent').innerHTML = markup;

} 