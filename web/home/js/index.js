function OpenHome() {
    window.location += "";
}

function OpenLista() {
    window.location += "list/";
}

function OpenLogin() {
    window.location += "login/";
}

function OpenUpload() {
    window.location += "upload/";
}

function Logout() {
    ck_kill();
    window.location += "";
}

function InitHome() {
    let div = document.getElementById("row");
    if (div) {
        //getJSON( function (err, data) {
        getBiggerBox((data) => {
            if (data) {
                let last = data.pop();
                div.innerHTML = createCast(last.title, last.description, last.folder, last.folder, "last_cast_div", "col-1", "last_cast");
            }
        });
        getList((data) => {
            if (data) {
                let id = 0;
                data.forEach(e => {
                    if (id < 12) {
                        if (id < 2) {
                            div.innerHTML += createCast(e.title, e.description, e.folder, e.folder);
                        } else {
                            if (id < 2) {
                                div.innerHTML += createCast(e.title, e.description, e.folder, e.folder, "old_cast_div", "col-3", "old_cast");
                            } else {
                                div.innerHTML += createListCast(e.title, e.description, e.folder, e.folder);
                            }
                        }
                        id++;
                    }
                });
            }
        });
    } else {
        setTimeout(() => {
            InitHome();
        }, 500);
    }
}

function createCast(title, desc, img, audio, clas1 = "old_cast_div", clas2 = "col-2", clas3 = "old_cast") {
    return "" +
        "<div class=\"" + clas1 + " " + clas2 + "\" style=\"background-image: url('./data/" + img + "/image.png'); \" >" +
        "<div class=\"" + clas3 + "\" >" +
        "<table style=\"width: calc(100% - 25px);\">" +
        "<tr>" +
        "<td><b>" + title + "</b></td>" +
        "</tr>" +
        "<tr>" +
        "<td>" + desc + "</td>" +
        "</tr>" +
        "</table>" +
        "</div >" +
        "<div class=\"play_on_img\" onclick=\"playfile('" + title + "','" + audio + "')\">" +
        "<img src=\"./home/img/play_cast.png\" width=\"80px\">" +
        "</div>" +
        "</div>";
}

function createListCast(title, desc, img, audio) {
    return "" +
        "<div class=\"list_cast_div col-4\">" +
        "<div class=\"list_cast_img\"style=\"background-image: url('./data/" + img + "/image.png'); \" >" +
        "<div class=\"play_on_img\" onclick=\"playfile('" + title + "','" + audio + "')\">" +
        "<img src=\"./home/img/play_cast.png\" width=\"80px\">" +
        "</div>" +
        "</div>" +
        "<div class='list_cast_title'><b>" + title + "</b></div>" +
        "<div class=\"list_cast\" >" +
        "<table style=\"width: calc(100% - 25px);\">" +
        "<tr>" +
        "<td>" + desc + "</td>" +
        "</tr>" +
        "</table>" +
        "</div >" +
        "</div>";
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function getBiggerBox(callback) {
    fetch("./api/listBiggerBox", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({ offset: 0 })
    }).then((response) => {
        if (response.status == 200) {
            response.json().then(function (json) {
                callback(json);
            });
        }
    })
}
function getList(callback) {
    fetch("./api/list", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({ offset: 0 })
    }).then((response) => {
        if (response.status == 200) {
            response.json().then(function (json) {
                callback(json);
            });
        }
    })
}

function getJS(url, callback) {
    var script = document.createElement('script');
    script.onload = function () {
        callback();
    };
    script.src = url;

    document.head.appendChild(script);
}

InitHome();