const sql = require("mssql");
const config = require(__dirname + '../../middleware/dbConfig');
const express = require("express");
const router = express.Router();

//Sends template of worksheet with requested info.
//Request is used for which sheet is needed, and what part of the sheet is needed.
router.post('/', (req, res)=>{
    sql.connect(config, (err)=> {
        if (err) throw(err);
    });
    
    //Bellow are templates of response depending on requested section, inserting db response.
    if(req.session.isAuth) {
        switch (req.body.section) {
        
        case "serials":

            //Gets serial numbers of all recorded build sheets, and sends HTML response.
            sql.query(`SELECT * FROM AF_Build_Sheet_Cover`, (err, result)=> {
                let response = `<ul>`;
                result.recordset.forEach((record)=> {
                    response += `<li>Serial: ${record.SN}</li>`
                });
                res.send(response + `</ul>`);
            });
            break;

        case "cover":

            //Returns cover sheet HTML.
            sql.query(/*SQL*/`SELECT * FROM AF_Build_Sheet_Cover WHERE ID = ${req.body.ID}`, (err, result)=> {
                try {
                    res.send(/*HTML*/
                    `
                        <div class="cover_container">

                            <div class="cover_header">
                                <h1>Paperless Build Sheet</h1>
                                <table class="cover_table">
                                    <tr>
                                        <th>AUTHOR</th>
                                        <th>REVIEWER</th>
                                        <th>ORIGINAL DATE</th>
                                    </tr>
                                    <tr>
                                        <td>${result.recordset[0].Author}</td>
                                        <td>${result.recordset[0].Reviewer}</td>
                                        <td>${result.recordset[0].Original_Date}</td>
                                    </tr>
                                    <tr>
                                        <th>REVISION LEVEL</th>
                                        <th>REVISION DATE</th>
                                        <th>DOC REFERENCE</th>
                                    </tr>
                                    <tr>
                                        <td>${result.recordset[0].Revision_Level}</td>
                                        <td>${result.recordset[0].Revision_Date}</td>
                                        <td>${result.recordset[0].Doc_Reference}</td>
                                    </tr>
                                </table>
                            </div>

                            <div class="cover_info">
                                <p>please complete the below information fully</p>
                                <h3>Customer and job details</h3>
                                
                                <table class="cover_table">
                                    <tr>
                                        <th>Customer</th>
                                        <th>WO / SO</th>
                                    </tr>
                                    <tr>
                                        <td>${result.recordset[0].Customer}</td>
                                        <td>${result.recordset[0].WO_SO}</td>
                                    </tr>
                                </table>
                            
                                <table class="cover_table">
                                    <tr>
                                        <th>material</th>
                                        <th>SN</th>
                                    </tr>
                                    <tr>
                                        <td>${result.recordset[0].Material}</td>
                                        <td>${result.recordset[0].SN}</td>
                                    </tr>
                                </table>
                            </div>
                        
                        </div>
                    `)
                } catch(err) {
                    res.send("Something went wrong, please try again...");
                }
            })

            break;

        //Case for invalid section.
        default:
            res.send("<p>invalid selection...</p>");
            break;

        }
    } else {

        res.send("Access Denied...");
    }
})

module.exports = router;
