module.exports = {
    title: `Parts list`,
    reqScripts: `getTable('Part_Info', displayRes); getUserData(showDetails);`,
    content: /*HTML*/ 
    `
        <div id = "search">

            <div class="search_input">
                <label for="part">Search by part number</label>
                <input type="part" id="part" placeholder="Search by part number">
                <button onclick="getTableItem('Part_Info', 'SAP_Number', $('#part').val(), displayRes)">Search</button>
            </div>

            <div class="search_input">
                <label for="part">Search by decription</label>
                <input type="part" id="description" placeholder="Search by decription">
                <button onclick="getTableItem('Part_Info', 'SAP_Description', $('#description').val(), displayRes)">Search</button>
            </div>

        </div>
        <div id = "table"></div>
    `
}