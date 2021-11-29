//cannot work without local host server (CORS policy error)
let data;

//Same function as decracated $(document).ready
$(()=> {
    getFileNames()
});

let getFileNames = () => {
    $.ajax({
        type: "POST",
        url: `/get_file`,
        contentType: 'application/json',
        data: JSON.stringify({"getAll": true}),
        success: (response)=> {
            if (response.length > 0) {
                for(let i = 0; i < response.length; i++) {
                    $('#file_list').append(`<li id=${response[i]}><h3>${response[i]}</h3></li>`);
                }
            } else {
                $('#file_list').append(`<h3>No files...</h3`);
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
genTable = (data, tableId) => {
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