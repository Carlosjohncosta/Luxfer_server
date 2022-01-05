$(()=>{
    getData(showDetails);
});

//callBack can be used to manipulate data.
let getData = callBack => {
    $.ajax({
        url: '/user_info',
        type: 'GET',
        contentType: 'application/json',
        success: (data) => {
            callBack(data);
        }
    });
}

let showDetails = user => {
    $('#username').html(user.username);
    $('#email').html(user.email);
}