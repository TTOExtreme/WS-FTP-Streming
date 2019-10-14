var ck_key = "auF786IFytfUYu5sfuyaldpHSD56cvdF6GD";

function ck_new(login, callback) {
    var d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "WSPC=" + crypt(ck_key, (login)) + ";" + expires + ";path=/;";
    callback();
}

function ck_load_login() {
    console.log("loged")
    var name = "WSPC=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var ck = c.substring(name.length, c.length);
            var login = uncrypt(ck_key, ck);
            if (login) {
                login = JSON.parse(login);

                Login_Request(login.user, login.pass, () => {
                    console.log("loged")
                    if (document.getElementById('login_button')) {
                        let but = document.getElementById("login_button");
                        but.setAttribute("onclick", "OpenUpload()");
                        but.innerHTML = "<div>Upload</div>";
                    }
                    if (document.getElementById('header_table_tr')) {
                        let but = document.createElement("td");
                        but.innerHTML = "<div id='login_button' class='header_button' onclick='Logout()'><div>Logout</div></div>";
                        document.getElementById('header_table_tr').appendChild(but);
                    }
                })
            }
        }
    }
}

function ck_kill() {
    document.cookie = "WSPC=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

ck_load_login();