const fs = require('fs');

module.exports = 
{
    title: `Risk Assesments`,
    reqScripts: `getUserData(showDetails);`,
   content: /*HTML*/
   `
    <form action="upload_file" method="post" enctype="multipart/form-data">
        <input type="file" name="filetoupload"><br>
        <input type="submit">
    </form>
    <br>
    <br>
    <ul id="file_list"></ul>
    `

}