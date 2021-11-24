//get CSV file (Prototype)
//cannot work without local host server (CORS policy error)
let data;

let getTable = (fileName, TableId) => {
    $.ajax({
        type: "GET",
        url: `files/${fileName}`,
        success: (response)=> {
            data = $.csv.toArrays(response);
            genTable(TableId);
        }
    });
}

genTable = (TableId) => {
    console.log(data);
}