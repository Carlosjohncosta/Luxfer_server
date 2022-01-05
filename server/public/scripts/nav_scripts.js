//All navigation functions to be added to this file.

(() => {
    $.ajax({
        type: "GET",
        url: `/side_bar`,
        contentType: 'application/json',
        success: (response)=> {
            $("#main_nav").append(response);
        }
    });
})();

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

