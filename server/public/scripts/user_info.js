$(()=>{
    getData(showDetails);
});

//callBack can be used to manipulate data.
function getData(callBack) {
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