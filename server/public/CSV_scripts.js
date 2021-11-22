//get CSV file (Prototype)
//cannot work without local host server (CORS policy error)
let data;

$(document).ready(()=> {
    $.ajax({
        type: "GET",
        url: "test.csv",
        success: (response)=> {
            data = $.csv.toArrays(response);
            genTable();
        }
    });
});


genTable = () => {
    console.log(data);
}