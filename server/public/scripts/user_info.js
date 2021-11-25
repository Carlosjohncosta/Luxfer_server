let userInfo;

$.ajax({
    url: '/public_user_info',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
        $("#username").html(data.username);
        $('#email').html(data.email);
    }
});

console.log(userInfo);

