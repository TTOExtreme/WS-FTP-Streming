function OpenHome() {
    window.location = "/"
}

function OpenLista() {
    window.location = "/lista"
}

function OpenLogin() {
    window.location = "/login"
}

function Login() {
    let data = {};
    data["user"] = document.getElementById("user_input").value;
    data["pass"] = sha512(document.getElementById("pass_input").value);
    Login_Request(data.user, data.pass, (rec) => {
        rec.pass = data.pass;
        ck_new(JSON.stringify(rec), () => {
            window.location = "/";
        })
    });
}


function Login_Request(user, pass, callback) {
    let data = {};
    data["user"] = user;
    data["pass"] = pass;


    var data1 = new FormData();
    data1.append("json", JSON.stringify(data));

    fetch("../api/login", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status == 200) {
                response.json().then(function (json) {
                    callback(json);
                });
            } else {
                loginMsg("Usuário ou Senha Incorretos.");
            }
        });
}

function loginMsg(msg) {
    if (document.getElementById("login_msg")) {
        document.getElementById("login_msg").innerHTML = msg;
        if (msg != "") {
            setTimeout(() => {
                loginMsg("")
            }, 1000);
        }
    }
}