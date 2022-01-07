

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

//displays cover sheet.
let displayCover = data => $("#inner_content_wrapper").append(data);