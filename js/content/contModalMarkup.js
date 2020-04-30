// markup of modal (character details)
function ct_modal_markup(create, cont, type) {

    get_markup(type, create, cont, (markup) => {

        let modal = document.getElementById('modal_action');
        modal.innerHTML = markup;
        modal.showModal();

    });
}

// Markup modal Subject Edit
// function ct_modal_editSubject(create, result) {
// 
//     const markup = `
//     <div class="box-create-form">
//     <h3 class="create_form_header">${create.title}</h3>
//         <form id="${create.form}" ${create.id} action="javascript:${create.javascript};">
//             
//             <div class="form-box-input">
//                 <h3 class="form-input-header">${create.input1} *</h3>
//                 <input name="form-name" type="text" class="form-input" value="${result.subj}" required="">
// 
//                 <h3 class="form-input-header">${create.input2}</h3>
//                 <textarea name="form-desc" class="form-input" rows="4">${result.text}</textarea>
//             
//             </div>
//             
//             <div class="form-input-button">
//                 <button class="create_close_button" type="button" onclick="close_action_modal()">Close</button>
//                 <button class="create_save_button" type="submit">${create.save}</button>
//             </div>
// 
//         </form>
//     </div>
// 
//     `
// 
//     let modal = document.getElementById('modal_action');
// 
//     modal.innerHTML = markup;
// 
//     modal.showModal();
// 
// }

function get_markup(type, create, cont, result) {

    if (type == 'char-details') {

        const markup = `
        <div class="box-create-form">
        <h3 class="create_form_header">${create.title}</h3>
        <form id="${create.form}" ${create.id} action="javascript:${create.javascript};">
            <div class="form-box-input">
                <h3 class="form-input-header">Name *</h3>
                <input name="form-name" type="text" class="form-input" value="${cont.name}" required="">
    
                <div class="form-box-input-columns">
                <span class="form-box-3-columns"> 
                    <h3 class="form-input-header">Gender</h3>
                    <select name="form-gend" id="form-input-gender" class="form-input">
                        <option value="male" ${cont.male}>Male</option>
                        <option value="female" ${cont.female}>Female</option>                    
                        <option value="unknown" ${cont.gend}>Unknown</option>
                    </select>
                </span>
                
                <span class="form-box-3-columns"> 
                    <h3 class="form-input-header">Age</h3>
                    <input name="form--age" type="text" class="form-input" value="${cont.age}">
                </span>
    
                <span class="form-box-3-columns"> 
                    <h3 class="form-input-header">Type</h3>
                    <select name="form-type" class="form-input" id="form-input-type">
                    <option value="protagonist" ${cont.type1}>Protagonist</option>
                    <option value="antagonist" ${cont.type2}>Antagonist</option>
                    <option value="unknown" ${cont.type3}>Unknown</option>
                    </select>
                </span>
                </div>
    
                
                <h3 class="form-input-header">Short description (max. 260 characters)</h3>
                <textarea name="form-desc" class="form-input" rows="4" maxlength="260">${cont.bio}</textarea>
    
            </div>
            <div class="form-input-button">
                <button class="create_close_button" type="button" onclick="close_action_modal()">Close</button>
                <button class="create_save_button" type="submit">${create.save}</button>
            </div>
        </form>
    
    </div>
    `

        return result(markup);
    }

    if (type == 'edit-subject') {

        const markup = `
    <div class="box-create-form">
    <h3 class="create_form_header">${create.title}</h3>
        <form id="${create.form}" ${create.id} action="javascript:${create.javascript};">
            
            <div class="form-box-input">
                <h3 class="form-input-header">${create.input1} *</h3>
                <input name="form-name" type="text" class="form-input" value="${cont.subj}" required="">

                <h3 class="form-input-header">${create.input2}</h3>
                <textarea name="form-desc" class="form-input" rows="4">${cont.text}</textarea>
            
            </div>
            
            <div class="form-input-button">
                <button class="create_close_button" type="button" onclick="close_action_modal()">Close</button>
                <button class="create_save_button" type="submit">${create.save}</button>
            </div>

        </form>
    </div>
    `
        return result(markup);
    }

    if (type == 'edit-header') {
        const markup = `
        <div class="box-create-form">
        <h3 class="create_form_header">${create.title}</h3>
            <form id="${create.form}" ${create.id} action="javascript:${create.javascript};">
                
                <div class="form-box-input">
                    <h3 class="form-input-header">${create.input1} *</h3>
                    <input name="form-name" type="text" class="form-input" value="${cont.subj}" required="">
                </div>
            
                <div class="form-input-button">
                    <button class="create_close_button" type="button" onclick="close_action_modal()">Close</button>
                    <button class="create_save_button" type="submit">${create.save}</button>
                </div>
            </form>
        </div>
        `

        return result(markup);
    }

    if (type == 'edit-description') {
        if (create.rows !== '') {
            var rows = {
                size: create.rows
            }
        }

        else {
            var rows = {
                size: '4'
            }
        }

        const markup = `
        <div class="box-create-form">
        <h3 class="create_form_header">${create.title}</h3>
            <form id="${create.form}" ${create.id} action="javascript:${create.javascript}">
                
                <div class="form-box-input">
                    <h3 class="form-input-header">${create.input1} *</h3>
                    <textarea name="form-desc" class="form-input" rows="${rows.size}">${cont.subj}</textarea>
                </div>
            
                <div class="form-input-button">
                    <button class="create_close_button" type="button" onclick="close_action_modal()">Close</button>
                    <button class="create_save_button" type="submit">${create.save}</button>
                </div>
            </form>
        </div>
        `

        return result(markup);
    }

    if (type == 'edit-projectgoals') {
        const markup = `
        <div class="box-create-form">
        <h3 class="create_form_header">${create.title}</h3>
            <form id="${create.form}" ${create.id} action="javascript:${create.javascript};">
                
                <div class="form-box-input">
                    <h3 class="form-input-header">${create.words} *</h3>
                    <input name="form-words" type="number" class="form-input" value="${cont.words}" required="">
                    <br><br>
                    <h3 class="form-input-header">${create.concept} *</h3>
                    <input name="form-concept" type="date" class="form-input" value="${cont.concept}" required="">
                    <br><br>
                    <h3 class="form-input-header">${create.revision} *</h3>
                    <input name="form-revision" type="date" class="form-input" value="${cont.revision}" required="">
                    <br><br>
                    <h3 class="form-input-header">${create.project} *</h3>
                    <input name="form-project" type="date" class="form-input" value="${cont.project}" required="">
                </div>
            
                <div class="form-input-button">
                    <button class="create_close_button" type="button" onclick="close_action_modal()">Close</button>
                    <button class="create_save_button" type="submit">${create.save}</button>
                </div>
            </form>
        </div>
        `

        return result(markup);
    }
}