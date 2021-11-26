//simple user info request, will be modified to be more dynamic.

$.ajax({
    url: '/user_info',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
        $("#username").html(data.username);
        $('#email').html(data.email);
    }
});


