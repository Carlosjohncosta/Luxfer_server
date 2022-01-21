//expands nav list (id of hidden list as parameter)
function expand(id) {
    $(id).css(
    {
        "display": "block",
        "padding-top": "5px",
        "padding-bottom": "5px"
    });
}

//collapses nav list (id of hidden list as parameter)
function collapse(id) {
    $(id).css({"display": "none"});
}



//USER DATA:
//callBack can be used to manipulate data.
function getUserData(callBack) {
    $.ajax({
        url: '/user_info',
        type: 'GET',
        contentType: 'application/json',
        success: (data) => {
            callBack(data);
        }
    });
}

//simply adds user info to top-bar.
let showDetails = user => {
    $('#username').html(user.username);
    $('#email').html(user.email);
}


//FILES:
{
    let data;

    //Gets names of all files in users folder
    function getFileNames() {
        $.ajax({
            type: "POST",
            url: `/get_file`,
            contentType: 'application/json',
            data: JSON.stringify({"getAll": true}),
            success: (response)=>{
                if (response.length > 0) {
                    for(let i = 0; i < response.length; i++) {
                        $('#file_list').append(`<li id=${response[i]}><h3>${response[i]}</h3></li>`);
                    }
                } else {
                    $('#file_list').append(`<h3>No files...</h3>`);
                }
            }
        });
    }

    //callBack defaults to genTable.
    let getFile = (fileName, tableId, callBack = genTable) => {
        //gets file.
        $.ajax({
            type: "POST",
            url: `/get_file`,
            contentType: 'application/json',
            data: JSON.stringify({"fileName": fileName}),
            success: (response)=> {
                data = $.csv.toArrays(response);
                //using callback as data may want to be retrieved in a different manner than genTable.
                callBack(data, tableId);
            }
        });
    }

    //appends table with id tableId using nested for loop to itterate through 2d array.
    let genTable = (data, tableId) => {
        for (let i = 0; i < data[0][0].length; i++) {
            $(tableId).append("<tr>")
            for (let y = 0; y < data[0].length; y++) {
                if (i == 0) {
                    $(tableId).append(`<th>${data[i][y]}</th>`);
                } else {
                    $(tableId).append(`<td>${data[i][y]}</td>`);
                }
            }
            $(tableId).append("</tr>");
        }
    }
}


//WORKSHEETS AND TABLES:
//gets requested section of work sheet by ID, this may change depending on identifier.

function getWorkSheets(ID, section, callBack) {
    //gets worksheet
    $.ajax({
        type: "POST",
        url: `/get_worksheets`,
        contentType: 'application/json',
        data: JSON.stringify({"section": section, "ID": ID}),
        success: (response)=> {
            //callback for data use depending on section/data.
            callBack(response);
        }
    });
}

let tableData;
function getTable(name, callBack) {
    $.ajax({
        type: "POST",
        url: `/get_table`,
        contentType: 'application/json',
        data: JSON.stringify({"table": name}),
        success: (response)=> {
            //callback for data use depending on section/data.
            tableData = response;
            callBack(tableData);
        }
    });
}

//displays cover sheet.
let displayRes = data => {$("#table").empty(); $("#table").append(data);}


//PART INFO:
function getTableItem(name, column, item, callBack) {
    $.ajax({
        type: "POST",
        url: `get_table`,
        contentType: 'application/json',
        data: JSON.stringify({"table": name, "column": column, "item": item}),
        success: (response) => {
            tableData = response;
            callBack(tableData);
        }
    })
}