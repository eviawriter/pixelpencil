function get_hamburger_parts(whopper) {

  // medium = create
  if (whopper == 'medium') {

    let markup = `
        <div class="hamcreate">
        <form id="createproject" action="javascript:create_project(this);">
        <div class="form-box-input">
            <h3 class="form-input-header">Project name *</h3>
            <input name="form-name" type="text" class="form-input" required="">

            <h3 class="form-input-header">Short description</h3>
            <textarea name="form-desc" class="form-input" rows="4"></textarea>

            <h3 class="form-input-header">Total words</h3>
            <input name="form-words" type="text" class="form-input">

            <h3 class="form-input-header">Project deadline</h3>
            <input name="form-dead" type="date" class="form-input">

        <div class="form-input-button">
            <button class="create_close_button" type="button" onclick="close_mainHamburgerModal(), menu('dashboard', 'hamburger')">Close</button>
            <button class="create_save_button" type="button" onclick="javascript:createProject(this)">Create project</button>
        </div>
    </form>
    </div>
        `

    return markup;

  }

  // rare = open
  if (whopper == 'rare') {

    const fs = require('fs');
    const path = require('path');

    var files = fs.readdirSync(path.join(projectdir));

    let markup = `
        <form id="formopenproject" action="javascript:openproject(this);">

          <div class="open_dir_headers">
            <div class="open_dir_header">
              <h3>Directory <span style="font-size: 11px;">(located in /Documents/Pixelpencil)</span></h3>
            </div>
            <div class="open_dir_details">
              <h3>Details</h3>
            </div>
          </div>

          <div class="menu_two_columns_250px">
            <div class="menu_column_one_250px">
              <select name="menu_open_dir" id="menu_open_dir" size="5">

              ${files.map(files => `
              <option value="${files}" onclick="javascript:menuProjectDetails(this);">${files}</option>
              `
    ).join('')}
              
              <option value="notselected" onclick="javascript:menuProjectDetails(this);">&#60;not selected&#62;</option>
              </select>
            </div>

            <div class="menu_column_two_250px" id="menu_project_details">
              <h5 id="menu_open_name"></h5>
              <p id="menu_open_desc"></p>
              <div id="menu_open_deadline"></div>
              <div id="menu_open_goal"></div>
            </div>
          </div>

          <div class="menu_open_file">
            <h3>Select file from disk <span style="font-size: 11px;">(only *.evv files allowed)</span></h3>
            <input type="file" accept=".evv" id="menu_open_selected">
          </div>

          <div class="form-input-button">
          <button class="create_close_button" type="button" onclick="close_mainHamburgerModal(), menu('dashboard', 'hamburger')">Close</button>
          <button class="create_save_button" type="button" onclick="javascript:menuOpenProject(this)">Open project</button>
      </div>
        </form>

            `

    return markup;
  }

  // baked = export
  if (whopper == 'baked') {

    let data = {
      function: 'get',
      db: 'array', // returns array with db.all instead of object with db.each
      table: 'Chapters',
      records: 'chapid, chapname, chaporder',
      column: 'chaptrash',
      id: '0',
      and: '',
      where: '', // extra column inc. value; ie trash=0
      orderby: 'ORDER BY',
      order: 'chaporder'
    }

    database(data, (results) => {

      let markup = `
        <form id="formexportproject" action="javascript:exportproject(this);">
              <div class="open_dir_headers">
                <div class="open_dir_header">
                  <h3>Select chapter(s) to export <span style="font-size: 11px;">(use arrows)</span></h3>
                </div>
                <div class="open_fill"></div>
                <div class="open_dir_details">
                  <h3>Ready for export <span style="font-size: 11px;">(order doesn't matter)</span></h3>
                </div>
              </div>
              <div class="menu_two_columns_200px">
                <div class="menu_column_200px">
                  <select name="menu_chapters" class="menu_export_dir" id="menu_export_chapterlist" size="5">
                ${results.map(results => `
                  <option value="${results.chapname}" onclick="javascript:menuExportChangeButton(this, key='forward')" data-chapid="${results.chapid}" data-chaporder="${results.chaporder}">${results.chapname}</option>
                  `).join('')}
                  </select>
                </div>
                <div class="menu_arrow">
                  <button type="button" class="btn_arrow_forward" id="btn_export_chapters" data-chapid="" onclick="javascript:menuExportSelectReady(this);"></button>
                  <button type="button" class="btn_arrow_back" id="btn_export_chapters_back" data-chapid="" onclick="javascript:menuExportSelectNotReady(this);"></button>
                </div>
                <div class="menu_column_200px">
                  <select name="menu_export_chapters" class="menu_export_dir" id="menu_export_chapters" size="5"></select>
                </div>
              </div>
              <div class="menu_two_columns_150px">
                <div class="menu_column_one">
                  <h3>Select format</h3>
                  <div class="export_format_container">
                    <label class="export_format">
                      <input type="radio" checked="checked" name="format" value="pdf">
                      <span class="checkmark">*.PDF</span>
                    </label>
                    <label class="export_format">
                      <input type="radio" name="format" value="doc">
                      <span class="checkmark">*.DOC</span>
                    </label>
                    <!-- 
                    <label class="export_format">
                      <input type="radio" name="format" value="docx">
                      <span class="checkmark">*.DOCX</span>
                    </label>
                    <label class="export_format">
                      <input type="radio" name="format" value="epub">
                      <span class="checkmark">*.EPUB</span>
                    </label>
                    -->
                  </div>
                </div>
                <div class="menu_fill"></div>
                <div class="menu_column_two">
                  <h3>include</h3>
                  <div class="export_format_container">
                    <label class="export_format">
                      <input type="checkbox" name="characters" value="characters">
                      <span class="checkmark">Characters</span>
                    </label>
                    <!-- 
                    <label class="export_format">
                      <input type="checkbox" name="research" value="research">
                      <span class="checkmark">Research</span>
                    </label>
                    -->
                    <label class="export_format">
                      <input type="checkbox" name="locations" value="locations">
                      <span class="checkmark">Locations</span>
                    </label>
                    <label class="export_format">
                      <input type="checkbox" name="ideas" value="ideas">
                      <span class="checkmark">Ideas</span>
                    </label>
                  </div>
                </div>
              </div>
                <div class="export_text">Note: the file is saved to /PixelPencil/exports in your Documents folder.</div>
              <div class="form-input-button">
                <button class="create_close_button" type="button" onclick="close_mainHamburgerModal(), menu('dashboard', 'hamburger')">Close</button>
                <button class="create_save_button" type="button" onclick="javascript:menuExportProject(this)">Export project</button>
              </div>
            </form>
            `

            document.getElementById('hamcontent').innerHTML = markup;
          })
  }




  // melt = settings
  if (whopper == 'melt') {
    var markup = get_hamburger_parts('melt');

    return markup;
  }

}