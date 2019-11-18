function action_character_subject(form, id) {
    
    let name = form.formactioncharacter["form-name"].value;
    let desc = form.formactioncharacter["form-desc"].value;
    let charid = id;


    console.log(name, desc, charid);
}