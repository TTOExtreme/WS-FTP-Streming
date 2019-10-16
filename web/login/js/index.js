function LoginOpenHome() {
    window.location += "../"
}

function LoginOpenLista() {
    window.location += "../list/"
}

function LoginOpenLogin() {
    window.location += "../login/"
}

function Login() {
    let data = {};
    data["user"] = document.getElementById("user_input").value;
    data["pass"] = sha512(document.getElementById("pass_input").value);
    Login_Request(data.user, data.pass, (rec) => {
        rec.pass = data.pass;
        ck_new(JSON.stringify(rec), () => {
            window.location += "../";
        })
    });
}


function Login_Request(user, pass, callback) {
    let data = {};
    data["user"] = user;
    data["pass"] = pass;


    let data1 = new FormData();
    data1.append("json", JSON.stringify(data));
    let loc = "./api/login";
    if (window.location.pathname.indexOf("login") > 0 ||
        window.location.pathname.indexOf("upload") > 0 ||
        window.location.pathname.indexOf("list") > 0) {
        loc = "../api/login";
    }
    fetch(loc, {
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
    } else {
        if (window.location.pathname.indexOf("/upload") >= 0) {
            window.location += "../login";
        }
    }
}