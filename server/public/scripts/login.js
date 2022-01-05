$(() => {
    $("#submit").on("click", login);
});

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        login();
    }
});

let login = () => {
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