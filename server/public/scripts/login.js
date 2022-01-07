
//Listens for submit button click. 
$(() => {
    $("#submit").on("click", login);
});

//Listens for enter key
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        login();
    }
});

//Sends user info to server, waiting for either "/home" (correct login details) and redirecting, or displaying error message on invalid details.
function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    $.ajax({
        url: '/auth',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"username": username, "password": password})
    }).done((data)=>{
        if (data == "/home") {
            window.location.href = data;
        } else {
            $("#error").html(data);
        }
    });
}